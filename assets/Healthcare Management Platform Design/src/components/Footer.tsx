import React from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

export function Footer() {
  const { theme, language, t } = useApp();
  const isArabic = language === 'ar';

  const links = {
    company: [
      { label: 'About Us', labelAr: 'من نحن', href: '#about' },
      { label: 'Careers', labelAr: 'الوظائف', href: '#' },
      { label: 'Press', labelAr: 'الصحافة', href: '#' },
      { label: 'Blog', labelAr: 'المدونة', href: '#blogs' },
    ],
    services: [
      { label: 'Find Doctors', labelAr: 'البحث عن أطباء', href: '#doctors' },
      { label: 'Find Hospitals', labelAr: 'البحث عن مستشفيات', href: '#hospitals' },
      { label: 'Book Appointment', labelAr: 'حجز موعد', href: '#' },
      { label: 'Health Records', labelAr: 'السجلات الصحية', href: '#' },
    ],
    support: [
      { label: 'Help Center', labelAr: 'مركز المساعدة', href: '#' },
      { label: 'Contact Us', labelAr: 'اتصل بنا', href: '#contact' },
      { label: 'FAQs', labelAr: 'الأسئلة الشائعة', href: '#' },
      { label: 'Privacy Policy', labelAr: 'سياسة الخصوصية', href: '#' },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer id="contact" className={`${
      theme === 'dark' ? 'bg-slate-950 border-t border-slate-800' : 'bg-gray-900'
    } text-white pt-16 pb-8`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
                  <span className="text-white text-2xl">S</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl text-white">Serena</span>
                  {isArabic && (
                    <span className="text-sm text-gray-400">سيرينا</span>
                  )}
                </div>
              </div>
              
              <p className="text-gray-400 mb-6">
                {isArabic
                  ? 'منصة الرعاية الصحية من الجيل القادم تربط المرضى بأفضل المستشفيات والأطباء عبر شبكة موحدة.'
                  : 'Next-generation healthcare platform connecting patients with top hospitals and doctors across a unified network.'
                }
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-400">
                  <Mail className="w-5 h-5" />
                  <span>contact@serena.health</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <Phone className="w-5 h-5" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <MapPin className="w-5 h-5" />
                  <span>{isArabic ? 'المدينة الطبية، المملكة' : 'Medical City, Kingdom'}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Links Sections */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-lg mb-4">{isArabic ? 'الشركة' : 'Company'}</h3>
            <ul className="space-y-2">
              {links.company.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {isArabic ? link.labelAr : link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-lg mb-4">{isArabic ? 'الخدمات' : 'Services'}</h3>
            <ul className="space-y-2">
              {links.services.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {isArabic ? link.labelAr : link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="text-lg mb-4">{isArabic ? 'الدعم' : 'Support'}</h3>
            <ul className="space-y-2">
              {links.support.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {isArabic ? link.labelAr : link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center gap-4 mb-8"
        >
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              aria-label={social.label}
              className="w-10 h-10 rounded-full bg-slate-800 hover:bg-gradient-to-r hover:from-blue-500 hover:to-emerald-500 flex items-center justify-center transition-all"
            >
              <social.icon className="w-5 h-5" />
            </a>
          ))}
        </motion.div>

        {/* Bottom Bar */}
        <div className={`pt-8 border-t ${
          theme === 'dark' ? 'border-slate-800' : 'border-gray-800'
        } flex flex-col md:flex-row justify-between items-center gap-4`}>
          <p className="text-gray-400 text-sm text-center md:text-left">
            © 2025 Serena Healthcare. {isArabic ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              {isArabic ? 'الشروط والأحكام' : 'Terms & Conditions'}
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              {isArabic ? 'سياسة الخصوصية' : 'Privacy Policy'}
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              {isArabic ? 'ملفات تعريف الارتباط' : 'Cookies'}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
