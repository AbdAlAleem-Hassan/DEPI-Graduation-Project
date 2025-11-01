// injector.js - Unified Theme and Language System
(function() {
    'use strict';
    
    // نظام الثيم الموحد
    class UnifiedThemeSystem {
        constructor() {
            this.currentTheme = this.getSavedTheme();
            this.currentLang = this.getSavedLang();
            this.init();
        }
        
        init() {
            this.applyTheme(this.currentTheme);
            this.applyLanguage(this.currentLang);
            this.injectTutorialStyles();
            this.fixCSSVariables();
        }
        
        getSavedTheme() {
            return localStorage.getItem('theme') || 
                   (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        }
        
        getSavedLang() {
            return localStorage.getItem('lang') || 'ar';
        }
        
        applyTheme(theme) {
            // إزالة جميع كلاسات الثيم
            document.documentElement.classList.remove('dark-mode', 'dark-theme');
            
            // تطبيق الثيم الموحد
            if (theme === 'dark') {
                document.documentElement.classList.add('dark-mode');
                document.documentElement.setAttribute('data-user-theme', 'dark');
            } else {
                document.documentElement.classList.remove('dark-mode');
                document.documentElement.setAttribute('data-user-theme', 'light');
            }
            
            // حفظ الإعداد
            localStorage.setItem('theme', theme);
        }
        
        applyLanguage(lang) {
            const html = document.documentElement;
            html.setAttribute('lang', lang);
            html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
            
            // تطبيق على body أيضاً
            if (lang === 'ar') {
                document.body.classList.add('rtl');
            } else {
                document.body.classList.remove('rtl');
            }
            
            localStorage.setItem('lang', lang);
            this.updateTextContent(lang);
        }
        
        updateTextContent(lang) {
            // تحديث النصوص متعددة اللغات
            const elements = document.querySelectorAll('[data-en], [data-ar]');
            elements.forEach(element => {
                if (lang === 'ar' && element.hasAttribute('data-ar')) {
                    element.textContent = element.getAttribute('data-ar');
                } else if (lang === 'en' && element.hasAttribute('data-en')) {
                    element.textContent = element.getAttribute('data-en');
                }
            });
            
            // تحديث placeholders
            const inputs = document.querySelectorAll('input, textarea');
            inputs.forEach(input => {
                if (lang === 'ar' && input.hasAttribute('data-ar')) {
                    input.placeholder = input.getAttribute('data-ar');
                } else if (lang === 'en' && input.hasAttribute('data-en')) {
                    input.placeholder = input.getAttribute('data-en');
                }
            });
        }
        
        injectTutorialStyles() {
            // حقن CSS variables المفقودة لنظام التعليمات
            const style = document.createElement('style');
            style.textContent = `
                :root {
                    --primary-color: #3B82F6;
                    --secondary-color: #10B981;
                    --card-bg: var(--primary-white);
                    --bg-color: var(--primary-white);
                    --text-color: var(--text-dark);
                    --overlay-bg: rgba(0, 0, 0, 0.5);
                }
                
                .dark-mode {
                    --card-bg: #1E293B;
                    --bg-color: #0F172A;
                    --text-color: #F8FAFC;
                    --overlay-bg: rgba(0, 0, 0, 0.7);
                }
            `;
            document.head.appendChild(style);
        }
        
        fixCSSVariables() {
            // إصلاح التعارض في CSS variables
            const style = document.createElement('style');
            style.textContent = `
                /* توحيد نظام الثيم */
                .dark-theme {
                    /* تحويل dark-theme إلى dark-mode */
                    --primary-white: #0F172A !important;
                    --light-gray: #1E293B !important;
                    --text-dark: #F8FAFC !important;
                }
                
                /* التأكد من أن نظام التعليمات يستخدم المتغيرات الصحيحة */
                .support-btn,
                .chatbot-container,
                .tutorial-modal {
                    background: var(--primary-white) !important;
                    color: var(--text-dark) !important;
                }
                
                .dark-mode .support-btn,
                .dark-mode .chatbot-container,
                .dark-mode .tutorial-modal {
                    background: var(--primary-white) !important;
                    color: var(--text-dark) !important;
                }
            `;
            document.head.appendChild(style);
        }
        
        toggleTheme() {
            this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
            this.applyTheme(this.currentTheme);
        }
        
        toggleLanguage() {
            this.currentLang = this.currentLang === 'ar' ? 'en' : 'ar';
            this.applyLanguage(this.currentLang);
        }
    }
    
    // تهيئة النظام عند تحميل الصفحة
    document.addEventListener('DOMContentLoaded', function() {
        window.unifiedThemeSystem = new UnifiedThemeSystem();
        
        // دمج مع نظام التعليمات إذا كان موجوداً
        if (window.tutorialSystem) {
            window.tutorialSystem.changeLanguage = function(lang) {
                window.unifiedThemeSystem.applyLanguage(lang);
            };
        }
    });
    
    // APIs للاستخدام من الأنظمة الأخرى
    window.UnifiedTheme = {
        toggleTheme: function() {
            if (window.unifiedThemeSystem) {
                window.unifiedThemeSystem.toggleTheme();
            }
        },
        toggleLanguage: function() {
            if (window.unifiedThemeSystem) {
                window.unifiedThemeSystem.toggleLanguage();
            }
        },
        getCurrentTheme: function() {
            return window.unifiedThemeSystem?.currentTheme || 'light';
        },
        getCurrentLanguage: function() {
            return window.unifiedThemeSystem?.currentLang || 'ar';
        }
    };
})();