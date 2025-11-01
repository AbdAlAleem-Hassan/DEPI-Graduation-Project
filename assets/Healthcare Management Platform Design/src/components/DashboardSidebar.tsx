import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  LayoutDashboard,
  Users,
  Calendar,
  MessageSquare,
  UserCircle,
  Settings,
  LogOut,
  Menu,
  X,
  Hospital,
  Activity,
  FileText,
  Bell,
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { Button } from './ui/button';

interface DashboardSidebarProps {
  userRole?: 'patient' | 'doctor' | 'hospital-admin' | 'super-admin';
}

export function DashboardSidebar({ userRole = 'doctor' }: DashboardSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, language, t } = useApp();
  const isArabic = language === 'ar';

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', labelAr: 'لوحة التحكم', href: '#dashboard' },
    { icon: Users, label: 'Patients', labelAr: 'المرضى', href: '#patients' },
    { icon: Calendar, label: 'Appointments', labelAr: 'المواعيد', href: '#appointments' },
    { icon: MessageSquare, label: 'Messages', labelAr: 'الرسائل', href: '#messages', badge: 5 },
    { icon: Activity, label: 'Health Records', labelAr: 'السجلات الصحية', href: '#records' },
    { icon: FileText, label: 'Reports', labelAr: 'التقارير', href: '#reports' },
    { icon: Hospital, label: 'Departments', labelAr: 'الأقسام', href: '#departments' },
  ];

  const bottomMenuItems = [
    { icon: UserCircle, label: 'Profile', labelAr: 'الملف الشخصي', href: '#profile' },
    { icon: Settings, label: 'Settings', labelAr: 'الإعدادات', href: '#settings' },
    { icon: LogOut, label: 'Logout', labelAr: 'تسجيل الخروج', href: '#logout' },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden rounded-xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </Button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: isArabic ? 300 : -300 }}
        animate={{ x: 0 }}
        className={`fixed ${isArabic ? 'right-0' : 'left-0'} top-0 h-screen w-72 ${
          theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'
        } border-${isArabic ? 'l' : 'r'} z-40 flex flex-col transition-transform ${
          isOpen ? 'translate-x-0' : isArabic ? 'translate-x-full' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
              <span className="text-white">S</span>
            </div>
            <div className="flex flex-col">
              <span className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
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

        {/* User Info */}
        <div className="p-6 border-b border-gray-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <img
              src="https://images.unsplash.com/photo-1676552055618-22ec8cde399a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBkb2N0b3IlMjBzbWlsaW5nfGVufDF8fHx8MTc2MDg5ODkzMHww&ixlib=rb-4.1.0&q=80&w=1080"
              alt="User"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {isArabic ? 'د. سارة أحمد' : 'Dr. Sarah Ahmed'}
              </div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {isArabic ? 'أخصائي قلب' : 'Cardiologist'}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4">
          <ul className="space-y-1">
            {menuItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    theme === 'dark'
                      ? 'text-gray-400 hover:text-white hover:bg-slate-800'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  } ${index === 0 ? 'bg-gradient-to-r from-blue-500 to-emerald-500 text-white' : ''}`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="flex-1">{isArabic ? item.labelAr : item.label}</span>
                  {item.badge && (
                    <span className="px-2 py-0.5 text-xs rounded-full bg-red-500 text-white">
                      {item.badge}
                    </span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Bottom Menu */}
        <div className="p-4 border-t border-gray-200 dark:border-slate-800">
          <ul className="space-y-1">
            {bottomMenuItems.map((item, index) => (
              <li key={index}>
                <a
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    theme === 'dark'
                      ? 'text-gray-400 hover:text-white hover:bg-slate-800'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{isArabic ? item.labelAr : item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </motion.aside>
    </>
  );
}
