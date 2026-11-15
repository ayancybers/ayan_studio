
const WHATSAPP_NUMBER = '966565117739';
const STORAGE_LANG = 'ayan_lang';
const STORAGE_THEME = 'ayan_theme';
const DEFAULT_LANG = 'ar';
const DEFAULT_THEME = 'relax';

const translations = {
  ar: {
    brandTag: 'Automotive Photography',
    devEyebrow: 'Ayan Developer', devTitle: 'من الفكرة إلى <span>منتج جاهز.</span>', devLead: 'أصمم وأطوّر تجارب رقمية واضحة وسريعة، من أول تصور إلى إطلاق موقع يعمل لخدمة الناس والأعمال.', devProjectsCta: 'استكشف أعمالي', devContactCta: 'تواصل معي ↗', devProofAria: 'مراحل تطوير المنتج', devProof1: 'الهوية', devProof2: 'التطوير', devProof3: 'الإطلاق', devAboutKicker: 'عن المطوّر', devAboutTitle: 'أبني المنتج من الفكرة إلى التفاصيل.', devAboutText: 'أجمع بين التصميم والبرمجة حتى تكون التجربة جميلة، مفهومة، وسهلة الاستخدام على كل شاشة.', devPillar1Title: 'تجربة واضحة', devPillar1Text: 'واجهة مرتبة تساعد الزائر يوصل للمعلومة والخطوة التالية بسرعة.', devPillar2Title: 'تطوير متجاوب', devPillar2Text: 'صفحات تعمل بسلاسة على الجوال والكمبيوتر وتدعم العربية والإنجليزية.', devPillar3Title: 'إطلاق متكامل', devPillar3Text: 'ربط الصفحات والخدمات الأساسية وتجهيز المسارات قبل نشر المشروع.', devWorkKicker: 'أعمال مختارة', devWorkTitle: 'مشاريع فعلية على الويب.', devWorkText: 'نماذج من مواقع منشورة تجمع بين الهوية البصرية والوظائف التي يحتاجها العميل.', devAyanDescription: 'منصة تصوير سيارات تعرض الباقات والمعرض والحجز والدفع في رحلة واحدة للعميل.', dev5loDescription: 'موقع لاستوديو تصوير سيارات يركز على عرض الأعمال والوصول السريع للحجز.', devVisitProject: 'زيارة المشروع ↗', devStackKicker: 'التقنيات', devStackTitle: 'الأدوات تتغير حسب احتياج المشروع.', devStackText: 'أختار التقنية التي تخدم التجربة، مع تركيز دائم على الأداء والوضوح وسهولة التطوير.', devStackAria: 'أدوات وتقنيات التطوير', devCtaKicker: 'لنبدأ مشروعك', devCtaTitle: 'عندك فكرة؟ خلّنا نبنيها.', devCtaText: 'أرسل فكرتك ونرتب الخطوات المناسبة لتحويلها إلى موقع أو تجربة رقمية جاهزة.', devEmail: 'إرسال بريد إلكتروني',
    home: 'الرئيسية', features: 'المميزات', booking: 'الحجز', gallery: 'المعرض', support: 'الدعم والمساعدة', quick: 'حجز سريع', socialWhatsApp: 'واتساب', socialInstagram: 'إنستغرام', socialSnapchat: 'سناب شات', socialMenuLabel: 'روابط التواصل',
    theme: 'الثيم', lang: 'اللغة', relax: 'مريح', dark: 'داكن 🌙', light: 'فاتح ☀️',
    heroEyebrow: 'تصوير سيارات بطابع سينمائي',
    heroTitle: 'كل سيارة لها <span>حكاية.</span>',
    heroLead: 'نصنع لسيارتك حضورًا يليق بها — تصوير سينمائي في الشرقية، تفاصيل مدروسة، وتجربة حجز سهلة من أول لقطة إلى آخر تفصيل.',
    bookNow: 'احجز جلستك', watchGallery: 'شاهد المعرض',
    heroCard1Title: 'الهوية البصرية', heroCard1Text: 'لقطات مصممة لإظهار تفاصيل السيارة وشخصيتها بشكل يليق بالمحتوى.',
    heroCard2Title: 'إخراج أسرع', heroCard2Text: 'مسار حجز واضح، تنسيق مباشر، وتسليم مرتب حسب الباقة المختارة.',
    heroCard3Title: 'تجربة مرنة', heroCard3Text: 'اختر الباقة، المنطقة، ونوع السيارة واترك الباقي علينا.',
    packagesKicker: 'Packages', packagesTitle: 'أربع باقات. أسلوبك أنت.',
    packagesText: 'اختر مستوى الإنتاج المناسب لك — من رولينق بدون مونتاج إلى تغطية سينمائية متكاملة.',
    packagesLink: 'تخصيص وحجز ←', swipeHint: 'اسحب يمينًا ويسارًا للتنقل', popularBadge: 'الأكثر طلبًا',
    
    silverH1: 'مقاطع أصلية', silverH2: 'زوايا متعددة', silverH3: 'بدون مونتاج',
    basicH1: 'أكثر من 5', basicH2: 'مونتاج كامل', basicH3: 'اختيار أغنية',
    advancedH1: 'أكثر من 10', advancedH2: 'تصوير ثابت', advancedH3: 'مونتاج متكامل',
    royalH1: 'أكثر من 20', royalH2: 'سينمائي', royalH3: 'فكرة خاصة',
    silver: 'الرول', silverDesc: 'رولينق بدون مونتاج', silverPrice: '50', silverOldPrice: '70 ريال', silverDiscount: 'خصم 20 ريال',
    silverF1: 'تصوير رولينق للسيارة.', silverF2: 'تصوير أثناء الحركة من زوايا متنوعة.', silverF3: 'تسليم جميع المقاطع الأصلية بدون مونتاج.', selectPackage: 'اختر الباقة',
    basic: 'الحركة', basicDesc: 'رولينق + أكثر من 5 مقاطع متنوعة + مونتاج', basicPrice: '80', basicOldPrice: '100 ريال', basicDiscount: 'خصم 20 ريال',
    basicF1: 'تصوير رولينق للسيارة.', basicF2: 'أكثر من 5 مقاطع متنوعة.', basicF3: 'مونتاج كامل للمقاطع.', basicF4: 'اختيار أغنية على ذوقك.', basicF5: 'إمكانية تنفيذ فكرة خاصة حسب طلبك.',
    advanced: 'البصمة', advancedDesc: 'رولينق + تصوير ثابت + أكثر من 10 مقاطع + مونتاج', advancedPrice: '130', advancedOldPrice: '150 ريال', advancedDiscount: 'خصم 20 ريال', advancedBadge: 'الأكثر طلبًا',
    advancedF1: 'تصوير رولينق للسيارة.', advancedF2: 'تصوير ثابت من عدة زوايا.', advancedF3: 'أكثر من 10 مقاطع متنوعة.', advancedF4: 'مونتاج متكامل.', advancedF5: 'تنويع في الزوايا والحركات.', advancedF6: 'تسليم الفيديوهات في نفس اليوم بإذن الله.',
    royal: 'السينمائي', royalDesc: 'التصوير السينمائي + 20+ مقطع متنوع', royalPrice: '180', royalOldPrice: '200 ريال', royalDiscount: 'خصم 20 ريال', royalBadge: '',
    royalF1: 'تصوير سينمائي متكامل للسيارة.', royalF2: 'رولينق وتصوير ثابت بزوايا وحركات متنوعة.', royalF3: 'أكثر من 20 مقطع متنوع.', royalF4: 'مونتاج سينمائي احترافي.', royalF5: 'تنفيذ فكرة خاصة حسب طلبك.', royalF6: 'إخراج يناسب سيارتك.',
    whyKicker: 'Why Ayan Photography', whyTitle: 'تجربة مرتبة من الحجز إلى التسليم.', whyText: 'بدل الزحمة في صفحة واحدة، صار عندك مسارات واضحة لكل شيء.', featureLink: 'شوف كل المميزات ←',
    feature1Title: 'جلسات احترافية', feature1Text: 'معدات وعدسات مخصصة لإبراز تفاصيل السيارة وإخراج اللقطة بشكل سينمائي.',
    feature2Title: 'تسليم سريع', feature2Text: 'ترتيب واضح للمحتوى والمعالجة والتسليم بدون ما تضيع وقتك بين خطوات كثيرة.',
    feature3Title: 'تواصل مباشر', feature3Text: 'ترسل طلبك من الموقع وينتقل معك مباشرة إلى الواتساب للتنسيق مع المصور.',
    workflowKicker: 'Ayan Workflow', workflowTitle: 'من أول فكرة إلى آخر فريم.', workflowText: 'كل صفحة لها وظيفة واضحة، عشان العميل يلقى اللي يحتاجه بسرعة.',
    workflow1: 'اختيار الباقة المناسبة.', workflow2: 'تعبئة بيانات السيارة وموقع التصوير.', workflow3: 'استلام الطلب والتنسيق عبر الواتساب.', workflow4: 'التصوير والتسليم حسب تفاصيل الباقة.',
    homeShowcaseKicker: 'من المعرض', homeShowcaseTitle: 'لقطات تحكي طابع كل سيارة.', homeShowcaseText: 'أربع لقطات مختارة — اختر السيارة وشاهد تفاصيلها في المعرض.', homeShowcaseLink: 'شاهد كل الأعمال ←', swipeHint: 'اسحب يمينًا ويسارًا للتنقل', homeShowcaseFrame1: 'شاهد دودج تشارجر RT في المعرض', homeShowcaseFrame2: 'شاهد تويوتا كامري في المعرض', homeShowcaseFrame3: 'شاهد جاغوار F-Type في المعرض', homeShowcaseFrame4: 'شاهد BMW الفئة السابعة في المعرض',
    galleryKicker: 'Gallery', galleryTitle: 'خذ فكرة عن الشغل قبل ما تحجز.', galleryText: 'المعرض صار صفحة مستقلة عشان يبقى التركيز على الفيديو والمحتوى.', exploreGallery: 'استكشف المعرض ←', galleryLoading: 'جاري تجهيز المعرض…',
    featuresHeroKicker: 'Why Ayan Photography', featuresHeroTitle: 'كل تفصيلة محسوبة عشان تطلع سيارتك بأفضل صورة.', featuresHeroText: 'هوية بصرية هادئة، حركة ناعمة، ومسار واضح من أول تواصل إلى آخر تسليم.',
    feature4Title: 'تخطيط اللقطة', feature4Text: 'نرتب فكرة التصوير حسب شكل السيارة والمكان وطابع المحتوى الذي تريده.',
    feature5Title: 'مونتاج مدروس', feature5Text: 'قص وحركة وانتقالات تخدم المشهد بدل ما تكون مجرد مؤثرات عشوائية.',
    feature6Title: 'تجربة جوال أولاً', feature6Text: 'الموقع والحجز مصممان ليكون الاستخدام سريعًا ومريحًا على الجوال والكمبيوتر.',
    servicesTitle: 'الخدمات', servicesText: 'اختَر نوع الإنتاج الذي يخدم هدفك، سواء كان ريلز، صور، أو تغطية كاملة.', catalogKicker: 'الباقات المتاحة', catalogTitle: 'الخدمات والأسعار', catalogText: 'جميع الباقات المتاحة للحجز موضحة هنا مع وصف مختصر وسعر محدث وصور من أعمال Ayan Photography.', catalogLink: 'احجز الآن ←', catalogSilverTitle: 'الرول', catalogSilverText: 'تصوير رولينق أثناء الحركة من زوايا متنوعة، مع تسليم جميع المقاطع الأصلية بدون مونتاج.', catalogBasicTitle: 'الحركة', catalogBasicText: 'تصوير رولينق مع أكثر من 5 مقاطع متنوعة، ومونتاج كامل، واختيار أغنية وفكرة خاصة عند الطلب.', catalogAdvancedTitle: 'البصمة', catalogAdvancedText: 'رولينق وتصوير ثابت من عدة زوايا، أكثر من 10 مقاطع متنوعة، ومونتاج متكامل وتسليم سريع حسب تفاصيل الجلسة.', catalogRoyalTitle: 'السينمائي', catalogRoyalText: 'تصوير سينمائي متكامل يجمع الرولينق والتصوير الثابت، أكثر من 20 مقطع متنوع، ومونتاج احترافي مع إمكانية تنفيذ فكرة خاصة.', catalogChoose: 'اختيار الباقة', catalogNoteTitle: 'ملاحظة:', catalogNoteText: 'الأسعار المعروضة هي أسعار الباقات الحالية، وأي خدمة إضافية يتم توضيحها للعميل قبل تأكيد الطلب.',
    service1Title: 'Rolling Shots', service1Text: 'تصوير أثناء الحركة من زوايا مختلفة لإظهار التصميم والسرعة والحضور.',
    service2Title: 'Static Details', service2Text: 'لقطات ثابتة تركز على التفاصيل الخارجية والداخلية وعناصر التصميم.',
    service3Title: 'Cinematic Edit', service3Text: 'مونتاج متكامل بإيقاع بصري يناسب السيارة والمنصة التي ستنشر عليها.',
    service4Title: 'Custom Concept', service4Text: 'فكرة خاصة يتم تنسيقها حسب أسلوبك والرسالة التي تريد إيصالها.',
    processTitle: 'طريقة العمل', processText: 'أربع خطوات واضحة بدون تعقيد.',
    step1Title: 'اختَر', step1Text: 'حدد الباقة ونوع الجلسة المناسبة.', step2Title: 'أرسل', step2Text: 'أرسل بياناتك وملاحظاتك من نموذج الحجز.', step3Title: 'نسّق', step3Text: 'نكمل التفاصيل معك عبر الواتساب.', step4Title: 'صوّر', step4Text: 'ننفذ الجلسة ونرتب التسليم.',
    bookingHeroKicker: 'Booking', bookingHeroTitle: 'احجز جلسة سيارتك على ثلاث خطوات.', bookingHeroText: 'اختر الباقة، أدخل تفاصيل الجلسة، ثم راجع المبلغ وانتقل للدفع الآمن.', bookingMeta1: 'اختر الباقة', bookingMeta2: 'أدخل التفاصيل', bookingMeta3: 'اختر طريقة الدفع المناسبة', bookingSideTitle: 'ابدأ بالباقة المناسبة.', bookingSideText: 'اختر مستوى التصوير أولًا، وبعدها نكمل معك باقي التفاصيل.', selectedLabel: 'الباقة المختارة', selectedEmpty: 'اختر باقة للبدء', sideFoot1: 'تنسيق مباشر', sideFoot2: 'أسعار واضحة', sideFoot3: 'تحويل للواتساب', bookingStep1: 'الباقة', bookingStep2: 'البيانات', bookingStep3: 'المراجعة والدفع', flowStep1: 'اختر الباقة', flowStep2: 'أضف تفاصيل الجلسة', flowStep3: 'اختر وسيلة دفع آمنة', flowSelected: 'تم اختيار', flowDetails: 'أكمل البيانات المطلوبة', flowReady: 'جاهز للدفع الآمن', validationPackage: 'اختر الباقة أولًا.', validationName: 'اكتب اسمك الكامل.', validationPhone: 'اكتب رقم واتساب سعودي صحيح.', validationCar: 'اختر نوع السيارة.', validationRegion: 'اختر منطقة التصوير.', validationTerms: 'وافق على الشروط والأحكام قبل المتابعة.', formKicker: 'Start your session', packageHint: 'اختَر المستوى الذي يناسب اللقطة التي في بالك.', tapToChoose: 'اضغط للاختيار', packageDiscountNote: 'خصم 20 ريال على جميع الباقات حاليًا.', detailsDivider: 'بيانات الجلسة', submitTitle: 'جاهز؟ خلنا نكمل.', submitText: 'بعد التأكيد راح تراجع المبلغ وتختار طريقة الدفع.',
    formTitle: 'استمارة الحجز الفوري', formRequired: 'الحقول بعلامة * إلزامية', nameLabel: 'اسمك الكامل *', namePlaceholder: 'اسمك بالكامل', phoneLabel: 'رقم الواتساب *', phonePlaceholder: '05xxxxxxxx', packageLabel: 'الباقة *', packagePlaceholder: 'اختر الباقة المطلوبة', carLabel: 'نوع السيارة *', carPlaceholder: 'اختر نوع السيارة', regionLabel: 'منطقة التصوير *', regionPlaceholder: 'اختر المنطقة', notesLabel: 'ملاحظات إضافية', notesPlaceholder: 'زوايا معينة، فكرة خاصة، وقت مناسب، أو أي طلب آخر...', submit: 'متابعة إلى الدفع', formNote: 'المبلغ النهائي يعرض سعر الباقة ورسوم الدفع بشكل منفصل قبل الدفع.', termsAgreement: 'أوافق على الشروط وسياسة الاسترجاع، بما فيها آلية الإبلاغ عن الخلل أو اختلاف الخدمة، مع حفظ الحقوق النظامية للمستهلك.', termsLink: 'عرض الشروط والأحكام',
    bookingAsideTitle: 'قبل الدفع', bookingAsideText: 'راجع بياناتك وسعر الباقة قبل اختيار طريقة الدفع.', aside1: 'اختر الباقة أولًا.', aside2: 'اكتب رقم واتساب متاح.', aside3: 'اذكر أي فكرة خاصة في الملاحظات.', priceNoteTitle: 'الأسعار الأساسية', priceNoteText: '70 / 100 / 150 / 200 SAR', subtotalLabel: 'سعر الباقة', serviceFeeLabel: 'رسوم الدفع', totalLabel: 'الإجمالي', taxNotice: 'رسوم الدفع تُحسب حسب طريقة الدفع المختارة.', selectedBaseLabel: 'قبل الإضافات', paymentError: 'تعذر تجهيز عملية الدفع. حاول مرة ثانية.', paymentPreparing: 'جاري تجهيز الدفع…', paymentMethodsTitle: 'طرق الدفع', paymentMaintenance: 'تحت الصيانة', paymentMethodsNote: 'اختر وسيلة الدفع المناسبة في صفحة مراجعة الطلب.',
    supportKicker: 'Support', supportTitle: 'الدعم والمساعدة', supportIntro: 'عندك اقتراح، شكوى، استفسار أو طلب تواصل؟ أرسل النموذج ونرجع لك خلال 24 ساعة عمل.', supportResponseTitle: 'استجابة سريعة', supportResponseText: 'نراجع الطلب، يوصلنا على Discord والبريد، وبعدها نتواصل معك خلال 24 ساعة عمل.', supportFormKicker: 'Help Center', supportFormTitle: 'كيف نقدر نساعدك؟', supportRequired: 'الحقول بعلامة * إلزامية', supportSuggestion: 'اقتراح', supportSuggestionText: 'فكرة لتطوير التجربة', supportComplaint: 'شكوى', supportComplaintText: 'مشكلة أو ملاحظة على الخدمة', supportInquiry: 'استفسار', supportInquiryText: 'اسأل عن خدمة أو حجز', supportContact: 'طلب تواصل', supportContactText: 'نرتب معك مكالمة أو رد مباشر', supportNameLabel: 'الاسم الكامل *', supportNamePlaceholder: 'اسمك بالكامل', supportPhoneLabel: 'رقم الجوال *', supportPhonePlaceholder: '05xxxxxxxx', supportEmailLabel: 'البريد الإلكتروني *', supportEmailPlaceholder: 'you@example.com', supportSubjectLabel: 'الموضوع *', supportSubjectPlaceholder: 'اكتب موضوع الطلب', supportMessageLabel: 'التفاصيل *', supportMessagePlaceholder: 'اكتب تفاصيل الطلب هنا...', supportSubmit: 'إرسال الطلب', supportSending: 'جاري إرسال الطلب…', supportSuccessTitle: 'تم استقبال طلبك بنجاح ✅', supportSuccessText: 'تم إرسال الطلب، وسوف يتم التواصل معك خلال 24 ساعة عمل.', supportPromiseTitle: 'وش يصير بعد الإرسال؟', supportPromiseText: 'يوصل الطلب لفريقنا على Discord والبريد الإلكتروني، وبعدها يتم التواصل معك خلال 24 ساعة عمل.', supportPrivacy: 'استخدم بريدًا ورقمًا صحيحين حتى نقدر نرد عليك مباشرة.', supportSideTitle: 'نحن هنا لخدمتك', supportSideText: 'كل طلب يتم تسجيله ومراجعته قبل التواصل معك.', supportSide1Title: 'اقتراح', supportSide1Text: 'أرسل فكرة تساعدنا نطوّر تجربة Ayan.', supportSide2Title: 'شكوى', supportSide2Text: 'وضّح المشكلة مع التفاصيل حتى نراجعها.', supportSide3Title: 'استفسار', supportSide3Text: 'أي سؤال عن الحجز أو الخدمات.', supportSide4Title: 'طلب تواصل', supportSide4Text: 'اطلب تواصلًا مباشرًا ونرتب معك.', supportValidationType: 'اختر نوع الطلب أولًا.', supportValidationName: 'اكتب اسمك الكامل.', supportValidationSubject: 'اكتب موضوع الطلب.', supportValidationEmail: 'اكتب بريدًا إلكترونيًا صحيحًا.', supportValidationPhone: 'اكتب رقم جوال سعودي صحيح.', supportValidationMessage: 'اكتب تفاصيل الطلب بشكل أوضح.', supportNetworkError: 'تعذر إرسال الطلب حاليًا. حاول مرة ثانية.', supportGenericError: 'تعذر إرسال الطلب. حاول مرة ثانية.', galleryHeroKicker: 'Gallery', galleryHeroTitle: 'شوف النتيجة قبل ما تحجز.', galleryHeroText: 'مكتبة الصور والفيديوهات في مكان واحد، مع فلترة سريعة وفتح كامل للمحتوى.', galleryAll: 'الكل', galleryVideos: 'الفيديوهات', galleryImages: 'الصور', galleryCount: 'محتوى', readyTitle: 'عجبك الشغل؟', readyText: 'انتقل مباشرة إلى نموذج الحجز واختَر الباقة المناسبة.', startBooking: 'ابدأ الحجز ←',
    footerCopy: 'تصوير سيارات احترافي، رولينق، جلسات ثابتة، ومونتاج سينمائي بأسلوب يناسب كل سيارة.', developerCreditLabel: 'مبرمج الموقع', footerNav: 'التنقل', footerContact: 'تواصل', footerLocation: 'المنطقة الشرقية، السعودية', footerTag: 'Built for cinematic car content', termsPageLink: 'الشروط والأحكام', termsKicker: 'Terms & Conditions', termsTitle: 'الشروط والأحكام', termsIntro: 'قبل إتمام الحجز، يرجى قراءة الشروط والقواعد الخاصة بالخدمات والمحتويات الرقمية المقدمة من Ayan Photography.', termsDigitalTitle: 'الخدمات والمنتجات الرقمية', termsDigitalText: 'تُقدَّم خدمات Ayan Photography الرقمية، مثل التصوير والمقاطع والصور والمونتاج، وفق وصف الباقة والتفاصيل المتفق عليها. تخضع طلبات الاسترجاع لما يلي وللحقوق المقررة للمستهلك بموجب الأنظمة المعمول بها في المملكة.', termsRefundTitle: 'سياسة الاسترجاع', termsRefund1: 'إذا لم تنتفع بالخدمة، يمكنك طلب إلغائها خلال 7 أيام من تاريخ الحجز، حسب النظام.', termsRefund2: 'إذا لاحظت خللًا أو نقصًا واضحًا في الباقة، أرسل رقم الحجز وشرحًا مختصرًا وصورة أو مقطعًا إن أمكن. نراجع الحالة ونحاول إصلاحها أو استكمالها؛ وإذا تعذر ذلك ندرس الاسترجاع حسب النظام.', termsRefund3: 'إذا تأخر التنفيذ أكثر من 15 يومًا عن تاريخ الحجز أو الموعد المتفق عليه، يمكنك طلب الإلغاء واسترداد المبلغ، إلا إذا كان التأخير بسبب ظرف خارج عن السيطرة.', termsRefund4: 'الاختلاف في الذوق أو طلب إضافة خارج الباقة لا يُعد خللًا بحد ذاته؛ نوضح التكلفة قبل التنفيذ.', termsBookingTitle: 'الحجز والتنفيذ', termsBooking1: 'يتم تنفيذ الخدمة حسب الباقة والمعلومات التي يرسلها العميل أثناء الحجز.', termsBooking2: 'يجب التأكد من صحة الاسم ورقم الجوال ونوع السيارة والمنطقة قبل الدفع.', termsBooking3: 'أي تفاصيل إضافية خارج وصف الباقة يتم توضيحها للعميل قبل تأكيد الطلب.', termsDeliveryTitle: 'التسليم والمحتوى', termsDelivery1: 'يتم تسليم المحتوى الرقمي حسب تفاصيل الباقة المتفق عليها.', termsDelivery2: 'المحتوى المُسلّم رقمي ولا يتضمن منتجًا ماديًا أو شحنة قابلة للإرجاع.', termsContactTitle: 'التواصل', termsContactText: 'لأي استفسار عن الحجز أو تفاصيل الخدمة، تواصل معنا عبر واتساب قبل إتمام الدفع.', termsContactButton: 'تواصل عبر واتساب',
    loading1: 'جاري تهيئة Ayan Photography...', loading2: 'جاري تجهيز اللقطات السينمائية...', loading3: 'كل شيء جاهز 🚀',
    bookingSuccess: '✨ تم استقبال طلبك بنجاح، جاري تحويلك للواتساب...', requiredAlert: 'يرجى تعبئة الحقول الإجبارية.', waitAlert: '⚠️ انتظر قليلاً قبل إرسال طلب آخر.', networkAlert: 'تعذر إرسال الطلب للنظام، سيتم فتح الواتساب مباشرة.',
    whatsappAr: 'مرحباً، أرغب في حجز جلسة تصوير',
  },
  en: {
    brandTag: 'Automotive Photography',
    devEyebrow: 'Ayan Developer', devTitle: 'From an idea to a <span>finished product.</span>', devLead: 'I design and build clear, fast digital experiences — from the first concept to a live website that works for people and businesses.', devProjectsCta: 'Explore my work', devContactCta: 'Get in touch ↗', devProofAria: 'Product development stages', devProof1: 'Identity', devProof2: 'Development', devProof3: 'Launch', devAboutKicker: 'About the developer', devAboutTitle: 'I build the product from the idea to the details.', devAboutText: 'I bring design and development together to make experiences feel polished, clear, and easy to use on every screen.', devPillar1Title: 'Clear experience', devPillar1Text: 'A considered interface that helps people find the right information and next step.', devPillar2Title: 'Responsive development', devPillar2Text: 'Pages that work smoothly on phones and desktops, in both Arabic and English.', devPillar3Title: 'Launch-ready', devPillar3Text: 'Core pages and services connected, with the main customer paths ready to go live.', devWorkKicker: 'Selected work', devWorkTitle: 'Real projects on the web.', devWorkText: 'A selection of live websites combining visual identity with the tools customers need.', devAyanDescription: 'A car photography platform bringing packages, gallery, booking, and payments into one customer journey.', dev5loDescription: 'A car photography studio website focused on presenting the work and making booking easy to reach.', devVisitProject: 'Visit project ↗', devStackKicker: 'Technology', devStackTitle: 'The tools follow the project.', devStackText: 'I choose the technology that serves the experience, with a steady focus on performance, clarity, and maintainability.', devStackAria: 'Development tools and technologies', devCtaKicker: 'Start a project', devCtaTitle: 'Have an idea? Let’s build it.', devCtaText: 'Send me your idea and we can map out the right steps to turn it into a website or digital experience.', devEmail: 'Send an email',
    home: 'Home', features: 'Features', booking: 'Booking', gallery: 'Gallery', support: 'Support', quick: 'Quick Booking', socialWhatsApp: 'WhatsApp', socialInstagram: 'Instagram', socialSnapchat: 'Snapchat', socialMenuLabel: 'Social links',
    theme: 'Theme', lang: 'Language', relax: 'Relax', dark: 'Dark 🌙', light: 'Light ☀️',
    heroEyebrow: 'Automotive photography · Eastern Province', heroTitle: 'Every car has <span>a story.</span>', heroLead: 'We give your car the presence it deserves — cinematic photography in the Eastern Province, thoughtful details, and an easy booking journey from first frame to final finish.', bookNow: 'Book your session', watchGallery: 'View gallery',
    heroCard1Title: 'Visual identity', heroCard1Text: 'Frames built to reveal the character, shape, and details of your car.', heroCard2Title: 'Faster workflow', heroCard2Text: 'A clear booking path, direct coordination, and delivery matched to your package.', heroCard3Title: 'Flexible experience', heroCard3Text: 'Choose the package, location, and car type — we handle the rest.',
    packagesKicker: 'Packages', packagesTitle: 'Four packages. Your kind of frame.', packagesText: 'Pick the production level that fits you — from rolling-only footage to a complete cinematic session.', packagesLink: 'Customize & book →',
    
    silverH1: 'Raw clips', silverH2: 'Multi-angle', silverH3: 'No edit',
    basicH1: '5+ clips', basicH2: 'Full edit', basicH3: 'Music choice',
    advancedH1: '10+ clips', advancedH2: 'Static shots', advancedH3: 'Full edit',
    royalH1: '20+ clips', royalH2: 'Cinematic', royalH3: 'Custom idea',
    silver: 'ROLL', silverDesc: 'Rolling without editing', silverPrice: '50', silverOldPrice: '70 SAR', silverDiscount: '20 SAR OFF', silverF1: 'Rolling shots of the car.', silverF2: 'Moving shots from multiple angles.', silverF3: 'All original clips delivered without editing.', selectPackage: 'Choose package',
    basic: 'MOTION', basicDesc: 'Rolling + 5+ clips + editing', basicPrice: '80', basicOldPrice: '100 SAR', basicDiscount: '20 SAR OFF', basicF1: 'Rolling shots of the car.', basicF2: 'More than 5 varied clips.', basicF3: 'Full edit of the footage.', basicF4: 'Choose the music style you want.', basicF5: 'Option for a custom idea.',
    advanced: 'SIGNATURE', advancedDesc: 'Rolling + static + more than 10 varied clips + editing', advancedPrice: '130', advancedOldPrice: '150 SAR', advancedDiscount: '20 SAR OFF', advancedBadge: 'Most Popular', advancedF1: 'Rolling shots of the car.', advancedF2: 'Static shots from several angles.', advancedF3: 'More than 10 varied clips.', advancedF4: 'Complete edit.', advancedF5: 'Varied camera movements and angles.', advancedF6: 'Same-day delivery when possible.',
    royal: 'CINEMATIC', royalDesc: 'Cinematic production + 20+ clips', royalPrice: '180', royalOldPrice: '200 SAR', royalDiscount: '20 SAR OFF', royalBadge: '', royalF1: 'Complete cinematic car coverage.', royalF2: 'Rolling and static shots with varied movement.', royalF3: 'More than 20 varied clips.', royalF4: 'Professional cinematic edit.', royalF5: 'Custom concept execution.', royalF6: 'Direction tailored to your car.',
    whyKicker: 'Why Ayan Photography', whyTitle: 'A clean experience from booking to delivery.', whyText: 'Instead of a crowded one-page site, every part of the journey now has a clear path.', featureLink: 'Explore all features →', feature1Title: 'Professional sessions', feature1Text: 'Purpose-built camera work and lenses to reveal the car with cinematic detail.', feature2Title: 'Fast delivery', feature2Text: 'A clear workflow for production, processing, and delivery without unnecessary steps.', feature3Title: 'Direct coordination', feature3Text: 'Submit your request on the site and continue straight to WhatsApp for coordination.',
    workflowKicker: 'Ayan Workflow', workflowTitle: 'From the first idea to the final frame.', workflowText: 'Every page has one clear job, so clients find what they need quickly.', workflow1: 'Choose the right package.', workflow2: 'Add car and shoot details.', workflow3: 'Receive and coordinate the request on WhatsApp.', workflow4: 'Shoot and deliver based on the package.', homeShowcaseKicker: 'Selected work', homeShowcaseTitle: 'Frames shaped around every car.', homeShowcaseText: 'Four selected frames. Choose a car and explore its details in the gallery.', homeShowcaseLink: 'View all work →', swipeHint: 'Swipe right or left to explore', homeShowcaseFrame1: 'View Dodge Charger RT in the gallery', homeShowcaseFrame2: 'View Toyota Camry in the gallery', homeShowcaseFrame3: 'View Jaguar F-Type in the gallery', homeShowcaseFrame4: 'View BMW 7 Series in the gallery', galleryKicker: 'Gallery', galleryTitle: 'See the work before you book.', galleryText: 'The gallery now lives on its own page so the focus stays on the visual work.', exploreGallery: 'Explore gallery →',
    featuresHeroKicker: 'Why Ayan Photography', featuresHeroTitle: 'Every detail is designed to make your car look its best.', featuresHeroText: 'Quiet visual direction, smooth motion, and a clear journey from the first message to final delivery.', feature4Title: 'Shot planning', feature4Text: 'We shape the concept around the car, location, and content style you want.', feature5Title: 'Intentional editing', feature5Text: 'Cuts, motion, and transitions that support the scene instead of fighting it.', feature6Title: 'Mobile-first experience', feature6Text: 'The website and booking flow are designed to feel fast on both phone and desktop.', servicesTitle: 'Services', servicesText: 'Choose the production type that fits your goal, whether it is reels, details, or a full session.', catalogKicker: 'Available Packages', catalogTitle: 'Services & Pricing', catalogText: 'All bookable packages are listed here with a clear description, current price, and selected Ayan Photography work.', catalogLink: 'Book now →', catalogSilverTitle: 'ROLL', catalogSilverText: 'Rolling coverage from multiple angles with all original clips delivered without editing.', catalogBasicTitle: 'MOTION', catalogBasicText: 'Rolling coverage with 10+ varied clips, full editing, music selection, and an optional custom concept.', catalogAdvancedTitle: 'SIGNATURE', catalogAdvancedText: 'Rolling and static coverage from multiple angles, 10+ clips, full editing, and fast delivery based on the session.', catalogRoyalTitle: 'CINEMATIC', catalogRoyalText: 'A complete cinematic session combining rolling, static coverage, professional editing, and a custom concept option.', catalogChoose: 'Choose package', catalogNoteTitle: 'Note:', catalogNoteText: 'Displayed prices are the current package prices. Any additional service is explained before the order is confirmed.', service1Title: 'Rolling Shots', service1Text: 'Moving coverage from different angles to show design, speed, and presence.', service2Title: 'Static Details', service2Text: 'Still frames that focus on exterior, interior, and design details.', service3Title: 'Cinematic Edit', service3Text: 'A full edit with a visual rhythm built around the car and the platform.', service4Title: 'Custom Concept', service4Text: 'A tailored idea coordinated around your style and the message you want to convey.',
    processTitle: 'How it works', processText: 'Four clear steps with no unnecessary complexity.', step1Title: 'Choose', step1Text: 'Pick the package and session type.', step2Title: 'Send', step2Text: 'Submit your details and notes.', step3Title: 'Coordinate', step3Text: 'We finalize the details through WhatsApp.', step4Title: 'Shoot', step4Text: 'We execute the session and arrange delivery.',
    bookingHeroKicker: 'Booking', bookingHeroTitle: 'Book your car session in three steps.', bookingHeroText: 'Choose a package, add your session details, then review the total and continue to secure payment.', bookingMeta1: 'Choose a package', bookingMeta2: 'Add your details', bookingMeta3: 'Choose your payment method', bookingSideTitle: 'Start with the right package.', bookingSideText: 'Choose your production level first, then we will handle the rest with you.', selectedLabel: 'Selected package', selectedEmpty: 'Choose a package to begin', sideFoot1: 'Direct coordination', sideFoot2: 'Clear pricing', sideFoot3: 'WhatsApp handoff', bookingStep1: 'Package', bookingStep2: 'Details', bookingStep3: 'Review & pay', flowStep1: 'Choose your package', flowStep2: 'Add your session details', flowStep3: 'Choose a secure payment method', flowSelected: 'Selected', flowDetails: 'Complete the required details', flowReady: 'Ready for secure payment', validationPackage: 'Choose a package first.', validationName: 'Enter your full name.', validationPhone: 'Enter a valid Saudi WhatsApp number.', validationCar: 'Choose your car type.', validationRegion: 'Choose the shoot area.', validationTerms: 'Accept the terms and conditions before continuing.', formKicker: 'Start your session', packageHint: 'Choose the production level that fits the shot in your head.', tapToChoose: 'Tap to choose', packageDiscountNote: '20 SAR discount on all packages.', detailsDivider: 'Session details', submitTitle: 'Ready? Let’s finish it.', submitText: 'After confirmation, you will review the total and choose a payment method.',
    formTitle: 'Instant booking form', termsAgreement: 'I agree to the terms and refund policy, including how to report a defect or service discrepancy, while retaining statutory consumer rights.', termsLink: 'View terms and conditions', formRequired: 'Fields marked * are required', nameLabel: 'Full name *', namePlaceholder: 'Your full name', phoneLabel: 'WhatsApp number *', phonePlaceholder: '05xxxxxxxx', packageLabel: 'Package *', packagePlaceholder: 'Choose a package', carLabel: 'Car type *', carPlaceholder: 'Choose your car type', regionLabel: 'Shoot area *', regionPlaceholder: 'Choose an area', notesLabel: 'Additional notes', notesPlaceholder: 'Specific angles, a custom idea, preferred time, or anything else...', submit: 'Continue to payment', formNote: 'The final amount shows the package price and payment fee separately before payment.', bookingAsideTitle: 'Before payment', bookingAsideText: 'Review your details and the package price before choosing a payment method.', aside1: 'Choose the package first.', aside2: 'Use an active WhatsApp number.', aside3: 'Add any special idea in the notes.', priceNoteTitle: 'Base prices', priceNoteText: '70 / 100 / 150 / 200 SAR', subtotalLabel: 'Package price', serviceFeeLabel: 'Payment fee', totalLabel: 'Total', taxNotice: 'Payment fees are shown on the checkout page based on the selected method.', selectedBaseLabel: 'Before additions', paymentError: 'We could not prepare the payment. Please try again.', paymentPreparing: 'Preparing secure payment…', paymentMethodsTitle: 'Payment methods', paymentMaintenance: 'Under maintenance', paymentMethodsNote: 'Choose your payment method on the order review page.',
    galleryHeroKicker: 'Gallery', galleryHeroTitle: 'See the result before you book.', galleryHeroText: 'Photos and videos in one place, with quick filters and a full-view lightbox.', galleryAll: 'All', galleryVideos: 'Videos', galleryImages: 'Photos', galleryCount: 'items', galleryLoading: 'Preparing the gallery…', readyTitle: 'Like what you see?', readyText: 'Go straight to the booking form and choose the right package.', startBooking: 'Start booking →', footerCopy: 'Professional car photography, rolling shots, static sessions, and cinematic edits shaped around every car.', developerCreditLabel: 'Developed by', footerNav: 'Navigation', footerContact: 'Contact', footerLocation: 'Eastern Province, Saudi Arabia', footerTag: 'Built for cinematic car content', termsPageLink: 'Terms & Conditions', termsKicker: 'Terms & Conditions', termsTitle: 'Terms & Conditions', termsIntro: 'Please read the terms and rules for Ayan Photography digital services and content before completing your booking.', termsDigitalTitle: 'Digital Services & Products', termsDigitalText: 'Ayan Photography digital services, including photography, videos, images, and editing, are provided according to the package description and agreed details. Refund requests are handled under this policy and the consumer rights provided by applicable Saudi regulations.', termsRefundTitle: 'Refund Policy', termsRefund1: 'If you have not benefited from the service, you may request cancellation within 7 days of booking, as allowed by law.', termsRefund2: 'If you notice a clear defect or missing part, send your booking number, a short description, and a photo or video if possible. We will review it and try to fix or complete the work. If we cannot, we will review the refund under applicable rules.', termsRefund3: 'If execution is more than 15 days late from booking or the agreed date, you may request cancellation and a refund, unless the delay is due to circumstances beyond our control.', termsRefund4: 'A difference in personal preference or a request for an extra outside the package is not by itself a defect. We will explain the cost before proceeding.', termsBookingTitle: 'Booking & Execution', termsBooking1: 'The service is delivered according to the selected package and the information submitted during booking.', termsBooking2: 'Please confirm your name, mobile number, car type, and area before payment.', termsBooking3: 'Any service outside the package description will be explained before the order is confirmed.', termsDeliveryTitle: 'Delivery & Content', termsDelivery1: 'Digital content is delivered according to the agreed package details.', termsDelivery2: 'Delivered content is digital and does not include a physical product or returnable shipment.', termsContactTitle: 'Contact', termsContactText: 'For any booking or service question, contact us through WhatsApp before completing payment.', termsContactButton: 'Contact via WhatsApp',
    loading1: 'Initializing Ayan Photography...', loading2: 'Preparing cinematic frames...', loading3: 'Everything is ready 🚀', bookingSuccess: '✨ Request received. Redirecting to WhatsApp...', requiredAlert: 'Please complete the required fields.', waitAlert: '⚠️ Please wait a moment before sending another request.', networkAlert: 'The system request could not be sent. WhatsApp will open directly.', whatsappAr: 'Hello, I would like to book a car photography session',
  }
};

