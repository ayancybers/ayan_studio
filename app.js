
const WHATSAPP_NUMBER = '966565117739';
const STORAGE_LANG = 'ayan_lang';
const STORAGE_THEME = 'ayan_theme';
const DEFAULT_LANG = 'ar';
const DEFAULT_THEME = 'relax';

const translations = {
  ar: {
    brandTag: 'Car Photography Studio',
    home: 'الرئيسية', features: 'المميزات', booking: 'الحجز', gallery: 'المعرض', quick: 'حجز سريع', socialWhatsApp: 'واتساب', socialInstagram: 'إنستغرام', socialSnapchat: 'سناب شات',
    theme: 'الثيم', lang: 'اللغة', relax: 'مريح 💙', dark: 'داكن 🌙', light: 'فاتح ☀️',
    heroEyebrow: 'تصوير سيارات بطابع سينمائي',
    heroTitle: 'خلّ سيارتك <span>تتكلم بالصورة.</span>',
    heroLead: 'جلسات رولينق، تصوير ثابت، ومونتاج احترافي — من أول لقطة إلى آخر فريم، بتجربة حجز أبسط وأسرع.',
    bookNow: 'احجز جلستك', watchGallery: 'شاهد المعرض',
    heroCard1Title: 'الهوية البصرية', heroCard1Text: 'لقطات مصممة لإظهار تفاصيل السيارة وشخصيتها بشكل يليق بالمحتوى.',
    heroCard2Title: 'إخراج أسرع', heroCard2Text: 'مسار حجز واضح، تنسيق مباشر، وتسليم مرتب حسب الباقة المختارة.',
    heroCard3Title: 'تجربة مرنة', heroCard3Text: 'اختر الباقة، المنطقة، ونوع السيارة واترك الباقي علينا.',
    packagesKicker: 'Packages', packagesTitle: 'الباقات مصممة على حسب اللقطة اللي تبيها.',
    packagesText: 'اختر مستوى الإنتاج المناسب لك — من رولينق بدون مونتاج إلى تغطية سينمائية متكاملة.',
    packagesLink: 'تخصيص وحجز ←',
    silver: '🥈 الباقة الفضية', silverDesc: 'رولينق بدون مونتاج', silverPrice: '70',
    silverF1: 'تصوير رولينق للسيارة.', silverF2: 'تصوير أثناء الحركة من زوايا متنوعة.', silverF3: 'تسليم جميع المقاطع الأصلية بدون مونتاج.', selectPackage: 'اختر الباقة',
    basic: '🥉 الباقة الأساسية', basicDesc: 'رولينق + مونتاج', basicPrice: '100',
    basicF1: 'تصوير رولينق للسيارة.', basicF2: 'أكثر من 10 مقاطع متنوعة.', basicF3: 'مونتاج كامل للمقاطع.', basicF4: 'اختيار أغنية على ذوقك.', basicF5: 'إمكانية تنفيذ فكرة خاصة حسب طلبك.',
    advanced: '🏆 الباقة المتقدمة', advancedDesc: 'رولينق + تصوير ثابت + مونتاج', advancedPrice: '150', advancedBadge: 'عرض مميز',
    advancedF1: 'تصوير رولينق للسيارة.', advancedF2: 'تصوير ثابت من عدة زوايا.', advancedF3: 'أكثر من 10 مقاطع متنوعة.', advancedF4: 'مونتاج متكامل.', advancedF5: 'تنويع في الزوايا والحركات.', advancedF6: 'تسليم الفيديوهات في نفس اليوم بإذن الله.',
    royal: '👑 الباقة الملكية', royalDesc: 'التصوير السينمائي', royalPrice: '200', royalBadge: 'Signature',
    royalF1: 'تصوير سينمائي متكامل للسيارة.', royalF2: 'رولينق وتصوير ثابت بزوايا وحركات متنوعة.', royalF3: 'أكثر من 10 مقاطع متنوعة.', royalF4: 'مونتاج سينمائي احترافي.', royalF5: 'تنفيذ فكرة خاصة حسب طلبك.', royalF6: 'إخراج يناسب سيارتك.',
    whyKicker: 'Why Ayan Photography', whyTitle: 'تجربة مرتبة من الحجز إلى التسليم.', whyText: 'بدل الزحمة في صفحة واحدة، صار عندك مسارات واضحة لكل شيء.', featureLink: 'شوف كل المميزات ←',
    feature1Title: 'جلسات احترافية', feature1Text: 'معدات وعدسات مخصصة لإبراز تفاصيل السيارة وإخراج اللقطة بشكل سينمائي.',
    feature2Title: 'تسليم سريع', feature2Text: 'ترتيب واضح للمحتوى والمعالجة والتسليم بدون ما تضيع وقتك بين خطوات كثيرة.',
    feature3Title: 'تواصل مباشر', feature3Text: 'ترسل طلبك من الموقع وينتقل معك مباشرة إلى الواتساب للتنسيق مع المصور.',
    workflowKicker: 'Ayan Workflow', workflowTitle: 'من أول فكرة إلى آخر فريم.', workflowText: 'كل صفحة لها وظيفة واضحة، عشان العميل يلقى اللي يحتاجه بسرعة.',
    workflow1: 'اختيار الباقة المناسبة.', workflow2: 'تعبئة بيانات السيارة وموقع التصوير.', workflow3: 'استلام الطلب والتنسيق عبر الواتساب.', workflow4: 'التصوير والتسليم حسب تفاصيل الباقة.',
    galleryKicker: 'Gallery', galleryTitle: 'خذ فكرة عن الشغل قبل ما تحجز.', galleryText: 'المعرض صار صفحة مستقلة عشان يبقى التركيز على الفيديو والمحتوى.', exploreGallery: 'استكشف المعرض ←',
    featuresHeroKicker: 'Why Ayan Photography', featuresHeroTitle: 'كل تفصيلة محسوبة عشان تطلع سيارتك بأفضل صورة.', featuresHeroText: 'هوية بصرية هادئة، حركة ناعمة، ومسار واضح من أول تواصل إلى آخر تسليم.',
    feature4Title: 'تخطيط اللقطة', feature4Text: 'نرتب فكرة التصوير حسب شكل السيارة والمكان وطابع المحتوى الذي تريده.',
    feature5Title: 'مونتاج مدروس', feature5Text: 'قص وحركة وانتقالات تخدم المشهد بدل ما تكون مجرد مؤثرات عشوائية.',
    feature6Title: 'تجربة جوال أولاً', feature6Text: 'الموقع والحجز مصممان ليكون الاستخدام سريعًا ومريحًا على الجوال والكمبيوتر.',
    servicesTitle: 'الخدمات', servicesText: 'اختَر نوع الإنتاج الذي يخدم هدفك، سواء كان ريلز، صور، أو تغطية كاملة.',
    service1Title: 'Rolling Shots', service1Text: 'تصوير أثناء الحركة من زوايا مختلفة لإظهار التصميم والسرعة والحضور.',
    service2Title: 'Static Details', service2Text: 'لقطات ثابتة تركز على التفاصيل الخارجية والداخلية وعناصر التصميم.',
    service3Title: 'Cinematic Edit', service3Text: 'مونتاج متكامل بإيقاع بصري يناسب السيارة والمنصة التي ستنشر عليها.',
    service4Title: 'Custom Concept', service4Text: 'فكرة خاصة يتم تنسيقها حسب أسلوبك والرسالة التي تريد إيصالها.',
    processTitle: 'طريقة العمل', processText: 'أربع خطوات واضحة بدون تعقيد.',
    step1Title: 'اختَر', step1Text: 'حدد الباقة ونوع الجلسة المناسبة.', step2Title: 'أرسل', step2Text: 'أرسل بياناتك وملاحظاتك من نموذج الحجز.', step3Title: 'نسّق', step3Text: 'نكمل التفاصيل معك عبر الواتساب.', step4Title: 'صوّر', step4Text: 'ننفذ الجلسة ونرتب التسليم.',
    bookingHeroKicker: 'Booking', bookingHeroTitle: 'احجز جلستك في أقل من دقيقة.', bookingHeroText: 'عبّ البيانات، نرسل الطلب للنظام، وبعدها يتحول الطلب مباشرة إلى واتساب للتنسيق مع المصور.', bookingMeta1: 'اختر الباقة', bookingMeta2: 'أدخل التفاصيل', bookingMeta3: 'نسّق عبر واتساب', bookingSideTitle: 'ابدأ بالباقة المناسبة.', bookingSideText: 'اختر مستوى التصوير أولًا، وبعدها نكمل معك باقي التفاصيل.', selectedLabel: 'الباقة المختارة', selectedEmpty: 'اختر باقة للبدء', sideFoot1: 'تنسيق مباشر', sideFoot2: 'أسعار واضحة', sideFoot3: 'تحويل للواتساب', bookingStep1: 'الباقة', bookingStep2: 'البيانات', bookingStep3: 'التنسيق', formKicker: 'Start your session', packageHint: 'اختَر المستوى الذي يناسب اللقطة التي في بالك.', tapToChoose: 'اضغط للاختيار', detailsDivider: 'بيانات الجلسة', submitTitle: 'جاهز؟ خلنا نكمل.', submitText: 'بعد الإرسال راح تنتقل مباشرة للواتساب للتنسيق.',
    formTitle: 'استمارة الحجز الفوري', formRequired: 'الحقول بعلامة * إلزامية', nameLabel: 'اسمك الكامل *', namePlaceholder: 'اسمك بالكامل', phoneLabel: 'رقم الواتساب *', phonePlaceholder: '05xxxxxxxx', packageLabel: 'الباقة *', packagePlaceholder: 'اختر الباقة المطلوبة', carLabel: 'نوع السيارة *', carPlaceholder: 'اختر نوع السيارة', regionLabel: 'منطقة التصوير *', regionPlaceholder: 'اختر المنطقة', notesLabel: 'ملاحظات إضافية', notesPlaceholder: 'زوايا معينة، فكرة خاصة، وقت مناسب، أو أي طلب آخر...', submit: 'إرسال الطلب والتنسيق عبر واتساب', formNote: 'بإرسال الطلب، سيتم استخدام بياناتك لتنسيق جلسة التصوير والرد عليك عبر وسيلة التواصل المسجلة.',
    bookingAsideTitle: 'قبل الإرسال', bookingAsideText: 'خل بياناتك دقيقة عشان نقدر ننسق معك بسرعة.', aside1: 'اختر الباقة أولًا.', aside2: 'اكتب رقم واتساب متاح.', aside3: 'اذكر أي فكرة خاصة في الملاحظات.', priceNoteTitle: 'الأسعار الحالية', priceNoteText: '70 / 100 / 150 / 200 SAR',
    galleryHeroKicker: 'Gallery', galleryHeroTitle: 'شوف النتيجة قبل ما تحجز.', galleryHeroText: 'مكتبة الصور والفيديوهات في مكان واحد، مع فلترة سريعة وفتح كامل للمحتوى.', galleryAll: 'الكل', galleryVideos: 'الفيديوهات', galleryImages: 'الصور', galleryCount: 'محتوى', readyTitle: 'عجبك الشغل؟', readyText: 'انتقل مباشرة إلى نموذج الحجز واختَر الباقة المناسبة.', startBooking: 'ابدأ الحجز ←',
    footerCopy: 'تصوير سيارات احترافي، رولينق، جلسات ثابتة، ومونتاج سينمائي بأسلوب يناسب كل سيارة.', footerNav: 'التنقل', footerContact: 'تواصل', footerLocation: 'المنطقة الشرقية، السعودية', footerTag: 'Built for cinematic car content',
    loading1: 'جاري تهيئة Ayan Photography...', loading2: 'جاري تجهيز اللقطات السينمائية...', loading3: 'كل شيء جاهز 🚀',
    bookingSuccess: '✨ تم استقبال طلبك بنجاح، جاري تحويلك للواتساب...', requiredAlert: 'يرجى تعبئة الحقول الإجبارية.', waitAlert: '⚠️ انتظر قليلاً قبل إرسال طلب آخر.', networkAlert: 'تعذر إرسال الطلب للنظام، سيتم فتح الواتساب مباشرة.',
    whatsappAr: 'مرحباً، أرغب في حجز جلسة تصوير',
  },
  en: {
    brandTag: 'Car Photography Studio',
    home: 'Home', features: 'Features', booking: 'Booking', gallery: 'Gallery', quick: 'Quick Booking', socialWhatsApp: 'WhatsApp', socialInstagram: 'Instagram', socialSnapchat: 'Snapchat',
    theme: 'Theme', lang: 'Language', relax: 'Relax 💙', dark: 'Dark 🌙', light: 'Light ☀️',
    heroEyebrow: 'Cinematic car photography', heroTitle: 'Let your car <span>speak in frames.</span>', heroLead: 'Rolling shots, static details, and polished edits — from the first frame to the final cut, with a cleaner booking experience.', bookNow: 'Book your session', watchGallery: 'View gallery',
    heroCard1Title: 'Visual identity', heroCard1Text: 'Frames built to reveal the character, shape, and details of your car.', heroCard2Title: 'Faster workflow', heroCard2Text: 'A clear booking path, direct coordination, and delivery matched to your package.', heroCard3Title: 'Flexible experience', heroCard3Text: 'Choose the package, location, and car type — we handle the rest.',
    packagesKicker: 'Packages', packagesTitle: 'Packages built around the shot you want.', packagesText: 'Pick the production level that fits you — from rolling-only footage to a complete cinematic session.', packagesLink: 'Customize & book →',
    silver: '🥈 Silver Package', silverDesc: 'Rolling without editing', silverPrice: '70', silverF1: 'Rolling shots of the car.', silverF2: 'Moving shots from multiple angles.', silverF3: 'All original clips delivered without editing.', selectPackage: 'Choose package',
    basic: '🥉 Basic Package', basicDesc: 'Rolling + editing', basicPrice: '100', basicF1: 'Rolling shots of the car.', basicF2: '10+ varied clips.', basicF3: 'Full edit of the footage.', basicF4: 'Choose the music style you want.', basicF5: 'Option for a custom idea.',
    advanced: '🏆 Advanced Package', advancedDesc: 'Rolling + static + editing', advancedPrice: '150', advancedBadge: 'Featured', advancedF1: 'Rolling shots of the car.', advancedF2: 'Static shots from several angles.', advancedF3: '10+ varied clips.', advancedF4: 'Complete edit.', advancedF5: 'Varied camera movements and angles.', advancedF6: 'Same-day delivery when possible.',
    royal: '👑 Royal Package', royalDesc: 'Cinematic production', royalPrice: '200', royalBadge: 'Signature', royalF1: 'Complete cinematic car coverage.', royalF2: 'Rolling and static shots with varied movement.', royalF3: '10+ varied clips.', royalF4: 'Professional cinematic edit.', royalF5: 'Custom concept execution.', royalF6: 'Direction tailored to your car.',
    whyKicker: 'Why Ayan Photography', whyTitle: 'A clean experience from booking to delivery.', whyText: 'Instead of a crowded one-page site, every part of the journey now has a clear path.', featureLink: 'Explore all features →', feature1Title: 'Professional sessions', feature1Text: 'Purpose-built camera work and lenses to reveal the car with cinematic detail.', feature2Title: 'Fast delivery', feature2Text: 'A clear workflow for production, processing, and delivery without unnecessary steps.', feature3Title: 'Direct coordination', feature3Text: 'Submit your request on the site and continue straight to WhatsApp for coordination.',
    workflowKicker: 'Ayan Workflow', workflowTitle: 'From the first idea to the final frame.', workflowText: 'Every page has one clear job, so clients find what they need quickly.', workflow1: 'Choose the right package.', workflow2: 'Add car and shoot details.', workflow3: 'Receive and coordinate the request on WhatsApp.', workflow4: 'Shoot and deliver based on the package.', galleryKicker: 'Gallery', galleryTitle: 'See the work before you book.', galleryText: 'The gallery now lives on its own page so the focus stays on the visual work.', exploreGallery: 'Explore gallery →',
    featuresHeroKicker: 'Why Ayan Photography', featuresHeroTitle: 'Every detail is designed to make your car look its best.', featuresHeroText: 'Quiet visual direction, smooth motion, and a clear journey from the first message to final delivery.', feature4Title: 'Shot planning', feature4Text: 'We shape the concept around the car, location, and content style you want.', feature5Title: 'Intentional editing', feature5Text: 'Cuts, motion, and transitions that support the scene instead of fighting it.', feature6Title: 'Mobile-first experience', feature6Text: 'The website and booking flow are designed to feel fast on both phone and desktop.', servicesTitle: 'Services', servicesText: 'Choose the production type that fits your goal, whether it is reels, details, or a full session.', service1Title: 'Rolling Shots', service1Text: 'Moving coverage from different angles to show design, speed, and presence.', service2Title: 'Static Details', service2Text: 'Still frames that focus on exterior, interior, and design details.', service3Title: 'Cinematic Edit', service3Text: 'A full edit with a visual rhythm built around the car and the platform.', service4Title: 'Custom Concept', service4Text: 'A tailored idea coordinated around your style and the message you want to convey.',
    processTitle: 'How it works', processText: 'Four clear steps with no unnecessary complexity.', step1Title: 'Choose', step1Text: 'Pick the package and session type.', step2Title: 'Send', step2Text: 'Submit your details and notes.', step3Title: 'Coordinate', step3Text: 'We finalize the details through WhatsApp.', step4Title: 'Shoot', step4Text: 'We execute the session and arrange delivery.',
    bookingHeroKicker: 'Booking', bookingHeroTitle: 'Book your session in under a minute.', bookingHeroText: 'Fill in your details, we send the request to the system, then move you directly to WhatsApp for coordination.', bookingMeta1: 'Choose a package', bookingMeta2: 'Add your details', bookingMeta3: 'Coordinate on WhatsApp', bookingSideTitle: 'Start with the right package.', bookingSideText: 'Choose your production level first, then we will handle the rest with you.', selectedLabel: 'Selected package', selectedEmpty: 'Choose a package to begin', sideFoot1: 'Direct coordination', sideFoot2: 'Clear pricing', sideFoot3: 'WhatsApp handoff', bookingStep1: 'Package', bookingStep2: 'Details', bookingStep3: 'Coordination', formKicker: 'Start your session', packageHint: 'Choose the production level that fits the shot in your head.', tapToChoose: 'Tap to choose', detailsDivider: 'Session details', submitTitle: 'Ready? Let’s finish it.', submitText: 'After sending, you will move straight to WhatsApp for coordination.',
    formTitle: 'Instant booking form', formRequired: 'Fields marked * are required', nameLabel: 'Full name *', namePlaceholder: 'Your full name', phoneLabel: 'WhatsApp number *', phonePlaceholder: '05xxxxxxxx', packageLabel: 'Package *', packagePlaceholder: 'Choose a package', carLabel: 'Car type *', carPlaceholder: 'Choose your car type', regionLabel: 'Shoot area *', regionPlaceholder: 'Choose an area', notesLabel: 'Additional notes', notesPlaceholder: 'Specific angles, a custom idea, preferred time, or anything else...', submit: 'Send request & continue to WhatsApp', formNote: 'Your details are used to coordinate the photography session and reply through the contact method provided.', bookingAsideTitle: 'Before you send', bookingAsideText: 'Keep your details accurate so we can coordinate quickly.', aside1: 'Choose the package first.', aside2: 'Use an active WhatsApp number.', aside3: 'Add any special idea in the notes.', priceNoteTitle: 'Current prices', priceNoteText: '70 / 100 / 150 / 200 SAR',
    galleryHeroKicker: 'Gallery', galleryHeroTitle: 'See the result before you book.', galleryHeroText: 'Photos and videos in one place, with quick filters and a full-view lightbox.', galleryAll: 'All', galleryVideos: 'Videos', galleryImages: 'Photos', galleryCount: 'items', readyTitle: 'Like what you see?', readyText: 'Go straight to the booking form and choose the right package.', startBooking: 'Start booking →', footerCopy: 'Professional car photography, rolling shots, static sessions, and cinematic edits shaped around every car.', footerNav: 'Navigation', footerContact: 'Contact', footerLocation: 'Eastern Province, Saudi Arabia', footerTag: 'Built for cinematic car content',
    loading1: 'Initializing Ayan Photography...', loading2: 'Preparing cinematic frames...', loading3: 'Everything is ready 🚀', bookingSuccess: '✨ Request received. Redirecting to WhatsApp...', requiredAlert: 'Please complete the required fields.', waitAlert: '⚠️ Please wait a moment before sending another request.', networkAlert: 'The system request could not be sent. WhatsApp will open directly.', whatsappAr: 'Hello, I would like to book a car photography session',
  }
};

