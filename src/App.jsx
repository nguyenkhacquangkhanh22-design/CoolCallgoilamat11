import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Home, 
  Wrench, 
  ListOrdered, 
  CalendarCheck, 
  Tag, 
  ShieldCheck, 
  MapPin, 
  Star, 
  HelpCircle,
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
import { SlideTabs, SideSlideArrows, SlideBottomBar } from './components/SlideNavigation';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './context/useAuth';
import AuthModal from './components/AuthModal';
import { OrderProvider, useOrders } from './context/OrderContext';
import TechnicianPortal from './components/technician/TechnicianPortal';
import NewOrderAlertModal from './components/technician/NewOrderAlertModal';
import LiveChatModal from './components/technician/LiveChatModal';
import DisputeModal from './components/technician/DisputeModal';
import { SERVICES } from './data/smartfixData';

const SLIDES = [
  {
    id: 'hero',
    label: 'Trang chủ',
    title: 'SmartFix Đà Nẵng',
    icon: Home,
  },
  {
    id: 'services',
    label: 'Dịch vụ',
    title: 'Các gói dịch vụ máy lạnh',
    icon: Wrench,
  },
  {
    id: 'process',
    label: 'Quy trình',
    title: 'Quy trình đặt thợ 3 bước',
    icon: ListOrdered,
  },
  {
    id: 'booking',
    label: 'Đặt lịch',
    title: 'Form đặt thợ cấp tốc 30 phút',
    icon: CalendarCheck,
  },
  {
    id: 'pricing',
    label: 'Bảng giá',
    title: 'Bảng giá niêm yết công khai',
    icon: Tag,
  },
  {
    id: 'why-us',
    label: 'Ưu điểm',
    title: 'Tại sao chọn SmartFix',
    icon: ShieldCheck,
  },
  {
    id: 'coverage',
    label: 'Khu vực',
    title: 'Mạng lưới thợ tại Đà Nẵng',
    icon: MapPin,
  },
  {
    id: 'reviews',
    label: 'Đánh giá',
    title: 'Khách hàng đánh giá thực tế',
    icon: Star,
  },
  {
    id: 'faqs',
    label: 'Hỏi đáp & LH',
    title: 'Câu hỏi thường gặp & Liên hệ',
    icon: HelpCircle,
  },
];