translations.ar.preferredAtLabel = 'المواعيد المتاحة هذا الأسبوع *';
translations.ar.preferredAtHint = 'اختر يومًا مقترحًا؛ الموعد النهائي يتأكد بعد التنسيق عبر واتساب.';
translations.ar.preferredAtNote = 'اليوم المقترح للتصوير: {date}';
translations.ar.validationDate = 'اختر يوم التصوير من الخيارات المتاحة.';
translations.ar.bookingDateOptionsLabel = 'اختر يوم التصوير';
translations.ar.dateRequestStatus = 'موعد مقترح';
translations.ar.phoneCountryLabel = 'رمز الدولة';
translations.ar.carDetailsLabel = 'نوع السيارة وموديلها (اختياري)';
translations.ar.notesLabel = 'ملاحظات إضافية (اختياري)';
translations.ar.carDetailsPlaceholder = 'مثال: Toyota Camry 2024';
translations.ar.bookingCouponLabel = 'لديك كود خصم؟ (اختياري)';
translations.ar.bookingCouponFieldLabel = 'أدخل كود الخصم';
translations.ar.bookingCouponPlaceholder = 'إذا كان لديك كود خصم، اكتبه هنا';
translations.ar.bookingCouponHint = 'سيتم التحقق من الكود عند الدفع';
translations.ar.validationPhone = 'تحقق من رمز الدولة ورقم الجوال.';
translations.ar.phonePlaceholder = 'أدخل رقم الجوال';
translations.en.preferredAtLabel = 'Available dates this week *';
translations.en.preferredAtHint = 'Choose a proposed day. We will confirm the appointment with you on WhatsApp.';
translations.en.preferredAtNote = 'Preferred shoot date: {date}';
translations.en.validationDate = 'Choose a shoot date from the available options.';
translations.en.bookingDateOptionsLabel = 'Choose a shoot date';
translations.en.dateRequestStatus = 'Proposed date';
translations.en.phoneCountryLabel = 'Country code';
translations.en.carDetailsLabel = 'Car make and model (optional)';
translations.en.notesLabel = 'Additional notes (optional)';
translations.en.carDetailsPlaceholder = 'Example: Toyota Camry 2024';
translations.en.bookingCouponLabel = 'Have a discount code? (Optional)';
translations.en.bookingCouponFieldLabel = 'Enter your discount code';
translations.en.bookingCouponPlaceholder = 'If you have a discount code, enter it here';
translations.en.bookingCouponHint = 'The code will be checked at payment';
translations.en.validationPhone = 'Check the country code and mobile number.';
translations.en.phonePlaceholder = 'Enter your mobile number';
translations.ar.submitText = 'راجع الإجمالي واختر طريقة الدفع المناسبة: مدى أو Apple Pay أو بطاقة أو تابي أو تمارا.';
translations.en.submitText = 'Review the total and choose mada, Apple Pay, a card, Tabby, or Tamara.';
translations.ar.wizardPackageTitle = 'اختر باقتك';
translations.ar.wizardPackageText = 'اختر أسلوب التصوير المناسب لسيارتك، وراجع السعر قبل الدفع.';
translations.ar.wizardPackageHint = 'تقدر تغيّر اختيارك قبل الدفع.';
translations.ar.wizardNextDetails = 'متابعة إلى بيانات الجلسة';
translations.ar.wizardDetailsTitle = 'بيانات الجلسة';
translations.ar.wizardDetailsText = 'أدخل وسيلة التواصل ومعلومات السيارة ومكان التصوير.';
translations.ar.wizardBackPackage = 'رجوع للباقات';
translations.ar.wizardNextReview = 'مراجعة الطلب';
translations.ar.wizardReviewTitle = 'راجع طلبك';
translations.ar.wizardReviewText = 'تأكد من الباقة والسعر، ثم انتقل لاختيار طريقة الدفع.';
translations.ar.bookingStep3 = 'الموعد';
translations.ar.bookingStep4 = 'الدفع';
translations.ar.bookingHeroTitle = 'احجز جلسة سيارتك على أربع خطوات.';
translations.ar.bookingHeroText = 'اختر الباقة، أدخل بياناتك ومعلومات السيارة، حدد الموعد، ثم وافق واختر طريقة الدفع.';
translations.ar.flowStep3 = 'اختر يوم التصوير من الأسبوع الحالي';
translations.ar.flowStep4 = 'راجع ووافق ثم اختر الدفع';
translations.ar.flowReady = 'جاهز للمتابعة الآمنة';
translations.ar.shootCountryLabel = 'الدولة *';
translations.ar.countrySaudi = 'السعودية';
translations.ar.countryBahrain = 'البحرين';
translations.ar.countryKuwait = 'الكويت';
translations.ar.regionChooseCountry = 'اختر الدولة أولًا';
translations.ar.regionChooseCity = 'اختر المدينة المناسبة';
translations.ar.bookingRegionOptionsLabel = 'المناطق المتاحة';
translations.ar.validationCountry = 'اختر الدولة أولًا.';
translations.ar.wizardNextSchedule = 'متابعة إلى الموعد';
translations.ar.wizardScheduleTitle = 'اختر موعد التصوير';
translations.ar.wizardScheduleText = 'الأسبوع الحالي محدد تلقائيًا؛ اختر يومًا متاحًا من اليوم حتى السبت.';
translations.ar.wizardBackDetails = 'رجوع للبيانات';
translations.ar.wizardNextPayment = 'متابعة إلى الدفع';
translations.ar.wizardBackSchedule = 'رجوع للمواعيد';
translations.ar.wizardPaymentTitle = 'راجع ووافق ثم اختر طريقة الدفع';
translations.ar.wizardPaymentText = 'راجع السعر ووافق على الشروط قبل متابعة الدفع الآمن.';
translations.en.wizardPackageTitle = 'Choose your package';
translations.en.wizardPackageText = 'Pick the photography style for your car and review the price before payment.';
translations.en.wizardPackageHint = 'You can change your selection before paying.';
translations.en.wizardNextDetails = 'Continue to session details';
translations.en.wizardDetailsTitle = 'Session details';
translations.en.wizardDetailsText = 'Add your contact details, car information, and shoot location.';
translations.en.wizardBackPackage = 'Back to packages';
translations.en.wizardNextReview = 'Review booking';
translations.en.wizardReviewTitle = 'Review your booking';
translations.en.wizardReviewText = 'Check the selected package and total, then choose a payment method.';
translations.en.bookingStep3 = 'Schedule';
translations.en.bookingStep4 = 'Payment';
translations.en.bookingHeroTitle = 'Book your car session in four steps.';
translations.en.bookingHeroText = 'Choose a package, enter your details and car information, select a date, then accept the terms and choose payment.';
translations.en.flowStep3 = 'Choose a date from this week';
translations.en.flowStep4 = 'Review, accept, and choose payment';
translations.en.flowReady = 'Ready for secure checkout';
translations.en.shootCountryLabel = 'Country *';
translations.en.countrySaudi = 'Saudi Arabia';
translations.en.countryBahrain = 'Bahrain';
translations.en.countryKuwait = 'Kuwait';
translations.en.regionChooseCountry = 'Choose a country first';
translations.en.regionChooseCity = 'Choose your preferred area';
translations.en.bookingRegionOptionsLabel = 'Available areas';
translations.en.validationCountry = 'Choose a country first.';
translations.en.wizardNextSchedule = 'Continue to schedule';
translations.en.wizardScheduleTitle = 'Choose your shoot date';
translations.en.wizardScheduleText = 'The current week is selected automatically. Choose an available day from today through Saturday.';
translations.en.wizardBackDetails = 'Back to details';
translations.en.wizardNextPayment = 'Continue to payment';
translations.en.wizardBackSchedule = 'Back to schedule';
translations.en.wizardPaymentTitle = 'Review and accept, then choose payment';
translations.en.wizardPaymentText = 'Review the total and accept the terms before secure checkout.';
translations.en.supportKicker = 'SUPPORT';
translations.en.supportTitle = 'Support & help';
translations.en.supportIntro = 'Have a suggestion, complaint, question, or need a call back? Send us a message and we will reply within one business day.';
translations.en.supportResponseTitle = 'Quick response';
translations.en.supportResponseText = 'We review every request and send it to our support team by Discord and email, then follow up within one business day.';
translations.en.supportFormKicker = 'HELP CENTER';
translations.en.supportFormTitle = 'How can we help?';
translations.en.supportRequired = 'Fields marked * are required';
translations.en.supportSuggestion = 'Suggestion';
translations.en.supportSuggestionText = 'Share an idea to improve the experience';
translations.en.supportComplaint = 'Complaint';
translations.en.supportComplaintText = 'A problem or feedback about the service';
translations.en.supportInquiry = 'Question';
translations.en.supportInquiryText = 'Ask about a service or booking';
translations.en.supportContact = 'Contact request';
translations.en.supportContactText = 'Request a call or a direct reply';
translations.en.supportNameLabel = 'Full name *';
translations.en.supportNamePlaceholder = 'Your full name';
translations.en.supportPhoneLabel = 'Mobile number *';
translations.en.supportPhonePlaceholder = '05xxxxxxxx';
translations.en.supportEmailLabel = 'Email address *';
translations.en.supportEmailPlaceholder = 'you@example.com';
translations.en.supportSubjectLabel = 'Subject *';
translations.en.supportSubjectPlaceholder = 'What is your request about?';
translations.en.supportMessageLabel = 'Details *';
translations.en.supportMessagePlaceholder = 'Write the details of your request here...';
translations.en.supportSubmit = 'Send request';
translations.en.supportSending = 'Sending request…';
translations.en.supportSuccessTitle = 'Your request was received ✅';
translations.en.supportSuccessText = 'Your message has been sent. We will get back to you within one business day.';
translations.en.supportPromiseTitle = 'What happens next?';
translations.en.supportPromiseText = 'Our support team receives your request by Discord and email, then follows up within one business day.';
translations.en.supportPrivacy = 'Use a valid email address and mobile number so we can reply to you.';
translations.en.supportSideTitle = 'We are here to help';
translations.en.supportSideText = 'Every request is recorded and reviewed before we contact you.';
translations.en.supportSide1Title = 'Suggestion';
translations.en.supportSide1Text = 'Share an idea that could improve Ayan.';
translations.en.supportSide2Title = 'Complaint';
translations.en.supportSide2Text = 'Describe the issue so we can review it.';
translations.en.supportSide3Title = 'Question';
translations.en.supportSide3Text = 'Ask us about a booking or service.';
translations.en.supportSide4Title = 'Contact request';
translations.en.supportSide4Text = 'Request a direct reply and we will arrange it.';
translations.en.supportValidationType = 'Choose a request type first.';
translations.en.supportValidationName = 'Enter your full name.';
translations.en.supportValidationSubject = 'Enter a subject.';
translations.en.supportValidationEmail = 'Enter a valid email address.';
translations.en.supportValidationPhone = 'Enter a valid Saudi mobile number.';
translations.en.supportValidationMessage = 'Please add more detail to your request.';
translations.en.supportNetworkError = 'We could not send your request. Please try again.';
translations.en.supportGenericError = 'Your request could not be sent. Please try again.';
translations.en.supportType = 'Request type';
translations.en.verificationTitle = 'Verified store';
translations.en.verificationNumber = 'Verification number: 0000333236';
translations.en.verificationLink = 'Verified store';
translations.ar.verificationShortcutLabel = 'متجر موثّق — فتح التحقق الرسمي';
translations.en.verificationShortcutLabel = 'Verified store — open official verification';
translations.ar.verificationQrButton = 'عرض رمز التحقق QR';
translations.en.verificationQrButton = 'Show verification QR code';
translations.ar.verificationTitle = 'متجر موثّق';
translations.ar.verificationNumber = 'رقم الشهادة: 0000333236';
translations.ar.verificationLink = 'متجر موثّق';
translations.ar.verificationDialogTitle = 'متجر موثّق';
translations.en.verificationDialogTitle = 'Verified store';
translations.ar.verificationStoreName = 'Ayan Photography';
translations.en.verificationStoreName = 'Ayan Photography';
translations.ar.verificationStateLabel = 'حالة الشهادة';
translations.en.verificationStateLabel = 'Certificate status';
translations.ar.verificationStateText = 'تحقق من الحالة الحالية عبر منصة الأعمال';
translations.en.verificationStateText = 'Check the current status on the Saudi Business Platform';
translations.ar.verificationStateValue = 'ساري';
translations.en.verificationStateValue = 'Active';
translations.ar.verificationExpiryLabel = 'تاريخ انتهاء الصلاحية';
translations.en.verificationExpiryLabel = 'Expiration date';
translations.ar.verificationExpiryValue = '01/10/2027';
translations.en.verificationExpiryValue = '01/10/2027';
translations.ar.verificationQrHint = 'امسح الرمز لفتح صفحة التحقق';
translations.en.verificationQrHint = 'Scan to open certificate verification';
translations.ar.verificationOpen = 'عرض التحقق';
translations.en.verificationOpen = 'View verification';
translations.ar.verificationClose = 'إغلاق';
translations.en.verificationClose = 'Close';
translations.ar.loadingCaption = 'نجهّز لك اللقطة';
translations.en.loadingCaption = 'Preparing your session';
translations.ar.loadingAria = 'Ayan Photography — جارٍ تجهيز الصفحة';
translations.en.loadingAria = 'Ayan Photography — preparing the page';

