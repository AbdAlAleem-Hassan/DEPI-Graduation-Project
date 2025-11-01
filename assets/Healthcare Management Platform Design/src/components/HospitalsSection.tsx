import React from 'react';
import { motion } from 'motion/react';
import { MapPin, Star, ArrowRight } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { Button } from './ui/button';
import { Card } from './ui/card';

const hospitals = [
  {
    id: 1,
    name: 'City Medical Center',
    nameAr: 'المركز الطبي بالمدينة',
    location: 'Downtown, Main City',
    locationAr: 'وسط المدينة',
    rating: 4.9,
    reviews: 1250,
    image: 'https://images.unsplash.com/photo-1719934398679-d764c1410770?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3NwaXRhbCUyMGJ1aWxkaW5nfGVufDF8fHx8MTc2MDk1MTIyNXww&ixlib=rb-4.1.0&q=80&w=1080',
    departments: 15,
    doctors: 180,
  },
  {
    id: 2,
    name: 'Advanced Care Hospital',
    nameAr: 'مستشفى الرعاية المتقدمة',
    location: 'Medical District',
    locationAr: 'الحي الطبي',
    rating: 4.8,
    reviews: 980,
    image: 'https://images.unsplash.com/photo-1652352568961-143b1ed17746?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxob3NwaXRhbCUyMGludGVyaW9yJTIwbW9kZXJufGVufDF8fHx8MTc2MDk4NjY2Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    departments: 20,
    doctors: 220,
  },
  {
    id: 3,
    name: 'Metropolitan Health Center',
    nameAr: 'مركز الصحة الحضري',
    location: 'East Side',
    locationAr: 'الجانب الشرقي',
    rating: 4.7,
    reviews: 756,
    image: 'https://images.unsplash.com/photo-1719934398679-d764c1410770?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBob3NwaXRhbCUyMGJ1aWxkaW5nfGVufDF8fHx8MTc2MDk1MTIyNXww&ixlib=rb-4.1.0&q=80&w=1080',
    departments: 12,
    doctors: 145,
  },
];

export function HospitalsSection() {
  const { theme, language, t } = useApp();
  const isArabic = language === 'ar';

  return (
    <section id="hospitals" className={`py-20 ${
      theme === 'dark' ? 'bg-slate-900' : 'bg-gray-50'
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
            {t('topHospitals')}
          </h2>
          <p className={`text-lg ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {isArabic ? 'اكتشف أفضل المستشفيات في شبكتنا' : 'Discover the best hospitals in our network'}
          </p>
        </motion.div>

        {/* Hospitals Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {hospitals.map((hospital, index) => (
            <motion.div
              key={hospital.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`overflow-hidden group cursor-pointer transition-all hover:shadow-2xl ${
                theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white'
              }`}>
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={hospital.image}
                    alt={isArabic ? hospital.nameAr : hospital.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{hospital.rating}</span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className={`text-xl mb-2 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {isArabic ? hospital.nameAr : hospital.name}
                  </h3>
                  
                  <div className={`flex items-center gap-2 mb-4 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{isArabic ? hospital.locationAr : hospital.location}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className={`text-2xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {hospital.departments}
                      </div>
                      <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {isArabic ? 'أقسام' : 'Departments'}
                      </div>
                    </div>
                    <div>
                      <div className={`text-2xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {hospital.doctors}
                      </div>
                      <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                        {isArabic ? 'أطباء' : 'Doctors'}
                      </div>
                    </div>
                  </div>

                  <Button className="w-full rounded-xl bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600">
                    {isArabic ? 'عرض التفاصيل' : 'View Details'}
                    <ArrowRight className={`w-4 h-4 ${isArabic ? 'mr-2 rotate-180' : 'ml-2'}`} />
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
