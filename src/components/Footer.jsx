import React from 'react';
import { 
  Snowflake, 
  Wrench, 
  Phone, 
  MapPin, 
  Clock, 
  ArrowUp
} from 'lucide-react';

export default function Footer({ onScrollToTop, onNavigateTo }) {
  const scrollTo = (id) => {
    if (onNavigateTo) {
      onNavigateTo(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        const yOffset = -80;
        const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-blue-950 text-white pt-16 pb-12 border-t border-blue-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-blue-900/80 text-left">
          
          {/* Col 1: Brand & Slogan (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-800 to-sky-500 flex items-center justify-center text-white shadow-lg shadow-blue-900/30">
                <div className="relative">
                  <Snowflake className="w-7 h-7 text-sky-100" />
                  <Wrench className="w-3.5 h-3.5 text-amber-300 absolute -bottom-1 -right-1" />
                </div>
              </div>
              <div>
                <span className="text-2xl font-black text-white tracking-tight">
                  Cool<span className="text-sky-400">Call</span>
                </span>
                <span className="ml-2 bg-sky-900/80 text-sky-300 text-[10px] font-bold px-1.5 py-0.5 rounded border border-sky-700 uppercase">
                  Đà Nẵng
                </span>
              </div>
            </div>

            <p className="text-sm text-blue-200 font-medium">
              Thợ sửa máy lạnh tận tâm - Có mặt sau 30 phút
            </p>

            <p className="text-xs text-slate-300 leading-relaxed">
              Dịch vụ cơ điện lạnh dân dụng & thương mại uy tín hàng đầu tại TP. Đà Nẵng. Chuyên vệ sinh, nạp gas, sửa lỗi không lạnh, chảy nước và thay block chính hãng với cam kết bảo hành dài hạn.
            </p>

            {/* Hotline banner */}
            <div className="p-4 rounded-2xl bg-blue-900/60 border border-blue-800 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">Hotline cứu hộ máy lạnh 24/7</span>
                <a href="tel:0905888666" className="text-lg font-black text-white hover:text-sky-300 transition-colors">
                  0905.888.666
                </a>
              </div>
            </div>
          </div>

          {/* Col 2: Services Quick Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-sky-400">
              Dịch Vụ Phổ Biến
            </h4>
            <ul className="space-y-2 text-xs text-blue-200">
              <li>
                <button onClick={() => scrollTo('services')} className="hover:text-white transition-colors cursor-pointer">
                  • Vệ sinh máy lạnh treo tường (150.000đ)
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('services')} className="hover:text-white transition-colors cursor-pointer">
                  • Vệ sinh máy lạnh âm trần Cassette
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('services')} className="hover:text-white transition-colors cursor-pointer">
                  • Sửa máy lạnh chảy nước, rỉ nước
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('services')} className="hover:text-white transition-colors cursor-pointer">
                  • Khắc phục máy lạnh không mát, kém lạnh
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('services')} className="hover:text-white transition-colors cursor-pointer">
                  • Bơm gas R32, R410A, R22 chính hãng
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('services')} className="hover:text-white transition-colors cursor-pointer">
                  • Sửa bo mạch Inverter Daikin, Panasonic
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('services')} className="hover:text-white transition-colors cursor-pointer">
                  • Tháo lắp di dời máy lạnh trọn gói
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Danang Station Hubs (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-sky-400">
              Trạm Kỹ Thuật Đà Nẵng
            </h4>
            <ul className="space-y-2.5 text-xs text-blue-200">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span><strong>Trạm 1:</strong> 120 Nguyễn Văn Linh, P. Nam Dương, Q. Hải Châu</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span><strong>Trạm 2:</strong> 45 Võ Văn Kiệt, P. An Hải Bắc, Q. Sơn Trà</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span><strong>Trạm 3:</strong> 88 Điện Biên Phủ, P. Chính Gián, Q. Thanh Khê</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span><strong>Trạm 4:</strong> 230 Lê Văn Hiến, Q. Ngũ Hành Sơn</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span><strong>Trạm 5:</strong> 15 Cách Mạng Tháng 8, Q. Cẩm Lệ</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Working Hours & Commitments (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-sky-400">
              Thời Gian Làm Việc
            </h4>
            <div className="text-xs text-blue-200 space-y-2">
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Thợ phục vụ tại nhà:</strong>
                  <span>07:00 – 21:00 hàng ngày</span>
                  <span className="block text-slate-400">(Cả T7, Chủ Nhật & Lễ)</span>
                </div>
              </div>

              <div className="pt-2 border-t border-blue-900">
                <strong className="text-white block">Hotline trực ca đêm:</strong>
                <span className="text-emerald-400 font-bold">24/7 không nghỉ</span>
              </div>

              <div className="pt-2">
                <span className="text-[11px] text-slate-400">Email: hotro@coolcall.vn</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400 text-center sm:text-left">
          <div>
            © 2026 <strong>CoolCall Đà Nẵng</strong>. Bản quyền thuộc về Công ty TNHH Kỹ Thuật Điện Lạnh CoolCall.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollTo('process')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Quy trình thợ
            </button>
            <button
              onClick={() => scrollTo('pricing')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Chính sách bảo hành
            </button>
            <button
              type="button"
              onClick={onScrollToTop}
              className="w-9 h-9 rounded-xl bg-blue-900 hover:bg-blue-800 text-white flex items-center justify-center transition-colors cursor-pointer ml-2"
              title="Lên đầu trang"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
