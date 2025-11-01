import React from 'react';
import { motion } from 'motion/react';
import { Star, Calendar, ArrowRight } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

const doctors = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    nameAr: 'د. سارة جونسون',
    specialty: 'Cardiologist',
    specialtyAr: 'أخصائي قلب',
    experience: '15 years',
    experienceAr: '١٥ سنة',
    rating: 4.9,
    reviews: 340,
    image: 'https://images.unsplash.com/photo-1676552055618-22ec8cde399a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBkb2N0b3IlMjBzbWlsaW5nfGVufDF8fHx8MTc2MDg5ODkzMHww&ixlib=rb-4.1.0&q=80&w=1080',
    available: true,
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    nameAr: 'د. مايكل تشين',
    specialty: 'Neurologist',
    specialtyAr: 'أخصائي أعصاب',
    experience: '12 years',
    experienceAr: '١٢ سنة',
    rating: 4.8,
    reviews: 298,
    image: 'https://images.unsplash.com/photo-1666886573230-2b730505f298?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBtZWRpY2FsJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2MDk4MTUzMnww&ixlib=rb-4.1.0&q=80&w=1080',
    available: true,
  },
  {
    id: 3,
    name: 'Dr. Emily Roberts',
    nameAr: 'د. إيميلي روبرتس',
    specialty: 'Pediatrician',
    specialtyAr: 'طبيب أطفال',
    experience: '10 years',
    experienceAr: '١٠ سنوات',
    rating: 4.9,
    reviews: 425,
    image: 'https://images.unsplash.com/photo-1676552055618-22ec8cde399a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZW1hbGUlMjBkb2N0b3IlMjBzbWlsaW5nfGVufDF8fHx8MTc2MDg5ODkzMHww&ixlib=rb-4.1.0&q=80&w=1080',
    available: false,
  },
  {
    id: 4,
    name: 'Dr. Ahmed Hassan',
    nameAr: 'د. أحمد حسن',
    specialty: 'Orthopedic Surgeon',
    specialtyAr: 'جراح عظام',
    experience: '18 years',
    experienceAr: '١٨ سنة',
    rating: 4.9,
    reviews: 512,
    image: 'https://images.unsplash.com/photo-1666886573230-2b730505f298?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb2N0b3IlMjBtZWRpY2FsJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc2MDk4MTUzMnww&ixlib=rb-4.1.0&q=80&w=1080',
    available: true,
  },
];

export function DoctorsSection() {
  const { theme, language, t } = useApp();
  const isArabic = language === 'ar';

  return (
    <section id="doctors" className={`py-20 ${
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
            {t('topDoctors')}
          </h2>
          <p className={`text-lg ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {isArabic ? 'تواصل مع أفضل الأطباء المتخصصين' : 'Connect with top specialized doctors'}
          </p>
        </motion.div>

        {/* Doctors Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {doctors.map((doctor, index) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`overflow-hidden group cursor-pointer transition-all hover:shadow-2xl ${
                theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white'
              }`}>
                <div className="relative">
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={doctor.image}
                      alt={isArabic ? doctor.nameAr : doctor.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${
                      theme === 'dark' ? 'from-slate-800' : 'from-white'
                    } to-transparent opacity-60`} />
                  </div>
                  
                  {doctor.available && (
                    <Badge className="absolute top-4 right-4 bg-emerald-500 hover:bg-emerald-600">
                      {isArabic ? 'متاح' : 'Available'}
                    </Badge>
                  )}

                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{doctor.rating}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className={`text-xl mb-1 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {isArabic ? doctor.nameAr : doctor.name}
                  </h3>
                  
                  <p className={`text-sm mb-3 ${
                    theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                  }`}>
                    {isArabic ? doctor.specialtyAr : doctor.specialty}
                  </p>

                  <div className={`text-sm mb-4 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {isArabic ? doctor.experienceAr : doctor.experience} {isArabic ? 'خبرة' : 'experience'}
                  </div>

                  <div className={`text-sm mb-4 flex items-center gap-1 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <Star className="w-4 h-4" />
                    <span>{doctor.reviews} {isArabic ? 'تقييم' : 'reviews'}</span>
                  </div>

                  <Button className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600">
                    <Calendar className={`w-4 h-4 ${isArabic ? 'ml-2' : 'mr-2'}`} />
                    {isArabic ? 'احجز موعد' : 'Book Now'}
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button size="lg" variant="outline" className="rounded-xl">
            {t('viewAll')}
            <ArrowRight className={`w-5 h-5 ${isArabic ? 'mr-2 rotate-180' : 'ml-2'}`} />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
