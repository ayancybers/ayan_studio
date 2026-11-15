(() => {
  const certificateUrl = 'https://eauthenticate.saudibusiness.gov.sa/certificate-details/0000333236?vt=1.WGT.1794712921.rsUbvORG6XAj.Hr_RbyndBKDLkwiXOPJgTZkuDcm3ECJxrSSxEbnRb6Y';
  const getLabel = () => {
    const language = (localStorage.getItem('ayan_lang') || document.documentElement.lang || 'ar').toLowerCase().startsWith('en') ? 'en' : 'ar';
    return language === 'en' ? 'Verified store' : 'متجر موثّق';
  };

  if (document.querySelector('.sbc-local-verification')) return;

  const badge = document.createElement('div');
  badge.className = 'sbc-local-verification';
  badge.innerHTML = `<a class="sbc-local-verification-trigger" href="${certificateUrl}" target="_blank" rel="noopener noreferrer"><span class="sbc-local-verification-mark" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m12 3 7 3v5c0 4.7-2.8 8.1-7 10-4.2-1.9-7-5.3-7-10V6l7-3Z"/><path d="m8.5 12 2.2 2.2 4.8-5"/></svg></span><span data-verification-label>${getLabel()}</span><span aria-hidden="true">↗</span></a>`;
  document.body.append(badge);
  const syncLabel = () => {
    const label = getLabel();
    const text = badge.querySelector('[data-verification-label]');
    text.textContent = label;
    badge.querySelector('a').setAttribute('aria-label', label);
  };
  window.addEventListener('storage', (event) => {
    if (event.key === 'ayan_lang') syncLabel();
  });
  new MutationObserver(syncLabel).observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
})();