const packageOptions = {
  ar: [
    ['◈ الرول - 50 ريال', '◈ الرول — 50 ريال'],
    ['◇ الحركة - 80 ريال', '◇ الحركة — 80 ريال'],
    ['✦ البصمة - 130 ريال', '✦ البصمة — 130 ريال'],
    ['✧ السينمائي - 180 ريال', '✧ السينمائي — 180 ريال']
  ],
  en: [
    ['◈ ROLL - 50 SAR', '◈ ROLL — 50 SAR'],
    ['◇ MOTION - 80 SAR', '◇ MOTION — 80 SAR'],
    ['✦ SIGNATURE - 130 SAR', '✦ SIGNATURE — 130 SAR'],
    ['✧ CINEMATIC - 180 SAR', '✧ CINEMATIC — 180 SAR']
  ]
};

const carOptions = {
  ar: [['سيدان','سيدان'],['جيب','جيب'],['فاخر','فاخر'],['كلاسيك','كلاسيك'],['باكب','باكب'],['رياضي','رياضي'],['أخرى','أخرى']],
  en: [['Sedan','Sedan'],['SUV / Jeep','SUV / Jeep'],['Luxury','Luxury'],['Classic','Classic'],['Pickup','Pickup'],['Sport','Sport'],['Other','Other']]
};

