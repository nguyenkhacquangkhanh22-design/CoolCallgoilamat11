import React, { useEffect, useRef } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Phone, 
  Wrench, 
  MoveRight,
  RotateCcw
} from 'lucide-react';

/**
 * Top horizontal slide category / tab bar
 */
export function SlideTabs({ slides, currentSlide, onSelectSlide }) {
  const tabsContainerRef = useRef(null);
  const activeTabRef = useRef(null);

  // Auto-scroll the active tab into center view
  useEffect(() => {
    if (activeTabRef.current && tabsContainerRef.current) {
      activeTabRef.current.scrollIntoView({
        behavior: 'smooth',
        inline: 'center',
        block: 'nearest'
      });
    }
  }, [currentSlide]);

  return (
    <div className="bg-white/95 backdrop-blur-md border-b border-blue-100 z-20 select-none shadow-xs">
      <div 
        ref={tabsContainerRef}
        className="max-w-7xl mx-auto px-2 sm:px-4 py-2 overflow-x-auto no-scrollbar flex items-center gap-1.5 sm:gap-2"
      >
        <span className="hidden md:inline-flex items-center text-[11px] font-bold text-slate-400 uppercase tracking-wider pl-2 pr-1">
          Mục:
        </span>
        {slides.map((slide, idx) => {
          const isActive = currentSlide === idx;
          const Icon = slide.icon;
          return (
            <button
              key={slide.id}
              ref={isActive ? activeTabRef : null}
              type="button"
              onClick={() => onSelectSlide(idx)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-1.5 cursor-pointer shrink-0 ${
                isActive
                  ? 'bg-blue-900 text-white shadow-md shadow-blue-900/25 scale-[1.02]'
                  : 'bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-900 border border-slate-200/80 hover:border-blue-200'
              }`}
            >
              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-black ${
                isActive ? 'bg-sky-400 text-blue-950' : 'bg-slate-200 text-slate-600'
              }`}>
                {idx + 1}
              </span>
              {Icon && <Icon className="w-3.5 h-3.5" />}
              <span>{slide.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Floating side arrows for desktop & tablet
 */
export function SideSlideArrows({ currentSlide, totalSlides, onGoToSlide, slides }) {
  const hasPrev = currentSlide > 0;
  const hasNext = currentSlide < totalSlides - 1;

  return (
    <>
      {/* Left side button (Previous Slide) */}
      {hasPrev && (
        <button
          type="button"
          onClick={() => onGoToSlide(currentSlide - 1)}
          aria-label="Xem trang trước"
          className="hidden md:flex fixed left-3 lg:left-6 top-1/2 -translate-y-1/2 z-30 group items-center gap-2 pl-3 pr-4 py-3 rounded-full bg-white/90 hover:bg-white text-blue-950 shadow-xl shadow-blue-950/15 border border-blue-100 hover:border-blue-300 backdrop-blur-md transition-all duration-200 hover:scale-105 cursor-pointer"
        >
          <ChevronLeft className="w-5 h-5 text-blue-900 group-hover:-translate-x-0.5 transition-transform" />
          <div className="text-left hidden lg:block">
            <span className="block text-[10px] uppercase font-bold text-slate-400 leading-none">Trước</span>
            <span className="text-xs font-bold text-blue-950 max-w-[120px] truncate block leading-tight">
              {slides[currentSlide - 1]?.label}
            </span>
          </div>
        </button>
      )}

      {/* Right side button (Next Slide) */}
      {hasNext && (
        <button
          type="button"
          onClick={() => onGoToSlide(currentSlide + 1)}
          aria-label="Xem trang tiếp theo"
          className="hidden md:flex fixed right-3 lg:right-6 top-1/2 -translate-y-1/2 z-30 group items-center gap-2 pr-3 pl-4 py-3 rounded-full bg-blue-900 hover:bg-blue-800 text-white shadow-xl shadow-blue-900/30 border border-blue-700/50 backdrop-blur-md transition-all duration-200 hover:scale-105 cursor-pointer"
        >
          <div className="text-right hidden lg:block">
            <span className="block text-[10px] uppercase font-bold text-sky-200 leading-none">Tiếp theo</span>
            <span className="text-xs font-bold text-white max-w-[120px] truncate block leading-tight">
              {slides[currentSlide + 1]?.label}
            </span>
          </div>
          <ChevronRight className="w-5 h-5 text-sky-300 group-hover:translate-x-0.5 transition-transform" />
        </button>
      )}
    </>
  );
}

/**
 * Bottom controller bar with dots, counter and swipe controls
 */
export function SlideBottomBar({ slides, currentSlide, onGoToSlide, onBookNow }) {
  const totalSlides = slides.length;
  const isFirst = currentSlide === 0;
  const isLast = currentSlide === totalSlides - 1;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-blue-100 px-3 sm:px-6 py-2.5 shadow-2xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2">
        
        {/* Left Action / Prev Button */}
        <div className="flex items-center gap-2">
          {isFirst ? (
            <a
              href="tel:0905888666"
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              <span className="hidden sm:inline">Hotline:</span> 0905.888.666
            </a>
          ) : (
            <button
              type="button"
              onClick={() => onGoToSlide(currentSlide - 1)}
              className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-900 border border-slate-200 text-xs font-bold transition-all cursor-pointer active:scale-95"
            >
              <ChevronLeft className="w-4 h-4 text-blue-900" />
              <span className="hidden sm:inline">Trang trước:</span>
              <span className="font-semibold">{slides[currentSlide - 1]?.label}</span>
            </button>
          )}
        </div>

        {/* Center: Slide Dots & Badge */}
        <div className="flex flex-col items-center justify-center gap-1">
          {/* Dots Indicator */}
          <div className="flex items-center gap-1.5">
            {slides.map((slide, idx) => {
              const active = idx === currentSlide;
              return (
                <button
                  key={slide.id}
                  type="button"
                  onClick={() => onGoToSlide(idx)}
                  title={`Chuyển tới: ${slide.title}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    active 
                      ? 'w-6 sm:w-8 h-2 bg-blue-900 shadow-xs' 
                      : 'w-2 h-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                  aria-label={`Trang ${idx + 1}: ${slide.title}`}
                />
              );
            })}
          </div>

          {/* Current Page Label */}
          <div className="text-[11px] font-bold text-slate-600 truncate max-w-[170px] sm:max-w-xs text-center flex items-center gap-1">
            <span className="text-blue-900 font-extrabold">{currentSlide + 1}/{totalSlides}:</span>
            <span className="truncate">{slides[currentSlide]?.title}</span>
          </div>
        </div>

        {/* Right Action / Next Button */}
        <div className="flex items-center gap-2">
          {isLast ? (
            <button
              type="button"
              onClick={() => onGoToSlide(0)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-900 border border-blue-200 text-xs font-bold transition-all cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Về đầu</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onGoToSlide(currentSlide + 1)}
              className="inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 active:bg-blue-950 text-white shadow-md shadow-blue-900/20 text-xs font-bold transition-all cursor-pointer active:scale-95"
            >
              <span className="hidden sm:inline">Tiếp:</span>
              <span className="font-semibold">{slides[currentSlide + 1]?.label}</span>
              <ChevronRight className="w-4 h-4 text-sky-300 animate-pulse" />
            </button>
          )}

          {/* Always accessible quick Book Button */}
          {currentSlide !== 3 && (
            <button
              type="button"
              onClick={onBookNow}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs shadow-md shadow-amber-500/20 transition-all cursor-pointer active:scale-95"
            >
              <Wrench className="w-3.5 h-3.5" />
              <span>Đặt thợ</span>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}

/**
 * Friendly animated hint banner on Slide 0 to guide users on mobile & desktop
 */
export function SwipeHintBanner({ onNext }) {
  return (
    <div 
      onClick={onNext}
      className="mt-4 p-3 rounded-2xl bg-gradient-to-r from-blue-900 via-blue-800 to-sky-700 text-white shadow-lg shadow-blue-900/20 flex items-center justify-between gap-3 cursor-pointer group hover:opacity-95 transition-all"
    >
      <div className="flex items-center gap-2.5">
        <span className="text-xl">👉</span>
        <div className="text-left">
          <p className="text-xs sm:text-sm font-bold leading-tight">
            Vuốt ngang để xem từng mục (Dịch vụ, Quy trình, Bảng giá...)
          </p>
          <p className="text-[11px] text-sky-200">
            Dùng ngón tay vuốt sang trái/phải hoặc bấm phím mũi tên
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1 text-xs font-extrabold text-sky-300 bg-white/10 px-3 py-1.5 rounded-xl border border-white/20 group-hover:bg-white/20 transition-colors shrink-0">
        <span>Xem dịch vụ</span>
        <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
}
