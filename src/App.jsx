import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ServicesGrid from './components/ServicesGrid';
import ProcessSteps from './components/ProcessSteps';
import PricingTable from './components/PricingTable';
import CoverageDanang from './components/CoverageDanang';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import FAQSection from './components/FAQSection';
import BookingForm from './components/BookingForm';
import BookingSuccessModal from './components/BookingSuccessModal';
import FloatingCTA from './components/FloatingCTA';
import Footer from './components/Footer';
import { SERVICES } from './data/coolcallData';

export default function App() {
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDistrictId, setSelectedDistrictId] = useState('hai-chau');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookingSuccessData, setBookingSuccessData] = useState(null);

  // Smooth scroll helper
  const scrollToBooking = () => {
    const el = document.getElementById('booking');
    if (el) {
      const yOffset = -70;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      const yOffset = -70;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  // When user searches in Hero
  const handleHeroSearch = ({ searchTerm, district }) => {
    setSearchQuery(searchTerm);
    if (district) setSelectedDistrictId(district);
    if (searchTerm.trim()) {
      scrollToServices();
    } else {
      scrollToBooking();
    }
  };

  // Quick service shortcut clicked
  const handleQuickService = (serviceId) => {
    const found = SERVICES.find((s) => s.id === serviceId);
    if (found) {
      setSelectedService(found);
      scrollToBooking();
    }
  };

  // Service card "Đặt gói này" clicked
  const handleSelectServiceFromCard = (service) => {
    setSelectedService(service);
    scrollToBooking();
  };

  // Pricing table "Đặt thợ" clicked
  const handleSelectPriceItem = (item) => {
    const matchedService = SERVICES.find(
      (s) => s.title.toLowerCase().includes(item.item.toLowerCase().split('(')[0].trim())
    ) || SERVICES[0];
    setSelectedService(matchedService);
    scrollToBooking();
  };

  // District clicked
  const handleSelectDistrict = (districtId) => {
    setSelectedDistrictId(districtId);
    scrollToBooking();
  };

  // Booking Form submitted
  const handleBookingSubmit = (data) => {
    setBookingSuccessData(data);
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* 1. Header & Navigation */}
      <Header onBookNowClick={scrollToBooking} />

      {/* 2. Hero Section with Quick Search */}
      <Hero 
        onSearchSubmit={handleHeroSearch}
        onSelectQuickService={handleQuickService}
      />

      {/* 3. Services Grid */}
      <ServicesGrid 
        onSelectService={handleSelectServiceFromCard}
        searchQuery={searchQuery}
      />

      {/* 4. Quy trình đặt thợ 3 bước */}
      <ProcessSteps onStartBooking={scrollToBooking} />

      {/* 5. Form Đặt Lịch Thợ Sửa Nhanh */}
      <BookingForm 
        selectedServiceFromParent={selectedService}
        initialDistrict={selectedDistrictId}
        onBookingSubmit={handleBookingSubmit}
      />

      {/* Extra Trust & Pricing Sections */}
      <PricingTable onSelectPriceItem={handleSelectPriceItem} />
      <WhyChooseUs />
      <CoverageDanang onSelectDistrict={handleSelectDistrict} />
      <Testimonials />
      <FAQSection />

      {/* 6. Footer */}
      <Footer onScrollToTop={handleScrollToTop} />

      {/* Floating CTA Buttons */}
      <FloatingCTA onBookClick={scrollToBooking} />

      {/* Booking Success Modal Popup */}
      {bookingSuccessData && (
        <BookingSuccessModal 
          booking={bookingSuccessData} 
          onClose={() => setBookingSuccessData(null)} 
        />
      )}
    </div>
  );
}
