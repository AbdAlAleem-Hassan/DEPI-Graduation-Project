// tutorial.js
function initTutorialSystem() {
    window.tutorialSystem = new TutorialSystem();
}

// البيانات باللغتين العربية والإنجليزية
const tutorialData = {
    ar: {
        title: "دليل استخدام المنصة",
        sections: [
            {
                id: "overview",
                title: "نظرة عامة على المنصة",
                description: "تعرف على الميزات الرئيسية للمنصة وكيفية التنقل بين أقسامها المختلفة. سيساعدك هذا القسم على فهم الهيكل العام والاستفادة القصوى من جميع الخدمات المتاحة.",
                video: "videos/overview.mp4",
                icon: "fas fa-globe"
            },
            {
                id: "register",
                title: "التسجيل في المنصة",
                description: "خطوات إنشاء حساب جديد والتحقق من البريد الإلكتروني. تعلم كيفية ملء بياناتك الشخصية بشكل صحيح وإنشاء كلمة مرور آمنة لحسابك.",
                video: "videos/register.mp4",
                icon: "fas fa-user-plus"
            },
            {
                id: "login",
                title: "تسجيل الدخول",
                description: "كيفية تسجيل الدخول إلى حسابك واستعادة كلمة المرور إذا نسيتها. تعلم أيضاً كيفية تفعيل المصادقة الثنائية لحماية إضافية.",
                video: "videos/login.mp4",
                icon: "fas fa-sign-in-alt"
            },
            {
                id: "theme",
                title: "تغيير الثيم",
                description: "كيفية تغيير مظهر المنصة بين الوضع الفاتح والداكن. اختر الثيم الذي يناسب راحتك البصرية أثناء استخدام المنصة.",
                video: "videos/theme.mp4",
                icon: "fas fa-palette"
            },
            {
                id: "language",
                title: "تغيير اللغة",
                description: "كيفية تغيير لغة الواجهة بين العربية والإنجليزية. يمكنك التبديل بين اللغات في أي وقت حسب تفضيلاتك.",
                video: "videos/language.mp4",
                icon: "fas fa-language"
            },
            {
                id: "appointment",
                title: "حجز موعد",
                description: "خطوات البحث عن طبيب وحجز موعد معه. تعلم كيفية تصفية النتائج حسب التخصص والموقع والتوفر الزمني.",
                video: "videos/appointment.mp4",
                icon: "fas fa-calendar-check"
            },
            {
                id: "hospitals",
                title: "البحث عن المستشفيات",
                description: "كيفية العثور على المستشفيات والعيادات القريبة منك. استخدم خريطة تفاعلية ومرشحات متقدمة للعثور على أفضل الخيارات.",
                video: "videos/hospitals.mp4",
                icon: "fas fa-hospital"
            },
            {
                id: "doctors",
                title: "البحث عن الأطباء",
                description: "كيفية البحث عن الأطباء حسب التخصص والتقييمات والخبرة. اقرأ مراجعات المرضى السابقين واختر الطبيب المناسب لك.",
                video: "videos/doctors.mp4",
                icon: "fas fa-user-md"
            }
        ],
        buttons: {
            next: "التالي",
            prev: "السابق",
            understand: "فهمت",
            replay: "إعادة التشغيل",
            close: "إغلاق"
        }
    },
    en: {
        title: "Platform Usage Guide",
        sections: [
            {
                id: "overview",
                title: "Platform Overview",
                description: "Learn about the main features of the platform and how to navigate between its different sections. This section will help you understand the overall structure and make the most of all available services.",
                video: "videos/overview.mp4",
                icon: "fas fa-globe"
            },
            {
                id: "register",
                title: "Register on the Platform",
                description: "Steps to create a new account and verify your email. Learn how to correctly fill in your personal information and create a secure password for your account.",
                video: "videos/register.mp4",
                icon: "fas fa-user-plus"
            },
            {
                id: "login",
                title: "Login",
                description: "How to log into your account and recover your password if you forget it. Also learn how to enable two-factor authentication for additional protection.",
                video: "videos/login.mp4",
                icon: "fas fa-sign-in-alt"
            },
            {
                id: "theme",
                title: "Change Theme",
                description: "How to change the platform appearance between light and dark mode. Choose the theme that suits your visual comfort while using the platform.",
                video: "videos/theme.mp4",
                icon: "fas fa-palette"
            },
            {
                id: "language",
                title: "Change Language",
                description: "How to change the interface language between Arabic and English. You can switch between languages at any time according to your preferences.",
                video: "videos/language.mp4",
                icon: "fas fa-language"
            },
            {
                id: "appointment",
                title: "Book an Appointment",
                description: "Steps to search for a doctor and book an appointment. Learn how to filter results by specialty, location, and time availability.",
                video: "videos/appointment.mp4",
                icon: "fas fa-calendar-check"
            },
            {
                id: "hospitals",
                title: "Find Hospitals",
                description: "How to find hospitals and clinics near you. Use an interactive map and advanced filters to find the best options.",
                video: "videos/hospitals.mp4",
                icon: "fas fa-hospital"
            },
            {
                id: "doctors",
                title: "Find Doctors",
                description: "How to search for doctors by specialty, ratings, and experience. Read reviews from previous patients and choose the right doctor for you.",
                video: "videos/doctors.mp4",
                icon: "fas fa-user-md"
            }
        ],
        buttons: {
            next: "Next",
            prev: "Previous",
            understand: "I Understand",
            replay: "Replay",
            close: "Close"
        }
    }
};

