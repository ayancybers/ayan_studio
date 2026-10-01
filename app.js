
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
    packagesLink: 'تخصيص وحجز ←', popularBadge: 'الأكثر طلبًا',
    
    silverH1: 'مقاطع أصلية', silverH2: 'زوايا متعددة', silverH3: 'بدون مونتاج',
    basicH1: 'أكثر من 5', basicH2: 'مونتاج كامل', basicH3: 'اختيار أغنية',
    advancedH1: 'أكثر من 10', advancedH2: 'تصوير ثابت', advancedH3: 'مونتاج متكامل',
    royalH1: 'أكثر من 20', royalH2: 'سينمائي', royalH3: 'فكرة خاصة',
    silver: 'الباقة الفضية', silverDesc: 'رولينق بدون مونتاج', silverPrice: '70',
    silverF1: 'تصوير رولينق للسيارة.', silverF2: 'تصوير أثناء الحركة من زوايا متنوعة.', silverF3: 'تسليم جميع المقاطع الأصلية بدون مونتاج.', selectPackage: 'اختر الباقة',
    basic: 'الباقة الأساسية', basicDesc: 'رولينق + أكثر من 5 مقاطع متنوعة + مونتاج', basicPrice: '100',
    basicF1: 'تصوير رولينق للسيارة.', basicF2: 'أكثر من 5 مقاطع متنوعة.', basicF3: 'مونتاج كامل للمقاطع.', basicF4: 'اختيار أغنية على ذوقك.', basicF5: 'إمكانية تنفيذ فكرة خاصة حسب طلبك.',
    advanced: 'الباقة المتقدمة', advancedDesc: 'رولينق + تصوير ثابت + أكثر من 10 مقاطع + مونتاج', advancedPrice: '150', advancedBadge: 'الأكثر طلبًا',
    advancedF1: 'تصوير رولينق للسيارة.', advancedF2: 'تصوير ثابت من عدة زوايا.', advancedF3: 'أكثر من 10 مقاطع متنوعة.', advancedF4: 'مونتاج متكامل.', advancedF5: 'تنويع في الزوايا والحركات.', advancedF6: 'تسليم الفيديوهات في نفس اليوم بإذن الله.',
    royal: 'الباقة السينمائية', royalDesc: 'التصوير السينمائي + 20+ مقطع متنوع', royalPrice: '200', royalBadge: 'Signature',
    royalF1: 'تصوير سينمائي متكامل للسيارة.', royalF2: 'رولينق وتصوير ثابت بزوايا وحركات متنوعة.', royalF3: 'أكثر من 20 مقطع متنوع.', royalF4: 'مونتاج سينمائي احترافي.', royalF5: 'تنفيذ فكرة خاصة حسب طلبك.', royalF6: 'إخراج يناسب سيارتك.',
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
    servicesTitle: 'الخدمات', servicesText: 'اختَر نوع الإنتاج الذي يخدم هدفك، سواء كان ريلز، صور، أو تغطية كاملة.', catalogKicker: 'الباقات المتاحة', catalogTitle: 'الخدمات والأسعار', catalogText: 'جميع الباقات المتاحة للحجز موضحة هنا مع وصف مختصر وسعر محدث وصور من أعمال Ayan Photography.', catalogLink: 'احجز الآن ←', catalogSilverTitle: 'الباقة الفضية', catalogSilverText: 'تصوير رولينق أثناء الحركة من زوايا متنوعة، مع تسليم جميع المقاطع الأصلية بدون مونتاج.', catalogBasicTitle: 'الباقة الأساسية', catalogBasicText: 'تصوير رولينق مع أكثر من 5 مقاطع متنوعة، ومونتاج كامل، واختيار أغنية وفكرة خاصة عند الطلب.', catalogAdvancedTitle: 'الباقة المتقدمة', catalogAdvancedText: 'رولينق وتصوير ثابت من عدة زوايا، أكثر من 10 مقاطع متنوعة، ومونتاج متكامل وتسليم سريع حسب تفاصيل الجلسة.', catalogRoyalTitle: 'الباقة السينمائية', catalogRoyalText: 'تصوير سينمائي متكامل يجمع الرولينق والتصوير الثابت، أكثر من 20 مقطع متنوع، ومونتاج احترافي مع إمكانية تنفيذ فكرة خاصة.', catalogChoose: 'اختيار الباقة', catalogNoteTitle: 'ملاحظة:', catalogNoteText: 'الأسعار المعروضة هي أسعار الباقات الحالية، وأي خدمة إضافية يتم توضيحها للعميل قبل تأكيد الطلب.',
    service1Title: 'Rolling Shots', service1Text: 'تصوير أثناء الحركة من زوايا مختلفة لإظهار التصميم والسرعة والحضور.',
    service2Title: 'Static Details', service2Text: 'لقطات ثابتة تركز على التفاصيل الخارجية والداخلية وعناصر التصميم.',
    service3Title: 'Cinematic Edit', service3Text: 'مونتاج متكامل بإيقاع بصري يناسب السيارة والمنصة التي ستنشر عليها.',
    service4Title: 'Custom Concept', service4Text: 'فكرة خاصة يتم تنسيقها حسب أسلوبك والرسالة التي تريد إيصالها.',
    processTitle: 'طريقة العمل', processText: 'أربع خطوات واضحة بدون تعقيد.',
    step1Title: 'اختَر', step1Text: 'حدد الباقة ونوع الجلسة المناسبة.', step2Title: 'أرسل', step2Text: 'أرسل بياناتك وملاحظاتك من نموذج الحجز.', step3Title: 'نسّق', step3Text: 'نكمل التفاصيل معك عبر الواتساب.', step4Title: 'صوّر', step4Text: 'ننفذ الجلسة ونرتب التسليم.',
    bookingHeroKicker: 'Booking', bookingHeroTitle: 'احجز جلستك في أقل من دقيقة.', bookingHeroText: 'عبّ البيانات، راجع الإجمالي ورسوم الدفع، وبعدها انتقل للدفع الآمن.', bookingMeta1: 'اختر الباقة', bookingMeta2: 'أدخل التفاصيل', bookingMeta3: 'الدفع عبر Tap', bookingSideTitle: 'ابدأ بالباقة المناسبة.', bookingSideText: 'اختر مستوى التصوير أولًا، وبعدها نكمل معك باقي التفاصيل.', selectedLabel: 'الباقة المختارة', selectedEmpty: 'اختر باقة للبدء', sideFoot1: 'تنسيق مباشر', sideFoot2: 'أسعار واضحة', sideFoot3: 'تحويل للواتساب', bookingStep1: 'الباقة', bookingStep2: 'البيانات', bookingStep3: 'الدفع', flowStep1: 'اختر الباقة', flowStep2: 'أضف تفاصيل الجلسة', flowStep3: 'ادفع بأمان عبر Tap', formKicker: 'Start your session', packageHint: 'اختَر المستوى الذي يناسب اللقطة التي في بالك.', tapToChoose: 'اضغط للاختيار', detailsDivider: 'بيانات الجلسة', submitTitle: 'جاهز؟ خلنا نكمل.', submitText: 'بعد التأكيد راح تراجع المبلغ وتختار طريقة الدفع.',
    formTitle: 'استمارة الحجز الفوري', formRequired: 'الحقول بعلامة * إلزامية', nameLabel: 'اسمك الكامل *', namePlaceholder: 'اسمك بالكامل', phoneLabel: 'رقم الواتساب *', phonePlaceholder: '05xxxxxxxx', packageLabel: 'الباقة *', packagePlaceholder: 'اختر الباقة المطلوبة', carLabel: 'نوع السيارة *', carPlaceholder: 'اختر نوع السيارة', regionLabel: 'منطقة التصوير *', regionPlaceholder: 'اختر المنطقة', notesLabel: 'ملاحظات إضافية', notesPlaceholder: 'زوايا معينة، فكرة خاصة، وقت مناسب، أو أي طلب آخر...', submit: 'متابعة إلى الدفع', formNote: 'المبلغ النهائي يعرض سعر الباقة ورسوم الدفع بشكل منفصل قبل الدفع.', termsAgreement: 'أوافق على الشروط والأحكام وأقر بأن الخدمة/المحتوى الرقمي غير قابل للاسترجاع بعد الدفع أو بدء التنفيذ.', termsLink: 'عرض الشروط والأحكام',
    bookingAsideTitle: 'قبل الدفع', bookingAsideText: 'راجع بياناتك وسعر الباقة قبل اختيار طريقة الدفع.', aside1: 'اختر الباقة أولًا.', aside2: 'اكتب رقم واتساب متاح.', aside3: 'اذكر أي فكرة خاصة في الملاحظات.', priceNoteTitle: 'الأسعار الأساسية', priceNoteText: '70 / 100 / 150 / 200 SAR', subtotalLabel: 'سعر الباقة', serviceFeeLabel: 'رسوم الدفع', taxLabel: 'الضريبة', totalLabel: 'الإجمالي', taxNotice: 'رسوم الدفع تُحسب حسب طريقة الدفع المختارة.', selectedBaseLabel: 'قبل الإضافات', paymentError: 'تعذر تجهيز عملية الدفع. حاول مرة ثانية.', paymentPreparing: 'جاري تجهيز الدفع…',
    galleryHeroKicker: 'Gallery', galleryHeroTitle: 'شوف النتيجة قبل ما تحجز.', galleryHeroText: 'مكتبة الصور والفيديوهات في مكان واحد، مع فلترة سريعة وفتح كامل للمحتوى.', galleryAll: 'الكل', galleryVideos: 'الفيديوهات', galleryImages: 'الصور', galleryCount: 'محتوى', readyTitle: 'عجبك الشغل؟', readyText: 'انتقل مباشرة إلى نموذج الحجز واختَر الباقة المناسبة.', startBooking: 'ابدأ الحجز ←',
    footerCopy: 'تصوير سيارات احترافي، رولينق، جلسات ثابتة، ومونتاج سينمائي بأسلوب يناسب كل سيارة.', footerNav: 'التنقل', footerContact: 'تواصل', footerLocation: 'المنطقة الشرقية، السعودية', footerTag: 'Built for cinematic car content', termsPageLink: 'الشروط والأحكام', termsKicker: 'Terms & Conditions', termsTitle: 'الشروط والأحكام', termsIntro: 'قبل إتمام الحجز، يرجى قراءة الشروط والقواعد الخاصة بالخدمات والمحتويات الرقمية المقدمة من Ayan Photography.', termsDigitalTitle: 'الخدمات والمنتجات الرقمية', termsDigitalText: 'الخدمات والمحتويات المقدمة من Ayan Photography هي خدمات/منتجات رقمية، وتشمل التصوير الرقمي، المقاطع، الصور، والمونتاج. وبمجرد إتمام الدفع أو بدء تنفيذ الطلب، لا يمكن استرجاع المبلغ.', termsRefundTitle: 'سياسة الاسترجاع', termsRefund1: 'جميع المدفوعات الخاصة بالخدمات الرقمية غير قابلة للاسترجاع بعد الدفع أو بدء التنفيذ.', termsRefund2: 'في حال بدأ التصوير أو المونتاج أو إعداد المحتوى، لا يحق للعميل طلب استرجاع المبلغ.', termsRefund3: 'رسوم وسيلة الدفع تُحتسب ضمن إجمالي عملية الدفع حسب الطريقة المختارة.', termsBookingTitle: 'الحجز والتنفيذ', termsBooking1: 'يتم تنفيذ الخدمة حسب الباقة والمعلومات التي يرسلها العميل أثناء الحجز.', termsBooking2: 'يجب التأكد من صحة الاسم ورقم الجوال ونوع السيارة والمنطقة قبل الدفع.', termsBooking3: 'أي تفاصيل إضافية خارج وصف الباقة يتم توضيحها للعميل قبل تأكيد الطلب.', termsDeliveryTitle: 'التسليم والمحتوى', termsDelivery1: 'يتم تسليم المحتوى الرقمي حسب تفاصيل الباقة المتفق عليها.', termsDelivery2: 'المحتوى المُسلّم رقمي ولا يتضمن منتجًا ماديًا أو شحنة قابلة للإرجاع.', termsContactTitle: 'التواصل', termsContactText: 'لأي استفسار عن الحجز أو تفاصيل الخدمة، تواصل معنا عبر واتساب قبل إتمام الدفع.', termsContactButton: 'تواصل عبر واتساب',
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
    
    silverH1: 'Raw clips', silverH2: 'Multi-angle', silverH3: 'No edit',
    basicH1: '5+ clips', basicH2: 'Full edit', basicH3: 'Music choice',
    advancedH1: '10+ clips', advancedH2: 'Static shots', advancedH3: 'Full edit',
    royalH1: '20+ clips', royalH2: 'Cinematic', royalH3: 'Custom idea',
    silver: 'Silver Package', silverDesc: 'Rolling without editing', silverPrice: '70', silverF1: 'Rolling shots of the car.', silverF2: 'Moving shots from multiple angles.', silverF3: 'All original clips delivered without editing.', selectPackage: 'Choose package',
    basic: 'Basic Package', basicDesc: 'Rolling + 5+ clips + editing', basicPrice: '100', basicF1: 'Rolling shots of the car.', basicF2: 'More than 5 varied clips.', basicF3: 'Full edit of the footage.', basicF4: 'Choose the music style you want.', basicF5: 'Option for a custom idea.',
    advanced: 'Advanced Package', advancedDesc: 'Rolling + static + more than 10 varied clips + editing', advancedPrice: '150', advancedBadge: 'Most Popular', advancedF1: 'Rolling shots of the car.', advancedF2: 'Static shots from several angles.', advancedF3: 'More than 10 varied clips.', advancedF4: 'Complete edit.', advancedF5: 'Varied camera movements and angles.', advancedF6: 'Same-day delivery when possible.',
    royal: 'Cinematic Package', royalDesc: 'Cinematic production + 20+ clips', royalPrice: '200', royalBadge: 'Signature', royalF1: 'Complete cinematic car coverage.', royalF2: 'Rolling and static shots with varied movement.', royalF3: 'More than 20 varied clips.', royalF4: 'Professional cinematic edit.', royalF5: 'Custom concept execution.', royalF6: 'Direction tailored to your car.',
    whyKicker: 'Why Ayan Photography', whyTitle: 'A clean experience from booking to delivery.', whyText: 'Instead of a crowded one-page site, every part of the journey now has a clear path.', featureLink: 'Explore all features →', feature1Title: 'Professional sessions', feature1Text: 'Purpose-built camera work and lenses to reveal the car with cinematic detail.', feature2Title: 'Fast delivery', feature2Text: 'A clear workflow for production, processing, and delivery without unnecessary steps.', feature3Title: 'Direct coordination', feature3Text: 'Submit your request on the site and continue straight to WhatsApp for coordination.',
    workflowKicker: 'Ayan Workflow', workflowTitle: 'From the first idea to the final frame.', workflowText: 'Every page has one clear job, so clients find what they need quickly.', workflow1: 'Choose the right package.', workflow2: 'Add car and shoot details.', workflow3: 'Receive and coordinate the request on WhatsApp.', workflow4: 'Shoot and deliver based on the package.', galleryKicker: 'Gallery', galleryTitle: 'See the work before you book.', galleryText: 'The gallery now lives on its own page so the focus stays on the visual work.', exploreGallery: 'Explore gallery →',
    featuresHeroKicker: 'Why Ayan Photography', featuresHeroTitle: 'Every detail is designed to make your car look its best.', featuresHeroText: 'Quiet visual direction, smooth motion, and a clear journey from the first message to final delivery.', feature4Title: 'Shot planning', feature4Text: 'We shape the concept around the car, location, and content style you want.', feature5Title: 'Intentional editing', feature5Text: 'Cuts, motion, and transitions that support the scene instead of fighting it.', feature6Title: 'Mobile-first experience', feature6Text: 'The website and booking flow are designed to feel fast on both phone and desktop.', servicesTitle: 'Services', servicesText: 'Choose the production type that fits your goal, whether it is reels, details, or a full session.', catalogKicker: 'Available Packages', catalogTitle: 'Services & Pricing', catalogText: 'All bookable packages are listed here with a clear description, current price, and selected Ayan Photography work.', catalogLink: 'Book now →', catalogSilverTitle: 'Silver Package', catalogSilverText: 'Rolling coverage from multiple angles with all original clips delivered without editing.', catalogBasicTitle: 'Basic Package', catalogBasicText: 'Rolling coverage with 10+ varied clips, full editing, music selection, and an optional custom concept.', catalogAdvancedTitle: 'Advanced Package', catalogAdvancedText: 'Rolling and static coverage from multiple angles, 10+ clips, full editing, and fast delivery based on the session.', catalogRoyalTitle: 'Cinematic Package', catalogRoyalText: 'A complete cinematic session combining rolling, static coverage, professional editing, and a custom concept option.', catalogChoose: 'Choose package', catalogNoteTitle: 'Note:', catalogNoteText: 'Displayed prices are the current package prices. Any additional service is explained before the order is confirmed.', service1Title: 'Rolling Shots', service1Text: 'Moving coverage from different angles to show design, speed, and presence.', service2Title: 'Static Details', service2Text: 'Still frames that focus on exterior, interior, and design details.', service3Title: 'Cinematic Edit', service3Text: 'A full edit with a visual rhythm built around the car and the platform.', service4Title: 'Custom Concept', service4Text: 'A tailored idea coordinated around your style and the message you want to convey.',
    processTitle: 'How it works', processText: 'Four clear steps with no unnecessary complexity.', step1Title: 'Choose', step1Text: 'Pick the package and session type.', step2Title: 'Send', step2Text: 'Submit your details and notes.', step3Title: 'Coordinate', step3Text: 'We finalize the details through WhatsApp.', step4Title: 'Shoot', step4Text: 'We execute the session and arrange delivery.',
    bookingHeroKicker: 'Booking', bookingHeroTitle: 'Book your session in under a minute.', bookingHeroText: 'Fill in your details, review the total and payment fee, then continue to secure payment.', bookingMeta1: 'Choose a package', bookingMeta2: 'Add your details', bookingMeta3: 'Pay through Tap', bookingSideTitle: 'Start with the right package.', bookingSideText: 'Choose your production level first, then we will handle the rest with you.', selectedLabel: 'Selected package', selectedEmpty: 'Choose a package to begin', sideFoot1: 'Direct coordination', sideFoot2: 'Clear pricing', sideFoot3: 'WhatsApp handoff', bookingStep1: 'Package', bookingStep2: 'Details', bookingStep3: 'Payment', flowStep1: 'Choose your package', flowStep2: 'Add your session details', flowStep3: 'Pay securely with Tap', formKicker: 'Start your session', packageHint: 'Choose the production level that fits the shot in your head.', tapToChoose: 'Tap to choose', detailsDivider: 'Session details', submitTitle: 'Ready? Let’s finish it.', submitText: 'After confirmation, you will review the total and choose a payment method.',
    formTitle: 'Instant booking form', termsAgreement: 'I agree to the terms and conditions and acknowledge that the digital service/content is non-refundable after payment or once work has started.', termsLink: 'View terms and conditions', formRequired: 'Fields marked * are required', nameLabel: 'Full name *', namePlaceholder: 'Your full name', phoneLabel: 'WhatsApp number *', phonePlaceholder: '05xxxxxxxx', packageLabel: 'Package *', packagePlaceholder: 'Choose a package', carLabel: 'Car type *', carPlaceholder: 'Choose your car type', regionLabel: 'Shoot area *', regionPlaceholder: 'Choose an area', notesLabel: 'Additional notes', notesPlaceholder: 'Specific angles, a custom idea, preferred time, or anything else...', submit: 'Continue to payment', formNote: 'The final amount shows the package price and payment fee separately before payment.', bookingAsideTitle: 'Before payment', bookingAsideText: 'Review your details and the package price before choosing a payment method.', aside1: 'Choose the package first.', aside2: 'Use an active WhatsApp number.', aside3: 'Add any special idea in the notes.', priceNoteTitle: 'Base prices', priceNoteText: '70 / 100 / 150 / 200 SAR', subtotalLabel: 'Package price', serviceFeeLabel: 'Payment fee', taxLabel: 'Tax', totalLabel: 'Total', taxNotice: 'Payment fees are shown on the checkout page based on the selected method.', selectedBaseLabel: 'Before additions', paymentError: 'We could not prepare the payment. Please try again.', paymentPreparing: 'Preparing secure payment…',
    galleryHeroKicker: 'Gallery', galleryHeroTitle: 'See the result before you book.', galleryHeroText: 'Photos and videos in one place, with quick filters and a full-view lightbox.', galleryAll: 'All', galleryVideos: 'Videos', galleryImages: 'Photos', galleryCount: 'items', readyTitle: 'Like what you see?', readyText: 'Go straight to the booking form and choose the right package.', startBooking: 'Start booking →', footerCopy: 'Professional car photography, rolling shots, static sessions, and cinematic edits shaped around every car.', footerNav: 'Navigation', footerContact: 'Contact', footerLocation: 'Eastern Province, Saudi Arabia', footerTag: 'Built for cinematic car content', termsPageLink: 'Terms & Conditions', termsKicker: 'Terms & Conditions', termsTitle: 'Terms & Conditions', termsIntro: 'Please read the terms and rules for Ayan Photography digital services and content before completing your booking.', termsDigitalTitle: 'Digital Services & Products', termsDigitalText: 'Ayan Photography services and content are digital services/products, including digital photography, videos, images, and editing. Once payment is completed or work has started, the amount is non-refundable.', termsRefundTitle: 'Refund Policy', termsRefund1: 'Payments for digital services are non-refundable after payment or once execution has started.', termsRefund2: 'Once photography, editing, or content preparation has started, the customer is not entitled to request a refund.', termsRefund3: 'Payment-method fees are included in the final checkout amount according to the selected method.', termsBookingTitle: 'Booking & Execution', termsBooking1: 'The service is delivered according to the selected package and the information submitted during booking.', termsBooking2: 'Please confirm your name, mobile number, car type, and area before payment.', termsBooking3: 'Any service outside the package description will be explained before the order is confirmed.', termsDeliveryTitle: 'Delivery & Content', termsDelivery1: 'Digital content is delivered according to the agreed package details.', termsDelivery2: 'Delivered content is digital and does not include a physical product or returnable shipment.', termsContactTitle: 'Contact', termsContactText: 'For any booking or service question, contact us through WhatsApp before completing payment.', termsContactButton: 'Contact via WhatsApp',
    loading1: 'Initializing Ayan Photography...', loading2: 'Preparing cinematic frames...', loading3: 'Everything is ready 🚀', bookingSuccess: '✨ Request received. Redirecting to WhatsApp...', requiredAlert: 'Please complete the required fields.', waitAlert: '⚠️ Please wait a moment before sending another request.', networkAlert: 'The system request could not be sent. WhatsApp will open directly.', whatsappAr: 'Hello, I would like to book a car photography session',
  }
};