const shootLocations = {
  ar: {
    SA: [['Hafar Al Batin', 'حفر الباطن'], ['Jubail', 'الجبيل'], ['Khobar', 'الخبر'], ['Dammam', 'الدمام'], ['Qatif', 'القطيف'], ['Saihat', 'سيهات']],
    BH: [['Bahrain', 'البحرين']],
    KW: [['Kuwait', 'الكويت']]
  },
  en: {
    SA: [['Hafar Al Batin', 'Hafar Al Batin'], ['Jubail', 'Jubail'], ['Khobar', 'Khobar'], ['Dammam', 'Dammam'], ['Qatif', 'Qatif'], ['Saihat', 'Saihat']],
    BH: [['Bahrain', 'Bahrain']],
    KW: [['Kuwait', 'Kuwait']]
  }
};

const phoneCountries = [
  { code: '966', ar: 'السعودية', en: 'Saudi Arabia', length: 9 },
  { code: '973', ar: 'البحرين', en: 'Bahrain', length: 8 },
  { code: '965', ar: 'الكويت', en: 'Kuwait', length: 8 },
  { code: '974', ar: 'قطر', en: 'Qatar', length: 8 },
  { code: '971', ar: 'الإمارات', en: 'United Arab Emirates', length: 9 },
  { code: '968', ar: 'عُمان', en: 'Oman', length: 8 }
];


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
  document.querySelectorAll('[data-i18n-aria-label]').forEach((el) => {
    const key = el.dataset.i18nAriaLabel;
    if (translations[lang][key] !== undefined) el.setAttribute('aria-label', translations[lang][key]);
  });
  updateSelects(lang);
  renderBookingDates();
  updateBookingExperience();
  const pageTitles = {
    home: ['Ayan Photography | تصوير سيارات احترافي', 'Ayan Photography | Professional Car Photography'],
    features: ['المميزات | Ayan Photography', 'Features | Ayan Photography'],
    booking: ['الحجز | Ayan Photography', 'Booking | Ayan Photography'],
    gallery: ['المعرض | Ayan Photography', 'Gallery | Ayan Photography'],
    support: ['الدعم والمساعدة | Ayan Photography', 'Support & Help | Ayan Photography'],
    terms: ['الشروط والقواعد | Ayan Photography', 'Terms & Rules | Ayan Photography'],
    info: ['Ayan Developer | مطوّر الموقع', 'Ayan Developer | Web developer']
  };
  const title = pageTitles[document.body.dataset.pageTitle];
  if (title) document.title = title[lang === 'ar' ? 0 : 1];
}

function updateSelects(lang = getLang()) {
  const countrySelect = document.querySelector('#phoneCountry');
  if (countrySelect) {
    const selectedCountry = countrySelect.value || '966';
    countrySelect.innerHTML = phoneCountries.map((country) => {
      const countryName = country[lang === 'ar' ? 'ar' : 'en'];
      return `<option value="${country.code}"${country.code === selectedCountry ? ' selected' : ''}>+${country.code} · ${escapeHtml(countryName)}</option>`;
    }).join('');
    countrySelect.setAttribute('aria-label', tr('phoneCountryLabel'));
  }

  const packageSelect = document.querySelector('#packageType');
  if (packageSelect) {
    const current = packageSelect.value;
    const preserved = packageValueForLang(current, lang);
    const availablePackageOptions = [...packageOptions[lang]];
    packageSelect.innerHTML = `<option value="">${escapeHtml(tr('packagePlaceholder'))}</option>` + availablePackageOptions.map(([value, label]) => `<option value="${escapeHtml(value)}">${escapeHtml(label)}</option>`).join('');
    if ([...packageSelect.options].some((o) => o.value === preserved)) packageSelect.value = preserved;
  }

  const carSelect = document.querySelector('#carType');
  if (carSelect) {
    const current = carSelect.value;
    const currentIndex = [...carOptions.ar, ...carOptions.en].findIndex(([value]) => value === current);
    carSelect.innerHTML = `<option value="">${escapeHtml(tr('carPlaceholder'))}</option>` + carOptions[lang].map(([value, label]) => `<option value="${escapeHtml(value)}">${escapeHtml(label)}</option>`).join('');
    if (currentIndex >= 0) carSelect.value = carOptions[lang][currentIndex % carOptions[lang].length][0];
  }

  renderShootRegions(lang);
}

function renderShootRegions(lang = getLang()) {
  const regionSelect = document.querySelector('#shootRegion');
  if (!regionSelect) return;
  const country = document.querySelector('input[name="shootCountry"]:checked')?.value || '';
  const current = regionSelect.value;
  const options = shootLocations[lang]?.[country] || [];
  const regionOptions = document.querySelector('#shootRegionOptions');
  const keepCurrent = options.some(([value]) => value === current);
  regionSelect.value = keepCurrent ? current : '';
  regionSelect.disabled = options.length === 0;
  const regionField = regionSelect.closest('.shoot-region-field');
  regionField?.classList.toggle('is-disabled', options.length === 0);
  if (regionOptions) {
    regionOptions.innerHTML = options.map(([value, label]) => {
      const selected = keepCurrent && value === current;
      return `<button class="shoot-region-choice${selected ? ' is-selected' : ''}" type="button" data-shoot-region="${escapeHtml(value)}" aria-pressed="${selected}">${escapeHtml(label)}</button>`;
    }).join('');
    regionOptions.classList.toggle('is-empty', options.length === 0);
  }
  const hint = document.querySelector('#shootRegionHint');
  if (hint) hint.textContent = options.length ? tr('regionChooseCity') : tr('regionChooseCountry');
  document.querySelectorAll('.shoot-country-choice').forEach((choice) => {
    const input = choice.querySelector('input[name="shootCountry"]');
    choice.classList.toggle('is-selected', input?.checked === true);
  });
}

