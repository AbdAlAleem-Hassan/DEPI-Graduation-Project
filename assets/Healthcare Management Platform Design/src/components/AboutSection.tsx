import React from 'react';
import { motion } from 'motion/react';
import { Shield, Users, Heart, Zap } from 'lucide-react';
import { useApp } from '../contexts/AppContext';

const features = [
  {
    icon: Shield,
    title: 'Trusted Healthcare',
    titleAr: 'رعاية صحية موثوقة',
    description: 'Verified hospitals and certified medical professionals',
    descriptionAr: 'مستشفيات معتمدة ومهنيين طبيين مؤهلين',
  },
  {
    icon: Users,
    title: 'Expert Network',
    titleAr: 'شبكة خبراء',
    description: 'Access to 10,000+ specialized doctors',
    descriptionAr: 'الوصول إلى أكثر من 10,000 طبيب متخصص',
  },
  {
    icon: Heart,
    title: 'Patient-Centered',
    titleAr: 'محور المريض',
    description: 'Your health and comfort is our priority',
    descriptionAr: 'صحتك وراحتك هي أولويتنا',
  },
  {
    icon: Zap,
    title: 'AI-Powered',
    titleAr: 'مدعوم بالذكاء الاصطناعي',
    description: 'Smart matching and predictive healthcare',
    descriptionAr: 'مطابقة ذكية ورعاية صحية تنبؤية',
  },
];

export function AboutSection() {
  const { theme, language, t } = useApp();
  const isArabic = language === 'ar';

  return (
    <section id="about" className={`py-20 ${
      theme === 'dark' ? 'bg-slate-900' : 'bg-gray-50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className={`text-4xl md:text-5xl mb-6 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {t('aboutSerena')}
            </h2>
            
            <p className={`text-lg mb-8 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              {isArabic
                ? 'سيرينا هي منصة إدارة الرعاية الصحية من الجيل التالي التي تربط المرضى بأفضل المستشفيات والأطباء عبر شبكة موحدة. نحن نستفيد من التكنولوجيا المتقدمة والذكاء الاصطناعي لتوفير تجارب رعاية صحية سلسة وشخصية.'
                : 'Serena is a next-generation healthcare management platform that connects patients with top hospitals and doctors across a unified network. We leverage advanced technology and AI to provide seamless, personalized healthcare experiences.'
              }
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-6 rounded-2xl ${
                    theme === 'dark' ? 'bg-slate-800' : 'bg-white'
                  } shadow-lg`}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className={`text-lg mb-2 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {isArabic ? feature.titleAr : feature.title}
                  </h3>
                  <p className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {isArabic ? feature.descriptionAr : feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Image Grid */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="rounded-2xl overflow-hidden h-64"
              >
                <img
                  src="https://images.unsplash.com/photo-1666886573230-2b730505f298?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBtZWRpY2FsJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2MDk4MTUzMnww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Doctor"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="rounded-2xl overflow-hidden h-64 mt-8"
              >
                <img
                  src="https://images.unsplash.com/photo-1652352568961-143b1ed17746?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMGludGVyaW9yJTIwbW9kZXJufGVufDF8fHx8MTc2MDk4NjY2Mnww&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Hospital"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="rounded-2xl overflow-hidden h-64 col-span-2"
              >
                <img
                  src="https://images.unsplash.com/photo-1631563020941-c0c6bc534b8e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGVjaG5vbG9neSUyMGZ1dHVyaXN0aWN8ZW58MXx8fHwxNzYwOTc3NzU1fDA&ixlib=rb-4.1.0&q=80&w=1080"
                  alt="Medical Technology"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>

            {/* Floating Stats */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className={`absolute top-1/4 -left-4 p-4 rounded-2xl backdrop-blur-lg ${
                theme === 'dark' ? 'bg-slate-800/90' : 'bg-white/90'
              } shadow-xl`}
            >
              <div className={`text-3xl mb-1 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                99.8%
              </div>
              <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                {isArabic ? 'رضا المرضى' : 'Patient Satisfaction'}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