const packageOptions = {
  ar: [
    ['الباقة الفضية - 70 ريال', 'الباقة الفضية — 70 ريال'],
    ['الباقة الأساسية - 100 ريال', 'الباقة الأساسية — 100 ريال'],
    ['الباقة المتقدمة - 150 ريال', 'الباقة المتقدمة — 150 ريال'],
    ['الباقة السينمائية - 200 ريال', 'الباقة السينمائية — 200 ريال']
  ],
  en: [
    ['Silver Package - 70 SAR', 'Silver Package — 70 SAR'],
    ['Basic Package - 100 SAR', 'Basic Package — 100 SAR'],
    ['Advanced Package - 150 SAR', 'Advanced Package — 150 SAR'],
    ['Cinematic Package - 200 SAR', 'Cinematic Package — 200 SAR']
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
    : (document.body.dataset.page === 'terms' ? (lang === 'ar' ? 'الشروط والقواعد | Ayan Photography' : 'Terms & Rules | Ayan Photography') : document.title);
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
    'الباقة الفضية - 70 ريال': ['الباقة الفضية - 70 ريال', 'Silver Package - 70 SAR'],
    '🥈 الباقة الفضية - 70 ريال': ['الباقة الفضية - 70 ريال', 'Silver Package - 70 SAR'],
    'الباقة الأساسية - 100 ريال': ['الباقة الأساسية - 100 ريال', 'Basic Package - 100 SAR'],
    '🥉 الباقة الأساسية - 100 ريال': ['الباقة الأساسية - 100 ريال', 'Basic Package - 100 SAR'],
    'الباقة المتقدمة - 150 ريال': ['الباقة المتقدمة - 150 ريال', 'Advanced Package - 150 SAR'],
    '🏆 الباقة المتقدمة - 150 ريال': ['الباقة المتقدمة - 150 ريال', 'Advanced Package - 150 SAR'],
    'الباقة السينمائية - 200 ريال': ['الباقة السينمائية - 200 ريال', 'Cinematic Package - 200 SAR'],
    '💎 الباقة السينمائية - 200 ريال': ['الباقة السينمائية - 200 ريال', 'Cinematic Package - 200 SAR']
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

  video.muted = true;
  video.defaultMuted = true;
  video.volume = 0;
  video.loop = true;
  video.playsInline = true;
  video.controls = false;
  video.preload = 'metadata';

  let retryTimer = 0;
  let retries = 0;
  const play = () => {
    window.clearTimeout(retryTimer);
    const promise = video.play();
    if (promise?.catch) {
      promise.catch(() => {
        if (document.hidden || retries >= 3) return;
        retries += 1;
        retryTimer = window.setTimeout(play, 1200);
      });
    }
  };

  video.addEventListener('playing', () => { retries = 0; });
  video.addEventListener('error', () => {
    if (document.hidden || retries >= 2) return;
    retries += 1;
    retryTimer = window.setTimeout(play, 1600);
  });
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && video.paused) play();
  });

  // The HTML autoplay attribute starts the media; don't call load() here because it can restart the request.
  window.setTimeout(play, 0);
}

