import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  CheckCircle, 
  Star, 
  Zap, 
  Sparkles,
  Award,
  Users,
  ChevronDown,
  Wrench
} from 'lucide-react';
import { useAuth } from '../context/useAuth';
import { DANANG_DISTRICTS } from '../data/smartfixData';

export default function Hero({ onSearchSubmit, onSelectQuickService, onGoNext }) {
  const { openKycModal } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('hai-chau');

  const popularKeywords = [
    { label: 'Vệ sinh máy lạnh (150k)', id: 'vesinh-treotuong' },
    { label: 'Sửa máy không lạnh (200k)', id: 'sua-khonglanh' },
    { label: 'Máy bị chảy nước (180k)', id: 'sua-chaynuoc' },
    { label: 'Bơm nạp Gas R32/R410A', id: 'napgas-chinhhang' },
    { label: 'Tháo lắp di dời (350k)', id: 'thaolap-didon' },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    onSearchSubmit({ searchTerm, district: selectedDistrict });
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-blue-50/70 via-white to-white pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-blue-50">
      {/* Background soft glowing blurs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-gradient-to-tr from-sky-200/40 via-blue-100/30 to-transparent blur-3xl -z-10 pointer-events-none" />
      <div className="absolute right-0 top-1/4 w-96 h-96 bg-blue-100/40 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headlines, Trust, and Search Form */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Live badge */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-blue-100/80 border border-blue-200 text-blue-900 text-xs sm:text-sm font-semibold shadow-xs">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <span>Dịch vụ điện lạnh #1 tại TP. Đà Nẵng</span>
              <span className="text-blue-400">•</span>
              <span className="text-blue-800 font-bold flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> Có mặt sau 30 phút
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-black text-blue-950 tracking-tight leading-[1.18]">
              Thợ Sửa Chữa & Vệ Sinh Máy Lạnh{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-sky-600 to-blue-800">
                Tận Tâm Tại Đà Nẵng
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              Đội thợ cơ động phủ sóng toàn bộ các quận Hải Châu, Sơn Trà, Thanh Khê, Ngũ Hành Sơn, Cẩm Lệ, Liên Chiểu. 
              <span className="font-semibold text-slate-800"> Báo giá công khai trước khi làm</span>, linh kiện chính hãng, bảo hành chu đáo từ 3 – 6 tháng.
            </p>

            {/* Quick Service Search Box */}
            <div className="bg-white p-3 sm:p-4 rounded-2xl shadow-xl shadow-blue-900/10 border border-blue-100/90 relative z-20">
              <div className="text-xs font-bold uppercase tracking-wider text-blue-900 mb-2.5 flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-sky-600" />
                  Tìm thợ & Đặt lịch nhanh
                </span>
                <span className="text-slate-400 font-normal">Miễn phí kiểm tra nếu sửa</span>
              </div>

              <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2.5">
                {/* District selector */}
                <div className="sm:w-48 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-700">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <select
                    value={selectedDistrict}
                    onChange={(e) => setSelectedDistrict(e.target.value)}
                    className="w-full pl-9 pr-8 py-3.5 bg-blue-50/70 border border-blue-200/80 rounded-xl text-sm font-semibold text-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:bg-white transition-all appearance-none cursor-pointer"
                  >
                    {DANANG_DISTRICTS.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.activeTechs} thợ)
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>

                {/* Search input */}
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Search className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Bạn cần hỗ trợ gì? (Vệ sinh, không lạnh, nạp gas...)"
                    className="w-full pl-10 pr-4 py-3.5 bg-slate-50 border border-slate-200/80 rounded-xl text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:bg-white transition-all"
                  />
                </div>

                {/* Submit button in deep navy blue */}
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-blue-900 hover:bg-blue-800 active:bg-blue-950 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md shadow-blue-900/25 hover:shadow-lg hover:shadow-blue-900/35 transition-all cursor-pointer whitespace-nowrap"
                >
                  <Search className="w-4 h-4 text-sky-300" />
                  <span>Tìm thợ ngay</span>
                </button>
              </form>

              {/* Popular quick-click chips */}
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center gap-1.5 flex-wrap">
                <span className="text-xs text-slate-400 font-medium mr-1">Gợi ý nhanh:</span>
                {popularKeywords.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onSelectQuickService(item.id)}
                    className="text-xs px-2.5 py-1 rounded-lg bg-blue-50/70 hover:bg-blue-100 text-blue-900 font-medium border border-blue-100 transition-colors cursor-pointer hover:border-blue-300"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 3 Pillars of trust */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-blue-100 shadow-xs">
                <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center text-blue-900 shrink-0">
                  <Clock className="w-5 h-5 text-blue-800" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-blue-950">30 Phút</div>
                  <div className="text-[11px] text-slate-500">Có mặt tận nhà</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-blue-100 shadow-xs">
                <div className="w-9 h-9 rounded-lg bg-sky-50 flex items-center justify-center text-sky-800 shrink-0">
                  <ShieldCheck className="w-5 h-5 text-sky-700" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-blue-950">6 Tháng</div>
                  <div className="text-[11px] text-slate-500">Bảo hành linh kiện</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-xl bg-white border border-blue-100 shadow-xs">
                <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-800 shrink-0">
                  <CheckCircle className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <div className="text-xs sm:text-sm font-bold text-blue-950">100% Niêm yết</div>
                  <div className="text-[11px] text-slate-500">Báo giá trước</div>
                </div>
              </div>
            </div>

            {/* Recruitment Card for Technicians */}
            <div className="p-3.5 sm:p-4 rounded-2xl bg-gradient-to-r from-amber-50 via-amber-100/70 to-sky-50 border-2 border-amber-300 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center font-bold text-lg shrink-0 shadow-xs">
                  🛠️
                </div>
                <div>
                  <p className="text-xs sm:text-sm font-black text-amber-950">
                    Bạn là Thợ điện lạnh muốn nhận đơn?
                  </p>
                  <p className="text-[11px] text-amber-900/80">
                    Thu nhập 25 - 40 triệu/tháng • Nhận đơn trực tiếp qua web • Xác thực eKYC CCCD
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={openKycModal}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 active:from-amber-800 text-white font-extrabold text-xs shadow-md shadow-amber-900/20 transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center justify-center gap-1.5 hover:scale-105"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                <span>Đăng ký làm Thợ ngay (eKYC)</span>
              </button>
            </div>

            {/* Swipe guide banner */}
            {onGoNext && (
              <div 
                onClick={onGoNext}
                className="p-3 sm:p-3.5 rounded-2xl bg-gradient-to-r from-blue-900 via-blue-800 to-sky-700 hover:from-blue-800 hover:to-sky-600 text-white shadow-lg shadow-blue-900/15 flex items-center justify-between gap-3 cursor-pointer group transition-all"
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">👉</span>
                  <div className="text-left">
                    <p className="text-xs sm:text-sm font-bold leading-tight">
                      Vuốt sang phải để xem tiếp các mục
                    </p>
                    <p className="text-[11px] text-sky-200">
                      Dịch vụ • Quy trình • Đặt lịch • Bảng giá • Đánh giá
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-sky-300 bg-white/10 px-3 py-1.5 rounded-xl border border-white/20 group-hover:bg-white/20 transition-all shrink-0">
                  <span>Xem dịch vụ</span>
                  <span className="text-sm group-hover:translate-x-1 transition-transform">➔</span>
                </div>
              </div>
            )}

          </div>

          {/* Right Column: High Impact Visual Card / Technician Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Outer decorative card frame */}
              <div className="relative rounded-3xl bg-gradient-to-b from-blue-900 to-blue-950 p-1.5 shadow-2xl shadow-blue-950/20">
                <div className="rounded-[22px] bg-slate-900 overflow-hidden relative">
                  
                  {/* Hero Graphic Image */}
                  <div className="relative h-72 sm:h-80 w-full overflow-hidden">
                    <img 
                      src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=800&q=80" 
                      alt="Thợ kỹ thuật điện lạnh SmartFix Đà Nẵng đang kiểm tra bảo dưỡng máy điều hòa"
                      className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    
                    {/* Top overlay pills */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                      <span className="px-3 py-1 rounded-full bg-blue-900/90 backdrop-blur-md text-white text-xs font-bold border border-blue-400/30 flex items-center gap-1.5 shadow-lg">
                        <Award className="w-3.5 h-3.5 text-amber-400" />
                        Thợ tay nghề &gt; 5 năm
                      </span>
                      <span className="px-3 py-1 rounded-full bg-emerald-950/80 backdrop-blur-md text-emerald-300 text-xs font-semibold border border-emerald-500/40 flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
                        Trực tuyến 24/7
                      </span>
                    </div>

                    {/* Bottom overlay inside image */}
                    <div className="absolute bottom-4 left-4 right-4 text-left">
                      <p className="text-xs text-sky-300 font-semibold uppercase tracking-wider">Kỹ thuật viên SmartFix</p>
                      <h3 className="text-xl font-bold text-white leading-tight">Quy trình vệ sinh khử khuẩn áp lực cao</h3>
                      <p className="text-xs text-slate-300 mt-0.5">Không văng bẩn sàn nhà • Bảo dưỡng kỹ từng cánh quạt</p>
                    </div>
                  </div>

                  {/* Stat cards inside container */}
                  <div className="p-5 bg-gradient-to-b from-slate-900 to-blue-950 text-white space-y-4">
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                        <div className="flex items-center gap-1 text-amber-400">
                          <Star className="w-4 h-4 fill-amber-400" />
                          <span className="font-black text-lg text-white">4.9 / 5</span>
                        </div>
                        <p className="text-xs text-slate-300 mt-0.5">2,450+ khách hàng đánh giá hài lòng</p>
                      </div>

                      <div className="bg-white/5 border border-white/10 rounded-xl p-3">
                        <div className="flex items-center gap-1 text-sky-400">
                          <Users className="w-4 h-4 text-sky-400" />
                          <span className="font-black text-lg text-white">15,800+</span>
                        </div>
                        <p className="text-xs text-slate-300 mt-0.5">Chiếc máy lạnh đã phục hồi độ lạnh</p>
                      </div>
                    </div>

                    {/* Dispatch status bar */}
                    <div className="bg-blue-900/60 border border-blue-700/50 rounded-xl p-3 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-slate-200">Đang điều phối thợ: <strong className="text-white">Q. Hải Châu, Sơn Trà</strong></span>
                      </div>
                      <span className="text-sky-300 font-bold">~18 phút</span>
                    </div>
                  </div>

                </div>
              </div>

              {/* Floating badges outside card */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 bg-white p-3.5 rounded-2xl shadow-xl shadow-blue-950/15 border border-blue-100 flex items-center gap-3 animate-float hidden sm:flex">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-900 flex items-center justify-center font-bold">
                  ❄️
                </div>
                <div>
                  <div className="text-xs font-bold text-blue-950">Vệ sinh sạch khuẩn</div>
                  <div className="text-[11px] text-slate-500">Giảm tiêu thụ điện 20 - 30%</div>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 sm:-right-5 bg-white py-2 px-3.5 rounded-xl shadow-lg border border-blue-100 flex items-center gap-2 text-xs font-bold text-blue-900 hidden sm:flex">
                <span className="text-base">🚀</span>
                <span>Có mặt sau 30 phút</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