const packageOptions = {
  ar: [
    ['🥈 الباقة الفضية - 70 ريال', '🥈 الباقة الفضية — 70 ريال'],
    ['🥉 الباقة الأساسية - 100 ريال', '🥉 الباقة الأساسية — 100 ريال'],
    ['🏆 الباقة المتقدمة - 150 ريال', '🏆 الباقة المتقدمة — 150 ريال'],
    ['👑 الباقة الملكية - 200 ريال', '👑 الباقة الملكية — 200 ريال']
  ],
  en: [
    ['Silver Package - 70 SAR', '🥈 Silver Package — 70 SAR'],
    ['Basic Package - 100 SAR', '🥉 Basic Package — 100 SAR'],
    ['Advanced Package - 150 SAR', '🏆 Advanced Package — 150 SAR'],
    ['Royal Package - 200 SAR', '👑 Royal Package — 200 SAR']
  ]
};

const carOptions = {
  ar: [['سيدان','سيدان'],['SUV','SUV'],['كوبيه','كوبيه'],['فاخر / رياضي','فاخر / رياضي']],
  en: [['Sedan','Sedan'],['SUV','SUV'],['Coupe','Coupe'],['Luxury / Sports','Luxury / Sports']]
};

const regionOptions = {
  ar: [['القطيف','القطيف'],['سيهات','سيهات'],['الدمام','الدمام'],['الخبر','الخبر'],['حفر الباطن','حفر الباطن']],
  en: [['Qatif','Qatif'],['Saihat','Saihat'],['Dammam','Dammam'],['Khobar','Khobar'],['Hafar Al Batin','Hafar Al Batin']]
};


