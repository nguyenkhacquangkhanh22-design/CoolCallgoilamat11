import React, { useState, useEffect, useCallback } from 'react';
import { 
  CheckCircle2, 
  X, 
  MessageSquare 
} from 'lucide-react';
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
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/useAuth';
import AuthModal from './components/AuthModal';
import { OrderProvider, useOrders } from './context/OrderContext';
import TechnicianPortal from './components/technician/TechnicianPortal';
import NewOrderAlertModal from './components/technician/NewOrderAlertModal';
import LiveChatModal from './components/technician/LiveChatModal';
import DisputeModal from './components/technician/DisputeModal';
import TechnicianKYCModal from './components/technician/TechnicianKYCModal';
import { SERVICES } from './data/smartfixData';

function SmartFixApp() {
  const { isGuest, openAuthModal, toast, closeToast } = useAuth();
  const { isTechnicianView, createOrder, openChat, orders } = useOrders();
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDistrictId, setSelectedDistrictId] = useState('hai-chau');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookingSuccessData, setBookingSuccessData] = useState(null);

  // Smooth scroll to section by ID
  const scrollToSection = useCallback((id) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, []);

  // Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = ['hero', 'services', 'process', 'booking', 'pricing', 'why-us', 'coverage', 'reviews', 'faqs'];
      const scrollPos = window.scrollY + 140;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle booking action: Guests are prompted to login/register, customers scroll to form
  const handleBookingAction = useCallback(() => {
    if (isGuest) {
      openAuthModal({
        tab: 'google',
        message: 'Bạn phải đăng ký hoặc đăng nhập tài khoản để đặt thợ hoặc gọi thợ!'
      });
    } else {
      scrollToSection('booking');
    }
  }, [isGuest, openAuthModal, scrollToSection]);

  // When user searches in Hero
  const handleHeroSearch = ({ searchTerm, district }) => {
    setSearchQuery(searchTerm);
    if (district) setSelectedDistrictId(district);
    if (searchTerm.trim()) {
      scrollToSection('services');
    } else {
      if (isGuest) {
        openAuthModal({
          tab: 'google',
          message: 'Bạn phải đăng ký hoặc đăng nhập tài khoản để đặt thợ hoặc gọi thợ!'
        });
      } else {
        scrollToSection('booking');
      }
    }
  };

  // Quick service shortcut clicked
  const handleQuickService = (serviceId) => {
    if (isGuest) {
      openAuthModal({
        tab: 'google',
        message: 'Bạn phải đăng ký hoặc đăng nhập tài khoản để đặt thợ hoặc gọi thợ!'
      });
      return;
    }
    const found = SERVICES.find((s) => s.id === serviceId);
    if (found) {
      setSelectedService(found);
      scrollToSection('booking');
    }
  };

  // Service card "Đặt gói này" clicked
  const handleSelectServiceFromCard = (service) => {
    if (isGuest) {
      openAuthModal({
        tab: 'google',
        message: 'Bạn phải đăng ký hoặc đăng nhập tài khoản để đặt thợ hoặc gọi thợ!'
      });
      return;
    }
    setSelectedService(service);
    scrollToSection('booking');
  };

  // Pricing table "Đặt thợ" clicked
  const handleSelectPriceItem = (item) => {
    if (isGuest) {
      openAuthModal({
        tab: 'google',
        message: 'Bạn phải đăng ký hoặc đăng nhập tài khoản để đặt thợ hoặc gọi thợ!'
      });
      return;
    }
    const matchedService = SERVICES.find(
      (s) => s.title.toLowerCase().includes(item.item.toLowerCase().split('(')[0].trim())
    ) || SERVICES[0];
    setSelectedService(matchedService);
    scrollToSection('booking');
  };

  // District clicked in Coverage section
  const handleSelectDistrict = (districtId) => {
    setSelectedDistrictId(districtId);
    if (isGuest) {
      openAuthModal({
        tab: 'google',
        message: 'Bạn phải đăng ký hoặc đăng nhập tài khoản để đặt thợ hoặc gọi thợ!'
      });
      return;
    }
    scrollToSection('booking');
  };

  // Booking Form submitted
  const handleBookingSubmit = (data) => {
    setBookingSuccessData(data);

    // Create order and trigger live notification to technician portal
    createOrder({
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      district: data.district,
      districtName: data.districtName,
      addressDetail: data.addressDetail,
      serviceTitle: data.serviceName || data.serviceTitle,
      serviceId: data.serviceId,
      acType: data.acType,
      acBrand: data.acBrand,
      acQuantity: data.acQuantity,
      issueDescription: data.issueDescription,
      scheduleType: data.scheduleType,
      appointmentDate: data.appointmentDate,
      appointmentSlot: data.appointmentSlot,
      estimatedTotal: data.estimatedTotal,
      customerNote: data.customerNote
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased font-sans select-text">
      {/* 1. Header with navigation & Role Switcher */}
      <Header 
        activeSlideId={activeSection}
        onNavigateTo={scrollToSection}
        onBookNowClick={handleBookingAction}
      />

      {/* Conditional Rendering: Technician Workspace OR Customer Full Page */}
      {isTechnicianView ? (
        <TechnicianPortal />
      ) : (
        <main className="w-full">
          {/* Section 1: Hero */}
          <section id="hero">
            <Hero 
              onSearchSubmit={handleHeroSearch}
              onSelectQuickService={handleQuickService}
            />
          </section>

          {/* Section 2: Services Grid */}
          <section id="services" className="scroll-mt-20">
            <ServicesGrid 
              onSelectService={handleSelectServiceFromCard}
              searchQuery={searchQuery}
            />
          </section>

          {/* Section 3: Quy trình 3 bước */}
          <section id="process" className="scroll-mt-20">
            <ProcessSteps onStartBooking={handleBookingAction} />
          </section>

          {/* Section 4: Form Đặt Lịch Thợ Cấp Tốc */}
          <section id="booking" className="scroll-mt-20">
            <BookingForm 
              selectedServiceFromParent={selectedService}
              initialDistrict={selectedDistrictId}
              onBookingSubmit={handleBookingSubmit}
            />
          </section>

          {/* Section 5: Bảng giá niêm yết */}
          <section id="pricing" className="scroll-mt-20">
            <PricingTable onSelectPriceItem={handleSelectPriceItem} />
          </section>

          {/* Section 6: Tại sao chọn SmartFix */}
          <section id="why-us" className="scroll-mt-20">
            <WhyChooseUs />
          </section>

          {/* Section 7: Khu vực phủ sóng Đà Nẵng */}
          <section id="coverage" className="scroll-mt-20">
            <CoverageDanang onSelectDistrict={handleSelectDistrict} />
          </section>

          {/* Section 8: Khách hàng đánh giá */}
          <section id="reviews" className="scroll-mt-20">
            <Testimonials />
          </section>

          {/* Section 9: FAQ & Footer */}
          <section id="faqs" className="scroll-mt-20">
            <FAQSection />
            <Footer 
              onScrollToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
              onNavigateTo={scrollToSection} 
            />
          </section>
        </main>
      )}

      {/* Quick Floating Action Button (Hotline & Book) */}
      {!isTechnicianView && (
        <FloatingCTA onBookClick={handleBookingAction} />
      )}

      {/* Customer Quick Chat Floating Pill */}
      {orders.some(o => ['accepted', 'arrived', 'in_progress', 'completed'].includes(o.status)) && (
        <button
          type="button"
          onClick={() => {
            const target = orders.find(o => ['accepted', 'arrived', 'in_progress'].includes(o.status)) || orders[0];
            if (target) openChat(target.id);
          }}
          className="fixed bottom-6 left-3 sm:left-6 z-40 bg-gradient-to-r from-blue-900 via-blue-800 to-sky-700 hover:from-blue-800 hover:to-sky-600 text-white px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 font-bold text-xs cursor-pointer border border-sky-400/40 hover:scale-105 transition-all select-none"
        >
          <MessageSquare className="w-4 h-4 text-sky-300 animate-pulse" />
          <span>💬 Chat với Thợ</span>
        </button>
      )}

      {/* Booking Success Modal Popup */}
      {bookingSuccessData && (
        <BookingSuccessModal 
          booking={bookingSuccessData} 
          onClose={() => setBookingSuccessData(null)} 
        />
      )}

      {/* Global Toast Notification */}
      {toast && (
        <div className="fixed top-20 right-3 sm:right-6 z-50 max-w-md animate-in slide-in-from-top-4 duration-300">
          <div className={`p-4 rounded-2xl shadow-2xl border text-xs sm:text-sm flex items-start gap-3 ${
            toast.type === 'success' 
              ? 'bg-blue-950 text-white border-emerald-400 shadow-emerald-950/20' 
              : 'bg-slate-900 text-white border-blue-400 shadow-blue-950/20'
          }`}>
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex-1 text-left font-semibold leading-relaxed">
              {toast.message}
            </div>
            <button 
              type="button"
              onClick={closeToast}
              className="text-white/60 hover:text-white p-1 rounded-md cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Modals for Technician & Customer Interactivity */}
      <NewOrderAlertModal />
      <LiveChatModal />
      <DisputeModal />

      {/* Authentication Modal for Guest to Register / Login */}
      <AuthModal />

      {/* Technician eKYC Registration Modal (CCCD, Certificates, Face Match) */}
      <TechnicianKYCModal />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <OrderProvider>
        <SmartFixApp />
      </OrderProvider>
    </AuthProvider>
  );
}
