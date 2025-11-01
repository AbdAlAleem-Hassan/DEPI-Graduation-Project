import React from 'react';
import { motion } from 'motion/react';
import { Sun, Moon, Globe, Palette, Bell, Lock, User } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Button } from './ui/button';
import { Separator } from './ui/separator';

export function SettingsPage() {
  const { theme, language, colorTheme, setTheme, toggleLanguage, setColorTheme, t } = useApp();
  const isArabic = language === 'ar';

  const themeColors = [
    { id: 'blue', color: 'from-blue-500 to-emerald-500', name: 'Blue', nameAr: 'أزرق' },
    { id: 'green', color: 'from-emerald-500 to-teal-500', name: 'Green', nameAr: 'أخضر' },
    { id: 'purple', color: 'from-purple-500 to-pink-500', name: 'Purple', nameAr: 'بنفسجي' },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className={`text-3xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          {t('settings')}
        </h1>
        <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
          {isArabic ? 'قم بتخصيص تجربتك' : 'Customize your experience'}
        </p>
      </div>

      {/* Appearance Settings */}
      <Card className={`p-6 ${
        theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white'
      }`}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
            <Palette className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className={`text-xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {isArabic ? 'المظهر' : 'Appearance'}
            </h2>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {isArabic ? 'تخصيص المظهر واللغة' : 'Customize theme and language'}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {/* Theme Mode */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {theme === 'dark' ? (
                <Moon className="w-5 h-5 text-blue-500" />
              ) : (
                <Sun className="w-5 h-5 text-yellow-500" />
              )}
              <div>
                <Label className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {isArabic ? 'الوضع الداكن' : 'Dark Mode'}
                </Label>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {isArabic ? 'تبديل بين الوضع الفاتح والداكن' : 'Toggle between light and dark mode'}
                </p>
              </div>
            </div>
            <Switch
              checked={theme === 'dark'}
              onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            />
          </div>

          <Separator />

          {/* Language */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-blue-500" />
              <div>
                <Label className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                  {isArabic ? 'اللغة' : 'Language'}
                </Label>
                <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  {language === 'en' ? 'English' : 'العربية'}
                </p>
              </div>
            </div>
            <Button onClick={toggleLanguage} variant="outline" className="rounded-xl">
              {language === 'en' ? 'العربية' : 'English'}
            </Button>
          </div>

          <Separator />

          {/* Color Theme */}
          <div>
            <Label className={`mb-4 block ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {isArabic ? 'نمط الألوان' : 'Color Theme'}
            </Label>
            <div className="grid grid-cols-3 gap-4">
              {themeColors.map((color) => (
                <motion.button
                  key={color.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setColorTheme(color.id as any)}
                  className={`p-4 rounded-2xl border-2 transition-all ${
                    colorTheme === color.id
                      ? 'border-blue-500'
                      : theme === 'dark' ? 'border-slate-700' : 'border-gray-200'
                  }`}
                >
                  <div className={`w-full h-20 rounded-xl bg-gradient-to-r ${color.color} mb-3`} />
                  <p className={`text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {isArabic ? color.nameAr : color.name}
                  </p>
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Notifications Settings */}
      <Card className={`p-6 ${
        theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white'
      }`}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
            <Bell className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className={`text-xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {isArabic ? 'الإشعارات' : 'Notifications'}
            </h2>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {isArabic ? 'إدارة تفضيلات الإشعارات' : 'Manage notification preferences'}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {[
            { label: 'Appointment Reminders', labelAr: 'تذكيرات المواعيد' },
            { label: 'New Messages', labelAr: 'رسائل جديدة' },
            { label: 'Health Updates', labelAr: 'تحديثات صحية' },
            { label: 'System Notifications', labelAr: 'إشعارات النظام' },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <Label className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {isArabic ? item.labelAr : item.label}
              </Label>
              <Switch defaultChecked={index < 2} />
            </div>
          ))}
        </div>
      </Card>

      {/* Privacy & Security */}
      <Card className={`p-6 ${
        theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white'
      }`}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
            <Lock className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className={`text-xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {isArabic ? 'الخصوصية والأمان' : 'Privacy & Security'}
            </h2>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {isArabic ? 'إعدادات الأمان وحماية البيانات' : 'Security settings and data protection'}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <Button variant="outline" className="w-full rounded-xl justify-start">
            {isArabic ? 'تغيير كلمة المرور' : 'Change Password'}
          </Button>
          <Button variant="outline" className="w-full rounded-xl justify-start">
            {isArabic ? 'المصادقة الثنائية' : 'Two-Factor Authentication'}
          </Button>
          <Button variant="outline" className="w-full rounded-xl justify-start">
            {isArabic ? 'سجل النشاط' : 'Activity Log'}
          </Button>
          <Button variant="outline" className="w-full rounded-xl justify-start">
            {isArabic ? 'الأجهزة المتصلة' : 'Connected Devices'}
          </Button>
        </div>
      </Card>

      {/* Account Settings */}
      <Card className={`p-6 ${
        theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white'
      }`}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
            <User className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className={`text-xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {isArabic ? 'الحساب' : 'Account'}
            </h2>
            <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {isArabic ? 'إدارة معلومات الحساب' : 'Manage account information'}
            </p>
          </div>
        </div>

        <div className="space-y-3">
          <Button variant="outline" className="w-full rounded-xl justify-start">
            {isArabic ? 'تعديل الملف الشخصي' : 'Edit Profile'}
          </Button>
          <Button variant="outline" className="w-full rounded-xl justify-start">
            {isArabic ? 'تفضيلات البريد الإلكتروني' : 'Email Preferences'}
          </Button>
          <Button variant="outline" className="w-full rounded-xl justify-start text-red-500 hover:text-red-600">
            {isArabic ? 'حذف الحساب' : 'Delete Account'}
          </Button>
        </div>
      </Card>
    </div>
  );
}