function getLang() {
  return localStorage.getItem(STORAGE_LANG) || DEFAULT_LANG;
}

function getTheme() {
  const saved = localStorage.getItem(STORAGE_THEME);
  return ['relax', 'dark', 'light'].includes(saved) ? saved : DEFAULT_THEME;
}

function tr(key) {
  return translations[getLang()][key] ?? key;
}

function applyPreferences() {
  const lang = getLang();
  const theme = getTheme();
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.body.dataset.theme = theme;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (translations[lang][key] !== undefined) el.innerHTML = translations[lang][key];
  });

  document.querySelectorAll('[data-theme-label]').forEach((el) => el.textContent = tr(theme));
  document.querySelectorAll('[data-lang-label]').forEach((el) => el.textContent = lang === 'ar' ? 'العربية' : 'English');
  document.querySelectorAll('[data-set-theme]').forEach((button) => { const active = button.dataset.setTheme === theme; button.setAttribute('aria-pressed', String(active)); button.setAttribute('aria-checked', String(active)); });
  document.querySelectorAll('[data-set-lang]').forEach((button) => { const active = button.dataset.setLang === lang; button.setAttribute('aria-pressed', String(active)); button.setAttribute('aria-checked', String(active)); });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.dataset.i18nPlaceholder;
    if (translations[lang][key] !== undefined) el.placeholder = translations[lang][key];
  });
  updateSelects(lang);
  updateBookingExperience();
  document.title = document.body.dataset.pageTitle === 'gallery'
    ? (lang === 'ar' ? 'المعرض | Ayan Photography' : 'Gallery | Ayan Photography')
    : document.title;
}

