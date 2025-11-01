import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { Card } from './ui/card';

const reviews = [
  {
    id: 1,
    name: 'John Anderson',
    nameAr: 'جون أندرسون',
    role: 'Patient',
    roleAr: 'مريض',
    rating: 5,
    comment: 'Serena made finding the right specialist so easy. The platform is intuitive and the doctors are exceptional!',
    commentAr: 'جعلت سيرينا العثور على الأخصائي المناسب سهلاً للغاية. المنصة بديهية والأطباء استثنائيون!',
    image: 'https://images.unsplash.com/photo-1666886573230-2b730505f298?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBtZWRpY2FsJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2MDk4MTUzMnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 2,
    name: 'Sarah Williams',
    nameAr: 'سارة ويليامز',
    role: 'Patient',
    roleAr: 'مريض',
    rating: 5,
    comment: 'The best healthcare platform I\'ve used. Booking appointments is seamless and the quality of care is outstanding.',
    commentAr: 'أفضل منصة رعاية صحية استخدمتها. حجز المواعيد سلس وجودة الرعاية ممتازة.',
    image: 'https://images.unsplash.com/photo-1676552055618-22ec8cde399a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBkb2N0b3IlMjBzbWlsaW5nfGVufDF8fHx8MTc2MDg5ODkzMHww&ixlib=rb-4.1.0&q=80&w=1080',
  },
  {
    id: 3,
    name: 'Michael Chen',
    nameAr: 'مايكل تشين',
    role: 'Patient',
    roleAr: 'مريض',
    rating: 5,
    comment: 'Connected with top specialists in minutes. The AI matching system is incredible and saved me so much time.',
    commentAr: 'تواصلت مع أفضل المتخصصين في دقائق. نظام المطابقة بالذكاء الاصطناعي رائع ووفر لي الكثير من الوقت.',
    image: 'https://images.unsplash.com/photo-1666886573230-2b730505f298?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBtZWRpY2FsJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2MDk4MTUzMnww&ixlib=rb-4.1.0&q=80&w=1080',
  },
];

export function ReviewsSection() {
  const { theme, language, t } = useApp();
  const isArabic = language === 'ar';

  return (
    <section id="reviews" className={`py-20 ${
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
            {t('patientReviews')}
          </h2>
          <p className={`text-lg ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {isArabic ? 'ماذا يقول مرضانا عنا' : 'What our patients say about us'}
          </p>
        </motion.div>

        {/* Reviews Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`p-6 relative ${
                theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white'
              } hover:shadow-2xl transition-shadow`}>
                <Quote className={`absolute top-6 right-6 w-12 h-12 ${
                  theme === 'dark' ? 'text-slate-700' : 'text-gray-200'
                }`} />
                
                <div className="relative z-10">
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  {/* Comment */}
                  <p className={`mb-6 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    "{isArabic ? review.commentAr : review.comment}"
                  </p>

                  {/* Author */}
                  <div className="flex items-center gap-4">
                    <img
                      src={review.image}
                      alt={isArabic ? review.nameAr : review.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className={`${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}>
                        {isArabic ? review.nameAr : review.name}
                      </div>
                      <div className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}>
                        {isArabic ? review.roleAr : review.role}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: '4.9/5', label: 'Average Rating', labelAr: 'متوسط التقييم' },
            { value: '50K+', label: 'Reviews', labelAr: 'تقييم' },
            { value: '98%', label: 'Satisfaction', labelAr: 'رضا' },
            { value: '1M+', label: 'Happy Patients', labelAr: 'مريض سعيد' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`text-3xl md:text-4xl mb-2 bg-gradient-to-r from-blue-500 to-emerald-500 bg-clip-text text-transparent`}>
                {stat.value}
              </div>
              <div className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {isArabic ? stat.labelAr : stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