// بيانات شات البوت
const chatData = {
    ar: {
        initialQuestion: "مرحباً! كيف يمكنني مساعدتك اليوم؟",
        options: [
            "طريقة استخدام الموقع",
            "مشكلة في الموقع",
            "استفسار عن الخدمات",
            "التسجيل والدخول",
            "إعدادات الحساب"
        ],
        followUpQuestions: {
            "طريقة استخدام الموقع": [
                "طريقة استخدام الموقع كامل",
                "تغيير الثيم",
                "تغيير اللغة",
                "حجز موعد",
                "التسجيل",
                "نسيت الباسوورد",
                "رؤية المستشفيات",
                "رؤية الدكاترة"
            ],
            "مشكلة في الموقع": [
                "الموقع لا يعمل",
                "مشكلة في التسجيل",
                "مشكلة في الدفع",
                "مشكلة في حجز الموعد",
                "مشكلة تقنية أخرى"
            ],
            "استفسار عن الخدمات": [
                "خدمات المستشفيات",
                "خدمات الأطباء",
                "خدمات الطوارئ",
                "خدمات الصيدليات",
                "خدمات السجلات الطبية"
            ],
            "التسجيل والدخول": [
                "إنشاء حساب جديد",
                "تسجيل الدخول",
                "نسيت كلمة المرور",
                "تحديث البيانات الشخصية",
                "حذف الحساب"
            ],
            "إعدادات الحساب": [
                "تغيير كلمة المرور",
                "تحديث المعلومات الشخصية",
                "إعدادات الإشعارات",
                "ربط الحسابات",
                "خصوصية الحساب"
            ]
        }
    },
    en: {
        initialQuestion: "Hello! How can I help you today?",
        options: [
            "How to use the website",
            "Problem with the website",
            "Inquiry about services",
            "Registration and login",
            "Account settings"
        ],
        followUpQuestions: {
            "How to use the website": [
                "How to use the entire website",
                "Change theme",
                "Change language",
                "Book an appointment",
                "Registration",
                "Forgot password",
                "View hospitals",
                "View doctors"
            ],
            "Problem with the website": [
                "Website not working",
                "Registration problem",
                "Payment problem",
                "Appointment booking problem",
                "Other technical issue"
            ],
            "Inquiry about services": [
                "Hospital services",
                "Doctor services",
                "Emergency services",
                "Pharmacy services",
                "Medical records services"
            ],
            "Registration and login": [
                "Create new account",
                "Login",
                "Forgot password",
                "Update personal data",
                "Delete account"
            ],
            "Account settings": [
                "Change password",
                "Update personal information",
                "Notification settings",
                "Account linking",
                "Account privacy"
            ]
        }
    }
};