function updateSelects(lang = getLang()) {
  const packageSelect = document.querySelector('#packageType');
  if (packageSelect) {
    const current = packageSelect.value;
    const preserved = packageValueForLang(current, lang);
    packageSelect.innerHTML = `<option value="">${escapeHtml(tr('packagePlaceholder'))}</option>` + packageOptions[lang].map(([value, label]) => `<option value="${escapeHtml(value)}">${escapeHtml(label)}</option>`).join('');
    if ([...packageSelect.options].some((o) => o.value === preserved)) packageSelect.value = preserved;
  }

  const carSelect = document.querySelector('#carType');
  if (carSelect) {
    const current = carSelect.value;
    carSelect.innerHTML = `<option value="">${escapeHtml(tr('carPlaceholder'))}</option>` + carOptions[lang].map(([value, label]) => `<option value="${escapeHtml(value)}">${escapeHtml(label)}</option>`).join('');
    if ([...carSelect.options].some((o) => o.value === current)) carSelect.value = current;
  }

  const regionSelect = document.querySelector('#shootRegion');
  if (regionSelect) {
    const current = regionSelect.value;
    regionSelect.innerHTML = `<option value="">${escapeHtml(tr('regionPlaceholder'))}</option>` + regionOptions[lang].map(([value, label]) => `<option value="${escapeHtml(value)}">${escapeHtml(label)}</option>`).join('');
    if ([...regionSelect.options].some((o) => o.value === current)) regionSelect.value = current;
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[char]));
}

function setLang(lang) {
  const next = ['ar', 'en'].includes(lang) ? lang : DEFAULT_LANG;
  localStorage.setItem(STORAGE_LANG, next);
  applyPreferences();
  sendLog('language_change', { to: next });
}

function setTheme(theme) {
  const next = ['relax', 'dark', 'light'].includes(theme) ? theme : DEFAULT_THEME;
  localStorage.setItem(STORAGE_THEME, next);
  applyPreferences();
  sendLog('theme_change', { to: next });
}

function packageValueForLang(value, lang = getLang()) {
  const map = {
    '🥈 الباقة الفضية - 70 ريال': ['🥈 الباقة الفضية - 70 ريال', 'Silver Package - 70 SAR'],
    '🥉 الباقة الأساسية - 100 ريال': ['🥉 الباقة الأساسية - 100 ريال', 'Basic Package - 100 SAR'],
    '🏆 الباقة المتقدمة - 150 ريال': ['🏆 الباقة المتقدمة - 150 ريال', 'Advanced Package - 150 SAR'],
    '👑 الباقة الملكية - 200 ريال': ['👑 الباقة الملكية - 200 ريال', 'Royal Package - 200 SAR']
  };
  const pair = map[value] || Object.values(map).find(([ar, en]) => ar === value || en === value);
  return pair ? pair[lang === 'en' ? 1 : 0] : value;
}

