import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Checkbox } from './ui/checkbox';

export function AuthLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const { theme, language, t } = useApp();
  const isArabic = language === 'ar';

  return (
    <div className={`min-h-screen flex items-center justify-center ${
      theme === 'dark' ? 'bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900' : 'bg-gradient-to-br from-blue-50 via-white to-emerald-50'
    }`}>
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>

      <div className="relative z-10 w-full max-w-md px-4">
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
            {isArabic ? 'مرحباً بعودتك' : 'Welcome Back'}
          </h2>
          <p className={`text-center mb-8 ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {isArabic ? 'قم بتسجيل الدخول إلى حسابك' : 'Sign in to your account'}
          </p>

          {/* Form */}
          <form className="space-y-6">
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
                  placeholder={isArabic ? 'أدخل كلمة المرور' : 'Enter your password'}
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

            {/* Remember & Forgot */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Checkbox id="remember" />
                <label
                  htmlFor="remember"
                  className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
                >
                  {t('rememberMe')}
                </label>
              </div>
              <a
                href="#"
                className="text-sm text-blue-500 hover:text-blue-600"
              >
                {t('forgotPassword')}
              </a>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-lg py-6"
            >
              {t('signIn')}
            </Button>

            {/* Divider */}
            <div className="relative">
              <div className={`absolute inset-0 flex items-center`}>
                <div className={`w-full border-t ${theme === 'dark' ? 'border-slate-700' : 'border-gray-300'}`} />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className={`px-4 ${theme === 'dark' ? 'bg-slate-800 text-gray-400' : 'bg-white text-gray-500'}`}>
                  {isArabic ? 'أو' : 'Or'}
                </span>
              </div>
            </div>

            {/* Sign Up Link */}
            <p className={`text-center text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {t('noAccount')}{' '}
              <a href="#register" className="text-blue-500 hover:text-blue-600">
                {t('signUp')}
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
