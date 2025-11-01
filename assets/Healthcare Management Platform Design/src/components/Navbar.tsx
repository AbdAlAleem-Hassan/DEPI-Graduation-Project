import React, { useState } from 'react';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../contexts/AppContext';
import { Button } from './ui/button';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, language, toggleTheme, toggleLanguage, t } = useApp();

  const navItems = [
    { key: 'home', href: '#home' },
    { key: 'services', href: '#services' },
    { key: 'findHospital', href: '#hospitals' },
    { key: 'findDoctors', href: '#doctors' },
    { key: 'blogs', href: '#blogs' },
    { key: 'reviews', href: '#reviews' },
    { key: 'aboutUs', href: '#about' },
    { key: 'contactUs', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 backdrop-blur-lg ${
      theme === 'dark' ? 'bg-slate-900/90' : 'bg-white/90'
    } border-b ${theme === 'dark' ? 'border-slate-800' : 'border-gray-200'} transition-all`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
            <div className="flex flex-col">
              <span className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                Serena
              </span>
              {language === 'ar' && (
                <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  سيرينا
                </span>
              )}
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <a
                key={item.key}
                href={item.href}
                className={`px-4 py-2 rounded-xl transition-all ${
                  theme === 'dark' 
                    ? 'text-gray-300 hover:text-white hover:bg-slate-800' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {t(item.key)}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-xl"
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleLanguage}
              className="rounded-xl"
            >
              <Globe className="w-5 h-5" />
              <span className="ml-1 text-xs">{language.toUpperCase()}</span>
            </Button>

            <div className="hidden md:flex items-center gap-2">
              <Button variant="ghost" className="rounded-xl">
                {t('login')}
              </Button>
              <Button className="rounded-xl bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600">
                {t('register')}
              </Button>
            </div>

            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden rounded-xl"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden ${theme === 'dark' ? 'bg-slate-900' : 'bg-white'} border-t ${
              theme === 'dark' ? 'border-slate-800' : 'border-gray-200'
            }`}
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className={`block px-4 py-3 rounded-xl transition-all ${
                    theme === 'dark'
                      ? 'text-gray-300 hover:text-white hover:bg-slate-800'
                      : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {t(item.key)}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-4">
                <Button variant="outline" className="rounded-xl w-full">
                  {t('login')}
                </Button>
                <Button className="rounded-xl w-full bg-gradient-to-r from-blue-500 to-emerald-500">
                  {t('register')}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