async function sendLog(event, details = {}) {
  const payload = {
    event,
    page: location.pathname,
    title: document.title,
    lang: getLang(),
    theme: getTheme(),
    referrer: document.referrer || 'direct',
    screen: `${window.innerWidth}x${window.innerHeight}`,
    userAgent: navigator.userAgent,
    details
  };
  try {
    await fetch('/api/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true
    });
  } catch (_) {}
}

function setupPreferenceMenus() {
  const menus = [...document.querySelectorAll('[data-pref-menu]')];
  if (!menus.length) return;

  const nav = document.querySelector('[data-nav-links]');
  const closeAll = (except = null) => {
    menus.forEach((menu) => {
      if (menu !== except) {
        menu.classList.remove('open');
        menu.querySelector('[data-pref-trigger]')?.setAttribute('aria-expanded', 'false');
      }
    });
  };

  const toggleMenu = (menu) => {
    if (!menu) return;
    const trigger = menu.querySelector('[data-pref-trigger]');
    const willOpen = !menu.classList.contains('open');
    closeAll(menu);
    if (nav && willOpen) nav.classList.remove('open');
    menu.classList.toggle('open', willOpen);
    trigger?.setAttribute('aria-expanded', String(willOpen));
  };

  menus.forEach((menu) => {
    const trigger = menu.querySelector('[data-pref-trigger]');
    if (!trigger) return;
    const activate = (event) => {
      event.preventDefault();
      event.stopPropagation();
      toggleMenu(menu);
    };
    trigger.addEventListener('pointerup', activate, { passive: false });
    trigger.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') activate(event);
    });
  });

  const preferenceAction = (event) => {
    const themeButton = event.target?.closest?.('[data-set-theme]');
    const langButton = event.target?.closest?.('[data-set-lang]');
    if (themeButton) {
      event.preventDefault();
      event.stopPropagation();
      setTheme(themeButton.dataset.setTheme);
      closeAll();
      return true;
    }
    if (langButton) {
      event.preventDefault();
      event.stopPropagation();
      setLang(langButton.dataset.setLang);
      closeAll();
      return true;
    }
    return false;
  };

  document.addEventListener('pointerup', (event) => {
    if (preferenceAction(event)) return;
    if (!event.target?.closest?.('[data-pref-menu]')) closeAll();
  }, { passive: false });

  document.addEventListener('click', (event) => {
    if (event.target?.closest?.('[data-set-theme], [data-set-lang], [data-pref-trigger]')) return;
    if (!event.target?.closest?.('[data-pref-menu]')) closeAll();
  }, true);

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeAll();
  });

  window.__ayanClosePreferenceMenus = closeAll;
}

function setupMobileMenu() {
  const btn = document.querySelector('[data-menu]');
  const nav = document.querySelector('[data-nav-links]');
  if (!btn || !nav) return;

  let backdrop = document.querySelector('[data-mobile-menu-backdrop]');
  if (!backdrop) {
    backdrop = document.createElement('button');
    backdrop.type = 'button';
    backdrop.className = 'mobile-menu-backdrop';
    backdrop.setAttribute('aria-label', 'Close menu');
    backdrop.setAttribute('data-mobile-menu-backdrop', '');
    document.body.appendChild(backdrop);
  }

  const setOpen = (open) => {
    nav.classList.toggle('open', open);
    btn.classList.toggle('is-open', open);
    btn.setAttribute('aria-expanded', String(open));
    backdrop.classList.toggle('is-visible', open);
    if (open) window.__ayanClosePreferenceMenus?.();
  };

  const activate = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setOpen(!nav.classList.contains('open'));
  };

  btn.addEventListener('pointerup', activate, { passive: false });
  backdrop.addEventListener('pointerup', (event) => { event.preventDefault(); setOpen(false); });
  nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setOpen(false)));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setOpen(false); });
  window.addEventListener('resize', () => { if (window.innerWidth > 900) setOpen(false); }, { passive: true });
}

function setupActiveNav() {
  const page = location.pathname.split('/').pop() || 'index.html';
  const current = page === 'index.html' || page === '' ? 'home' : page.replace('.html', '');
  document.querySelectorAll('.nav-links a[data-page]').forEach((link) => link.classList.toggle('active', link.dataset.page === current));
}

function setupReveal() {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;
  if (!('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: .12, rootMargin: '0px 0px -40px' });
  items.forEach((el) => observer.observe(el));
}

function setupCardGlow() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      card.style.setProperty('--my', `${event.clientY - rect.top}px`);
    });
  });
}

function setupPointerGlow() {
  const glow = document.querySelector('#pointer-glow');
  if (!glow || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  let raf = 0;
  window.addEventListener('pointermove', (event) => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      glow.style.transform = `translate3d(${event.clientX - 120}px, ${event.clientY - 120}px, 0)`;
    });
  }, { passive: true });
}

function setupAmbientParallax() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const blobs = document.querySelectorAll('.ambient span');
  if (!blobs.length) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    blobs.forEach((blob, index) => {
      blob.style.transform = `translate3d(${index ? y * .018 : -y * .012}px, ${y * (index ? -.02 : .014)}px, 0)`;
    });
  }, { passive: true });
}


function setupHeroBackgroundVideo() {
  const video = document.querySelector('[data-hero-video]');
  if (!video) return;

  let retryTimer = 0;
  let retries = 0;
  const play = (reason = 'initial') => {
    window.clearTimeout(retryTimer);
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    video.loop = true;
    video.playsInline = true;
    video.controls = false;
    video.setAttribute('autoplay', '');
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('loop', '');

    const promise = video.play();
    if (promise && typeof promise.catch === 'function') {
      promise.catch(() => {
        if (document.hidden) return;
        retries += 1;
        if (retries <= 8) retryTimer = window.setTimeout(() => play('retry'), 700);
      });
    }
  };

  const ensurePlaying = () => {
    if (!document.hidden && video.paused) play('resume');
  };

  video.addEventListener('loadedmetadata', () => play('metadata'));
  video.addEventListener('loadeddata', () => play('data'));
  video.addEventListener('canplay', () => play('canplay'));
  video.addEventListener('playing', () => {
    retries = 0;
    window.clearTimeout(retryTimer);
  });
  video.addEventListener('pause', () => {
    if (!document.hidden) window.setTimeout(ensurePlaying, 120);
  });
  video.addEventListener('ended', () => {
    video.currentTime = 0;
    play('ended');
  });
  video.addEventListener('error', () => {
    retries += 1;
    if (!document.hidden && retries <= 4) retryTimer = window.setTimeout(() => {
      video.load();
      play('error-reload');
    }, 1200);
  });
  document.addEventListener('visibilitychange', ensurePlaying);
  window.addEventListener('pageshow', ensurePlaying);
  window.addEventListener('focus', ensurePlaying);
  window.addEventListener('online', () => { video.load(); play('online'); });

  video.load();
  window.setTimeout(() => play('startup'), 80);
}