function dateOnlyFromLocal(date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Riyadh', year: 'numeric', month: '2-digit', day: '2-digit'
  }).formatToParts(date);
  const values = Object.fromEntries(parts.filter((part) => part.type !== 'literal').map((part) => [part.type, Number(part.value)]));
  return new Date(Date.UTC(values.year, values.month - 1, values.day));
}

function bookingDateIso(date) {
  return date.toISOString().slice(0, 10);
}

function formatBookingDate(iso, options = { dateStyle: 'full' }) {
  const date = new Date(`${iso}T12:00:00Z`);
  return new Intl.DateTimeFormat(getLang() === 'ar' ? 'ar-SA-u-ca-gregory' : 'en-US', {
    ...options,
    calendar: 'gregory',
    timeZone: 'UTC'
  }).format(date);
}

function renderBookingDates() {
  const optionsWrap = document.querySelector('#bookingDateOptions');
  const selectedDateInput = document.querySelector('#preferredAt');
  const weekDisplay = document.querySelector('#bookingWeekDisplay');
  if (!optionsWrap || !selectedDateInput) return;

  const today = dateOnlyFromLocal();
  const daysBackToSunday = today.getUTCDay();
  const existingDate = selectedDateInput.value;
  const sunday = new Date(today);
  sunday.setUTCDate(today.getUTCDate() - daysBackToSunday);
  const saturday = new Date(sunday);
  saturday.setUTCDate(sunday.getUTCDate() + 6);
  const days = Array.from({ length: 7 - daysBackToSunday }, (_, index) => {
    const date = new Date(today);
    date.setUTCDate(today.getUTCDate() + index);
    return { date, iso: bookingDateIso(date) };
  });
  const range = `${formatBookingDate(bookingDateIso(sunday), { day: 'numeric', month: 'long' })} – ${formatBookingDate(bookingDateIso(saturday), { day: 'numeric', month: 'long' })}`;
  if (weekDisplay) weekDisplay.textContent = getLang() === 'ar' ? `الأسبوع الحالي · ${range}` : `Current week · ${range}`;
  const dayToKeep = days.some((day) => day.iso === existingDate) ? existingDate : '';
  optionsWrap.innerHTML = days.map((day) => {
    const selected = day.iso === dayToKeep;
    const dayLabel = formatBookingDate(day.iso, { weekday: 'long' });
    const dateLabel = formatBookingDate(day.iso, { day: 'numeric', month: 'short' });
    const status = tr('dateRequestStatus');
    return `<button class="booking-date-option${selected ? ' is-selected' : ''}" type="button" data-booking-date="${day.iso}" aria-pressed="${selected}"><span class="booking-date-state">${escapeHtml(status)}</span><strong>${escapeHtml(dayLabel)}</strong><span class="booking-date-number">${escapeHtml(dateLabel)}</span></button>`;
  }).join('');
  selectedDateInput.value = dayToKeep;
}

function scheduleBookingDateRefresh() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Riyadh', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23'
  }).formatToParts(new Date());
  const clock = Object.fromEntries(parts.filter((part) => part.type !== 'literal').map((part) => [part.type, Number(part.value)]));
  const secondsToday = clock.hour * 3600 + clock.minute * 60 + clock.second;
  window.setTimeout(() => {
    renderBookingDates();
    updateBookingFlowSummary();
    scheduleBookingDateRefresh();
  }, Math.max(1000, (86400 - secondsToday) * 1000 + 250));
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
    '◈ الرول - 50 ريال': ['◈ الرول - 50 ريال', '◈ ROLL - 50 SAR'],
    '◇ الحركة - 80 ريال': ['◇ الحركة - 80 ريال', '◇ MOTION - 80 SAR'],
    '✦ البصمة - 130 ريال': ['✦ البصمة - 130 ريال', '✦ SIGNATURE - 130 SAR'],
    '✧ السينمائي - 180 ريال': ['✧ السينمائي - 180 ريال', '✧ CINEMATIC - 180 SAR'],
    'الباقة الفضية - 70 ريال': ['◈ الرول - 50 ريال', '◈ ROLL - 50 SAR'],
    '🥈 الباقة الفضية - 70 ريال': ['◈ الرول - 50 ريال', '◈ ROLL - 50 SAR'],
    'الباقة الأساسية - 100 ريال': ['◇ الحركة - 80 ريال', '◇ MOTION - 80 SAR'],
    '🥉 الباقة الأساسية - 100 ريال': ['◇ الحركة - 80 ريال', '◇ MOTION - 80 SAR'],
    'الباقة المتقدمة - 150 ريال': ['✦ البصمة - 130 ريال', '✦ SIGNATURE - 130 SAR'],
    '🏆 الباقة المتقدمة - 150 ريال': ['✦ البصمة - 130 ريال', '✦ SIGNATURE - 130 SAR'],
    'الباقة السينمائية - 200 ريال': ['✧ السينمائي - 180 ريال', '✧ CINEMATIC - 180 SAR'],
    '💎 الباقة السينمائية - 200 ريال': ['✧ السينمائي - 180 ريال', '✧ CINEMATIC - 180 SAR']
  };
  const pair = map[value] || Object.values(map).find(([ar, en]) => ar === value || en === value);
  return pair ? pair[lang === 'en' ? 1 : 0] : value;
}

async function sendLog(event, details = {}) {
  const payload = {
    event,
    page: location.pathname,
    lang: getLang(),
    theme: getTheme(),
    details
  };
  try {
    const response = await fetch('/api/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true
    });
    return response.ok;
  } catch (_) { return false; }
}

function sendVisitorLogOnce() {
  const key = 'ayan-visitor-log-sent-v1';
  try {
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, '1');
  } catch (_) {
    if (window.__ayanVisitorLogSent) return;
    window.__ayanVisitorLogSent = true;
  }
  void sendLog('page_view', { screen: `${window.innerWidth}x${window.innerHeight}` }).then((sent) => {
    if (sent) return;
    try { sessionStorage.removeItem(key); } catch (_) {}
  });
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
  const page = location.pathname.split('/').pop() || '/';
  const current = page === '/' || page === '' ? 'home' : page.replace('.html', '');
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
      } else {
        entry.target.classList.remove('is-visible');
      }
    });
  }, { threshold: .12, rootMargin: '0px 0px -7% 0px' });
  items.forEach((el) => observer.observe(el));
}

