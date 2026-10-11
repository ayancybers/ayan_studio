(() => {
  const checkoutKey = 'ayan_checkout_data';
  const fallbackConfig = {
    pricing: {
      paymentFeeEnabled: true,
      paymentFees: {
        cardLocal: { percent: 2.5, fixed: 1 },
        cardInternational: { percent: 3, fixed: 1 },
        mada: { percent: 1.2, fixed: 1 },
        amex: { percent: 2.9, fixed: 1 },
        stcPay: { percent: 1.8, fixed: 1 },
        applePay: { percent: 1.2, fixed: 1 },
        tabby: { percent: 6.99, fixed: 7.5 },
        tamara: { percent: 6.99, fixed: 7.5 }
      }
    },
    packages: {
      silver: { price: 50, originalPrice: 70, discount: 20 },
      basic: { price: 80, originalPrice: 100, discount: 20 },
      advanced: { price: 130, originalPrice: 150, discount: 20 },
      royal: { price: 180, originalPrice: 200, discount: 20 }
    }
  };

  let order = null;
  let config = fallbackConfig;
  let selectedMethod = '';
  let activePaymentGroup = 'standard';
  const selectedMethodsByGroup = { standard: '', installments: '' };
  const availableMethods = new Set();
  try { order = JSON.parse(sessionStorage.getItem(checkoutKey) || 'null'); } catch (_) {}

  const ar = (localStorage.getItem('ayan_lang') || 'ar') === 'ar';
  const copy = ar ? {
    pageTitle: 'الدفع الآمن | Ayan Photography', editBooking: 'تعديل الطلب',
    title: 'مراجعة الطلب والدفع', subtitle: 'راجع بياناتك والمبلغ النهائي قبل الانتقال إلى صفحة الدفع الآمنة.',
    demoNotice: 'وضع الدفع التجريبي مفعّل حاليًا. لن يتم تحصيل سعر الباقة الحقيقي أثناء الاختبار؛ سيتم استخدام مفاتيح الدفع التجريبية المخصصة للموقع.',
    paymentSelector: 'اختر طريقة الدفع', applePayTitle: 'Apple Pay', applePayDescription: 'الدفع عبر محفظة Apple',
    methodUnavailable: 'غير مفعّلة لدى طويق باي حاليًا',
    standardPaymentsTitle: 'طرق الدفع العادية', standardPaymentsDescription: 'مدى و Apple Pay والبطاقات والمحافظ',
    installmentPaymentsTitle: 'الدفع بالتقسيط', installmentPaymentsDescription: 'تابي وتمارا',
    madaTitle: 'مدى', madaDescription: 'بطاقة مدى السعودية', localCardTitle: 'Visa / Mastercard',
    cardOriginDescription: 'اختر نوع البطاقة ليظهر الإجمالي المناسب',
    localCardOption: 'بطاقة صادرة من السعودية — 2.5% + 1 ريال',
    internationalCardOption: 'بطاقة خليجية أو دولية — 3% + 1 ريال', amexTitle: 'American Express',
    amexDescription: 'بطاقة أمريكان إكسبريس', stcPayTitle: 'STC Pay', stcPayDescription: 'المحفظة الرقمية',
    tabbyDescription: 'ادفع لاحقًا', tamaraDescription: 'ادفع على دفعات',
    emailLabel: 'البريد الإلكتروني لإرسال الفاتورة', emailHelp: 'ستصلك الفاتورة وتفاصيل الطلب على هذا البريد بعد تأكيد الدفع.',
    pay: 'متابعة إلى الدفع الآمن',
    paymentNote: 'اختر وسيلة الدفع المناسبة. سيُحوّلك مزود الدفع إلى صفحة آمنة لإتمام العملية.',
    notConfigured: 'بوابة الدفع تحتاج إلى إكمال إعداد حساب التاجر قبل إتاحتها.',
    preparing: 'جاري تجهيز عملية الدفع…', backBooking: '← العودة وتعديل البيانات',
    secureNote: 'سيتم تحويلك إلى صفحة الدفع المستضافة من مزود الدفع. لا يتم تخزين بيانات البطاقة في موقع Ayan Photography.',
    package: 'الباقة', beforeDiscount: 'السعر قبل الخصم', afterDiscount: 'السعر بعد الخصم',
    discount: 'الخصم', fee: 'رسوم الدفع', total: 'الإجمالي', name: 'الاسم', phone: 'الجوال',
    car: 'السيارة', area: 'منطقة التصوير', noOrder: 'لم يتم العثور على الطلب. ارجع إلى صفحة الحجز وأعد المحاولة.',
    chooseMethod: 'طريقة الدفع غير متاحة حاليًا. اختر إحدى الطرق المتاحة.',
    emailInvalid: 'اكتب بريدًا إلكترونيًا صحيحًا لإرسال الفاتورة.', paymentFailed: 'تعذر تجهيز عملية الدفع.',
    noRedirect: 'لم يتم استلام رابط الدفع.',
    feeDetail: '{method}: رسوم {fee} SAR ({percent}% + {fixed} SAR).'
  } : {
    pageTitle: 'Secure checkout | Ayan Photography', editBooking: 'Edit booking',
    title: 'Review your booking', subtitle: 'Check your details and final amount before moving to secure payment.',
    demoNotice: 'Test payment mode is enabled. The live package price will not be charged during testing; the site is using its dedicated test payment keys.',
    paymentSelector: 'Choose a payment method', applePayTitle: 'Apple Pay', applePayDescription: 'Pay with Apple Wallet',
    methodUnavailable: 'Not enabled by TuwaiqPay yet',
    standardPaymentsTitle: 'Regular payment methods', standardPaymentsDescription: 'mada, Apple Pay, cards, and wallets',
    installmentPaymentsTitle: 'Pay in installments', installmentPaymentsDescription: 'Tabby and Tamara',
    madaTitle: 'mada', madaDescription: 'Saudi mada card', localCardTitle: 'Visa / Mastercard',
    cardOriginDescription: 'Choose the card type to show the matching total',
    localCardOption: 'Issued in Saudi Arabia — 2.5% + SAR 1',
    internationalCardOption: 'Gulf or international — 3% + SAR 1', amexTitle: 'American Express',
    amexDescription: 'American Express card', stcPayTitle: 'STC Pay', stcPayDescription: 'Digital wallet',
    tabbyDescription: 'Pay later', tamaraDescription: 'Split your payment',
    emailLabel: 'Email address for your invoice', emailHelp: 'Your invoice and booking details will be sent here after payment is confirmed.',
    pay: 'Continue to secure payment',
    paymentNote: 'Choose a payment method. The provider will open a secure page to complete your payment.',
    notConfigured: 'The merchant account needs to be configured before this payment option is available.',
    preparing: 'Preparing your payment…', backBooking: '← Back to edit your details',
    secureNote: 'You will continue to the payment provider’s secure checkout. Ayan Photography does not store card details.',
    package: 'Package', beforeDiscount: 'Original price', afterDiscount: 'Discounted price',
    discount: 'Discount', fee: 'Payment fee', total: 'Total', name: 'Name', phone: 'Mobile',
    car: 'Car', area: 'Shoot area', noOrder: 'No booking was found. Return to the booking page and try again.',
    chooseMethod: 'This payment method is unavailable. Choose an available option.',
    emailInvalid: 'Enter a valid email address for your invoice.', paymentFailed: 'Unable to prepare payment.',
    noRedirect: 'No payment link was received.',
    feeDetail: '{method}: {fee} SAR fee ({percent}% + {fixed} SAR).'
  };

  const methodPricingKey = {
    tuwaiqpay_apple_pay: 'applePay', tuwaiqpay_mada: 'mada',
    tuwaiqpay_visa_local: 'cardLocal', tuwaiqpay_visa_international: 'cardInternational',
    tuwaiqpay_amex: 'amex', tuwaiqpay_stc_pay: 'stcPay', tabby: 'tabby', tamara: 'tamara'
  };
  const providerCodes = {
    tuwaiqpay_apple_pay: ['APPLE_PAY'], tuwaiqpay_mada: ['MADA'],
    tuwaiqpay_visa_local: ['VISA', 'MASTER'], tuwaiqpay_visa_international: ['VISA', 'MASTER'],
    tuwaiqpay_amex: ['AMEX'], tuwaiqpay_stc_pay: ['STC_PAY']
  };
  const paymentGroups = {
    standard: ['tuwaiqpay_mada', 'tuwaiqpay_apple_pay', 'tuwaiqpay_visa_local', 'tuwaiqpay_visa_international', 'tuwaiqpay_amex', 'tuwaiqpay_stc_pay'],
    installments: ['tabby', 'tamara']
  };
  const methodNames = {
    tuwaiqpay_apple_pay: 'Apple Pay', tuwaiqpay_mada: ar ? 'مدى' : 'mada',
    tuwaiqpay_visa_local: ar ? 'Visa / Mastercard محلية' : 'Local Visa / Mastercard',
    tuwaiqpay_visa_international: ar ? 'Visa / Mastercard دولية' : 'International Visa / Mastercard',
    tuwaiqpay_amex: 'American Express', tuwaiqpay_stc_pay: 'STC Pay',
    tabby: 'Tabby', tamara: 'Tamara'
  };

  const byId = (id) => document.getElementById(id);
  const summary = byId('summary');
  const customer = byId('customer');
  const error = byId('error');
  const payButton = byId('payBtn');
  const status = byId('status');
  const demoNotice = byId('demoNotice');
  const emailInput = byId('invoiceEmail');
  const feeNote = byId('paymentFeeNote');
  const cardOrigin = byId('cardOrigin');
  const cardOriginTotal = byId('cardOriginTotal');
  const cardChoice = byId('visaMastercardChoice');
  function setPaymentGroup(group) {
    activePaymentGroup = group;
    document.querySelectorAll('[data-payment-category-tab]').forEach((tab) => {
      const active = tab.dataset.paymentCategoryTab === group;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    document.querySelectorAll('[data-payment-category-panel]').forEach((panel) => {
      panel.hidden = panel.dataset.paymentCategoryPanel !== group;
    });
  }
  function groupForMethod(method) {
    return paymentGroups.installments.includes(method) ? 'installments' : 'standard';
  }
  function selectPaymentGroup(group) {
    const methods = paymentGroups[group].filter((method) => availableMethods.has(method));
    if (!methods.length) return;
    const remembered = selectedMethodsByGroup[group];
    selectMethod(methods.includes(remembered) ? remembered : methods[0]);
  }
  payButton.disabled = true;
  const money = (value) => `${Number(value || 0).toFixed(2)} SAR`;
  const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (char) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
  }[char]));
  const packageNames = {
    silver: ar ? 'الرول' : 'ROLL', basic: ar ? 'الحركة' : 'MOTION',
    advanced: ar ? 'البصمة' : 'SIGNATURE', royal: ar ? 'السينمائي' : 'CINEMATIC'
  };

  document.documentElement.lang = ar ? 'ar' : 'en';
  document.documentElement.dir = ar ? 'rtl' : 'ltr';
  document.title = copy.pageTitle;
  document.querySelectorAll('[data-checkout-key]').forEach((node) => {
    const value = copy[node.dataset.checkoutKey];
    if (value) node.textContent = value;
  });
  document.querySelector('.payment-selector')?.setAttribute('aria-label', copy.paymentSelector);
  document.querySelector('.payment-selector')?.setAttribute('aria-label', copy.paymentSelector);

  if (!order) {
    summary.innerHTML = `<div class="checkout-empty">${copy.noOrder}</div>`;
    customer.innerHTML = '';
    summary.setAttribute('aria-busy', 'false');
    customer.setAttribute('aria-busy', 'false');
    error.textContent = copy.noOrder;
    error.classList.add('show');
    payButton.disabled = true;
    return;
  }

  function pricingFor(method) {
    const fallbackPackage = fallbackConfig.packages[order.packageKey] || { price: 0, originalPrice: 0, discount: 0 };
    const pkg = config.packages?.[order.packageKey] || fallbackPackage;
    const base = Number(pkg.price || 0);
    const key = methodPricingKey[method] || method;
    const feeConfig = config.pricing?.paymentFees?.[key] || { percent: 0, fixed: 0 };
    const fee = config.pricing?.paymentFeeEnabled !== false
      ? Math.round((base * Number(feeConfig.percent || 0) / 100 + Number(feeConfig.fixed || 0)) * 100) / 100
      : 0;
    return { base, fee, total: Math.round((base + fee) * 100) / 100, feeConfig, pkg };
  }

  function renderSummary() {
    const finance = pricingFor(selectedMethod);
    summary.innerHTML = `<div class="checkout-row"><span>${copy.package}</span><strong>${escapeHtml(packageNames[order.packageKey] || order.packageType)}</strong></div><div class="checkout-row"><span>${copy.beforeDiscount}</span><strong class="checkout-old">${money(finance.pkg.originalPrice ?? finance.base)}</strong></div><div class="checkout-row"><span>${copy.afterDiscount}</span><strong>${money(finance.base)}</strong></div><div class="checkout-row"><span>${copy.discount}</span><strong class="checkout-discount">- ${money(finance.pkg.discount ?? 0)}</strong></div><div class="checkout-row"><span>${copy.fee}</span><strong>${money(finance.fee)}</strong></div><div class="checkout-row total"><span>${copy.total}</span><strong>${money(finance.total)}</strong></div>`;
    summary.setAttribute('aria-busy', 'false');
    document.querySelectorAll('[data-method-total]').forEach((node) => {
      node.textContent = money(pricingFor(node.dataset.methodTotal).total);
    });
    if (cardOrigin && cardOriginTotal) cardOriginTotal.textContent = money(pricingFor(cardOrigin.value).total);
    if (!selectedMethod) {
      feeNote.textContent = copy.notConfigured;
      return;
    }
    const methodPricing = pricingFor(selectedMethod);
    feeNote.textContent = copy.feeDetail
      .replace('{method}', methodNames[selectedMethod] || selectedMethod)
      .replace('{fee}', methodPricing.fee.toFixed(2))
      .replace('{percent}', Number(methodPricing.feeConfig.percent || 0).toFixed(2))
      .replace('{fixed}', Number(methodPricing.feeConfig.fixed || 0).toFixed(2));
  }

  function selectMethod(method) {
    if (!availableMethods.has(method)) return;
    selectedMethod = method;
    activePaymentGroup = groupForMethod(method);
    selectedMethodsByGroup[activePaymentGroup] = method;
    setPaymentGroup(activePaymentGroup);
    document.querySelectorAll('[data-payment-method]').forEach((node) => {
      const active = node.dataset.paymentMethod === selectedMethod;
      node.classList.toggle('selected', active);
      node.setAttribute('aria-pressed', String(active));
    });
    cardChoice?.classList.toggle('selected', method === 'tuwaiqpay_visa_local' || method === 'tuwaiqpay_visa_international');
    renderSummary();
  }

  function refreshAvailableMethods(serverConfig) {
    availableMethods.clear();
    const available = new Set(Array.isArray(serverConfig.availablePaymentMethods) ? serverConfig.availablePaymentMethods : []);
    if (available.has('tabby') && serverConfig.tabbyConfigured) availableMethods.add('tabby');
    if (available.has('tamara') && serverConfig.tamaraConfigured) availableMethods.add('tamara');
    const supported = new Set(Array.isArray(serverConfig.tuwaiqPayMethods) ? serverConfig.tuwaiqPayMethods : []);
    if (serverConfig.tuwaiqPayConfigured) {
      for (const [method, codes] of Object.entries(providerCodes)) {
        if (codes.some((code) => supported.has(code))) availableMethods.add(method);
      }
    }
    const localCardAvailable = availableMethods.has('tuwaiqpay_visa_local');
    const internationalCardAvailable = availableMethods.has('tuwaiqpay_visa_international');
    if (cardOrigin) {
      cardOrigin.options[0].disabled = !localCardAvailable;
      cardOrigin.options[1].disabled = !internationalCardAvailable;
      cardOrigin.disabled = !localCardAvailable && !internationalCardAvailable;
      if (cardOrigin.value === 'tuwaiqpay_visa_local' && !localCardAvailable && internationalCardAvailable) cardOrigin.value = 'tuwaiqpay_visa_international';
      if (cardOrigin.value === 'tuwaiqpay_visa_international' && !internationalCardAvailable && localCardAvailable) cardOrigin.value = 'tuwaiqpay_visa_local';
      cardChoice?.classList.toggle('is-disabled', cardOrigin.disabled);
    }
    document.querySelectorAll('[data-payment-method]').forEach((node) => {
      const isAvailable = availableMethods.has(node.dataset.paymentMethod);
      node.disabled = !isAvailable;
      node.setAttribute('aria-disabled', String(!isAvailable));
      if (node.classList.contains('tuwaiqpay-choice')) {
        const description = node.querySelector('[data-checkout-key]');
        const descriptionKey = description?.dataset.checkoutKey;
        if (description && descriptionKey && serverConfig.tuwaiqPayConfigured) {
          description.textContent = isAvailable ? copy[descriptionKey] : copy.methodUnavailable;
        }
      }
    });
    document.querySelectorAll('[data-payment-category-tab]').forEach((tab) => {
      const hasAvailableMethod = paymentGroups[tab.dataset.paymentCategoryTab].some((method) => availableMethods.has(method));
      tab.disabled = !hasAvailableMethod;
      tab.setAttribute('aria-disabled', String(!hasAvailableMethod));
    });
    if (!availableMethods.has(selectedMethod)) selectedMethod = '';
    if (!selectedMethod || groupForMethod(selectedMethod) !== activePaymentGroup) {
      selectedMethod = paymentGroups[activePaymentGroup].find((method) => availableMethods.has(method)) || '';
    }
    if (!selectedMethod) {
      activePaymentGroup = paymentGroups.standard.some((method) => availableMethods.has(method)) ? 'standard' : 'installments';
      selectedMethod = paymentGroups[activePaymentGroup].find((method) => availableMethods.has(method)) || '';
    }
    if (selectedMethod) selectedMethodsByGroup[activePaymentGroup] = selectedMethod;
    setPaymentGroup(activePaymentGroup);
    if (cardOrigin && (selectedMethod === 'tuwaiqpay_visa_local' || selectedMethod === 'tuwaiqpay_visa_international')) cardOrigin.value = selectedMethod;
    if (!availableMethods.size) {
      feeNote.textContent = copy.notConfigured;
      payButton.disabled = true;
    } else {
      payButton.disabled = false;
      document.getElementById('paymentNote').textContent = copy.paymentNote;
    }
    document.querySelectorAll('[data-payment-method]').forEach((node) => {
      const active = node.dataset.paymentMethod === selectedMethod;
      node.classList.toggle('selected', active);
      node.setAttribute('aria-pressed', String(active));
    });
    cardChoice?.classList.toggle('selected', selectedMethod === 'tuwaiqpay_visa_local' || selectedMethod === 'tuwaiqpay_visa_international');
    renderSummary();
  }

  customer.innerHTML = `<div><span>${copy.name}</span><strong>${escapeHtml(order.name)}</strong></div><div><span>${copy.phone}</span><strong>${escapeHtml(order.phone)}</strong></div><div><span>${copy.car}</span><strong>${escapeHtml(order.carType)}</strong></div><div><span>${copy.area}</span><strong>${escapeHtml(order.shootRegion)}</strong></div>`;
  customer.setAttribute('aria-busy', 'false');
  document.querySelectorAll('[data-payment-method]').forEach((node) => {
    node.addEventListener('click', () => selectMethod(node.dataset.paymentMethod));
  });
  document.querySelectorAll('[data-payment-category-tab]').forEach((tab) => {
    tab.addEventListener('click', () => selectPaymentGroup(tab.dataset.paymentCategoryTab));
  });
  cardOrigin?.addEventListener('change', () => selectMethod(cardOrigin.value));
  cardChoice?.addEventListener('click', (event) => {
    if (event.target !== cardOrigin && !cardOrigin?.disabled) selectMethod(cardOrigin.value);
  });

  fetch('/api/tuwaiqpay-payment?config=1', { cache: 'no-store' }).then((response) => {
    if (!response.ok) throw new Error('Payment configuration unavailable');
    return response.json();
  }).then((serverConfig) => {
    if (serverConfig?.pricing && serverConfig?.packages) config = serverConfig;
    if (serverConfig?.testMode) demoNotice.classList.add('show');
    refreshAvailableMethods(serverConfig || {});
  }).catch(() => {
    refreshAvailableMethods({ availablePaymentMethods: [], tuwaiqPayMethods: [] });
  });

  payButton.addEventListener('click', async () => {
    error.classList.remove('show');
    payButton.disabled = true;
    status.style.display = 'block';
    try {
      if (!availableMethods.has(selectedMethod)) throw new Error(copy.chooseMethod);
      const email = String(emailInput?.value || '').trim().toLowerCase();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw new Error(copy.emailInvalid);
      const payload = { ...order, email, lang: ar ? 'ar' : 'en', paymentMethod: selectedMethod };
      const endpoint = selectedMethod.startsWith('tuwaiqpay_')
        ? '/api/tuwaiqpay-payment'
        : selectedMethod === 'tabby' ? '/api/tabby-payment' : '/api/tamara-payment';
      const response = await fetch(endpoint, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) {
        const genericProviderError = result.error === 'Unable to prepare TuwaiqPay checkout. Please try again.';
        const message = genericProviderError ? copy.paymentFailed : (result.error || copy.paymentFailed);
        const reference = result.requestId
          ? (ar ? ` (رقم التتبع: ${String(result.requestId).slice(0, 80)})` : ` (Reference: ${String(result.requestId).slice(0, 80)})`)
          : '';
        throw new Error(`${message}${reference}`);
      }
      if (!result.redirectUrl) throw new Error(copy.noRedirect);
      if (selectedMethod === 'tabby' && result.paymentId) sessionStorage.setItem('ayan_tabby_payment_id', result.paymentId);
      if (selectedMethod === 'tamara' && result.orderId) sessionStorage.setItem('ayan_tamara_order_id', result.orderId);
      if (selectedMethod.startsWith('tuwaiqpay_') && result.transactionId) sessionStorage.setItem('ayan_tuwaiq_transaction_id', result.transactionId);
      sessionStorage.setItem('ayan_payment_method', selectedMethod);
      window.location.assign(result.redirectUrl);
    } catch (cause) {
      error.textContent = cause?.message || copy.paymentFailed;
      error.classList.add('show');
      payButton.disabled = false;
      status.style.display = 'none';
    }
  });
})();