function setupBookingBackgroundVideo() {
  const video = document.querySelector('[data-packingbackground]');
  if (!video) return;

  let retryTimer = 0;
  let attempts = 0;
  const start = () => {
    window.clearTimeout(retryTimer);
    video.muted = true;
    video.defaultMuted = true;
    video.volume = 0;
    video.loop = true;
    video.playsInline = true;
    video.controls = false;
    video.setAttribute('autoplay', '');
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('loop', '');
    const promise = video.play();
    if (promise?.catch) promise.catch(() => {
      if (document.hidden) return;
      attempts += 1;
      if (attempts <= 8) retryTimer = window.setTimeout(start, 700);
    });
  };

  video.addEventListener('playing', () => { attempts = 0; });
  video.addEventListener('pause', () => {
    if (!document.hidden) window.setTimeout(() => { if (video.paused) start(); }, 120);
  });
  video.addEventListener('ended', () => { video.currentTime = 0; start(); });
  video.addEventListener('error', () => {
    attempts += 1;
    if (!document.hidden && attempts <= 4) {
      retryTimer = window.setTimeout(() => { video.load(); start(); }, 1200);
    }
  });
  document.addEventListener('visibilitychange', () => { if (!document.hidden && video.paused) start(); });
  window.addEventListener('pageshow', () => { if (video.paused) start(); });
  video.load();
  window.setTimeout(start, 80);
}

function setupHomeLoader() {
  const loader = document.querySelector('[data-home-loader]');
  if (!loader) return;
  const finish = () => window.setTimeout(() => loader.classList.add('hide'), 520);
  if (document.readyState === 'complete') finish();
  else window.addEventListener('load', finish, { once: true });
  window.setTimeout(finish, 2200);
}


function updateBookingExperience() {
  const select = document.querySelector('#packageType');
  const choices = [...document.querySelectorAll('[data-booking-package]')];
  if (!choices.length) return;
  const current = select?.value || '';
  let selected = null;
  choices.forEach((choice) => {
    const value = packageValueForLang(choice.dataset.bookingPackage, getLang());
    const active = !!current && current === value;
    choice.classList.toggle('selected', active);
    if (active) selected = choice;
  });

  const summaryName = document.querySelector('[data-booking-summary-name]');
  const summaryDesc = document.querySelector('[data-booking-summary-desc]');
  const summaryPrice = document.querySelector('[data-booking-summary-price]');
  if (!summaryName || !summaryDesc || !summaryPrice) return;

  if (!selected) {
    summaryName.textContent = tr('selectedEmpty');
    summaryDesc.textContent = '—';
    summaryPrice.textContent = '—';
    return;
  }

  const key = selected.dataset.packageKey;
  const priceMap = { silver: 'silverPrice', basic: 'basicPrice', advanced: 'advancedPrice', royal: 'royalPrice' };
  summaryName.textContent = tr(key);
  summaryDesc.textContent = tr(`${key}Desc`);
  summaryPrice.textContent = tr(priceMap[key]);
  const summaryCard = summaryName.closest('[data-booking-summary]');
  if (summaryCard) {
    summaryCard.classList.remove('is-changing');
    void summaryCard.offsetWidth;
    summaryCard.classList.add('is-changing', 'is-active');
    window.clearTimeout(summaryCard._summaryTimer);
    summaryCard._summaryTimer = window.setTimeout(() => summaryCard.classList.remove('is-changing'), 560);
  }
}

function setupBookingExperience() {
  const select = document.querySelector('#packageType');
  const choices = document.querySelectorAll('[data-booking-package]');
  if (!select || !choices.length) return;

  choices.forEach((choice) => {
    choice.addEventListener('click', () => {
      const value = packageValueForLang(choice.dataset.bookingPackage, getLang());
      select.value = value;
      updateBookingExperience();
      sendLog('package_select', { package: value, source: 'booking_picker' });
      document.querySelector('.booking-package-wrap')?.classList.add('chosen');
    });
  });

  select.addEventListener('change', () => {
    updateBookingExperience();
    sendLog('package_select', { package: select.value, source: 'booking_select' });
  });
  updateBookingExperience();
}

function setupPackageButtons() {
  document.querySelectorAll('[data-package]').forEach((button) => {
    button.addEventListener('click', () => {
      const selectValue = packageValueForLang(button.dataset.package);
      sessionStorage.setItem('ayan_selected_package', selectValue);
      sendLog('package_select', { package: selectValue });
    });
  });

  const select = document.querySelector('#packageType');
  if (select) {
    const stored = sessionStorage.getItem('ayan_selected_package');
    if (stored) {
      const value = packageValueForLang(stored, getLang());
      if ([...select.options].some((option) => option.value === value)) select.value = value;
      sessionStorage.removeItem('ayan_selected_package');
      select.scrollIntoView({ behavior: 'smooth', block: 'center' });
      select.focus({ preventScroll: true });
    }
  }
}

function normalizePhone(value) {
  const raw = String(value || '').replace(/\D/g, '');
  if (raw.startsWith('00966')) return raw.slice(2);
  if (raw.startsWith('966')) return raw;
  if (raw.startsWith('05')) return `966${raw.slice(1)}`;
  if (raw.startsWith('5')) return `966${raw}`;
  return raw;
}