function setupCardGlow() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  document.querySelectorAll('.card').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${event.clientX - rect.left}px`);
      card.style.setProperty('--my', `${event.clientY - rect.top}px`);
    });
  });
}

function setupPointerGlow() {
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
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
  if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const blobs = document.querySelectorAll('.ambient span');
  if (!blobs.length) return;
  let frame = 0;
  const update = () => {
    frame = 0;
    const y = window.scrollY;
    blobs.forEach((blob, index) => {
      blob.style.transform = `translate3d(${index ? y * .018 : -y * .012}px, ${y * (index ? -.02 : .014)}px, 0)`;
    });
  };
  window.addEventListener('scroll', () => {
    if (!frame) frame = window.requestAnimationFrame(update);
  }, { passive: true });
}


function deferBackgroundVideo(selector, { ignoreDataSaver = false, ignoreReducedMotion = false } = {}) {
  const video = document.querySelector(selector);
  if (!video) return;

  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  if ((!ignoreReducedMotion && reducedMotion) || (!ignoreDataSaver && (connection?.saveData || ['slow-2g', '2g'].includes(connection?.effectiveType)))) return;

  video.muted = true;
  video.defaultMuted = true;
  video.volume = 0;
  video.loop = true;
  video.playsInline = true;
  video.controls = false;
  video.preload = ignoreDataSaver ? 'auto' : 'none';
  const reveal = () => video.classList.add('is-playing');
  video.addEventListener('playing', reveal);
  video.addEventListener('loadeddata', () => { if (!video.paused) reveal(); }, { once: true });
  video.addEventListener('pause', () => video.classList.remove('is-playing'));

  let started = false;
  const start = () => {
    if (started || document.hidden) return;
    started = true;
    video.autoplay = true;
    const playback = video.play();
    if (playback && typeof playback.then === 'function') {
      playback.then(reveal).catch(() => { started = false; video.classList.remove('is-playing'); });
    } else if (!video.paused) reveal();
  };

  const observer = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
      const entry = entries[entries.length - 1];
      if (entry?.isIntersecting && !document.hidden) start();
      else { video.pause(); started = false; }
    }, { threshold: 0.2, rootMargin: '0px' })
    : null;
  if (observer) observer.observe(video);
  else start();
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) { video.pause(); started = false; }
    else if (!started && video.getBoundingClientRect().bottom > 0 && video.getBoundingClientRect().top < window.innerHeight) start();
  });
}

function setupHeroBackgroundVideo() {
  deferBackgroundVideo('[data-hero-video]', { ignoreDataSaver: true, ignoreReducedMotion: true });
}

function setupHomeShowcaseVideos() {
  const videos = [...document.querySelectorAll('[data-showcase-video]')];
  if (!videos.length) return;
  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const constrainedConnection = connection?.saveData || ['slow-2g', '2g'].includes(connection?.effectiveType);
  if (reducedMotion || constrainedConnection || !('IntersectionObserver' in window)) return;

  videos.forEach((video) => {
    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;
    video.playsInline = true;
    video.controls = false;
    video.preload = 'none';
    video.addEventListener('playing', () => video.classList.add('is-playing'));
    video.addEventListener('pause', () => video.classList.remove('is-playing'));
  });

  const visibility = new Map(videos.map((video) => [video, 0]));
  let activeVideo = null;
  const syncActiveVideo = () => {
    const nextVideo = [...visibility.entries()]
      .filter(([, ratio]) => ratio >= 0.3)
      .sort((a, b) => b[1] - a[1])[0]?.[0] || null;
    if (activeVideo && activeVideo !== nextVideo) activeVideo.pause();
    activeVideo = nextVideo;
    if (activeVideo && !document.hidden && activeVideo.paused) activeVideo.play()?.catch(() => {});
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      visibility.set(entry.target, entry.isIntersecting ? entry.intersectionRatio : 0);
    });
    syncActiveVideo();
  }, { threshold: [0, 0.3, 0.55, 0.8], rootMargin: '0px' });
  videos.forEach((video) => observer.observe(video));

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) videos.forEach((video) => video.pause());
    else syncActiveVideo();
  });
}

function setupBookingBackgroundVideo() {
  deferBackgroundVideo('[data-packingbackground]');
}


let AYAN_PAYMENT_CONFIG = {
  currency: 'SAR',
  pricing: {
    vatEnabled: false,
    vatRate: 0,
    paymentFeeEnabled: true,
    vatOnPaymentFee: false,
    paymentFees: {
      cardLocal: { percent: 2.5, fixed: 1 }, cardInternational: { percent: 3, fixed: 1 }, mada: { percent: 1.2, fixed: 1 }, amex: { percent: 2.9, fixed: 1 }, stcPay: { percent: 1.8, fixed: 1 }, applePay: { percent: 1.2, fixed: 1 },
      tabby: { percent: 6.99, fixed: 7.5 }
    }
  },
  packages: { silver: { price: 50, originalPrice: 70, discount: 20 }, basic: { price: 80, originalPrice: 100, discount: 20 }, advanced: { price: 130, originalPrice: 150, discount: 20 }, royal: { price: 180, originalPrice: 200, discount: 20 } }
};

function getPackageFinancials(key, paymentMethod = 'none') {
  const pkg = AYAN_PAYMENT_CONFIG.packages?.[key];
  const subtotal = Number(pkg?.price ?? ({ silver: 50, basic: 80, advanced: 130, royal: 180 }[key] || 0));
  const p = AYAN_PAYMENT_CONFIG.pricing || {};
  const vatEnabled = false;
  const taxRate = 0;
  const tax = 0;
  const beforeFee = subtotal;
  const feeCfg = p.paymentFees?.[paymentMethod] || { percent: 0, fixed: 0 };
  const paymentFee = p.paymentFeeEnabled && ['card', 'cardLocal', 'cardInternational', 'mada', 'amex', 'stcPay', 'applePay', 'tabby', 'tamara'].includes(paymentMethod)
    ? Math.round((beforeFee * Number(feeCfg.percent || 0) / 100 + Number(feeCfg.fixed || 0)) * 100) / 100
    : 0;
  const paymentFeeTax = 0;
  const total = Math.round((beforeFee + paymentFee + paymentFeeTax) * 100) / 100;
  return { subtotal, tax, paymentFee, paymentFeeTax, total, taxRate, vatEnabled, vatOnPaymentFee: p.vatOnPaymentFee === true };
}

async function loadPaymentConfig() {
  try {
    const response = await fetch('/api/tuwaiqpay-payment?config=1', { cache: 'no-store' });
    if (!response.ok) throw new Error('config');
    const config = await response.json();
    if (config?.pricing && config?.packages) {
      AYAN_PAYMENT_CONFIG = config;
      if (document.querySelector('#bookingForm')) {
        updateSelects();
        updateBookingExperience();
        updateBookingFlowSummary();
      }
    }
  } catch (_) {
  }
}

function moneySar(value) {
  return Number(value || 0).toFixed(2);
}

function updateBookingExperience() {
  const select = document.querySelector('#packageType');
  const choices = [...document.querySelectorAll('[data-booking-package]')];
  if (!choices.length) return;
  const current = select?.value || '';
  const selectedKey = select?.dataset.selectedPackageKey || '';
  let selected = selectedKey ? choices.find((choice) => choice.dataset.packageKey === selectedKey) : null;
  if (!selected) selected = choices.find((choice) => current && packageValueForLang(choice.dataset.bookingPackage, getLang()) === current) || null;
  choices.forEach((choice) => {
    const active = choice === selected;
    choice.classList.toggle('selected', active);
    choice.setAttribute('aria-pressed', String(active));
  });

  const summaryCard = document.querySelector('[data-booking-summary]');
  const summaryName = document.querySelector('[data-booking-summary-name]');
  const summaryDesc = document.querySelector('[data-booking-summary-desc]');
  const summaryPrice = document.querySelector('[data-booking-summary-price]');
  const summarySubtotal = document.querySelector('[data-booking-summary-subtotal]');
  const summaryServiceFee = document.querySelector('[data-booking-summary-service]');
  const summaryTotal = document.querySelector('[data-booking-summary-total]');
  const basePriceNode = summaryCard?.querySelector('[data-booking-summary-base]');
  if (!summaryName || !summaryDesc || !summaryPrice) return;

  if (!selected) {
    summaryName.textContent = tr('selectedEmpty');
    summaryDesc.textContent = '—';
    summaryPrice.textContent = '—';
    if (summarySubtotal) summarySubtotal.textContent = '—';
    if (summaryServiceFee) summaryServiceFee.textContent = '—';
    if (summaryTotal) summaryTotal.textContent = '—';
    if (basePriceNode) basePriceNode.textContent = '—';
    summaryCard?.classList.remove('is-active');
    return;
  }

  const key = selected.dataset.packageKey;
  const priceMap = { silver: 'silverPrice', basic: 'basicPrice', advanced: 'advancedPrice', royal: 'royalPrice' };
  const finance = getPackageFinancials(key, 'none');
  summaryName.textContent = tr(key);
  summaryDesc.textContent = tr(`${key}Desc`);
  summaryPrice.textContent = moneySar(finance.total);
  if (summarySubtotal) summarySubtotal.textContent = `${moneySar(finance.subtotal)} SAR`;
  if (summaryServiceFee) summaryServiceFee.textContent = '—';
  if (summaryTotal) summaryTotal.textContent = `${moneySar(finance.total)} SAR`;
  if (basePriceNode) basePriceNode.textContent = `${moneySar(Number(tr(priceMap[key])))} SAR`;
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
  const choices = [...document.querySelectorAll('[data-booking-package]')];
  if (!select || !choices.length) return;

  choices.forEach((choice) => {
    choice.addEventListener('click', () => {
      const value = packageValueForLang(choice.dataset.bookingPackage, getLang());
      if (![...select.options].some((option) => option.value === value)) {
        const label = choice.querySelector('.booking-package-copy strong')?.textContent.trim() || value;
        select.add(new Option(label, value));
      }
      select.value = value;
      select.dataset.selectedPackageKey = choice.dataset.packageKey || '';
      updateBookingExperience();
      clearBookingValidation();
      updateBookingFlowSummary();
      sendLog('package_select', { package: value, packageKey: choice.dataset.packageKey, source: 'booking_picker' });
      document.querySelector('.booking-package-wrap')?.classList.add('chosen');
    });
  });

  select.addEventListener('change', () => {
    const selectedChoice = choices.find((choice) => packageValueForLang(choice.dataset.bookingPackage, getLang()) === select.value);
    select.dataset.selectedPackageKey = selectedChoice?.dataset.packageKey || '';
    updateBookingExperience();
    updateBookingFlowSummary();
    sendLog('package_select', { package: select.value, source: 'booking_select' });
  });
  updateBookingExperience();
  updateBookingFlowSummary();
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
      if ([...select.options].some((option) => option.value === value)) {
        select.value = value;
        const selectedChoice = [...document.querySelectorAll('[data-booking-package]')].find((choice) => packageValueForLang(choice.dataset.bookingPackage, getLang()) === value);
        select.dataset.selectedPackageKey = selectedChoice?.dataset.packageKey || '';
      }
      sessionStorage.removeItem('ayan_selected_package');
      updateBookingExperience();
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

function normalizedBookingPhone() {
  const countryCode = document.querySelector('#phoneCountry')?.value || '';
  let nationalNumber = String(document.querySelector('#phone')?.value || '').replace(/\D/g, '');
  if (nationalNumber.startsWith('00')) nationalNumber = nationalNumber.slice(2);
  if (nationalNumber.startsWith(countryCode)) nationalNumber = nationalNumber.slice(countryCode.length);
  if (nationalNumber.startsWith('0')) nationalNumber = nationalNumber.slice(1);
  return `${countryCode}${nationalNumber}`;
}

function isValidBookingPhone() {
  const countryCode = document.querySelector('#phoneCountry')?.value || '';
  const country = phoneCountries.find((item) => item.code === countryCode);
  const phone = normalizedBookingPhone();
  if (!country || !phone.startsWith(countryCode)) return false;
  const nationalNumber = phone.slice(countryCode.length);
  return /^\d+$/.test(nationalNumber) && nationalNumber.length === country.length;
}

function clearBookingValidation() {
  document.querySelectorAll('.booking-validation-error').forEach((el) => el.remove());
  document.querySelectorAll('.booking-field-invalid').forEach((el) => el.classList.remove('booking-field-invalid'));
  document.querySelectorAll('.booking-signature-step').forEach((el) => el.classList.remove('is-missing'));
}

function markBookingFieldInvalid(target, message, stepName) {
  clearBookingValidation();
  const wizardStep = stepName === 'package' ? 1 : stepName === 'details' ? 2 : stepName === 'schedule' ? 3 : stepName === 'payment' ? 4 : 0;
  if (wizardStep && document.querySelector('[data-booking-panel]')) setBookingWizardStep(wizardStep, false);
  const node = typeof target === 'string' ? document.querySelector(target) : target;
  if (!node) return;
  const group = node.closest('.form-group') || node.closest('.booking-package-wrap') || node.parentElement;
  const wrapper = node.closest('.booking-package-wrap');
  (wrapper || group || node).classList.add('booking-field-invalid');
  const error = document.createElement('div');
  error.className = 'booking-validation-error';
  error.textContent = message;
  (wrapper || group || node.parentElement || node).appendChild(error);
  if (stepName) document.querySelector(`[data-flow-step="${stepName}"]`)?.classList.add('is-missing');
  const scrollTarget = wrapper || group || node;
  window.setTimeout(() => {
    scrollTarget.scrollIntoView({ behavior: 'smooth', block: 'center' });
    if (node !== wrapper && typeof node.focus === 'function') {
      window.setTimeout(() => node.focus({ preventScroll: true }), 280);
    }
  }, 20);
  showToast(message);
}

function updateBookingFlowSummary() {
  const packageKey = document.querySelector('.booking-package-choice.selected')?.dataset.packageKey || '';
  const name = document.querySelector('#fullName')?.value.trim() || '';
  const phone = normalizedBookingPhone();
  const car = document.querySelector('#carType')?.value || '';
  const carDetails = document.querySelector('#carDetails')?.value.trim() || '';
  const regionSelect = document.querySelector('#shootRegion');
  const regionName = document.querySelector('#shootRegionOptions [data-shoot-region].is-selected')?.textContent.trim() || '';
  const countryInput = document.querySelector('input[name="shootCountry"]:checked');
  const countryName = countryInput?.closest('label')?.querySelector('[data-i18n]')?.textContent.trim() || '';
  const region = [regionName, countryName].filter(Boolean).join(' · ');
  const notes = document.querySelector('#notes')?.value.trim() || '';
  const preferredAt = document.querySelector('#preferredAt')?.value || '';
  const preferredText = preferredAt
    ? tr('preferredAtNote').replace('{date}', formatBookingDate(preferredAt))
    : '';
  const flowNotes = [notes, preferredText].filter(Boolean).join(' · ');
  const terms = document.querySelector('#termsAgreement')?.checked === true;
  const packageValue = document.querySelector('#packageType')?.value || '';
  const packageNode = document.querySelector('[data-flow-value="package"]');
  const detailsNode = document.querySelector('[data-flow-value="details"]');
  const paymentNode = document.querySelector('[data-flow-value="payment"]');
  const scheduleNode = document.querySelector('[data-flow-value="schedule"]');
  const detailsName = document.querySelector('[data-flow-name]');
  const detailsPhone = document.querySelector('[data-flow-phone]');
  const detailsCar = document.querySelector('[data-flow-car]');
  const detailsRegion = document.querySelector('[data-flow-region]');
  const detailsNotes = document.querySelector('[data-flow-notes]');

  document.querySelectorAll('.booking-signature-step').forEach((el) => el.classList.remove('is-active', 'is-done'));

  if (packageNode) packageNode.textContent = packageValue ? `${tr('flowSelected')}: ${packageValue}` : tr('flowStep1');
  if (detailsNode) {
    detailsNode.setAttribute('aria-label', [name, phone, car, region, flowNotes].filter(Boolean).join('، ') || tr('flowStep2'));
  }
  if (detailsName) {
    detailsName.textContent = name || tr('flowStep2');
    detailsName.classList.toggle('is-placeholder', !name);
  }
  [[detailsPhone, phone ? `+${phone}` : ''], [detailsCar, [car, carDetails].filter(Boolean).join(' · ')], [detailsRegion, region], [detailsNotes, flowNotes]].forEach(([node, value]) => {
    if (!node) return;
    node.textContent = value;
    node.classList.toggle('is-empty', !value);
  });
  const detailsComplete = !!name && isValidBookingPhone() && !!car && !!regionSelect?.value && !!countryInput;
  if (scheduleNode) scheduleNode.textContent = preferredAt ? tr('preferredAtNote').replace('{date}', formatBookingDate(preferredAt)) : tr('flowStep3');
  if (paymentNode) paymentNode.textContent = terms && detailsComplete && preferredAt ? tr('flowReady') : tr('flowStep4');

  const packageStep = document.querySelector('[data-flow-step="package"]');
  const detailsStep = document.querySelector('[data-flow-step="details"]');
  const scheduleStep = document.querySelector('[data-flow-step="schedule"]');
  const paymentStep = document.querySelector('[data-flow-step="payment"]');
  if (packageStep && packageKey) { packageStep.classList.add('is-active', 'is-done'); }
  if (detailsStep && detailsComplete) { detailsStep.classList.add('is-active', 'is-done'); }
  if (scheduleStep && preferredAt) { scheduleStep.classList.add('is-active', 'is-done'); }
  if (paymentStep && terms && detailsComplete && packageKey && preferredAt) { paymentStep.classList.add('is-active'); }
}

let activeBookingStep = 1;

function setBookingWizardStep(step, shouldScroll = true) {
  const panels = [...document.querySelectorAll('[data-booking-panel]')];
  if (!panels.length) return;
  activeBookingStep = Math.min(4, Math.max(1, Number(step) || 1));
  panels.forEach((panel) => {
    const isActive = Number(panel.dataset.bookingPanel) === activeBookingStep;
    panel.hidden = !isActive;
    panel.classList.toggle('is-current', isActive);
  });
  document.querySelectorAll('[data-booking-progress-step]').forEach((item) => {
    const number = Number(item.dataset.bookingProgressStep);
    item.classList.toggle('active', number === activeBookingStep);
    item.classList.toggle('is-complete', number < activeBookingStep);
    if (number === activeBookingStep) item.setAttribute('aria-current', 'step');
    else item.removeAttribute('aria-current');
  });
  if (shouldScroll) {
    const card = document.querySelector('.booking-main-card');
    const heading = panels.find((panel) => Number(panel.dataset.bookingPanel) === activeBookingStep)?.querySelector('.booking-panel-heading h3');
    const root = document.documentElement;
    const previousScrollBehavior = root.style.scrollBehavior;
    root.style.scrollBehavior = 'auto';
    card?.scrollIntoView({ behavior: 'auto', block: 'start' });
    window.requestAnimationFrame(() => { root.style.scrollBehavior = previousScrollBehavior; });
    if (heading) {
      heading.setAttribute('tabindex', '-1');
      heading.focus({ preventScroll: true });
    }
  }
}

function syncBookingPackageSelection() {
  const select = document.querySelector('#packageType');
  const choices = [...document.querySelectorAll('[data-booking-package]')];
  if (!choices.length) return false;

  const selected = choices.find((choice) => choice.classList.contains('selected'))
    || choices.find((choice) => select?.value && packageValueForLang(choice.dataset.bookingPackage, getLang()) === select.value);
  if (!selected) return false;

  if (select) {
    const value = packageValueForLang(selected.dataset.bookingPackage, getLang());
    if (![...select.options].some((option) => option.value === value)) {
      const label = selected.querySelector('.booking-package-copy strong')?.textContent.trim() || value;
      select.add(new Option(label, value));
    }
    select.value = value;
    select.dataset.selectedPackageKey = selected.dataset.packageKey || '';
  }
  choices.forEach((choice) => {
    const active = choice === selected;
    choice.classList.toggle('selected', active);
    choice.setAttribute('aria-pressed', String(active));
  });
  return true;
}

function validateBookingWizardStep(step) {
  if (step === 1) {
    if (!syncBookingPackageSelection()) {
      markBookingFieldInvalid('.booking-package-wrap', tr('validationPackage'), 'package');
      return false;
    }
    return true;
  }
  if (step === 2) {
    const name = document.querySelector('#fullName')?.value.trim() || '';
    const phone = normalizedBookingPhone();
    const car = document.querySelector('#carType')?.value || '';
    const region = document.querySelector('#shootRegion')?.value || '';
    const country = document.querySelector('input[name="shootCountry"]:checked')?.value || '';
    if (!name) { markBookingFieldInvalid('#fullName', tr('validationName'), 'details'); return false; }
    if (!phone || !isValidBookingPhone()) { markBookingFieldInvalid('#phone', tr('validationPhone'), 'details'); return false; }
    if (!car) { markBookingFieldInvalid('#carType', tr('validationCar'), 'details'); return false; }
    if (!country) { markBookingFieldInvalid('#shootCountryChoices', tr('validationCountry'), 'details'); return false; }
    if (!region) { markBookingFieldInvalid('#shootRegionOptions', tr('validationRegion'), 'details'); return false; }
    return true;
  }
  if (step === 3) {
    if (!document.querySelector('#preferredAt')?.value) { markBookingFieldInvalid('#bookingDateOptions', tr('validationDate'), 'schedule'); return false; }
    return true;
  }
  if (step === 4) {
    if (!document.querySelector('#termsAgreement')?.checked) { markBookingFieldInvalid('#termsAgreement', tr('validationTerms'), 'payment'); return false; }
    return true;
  }
  return true;
}

function advanceBookingWizard() {
  if (!validateBookingWizardStep(activeBookingStep)) return false;
  if (activeBookingStep < 4) setBookingWizardStep(activeBookingStep + 1);
  return true;
}

function setupBookingWizard(form) {
  if (!form.querySelector('[data-booking-panel]')) return;
  setBookingWizardStep(1, false);
  form.querySelectorAll('[data-booking-next]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();

      const currentPanel = button.closest('[data-booking-panel]');
      if (!currentPanel || currentPanel.hidden) return;
      const visibleStep = Number(currentPanel.dataset.bookingPanel) || 1;
      const expectedStep = Number(button.dataset.bookingNext);
      activeBookingStep = visibleStep;
      if (expectedStep !== visibleStep) return;

      if (visibleStep === 1) {
        if (!syncBookingPackageSelection()) {
          markBookingFieldInvalid('.booking-package-wrap', tr('validationPackage'), 'package');
          return;
        }
        setBookingWizardStep(2);
        updateBookingFlowSummary();
        return;
      }

      if (!validateBookingWizardStep(visibleStep)) return;
      setBookingWizardStep(Math.min(4, visibleStep + 1));
      updateBookingFlowSummary();
    });
  });

  form.querySelectorAll('[data-booking-back]').forEach((button) => {
    button.addEventListener('click', () => {
      const step = Number(button.dataset.bookingBack);
      setBookingWizardStep(step);
      updateBookingFlowSummary();
    });
  });
}

function setupBookingForm() {
  const form = document.querySelector('#bookingForm');
  if (!form) return;
  setupBookingWizard(form);

  ['fullName','phone','phoneCountry','carType','carDetails','shootRegion','preferredAt','notes','termsAgreement','bookingCouponCode'].forEach((id) => {
    const node = document.getElementById(id);
    node?.addEventListener('input', () => { clearBookingValidation(); updateBookingFlowSummary(); });
    node?.addEventListener('change', () => { clearBookingValidation(); updateBookingFlowSummary(); });
  });
  document.querySelectorAll('input[name="shootCountry"]').forEach((input) => {
    input.addEventListener('change', () => {
      const regionSelect = document.querySelector('#shootRegion');
      if (regionSelect) regionSelect.value = '';
      renderShootRegions();
      clearBookingValidation();
      updateBookingFlowSummary();
    });
  });
  document.querySelector('#shootRegionOptions')?.addEventListener('click', (event) => {
    const choice = event.target.closest('[data-shoot-region]');
    if (!choice) return;
    const regionSelect = document.querySelector('#shootRegion');
    if (regionSelect) regionSelect.value = choice.dataset.shootRegion || '';
    document.querySelectorAll('#shootRegionOptions [data-shoot-region]').forEach((button) => {
      const selected = button === choice;
      button.classList.toggle('is-selected', selected);
      button.setAttribute('aria-pressed', String(selected));
    });
    clearBookingValidation();
    updateBookingFlowSummary();
  });
  const countrySelect = document.querySelector('#phoneCountry');
  const phoneInput = document.querySelector('#phone');
  const updatePhoneLength = () => {
    const country = phoneCountries.find((item) => item.code === countrySelect?.value);
    if (phoneInput && country) phoneInput.maxLength = country.length + 1;
  };
  countrySelect?.addEventListener('change', updatePhoneLength);
  phoneInput?.addEventListener('input', () => {
    phoneInput.value = phoneInput.value.replace(/\D/g, '').slice(0, phoneInput.maxLength || 10);
    updateBookingFlowSummary();
  });
  updatePhoneLength();
  renderBookingDates();
  scheduleBookingDateRefresh();
  document.querySelector('#bookingDateOptions')?.addEventListener('click', (event) => {
    const choice = event.target.closest('[data-booking-date]');
    if (!choice) return;
    const selected = document.querySelector('#preferredAt');
    if (selected) selected.value = choice.dataset.bookingDate || '';
    document.querySelectorAll('#bookingDateOptions [data-booking-date]').forEach((button) => {
      const active = button === choice;
      button.classList.toggle('is-selected', active);
      button.setAttribute('aria-pressed', String(active));
    });
    clearBookingValidation();
    updateBookingFlowSummary();
  });
  updateBookingFlowSummary();

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (activeBookingStep < 4) { advanceBookingWizard(); return; }
    if (!validateBookingWizardStep(4)) return;
    clearBookingValidation();

    const selectedChoice = document.querySelector('[data-booking-package].selected');
    const packageKey = selectedChoice?.dataset.packageKey || '';
    const customerNotes = document.querySelector('#notes')?.value.trim() || '';
    const preferredAt = document.querySelector('#preferredAt')?.value || '';
    const carDetails = document.querySelector('#carDetails')?.value.trim() || '';
    const couponCode = document.querySelector('#bookingCouponCode')?.value.trim().toLowerCase() || '';
    const notesParts = [customerNotes];
    if (carDetails) notesParts.push(`${getLang() === 'ar' ? 'السيارة وموديلها' : 'Car make and model'}: ${carDetails}`);
    if (preferredAt) {
      const formattedPreferredDate = formatBookingDate(preferredAt);
      notesParts.push(tr('preferredAtNote').replace('{date}', formattedPreferredDate));
    }
    const data = {
      name: document.querySelector('#fullName')?.value.trim(),
      packageKey,
      packageType: document.querySelector('#packageType')?.value,
      carType: document.querySelector('#carType')?.value,
      shootRegion: document.querySelector('#shootRegion')?.value,
      shootCountry: document.querySelector('input[name="shootCountry"]:checked')?.value || '',
      preferredAt,
      phone: `+${normalizedBookingPhone()}`,
      phoneCountry: document.querySelector('#phoneCountry')?.value || '',
      notes: notesParts.filter(Boolean).join('\n'),
      couponCode,
      lang: getLang(),
      sourcePage: location.pathname,
      theme: getTheme(),
      screen: `${window.innerWidth}x${window.innerHeight}`,
      website: document.querySelector('#website')?.value.trim() || '',
      termsAgreement: document.querySelector('#termsAgreement')?.checked === true
    };

    if (!packageKey) { markBookingFieldInvalid('.booking-package-wrap', tr('validationPackage'), 'package'); return; }
    if (!data.name) { markBookingFieldInvalid('#fullName', tr('validationName'), 'details'); return; }
    if (!data.phone) { markBookingFieldInvalid('#phone', tr('validationPhone'), 'details'); return; }

    if (!isValidBookingPhone()) {
      markBookingFieldInvalid('#phone', tr('validationPhone'), 'details');
      return;
    }
    if (!data.carType) { markBookingFieldInvalid('#carType', tr('validationCar'), 'details'); return; }
    if (!data.shootRegion) { markBookingFieldInvalid('#shootRegionOptions', tr('validationRegion'), 'details'); return; }
    if (!preferredAt) { markBookingFieldInvalid('#bookingDateOptions', tr('validationDate'), 'schedule'); return; }
    if (!data.termsAgreement) { markBookingFieldInvalid('#termsAgreement', tr('validationTerms'), 'payment'); return; }

    const lastSubmit = Number(sessionStorage.getItem('ayan_last_submit') || 0);
    if (Date.now() - lastSubmit < 15000) {
      showToast(tr('waitAlert'));
      return;
    }

    if (data.website) {
      showToast(getLang() === 'ar' ? 'تعذر إرسال الطلب.' : 'Unable to submit this request.');
      return;
    }

    const button = document.querySelector('#submitBtn');
    const originalLabel = button?.textContent || '';
    if (button) {
      button.disabled = true;
      button.textContent = getLang() === 'ar' ? 'جاري تجهيز الدفع…' : 'Preparing secure payment…';
    }

    sessionStorage.setItem('ayan_last_submit', String(Date.now()));
    sessionStorage.setItem('ayan_checkout_data', JSON.stringify(data));
    void sendLog('booking_checkout_open', { success: true, package: data.packageType, packageKey, car: data.carType, area: data.shootRegion });
    window.location.assign('/checkout');
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
    { src: 'https://l.top4top.io/m_3969on2w91.mp4', poster: 'gallery/dodge.jpeg', titleAr: 'Dodge Charger RT', titleEn: 'Dodge Charger RT' },
    { src: 'gallery/Camry.mp4', poster: 'gallery/camry-video-poster.jpg', titleAr: 'Toyota Camry', titleEn: 'Toyota Camry' },
    { src: 'https://h.top4top.io/m_3969qr5yz1.mp4', poster: 'gallery/camry-link-poster.webp', titleAr: 'Toyota Camry', titleEn: 'Toyota Camry' },
    { src: 'https://f.top4top.io/m_3970ekc111.mp4', poster: 'gallery/patrol-video-poster.webp', titleAr: 'Nissan Patrol', titleEn: 'Nissan Patrol' },
    { src: 'https://l.top4top.io/m_3969rze1z1.mp4', titleAr: 'Ford Mustang', titleEn: 'Ford Mustang' },
    { src: 'https://e.top4top.io/m_3969v09a91.mp4', poster: 'gallery/ford-territory.jpeg', titleAr: 'Ford Territory', titleEn: 'Ford Territory' },
    { src: 'https://b.top4top.io/m_3969wdsbm1.mp4', poster: 'gallery/yaris.webp', titleAr: 'Toyota Yaris', titleEn: 'Toyota Yaris' },
    { src: 'https://d.top4top.io/m_39690zvhv1.mp4', poster: 'gallery/jaguar-f-type-coupe.jpg', titleAr: 'Jaguar F-Type', titleEn: 'Jaguar F-Type' },
    { src: 'https://d.top4top.io/m_39690lgvx1.mp4', titleAr: 'Mitsubishi Pajero', titleEn: 'Mitsubishi Pajero' },
    { src: 'https://j.top4top.io/m_3969d05x81.mp4', titleAr: 'Lexus ES350', titleEn: 'Lexus ES350' }
  ],
  images: [
    { src: 'gallery/dodge.jpeg', titleAr: 'Dodge Charger RT', titleEn: 'Dodge Charger RT' },
    { src: 'gallery/camry.jpeg', titleAr: 'Toyota Camry', titleEn: 'Toyota Camry' },
    { src: 'gallery/jaguar-f-type-coupe.jpg', titleAr: 'Jaguar F-Type', titleEn: 'Jaguar F-Type' },
    { src: 'gallery/ford-territory.jpeg', titleAr: 'Ford Territory', titleEn: 'Ford Territory' },
    { src: 'gallery/yaris.webp', titleAr: 'Toyota Yaris', titleEn: 'Toyota Yaris' },
    { src: 'gallery/bmw.jpg', titleAr: 'BMW 7 Series', titleEn: 'BMW 7 Series' }
  ]
};

async function loadGallery() {
  const grid = document.querySelector('[data-gallery-grid]');
  if (!grid) return;

  grid.setAttribute('aria-busy', 'true');
  grid.innerHTML = `<div class="gallery-loading-status" role="status">${escapeHtml(tr('galleryLoading'))}</div>${Array.from({ length: 4 }, () => '<div class="gallery-skeleton" aria-hidden="true"></div>').join('')}`;

  const candidates = [
    new URL('./data/gallery.json?v=4', document.baseURI).href,
    '/data/gallery.json?v=4'
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
    grid.setAttribute('aria-busy', 'false');
    grid.innerHTML = `<div class="card" style="grid-column:1/-1;padding:30px;text-align:center;color:var(--muted);">${escapeHtml(getLang() === 'ar' ? 'لا يوجد محتوى في المعرض حاليًا.' : 'No gallery content is available yet.')}</div>`;
    return;
  }

  grid.setAttribute('aria-busy', 'false');
  grid.innerHTML = items.map((item) => renderGalleryCard(item)).join('');
  setupGalleryFilters();
  setupGalleryLightbox();
  const requestedFilter = new URLSearchParams(window.location.search).get('filter');
  const initialFilter = ['image', 'all'].includes(requestedFilter) ? requestedFilter : 'video';
  document.querySelectorAll('[data-gallery-filter]').forEach((button) => button.classList.toggle('active', button.dataset.galleryFilter === initialFilter));
  applyGalleryFilter(initialFilter);
  keepGalleryVideosPlaying();
}

function renderGalleryCard(item) {
  const title = getLang() === 'en' ? (item.titleEn || item.title || '') : (item.titleAr || item.title || '');
  const escapedTitle = escapeHtml(title);
  const typeLabel = item.type === 'video' ? tr('galleryVideos') : tr('galleryImages');
  const escapedSrc = escapeHtml(item.src || '');
  const escapedPoster = escapeHtml(item.poster || '');
  const media = item.type === 'video'
    ? `<video muted loop playsinline preload="metadata" disablepictureinpicture controlslist="nodownload noplaybackrate nofullscreen noremoteplayback" aria-label="${escapedTitle}" ${escapedPoster ? `poster="${escapedPoster}"` : ''}><source src="${escapedSrc}" type="video/mp4"></video><span class="gallery-play-hint" aria-hidden="true">▶</span>`
    : `<img src="${escapedSrc}" alt="${escapedTitle}" loading="lazy" decoding="async" onerror="this.dataset.missing='true'">`;
  return `<article class="card media-card gallery-card ${item.type}-card reveal" data-gallery-type="${item.type}" data-gallery-src="${escapedSrc}" data-gallery-title="${escapedTitle}" data-gallery-poster="${escapedPoster}"><div class="media-wrap">${media}<span class="media-badge">${escapeHtml(typeLabel)}</span><span class="media-shade"></span></div><div class="caption">${escapedTitle}</div></article>`;
}

function keepGalleryVideosPlaying() {
  const cards = Array.from(document.querySelectorAll('.gallery-card.video-card'));
  if (!cards.length) return;
  const videos = cards.map((card) => card.querySelector('video')).filter(Boolean);

  videos.forEach((video) => {
    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;
    video.playsInline = true;
    video.controls = false;
    video.disablePictureInPicture = true;
    const card = video.closest('.gallery-card');
    video.addEventListener('playing', () => card?.classList.add('is-playing'), { passive: true });
    video.addEventListener('pause', () => card?.classList.remove('is-playing'), { passive: true });
    video.addEventListener('waiting', () => card?.classList.add('video-buffering'), { passive: true });
    video.addEventListener('playing', () => card?.classList.remove('video-buffering', 'video-paused', 'video-unavailable'), { passive: true });
    video.addEventListener('error', () => card?.classList.add('video-unavailable'), { passive: true });
    video.addEventListener('pause', () => {
      if (!document.hidden) card?.classList.add('video-paused');
    }, { passive: true });
  });

  if (!('IntersectionObserver' in window)) return;

  const visibility = new Map(videos.map((video) => [video, 0]));
  let activeVideo = null;
  const syncActiveVideo = () => {
    const nextVideo = [...visibility.entries()]
      .filter(([, ratio]) => ratio >= 0.3)
      .sort((a, b) => b[1] - a[1])[0]?.[0] || null;
    if (activeVideo && activeVideo !== nextVideo) activeVideo.pause();
    activeVideo = nextVideo;
    if (activeVideo && !document.hidden && activeVideo.paused) activeVideo.play()?.catch(() => {});
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => visibility.set(entry.target, entry.isIntersecting ? entry.intersectionRatio : 0));
    syncActiveVideo();
  }, { rootMargin: '0px', threshold: [0, 0.3, 0.55, 0.8] });
  videos.forEach((video) => observer.observe(video));

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) videos.forEach((video) => video.pause());
    else syncActiveVideo();
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
      const type = card.dataset.galleryType;
      const src = card.dataset.gallerySrc;
      const title = card.dataset.galleryTitle || '';
      const poster = card.dataset.galleryPoster || '';
      if (!src) return;
      media.innerHTML = type === 'video'
        ? `<div class="lightbox-video-shell"><video autoplay controls loop playsinline preload="auto" disablepictureinpicture controlslist="nodownload noplaybackrate nofullscreen noremoteplayback" ${poster ? `poster="${escapeHtml(poster)}"` : ''}><source src="${escapeHtml(src)}" type="video/mp4"></video><button class="lightbox-video-start" type="button" aria-label="${getLang() === 'ar' ? 'تشغيل الفيديو مع الصوت' : 'Play video with sound'}">▶</button></div><a class="lightbox-video-fallback" href="${escapeHtml(src)}" target="_blank" rel="noopener" hidden>${getLang() === 'ar' ? 'فتح الفيديو مباشرة' : 'Open video directly'}</a>`
        : `<img src="${escapeHtml(src)}" alt="${escapeHtml(title)}">`;
      if (type === 'video') {
        const lightboxVideo = media.querySelector('video');
        const playButton = media.querySelector('.lightbox-video-start');
        const directLink = media.querySelector('.lightbox-video-fallback');
        playButton?.addEventListener('click', () => lightboxVideo?.play()?.catch(() => {}));
        lightboxVideo?.addEventListener('playing', () => playButton?.classList.add('is-hidden'), { once: true });
        lightboxVideo?.addEventListener('pause', () => playButton?.classList.remove('is-hidden'));
        lightboxVideo?.addEventListener('error', () => { if (directLink) directLink.hidden = false; }, { once: true });
        lightboxVideo?.play()?.catch(() => playButton?.classList.remove('is-hidden'));
      }
      if (caption) caption.textContent = title;
      box.classList.add('open');
      box.setAttribute('aria-hidden', 'false');
      sendLog('gallery_open', { type, title });
    });
  });
}



function setupSupportForm() {
  const form = document.querySelector('#supportForm');
  if (!form) return;

  const typeInput = document.querySelector('#supportType');
  const typeButtons = Array.from(document.querySelectorAll('[data-support-type]'));
  const nameInput = document.querySelector('#supportName');
  const phoneInput = document.querySelector('#supportPhone');
  const emailInput = document.querySelector('#supportEmail');
  const subjectInput = document.querySelector('#supportSubject');
  const messageInput = document.querySelector('#supportMessage');
  const websiteInput = document.querySelector('#supportWebsite');
  const button = document.querySelector('#supportSubmitBtn');
  const success = document.querySelector('#supportSuccess');

  const clearState = () => {
    form.querySelectorAll('.field-error, .booking-field-invalid').forEach((el) => el.classList.remove('field-error', 'booking-field-invalid'));
  };

  typeButtons.forEach((item) => {
    item.addEventListener('click', () => {
      typeButtons.forEach((node) => {
        const active = node === item;
        node.classList.toggle('selected', active);
        node.setAttribute('aria-pressed', String(active));
      });
      if (typeInput) typeInput.value = item.dataset.supportType || '';
      clearState();
    });
  });

  phoneInput?.addEventListener('keydown', (event) => {
    const allowed = event.ctrlKey || event.metaKey || ['Backspace','Delete','Tab','ArrowLeft','ArrowRight'].includes(event.key) || /^[0-9]$/.test(event.key);
    if (!allowed) event.preventDefault();
  });
  phoneInput?.addEventListener('input', () => {
    phoneInput.value = phoneInput.value.replace(/[^0-9]/g, '').slice(0, 10);
  });

  form.querySelectorAll('input,textarea').forEach((node) => {
    node.addEventListener('input', clearState);
    node.addEventListener('change', clearState);
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearState();
    success?.classList.remove('show');

    const type = String(typeInput?.value || '').trim();
    const name = String(nameInput?.value || '').trim();
    const phoneRaw = String(phoneInput?.value || '').trim();
    const email = String(emailInput?.value || '').trim().toLowerCase();
    const subject = String(subjectInput?.value || '').trim();
    const message = String(messageInput?.value || '').trim();
    const website = String(websiteInput?.value || '').trim();

    if (!type) { showToast(tr('supportValidationType')); typeButtons[0]?.focus(); return; }
    if (!name) { showToast(tr('supportValidationName')); nameInput?.focus(); return; }

    const normalizedPhone = normalizePhone(phoneRaw);
    if (!/^9665\d{8}$/.test(normalizedPhone)) { showToast(tr('supportValidationPhone')); phoneInput?.focus(); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showToast(tr('supportValidationEmail')); emailInput?.focus(); return; }
    if (!subject) { showToast(tr('supportValidationSubject')); subjectInput?.focus(); return; }
    if (message.length < 10) { showToast(tr('supportValidationMessage')); messageInput?.focus(); return; }
    if (message.length > 3000) { showToast(tr('supportValidationMessage')); messageInput?.focus(); return; }
    if (website) { showToast(tr('supportGenericError')); return; }

    const lastSubmit = Number(sessionStorage.getItem('ayan_support_last_submit') || 0);
    if (Date.now() - lastSubmit < 30000) { showToast(tr('waitAlert')); return; }

    const payload = {
      type, name, phone: normalizedPhone, email, subject, message,
      lang: getLang(), sourcePage: location.pathname, theme: getTheme(),
      screen: `${window.innerWidth}x${window.innerHeight}`, website
    };

    const originalLabel = button?.textContent || tr('supportSubmit');
    if (button) {
      button.disabled = true;
      button.textContent = tr('supportSending');
    }

    try {
      sessionStorage.setItem('ayan_support_last_submit', String(Date.now()));
      const response = await fetch('/api/support', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || tr('supportNetworkError'));

      form.reset();
      if (typeInput) typeInput.value = '';
      typeButtons.forEach((node) => {
        node.classList.remove('selected');
        node.setAttribute('aria-pressed', 'false');
      });

      if (success) {
        success.classList.add('show');
        const title = success.querySelector('[data-i18n="supportSuccessTitle"]');
        const text = success.querySelector('[data-i18n="supportSuccessText"]');
        if (title) title.textContent = tr('supportSuccessTitle');
        if (text) text.textContent = tr('supportSuccessText');
        success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
      showToast(tr('supportSuccessTitle'));
      sendLog('support_request', { type, success: true });
    } catch (error) {
      showToast(error?.message || tr('supportGenericError'));
      sendLog('support_request', { type, success: false });
    } finally {
      if (button) {
        button.disabled = false;
        button.textContent = originalLabel;
      }
    }
  });
}

function setupSocialFloat() {
  let widget = document.querySelector('[data-social-float]');
  if (!widget) {
    const lang = getLang();
    const labels = lang === 'ar'
      ? { menu: 'قنوات التواصل', whatsapp: 'واتساب', instagram: 'إنستغرام', snapchat: 'سناب شات', aria: 'روابط التواصل' }
      : { menu: 'CONNECT WITH US', whatsapp: 'WhatsApp', instagram: 'Instagram', snapchat: 'Snapchat', aria: 'Social links' };
    widget = document.createElement('div');
    widget.className = 'social-float';
    widget.dataset.socialFloat = '';
    widget.innerHTML = `<div class="social-float-menu" id="social-float-menu" data-social-menu>
      <a class="social-float-link whatsapp" href="https://wa.me/${WHATSAPP_NUMBER}" target="_blank" rel="noopener noreferrer" data-social="whatsapp"><span class="social-float-icon" aria-hidden="true"><svg viewBox="0 0 24 24" role="img"><circle cx="12" cy="12" r="9.3"/><path d="M8.9 7.8c.25-.55.55-.59.97-.59h.58c.18 0 .4.07.51.3l.92 2.15c.11.24.08.43-.08.62l-.48.58c-.14.17-.17.31-.05.53.45.84 1.02 1.52 1.78 2.05.22.15.38.13.54-.04l.61-.68c.16-.18.35-.21.58-.11l2.05.91c.24.11.35.24.33.45-.07.66-.34 1.26-.88 1.69-.47.38-1.09.47-1.73.32-1.27-.3-2.64-1.19-3.65-2.14-1.2-1.12-2.15-2.48-2.65-3.58-.31-.69-.38-1.4-.1-2.08l.25-.36Z"/></svg></span><span data-i18n="socialWhatsApp">${labels.whatsapp}</span><span class="social-arrow">↗</span></a>
      <a class="social-float-link instagram" href="https://instagram.com/13345" target="_blank" rel="noopener noreferrer" data-social="instagram"><span class="social-float-icon" aria-hidden="true"><svg viewBox="0 0 24 24" role="img"><rect x="4.2" y="4.2" width="15.6" height="15.6" rx="4.2"/><circle cx="12" cy="12" r="3.7"/><circle cx="17.3" cy="6.9" r="1.05"/></svg></span><span data-i18n="socialInstagram">${labels.instagram}</span><span class="social-arrow">↗</span></a>
      <a class="social-float-link snapchat" href="https://snapchat.com/t/vsu8gtHC" target="_blank" rel="noopener noreferrer" data-social="snapchat"><span class="social-float-icon" aria-hidden="true"><svg viewBox="0 0 24 24" role="img"><path d="M12 4.35c-2.64 0-4.35 1.94-4.35 4.63v2.2c0 .46-.28.8-.84 1.02-.41.17-.72.41-.72.71 0 .44.6.58 1.22.76.5.15.75.36.82.77.09.51.42.79.96.84.4.04.71.13.96.28.45.27.85.67 1.95.67 1.1 0 1.5-.4 1.95-.67.25-.15.56-.24.96-.28.54-.05.87-.33.96-.84.07-.41.32-.62.82-.77.62-.18 1.22-.32 1.22-.76 0-.3-.31-.54-.72-.71-.56-.22-.84-.56-.84-1.02v-2.2c0-2.69-1.71-4.63-4.35-4.63Z"/></svg></span><span data-i18n="socialSnapchat">${labels.snapchat}</span><span class="social-arrow">↗</span></a>
      </div><button class="social-float-toggle" type="button" data-social-toggle data-i18n-aria-label="socialMenuLabel" aria-expanded="false" aria-controls="social-float-menu" aria-label="${labels.aria}"><span class="social-float-toggle-icon" aria-hidden="true"><svg class="social-icon-network" viewBox="0 0 24 24" role="img"><circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.2 10.8 7.5-4.5M8.2 13.2l7.5 4.5"/></svg><svg class="social-icon-close" viewBox="0 0 24 24" role="img"><path d="m4 4 16 16M20 4 4 20" stroke-width="2.2"/></svg></span><span class="social-float-ping" aria-hidden="true"></span></button>`;
    document.body.append(widget);
  }
  const toggle = widget.querySelector('[data-social-toggle]');
  const menu = widget.querySelector('[data-social-menu]');
  if (!widget || !toggle || !menu) return;

  const syncSocialFloatViewport = () => {
    const clientWidth = document.documentElement.clientWidth || window.innerWidth;
    widget.style.setProperty('--social-float-menu-width', `${Math.max(110, Math.min(270, clientWidth - 100))}px`);
  };
  syncSocialFloatViewport();
  window.addEventListener('resize', syncSocialFloatViewport, { passive: true });

  let open = false;
  const setOpen = (next) => {
    open = next;
    widget.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
  };

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

