import React from 'react';
import { motion } from 'motion/react';
import { Home, LayoutDashboard, LogIn, UserPlus, Menu } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { Button } from './ui/button';

export function QuickNav() {
  const { theme, language } = useApp();
  const isArabic = language === 'ar';

  const pages = [
    { icon: Home, label: 'Home Page', labelAr: 'الصفحة الرئيسية', href: '#home' },
    { icon: LayoutDashboard, label: 'Dashboard', labelAr: 'لوحة التحكم', href: '#dashboard' },
    { icon: LogIn, label: 'Login', labelAr: 'تسجيل الدخول', href: '#login' },
    { icon: UserPlus, label: 'Register', labelAr: 'التسجيل', href: '#register' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`fixed ${isArabic ? 'left-4' : 'right-4'} bottom-4 z-50`}
    >
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="lg"
            className="rounded-full w-14 h-14 shadow-2xl bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600"
          >
            <Menu className="w-6 h-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>
            {isArabic ? 'التنقل السريع' : 'Quick Navigation'}
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {pages.map((page, index) => (
            <DropdownMenuItem key={index} asChild>
              <a href={page.href} className="flex items-center gap-3 cursor-pointer">
                <page.icon className="w-4 h-4" />
                <span>{isArabic ? page.labelAr : page.label}</span>
              </a>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </motion.div>
  );
}
