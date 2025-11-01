import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, User, Eye, EyeOff, UserCircle, Hospital, Stethoscope } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';

const userRoles = [
  {
    id: 'patient',
    icon: UserCircle,
    title: 'Patient',
    titleAr: 'مريض',
    description: 'Book appointments and manage health records',
    descriptionAr: 'احجز المواعيد وأدر السجلات الصحية',
  },
  {
    id: 'doctor',
    icon: Stethoscope,
    title: 'Doctor',
    titleAr: 'طبيب',
    description: 'Manage patients and appointments',
    descriptionAr: 'إدارة المرضى والمواعيد',
  },
  {
    id: 'hospital',
    icon: Hospital,
    title: 'Hospital Admin',
    titleAr: 'مسؤول مستشفى',
    description: 'Manage hospital operations',
    descriptionAr: 'إدارة عمليات المستشفى',
  },
];

export function AuthRegister() {
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState('patient');
  const { theme, language, t } = useApp();
  const isArabic = language === 'ar';

  return (
    <div className={`min-h-screen flex items-center justify-center py-12 ${
      theme === 'dark' ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900' : 'bg-gradient-to-br from-blue-50 via-white to-emerald-50'
    }`}>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 w-full max-w-2xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`p-8 rounded-3xl backdrop-blur-lg ${
            theme === 'dark' ? 'bg-slate-800/80' : 'bg-white/80'
          } shadow-2xl`}
        >
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
                <span className="text-white text-2xl">S</span>
              </div>
              <div className="flex flex-col">
                <span className={`text-2xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  Serena
                </span>
                {isArabic && (
                  <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    سيرينا
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Title */}
          <h2 className={`text-3xl text-center mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {isArabic ? 'إنشاء حساب' : 'Create Account'}
          </h2>
          <p className={`text-center mb-8 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {isArabic ? 'اختر نوع الحساب للبدء' : 'Choose your account type to get started'}
          </p>

          {/* Role Selection */}
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            {userRoles.map((role) => (
              <motion.div
                key={role.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Card
                  onClick={() => setSelectedRole(role.id)}
                  className={`p-4 cursor-pointer transition-all ${
                    selectedRole === role.id
                      ? 'border-2 border-blue-500 bg-gradient-to-br from-blue-500/10 to-emerald-500/10'
                      : theme === 'dark' ? 'bg-slate-700 border-slate-600' : 'bg-white'
                  }`}
                >
                  <div className="flex flex-col items-center text-center">
                    <div className={`w-12 h-12 rounded-xl mb-3 flex items-center justify-center ${
                      selectedRole === role.id
                        ? 'bg-gradient-to-br from-blue-500 to-emerald-500'
                        : theme === 'dark' ? 'bg-slate-600' : 'bg-gray-200'
                    }`}>
                      <role.icon className={`w-6 h-6 ${
                        selectedRole === role.id ? 'text-white' : theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                      }`} />
                    </div>
                    <h3 className={`mb-1 ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}>
                      {isArabic ? role.titleAr : role.title}
                    </h3>
                    <p className={`text-xs ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {isArabic ? role.descriptionAr : role.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Form */}
          <form className="space-y-4">
            {/* Name */}
            <div>
              <label className={`block text-sm mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {isArabic ? 'الاسم الكامل' : 'Full Name'}
              </label>
              <div className="relative">
                <User className={`absolute ${isArabic ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <Input
                  type="text"
                  placeholder={isArabic ? 'أدخل اسمك الكامل' : 'Enter your full name'}
                  className={`${isArabic ? 'pr-10' : 'pl-10'} rounded-xl`}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className={`block text-sm mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {t('email')}
              </label>
              <div className="relative">
                <Mail className={`absolute ${isArabic ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <Input
                  type="email"
                  placeholder={isArabic ? 'أدخل بريدك الإلكتروني' : 'Enter your email'}
                  className={`${isArabic ? 'pr-10' : 'pl-10'} rounded-xl`}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className={`block text-sm mb-2 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                {t('password')}
              </label>
              <div className="relative">
                <Lock className={`absolute ${isArabic ? 'right-3' : 'left-3'} top-1/2 transform -translate-y-1/2 w-5 h-5 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`} />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder={isArabic ? 'أنشئ كلمة مرور قوية' : 'Create a strong password'}
                  className={`${isArabic ? 'pr-10 pl-10' : 'pl-10 pr-10'} rounded-xl`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={`absolute ${isArabic ? 'left-3' : 'right-3'} top-1/2 transform -translate-y-1/2 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-lg py-6"
            >
              {t('signUp')}
            </Button>

            {/* Sign In Link */}
            <p className={`text-center text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {t('haveAccount')}{' '}
              <a href="#login" className="text-blue-500 hover:text-blue-600">
                {t('signIn')}
              </a>
            </p>
          </form>
        </motion.div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
