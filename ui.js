(() => {
  'use strict';
  if (window.__ayanGlobalUI) return;
  window.__ayanGlobalUI = true;

  const LANG_KEY = 'ayan_lang';
  const THEME_KEY = 'ayan_theme';
  const LANGS = ['ar', 'en'];
  const THEMES = ['relax', 'dark', 'light'];
  const read = (key, fallback) => {
    try { return localStorage.getItem(key) || fallback; } catch { return fallback; }
  };
  const write = (key, value) => {
    try { localStorage.setItem(key, value); } catch {}
  };
  const qs = (s, root = document) => root.querySelector(s);
  const qsa = (s, root = document) => Array.from(root.querySelectorAll(s));

  const state = {
    lang: LANGS.includes(read(LANG_KEY, 'ar')) ? read(LANG_KEY, 'ar') : 'ar',
    theme: THEMES.includes(read(THEME_KEY, 'relax')) ? read(THEME_KEY, 'relax') : 'relax'
  };

  const labels = {
    ar: { relax: 'مريح 💙', dark: 'داكن 🌙', light: 'فاتح ☀️' },
    en: { relax: 'Relax 💙', dark: 'Dark 🌙', light: 'Light ☀️' }
  };

  function closePreferences(except = null) {
    qsa('[data-pref-menu]').forEach(menu => {
      if (menu === except) return;
      menu.classList.remove('open');
      qs('[data-pref-trigger]', menu)?.setAttribute('aria-expanded', 'false');
    });
  }

  function closeMobileMenu() {
    const nav = qs('[data-nav-links]');
    const button = qs('[data-menu]');
    nav?.classList.remove('open');
    button?.classList.remove('is-open');
    button?.setAttribute('aria-expanded', 'false');
    const backdrop = qs('[data-mobile-menu-backdrop]');
    backdrop?.classList.remove('is-visible');
    document.body.classList.remove('mobile-menu-open');
  }

  function syncShell() {
    document.documentElement.lang = state.lang;
    document.documentElement.dir = state.lang === 'ar' ? 'rtl' : 'ltr';
    if (document.body) document.body.dataset.theme = state.theme;

    qsa('[data-theme-label]').forEach(el => el.textContent = labels[state.lang][state.theme]);
    qsa('[data-lang-label]').forEach(el => el.textContent = state.lang === 'ar' ? 'العربية' : 'English');

    qsa('[data-set-theme]').forEach(button => {
      const active = button.dataset.setTheme === state.theme;
      button.classList.toggle('is-selected', active);
      button.setAttribute('aria-checked', String(active));
      button.setAttribute('aria-pressed', String(active));
    });
    qsa('[data-set-lang]').forEach(button => {
      const active = button.dataset.setLang === state.lang;
      button.classList.toggle('is-selected', active);
      button.setAttribute('aria-checked', String(active));
      button.setAttribute('aria-pressed', String(active));
    });
  }

  function applyTheme(theme) {
    if (!THEMES.includes(theme)) return;
    state.theme = theme;
    write(THEME_KEY, theme);
    if (document.body) document.body.dataset.theme = theme;
    // Let the content layer update translations/form state when present.
    try { window.AyanPhotography?.setTheme?.(theme); } catch (_) {}
    syncShell();
    closePreferences();
    window.dispatchEvent(new CustomEvent('ayan:theme-change', { detail: { theme } }));
  }

  function applyLang(lang) {
    if (!LANGS.includes(lang)) return;
    state.lang = lang;
    write(LANG_KEY, lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    try { window.AyanPhotography?.setLang?.(lang); } catch (_) {}
    syncShell();
    closePreferences();
    window.dispatchEvent(new CustomEvent('ayan:lang-change', { detail: { lang } }));
  }

  function togglePreference(menu) {
    if (!menu) return;
    const wasOpen = menu.classList.contains('open');
    closeMobileMenu();
    closePreferences(menu);
    menu.classList.toggle('open', !wasOpen);
    qs('[data-pref-trigger]', menu)?.setAttribute('aria-expanded', String(!wasOpen));
  }

  function createMobileBackdrop() {
    let backdrop = qs('[data-mobile-menu-backdrop]');
    if (backdrop) return backdrop;
    backdrop = document.createElement('button');
    backdrop.type = 'button';
    backdrop.className = 'mobile-menu-backdrop-v29';
    backdrop.dataset.mobileMenuBackdrop = '1';
    backdrop.setAttribute('aria-label', 'Close menu');
    document.body.appendChild(backdrop);
    backdrop.addEventListener('click', event => {
      event.preventDefault();
      event.stopPropagation();
      closeMobileMenu();
    });
    return backdrop;
  }

  function toggleMobileMenu() {
    const nav = qs('[data-nav-links]');
    const button = qs('[data-menu]');
    if (!nav || !button) return;
    const shouldOpen = !nav.classList.contains('open');
    closePreferences();
    if (shouldOpen) {
      const backdrop = createMobileBackdrop();
      nav.classList.add('open');
      button.classList.add('is-open');
      button.setAttribute('aria-expanded', 'true');
      backdrop.classList.add('is-visible');
      document.body.classList.add('mobile-menu-open');
    } else {
      closeMobileMenu();
    }
  }

  function bindHeader() {
    syncShell();
    createMobileBackdrop();

    qsa('[data-pref-menu]').forEach(menu => {
      const trigger = qs('[data-pref-trigger]', menu);
      if (!trigger || trigger.dataset.boundV29 === '1') return;
      trigger.dataset.boundV29 = '1';
      trigger.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        togglePreference(menu);
      });
      trigger.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          event.stopPropagation();
          togglePreference(menu);
        }
      });
    });

    qsa('[data-set-theme], [data-set-lang]').forEach(button => {
      if (button.dataset.boundV29 === '1') return;
      button.dataset.boundV29 = '1';
      button.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        if (button.dataset.setTheme) applyTheme(button.dataset.setTheme);
        else if (button.dataset.setLang) applyLang(button.dataset.setLang);
      });
    });

    const mobileButton = qs('[data-menu]');
    if (mobileButton && mobileButton.dataset.boundV29 !== '1') {
      mobileButton.dataset.boundV29 = '1';
      mobileButton.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        toggleMobileMenu();
      });
    }

    qsa('[data-nav-links] a').forEach(link => {
      if (link.dataset.boundV29 === '1') return;
      link.dataset.boundV29 = '1';
      link.addEventListener('click', () => closeMobileMenu());
    });

    document.addEventListener('click', event => {
      const target = event.target instanceof Element ? event.target : null;
      if (!target) return;
      if (!target.closest('[data-pref-menu]')) closePreferences();
      if (target.matches('[data-mobile-menu-backdrop]')) closeMobileMenu();
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        closePreferences();
        closeMobileMenu();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 900) closeMobileMenu();
    }, { passive: true });

    window.addEventListener('storage', event => {
      if (event.key === LANG_KEY && LANGS.includes(event.newValue)) state.lang = event.newValue;
      if (event.key === THEME_KEY && THEMES.includes(event.newValue)) state.theme = event.newValue;
      syncShell();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bindHeader, { once: true });
  } else {
    bindHeader();
  }

  window.AyanUI = { applyTheme, applyLang, toggleMobileMenu, closePreferences, closeMobileMenu, syncShell };
})();
