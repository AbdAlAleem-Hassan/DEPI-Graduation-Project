// Enhanced Auth.js with validation and phone number API

// Bilingual Validation Messages
const validationMessages = {
    en: {
        required: 'This field is required',
        firstName: 'First name is required',
        lastName: 'Last name is required',
        emailUser: 'Invalid email username',
        emailDomain: 'Invalid domain',
        passwordRequired: 'Password is required',
        passwordWeak: 'Password is too weak',
        confirmPassword: 'Passwords do not match',
        confirmPasswordNotEmpty: 'Confirm password cannot be empty',
        phoneRequired: 'Phone number is required',
        phoneInvalid: 'Invalid phone number',
        phoneValidating: 'Validating...',
        phoneValid: 'Valid phone number',
        phoneValidationFailed: 'Validation failed',
        termsRequired: 'You must accept the terms and conditions',
        valid: 'Valid'
    },
    ar: {
        required: 'هذا الحقل مطلوب',
        firstName: 'الاسم الأول مطلوب',
        firstName: 'الاسم الآخير مطلوب',
        emailUser: 'اسم مستخدم البريد الإلكتروني غير صالح',
        emailDomain: 'نطاق البريد الإلكتروني غير صالح',
        passwordRequired: 'كلمة المرور مطلوبة',
        passwordWeak: 'كلمة المرور ضعيفة جداً',
        confirmPassword: 'كلمات المرور غير متطابقة',
        confirmPasswordNotEmpty: 'لا يمكن أن يكون تأكيد كلمة المرور فارغًا',
        phoneRequired: 'رقم الهاتف مطلوب',
        phoneInvalid: 'رقم الهاتف غير صالح',
        phoneValidating: 'جاري التحقق...',
        phoneValid: 'رقم هاتف صحيح',
        phoneValidationFailed: 'فشل التحقق',
        termsRequired: 'يجب الموافقة على الشروط والأحكام',
        valid: 'صحيح'
    }
};

// Password Strength Texts
const passwordStrengthTexts = {
    en: {
        weak: 'Weak',
        medium: 'Medium',
        strong: 'Strong'
    },
    ar: {
        weak: 'ضعيف',
        medium: 'متوسط',
        strong: 'قوي'
    }
};

// Get current language
function getCurrentLanguage() {
    const html = document.documentElement;
    return html.getAttribute('lang') === 'ar' ? 'ar' : 'en';
}

// Get localized message
function getMessage(key) {
    const lang = getCurrentLanguage();
    return validationMessages[lang][key] || validationMessages.en[key];
}

// Get localized password strength text
function getPasswordStrengthText(strength) {
    const lang = getCurrentLanguage();
    const texts = passwordStrengthTexts[lang];
    
    if (strength < 40) return texts.weak;
    if (strength < 70) return texts.medium;
    return texts.strong;
}

// Password Toggle
function initializePasswordToggles() {
    const passwordToggles = document.querySelectorAll('.password-toggle');
    
    passwordToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            const wrapper = e.target.closest('.password-input-wrapper');
            const input = wrapper.querySelector('input[type="password"], input[type="text"]');
            
            if (input.type === 'password') {
                input.type = 'text';
                toggle.innerHTML = '<i class="far fa-eye-slash"></i>';
                toggle.setAttribute('aria-label', getCurrentLanguage() === 'ar' ? 'إخفاء كلمة المرور' : 'Hide password');
            } else {
                input.type = 'password';
                toggle.innerHTML = '<i class="far fa-eye"></i>';
                toggle.setAttribute('aria-label', getCurrentLanguage() === 'ar' ? 'إظهار كلمة المرور' : 'Show password');
            }
            
            // Keep focus on input for better UX
            input.focus();
        });
    });
}

