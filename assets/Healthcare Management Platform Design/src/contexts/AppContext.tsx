import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'light' | 'dark';
type Language = 'en' | 'ar';
type ColorTheme = 'blue' | 'green' | 'purple';

interface AppContextType {
  theme: Theme;
  language: Language;
  colorTheme: ColorTheme;
  setTheme: (theme: Theme) => void;
  setLanguage: (language: Language) => void;
  setColorTheme: (colorTheme: ColorTheme) => void;
  toggleTheme: () => void;
  toggleLanguage: () => void;
  t: (key: string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navbar
    home: 'Home',
    services: 'Services',
    findHospital: 'Find Hospital',
    findDoctors: 'Find Doctors',
    blogs: 'Blogs',
    reviews: 'Reviews',
    aboutUs: 'About Us',
    contactUs: 'Contact Us',
    login: 'Login',
    register: 'Register',
    
    // Hero
    heroTitle: 'Next-Generation Healthcare',
    heroSubtitle: 'Connect with top hospitals and doctors across the network',
    bookAppointment: 'Book Appointment',
    explorePlatform: 'Explore Platform',
    
    // Sections
    topHospitals: 'Top Hospitals',
    topDoctors: 'Top Doctors',
    aboutSerena: 'About Serena',
    patientReviews: 'Patient Reviews',
    contactForm: 'Contact Us',
    
    // Dashboard
    dashboard: 'Dashboard',
    patients: 'Patients',
    appointments: 'Appointments',
    messages: 'Messages',
    profile: 'Profile',
    settings: 'Settings',
    logout: 'Logout',
    
    // Auth
    email: 'Email',
    password: 'Password',
    rememberMe: 'Remember Me',
    forgotPassword: 'Forgot Password?',
    noAccount: "Don't have an account?",
    haveAccount: 'Already have an account?',
    signUp: 'Sign Up',
    signIn: 'Sign In',
    
    // Common
    viewAll: 'View All',
    learnMore: 'Learn More',
    getStarted: 'Get Started',
    specialty: 'Specialty',
    location: 'Location',
    rating: 'Rating',
    search: 'Search',
  },
  ar: {
    // Navbar
    home: 'الرئيسية',
    services: 'الخدمات',
    findHospital: 'البحث عن مستشفى',
    findDoctors: 'البحث عن أطباء',
    blogs: 'المدونة',
    reviews: 'التقييمات',
    aboutUs: 'من نحن',
    contactUs: 'اتصل بنا',
    login: 'تسجيل الدخول',
    register: 'التسجيل',
    
    // Hero
    heroTitle: 'الرعاية الصحية من الجيل القادم',
    heroSubtitle: 'تواصل مع أفضل المستشفيات والأطباء عبر الشبكة',
    bookAppointment: 'احجز موعد',
    explorePlatform: 'استكشف المنصة',
    
    // Sections
    topHospitals: 'أفضل المستشفيات',
    topDoctors: 'أفضل الأطباء',
    aboutSerena: 'عن سيرينا',
    patientReviews: 'آراء المرضى',
    contactForm: 'اتصل بنا',
    
    // Dashboard
    dashboard: 'لوحة التحكم',
    patients: 'المرضى',
    appointments: 'المواعيد',
    messages: 'الرسائل',
    profile: 'الملف الشخصي',
    settings: 'الإعدادات',
    logout: 'تسجيل الخروج',
    
    // Auth
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    rememberMe: 'تذكرني',
    forgotPassword: 'نسيت كلمة المرور؟',
    noAccount: 'ليس لديك حساب؟',
    haveAccount: 'لديك حساب بالفعل؟',
    signUp: 'إنشاء حساب',
    signIn: 'تسجيل الدخول',
    
    // Common
    viewAll: 'عرض الكل',
    learnMore: 'اعرف المزيد',
    getStarted: 'ابدأ الآن',
    specialty: 'التخصص',
    location: 'الموقع',
    rating: 'التقييم',
    search: 'بحث',
  },
};

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light');
  const [language, setLanguage] = useState<Language>('en');
  const [colorTheme, setColorTheme] = useState<ColorTheme>('blue');

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    root.setAttribute('dir', language === 'ar' ? 'rtl' : 'ltr');
  }, [theme, language]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'ar' : 'en');
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <AppContext.Provider value={{
      theme,
      language,
      colorTheme,
      setTheme,
      setLanguage,
      setColorTheme,
      toggleTheme,
      toggleLanguage,
      t,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