function SmartFixApp() {
  const { isGuest, openAuthModal, toast, closeToast } = useAuth();
  const { isTechnicianView, createOrder, openChat, orders } = useOrders();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDistrictId, setSelectedDistrictId] = useState('hai-chau');
  const [searchQuery, setSearchQuery] = useState('');
  const [bookingSuccessData, setBookingSuccessData] = useState(null);

  const sliderRef = useRef(null);
  const isProgrammaticScroll = useRef(false);

  // Navigate to slide by index with smooth horizontal animation
  const goToSlide = useCallback((index) => {
    if (index < 0 || index >= SLIDES.length) return;
    setCurrentSlide(index);
    if (sliderRef.current) {
      isProgrammaticScroll.current = true;
      const slideWidth = sliderRef.current.clientWidth;
      sliderRef.current.scrollTo({
        left: index * slideWidth,
        behavior: 'smooth',
      });
      setTimeout(() => {
        isProgrammaticScroll.current = false;
      }, 450);
    }
  }, []);

  // Navigate to slide by section ID
  const goToSlideById = useCallback((id) => {
    const foundIndex = SLIDES.findIndex((s) => s.id === id);
    if (foundIndex !== -1) {
      goToSlide(foundIndex);
    }
  }, [goToSlide]);

  // Handle booking action: Guests are prompted to login/register, customers go to form
  const handleBookingAction = useCallback(() => {
    if (isGuest) {
      openAuthModal({
        tab: 'google',
        message: 'Bạn phải đăng ký hoặc đăng nhập tài khoản để đặt thợ hoặc gọi thợ!'
      });
    } else {
      goToSlideById('booking');
    }
  }, [isGuest, openAuthModal, goToSlideById]);

  // Handle native swipe / scroll inside horizontal snap container
  const handleScroll = (e) => {
    if (isProgrammaticScroll.current) return;
    const container = e.currentTarget;
    const { scrollLeft, clientWidth } = container;
    if (clientWidth > 0) {
      const newIndex = Math.round(scrollLeft / clientWidth);
      if (newIndex >= 0 && newIndex < SLIDES.length && newIndex !== currentSlide) {
        setCurrentSlide(newIndex);
      }
    }
  };

  // Keyboard navigation (Left / Right Arrow)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement?.tagName)) {
        return;
      }
      if (e.key === 'ArrowRight') {
        goToSlide(currentSlide + 1);
      } else if (e.key === 'ArrowLeft') {
        goToSlide(currentSlide - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, goToSlide]);

  // Handle window resize to prevent slide misalignment
  useEffect(() => {
    const handleResize = () => {
      if (sliderRef.current) {
        const slideWidth = sliderRef.current.clientWidth;
        sliderRef.current.scrollTo({
          left: currentSlide * slideWidth,
          behavior: 'auto',
        });
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [currentSlide]);

  // When user searches in Hero
  const handleHeroSearch = ({ searchTerm, district }) => {
    setSearchQuery(searchTerm);
    if (district) setSelectedDistrictId(district);
    if (searchTerm.trim()) {
      goToSlideById('services');
    } else {
      if (isGuest) {
        openAuthModal({
          tab: 'google',
          message: 'Bạn phải đăng ký hoặc đăng nhập tài khoản để đặt thợ hoặc gọi thợ!'
        });
      } else {
        goToSlideById('booking');
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
      goToSlideById('booking');
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
    goToSlideById('booking');
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
    goToSlideById('booking');
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
    goToSlideById('booking');
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
    <div className="h-screen max-h-screen w-screen flex flex-col bg-slate-50 text-slate-800 antialiased font-sans overflow-hidden select-text">
      {/* 1. Header with active category & Role Switcher */}
      <Header 
        activeSlideId={SLIDES[currentSlide]?.id}
        onNavigateTo={goToSlideById}
        onBookNowClick={handleBookingAction}
      />

      {/* Conditional Rendering: Technician Workspace OR Customer Slide Deck */}
      {isTechnicianView ? (
        <div className="flex-1 overflow-y-auto">
          <TechnicianPortal />
        </div>
      ) : (
        <>
          {/* 2. Top Interactive Slide Tabs */}
          <SlideTabs 
            slides={SLIDES}
            currentSlide={currentSlide}
            onSelectSlide={goToSlide}
          />

          {/* 3. Horizontal Swipable Slide Deck */}
          <main 
            ref={sliderRef}
            onScroll={handleScroll}
            className="w-full flex-1 overflow-x-auto overflow-y-hidden snap-x snap-mandatory flex flex-nowrap no-scrollbar scroll-smooth"
            style={{
              WebkitOverflowScrolling: 'touch',
              scrollSnapType: 'x mandatory',
            }}
          >
            {/* Slide 0: Hero */}
            <div 
              id="hero"
              className="w-full min-w-full flex-shrink-0 snap-start snap-always h-full overflow-y-auto overscroll-contain"
            >
              <div className="min-h-full pb-24 sm:pb-28">
                <Hero 
                  onSearchSubmit={handleHeroSearch}
                  onSelectQuickService={handleQuickService}
                  onGoNext={() => goToSlide(1)}
                />
              </div>
            </div>

            {/* Slide 1: Services Grid */}
            <div 
              id="services"
              className="w-full min-w-full flex-shrink-0 snap-start snap-always h-full overflow-y-auto overscroll-contain"
            >
              <div className="min-h-full pb-24 sm:pb-28">
                <ServicesGrid 
                  onSelectService={handleSelectServiceFromCard}
                  searchQuery={searchQuery}
                />
              </div>
            </div>

            {/* Slide 2: Quy trình 3 bước */}
            <div 
              id="process"
              className="w-full min-w-full flex-shrink-0 snap-start snap-always h-full overflow-y-auto overscroll-contain"
            >
              <div className="min-h-full pb-24 sm:pb-28">
                <ProcessSteps onStartBooking={() => goToSlideById('booking')} />
              </div>
            </div>

            {/* Slide 3: Form Đặt Lịch Thợ Cấp Tốc */}
            <div 
              id="booking"
              className="w-full min-w-full flex-shrink-0 snap-start snap-always h-full overflow-y-auto overscroll-contain"
            >
              <div className="min-h-full pb-24 sm:pb-28">
                <BookingForm 
                  selectedServiceFromParent={selectedService}
                  initialDistrict={selectedDistrictId}
                  onBookingSubmit={handleBookingSubmit}
                />
              </div>
            </div>

            {/* Slide 4: Bảng giá niêm yết */}
            <div 
              id="pricing"
              className="w-full min-w-full flex-shrink-0 snap-start snap-always h-full overflow-y-auto overscroll-contain"
            >
              <div className="min-h-full pb-24 sm:pb-28">
                <PricingTable onSelectPriceItem={handleSelectPriceItem} />
              </div>
            </div>

            {/* Slide 5: Tại sao chọn SmartFix */}
            <div 
              id="why-us"
              className="w-full min-w-full flex-shrink-0 snap-start snap-always h-full overflow-y-auto overscroll-contain"
            >
              <div className="min-h-full pb-24 sm:pb-28">
                <WhyChooseUs />
              </div>
            </div>

            {/* Slide 6: Khu vực phủ sóng Đà Nẵng */}
            <div 
              id="coverage"
              className="w-full min-w-full flex-shrink-0 snap-start snap-always h-full overflow-y-auto overscroll-contain"
            >
              <div className="min-h-full pb-24 sm:pb-28">
                <CoverageDanang onSelectDistrict={handleSelectDistrict} />
              </div>
            </div>

            {/* Slide 7: Khách hàng đánh giá */}
            <div 
              id="reviews"
              className="w-full min-w-full flex-shrink-0 snap-start snap-always h-full overflow-y-auto overscroll-contain"
            >
              <div className="min-h-full pb-24 sm:pb-28">
                <Testimonials />
              </div>
            </div>

            {/* Slide 8: FAQ & Footer */}
            <div 
              id="faqs"
              className="w-full min-w-full flex-shrink-0 snap-start snap-always h-full overflow-y-auto overscroll-contain"
            >
              <div className="min-h-full pb-24 sm:pb-28">
                <FAQSection />
                <Footer 
                  onScrollToTop={() => goToSlide(0)} 
                  onNavigateTo={goToSlideById} 
                />
              </div>
            </div>
          </main>

          {/* Desktop Floating Side Navigation Arrows */}
          <SideSlideArrows 
            currentSlide={currentSlide}
            totalSlides={SLIDES.length}
            onGoToSlide={goToSlide}
            slides={SLIDES}
          />

          {/* Bottom Floating Navigation Bar */}
          <SlideBottomBar 
            slides={SLIDES}
            currentSlide={currentSlide}
            onGoToSlide={goToSlide}
            onBookNow={handleBookingAction}
          />

          {/* Quick Floating Hotline / Action Button */}
          <FloatingCTA 
            currentSlide={currentSlide}
            onBookClick={handleBookingAction} 
          />

          {/* Customer Quick Chat Floating Pill */}
          {orders.some(o => ['accepted', 'arrived', 'in_progress', 'completed'].includes(o.status)) && (
            <button
              type="button"
              onClick={() => {
                const target = orders.find(o => ['accepted', 'arrived', 'in_progress'].includes(o.status)) || orders[0];
                if (target) openChat(target.id);
              }}
              className="fixed bottom-18 sm:bottom-18 left-3 sm:left-6 z-40 bg-gradient-to-r from-blue-900 via-blue-800 to-sky-700 hover:from-blue-800 hover:to-sky-600 text-white px-3.5 py-2.5 rounded-full shadow-2xl flex items-center gap-2 font-bold text-xs cursor-pointer border border-sky-400/40 hover:scale-105 transition-all select-none"
            >
              <MessageSquare className="w-4 h-4 text-sky-300 animate-pulse" />
              <span>💬 Chat với Thợ</span>
            </button>
          )}
        </>
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
