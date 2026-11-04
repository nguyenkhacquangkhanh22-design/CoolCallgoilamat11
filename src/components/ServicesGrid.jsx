import React, { useState, useMemo } from 'react';
import { 
  Snowflake, 
  Wrench, 
  Droplets, 
  Gauge, 
  Cpu, 
  Truck, 
  Zap, 
  Wind, 
  Check, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { SERVICES, SERVICE_CATEGORIES } from '../data/coolcallData';

const getServiceIcon = (id) => {
  switch (id) {
    case 'vesinh-treotuong':
      return <Snowflake className="w-6 h-6 text-blue-700" />;
    case 'vesinh-amtran':
      return <Wind className="w-6 h-6 text-sky-600" />;
    case 'sua-khonglanh':
      return <Zap className="w-6 h-6 text-amber-600" />;
    case 'sua-chaynuoc':
      return <Droplets className="w-6 h-6 text-cyan-600" />;
    case 'napgas-chinhhang':
      return <Gauge className="w-6 h-6 text-teal-600" />;
    case 'sua-boardmach':
      return <Cpu className="w-6 h-6 text-indigo-600" />;
    case 'thaolap-didon':
      return <Truck className="w-6 h-6 text-blue-800" />;
    case 'thay-block':
      return <Wrench className="w-6 h-6 text-purple-700" />;
    default:
      return <Wrench className="w-6 h-6 text-blue-700" />;
  }
};

export default function ServicesGrid({ onSelectService, activeFilterCategory = 'all', searchQuery = '' }) {
  const [selectedCategory, setSelectedCategory] = useState(activeFilterCategory);

  const filteredServices = useMemo(() => {
    return SERVICES.filter((service) => {
      const matchesCategory = selectedCategory === 'all' || service.category === selectedCategory;
      const matchesSearch = !searchQuery || 
        service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.features.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="services" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            Dịch vụ chuyên nghiệp tại Đà Nẵng
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-blue-950 tracking-tight">
            Các Gói Dịch Vụ Sửa Chữa & Vệ Sinh Máy Lạnh
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Bảng giá ước tính rõ ràng, minh bạch 100%. Thợ kiểm tra kỹ lưỡng, báo phương án tối ưu và tiết kiệm nhất cho quý khách trước khi thao tác.
          </p>

          {/* Category Filter Tabs */}
          <div className="mt-8 flex items-center justify-center gap-2 flex-wrap">
            {SERVICE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-blue-900 text-white shadow-md shadow-blue-900/20'
                    : 'bg-blue-50/70 hover:bg-blue-100 text-blue-900 hover:text-blue-950 border border-blue-100'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {searchQuery && (
            <div className="mt-4 text-sm text-slate-600">
              Kết quả tìm kiếm cho từ khóa: <strong className="text-blue-900">"{searchQuery}"</strong> ({filteredServices.length} dịch vụ)
            </div>
          )}
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className="group relative bg-white rounded-2xl border border-slate-200 hover:border-blue-400 shadow-xs hover:shadow-xl hover:shadow-blue-900/10 transition-all duration-300 flex flex-col justify-between overflow-hidden hover:-translate-y-1"
            >
              {/* Top Accent line on hover */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-900 via-sky-500 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="p-6">
                {/* Top Badge & Icon */}
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="w-13 h-13 rounded-2xl bg-blue-50 group-hover:bg-blue-100/90 border border-blue-100 flex items-center justify-center transition-colors duration-300 shadow-xs">
                    {getServiceIcon(service.id)}
                  </div>
                  <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${service.badgeColor}`}>
                    {service.badge}
                  </span>
                </div>

                {/* Service Title */}
                <h3 className="text-lg font-bold text-blue-950 group-hover:text-blue-900 transition-colors line-clamp-2 mb-2">
                  {service.title}
                </h3>

                {/* Short Description */}
                <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2">
                  {service.description}
                </p>

                {/* Price display tag */}
                <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-100 mb-4 flex items-baseline justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 tracking-wider block">Giá ước tính</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xl font-black text-blue-950">{service.priceDisplay}</span>
                      <span className="text-xs text-slate-500 font-semibold">{service.unit}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-500 block">Thời gian</span>
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1 justify-end">
                      <Clock className="w-3 h-3 text-sky-600" />
                      {service.duration}
                    </span>
                  </div>
                </div>

                {/* Features checklist */}
                <div className="space-y-2 mb-4">
                  <p className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">Hạng mục bao gồm:</p>
                  {service.features.map((feat, index) => (
                    <div key={index} className="flex items-start gap-2 text-xs text-slate-600">
                      <div className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 stroke-[3]" />
                      </div>
                      <span className="line-clamp-1">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="p-6 pt-0 mt-auto">
                <div className="py-2.5 px-3 bg-slate-50 rounded-xl mb-3 flex items-center justify-between text-[11px] text-slate-600 border border-slate-100">
                  <span className="flex items-center gap-1 font-medium">
                    <ShieldCheck className="w-3.5 h-3.5 text-blue-800" />
                    {service.warranty}
                  </span>
                  <span className="text-emerald-700 font-bold">Cam kết sạch 100%</span>
                </div>

                <button
                  type="button"
                  onClick={() => onSelectService(service)}
                  className="w-full py-3 px-4 rounded-xl bg-blue-50 group-hover:bg-blue-900 text-blue-900 group-hover:text-white font-bold text-sm border border-blue-200 group-hover:border-blue-900 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-xs group-hover:shadow-md"
                >
                  <span>Đặt gói này</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty state if search returned 0 items */}
        {filteredServices.length === 0 && (
          <div className="text-center py-16 bg-blue-50/50 rounded-2xl border border-blue-100">
            <HelpCircle className="w-12 h-12 text-blue-300 mx-auto mb-3" />
            <h4 className="text-lg font-bold text-blue-950">Không tìm thấy dịch vụ phù hợp</h4>
            <p className="text-sm text-slate-600 mt-1">
              Bạn có thể gọi trực tiếp tổng đài <strong className="text-blue-900">0905.888.666</strong> để được kỹ thuật viên hỗ trợ báo giá ngay!
            </p>
            <button
              onClick={() => setSelectedCategory('all')}
              className="mt-4 px-4 py-2 bg-blue-900 text-white rounded-xl text-sm font-semibold hover:bg-blue-800 cursor-pointer"
            >
              Xem tất cả dịch vụ
            </button>
          </div>
        )}

        {/* Note banner under grid */}
        <div className="mt-12 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-blue-900 via-blue-950 to-slate-900 text-white flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg shadow-blue-950/10">
          <div className="flex items-center gap-3.5 text-center md:text-left">
            <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-sky-300 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="font-bold text-sm sm:text-base text-white">Chính sách "Hài Lòng Mới Thanh Toán"</h4>
              <p className="text-xs sm:text-sm text-blue-200">
                Thợ kiểm tra miễn phí. Nếu khách hàng không đồng ý sửa chữa, CoolCall không thu bất cứ khoản chi phí ép buộc nào.
              </p>
            </div>
          </div>
          <a
            href="tel:0905888666"
            className="shrink-0 px-5 py-2.5 rounded-xl bg-white text-blue-950 hover:bg-blue-50 font-bold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shadow-sm"
          >
            <span>Tư vấn kỹ thuật: 0905.888.666</span>
          </a>
        </div>

      </div>
    </section>
  );
}