function getOfficialVerificationUrl(token, lang = getLang()) {
  const url = new URL('https://eauthenticate.saudibusiness.gov.sa/EAuthSealApi/seal');
  url.searchParams.set('token', token);
  url.searchParams.set('lang', lang === 'en' ? 'en' : 'ar');
  url.searchParams.set('pos', 'bottom');
  return url.toString();
}

function setupVerificationSealShortcut() {
  const seal = document.querySelector('.sbc-verify-seal[data-token]');
  if (!seal) return;
  const token = seal.dataset.token;
  const certificateUrl = getOfficialVerificationUrl(token);
  const control = document.createElement('div');
  control.className = 'sbc-verify-control';
  const shortcut = document.createElement('a');
  shortcut.className = 'sbc-verify-shortcut';
  shortcut.href = certificateUrl;
  shortcut.target = '_blank';
  shortcut.rel = 'noopener noreferrer';
  shortcut.dataset.token = token;
  shortcut.dataset.i18nAriaLabel = 'verificationShortcutLabel';
  shortcut.innerHTML = `<span class="sbc-verify-shortcut-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 3.1 19 6v5.1c0 4.6-2.8 7.8-7 9.8-4.2-2-7-5.2-7-9.8V6l7-2.9Z"/><path d="m8.7 12.1 2.2 2.2 4.5-4.8"/></svg></span><span data-i18n="verificationLink">${getLang() === 'ar' ? 'متجر موثّق' : 'Verified store'}</span><span class="sbc-verify-shortcut-arrow" aria-hidden="true">↗</span>`;
  shortcut.setAttribute('aria-label', getLang() === 'ar' ? 'متجر موثّق — فتح التحقق الرسمي' : 'Verified store — open official verification');
  const qrTrigger = document.createElement('button');
  qrTrigger.className = 'sbc-verify-qr-trigger';
  qrTrigger.type = 'button';
  qrTrigger.dataset.verificationQr = '';
  qrTrigger.dataset.i18nAriaLabel = 'verificationQrButton';
  qrTrigger.setAttribute('aria-label', getLang() === 'ar' ? 'عرض رمز التحقق QR' : 'Show verification QR code');
  qrTrigger.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h3v3h-3zM19 14h2v2h-2zM19 19h2v2h-5v-2"/></svg>';
  control.append(shortcut, qrTrigger);
  document.body.append(control);
}