// Email Autocomplete Handling
function initializeEmailAutocomplete() {
    const emailUserInputs = document.querySelectorAll('input[id$="-email-user"]');
    const emailDomainInputs = document.querySelectorAll('input[id$="-email-domain"]');
    
    emailUserInputs.forEach((userInput, index) => {
        const domainInput = emailDomainInputs[index];
        
        // Enhanced event listeners for better autocomplete detection
        userInput.addEventListener('input', (e) => {
            // Check if this might be an autocomplete event
            if (e.inputType === 'insertReplacementText' || e.inputType === undefined) {
                setTimeout(() => {
                    handleEmailInput(userInput, domainInput);
                }, 100);
            } else {
                // Regular typing - check for @ symbol
                if (userInput.value.includes('@')) {
                    handleEmailInput(userInput, domainInput);
                }
            }
        });
        
        // Handle paste event
        userInput.addEventListener('paste', (e) => {
            setTimeout(() => {
                handleEmailInput(userInput, domainInput);
            }, 0);
        });
        
        // Handle change event (for form autofill)
        userInput.addEventListener('change', () => {
            setTimeout(() => {
                handleEmailInput(userInput, domainInput);
            }, 100);
        });
        
        // Handle blur event (when user leaves the field)
        userInput.addEventListener('blur', () => {
            setTimeout(() => {
                handleEmailInput(userInput, domainInput);
            }, 200);
        });
        
        // Additional: Listen for browser autofill events
        userInput.addEventListener('animationstart', (e) => {
            if (e.animationName === 'autoFillStart') {
                setTimeout(() => {
                    handleEmailInput(userInput, domainInput);
                }, 100);
            }
        });
    });

    // Also monitor the entire form for autofill
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('change', (e) => {
            if (e.target.id && e.target.id.includes('email')) {
                setTimeout(() => {
                    const userInput = document.getElementById(e.target.id.replace('-domain', '-user'));
                    const domainInput = document.getElementById(e.target.id.replace('-user', '-domain'));
                    if (userInput && domainInput) {
                        handleEmailInput(userInput, domainInput);
                    }
                }, 100);
            }
        });
    });
}

function handleEmailInput(userInput, domainInput) {
    const value = userInput.value.trim();
    
    if (value.includes('@')) {
        const parts = value.split('@');
        if (parts.length >= 2) {
            // Take the first part as username and the rest as domain
            userInput.value = parts[0];
            domainInput.value = parts.slice(1).join('@'); // In case there are multiple @ symbols
            
            // Only validate if user has interacted with form
            if (window.formHasInteracted) {
                validateField(userInput);
                validateField(domainInput);
            }
            
            // Dispatch change events to trigger any other listeners
            userInput.dispatchEvent(new Event('change', { bubbles: true }));
            domainInput.dispatchEvent(new Event('change', { bubbles: true }));
        }
    }
    
    // Also check if domain input has @ (shouldn't happen, but just in case)
    if (domainInput.value.includes('@')) {
        const domainValue = domainInput.value.trim();
        if (domainValue.includes('@')) {
            const domainParts = domainValue.split('@');
            if (domainParts.length >= 2) {
                // If user field is empty, put the first part there
                if (!userInput.value.trim()) {
                    userInput.value = domainParts[0];
                }
                domainInput.value = domainParts.slice(1).join('@');
                
                if (window.formHasInteracted) {
                    validateField(userInput);
                    validateField(domainInput);
                }
            }
        }
    }
}

// Password Strength Calculator
function calculatePasswordStrength(password) {
    let strength = 0;
    let feedback = [];
    
    // Length check
    if (password.length >= 8) strength += 25;
    else feedback.push('At least 8 characters');
    
    // Lowercase check
    if (/[a-z]/.test(password)) strength += 25;
    else feedback.push('Lowercase letters');
    
    // Uppercase check
    if (/[A-Z]/.test(password)) strength += 25;
    else feedback.push('Uppercase letters');
    
    // Numbers check
    if (/[0-9]/.test(password)) strength += 15;
    else feedback.push('Numbers');
    
    // Special characters check
    if (/[^A-Za-z0-9]/.test(password)) strength += 10;
    else feedback.push('Special characters');
    
    return { strength, feedback };
}

