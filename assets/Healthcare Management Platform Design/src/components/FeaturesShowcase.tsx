import React from 'react';
import { motion } from 'motion/react';
import { Brain, Shield, Zap, Globe, Users, Activity } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const features = [
  {
    icon: Brain,
    title: 'AI-Powered Matching',
    titleAr: 'مطابقة بالذكاء الاصطناعي',
    description: 'Smart algorithms match you with the perfect healthcare provider based on your needs and medical history.',
    descriptionAr: 'خوارزميات ذكية تربطك بمقدم الرعاية الصحية المثالي بناءً على احتياجاتك وتاريخك الطبي.',
  },
  {
    icon: Shield,
    title: 'End-to-End Encryption',
    titleAr: 'تشفير شامل',
    description: 'Your medical records and personal data are protected with military-grade encryption technology.',
    descriptionAr: 'سجلاتك الطبية وبياناتك الشخصية محمية بتقنية تشفير عسكرية.',
  },
  {
    icon: Zap,
    title: 'Instant Appointments',
    titleAr: 'مواعيد فورية',
    description: 'Book appointments in seconds with real-time availability and instant confirmation.',
    descriptionAr: 'احجز المواعيد في ثوانٍ مع التوفر في الوقت الفعلي والتأكيد الفوري.',
  },
  {
    icon: Globe,
    title: 'Multi-Hospital Network',
    titleAr: 'شبكة متعددة المستشفيات',
    description: 'Access a unified network of 500+ hospitals and 10,000+ doctors across the region.',
    descriptionAr: 'الوصول إلى شبكة موحدة من أكثر من 500 مستشفى و 10,000 طبيب في المنطقة.',
  },
  {
    icon: Users,
    title: 'Family Health Hub',
    titleAr: 'مركز صحة العائلة',
    description: 'Manage health records and appointments for your entire family from one dashboard.',
    descriptionAr: 'إدارة السجلات الصحية والمواعيد لجميع أفراد عائلتك من لوحة تحكم واحدة.',
  },
  {
    icon: Activity,
    title: 'Health Analytics',
    titleAr: 'تحليلات صحية',
    description: 'Get personalized health insights and recommendations powered by advanced analytics.',
    descriptionAr: 'احصل على رؤى وتوصيات صحية مخصصة مدعومة بالتحليلات المتقدمة.',
  },
];

export function FeaturesShowcase() {
  const { theme, language } = useApp();
  const isArabic = language === 'ar';

  return (
    <section className={`py-20 relative overflow-hidden ${
      theme === 'dark' ? 'bg-slate-900' : 'bg-gray-50'
    }`}>
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500 rounded-full filter blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block mb-4"
          >
            <span className={`px-6 py-3 rounded-full text-sm ${
              theme === 'dark' ? 'bg-blue-500/20 text-blue-300' : 'bg-blue-100 text-blue-600'
            }`}>
              ✨ {isArabic ? 'لماذا تختار سيرينا' : 'Why Choose Serena'}
            </span>
          </motion.div>
          <h2 className={`text-4xl md:text-5xl mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {isArabic ? 'تكنولوجيا متقدمة للرعاية الصحية' : 'Advanced Technology for Healthcare'}
          </h2>
          <p className={`text-lg max-w-3xl mx-auto ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {isArabic
              ? 'نجمع بين الابتكار والرعاية لتوفير تجربة رعاية صحية لا مثيل لها'
              : 'We combine innovation and care to deliver an unparalleled healthcare experience'
            }
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className={`p-8 rounded-3xl transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-slate-800 hover:bg-slate-750'
                  : 'bg-white hover:shadow-2xl'
              }`}>
                {/* Icon */}
                <div className="relative mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  {/* Glow Effect */}
                  <div className="absolute inset-0 w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-emerald-500 blur-xl opacity-0 group-hover:opacity-50 transition-opacity" />
                </div>

                {/* Content */}
                <h3 className={`text-xl mb-3 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {isArabic ? feature.titleAr : feature.title}
                </h3>
                <p className={`${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {isArabic ? feature.descriptionAr : feature.description}
                </p>

                {/* Hover Line */}
                <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-blue-500 to-emerald-500 group-hover:w-full transition-all duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
