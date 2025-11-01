import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Users, Calendar, Activity, Clock, DollarSign } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { Card } from './ui/card';
import { DashboardHeader } from './DashboardHeader';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

const appointmentsData = [
  { name: 'Mon', appointments: 12 },
  { name: 'Tue', appointments: 19 },
  { name: 'Wed', appointments: 15 },
  { name: 'Thu', appointments: 22 },
  { name: 'Fri', appointments: 18 },
  { name: 'Sat', appointments: 10 },
  { name: 'Sun', appointments: 8 },
];

const patientsData = [
  { month: 'Jan', patients: 65 },
  { month: 'Feb', patients: 78 },
  { month: 'Mar', patients: 90 },
  { month: 'Apr', patients: 81 },
  { month: 'May', patients: 95 },
  { month: 'Jun', patients: 110 },
];

const upcomingAppointments = [
  { id: 1, patient: 'John Smith', time: '09:00 AM', type: 'Consultation', status: 'confirmed' },
  { id: 2, patient: 'Emma Wilson', time: '10:30 AM', type: 'Follow-up', status: 'confirmed' },
  { id: 3, patient: 'Michael Brown', time: '02:00 PM', type: 'Check-up', status: 'pending' },
  { id: 4, patient: 'Sarah Davis', time: '03:30 PM', type: 'Consultation', status: 'confirmed' },
];

export function DashboardContent() {
  const { theme, language } = useApp();
  const isArabic = language === 'ar';

  const stats = [
    {
      icon: Users,
      label: isArabic ? 'إجمالي المرضى' : 'Total Patients',
      value: '1,245',
      change: '+12%',
      positive: true,
    },
    {
      icon: Calendar,
      label: isArabic ? 'المواعيد اليوم' : 'Today\'s Appointments',
      value: '28',
      change: '+5%',
      positive: true,
    },
    {
      icon: Activity,
      label: isArabic ? 'المرضى النشطون' : 'Active Patients',
      value: '342',
      change: '+8%',
      positive: true,
    },
    {
      icon: DollarSign,
      label: isArabic ? 'الإيرادات' : 'Revenue',
      value: '$45.2K',
      change: '-3%',
      positive: false,
    },
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-slate-950' : 'bg-gray-50'}`}>
      <DashboardHeader />
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className={`text-3xl ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              {isArabic ? 'لوحة التحكم' : 'Dashboard'}
            </h1>
            <p className={`${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              {isArabic ? 'مرحباً بك، د. سارة' : 'Welcome back, Dr. Sarah'}
            </p>
          </div>
        </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className={`p-6 ${
              theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white'
            }`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className={`text-sm mb-1 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {stat.label}
                  </p>
                  <p className={`text-2xl ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {stat.value}
                  </p>
                  <p className={`text-sm mt-2 ${
                    stat.positive ? 'text-emerald-500' : 'text-red-500'
                  }`}>
                    {stat.change} {isArabic ? 'من الشهر الماضي' : 'from last month'}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Appointments Chart */}
        <Card className={`p-6 ${
          theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white'
        }`}>
          <h3 className={`text-xl mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {isArabic ? 'المواعيد الأسبوعية' : 'Weekly Appointments'}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={appointmentsData}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
              <XAxis dataKey="name" stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} />
              <YAxis stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                  border: `1px solid ${theme === 'dark' ? '#334155' : '#e5e7eb'}`,
                  borderRadius: '0.5rem',
                }}
              />
              <Bar dataKey="appointments" fill="url(#gradient)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Patients Growth Chart */}
        <Card className={`p-6 ${
          theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white'
        }`}>
          <h3 className={`text-xl mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {isArabic ? 'نمو المرضى' : 'Patient Growth'}
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={patientsData}>
              <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#374151' : '#e5e7eb'} />
              <XAxis dataKey="month" stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} />
              <YAxis stroke={theme === 'dark' ? '#9ca3af' : '#6b7280'} />
              <Tooltip
                contentStyle={{
                  backgroundColor: theme === 'dark' ? '#1e293b' : '#ffffff',
                  border: `1px solid ${theme === 'dark' ? '#334155' : '#e5e7eb'}`,
                  borderRadius: '0.5rem',
                }}
              />
              <Line
                type="monotone"
                dataKey="patients"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: '#10b981', r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Upcoming Appointments */}
      <Card className={`p-6 ${
        theme === 'dark' ? 'bg-slate-800 border-slate-700' : 'bg-white'
      }`}>
        <h3 className={`text-xl mb-4 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          {isArabic ? 'المواعيد القادمة' : 'Upcoming Appointments'}
        </h3>
        <div className="space-y-4">
          {upcomingAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className={`flex items-center justify-between p-4 rounded-xl ${
                theme === 'dark' ? 'bg-slate-700' : 'bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-emerald-500 flex items-center justify-center text-white">
                  {appointment.patient.charAt(0)}
                </div>
                <div>
                  <div className={`${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                    {appointment.patient}
                  </div>
                  <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    {appointment.type}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4" />
                  <span>{appointment.time}</span>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs ${
                    appointment.status === 'confirmed'
                      ? 'bg-emerald-500/20 text-emerald-500'
                      : 'bg-yellow-500/20 text-yellow-500'
                  }`}
                >
                  {appointment.status === 'confirmed'
                    ? isArabic ? 'مؤكد' : 'Confirmed'
                    : isArabic ? 'قيد الانتظار' : 'Pending'
                  }
                </span>
              </div>
            </div>
          ))}
        </div>
      </Card>
      </div>
    </div>
  );
}