// النظام الرئيسي
class TutorialSystem {
    constructor() {
        this.currentLang = 'ar';
        this.currentSectionIndex = 0;
        this.isFirstVisit = true;
        this.forceTutorial = true; // تغيير هذا المتغير لتفعيل/إلغاء إجبار المشاهدة
        
        this.initializeElements();
        this.bindEvents();
        this.checkFirstVisit();
        this.loadSavedTheme();
    }

    initializeElements() {
        // العناصر الرئيسية
        this.supportBtn = document.getElementById('supportBtn');
        this.chatbot = document.getElementById('chatbot');
        this.closeChat = document.getElementById('closeChat');
        this.chatbotBody = document.getElementById('chatbotBody');
        this.tutorialModal = document.getElementById('tutorialModal');
        this.closeTutorial = document.getElementById('closeTutorial');
        this.tutorialSidebar = document.getElementById('tutorialSidebar');
        this.tutorialVideo = document.getElementById('tutorialVideo');
        this.videoPlaceholder = document.getElementById('videoPlaceholder');
        this.sectionTitle = document.getElementById('sectionTitle');
        this.sectionDescription = document.getElementById('sectionDescription');
        this.prevSectionBtn = document.getElementById('prevSection');
        this.nextSectionBtn = document.getElementById('nextSection');
        this.understandBtn = document.getElementById('understandBtn');
        this.replayTutorialBtn = document.getElementById('replayTutorial');
        this.langButtons = document.querySelectorAll('.lang-btn');
        this.tutorialTitle = document.getElementById('tutorialTitle');
    }

