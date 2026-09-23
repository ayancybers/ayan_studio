(() => {
      'use strict';

      if (window.__ayanGlobalUIV34) return;
      window.__ayanGlobalUIV32 = true;

      const LANG_KEY = 'ayan_lang';
      const THEME_KEY = 'ayan_theme';
      const LANGS = ['ar', 'en'];
      const THEMES = ['relax', 'dark', 'light'];

      const read = (key, fallback) => {
        try {
          const value = localStorage.getItem(key);
          return value || fallback;
        } catch (_) {
          return fallback;
        }
      };

      const write = (key, value) => {
        try { localStorage.setItem(key, value); } catch (_) {}
      };

      const qs = (selector, root = document) => root.querySelector(selector);
      const qsa = (selector, root = document) => Array.from(root.querySelectorAll(selector));

      const state = {
        lang: LANGS.includes(read(LANG_KEY, 'ar')) ? read(LANG_KEY, 'ar') : 'ar',
        theme: THEMES.includes(read(THEME_KEY, 'relax')) ? read(THEME_KEY, 'relax') : 'relax'
      };

      const labels = {
        ar: { relax: 'مريح 💙', dark: 'داكن 🌙', light: 'فاتح ☀️' },
        en: { relax: 'Relax 💙', dark: 'Dark 🌙', light: 'Light ☀️' }
      };

      function addHardUIStyles() {
        if (document.getElementById('ayan-global-ui-v31')) return;

        const style = document.createElement('style');
        style.id = 'ayan-global-ui-v33';
        style.textContent = `
          /* V33: never allow an old backdrop/overlay to steal menu taps */
          .mobile-menu-backdrop,
          .mobile-menu-backdrop-v28,
          .global-mobile-backdrop {
            display: none !important;
            pointer-events: none !important;
          }

          /* Solid mobile menu — no glass */
          @media (max-width: 900px) {
            .site-header {
              position: sticky !important;
              top: 0 !important;
              z-index: 2147483000 !important;
              overflow: visible !important;
              isolation: isolate !important;
            }

            .site-header .navbar,
            .site-header .nav-actions,
            .site-header .pref-menu {
              overflow: visible !important;
            }

            .site-header .nav-actions,
            .site-header .pref-menu,
            .site-header .pref-trigger,
            .site-header .mobile-toggle {
              pointer-events: auto !important;
            }

            .site-header .nav-links {
              position: fixed !important;
              top: calc(var(--header-height) + 8px) !important;
              right: 12px !important;
              left: auto !important;
              inset-inline-end: 12px !important;
              inset-inline-start: auto !important;
              width: min(285px, calc(100vw - 24px)) !important;
              max-height: calc(100dvh - var(--header-height) - 24px) !important;
              height: auto !important;
              min-height: 0 !important;
              overflow-y: auto !important;
              display: grid !important;
              grid-template-rows: repeat(4, auto) !important;
              align-content: start !important;
              gap: 4px !important;
              padding: 8px !important;
              margin: 0 !important;
              background: #08182a !important;
              border: 1px solid #294766 !important;
              border-radius: 18px !important;
              box-shadow: 0 22px 55px rgba(0,0,0,.58) !important;
              backdrop-filter: none !important;
              -webkit-backdrop-filter: none !important;
              z-index: 2147483640 !important;
              pointer-events: none !important;
              opacity: 0 !important;
              visibility: hidden !important;
              transform: translateY(-8px) scale(.98) !important;
              transform-origin: top right !important;
              transition: opacity .16s ease, transform .16s ease, visibility .16s ease !important;
            }

            .site-header .nav-links.open {
              pointer-events: auto !important;
              opacity: 1 !important;
              visibility: visible !important;
              transform: none !important;
            }

            .site-header .nav-links a {
              box-sizing: border-box !important;
              width: 100% !important;
              min-height: 50px !important;
              height: 50px !important;
              display: flex !important;
              align-items: center !important;
              justify-content: flex-start !important;
              padding: 10px 15px !important;
              margin: 0 !important;
              color: #edf5ff !important;
              background: transparent !important;
              border: 0 !important;
              border-radius: 12px !important;
              pointer-events: auto !important;
              touch-action: manipulation !important;
              -webkit-tap-highlight-color: transparent !important;
              font-size: 15px !important;
              line-height: 1.2 !important;
              font-weight: 700 !important;
              text-align: start !important;
            }

            html[dir="rtl"] .site-header .nav-links a {
              justify-content: flex-end !important;
              text-align: right !important;
            }

            html[dir="ltr"] .site-header .nav-links a {
              justify-content: flex-start !important;
              text-align: left !important;
            }

            .site-header .nav-links a::after {
              bottom: 7px !important;
            }

            .site-header .nav-links a:active,
            .site-header .nav-links a:hover,
            .site-header .nav-links a:focus-visible,
            .site-header .nav-links a.active {
              background: #173657 !important;
              color: #fff !important;
              outline: none !important;
            }

            [data-theme="dark"] .site-header .nav-links {
              background: #070f1a !important;
              border-color: #223b57 !important;
            }

            [data-theme="light"] .site-header .nav-links {
              background: #ffffff !important;
              border-color: rgba(20,57,94,.16) !important;
            }

            [data-theme="light"] .site-header .nav-links a {
              color: #22354c !important;
            }

            [data-theme="light"] .site-header .nav-links a:hover,
            [data-theme="light"] .site-header .nav-links a:focus-visible,
            [data-theme="light"] .site-header .nav-links a.active {
              background: #eef5ff !important;
              color: #102038 !important;
            }
          }

          /* Preference panels: solid and above every page layer */
          .site-header .pref-panel {
            background: #08182a !important;
            backdrop-filter: none !important;
            -webkit-backdrop-filter: none !important;
            z-index: 2147483646 !important;
            pointer-events: none !important;
          }

          .site-header .pref-menu.open > .pref-panel {
            pointer-events: auto !important;
          }

          .site-header .pref-panel button {
            pointer-events: auto !important;
            touch-action: manipulation !important;
            -webkit-tap-highlight-color: transparent !important;
            cursor: pointer !important;
          }

          [data-theme="dark"] .site-header .pref-panel {
            background: #070f1a !important;
          }

          [data-theme="light"] .site-header .pref-panel {
            background: #fff !important;
          }

          /* The supplied logo already contains its own circular artwork. */
          .home-loader-mark::before,
          .home-loader-mark::after {
            display: none !important;
            content: none !important;
          }

          .home-loader-mark img {
            width: 100% !important;
            height: 100% !important;
            object-fit: contain !important;
            object-position: center !important;
            border-radius: 50% !important;
            border: 0 !important;
          }

          /* V33: compact booking package selector + package banner */
          .booking-page .booking-main-card {
            overflow: hidden !important;
          }

          .booking-page .booking-main-content {
            position: relative !important;
            z-index: 3 !important;
          }

          .booking-page .ayan-package-banner {
            display: block !important;
            width: min(100%, 760px) !important;
            margin: 0 auto 22px !important;
            border-radius: 20px !important;
            overflow: hidden !important;
            border: 1px solid rgba(118, 178, 255, .28) !important;
            background: #0a1626 !important;
            box-shadow: 0 14px 34px rgba(0,0,0,.28) !important;
            pointer-events: none !important;
            user-select: none !important;
            -webkit-user-select: none !important;
          }

          .booking-page .ayan-package-banner img {
            display: block !important;
            width: 100% !important;
            height: clamp(105px, 18vw, 190px) !important;
            object-fit: cover !important;
            object-position: center !important;
            pointer-events: none !important;
            user-select: none !important;
            -webkit-user-drag: none !important;
            -webkit-user-select: none !important;
          }

          .booking-page .booking-package-wrap {
            width: 100% !important;
            max-width: 820px !important;
            margin-inline: auto !important;
          }

          .booking-page .booking-package-grid {
            display: grid !important;
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 10px !important;
            width: 100% !important;
          }

          .booking-page .booking-package-choice {
            position: relative !important;
            box-sizing: border-box !important;
            min-width: 0 !important;
            min-height: 82px !important;
            height: 82px !important;
            padding: 10px 12px !important;
            display: grid !important;
            grid-template-columns: 44px minmax(0,1fr) auto !important;
            align-items: center !important;
            gap: 10px !important;
            border-radius: 16px !important;
            transform: none !important;
            transition: border-color .18s ease, background .18s ease, box-shadow .18s ease !important;
            touch-action: manipulation !important;
            user-select: none !important;
            -webkit-user-select: none !important;
          }

          .booking-page .booking-package-choice:hover,
          .booking-page .booking-package-choice:focus-visible {
            transform: none !important;
          }

          .booking-page .booking-package-icon {
            width: 42px !important;
            height: 42px !important;
            display: grid !important;
            place-items: center !important;
            font-size: 22px !important;
          }

          .booking-page .booking-package-copy {
            min-width: 0 !important;
            overflow: hidden !important;
          }

          .booking-page .booking-package-copy strong,
          .booking-page .booking-package-copy small {
            display: block !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
            white-space: nowrap !important;
          }

          .booking-page .booking-package-copy strong {
            font-size: 14px !important;
            line-height: 1.25 !important;
          }

          .booking-page .booking-package-copy small {
            margin-top: 4px !important;
            font-size: 11px !important;
            line-height: 1.2 !important;
          }

          .booking-page .booking-package-price {
            min-width: 48px !important;
            text-align: end !important;
          }

          .booking-page .booking-package-price b {
            display: block !important;
            font-size: 24px !important;
            line-height: 1 !important;
          }

          .booking-page .booking-package-price small {
            display: block !important;
            margin-top: 3px !important;
            font-size: 9px !important;
          }

          .booking-page .booking-choice-tag {
            top: 5px !important;
            right: 8px !important;
            left: auto !important;
            padding: 3px 7px !important;
            font-size: 8px !important;
            line-height: 1.1 !important;
          }

          html[dir="rtl"] .booking-page .booking-choice-tag {
            right: 8px !important;
            left: auto !important;
          }

          @media (max-width: 700px) {
            .booking-page .ayan-package-banner {
              width: 100% !important;
              margin-bottom: 16px !important;
              border-radius: 16px !important;
            }

            .booking-page .ayan-package-banner img {
              height: 112px !important;
            }

            .booking-page .booking-package-grid {
              grid-template-columns: 1fr !important;
              gap: 8px !important;
            }

            .booking-page .booking-package-choice {
              height: 70px !important;
              min-height: 70px !important;
              grid-template-columns: 40px minmax(0,1fr) auto !important;
              padding: 8px 10px !important;
              border-radius: 14px !important;
            }

            .booking-page .booking-package-icon {
              width: 38px !important;
              height: 38px !important;
              font-size: 20px !important;
            }

            .booking-page .booking-package-copy strong {
              font-size: 13px !important;
            }

            .booking-page .booking-package-copy small {
              font-size: 10px !important;
              margin-top: 3px !important;
            }

            .booking-page .booking-package-price b {
              font-size: 22px !important;
            }

            .booking-page .booking-package-price small {
              font-size: 8px !important;
            }
          }

          /* Keep the package selector from being visually enlarged by old hover/scale rules. */
          .booking-page .booking-package-choice,
          .booking-page .booking-package-choice * {
            transform-origin: center !important;
          }

          /* Prevent image dragging/long-press saving on the supplied banner. */
          .booking-page .ayan-package-banner,
          .booking-page .ayan-package-banner * {
            -webkit-touch-callout: none !important;
          }

          /* V34: keep the banner only with the main booking form.
             The section below is text/package information only — no repeated image. */
          .booking-page .booking-aside .ayan-package-banner {
            display: none !important;
          }

          .booking-page .booking-aside {
            position: relative !important;
          }

          @media (max-width: 900px) {
            .booking-page .booking-aside {
              position: relative !important;
              top: auto !important;
              margin-top: 18px !important;
            }
          }
        `;
        document.head.appendChild(style);
      }

      function ensureBookingPackageBanner() {
        if (!document.body?.classList.contains('booking-page')) return;
        const content = qs('.booking-page .booking-main-content');
        if (!content) return;

        const banners = qsa('.booking-page .ayan-package-banner');
        banners.slice(1).forEach(el => el.remove());

        if (content.querySelector('.ayan-package-banner')) return;

        const banner = document.createElement('div');
        banner.className = 'ayan-package-banner';
        banner.setAttribute('aria-hidden', 'true');

        const img = document.createElement('img');
        img.src = 'https://b.top4top.io/p_3918mczhv1.png';
        img.alt = '';
        img.draggable = false;
        img.decoding = 'async';
        img.loading = 'eager';

        banner.appendChild(img);

        const formHeader = qs('.form-header', content);
        if (formHeader) content.insertBefore(banner, formHeader);
        else content.prepend(banner);
      }

      function lockMobileZoom() {
        const viewport = document.querySelector('meta[name="viewport"]');
        if (!viewport) return;
        const content = viewport.getAttribute('content') || '';
        if (!/maximum-scale/i.test(content)) {
          viewport.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no');
        }
      }

      function syncShell() {
        document.documentElement.lang = state.lang;
        document.documentElement.dir = state.lang === 'ar' ? 'rtl' : 'ltr';

        if (document.body) document.body.dataset.theme = state.theme;

        qsa('[data-theme-label]').forEach(el => {
          el.textContent = labels[state.lang][state.theme];
        });

        qsa('[data-lang-label]').forEach(el => {
          el.textContent = state.lang === 'ar' ? 'العربية' : 'English';
        });

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

      function closePreferences() {
        qsa('[data-pref-menu]').forEach(menu => {
          menu.classList.remove('open');
          qs('[data-pref-trigger]', menu)?.setAttribute('aria-expanded', 'false');
          const panel = qs('[data-pref-panel]', menu);
          if (panel) {
            panel.style.removeProperty('top');
            panel.style.removeProperty('left');
            panel.style.removeProperty('right');
          }
        });
      }

      function closeMobileMenu() {
        const nav = qs('[data-nav-links]');
        const button = qs('[data-menu]');

        nav?.classList.remove('open');
        button?.classList.remove('is-open');
        button?.setAttribute('aria-expanded', 'false');
        document.body?.classList.remove('mobile-menu-open');
      }

      function positionPanel(menu) {
        const trigger = qs('[data-pref-trigger]', menu);
        const panel = qs('[data-pref-panel]', menu);
        if (!trigger || !panel) return;

        const rect = trigger.getBoundingClientRect();
        const width = Math.min(180, window.innerWidth - 20);
        const gap = 8;
        const top = Math.round(rect.bottom + gap);

        panel.style.position = 'fixed';
        panel.style.width = `${width}px`;
        panel.style.minWidth = `${width}px`;
        panel.style.maxWidth = `${width}px`;
        panel.style.top = `${Math.max(8, top)}px`;

        if (document.documentElement.dir === 'rtl') {
          const right = Math.max(8, window.innerWidth - rect.right);
          panel.style.right = `${right}px`;
          panel.style.left = 'auto';
        } else {
          const left = Math.max(8, rect.left);
          panel.style.left = `${Math.min(left, window.innerWidth - width - 8)}px`;
          panel.style.right = 'auto';
        }
      }

      function openPreference(menu) {
        closeMobileMenu();
        closePreferences();
        menu.classList.add('open');
        qs('[data-pref-trigger]', menu)?.setAttribute('aria-expanded', 'true');
        positionPanel(menu);
      }

      function togglePreference(menu) {
        if (!menu) return;
        if (menu.classList.contains('open')) {
          closePreferences();
        } else {
          openPreference(menu);
        }
      }

      function applyTheme(theme) {
        if (!THEMES.includes(theme)) return;
        state.theme = theme;
        write(THEME_KEY, theme);

        if (document.body) document.body.dataset.theme = theme;

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

      function openMobileMenu() {
        const nav = qs('[data-nav-links]');
        const button = qs('[data-menu]');
        if (!nav || !button) return;

        closePreferences();

        nav.classList.add('open');
        button.classList.add('is-open');
        button.setAttribute('aria-expanded', 'true');
        document.body.classList.add('mobile-menu-open');

        nav.style.setProperty('z-index', '2147483640', 'important');
        nav.style.setProperty('pointer-events', 'auto', 'important');

        const header = qs('.site-header');
        const headerHeight = header?.getBoundingClientRect().height || 72;
        nav.style.setProperty('top', `${Math.round(headerHeight + 8)}px`, 'important');

        nav.style.setProperty('right', '12px', 'important');
        nav.style.setProperty('left', 'auto', 'important');
        nav.style.setProperty('inset-inline-end', '12px', 'important');
        nav.style.setProperty('inset-inline-start', 'auto', 'important');
        nav.style.setProperty('transform-origin', 'top right', 'important');
      }

      function toggleMobileMenu() {
        const nav = qs('[data-nav-links]');
        if (!nav) return;
        if (nav.classList.contains('open')) closeMobileMenu();
        else openMobileMenu();
      }

      function bindHeader() {
        addHardUIStyles();
        ensureBookingPackageBanner();
        lockMobileZoom();
        syncShell();

        qsa('.mobile-menu-backdrop, .mobile-menu-backdrop-v28, .global-mobile-backdrop').forEach(el => el.remove());

        qsa('[data-pref-menu]').forEach(menu => {
          const trigger = qs('[data-pref-trigger]', menu);
          if (!trigger || trigger.dataset.ayanUiV32Bound === '1') return;

          trigger.dataset.ayanUiV32Bound = '1';

          trigger.addEventListener('click', event => {
            event.preventDefault();
            event.stopPropagation();
            togglePreference(menu);
          }, false);

          trigger.addEventListener('touchend', event => {
            event.preventDefault();
            event.stopPropagation();
            togglePreference(menu);
          }, { passive: false });

          trigger.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
              event.preventDefault();
              event.stopPropagation();
              togglePreference(menu);
            }
          });
        });

        if (!document.documentElement.dataset.ayanUiChoicesBound) {
          document.documentElement.dataset.ayanUiChoicesBound = '1';

          document.addEventListener('click', event => {
            const target = event.target instanceof Element ? event.target : null;
            if (!target) return;

            const themeButton = target.closest('[data-set-theme]');
            if (themeButton) {
              event.preventDefault();
              event.stopPropagation();
              applyTheme(themeButton.dataset.setTheme);
              return;
            }

            const langButton = target.closest('[data-set-lang]');
            if (langButton) {
              event.preventDefault();
              event.stopPropagation();
              applyLang(langButton.dataset.setLang);
              return;
            }

            if (!target.closest('[data-pref-menu]')) closePreferences();
          }, true);

          document.addEventListener('touchend', event => {
            const target = event.target instanceof Element ? event.target : null;
            if (!target) return;

            const themeButton = target.closest('[data-set-theme]');
            if (themeButton) {
              event.preventDefault();
              event.stopPropagation();
              applyTheme(themeButton.dataset.setTheme);
              return;
            }

            const langButton = target.closest('[data-set-lang]');
            if (langButton) {
              event.preventDefault();
              event.stopPropagation();
              applyLang(langButton.dataset.setLang);
              return;
            }
          }, { capture: true, passive: false });

          document.addEventListener('keydown', event => {
            if (event.key === 'Escape') {
              closePreferences();
              closeMobileMenu();
            }
          }, true);
        }

        const mobileButton = qs('[data-menu]');
        if (mobileButton && mobileButton.dataset.ayanUiV32Bound !== '1') {
          mobileButton.dataset.ayanUiV32Bound = '1';

          mobileButton.addEventListener('click', event => {
            event.preventDefault();
            event.stopPropagation();
            toggleMobileMenu();
          }, false);

          mobileButton.addEventListener('touchend', event => {
            event.preventDefault();
            event.stopPropagation();
            toggleMobileMenu();
          }, { passive: false });
        }

        qsa('[data-nav-links] a').forEach(link => {
          if (link.dataset.ayanUiV32Bound === '1') return;
          link.dataset.ayanUiV32Bound = '1';

          link.addEventListener('click', event => {
            const href = link.getAttribute('href');
            if (!href) return;
            event.preventDefault();
            event.stopPropagation();
            closeMobileMenu();
            window.location.assign(href);
          }, false);

          link.addEventListener('touchend', event => {
            const href = link.getAttribute('href');
            if (!href) return;
            event.preventDefault();
            event.stopPropagation();
            closeMobileMenu();
            window.location.assign(href);
          }, { passive: false });
        });

        const reposition = () => {
          qsa('[data-pref-menu].open').forEach(positionPanel);
          const nav = qs('[data-nav-links].open');
          if (nav && window.innerWidth <= 900) {
            const header = qs('.site-header');
            const height = header?.getBoundingClientRect().height || 72;
            nav.style.setProperty('top', `${Math.round(height + 8)}px`, 'important');
          }
        };

        window.addEventListener('resize', reposition, { passive: true });
        window.addEventListener('scroll', reposition, { passive: true });

        document.addEventListener('click', event => {
          const target = event.target instanceof Element ? event.target : null;
          if (!target) return;
          if (!target.closest('[data-pref-menu]')) closePreferences();
        });

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

      window.AyanUI = {
        applyTheme,
        applyLang,
        toggleMobileMenu,
        closePreferences,
        closeMobileMenu,
        syncShell
      };
    })();
