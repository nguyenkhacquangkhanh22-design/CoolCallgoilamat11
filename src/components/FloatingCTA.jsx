import React from 'react';
import { Phone, Wrench } from 'lucide-react';
import { useAuth } from '../context/useAuth';

export default function FloatingCTA({ onBookClick, currentSlide = 0 }) {
  const { isGuest, openAuthModal } = useAuth();
  // If already on booking slide, hide the redundant booking floating button
  const isBookingSlide = currentSlide === 3;

  const handleCall = (e) => {
    if (isGuest) {
      e.preventDefault();
      openAuthModal({
        tab: 'google',
        message: 'Bạn phải đăng ký hoặc đăng nhập tài khoản để gọi thợ hỗ trợ!'
      });
    }
  };

  return (
    <div className="fixed bottom-16 sm:bottom-16 right-3 sm:right-6 z-30 flex flex-col items-end gap-2 pointer-events-none select-none">
      <div className="pointer-events-auto flex flex-col gap-2 items-end">
        {/* Floating Hotline button */}
        <a
          href="tel:0905888666"
          onClick={handleCall}
          aria-label="Gọi hotline hỗ trợ khẩn cấp"
          className="group flex items-center gap-2 px-3 sm:px-4 py-2.5 rounded-full bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white shadow-xl shadow-emerald-950/20 hover:scale-105 transition-all duration-200 cursor-pointer"
        >
          <div className="relative">
            <Phone className="w-4 h-4 animate-bounce text-white" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-white animate-ping" />
          </div>
          <span className="text-xs font-extrabold whitespace-nowrap hidden sm:inline">
            Gọi thợ 24/7: 0905.888.666
          </span>
        </a>

        {/* Floating Quick Booking (hidden on booking slide) */}
        {!isBookingSlide && (
          <button
            type="button"
            onClick={onBookClick}
            aria-label="Đặt lịch thợ sửa ngay"
            className="group flex items-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-full bg-blue-900 hover:bg-blue-800 active:bg-blue-950 text-white shadow-xl shadow-blue-900/30 hover:scale-105 transition-all duration-200 cursor-pointer"
          >
            <Wrench className="w-4 h-4 text-sky-300 group-hover:rotate-12 transition-transform" />
            <span className="text-xs font-extrabold hidden sm:inline">
              Đặt thợ 30 phút
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