    bindEvents() {
        // أحداث الأزرار
        this.supportBtn.addEventListener('click', () => this.openChatbot());
        this.closeChat.addEventListener('click', () => this.closeChatbot());
        this.closeTutorial.addEventListener('click', () => this.closeTutorialModal());
        this.prevSectionBtn.addEventListener('click', () => this.previousSection());
        this.nextSectionBtn.addEventListener('click', () => this.nextSection());
        this.understandBtn.addEventListener('click', () => this.closeTutorialModal());
        this.replayTutorialBtn.addEventListener('click', () => this.replayTutorial());
        
        // أحداث تغيير اللغة
        this.langButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.changeLanguage(btn.dataset.lang);
            });
        });

        // إغلاق المودال عند النقر خارج المحتوى
        this.tutorialModal.addEventListener('click', (e) => {
            if (e.target === this.tutorialModal) {
                this.closeTutorialModal();
            }
        });

        // إغلاق الشات عند النقر خارج المحتوى
        document.addEventListener('click', (e) => {
            if (this.chatbot.style.display === 'block' && 
                !this.chatbot.contains(e.target) && 
                !this.supportBtn.contains(e.target)) {
                this.closeChatbot();
            }
        });
    }

    // التحقق من الزيارة الأولى
    checkFirstVisit() {
        const hasVisited = localStorage.getItem('serena_hasVisited');
        if (!hasVisited && this.forceTutorial) {
            this.isFirstVisit = true;
            localStorage.setItem('serena_hasVisited', 'true');
            
            // تأخير فتح المودال لضمان تحميل الصفحة بالكامل
            setTimeout(() => {
                this.openTutorial();
            }, 2000);
        } else {
            this.isFirstVisit = false;
        }
    }

    // فتح المودال التعليمي
    openTutorial(sectionId = null) {
        this.tutorialModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // إضافة تأثير الظهور
        setTimeout(() => {
            this.tutorialModal.classList.add('show');
        }, 10);
        
        if (sectionId) {
            const sectionIndex = tutorialData[this.currentLang].sections.findIndex(s => s.id === sectionId);
            if (sectionIndex !== -1) {
                this.currentSectionIndex = sectionIndex;
            }
        }
        
        this.renderTutorial();
        
        // إذا كانت الزيارة الأولى وأردنا إجبار المشاهدة
        if (this.isFirstVisit && this.forceTutorial) {
            this.understandBtn.style.display = 'none';
            this.nextSectionBtn.style.display = 'flex';
            this.prevSectionBtn.style.display = 'flex';
        } else {
            this.understandBtn.style.display = 'flex';
            this.nextSectionBtn.style.display = 'none';
            this.prevSectionBtn.style.display = 'none';
        }
    }

    // إغلاق المودال التعليمي
    closeTutorialModal() {
        this.tutorialModal.classList.remove('show');
        setTimeout(() => {
            this.tutorialModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }

    // عرض المحتوى التعليمي
    renderTutorial() {
        const data = tutorialData[this.currentLang];
        
        // تحديث العنوان
        this.tutorialTitle.textContent = data.title;
        
        // تحديث القائمة الجانبية
        this.tutorialSidebar.innerHTML = '';
        data.sections.forEach((section, index) => {
            const item = document.createElement('div');
            item.className = `sidebar-item ${index === this.currentSectionIndex ? 'active' : ''}`;
            item.innerHTML = `
                <i class="${section.icon}"></i>
                <span>${section.title}</span>
            `;
            item.addEventListener('click', () => {
                this.currentSectionIndex = index;
                this.renderTutorial();
            });
            this.tutorialSidebar.appendChild(item);
        });
        
        // تحديث المحتوى الرئيسي
        const currentSection = data.sections[this.currentSectionIndex];
        this.sectionTitle.textContent = currentSection.title;
        this.sectionDescription.textContent = currentSection.description;
        
        // تحديث الفيديو
        if (currentSection.video) {
            this.videoPlaceholder.style.display = 'flex';
            this.tutorialVideo.style.display = 'none';
            // في بيئة حقيقية، سيتم تحميل الفيديو هنا
            // this.tutorialVideo.src = currentSection.video;
        } else {
            this.videoPlaceholder.style.display = 'flex';
            this.tutorialVideo.style.display = 'none';
        }
        
        // تحديث الأزرار
        this.prevSectionBtn.innerHTML = `
            <i class="fas fa-arrow-right"></i>
            <span>${data.buttons.prev}</span>
        `;
        this.nextSectionBtn.innerHTML = `
            <span>${data.buttons.next}</span>
            <i class="fas fa-arrow-left"></i>
        `;
        this.understandBtn.innerHTML = `
            <span>${data.buttons.understand}</span>
            <i class="fas fa-check"></i>
        `;
        this.replayTutorialBtn.innerHTML = `
            <i class="fas fa-redo"></i>
            <span>${data.buttons.replay}</span>
        `;
        this.closeTutorial.innerHTML = `
            <span>${data.buttons.close}</span>
            <i class="fas fa-times"></i>
        `;
        
        // إظهار/إخفاء أزرار التقديم والتأخر
        this.prevSectionBtn.style.display = this.currentSectionIndex > 0 ? 'flex' : 'none';
        
        if (this.currentSectionIndex === data.sections.length - 1) {
            this.nextSectionBtn.style.display = 'none';
            if (this.isFirstVisit && this.forceTutorial) {
                this.understandBtn.style.display = 'flex';
            }
        } else {
            this.nextSectionBtn.style.display = 'flex';
        }
    }

    // القسم التالي
    nextSection() {
        if (this.currentSectionIndex < tutorialData[this.currentLang].sections.length - 1) {
            this.currentSectionIndex++;
            this.renderTutorial();
        }
    }

    // القسم السابق
    previousSection() {
        if (this.currentSectionIndex > 0) {
            this.currentSectionIndex--;
            this.renderTutorial();
        }
    }

    // إعادة التشغيل
    replayTutorial() {
        this.currentSectionIndex = 0;
        this.renderTutorial();
    }

    // فتح شات البوت
    openChatbot() {
        this.chatbot.style.display = 'block';
        setTimeout(() => {
            this.chatbot.classList.add('show');
        }, 10);
        this.renderChatbot();
    }

    // إغلاق شات البوت
    closeChatbot() {
        this.chatbot.classList.remove('show');
        setTimeout(() => {
            this.chatbot.style.display = 'none';
        }, 300);
    }

    // عرض محتوى شات البوت
    renderChatbot() {
        const data = chatData[this.currentLang];
        this.chatbotBody.innerHTML = '';
        
        // رسالة البوت الأولى
        const botMessage = document.createElement('div');
        botMessage.className = 'chat-message bot-message';
        botMessage.textContent = data.initialQuestion;
        this.chatbotBody.appendChild(botMessage);
        
        // خيارات المستخدم
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'options-container';
        
        data.options.forEach(option => {
            const optionBtn = document.createElement('div');
            optionBtn.className = 'option-btn';
            optionBtn.textContent = option;
            optionBtn.addEventListener('click', () => this.handleOptionSelect(option));
            optionsContainer.appendChild(optionBtn);
        });
        
        this.chatbotBody.appendChild(optionsContainer);
        
        // التمرير لأسفل
        this.chatbotBody.scrollTop = this.chatbotBody.scrollHeight;
    }

    // معالجة اختيار المستخدم في الشات
    handleOptionSelect(option) {
        const data = chatData[this.currentLang];
        
        // إضافة رسالة المستخدم
        const userMessage = document.createElement('div');
        userMessage.className = 'chat-message user-message';
        userMessage.textContent = option;
        this.chatbotBody.appendChild(userMessage);
        
        // إزالة الخيارات السابقة
        const optionsContainer = this.chatbotBody.querySelector('.options-container');
        if (optionsContainer) {
            optionsContainer.remove();
        }
        
        // التحقق إذا كان هناك أسئلة متابعة
        if (data.followUpQuestions[option]) {
            // إضافة رسالة البوت
            const botMessage = document.createElement('div');
            botMessage.className = 'chat-message bot-message';
            botMessage.textContent = this.currentLang === 'ar' 
                ? `حسناً، ${option}. هل استفسارك عن:`
                : `Okay, ${option}. Is your inquiry about:`;
            this.chatbotBody.appendChild(botMessage);
            
            // إضافة خيارات المتابعة
            const followUpContainer = document.createElement('div');
            followUpContainer.className = 'options-container';
            
            data.followUpQuestions[option].forEach(followUpOption => {
                const optionBtn = document.createElement('div');
                optionBtn.className = 'option-btn';
                optionBtn.textContent = followUpOption;
                optionBtn.addEventListener('click', () => this.handleFollowUpSelect(followUpOption, option));
                followUpContainer.appendChild(optionBtn);
            });
            
            this.chatbotBody.appendChild(followUpContainer);
        } else {
            // إذا لم يكن هناك أسئلة متابعة، نعرض رسالة افتراضية
            const botMessage = document.createElement('div');
            botMessage.className = 'chat-message bot-message';
            botMessage.textContent = this.currentLang === 'ar' 
                ? `شكراً لك على اختيار "${option}". كيف يمكنني مساعدتك بشكل أكثر تحديداً؟`
                : `Thank you for selecting "${option}". How can I assist you more specifically?`;
            this.chatbotBody.appendChild(botMessage);
        }
        
        // التمرير لأسفل
        this.chatbotBody.scrollTop = this.chatbotBody.scrollHeight;
    }

    // معالجة اختيار المتابعة في الشات
    handleFollowUpSelect(option, parentOption) {
        // إضافة رسالة المستخدم
        const userMessage = document.createElement('div');
        userMessage.className = 'chat-message user-message';
        userMessage.textContent = option;
        this.chatbotBody.appendChild(userMessage);
        
        // إزالة الخيارات السابقة
        const optionsContainer = this.chatbotBody.querySelector('.options-container');
        if (optionsContainer) {
            optionsContainer.remove();
        }
        
        // فتح القسم المناسب في المودال التعليمي
        let sectionId = null;
        
        const sectionMap = {
            'ar': {
                'تغيير الثيم': 'theme',
                'تغيير اللغة': 'language',
                'حجز موعد': 'appointment',
                'التسجيل': 'register',
                'نسيت الباسوورد': 'login',
                'رؤية المستشفيات': 'hospitals',
                'رؤية الدكاترة': 'doctors',
                'طريقة استخدام الموقع كامل': 'overview',
                'إنشاء حساب جديد': 'register',
                'تسجيل الدخول': 'login'
            },
            'en': {
                'Change theme': 'theme',
                'Change language': 'language',
                'Book an appointment': 'appointment',
                'Registration': 'register',
                'Forgot password': 'login',
                'View hospitals': 'hospitals',
                'View doctors': 'doctors',
                'How to use the entire website': 'overview',
                'Create new account': 'register',
                'Login': 'login'
            }
        };
        
        sectionId = sectionMap[this.currentLang][option];
        
        // إضافة رسالة البوت
        const botMessage = document.createElement('div');
        botMessage.className = 'chat-message bot-message';
        
        if (sectionId) {
            botMessage.textContent = this.currentLang === 'ar' 
                ? `سأفتح لك قسم "${option}" في الدليل التعليمي.`
                : `I'll open the "${option}" section in the tutorial guide.`;
            this.chatbotBody.appendChild(botMessage);
            
            // إغلاق الشات وفتح المودال
            setTimeout(() => {
                this.closeChatbot();
                this.openTutorial(sectionId);
            }, 1500);
        } else {
            botMessage.textContent = this.currentLang === 'ar' 
                ? `شكراً لك على تواصلك معنا بخصوص "${option}". فريق الدعم سيتواصل معك قريباً.`
                : `Thank you for contacting us about "${option}". Our support team will contact you soon.`;
            this.chatbotBody.appendChild(botMessage);
        }
        
        // التمرير لأسفل
        this.chatbotBody.scrollTop = this.chatbotBody.scrollHeight;
    }

    // تغيير اللغة
    changeLanguage(lang) {
        this.currentLang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        document.documentElement.lang = lang;
        
        // تحديث أزرار اللغة
        this.langButtons.forEach(btn => {
            if (btn.dataset.lang === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // إعادة عرض المحتوى
        if (this.tutorialModal.style.display === 'flex') {
            this.renderTutorial();
        }
        
        if (this.chatbot.style.display === 'block') {
            this.renderChatbot();
        }
    }

    // تحميل الثيم المحفوظ
    loadSavedTheme() {
        const savedTheme = localStorage.getItem('serena_theme');
        if (savedTheme === 'dark') {
            document.body.classList.add('dark-theme');
        }
    }

    // دالة لفتح المودال من الخارج
    openTutorialSection(sectionId) {
        this.openTutorial(sectionId);
    }

    // دالة لتغيير حالة إجبار المشاهدة
    setForceTutorial(force) {
        this.forceTutorial = force;
    }
}

// تهيئة النظام عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', () => {
    window.tutorialSystem = new TutorialSystem();
});

// دالة للاستخدام من الخارج
function openTutorial(sectionName = null) {
    if (window.tutorialSystem) {
        window.tutorialSystem.openTutorial(sectionName);
    }
}

// دالة لتغيير حالة إجبار المشاهدة
function setForceTutorial(force) {
    if (window.tutorialSystem) {
        window.tutorialSystem.setForceTutorial(force);
    }
}