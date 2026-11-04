import React from 'react';
import { MapPin, Navigation, Clock, ArrowUpRight } from 'lucide-react';
import { DANANG_DISTRICTS } from '../data/coolcallData';

export default function CoverageDanang({ onSelectDistrict }) {
  return (
    <section id="coverage" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-3 border border-blue-200">
            <MapPin className="w-3.5 h-3.5 text-blue-700" />
            Mạng lưới phủ sóng toàn thành phố
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-blue-950 tracking-tight">
            Khu Vực Phục Vụ Tại Đà Nẵng
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Hệ thống trạm kỹ thuật cơ động CoolCall được phân bổ khắp các trục đường chính tại Đà Nẵng, giúp thợ tiếp cận nhà khách hàng nhanh nhất chỉ trong 20 - 30 phút.
          </p>
        </div>

        {/* District Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {DANANG_DISTRICTS.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectDistrict(item.id)}
              className="group bg-blue-50/50 hover:bg-white rounded-2xl p-5 border border-blue-100/90 hover:border-blue-400 shadow-xs hover:shadow-lg hover:shadow-blue-900/10 transition-all duration-200 cursor-pointer flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 group-hover:bg-blue-900 group-hover:text-white text-blue-900 flex items-center justify-center transition-colors">
                    <Navigation className="w-5 h-5" />
                  </div>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-full border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {item.activeTechs} thợ trực
                  </span>
                </div>

                <h3 className="text-base font-bold text-blue-950 group-hover:text-blue-900 transition-colors">
                  {item.name}
                </h3>

                <div className="flex items-center gap-1.5 text-xs text-slate-600 mt-1 mb-3">
                  <Clock className="w-3.5 h-3.5 text-sky-600" />
                  <span>Thời gian đến: <strong className="text-blue-950">{item.estTime}</strong></span>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Tuyến phố trọng điểm:</p>
                  <p className="text-xs text-slate-600 line-clamp-2">
                    {item.hubs.join(' • ')}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-900 group-hover:text-blue-950">
                <span>Đặt thợ khu vực này</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </div>
          ))}

          {/* Quick Support Banner Card */}
          <div className="bg-gradient-to-br from-blue-900 to-blue-950 rounded-2xl p-6 text-white flex flex-col justify-between shadow-md">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-sky-300">Tổng đài điều phối</span>
              <h3 className="text-lg font-bold text-white mt-1">Cần hỗ trợ gấp ngoài giờ?</h3>
              <p className="text-xs text-blue-200 mt-2 leading-relaxed">
                Đội kỹ thuật ca đêm sẵn sàng xử lý sự cố máy lạnh cho homestay, khách sạn, nhà hàng 24/7.
              </p>
            </div>
            <a
              href="tel:0905888666"
              className="mt-4 w-full py-2.5 px-3 rounded-xl bg-white text-blue-950 font-bold text-xs flex items-center justify-center gap-1.5 hover:bg-blue-50 transition-colors"
            >
              <span>Gọi 0905.888.666</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