// Update Password Strength UI
function updatePasswordStrength(password, strengthBar, strengthText) {
    const { strength } = calculatePasswordStrength(password);
    
    // Only update if the password field has been interacted with
    const passwordField = document.getElementById(strengthBar.id.replace('-strength', ''));
    if (!passwordField || !passwordField.classList.contains('interacted')) return;
    
    // Update strength bar
    strengthBar.className = 'strength-bar';
    if (strength === 0) {
        strengthBar.style.width = '0%';
        strengthText.textContent = '';
        return;
    }
    if (strength < 40) {
        // strengthBar.style.width = '33%';
        strengthBar.classList.add('strength-weak');
        strengthText.textContent = getPasswordStrengthText(strength);
        strengthText.style.color = '#ef4444';
    } else if (strength < 70) {
        // strengthBar.style.width = '66%';
        strengthBar.classList.add('strength-medium');
        strengthText.textContent = getPasswordStrengthText(strength);
        strengthText.style.color = '#f59e0b';
    } else {
        // strengthBar.style.width = '100%';
        strengthBar.classList.add('strength-strong');
        strengthText.textContent = getPasswordStrengthText(strength);
        strengthText.style.color = '#10b981';
    }
    
    return strength >= 40; // Return true if password is acceptable
}

// Validation Functions
const validators = {
    required: (value) => {
        return value.trim() !== '' ? null : 'required';
    },

    'first-name': (value) => {
        if (!value.trim()) return 'required';
        if (!/^[a-zA-Z]+$/.test(value)) return 'firstName';
        return null;
    },
    
    'last-name': (value) => {
        if (!value.trim()) return 'required';
        if (!/^[a-zA-Z]+$/.test(value)) return 'lastName';
        return null;
    },
    
    'email-user': (value) => {
        if (!value.trim()) return ['emailUser'];
        if (!/^[a-zA-Z0-9._-]+$/.test(value)) return ['emailUser'];
        return null;
    },
    
    'email-domain': (value) => {
        if (!value.trim()) return ['emailDomain'];
        if (!/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value)) return ['emailDomain'];
        return null;
    },

    'email-complete': (value, element) => {
        const userInput = document.getElementById('register-email-user');
        const domainInput = document.getElementById('register-email-domain');
        
        const userValue = userInput.value.trim();
        const domainValue = domainInput.value.trim();
        
        let errors = [];
        
        if (!userValue) errors.push('emailUser');
        else if (!/^[a-zA-Z0-9._-]+$/.test(userValue)) errors.push('emailUser');
        
        if (!domainValue) errors.push('emailDomain');
        else if (!/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(domainValue)) errors.push('emailDomain');
        
        return errors.length > 0 ? errors : null;
    },
    
    password: (value, element) => {
        if (!value) return 'passwordRequired';
        const { strength } = calculatePasswordStrength(value);
        if (strength < 40) return 'passwordWeak';
        return null;
    },
    
    'confirm-password': (value, element) => {
        if (!value) return 'confirmPasswordNotEmpty';
        const password = document.getElementById('register-password').value;
        if (value !== password) return 'confirmPassword';
        return null;
    }
};

// Validate Field
function validateField(field) {
    // Don't validate if user hasn't interacted with this specific field
    if (!field.classList.contains('interacted')) return true;
    
    const validationType = field.getAttribute('data-validation');
    // console.log(validationType);
    const value = field.value;
    let validationMessage;
    if (validationType === 'password' || validationType === 'confirm-password') {
        validationMessage = field.parentElement.parentElement.querySelector('.validation-message');
    } else if (field.id.includes('email-user') || field.id.includes('email-domain')) {
        // لـ email fields، هنستخدم validation message واحد مشترك
        validationMessage = document.getElementById('register-email-validation');
    } else {
        validationMessage = field.parentElement.querySelector('.validation-message');
    }
    
    if (!validationType) return true;
    
    if (field.id.includes('email-user') || field.id.includes('email-domain')) {
        return validateEmailFields();
    }
    
    const errorKey = validators[validationType] ? validators[validationType](value, field) : null;
    
    if (errorKey) {
        field.classList.add('error');
        field.classList.remove('success');
        if (Array.isArray(errorKey)) {
            const errorMessages = errorKey.map(key => getMessage(key)).join(', ');
            validationMessage.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${errorMessages}`;
        } else {
            validationMessage.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${getMessage(errorKey)}`;
        }
        
        validationMessage.className = 'validation-message validation-error';
        return false;
    } else {
        field.classList.remove('error');
        field.classList.add('success');
        validationMessage.innerHTML = `<i class="fas fa-check-circle"></i> ${getMessage('valid')}`;
        validationMessage.className = 'validation-message validation-success';
        return true;
    }
}