function setupBookingBackgroundVideo() {
  const video = document.querySelector('[data-packingbackground]');
  if (!video) return;

  video.muted = true;
  video.defaultMuted = true;
  video.volume = 0;
  video.loop = true;
  video.playsInline = true;
  video.controls = false;
  video.preload = 'metadata';

  let retryTimer = 0;
  let attempts = 0;
  const start = () => {
    window.clearTimeout(retryTimer);
    const promise = video.play();
    if (promise?.catch) promise.catch(() => {
      if (document.hidden || attempts >= 3) return;
      attempts += 1;
      retryTimer = window.setTimeout(start, 1200);
    });
  };

  video.addEventListener('playing', () => { attempts = 0; });
  video.addEventListener('error', () => {
    if (document.hidden || attempts >= 2) return;
    attempts += 1;
    retryTimer = window.setTimeout(start, 1600);
  });
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && video.paused) start();
  });

  // Keep the booking background video, but avoid forcing an extra media load/reload.
  window.setTimeout(start, 0);
}

function setupHomeLoader() {
  const loader = document.querySelector('[data-home-loader]');
  if (!loader) return;

  const percentEl = loader.querySelector('[data-loader-percent]');
  const barEl = loader.querySelector('[data-loader-progress]');
  const startedAt = performance.now();
  const minimumVisibleMs = 1050;
  const maxWaitMs = 3200;
  let current = 1;
  let target = 1;
  let finishing = false;
  let rafId = 0;

  const render = (value) => {
    const v = Math.max(1, Math.min(100, Math.round(value)));
    if (percentEl) percentEl.textContent = `${String(v).padStart(2, '0')}%`;
    if (barEl) barEl.style.width = `${v}%`;
  };

  const tick = () => {
    if (current < target) {
      current += Math.max(.35, (target - current) * .22);
      render(current);
    }
    rafId = window.requestAnimationFrame(tick);
  };

  // Start with the small milestone values requested: 01% → 04% → 06% → 08%,
  // then continue smoothly toward the real load state.
  const milestones = [1, 4, 6, 8, 14, 28, 46, 68, 82, 92];
  let milestoneIndex = 0;
  const milestoneTimer = window.setInterval(() => {
    if (finishing) return;
    milestoneIndex = Math.min(milestoneIndex + 1, milestones.length - 1);
    target = milestones[milestoneIndex];
    if (milestoneIndex === milestones.length - 1) window.clearInterval(milestoneTimer);
  }, 125);

  const finish = () => {
    if (finishing) return;
    finishing = true;
    window.clearInterval(milestoneTimer);
    target = 100;
    const elapsed = performance.now() - startedAt;
    const wait = Math.max(0, minimumVisibleMs - elapsed);
    window.setTimeout(() => {
      const doneAt = performance.now();
      const complete = () => {
        if (performance.now() - doneAt < 420) {
          requestAnimationFrame(complete);
          return;
        }
        loader.classList.add('hide');
      };
      complete();
    }, wait + 120);
  };

  render(1);
  rafId = window.requestAnimationFrame(tick);

  if (document.readyState === 'complete') finish();
  else window.addEventListener('load', finish, { once: true });

  // Never block the site forever because of a slow remote asset.
  window.setTimeout(finish, maxWaitMs);
  window.setTimeout(() => window.cancelAnimationFrame(rafId), maxWaitMs + 1800);
}