function setupBookingForm() {
  const form = document.querySelector('#bookingForm');
  if (!form) return;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    const lastSubmit = Number(sessionStorage.getItem('ayan_last_submit') || 0);
    if (Date.now() - lastSubmit < 15000) {
      showToast(tr('waitAlert'));
      return;
    }

    const phoneInput = document.querySelector('#phone');
    const data = {
      name: document.querySelector('#fullName')?.value.trim(),
      packageType: document.querySelector('#packageType')?.value,
      carType: document.querySelector('#carType')?.value,
      shootRegion: document.querySelector('#shootRegion')?.value,
      phone: phoneInput?.value.trim(),
      notes: document.querySelector('#notes')?.value.trim(),
      lang: getLang(),
      sourcePage: location.pathname,
      theme: getTheme(),
      screen: `${window.innerWidth}x${window.innerHeight}`,
      website: document.querySelector('#website')?.value.trim() || ''
    };

    const required = ['name', 'packageType', 'carType', 'shootRegion', 'phone'];
    if (required.some((key) => !data[key])) {
      showToast(tr('requiredAlert'));
      return;
    }

    const normalizedPhone = normalizePhone(data.phone);
    if (!/^9665\d{8}$/.test(normalizedPhone)) {
      showToast(getLang() === 'ar' ? 'اكتب رقم جوال سعودي صحيح.' : 'Enter a valid Saudi mobile number.');
      return;
    }

    data.phone = normalizedPhone;
    if (data.website) { showToast(getLang() === 'ar' ? 'تعذر إرسال الطلب.' : 'Unable to submit this request.'); return; }

    const button = document.querySelector('#submitBtn');
    const originalLabel = button?.textContent || '';
    if (button) {
      button.disabled = true;
      button.textContent = getLang() === 'ar' ? 'جاري إرسال الطلب…' : 'Sending request…';
    }

    sessionStorage.setItem('ayan_last_submit', String(Date.now()));
    let apiSuccess = false;
    try {
      const response = await fetch('/api/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      apiSuccess = response.ok;
    } catch (_) {}

    await sendLog('booking_submit', { success: apiSuccess, package: data.packageType, car: data.carType, area: data.shootRegion });

    const success = document.querySelector('#successAlert');
    if (success) {
      success.textContent = tr('bookingSuccess');
      success.style.display = 'block';
    }
    if (!apiSuccess) showToast(tr('networkAlert'));

    const lines = getLang() === 'ar'
      ? [tr('whatsappAr'), `- الاسم: ${data.name}`, `- الباقة: ${data.packageType}`, `- السيارة: ${data.carType}`, `- المنطقة: ${data.shootRegion}`, `- رقم الواتساب: ${data.phone}`, data.notes ? `- ملاحظات: ${data.notes}` : ''].filter(Boolean)
      : ['Hello, I would like to book a car photography session', `- Name: ${data.name}`, `- Package: ${data.packageType}`, `- Car: ${data.carType}`, `- Area: ${data.shootRegion}`, `- WhatsApp: ${data.phone}`, data.notes ? `- Notes: ${data.notes}` : ''].filter(Boolean);
    const message = encodeURIComponent(lines.join('\n'));
    const whatsappUrl = `https://wa.me/${data.phone}?text=${message}`;
    window.setTimeout(() => { window.location.href = whatsappUrl; }, 650);
    if (button) button.textContent = originalLabel;
  });
}

function showToast(message) {
  const toast = document.querySelector('.toast');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 3600);
}

const GALLERY_FALLBACK = {
  videos: [
    { src: 'https://j.top4top.io/m_3918oecxi1.mp4', titleAr: 'جلسة فيديو — 01', titleEn: 'Video Session — 01' },
    { src: 'https://k.top4top.io/m_3918efwnf2.mp4', titleAr: 'جلسة فيديو — 02', titleEn: 'Video Session — 02' },
    { src: 'https://l.top4top.io/m_3918tnexs3.mp4', titleAr: 'جلسة فيديو — 03', titleEn: 'Video Session — 03' },
    { src: 'https://f.top4top.io/m_391845mmn1.mp4', titleAr: 'جلسة فيديو — 04', titleEn: 'Video Session — 04' },
    { src: 'https://e.top4top.io/m_3918oxx0h1.mp4', titleAr: 'جلسة فيديو — 05', titleEn: 'Video Session — 05' },
    { src: 'https://h.top4top.io/m_3918j293s3.mp4', titleAr: 'جلسة فيديو — 06', titleEn: 'Video Session — 06' }
  ],
  images: [
    { src: 'https://c.top4top.io/p_39182lc0q1.jpeg', titleAr: 'صورة — 01', titleEn: 'Photo — 01' },
    { src: 'https://e.top4top.io/p_3918xds303.jpeg', titleAr: 'صورة — 02', titleEn: 'Photo — 02' },
    { src: 'https://d.top4top.io/p_3918voxck2.jpeg', titleAr: 'صورة — 03', titleEn: 'Photo — 03' },
    { src: 'https://f.top4top.io/p_3918o93au4.jpeg', titleAr: 'صورة — 04', titleEn: 'Photo — 04' }
  ]
};

async function loadGallery() {
  const grid = document.querySelector('[data-gallery-grid]');
  if (!grid) return;

  const candidates = [
    new URL('./data/gallery.json', document.baseURI).href,
    '/data/gallery.json'
  ];

  let data = null;
  for (const url of candidates) {
    try {
      const response = await fetch(url, { cache: 'no-store', headers: { Accept: 'application/json' } });
      const contentType = response.headers.get('content-type') || '';
      if (!response.ok) continue;
      const text = await response.text();
      if (!text.trim() || (!contentType.includes('json') && !text.trim().startsWith('{'))) continue;
      data = JSON.parse(text);
      break;
    } catch (_) {}
  }

  if (!data) data = GALLERY_FALLBACK;

  const videos = Array.isArray(data.videos) ? data.videos : [];
  const images = Array.isArray(data.images) ? data.images : [];
  const items = [
    ...videos.map((item, index) => ({ ...item, type: 'video', index: index + 1 })),
    ...images.map((item, index) => ({ ...item, type: 'image', index: index + 1 }))
  ];

  if (!items.length) {
    grid.innerHTML = `<div class="card" style="grid-column:1/-1;padding:30px;text-align:center;color:var(--muted);">${escapeHtml(getLang() === 'ar' ? 'لا يوجد محتوى في المعرض حاليًا.' : 'No gallery content is available yet.')}</div>`;
    return;
  }

  grid.innerHTML = items.map((item) => renderGalleryCard(item)).join('');
  setupGalleryFilters();
  setupGalleryLightbox();
  applyGalleryFilter('video');
  keepGalleryVideosPlaying();
}

function renderGalleryCard(item) {
  const title = getLang() === 'en' ? (item.titleEn || item.title || '') : (item.titleAr || item.title || '');
  const escapedTitle = escapeHtml(title);
  const typeLabel = item.type === 'video' ? tr('galleryVideos') : tr('galleryImages');
  const escapedSrc = escapeHtml(item.src || '');
  const escapedPoster = escapeHtml(item.poster || '');
  const media = item.type === 'video'
    ? `<video autoplay muted loop playsinline preload="auto" disablepictureinpicture controlslist="nodownload noplaybackrate nofullscreen noremoteplayback" aria-label="${escapedTitle}" ${escapedPoster ? `poster="${escapedPoster}"` : ''}><source src="${escapedSrc}" type="video/mp4"></video>`
    : `<img src="${escapedSrc}" alt="${escapedTitle}" loading="lazy" decoding="async" onerror="this.dataset.missing='true'">`;
  return `<article class="card media-card gallery-card ${item.type}-card reveal" data-gallery-type="${item.type}" data-gallery-src="${escapedSrc}" data-gallery-title="${escapedTitle}" data-gallery-poster="${escapedPoster}"><div class="media-wrap">${media}<span class="media-badge">${escapeHtml(typeLabel)}</span><span class="media-shade"></span></div><div class="caption">${escapedTitle}</div></article>`;
}

