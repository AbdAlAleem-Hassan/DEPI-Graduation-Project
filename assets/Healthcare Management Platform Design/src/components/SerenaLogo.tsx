import React from 'react';
import { motion } from 'motion/react';
import { useApp } from '../contexts/AppContext';

interface SerenaLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  animated?: boolean;
}

export function SerenaLogo({ size = 'md', showText = true, animated = false }: SerenaLogoProps) {
  const { theme, language } = useApp();
  const isArabic = language === 'ar';

  const sizes = {
    sm: { icon: 'w-8 h-8', text: 'text-lg', subtext: 'text-xs' },
    md: { icon: 'w-10 h-10', text: 'text-xl', subtext: 'text-sm' },
    lg: { icon: 'w-16 h-16', text: 'text-3xl', subtext: 'text-base' },
  };

  const IconWrapper = animated ? motion.div : 'div';
  const iconProps = animated
    ? {
        initial: { rotate: 0 },
        animate: { rotate: 360 },
        transition: { duration: 20, repeat: Infinity, ease: 'linear' },
      }
    : {};

  return (
    <div className="flex items-center gap-3">
      <IconWrapper
        {...iconProps}
        className={`${sizes[size].icon} rounded-2xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center shadow-lg relative overflow-hidden`}
      >
        {/* DNA Helix / Medical Symbol */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-2/3 h-2/3 text-white"
        >
          {/* S shape with medical cross */}
          <path
            d="M12 2C10.5 2 9 2.5 8 3.5C7 4.5 6.5 6 6.5 7.5C6.5 9 7 10.5 8 11.5C7 12.5 6.5 14 6.5 15.5C6.5 17 7 18.5 8 19.5C9 20.5 10.5 21 12 21C13.5 21 15 20.5 16 19.5C17 18.5 17.5 17 17.5 15.5C17.5 14 17 12.5 16 11.5C17 10.5 17.5 9 17.5 7.5C17.5 6 17 4.5 16 3.5C15 2.5 13.5 2 12 2Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line x1="12" y1="8" x2="12" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="10.5" y1="9.5" x2="13.5" y2="9.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <circle cx="12" cy="15" r="2" stroke="currentColor" strokeWidth="1.5" />
        </svg>

        {/* Pulse Effect */}
        {animated && (
          <motion.div
            className="absolute inset-0 rounded-2xl bg-white"
            initial={{ opacity: 0.5, scale: 0.8 }}
            animate={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </IconWrapper>

      {showText && (
        <div className="flex flex-col">
          <motion.span
            initial={animated ? { opacity: 0, x: -10 } : {}}
            animate={animated ? { opacity: 1, x: 0 } : {}}
            transition={animated ? { delay: 0.2 } : {}}
            className={`${sizes[size].text} ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
            style={{ fontFamily: 'Inter, sans-serif', fontWeight: 600, letterSpacing: '-0.02em' }}
          >
            Serena
          </motion.span>
          {isArabic && (
            <motion.span
              initial={animated ? { opacity: 0, x: -10 } : {}}
              animate={animated ? { opacity: 1, x: 0 } : {}}
              transition={animated ? { delay: 0.3 } : {}}
              className={`${sizes[size].subtext} ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}
              style={{ fontFamily: 'Cairo, sans-serif' }}
            >
              سيرينا
            </motion.span>
          )}
        </div>
      )}
    </div>
  );
}
