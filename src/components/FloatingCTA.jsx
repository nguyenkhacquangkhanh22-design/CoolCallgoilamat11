import React, { useState, useEffect } from 'react';
import { Phone, Wrench } from 'lucide-react';

export default function FloatingCTA({ onBookClick }) {
  const [showFloating, setShowFloating] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowFloating(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!showFloating) return null;

  return (
    <>
      {/* Floating Desktop & Tablet Hotline Button (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 hidden sm:flex flex-col gap-3">
        {/* Hotline pill button */}
        <a
          href="tel:0905888666"
          className="group flex items-center gap-2.5 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-900/20 hover:shadow-2xl hover:scale-105 transition-all duration-200"
        >
          <div className="relative">
            <Phone className="w-5 h-5 animate-bounce" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-white animate-ping" />
          </div>
          <span className="text-xs font-bold whitespace-nowrap">
            Hotline: 0905.888.666
          </span>
        </a>

        {/* Quick Booking button */}
        <button
          type="button"
          onClick={onBookClick}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-blue-900 hover:bg-blue-800 text-white shadow-xl shadow-blue-900/30 hover:scale-105 transition-all duration-200 cursor-pointer"
        >
          <Wrench className="w-4 h-4 text-sky-300" />
          <span className="text-xs font-bold">Đặt thợ 30 phút</span>
        </button>
      </div>

      {/* Sticky Mobile Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-white/95 backdrop-blur-md border-t border-slate-200 p-2.5 px-4 flex items-center gap-2.5 shadow-2xl">
        <a
          href="tel:0905888666"
          className="flex-1 py-3 px-3 rounded-xl bg-emerald-600 active:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md"
        >
          <Phone className="w-4 h-4 animate-pulse" />
          <span>Gọi 0905.888.666</span>
        </a>

        <button
          type="button"
          onClick={onBookClick}
          className="flex-1 py-3 px-3 rounded-xl bg-blue-900 active:bg-blue-950 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-900/20"
        >
          <Wrench className="w-4 h-4 text-sky-300" />
          <span>Đặt thợ ngay</span>
        </button>
      </div>
    </>
  );
}