function setupVerificationDialog() {
  const floatingSocial = document.querySelector('[data-social-float]');
  if (floatingSocial) {
    const trustRow = floatingSocial.closest('.footer-trust-controls');
    document.body.append(floatingSocial);
    if (trustRow && !trustRow.children.length) trustRow.remove();
  }
  const trigger = document.querySelector('[data-verification-qr]');
  if (!trigger) return;

  const seal = document.querySelector('.sbc-verify-seal[data-token]');
  if (!seal) return;
  const certificateUrl = getOfficialVerificationUrl(seal.dataset.token);
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=240x240&format=svg&margin=8&data=${encodeURIComponent(certificateUrl)}`;
  const dialog = document.createElement('div');
  dialog.className = 'verification-dialog';
  dialog.setAttribute('aria-hidden', 'true');
  dialog.innerHTML = `
    <div class="verification-dialog-backdrop" data-verification-close></div>
    <section class="verification-dialog-card" role="dialog" aria-modal="true" aria-labelledby="verificationDialogTitle">
      <button class="verification-dialog-close" type="button" data-verification-close data-i18n-aria-label="verificationClose" aria-label="إغلاق">×</button>
      <div class="verification-dialog-heading">
        <span class="verification-dialog-mark" aria-hidden="true">✓</span>
        <div><p class="verification-dialog-kicker">Saudi Business Platform</p><h2 id="verificationDialogTitle" data-i18n="verificationDialogTitle">متجر موثّق</h2><strong data-i18n="verificationStoreName">Ayan Photography</strong></div>
      </div>
      <div class="verification-dialog-content">
        <a class="verification-qr-frame" href="${certificateUrl}" target="_blank" rel="noopener noreferrer" aria-label="Open certificate verification">
          <img src="${qrUrl}" alt="Certificate verification QR code" loading="lazy">
        </a>
        <div class="verification-dialog-details">
          <div><span data-i18n="verificationNumber">رقم الشهادة: 0000333236</span><strong>0000333236</strong></div>
          <div><span data-i18n="verificationStateLabel">حالة الشهادة</span><strong class="verification-status-active"><i></i><span data-i18n="verificationStateValue">ساري</span></strong></div>
          <div><span data-i18n="verificationExpiryLabel">تاريخ انتهاء الصلاحية</span><strong data-i18n="verificationExpiryValue">01/10/2027</strong></div>
          <p data-i18n="verificationQrHint">امسح الرمز لفتح صفحة التحقق</p>
          <a class="verification-dialog-url" href="${certificateUrl}" target="_blank" rel="noopener noreferrer">${certificateUrl}</a>
        </div>
      </div>
      <a class="verification-dialog-open" href="${certificateUrl}" target="_blank" rel="noopener noreferrer"><span data-i18n="verificationOpen">عرض التحقق</span><span aria-hidden="true">↗</span></a>
    </section>`;
  document.body.append(dialog);
  applyPreferences();

  const closeButton = dialog.querySelector('.verification-dialog-close');
  const qrFrame = dialog.querySelector('.verification-qr-frame');
  const qrImage = qrFrame?.querySelector('img');
  const shortcut = document.querySelector('.sbc-verify-shortcut');
  const triggers = [trigger, shortcut].filter(Boolean);
  let activeTrigger = trigger;
  const close = () => {
    dialog.classList.remove('open');
    dialog.setAttribute('aria-hidden', 'true');
    triggers.forEach((item) => item.setAttribute('aria-expanded', 'false'));
    activeTrigger?.focus();
  };
  const open = (event) => {
    event.preventDefault();
    activeTrigger = event.currentTarget;
    dialog.classList.add('open');
    dialog.setAttribute('aria-hidden', 'false');
    triggers.forEach((item) => item.setAttribute('aria-expanded', 'true'));
    closeButton?.focus();
  };
  triggers.forEach((item) => {
    item.setAttribute('aria-haspopup', 'dialog');
    item.setAttribute('aria-expanded', 'false');
    item.addEventListener('click', open);
  });
  dialog.querySelectorAll('[data-verification-close]').forEach((button) => button.addEventListener('click', close));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && dialog.classList.contains('open')) close();
  });
  qrImage?.addEventListener('error', () => qrFrame?.classList.add('is-unavailable'), { once: true });
}

async function init() {
  applyPreferences();
  void loadPaymentConfig();
  setupActiveNav();
  setupPackageButtons();
  setupBookingExperience();
  setupBookingForm();
  setupSupportForm();
  setupReveal();
  setupCardGlow();
  setupPointerGlow();
  setupSocialFloat();
  setupVerificationSealShortcut();
  setupVerificationDialog();
  setupAmbientParallax();
  setupHeroBackgroundVideo();
  setupHomeShowcaseVideos();
  setupBookingBackgroundVideo();
  loadGallery();
  sendVisitorLogOnce();
}

document.addEventListener('DOMContentLoaded', init);
window.AyanPhotography = { setLang, setTheme };

window.addEventListener('storage', (event) => {
  if (event.key === STORAGE_LANG || event.key === STORAGE_THEME) applyPreferences();
});