function validateEmailFields() {
    // تحديد ال form الحالي (register أو login)
    const formPrefix = document.getElementById('register-email-user') ? 'register' : 'login';
    
    const userInput = document.getElementById(`${formPrefix}-email-user`);
    const domainInput = document.getElementById(`${formPrefix}-email-domain`);
    const validationMessage = document.getElementById(`${formPrefix}-email-validation`);
    
    // لو مش موجودين (مثلاً في صفحة تانيه) نرجع true
    if (!userInput || !domainInput || !validationMessage) return true;
    
    const userValue = userInput.value.trim();
    const domainValue = domainInput.value.trim();
    
    let errors = [];
    
    // التحقق من user part
    if (!userValue) {
        errors.push('emailUser');
    } else if (!/^[a-zA-Z0-9._-]+$/.test(userValue)) {
        errors.push('emailUser');
    }
    
    // التحقق من domain part
    if (!domainValue) {
        errors.push('emailDomain');
    } else if (!/^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(domainValue)) {
        errors.push('emailDomain');
    }
    
    if (errors.length > 0) {
        userInput.classList.add('error');
        domainInput.classList.add('error');
        userInput.classList.remove('success');
        domainInput.classList.remove('success');
        
        const errorMessages = errors.map(key => getMessage(key)).join(', ');
        validationMessage.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${errorMessages}`;
        validationMessage.className = 'validation-message validation-error';
        return false;
    } else {
        userInput.classList.remove('error');
        domainInput.classList.remove('error');
        userInput.classList.add('success');
        domainInput.classList.add('success');
        validationMessage.innerHTML = `<i class="fas fa-check-circle"></i> ${getMessage('valid')}`;
        validationMessage.className = 'validation-message validation-success';
        return true;
    }
}

// Enhanced phone input initialization
function initializePhoneInput() {
    const phoneInput = document.getElementById('register-phone');
    if (phoneInput) {
        // Ensure the input has proper classes
        phoneInput.classList.add('phone-input-with-flag');
        
        const iti = window.intlTelInput(phoneInput, {
            initialCountry: "auto",
            geoIpLookup: function(callback) {
                fetch('https://ipapi.co/json/')
                    .then(res => res.json())
                    .then(data => callback(data.country_code))
                    .catch(() => callback('us'));
            },
            utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
            separateDialCode: true,
            preferredCountries: ['us', 'gb', 'ca', 'au', 'ae', 'sa', 'eg'],
            customPlaceholder: function(selectedCountryPlaceholder, selectedCountryData) {
                return "e.g. " + selectedCountryPlaceholder;
            },
            // Additional options for better full-width display
            nationalMode: false,
            autoPlaceholder: "aggressive"
        });
        
        // Style the dropdown after initialization
        setTimeout(() => {
            stylePhoneDropdown();
        }, 100);
        
        // Validate phone number only if user has interacted
        phoneInput.addEventListener('blur', function() {
            if (window.formHasInteracted) {
                validatePhoneNumber(iti, phoneInput);
            }
        });
        
        // Also validate on country change only if user has interacted
        phoneInput.addEventListener('countrychange', function() {
            if (window.formHasInteracted) {
                validatePhoneNumber(iti, phoneInput);
            }
        });
        
        // // Ensure proper width on load and resize
        // window.addEventListener('resize', () => {
        //     iti._updatePlaceholder();
        // });
        
        return iti;
    }
    return null;
}

// Style phone dropdown
function stylePhoneDropdown() {
    const dropdown = document.querySelector('.iti__country-list');
    if (dropdown) {
        const primaryWhite = getComputedStyle(document.documentElement).getPropertyValue('--primary-white').trim();
        const charcoal = getComputedStyle(document.documentElement).getPropertyValue('--charcoal').trim();
        const softWhite = getComputedStyle(document.documentElement).getPropertyValue('--soft-white').trim();
        
        dropdown.style.background = primaryWhite || '#ffffff';
        dropdown.style.border = '1px solid #cbd5e1';
        dropdown.style.borderRadius = '0.75rem';
        dropdown.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.15)';
        
        if (document.body.classList.contains('dark-mode')) {
            dropdown.style.background = charcoal || '#1e293b';
            dropdown.style.borderColor = '#475569';
            dropdown.style.color = softWhite || '#f8fafc';
        }
    }
}

// Validate Phone Number using API
async function validatePhoneNumber(iti, phoneInput) {
    // Don't validate if user hasn't interacted with form
    if (!window.formHasInteracted) return true;
    
    const validationMessage = phoneInput.parentElement.parentElement.querySelector('.validation-message');
    const phoneNumber = phoneInput.value;
    
    if (!phoneNumber.trim()) {
        validationMessage.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${getMessage('phoneRequired')}`;
        validationMessage.className = 'validation-message validation-error';
        phoneInput.classList.add('error');
        phoneInput.classList.remove('success');
        return false;
    }
    
    if (!iti.isValidNumber()) {
        validationMessage.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${getMessage('phoneInvalid')}`;
        validationMessage.className = 'validation-message validation-error';
        phoneInput.classList.add('error');
        phoneInput.classList.remove('success');
        return false;
    }
    
    // Show loading state
    validationMessage.innerHTML = `<i class="fas fa-spinner loading-spinner"></i> ${getMessage('phoneValidating')}`;
    validationMessage.className = 'validation-message';
    
    try {
        // Using NumVerify API (you'll need to get a free API key)
        const countryCode = iti.getSelectedCountryData().iso2;
        const formattedNumber = iti.getNumber();
        
        // For demo purposes, we'll simulate API validation
        // In production, replace with actual API call
        const isValid = await simulatePhoneValidation(formattedNumber, countryCode);
        
        if (isValid) {
            validationMessage.innerHTML = `<i class="fas fa-check-circle"></i> ${getMessage('phoneValid')}`;
            validationMessage.className = 'validation-message validation-success';
            phoneInput.classList.remove('error');
            phoneInput.classList.add('success');
            return true;
        } else {
            validationMessage.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${getMessage('phoneInvalid')}`;
            validationMessage.className = 'validation-message validation-error';
            phoneInput.classList.add('error');
            phoneInput.classList.remove('success');
            return false;
        }
    } catch (error) {
        console.error('Phone validation error:', error);
        validationMessage.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${getMessage('phoneValidationFailed')}`;
        validationMessage.className = 'validation-message validation-error';
        phoneInput.classList.add('error');
        phoneInput.classList.remove('success');
        return false;
    }
}

// Simulate phone validation (replace with actual API call)
async function simulatePhoneValidation(phoneNumber, countryCode) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simple validation logic - in production, use a service like NumVerify
    const validPrefixes = {
        'us': ['+1'],
        'gb': ['+44'],
        'ca': ['+1'],
        'au': ['+61'],
        'ae': ['+971'],
        'sa': ['+966'],
        'eg': ['+20'],
        'jo': ['+962'],
        'lb': ['+961'],
        'qa': ['+974'],
        'kw': ['+965'],
        'bh': ['+973'],
        'om': ['+968']
        // Add more country codes as needed
    };
    
    const prefixes = validPrefixes[countryCode] || [];
    return prefixes.some(prefix => phoneNumber.startsWith(prefix));
}

// Form Submission Handlers
function initializeFormHandlers() {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    
    // Real-time validation - only if user has interacted
    document.querySelectorAll('input[data-validation]').forEach(input => {
        input.addEventListener('input', () => {
            // Mark as interacted on first input
            if (!input.classList.contains('interacted')) {
                input.classList.add('interacted');
            }
            
            validateField(input);
            
            // Special handling for password strength
            if (input.id.includes('password') && !input.id.includes('confirm')) {
                const strengthBar = document.getElementById(`${input.id}-strength`);
                const strengthText = document.getElementById(`${input.id}-strength-text`);
                if (strengthBar && strengthText) {
                    updatePasswordStrength(input.value, strengthBar, strengthText);
                }
            }
        });
        
        input.addEventListener('blur', () => {
            // Mark as interacted on blur
            if (!input.classList.contains('interacted')) {
                input.classList.add('interacted');
            }
            validateField(input);
        });
    });
    
    // Checkbox validation
    const termsCheckbox = document.getElementById('terms');
    if (termsCheckbox) {
        termsCheckbox.addEventListener('change', () => {
            // Mark as interacted on change
            if (!termsCheckbox.classList.contains('interacted')) {
                termsCheckbox.classList.add('interacted');
            }
            
            if (window.formHasInteracted) {
                if (!termsCheckbox.checked) {
                    termsCheckbox.classList.add('error');
                    termsCheckbox.classList.remove('success');
                    const validationMessage = document.getElementById('terms-validation');
                    validationMessage.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${getMessage('termsRequired')}`;
                    validationMessage.className = 'validation-message validation-error';
                    return false;
                } else {
                    termsCheckbox.classList.remove('error');
                    termsCheckbox.classList.add('success');
                    const validationMessage = document.getElementById('terms-validation');
                    validationMessage.innerHTML = `<i class="fas fa-check-circle"></i> ${getMessage('valid')}`;
                    validationMessage.className = 'validation-message validation-success';
                    return true;
                }
            }
        });
    }
    
    // Login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Set form as interacted when submitting
            window.formHasInteracted = true;
            
            // Mark all fields as interacted on form submission
            loginForm.querySelectorAll('input[data-validation]').forEach(input => {
                input.classList.add('interacted');
            });
            
            const submitBtn = document.getElementById('login-submit');
            const btnText = submitBtn.querySelector('.btn-text');
            const spinner = submitBtn.querySelector('.loading-spinner');
            
            // Validate all fields
            const fields = loginForm.querySelectorAll('input[data-validation]');
            let isValid = true;

            for (const field of fields) {
                if (field.id.includes('email-user') || field.id.includes('email-domain')) {
                    continue; // تجاهل email fields
                } else {
                    if (!validateField(field)) isValid = false;
                }
            }

            // التحقق من email fields بشكل منفصل لل login
            if (!validateEmailFields()) isValid = false;
            
            if (!isValid) {
                showNotification(getCurrentLanguage() === 'ar' ? 'يرجى ملء جميع الحقول بشكل صحيح قبل الإرسال' : 'Please fill all fields correctly before submitting', 'error');
                return;
            }

            // Show loading state
            btnText.style.display = 'none';
            spinner.style.display = 'inline-block';
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');
            
            // Simulate API call
            try {
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Get form data
                const formData = {
                    email: `${document.getElementById('login-email-user').value}@${document.getElementById('login-email-domain').value}`,
                    password: document.getElementById('login-password').value
                };
                
                console.log('Login form data:', formData);
                showNotification(getCurrentLanguage() === 'ar' ? 'تم تسجيل الدخول بنجاح!' : 'Login successful!', 'success');
                
                // Redirect to dashboard or home page
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
                
            } catch (error) {
                console.error('Login error:', error);
                showNotification(getCurrentLanguage() === 'ar' ? 'فشل تسجيل الدخول. يرجى المحاولة مرة أخرى.' : 'Login failed. Please try again.', 'error');
            } finally {
                // Reset loading state
                btnText.style.display = 'inline-block';
                spinner.style.display = 'none';
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
            }
        });
    }
    
    // Register form submission
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Set form as interacted when submitting
            window.formHasInteracted = true;
            
            // Mark all fields as interacted on form submission
            registerForm.querySelectorAll('input[data-validation], #terms').forEach(field => {
                field.classList.add('interacted');
            });
            
            const submitBtn = document.getElementById('register-submit');
            const btnText = submitBtn.querySelector('.btn-text');
            const spinner = submitBtn.querySelector('.loading-spinner');
            const phoneIti = window.phoneIti; // Get the phone input instance
            
            // Validate all fields
            const fields = registerForm.querySelectorAll('input[data-validation], #terms');
            let isValid = true;

            for (const field of fields) {
                if (field.id.includes('email-user') || field.id.includes('email-domain')) {
                    // تجاهل ال validation الفردي لـ email fields لأننا بنعملها جماعية
                    continue; // هنا continue هتشتغل عادي
                } else if (field.type === 'checkbox') {
                    if (!field.checked) {
                        field.classList.add('error');
                        field.classList.remove('success');
                        const validationMessage = document.getElementById('terms-validation');
                        validationMessage.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${getMessage('termsRequired')}`;
                        validationMessage.className = 'validation-message validation-error';
                        isValid = false;
                    }
                } else if (field.type === 'tel') {
                    if (phoneIti) {
                        const phoneValid = await validatePhoneNumber(phoneIti, field);
                        if (!phoneValid) isValid = false;
                    }
                } else {
                    if (!validateField(field)) isValid = false;
                }
            }
            if (!validateEmailFields()) isValid = false;
            
            // Validate phone number
            if (phoneIti) {
                const phoneValid = await validatePhoneNumber(phoneIti, document.getElementById('register-phone'));
                if (!phoneValid) isValid = false;
            }
            
            if (!isValid) {
                showNotification(getCurrentLanguage() === 'ar' ? 'يرجى ملء جميع الحقول بشكل صحيح قبل الإرسال' : 'Please fill all fields correctly before submitting', 'error');
                return;
            }
            
            // Show loading state
            btnText.style.display = 'none';
            spinner.style.display = 'inline-block';
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');
            
            // Simulate API call
            try {
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Get form data
                const formData = {
                    firstName: document.getElementById('register-firstname').value,
                    lastName: document.getElementById('register-lastname').value,
                    email: `${document.getElementById('register-email-user').value}@${document.getElementById('register-email-domain').value}`,
                    phone: phoneIti ? phoneIti.getNumber() : document.getElementById('register-phone').value,
                    password: document.getElementById('register-password').value
                };
                
                console.log('Register form data:', formData);
                showNotification(getCurrentLanguage() === 'ar' ? 'تم التسجيل بنجاح!' : 'Registration successful!', 'success');
                
                // Redirect to login page
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 1000);
                
            } catch (error) {
                console.error('Registration error:', error);
                showNotification(getCurrentLanguage() === 'ar' ? 'فشل التسجيل. يرجى المحاولة مرة أخرى.' : 'Registration failed. Please try again.', 'error');
            } finally {
                // Reset loading state
                btnText.style.display = 'inline-block';
                spinner.style.display = 'none';
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
            }
        });
    }
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.auth-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `auth-notification auth-notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 0.75rem;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `;
    
    // Close button
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
    
    document.body.appendChild(notification);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 0.25rem;
        transition: background-color 0.2s;
    }
    
    .notification-close:hover {
        background: rgba(255, 255, 255, 0.2);
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .loading {
        opacity: 0.7;
        pointer-events: none;
    }
`;
document.head.appendChild(style);

// Social Login Buttons
function initializeSocialButtons() {
    const socialButtons = document.querySelectorAll('.social-btn');
    
    socialButtons.forEach(button => {
        button.addEventListener('click', () => {
            const platform = button.querySelector('.fa-facebook-f') ? 'Facebook' :
                            button.querySelector('.fa-twitter') ? 'Twitter' :
                            button.querySelector('.fa-apple') ? 'Apple' :
                            button.querySelector('img[alt="Google"]') ? 'Google' : 'Unknown';
            
            console.log(`${platform} login clicked`);
            showNotification(getCurrentLanguage() === 'ar' ? 
                `تسجيل الدخول عبر ${platform} غير متوفر بعد` : 
                `${platform} login is not yet implemented`, 'info');
        });
    });
}

// Update validation messages when language changes
function updateValidationMessages() {
    // Only update if user has interacted with form
    if (!window.formHasInteracted) return;
    
    // Re-validate all interacted fields to update messages
    document.querySelectorAll('input[data-validation].interacted').forEach(field => {
        validateField(field);
    });
    
    // Update password strength texts for interacted fields
    const registerPassword = document.getElementById('register-password');
    if (registerPassword && registerPassword.classList.contains('interacted')) {
        const strengthBar = document.getElementById('register-password-strength');
        const strengthText = document.getElementById('register-password-strength-text');
        if (strengthBar && strengthText) {
            const { strength } = calculatePasswordStrength(registerPassword.value);
            strengthText.textContent = getPasswordStrengthText(strength);
        }
    }
    
    const loginPassword = document.getElementById('login-password');
    if (loginPassword && loginPassword.classList.contains('interacted')) {
        const strengthBar = document.getElementById('login-password-strength');
        const strengthText = document.getElementById('login-password-strength-text');
        if (strengthBar && strengthText) {
            const { strength } = calculatePasswordStrength(loginPassword.value);
            strengthText.textContent = getPasswordStrengthText(strength);
        }
    }
}

// Initialize auth functionality
document.addEventListener('DOMContentLoaded', () => {
    initializePasswordToggles();
    window.phoneIti = initializePhoneInput();
    initializeFormHandlers();
    initializeEmailAutocomplete();
    initializeSocialButtons();
    
    // Set up real-time password strength for register form
    const registerPassword = document.getElementById('register-password');
    if (registerPassword) {
        registerPassword.addEventListener('input', () => {
            // Mark as interacted on first input
            if (!registerPassword.classList.contains('interacted')) {
                registerPassword.classList.add('interacted');
            }
            
            const strengthBar = document.getElementById('register-password-strength');
            const strengthText = document.getElementById('register-password-strength-text');
            if (strengthBar && strengthText) {
                updatePasswordStrength(registerPassword.value, strengthBar, strengthText);
            }
        });
    }
    
    // Set up real-time password strength for login form
    const loginPassword = document.getElementById('login-password');
    if (loginPassword) {
        loginPassword.addEventListener('input', () => {
            // Mark as interacted on first input
            if (!loginPassword.classList.contains('interacted')) {
                loginPassword.classList.add('interacted');
            }
            
            const strengthBar = document.getElementById('login-password-strength');
            const strengthText = document.getElementById('login-password-strength-text');
            if (strengthBar && strengthText) {
                updatePasswordStrength(loginPassword.value, strengthBar, strengthText);
            }
        });
    }
    
    // Re-style phone dropdown when theme changes
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            setTimeout(stylePhoneDropdown, 100);
        });
    }
    
    // Additional: Periodic check for autofill (fallback)
    setTimeout(() => {
        checkForAutofilledEmails();
    }, 500);
    
    // Check again after a longer delay (for slower autofill)
    setTimeout(() => {
        checkForAutofilledEmails();
    }, 2000);
});

// Fallback function to check for autofilled emails
function checkForAutofilledEmails() {
    const emailUserInputs = document.querySelectorAll('input[id$="-email-user"]');
    const emailDomainInputs = document.querySelectorAll('input[id$="-email-domain"]');
    
    emailUserInputs.forEach((userInput, index) => {
        const domainInput = emailDomainInputs[index];
        if (userInput.value.includes('@')) {
            handleEmailInput(userInput, domainInput);
        }
    });
}

// Export functions for global access (if needed)
window.authModule = {
    validateField,
    updatePasswordStrength,
    validatePhoneNumber,
    showNotification,
    getCurrentLanguage,
    getMessage,
    updateValidationMessages,
    calculatePasswordStrength // Added this
};