let AYAN_PAYMENT_CONFIG = {
  currency: 'SAR',
  pricing: {
    vatEnabled: false,
    vatRate: 0,
    paymentFeeEnabled: true,
    vatOnPaymentFee: false,
    paymentFees: {
      card: { percent: 2.75, fixed: 6 },
      tabby: { percent: 6.99, fixed: 7.5 }
    }
  },
  packages: {
    silver: { price: 70 }, basic: { price: 100 }, advanced: { price: 150 }, royal: { price: 200 }
  }
};

function getPackageFinancials(key, paymentMethod = 'none') {
  const pkg = AYAN_PAYMENT_CONFIG.packages?.[key];
  const subtotal = Number(pkg?.price ?? ({ silver: 70, basic: 100, advanced: 150, royal: 200 }[key] || 0));
  const p = AYAN_PAYMENT_CONFIG.pricing || {};
  const vatEnabled = false;
  const taxRate = 0;
  const tax = 0;
  const beforeFee = subtotal;
  const feeCfg = p.paymentFees?.[paymentMethod] || { percent: 0, fixed: 0 };
  const paymentFee = p.paymentFeeEnabled && (paymentMethod === 'card' || paymentMethod === 'tabby')
    ? Math.round((beforeFee * Number(feeCfg.percent || 0) / 100 + Number(feeCfg.fixed || 0)) * 100) / 100
    : 0;
  const paymentFeeTax = 0;
  const total = Math.round((beforeFee + paymentFee + paymentFeeTax) * 100) / 100;
  return { subtotal, tax, paymentFee, paymentFeeTax, total, taxRate, vatEnabled, vatOnPaymentFee: p.vatOnPaymentFee === true };
}