function keepGalleryVideosPlaying() {
  const cards = Array.from(document.querySelectorAll('.gallery-card.video-card'));
  const videos = cards.map((card) => card.querySelector('video')).filter(Boolean);
  if (!videos.length) return;

  const start = (video) => {
    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('loop', '');
    video.controls = false;
    const playPromise = video.play();
    if (playPromise?.catch) playPromise.catch(() => {});
  };

  const resumeSelected = (card) => {
    const video = card.querySelector('video');
    if (!video) return;
    card.classList.add('is-recovering');
    start(video);
    window.setTimeout(() => card.classList.remove('is-recovering'), 380);
  };

  videos.forEach((video) => {
    const card = video.closest('.gallery-card');
    video.controls = false;
    video.disablePictureInPicture = true;
    video.addEventListener('loadedmetadata', () => start(video), { once: true });
    video.addEventListener('loadeddata', () => start(video), { once: true });
    video.addEventListener('canplay', () => {
      if (video.paused && !document.hidden) start(video);
    });

    video.addEventListener('pause', () => {
      if (document.hidden) return;
      card?.classList.add('video-paused');
    });
    video.addEventListener('play', () => card?.classList.remove('video-paused'));
    video.addEventListener('waiting', () => card?.classList.add('video-buffering'));
    video.addEventListener('playing', () => card?.classList.remove('video-buffering', 'video-paused'));

    if (card) {
      card.addEventListener('pointerenter', () => resumeSelected(card), { passive: true });
      card.addEventListener('pointerdown', () => resumeSelected(card), { passive: true });
      card.addEventListener('touchstart', () => resumeSelected(card), { passive: true });
      card.addEventListener('focusin', () => resumeSelected(card));
    }

    start(video);
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) return;
    videos.forEach((video) => {
      if (video.paused) start(video);
    });
  });
}

function setupGalleryFilters() {
  document.querySelectorAll('[data-gallery-filter]').forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.galleryFilter;
      document.querySelectorAll('[data-gallery-filter]').forEach((item) => item.classList.toggle('active', item === button));
      applyGalleryFilter(filter);
      sendLog('gallery_filter', { filter });
    });
  });
}

function applyGalleryFilter(filter = 'video') {
  const cards = document.querySelectorAll('.gallery-card');
  let visible = 0;
  cards.forEach((card) => {
    const show = filter === 'all' || card.dataset.galleryType === filter;
    card.classList.toggle('is-hidden', !show);
    if (show) visible += 1;
  });
  const count = document.querySelector('[data-gallery-visible-count]');
  if (count) count.textContent = String(visible);
  requestAnimationFrame(() => document.querySelectorAll('.gallery-card:not(.is-hidden)').forEach((card, index) => {
    card.style.transitionDelay = `${Math.min(index, 7) * 45}ms`;
    card.classList.add('is-visible');
  }));
}

function setupGalleryLightbox() {
  const box = document.querySelector('[data-lightbox]');
  const media = document.querySelector('[data-lightbox-media]');
  const caption = document.querySelector('[data-lightbox-caption]');
  const close = document.querySelector('[data-lightbox-close]');
  if (!box || !media) return;

  const closeBox = () => {
    box.classList.remove('open');
    box.setAttribute('aria-hidden', 'true');
    media.innerHTML = '';
  };

  close?.addEventListener('click', closeBox);
  box.addEventListener('click', (event) => { if (event.target === box) closeBox(); });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeBox(); });

  document.querySelectorAll('.gallery-card').forEach((card) => {
    card.addEventListener('click', (event) => {
      if (card.dataset.galleryType === 'video') return;
      const type = card.dataset.galleryType;
      const src = card.dataset.gallerySrc;
      const title = card.dataset.galleryTitle || '';
      const poster = card.dataset.galleryPoster || '';
      if (!src) return;
      media.innerHTML = type === 'video'
        ? `<video autoplay muted loop playsinline preload="auto" disablepictureinpicture controlslist="nodownload noplaybackrate nofullscreen noremoteplayback" ${poster ? `poster="${escapeHtml(poster)}"` : ''}><source src="${escapeHtml(src)}" type="video/mp4"></video>`
        : `<img src="${escapeHtml(src)}" alt="${escapeHtml(title)}">`;
      if (caption) caption.textContent = title;
      box.classList.add('open');
      box.setAttribute('aria-hidden', 'false');
      sendLog('gallery_open', { type, title });
    });
  });
}


function setupSocialFloat() {
  const widget = document.querySelector('[data-social-float]');
  const toggle = widget?.querySelector('[data-social-toggle]');
  const menu = widget?.querySelector('[data-social-menu]');
  if (!widget || !toggle || !menu) return;

  let open = false;
  const setOpen = (next) => {
    open = next;
    widget.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };

  toggle.addEventListener('mouseenter', () => setOpen(true));
  widget.addEventListener('mouseleave', () => setOpen(false));
  toggle.addEventListener('focus', () => setOpen(true));
  widget.addEventListener('focusout', (event) => {
    if (!widget.contains(event.relatedTarget)) setOpen(false);
  });
  toggle.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    setOpen(!open);
  });

  document.addEventListener('click', (event) => {
    if (!widget.contains(event.target)) setOpen(false);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && open) {
      setOpen(false);
      toggle.focus();
    }
  });

  menu.querySelectorAll('a[data-social]').forEach((link) => {
    link.addEventListener('click', () => sendLog('social_click', { network: link.dataset.social }));
  });
}

function init() {
  applyPreferences();
  setupActiveNav();
  setupPackageButtons();
  setupBookingExperience();
  setupBookingForm();
  setupReveal();
  setupCardGlow();
  setupPointerGlow();
  setupSocialFloat();
  setupAmbientParallax();
  setupHeroBackgroundVideo();
  setupBookingBackgroundVideo();
  setupHomeLoader();
  loadGallery();
  sendLog('page_view');
}

document.addEventListener('DOMContentLoaded', init);
window.AyanPhotography = { setLang, setTheme };

window.addEventListener('storage', (event) => {
  if (event.key === STORAGE_LANG || event.key === STORAGE_THEME) applyPreferences();
});
