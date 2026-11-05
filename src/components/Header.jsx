import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Clock, 
  MapPin, 
  Menu, 
  X, 
  Snowflake, 
  Wrench, 
  ShieldCheck, 
  ChevronRight,
  LogIn,
  LogOut,
  CheckCircle2
} from 'lucide-react';
import { useAuth } from '../context/useAuth';

export default function Header({ onBookNowClick, activeSlideId = 'hero', onNavigateTo }) {
  const { user, isGuest, openAuthModal, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setMobileMenuOpen(false);
    if (onNavigateTo) {
      onNavigateTo(id);
    } else {
      const element = document.getElementById(id);
      if (element) {
        const yOffset = -80;
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  const navItemClass = (id) => {
    const isActive = activeSlideId === id;
    return `px-3 py-2 text-sm font-semibold rounded-lg transition-all cursor-pointer ${
      isActive 
        ? 'bg-blue-900 text-white shadow-sm' 
        : 'text-slate-700 hover:text-blue-900 hover:bg-blue-50/80'
    }`;
  };

  return (
    <>
      {/* Top micro bar for high-trust signaling */}
      <div className="bg-blue-950 text-blue-100 text-xs py-2 px-4 border-b border-blue-900/60 transition-all select-none">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="inline-flex items-center gap-1.5 text-blue-200">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <strong className="text-white font-medium">14 thợ đang trực sẵn</strong> tại Hải Châu, Thanh Khê, Sơn Trà...
            </span>
            <span className="hidden md:inline-flex items-center gap-1 text-blue-200">
              <Clock className="w-3.5 h-3.5 text-sky-400" />
              Cam kết có mặt sau 20 - 30 phút
            </span>
            <span className="hidden lg:inline-flex items-center gap-1 text-blue-200">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
              Bảo hành minh bạch 3 - 6 tháng
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="hidden sm:inline text-amber-300 font-medium">
              🎁 Ưu đãi: Giảm 10% khi vệ sinh từ 2 máy
            </span>
            <a 
              href="tel:0905888666" 
              className="flex items-center gap-1 text-white hover:text-sky-300 font-semibold tracking-wide"
            >
              <Phone className="w-3 h-3 text-emerald-400 animate-pulse" />
              <span>Hotline 24/7: 0905.888.666</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main sticky navigation */}
      <header 
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 backdrop-blur-md shadow-md shadow-blue-900/5 border-b border-blue-100' 
            : 'bg-white border-b border-slate-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo and Slogan */}
            <div 
              onClick={() => handleNavClick('hero')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-900 via-blue-800 to-sky-600 flex items-center justify-center text-white shadow-lg shadow-blue-900/20 group-hover:scale-105 transition-transform duration-200">
                <div className="relative">
                  <Snowflake className="w-7 h-7 text-sky-200 animate-spin-slow" />
                  <Wrench className="w-3.5 h-3.5 text-amber-300 absolute -bottom-1 -right-1 drop-shadow" />
                </div>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="text-2xl font-black tracking-tight text-blue-950 font-sans">
                    Cool<span className="text-sky-600">Call</span>
                  </span>
                  <span className="bg-sky-100 text-sky-800 text-[10px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider border border-sky-200">
                    Đà Nẵng
                  </span>
                </div>
                <p className="text-xs text-slate-500 font-medium hidden sm:block">
                  Thợ sửa máy lạnh tận tâm - Có mặt sau 30 phút
                </p>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              <button 
                onClick={() => handleNavClick('services')}
                className={navItemClass('services')}
              >
                Dịch vụ
              </button>
              <button 
                onClick={() => handleNavClick('pricing')}
                className={navItemClass('pricing')}
              >
                Bảng giá
              </button>
              <button 
                onClick={() => handleNavClick('process')}
                className={navItemClass('process')}
              >
                Quy trình 3 bước
              </button>
              <button 
                onClick={() => handleNavClick('coverage')}
                className={navItemClass('coverage')}
              >
                Khu vực phục vụ
              </button>
              <button 
                onClick={() => handleNavClick('reviews')}
                className={navItemClass('reviews')}
              >
                Đánh giá
              </button>
              <button 
                onClick={() => handleNavClick('faqs')}
                className={navItemClass('faqs')}
              >
                Hỏi đáp
              </button>
            </nav>

            {/* Right Action buttons */}
            <div className="flex items-center gap-2.5 sm:gap-3">
              {/* User Auth Status Pill */}
              {isGuest ? (
                <button
                  type="button"
                  onClick={() => openAuthModal({ tab: 'login', message: 'Đăng nhập hoặc Đăng ký để kích hoạt quyền gọi thợ!' })}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-blue-200 hover:border-blue-400 bg-blue-50/70 hover:bg-blue-100 text-blue-900 font-bold text-xs sm:text-sm transition-all cursor-pointer shadow-xs"
                >
                  <LogIn className="w-4 h-4 text-blue-700" />
                  <span>Đăng nhập</span>
                </button>
              ) : (
                <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-blue-50/90 border border-blue-200">
                  <div className="w-7 h-7 rounded-lg bg-blue-900 text-white flex items-center justify-center font-black text-xs">
                    {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="hidden sm:block text-left text-xs">
                    <span className="block font-bold text-blue-950 truncate max-w-[110px]">{user?.fullName}</span>
                    <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5">
                      <CheckCircle2 className="w-2.5 h-2.5" /> Thành viên
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={logout}
                    title="Đăng xuất"
                    className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              <a
                href="tel:0905888666"
                className="hidden xl:flex items-center gap-2.5 px-3.5 py-2 rounded-xl border border-blue-200 bg-blue-50/60 hover:bg-blue-100/80 text-blue-900 font-semibold text-sm transition-all shadow-xs"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-900 text-white flex items-center justify-center">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="block text-[10px] uppercase font-bold text-slate-500 tracking-wider">Hỗ trợ khẩn cấp</span>
                  <span className="text-sm font-bold text-blue-950">0905.888.666</span>
                </div>
              </a>

              <button
                onClick={() => {
                  if (isGuest) {
                    openAuthModal({ tab: 'login', message: '🔒 Bạn đang ở quyền Guest. Vui lòng đăng nhập hoặc đăng ký tài khoản để gọi thợ!' });
                  } else {
                    onBookNowClick();
                  }
                }}
                className="relative inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-blue-900 hover:bg-blue-800 active:bg-blue-950 text-white font-bold text-xs sm:text-sm shadow-md shadow-blue-900/20 hover:shadow-lg hover:shadow-blue-900/30 transition-all cursor-pointer transform hover:-translate-y-0.5"
              >
                <span className="relative z-10 flex items-center gap-1.5">
                  <Wrench className="w-4 h-4 text-sky-300" />
                  <span>Đặt thợ ngay</span>
                </span>
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                </span>
              </button>

              {/* Mobile menu toggle */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2.5 rounded-xl text-slate-700 hover:bg-blue-50 hover:text-blue-900 transition-colors cursor-pointer"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-blue-100 bg-white shadow-xl animate-in fade-in duration-200">
            <div className="px-4 pt-3 pb-6 space-y-1">
              <div className="p-3 bg-blue-50/80 rounded-xl mb-3 border border-blue-100">
                <p className="text-xs font-semibold text-blue-900 flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  Đà Nẵng: 14 thợ cơ động đang sẵn sàng
                </p>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Cam kết có mặt sau 20-30 phút tại mọi quận huyện.
                </p>
              </div>

              <button 
                onClick={() => handleNavClick('services')}
                className="w-full flex items-center justify-between px-3 py-2.5 text-base font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-900 rounded-lg text-left"
              >
                <span>Dịch vụ sửa chữa & bảo dưỡng</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
              <button 
                onClick={() => handleNavClick('pricing')}
                className="w-full flex items-center justify-between px-3 py-2.5 text-base font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-900 rounded-lg text-left"
              >
                <span>Bảng giá minh bạch</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
              <button 
                onClick={() => handleNavClick('process')}
                className="w-full flex items-center justify-between px-3 py-2.5 text-base font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-900 rounded-lg text-left"
              >
                <span>Quy trình đặt thợ 3 bước</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
              <button 
                onClick={() => handleNavClick('coverage')}
                className="w-full flex items-center justify-between px-3 py-2.5 text-base font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-900 rounded-lg text-left"
              >
                <span>Các quận phục vụ tại Đà Nẵng</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
              <button 
                onClick={() => handleNavClick('reviews')}
                className="w-full flex items-center justify-between px-3 py-2.5 text-base font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-900 rounded-lg text-left"
              >
                <span>Khách hàng đánh giá</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
              <button 
                onClick={() => handleNavClick('faqs')}
                className="w-full flex items-center justify-between px-3 py-2.5 text-base font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-900 rounded-lg text-left"
              >
                <span>Câu hỏi thường gặp</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
                {/* Mobile Auth button */}
                {isGuest ? (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      openAuthModal({ tab: 'login', message: 'Đăng nhập hoặc Đăng ký để kích hoạt quyền gọi thợ!' });
                    }}
                    className="w-full py-2.5 px-4 rounded-xl bg-blue-100/80 text-blue-950 font-bold flex items-center justify-center gap-2 border border-blue-200"
                  >
                    <LogIn className="w-4 h-4 text-blue-700" />
                    <span>Đăng nhập / Đăng ký tài khoản</span>
                  </button>
                ) : (
                  <div className="p-3 bg-blue-50/80 rounded-xl border border-blue-100 flex items-center justify-between">
                    <div className="text-left">
                      <span className="text-[11px] text-slate-500 block">Tài khoản thành viên:</span>
                      <strong className="text-sm text-blue-950">{user?.fullName}</strong>
                      <span className="text-[10px] text-emerald-600 font-semibold block">Đã mở khóa quyền gọi thợ</span>
                    </div>
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false);
                        logout();
                      }}
                      className="px-3 py-1.5 rounded-lg bg-white border border-rose-200 text-rose-600 font-bold text-xs flex items-center gap-1 shadow-xs"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                )}

                <a
                  href="tel:0905888666"
                  className="w-full py-3 px-4 rounded-xl bg-blue-50 border border-blue-200 text-blue-900 font-bold flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-emerald-600" />
                  Gọi tổng đài: 0905.888.666
                </a>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    if (isGuest) {
                      openAuthModal({ tab: 'login', message: '🔒 Bạn đang ở quyền Guest. Vui lòng đăng nhập hoặc đăng ký tài khoản để gọi thợ!' });
                    } else {
                      onBookNowClick();
                    }
                  }}
                  className="w-full py-3 px-4 rounded-xl bg-blue-900 text-white font-bold flex items-center justify-center gap-2 shadow-md shadow-blue-900/20"
                >
                  <Wrench className="w-4 h-4 text-sky-300" />
                  Đặt lịch thợ đến ngay
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