async function loadPaymentConfig() {
  try {
    const response = await fetch('/api/payment-config', { cache: 'no-store' });
    if (!response.ok) throw new Error('config');
    const config = await response.json();
    if (config?.pricing && config?.packages) {
      AYAN_PAYMENT_CONFIG = config;
      if (document.querySelector('#bookingForm')) updateBookingExperience();
    }
  } catch (_) {
    // Safe fallback values are kept in AYAN_PAYMENT_CONFIG.
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
  let selected = null;
  choices.forEach((choice) => {
    const value = packageValueForLang(choice.dataset.bookingPackage, getLang());
    const active = !!current && current === value;
    choice.classList.toggle('selected', active);
    if (active) selected = choice;
    const totalNode = choice.querySelector('[data-package-total]');
    if (totalNode) {
      const finance = getPackageFinancials(choice.dataset.packageKey, 'none');
      totalNode.textContent = `${moneySar(finance.total)} SAR`;
    }
  });

  const summaryCard = document.querySelector('[data-booking-summary]');
  const summaryName = document.querySelector('[data-booking-summary-name]');
  const summaryDesc = document.querySelector('[data-booking-summary-desc]');
  const summaryPrice = document.querySelector('[data-booking-summary-price]');
  const summarySubtotal = document.querySelector('[data-booking-summary-subtotal]');
  const summaryServiceFee = document.querySelector('[data-booking-summary-service]');
  const summaryTax = document.querySelector('[data-booking-summary-tax]');
  const summaryTotal = document.querySelector('[data-booking-summary-total]');
  const taxLabelNode = document.querySelector('[data-booking-tax-label]');
  if (!summaryName || !summaryDesc || !summaryPrice) return;

  if (!selected) {
    summaryName.textContent = tr('selectedEmpty');
    summaryDesc.textContent = '—';
    summaryPrice.textContent = '—';
    if (summarySubtotal) summarySubtotal.textContent = '—';
    if (summaryServiceFee) summaryServiceFee.textContent = '—';
    if (summaryTax) summaryTax.textContent = '—';
    if (summaryTotal) summaryTotal.textContent = '—';
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
  if (summaryTax) summaryTax.textContent = '—';
  if (summaryTotal) summaryTotal.textContent = `${moneySar(finance.total)} SAR`;
  if (taxLabelNode) taxLabelNode.textContent = getLang() === 'ar' ? 'الضريبة' : 'Tax';
  const basePriceNode = summaryCard?.querySelector('[data-booking-summary-base]');
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
  const choices = document.querySelectorAll('[data-booking-package]');
  if (!select || !choices.length) return;

  choices.forEach((choice) => {
    choice.addEventListener('click', () => {
      const value = packageValueForLang(choice.dataset.bookingPackage, getLang());
      select.value = value;
      updateBookingExperience();
      sendLog('package_select', { package: value, packageKey: choice.dataset.packageKey, source: 'booking_picker' });
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

    const selectedChoice = document.querySelector('[data-booking-package].selected');
    const packageKey = selectedChoice?.dataset.packageKey || '';
    const phoneInput = document.querySelector('#phone');
    const data = {
      name: document.querySelector('#fullName')?.value.trim(),
      packageKey,
      packageType: document.querySelector('#packageType')?.value,
      carType: document.querySelector('#carType')?.value,
      shootRegion: document.querySelector('#shootRegion')?.value,
      phone: phoneInput?.value.trim(),
      notes: document.querySelector('#notes')?.value.trim(),
      lang: getLang(),
      sourcePage: location.pathname,
      theme: getTheme(),
      screen: `${window.innerWidth}x${window.innerHeight}`,
      website: document.querySelector('#website')?.value.trim() || '',
      termsAgreement: document.querySelector('#termsAgreement')?.checked === true
    };

    const required = ['name', 'packageType', 'carType', 'shootRegion', 'phone'];
    if (required.some((key) => !data[key]) || !packageKey) {
      showToast(tr('requiredAlert'));
      return;
    }
    if (!data.termsAgreement) {
      showToast(getLang() === 'ar' ? 'يجب الموافقة على الشروط والقواعد قبل المتابعة.' : 'You must agree to the terms and rules before continuing.');
      return;
    }

    const normalizedPhone = normalizePhone(data.phone);
    if (!/^9665\d{8}$/.test(normalizedPhone)) {
      showToast(getLang() === 'ar' ? 'اكتب رقم جوال سعودي صحيح.' : 'Enter a valid Saudi mobile number.');
      return;
    }

    data.phone = normalizedPhone;
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
    window.location.assign('checkout.html');
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
  if (!cards.length) return;
  const videos = cards.map((card) => card.querySelector('video')).filter(Boolean);

  const start = (video) => {
    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;
    video.playsInline = true;
    video.controls = false;
    video.disablePictureInPicture = true;
    const playPromise = video.play();
    if (playPromise?.catch) playPromise.catch(() => {});
  };

  const stop = (video) => {
    if (!video || video.paused) return;
    video.pause();
  };

  // Keep the videos in the gallery, but don't make all six compete for bandwidth at page load.
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting) start(video);
        else stop(video);
      });
    }, { rootMargin: '160px 0px', threshold: 0.05 });
    videos.forEach((video) => observer.observe(video));
  } else {
    videos.forEach(start);
  }

  videos.forEach((video) => {
    const card = video.closest('.gallery-card');
    video.addEventListener('waiting', () => card?.classList.add('video-buffering'), { passive: true });
    video.addEventListener('playing', () => card?.classList.remove('video-buffering', 'video-paused'), { passive: true });
    video.addEventListener('pause', () => {
      if (!document.hidden) card?.classList.add('video-paused');
    }, { passive: true });
  });

  document.addEventListener('visibilitychange', () => {
    if (document.hidden) return;
    cards.forEach((card) => {
      const video = card.querySelector('video');
      if (!video) return;
      const rect = card.getBoundingClientRect();
      if (rect.bottom > -160 && rect.top < window.innerHeight + 160) start(video);
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

async function init() {
  applyPreferences();
  // Start the config request in the background so the header, form, and interactions are usable immediately.
  void loadPaymentConfig();
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
