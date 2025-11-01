import React from 'react';
import { motion } from 'motion/react';
import {
  Calendar,
  FileText,
  Activity,
  MessageSquare,
  Video,
  Shield,
  Clock,
  Pill,
} from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { Card } from './ui/card';

const services = [
  {
    icon: Calendar,
    title: 'Book Appointments',
    titleAr: 'حجز المواعيد',
    description: 'Schedule appointments with top doctors instantly',
    descriptionAr: 'جدولة المواعيد مع أفضل الأطباء فوراً',
  },
  {
    icon: FileText,
    title: 'Health Records',
    titleAr: 'السجلات الصحية',
    description: 'Access your medical history anytime, anywhere',
    descriptionAr: 'الوصول إلى تاريخك الطبي في أي وقت وأي مكان',
  },
  {
    icon: Activity,
    title: 'Health Monitoring',
    titleAr: 'مراقبة الصحة',
    description: 'Track your health metrics with AI-powered insights',
    descriptionAr: 'تتبع مقاييس صحتك برؤى مدعومة بالذكاء الاصطناعي',
  },
  {
    icon: MessageSquare,
    title: 'Chat Consultation',
    titleAr: 'استشارة فورية',
    description: 'Get instant medical advice through secure chat',
    descriptionAr: 'احصل على نصائح طبية فورية عبر محادثة آمنة',
  },
  {
    icon: Video,
    title: 'Video Consultation',
    titleAr: 'استشارة بالفيديو',
    description: 'Connect with doctors via secure video calls',
    descriptionAr: 'تواصل مع الأطباء عبر مكالمات فيديو آمنة',
  },
  {
    icon: Shield,
    title: 'Privacy & Security',
    titleAr: 'الخصوصية والأمان',
    description: 'Your data is protected with enterprise-grade security',
    descriptionAr: 'بياناتك محمية بأمان على مستوى المؤسسات',
  },
  {
    icon: Clock,
    title: '24/7 Support',
    titleAr: 'دعم على مدار الساعة',
    description: 'Round-the-clock healthcare support and assistance',
    descriptionAr: 'دعم ومساعدة الرعاية الصحية على مدار الساعة',
  },
  {
    icon: Pill,
    title: 'Pharmacy Services',
    titleAr: 'خدمات الصيدلية',
    description: 'Order prescriptions and get them delivered',
    descriptionAr: 'اطلب الوصفات الطبية واحصل عليها مع التوصيل',
  },
];

export function ServicesSection() {
  const { theme, language } = useApp();
  const isArabic = language === 'ar';

  return (
    <section id="services" className={`py-20 ${
      theme === 'dark' ? 'bg-slate-950' : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className={`text-4xl md:text-5xl mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {isArabic ? 'خدماتنا' : 'Our Services'}
          </h2>
          <p className={`text-lg ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {isArabic
              ? 'مجموعة شاملة من الخدمات الصحية الرقمية'
              : 'Comprehensive suite of digital healthcare services'
            }
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`p-6 group cursor-pointer transition-all hover:shadow-2xl hover:-translate-y-2 ${
                theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white'
              }`}>
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className={`text-xl mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  {isArabic ? service.titleAr : service.title}
                </h3>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {isArabic ? service.descriptionAr : service.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
