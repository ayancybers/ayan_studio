(() => {
  'use strict';

  const state = { notice: null, timer: 0 };
  const touchDevice = () => navigator.maxTouchPoints > 0 || matchMedia('(pointer: coarse)').matches || window.innerWidth <= 900 || /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const editable = (target) => Boolean(target?.closest?.('input, textarea, select, [contenteditable="true"]'));

  function showNotice(ms = 0) {
    if (!state.notice) {
      const notice = document.createElement('div');
      notice.id = 'security-notice';
      notice.innerHTML = '<div class="security-notice-card" role="alertdialog" aria-modal="true"><div class="security-notice-icon">🔒</div><strong>Developer tools detected</strong><p>Please close developer tools to continue browsing.</p></div>';
      document.body.appendChild(notice);
      state.notice = notice;
    }
    const en = document.documentElement.lang === 'en';
    state.notice.querySelector('strong').textContent = en ? 'Developer tools detected' : 'تم اكتشاف أدوات المطور';
    state.notice.querySelector('p').textContent = en ? 'Please close developer tools to continue browsing.' : 'فضلاً أغلق أدوات المطور للمتابعة في الموقع.';
    if (ms) {
      clearTimeout(state.timer);
      state.timer = setTimeout(() => {
        if (!detectDesktopTools()) clearNotice();
      }, ms);
    }
  }

  function clearNotice() {
    state.notice?.remove();
    state.notice = null;
    document.documentElement.classList.remove('devtools-detected');
  }

  function detectDesktopTools() {
    if (touchDevice()) {
      clearNotice();
      return false;
    }
    const gapW = Math.abs(window.outerWidth - window.innerWidth);
    const gapH = Math.abs(window.outerHeight - window.innerHeight);
    return gapW > 180 || gapH > 180;
  }

  function checkTools() {
    if (touchDevice()) return;
    const detected = detectDesktopTools();
    if (detected) {
      document.documentElement.classList.add('devtools-detected');
      showNotice(12000);
    } else {
      clearNotice();
    }
  }

  document.addEventListener('keydown', (event) => {
    if (editable(event.target)) return;
    const key = String(event.key || '').toLowerCase();
    const modified = event.ctrlKey || event.metaKey;
    const devtoolsShortcut = event.key === 'F12' || (modified && event.shiftKey && ['i', 'j', 'c', 'k'].includes(key));
    const blocked = devtoolsShortcut || (modified && ['u', 's'].includes(key));
    if (!blocked) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    if (devtoolsShortcut && !touchDevice()) {
      document.documentElement.classList.add('devtools-detected');
      showNotice(12000);
    }
  }, true);

  document.addEventListener('contextmenu', (event) => {
    if (!editable(event.target)) event.preventDefault();
  }, true);
  document.addEventListener('dragstart', (event) => {
    const tag = event.target?.tagName;
    if (tag === 'IMG' || tag === 'VIDEO') event.preventDefault();
  }, true);
  document.addEventListener('wheel', (event) => {
    if ((event.ctrlKey || event.metaKey) && !editable(event.target)) event.preventDefault();
  }, { passive: false, capture: true });

  if (!touchDevice()) {
    window.addEventListener('resize', checkTools, { passive: true });
    window.addEventListener('focus', checkTools, { passive: true });
    setInterval(checkTools, 1600);
  }
})();
