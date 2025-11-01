import React, { useState } from 'react';
import { AppProvider } from './contexts/AppContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { FeaturesShowcase } from './components/FeaturesShowcase';
import { HospitalsSection } from './components/HospitalsSection';
import { DoctorsSection } from './components/DoctorsSection';
import { AboutSection } from './components/AboutSection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { DashboardSidebar } from './components/DashboardSidebar';
import { DashboardContent } from './components/DashboardContent';
import { AuthLogin } from './components/AuthLogin';
import { AuthRegister } from './components/AuthRegister';
import { QuickNav } from './components/QuickNav';
import { Toaster } from './components/ui/sonner';

type Page = 'home' | 'dashboard' | 'login' | 'register';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  // Listen for hash changes to navigate
  React.useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash === 'login') setCurrentPage('login');
      else if (hash === 'register') setCurrentPage('register');
      else if (hash === 'dashboard') setCurrentPage('dashboard');
      else setCurrentPage('home');
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  if (currentPage === 'login') {
    return <AuthLogin />;
  }

  if (currentPage === 'register') {
    return <AuthRegister />;
  }

  if (currentPage === 'dashboard') {
    return (
      <div className="flex min-h-screen">
        <DashboardSidebar />
        <main className="flex-1 lg:ml-72">
          <DashboardContent />
        </main>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ServicesSection />
        <FeaturesShowcase />
        <HospitalsSection />
        <DoctorsSection />
        <AboutSection />
        <ReviewsSection />
      </main>
      <Footer />
    </>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
      <QuickNav />
      <Toaster />
    </AppProvider>
  );
}
