import React from 'react';
import { 
  CalendarCheck, 
  MapPin, 
  UserCheck, 
  Clock, 
  ArrowRight, 
  CheckCircle2
} from 'lucide-react';

export default function ProcessSteps({ onStartBooking }) {
  const steps = [
    {
      step: '01',
      title: 'Chọn Dịch Vụ & Thời Gian',
      subtitle: 'Nhanh chóng & Linh hoạt',
      icon: <CalendarCheck className="w-8 h-8 text-sky-600" />,
      description: 'Lựa chọn gói dịch vụ bạn cần (vệ sinh, sửa lỗi không lạnh, nạp gas, tháo lắp...) và chọn khung giờ hẹn mong muốn hoặc chọn "Cần gấp có mặt sau 30 phút".',
      highlights: ['Chọn giờ linh hoạt từ 7h - 21h', 'Ưu tiên thợ đến khẩn cấp sau 30 phút', 'Có ghi chú tình trạng máy']
    },
    {
      step: '02',
      title: 'Nhập Địa Chỉ Tại Đà Nẵng',
      subtitle: 'Định vị thợ gần nhất',
      icon: <MapPin className="w-8 h-8 text-blue-700" />,
      description: 'Cung cấp số điện thoại và địa chỉ nhà tại Hải Châu, Thanh Khê, Sơn Trà, Ngũ Hành Sơn, Cẩm Lệ, Liên Chiểu... Hệ thống tự động điều phối thợ cơ động gần nhất.',
      highlights: ['Phủ sóng 100% quận huyện', 'Thợ gọi xác nhận trước khi đến', 'Không tính phí đường xa']
    },
    {
      step: '03',
      title: 'Xác Nhận & Thợ Đến Tận Nhà',
      subtitle: 'Kiểm tra & Nghiệm thu hài lòng',
      icon: <UserCheck className="w-8 h-8 text-emerald-600" />,
      description: 'Thợ đến đúng hẹn với đầy đủ máy móc xịt rửa áp lực cao và phụ tùng chính hãng. Báo giá minh bạch, sửa xong dọn sạch sẽ, khách hài lòng mới thanh toán.',
      highlights: ['Báo giá công khai trước khi làm', 'Dán tem bảo hành 3 - 6 tháng', 'Thanh toán tiền mặt hoặc Chuyển khoản']
    }
  ];

  return (
    <section id="process" className="py-16 sm:py-24 bg-gradient-to-b from-blue-50/50 via-white to-blue-50/40 relative border-y border-blue-100/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section title */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-3 border border-blue-200">
            <Clock className="w-3.5 h-3.5 text-blue-700" />
            Đơn giản - Tiện lợi - Minh bạch
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-blue-950 tracking-tight">
            Quy Trình Đặt Thợ 3 Bước Tiện Lợi
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Chỉ với chưa đầy 1 phút thao tác trên điện thoại hoặc máy tính, kỹ thuật viên CoolCall chuyên nghiệp sẽ sẵn sàng lên đường hỗ trợ bạn ngay.
          </p>
        </div>

        {/* 3 Step Cards Grid with connector lines */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          
          {steps.map((item, idx) => (
            <div 
              key={item.step}
              className="relative bg-white rounded-3xl p-7 sm:p-8 border border-blue-100 shadow-md shadow-blue-900/5 hover:shadow-xl hover:shadow-blue-900/10 hover:border-blue-300 transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Top step number badge & Icon */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-blue-50 group-hover:bg-blue-100/80 border border-blue-100 flex items-center justify-center transition-colors shadow-xs">
                    {item.icon}
                  </div>
                  <span className="text-4xl font-black text-slate-200 group-hover:text-blue-900/20 transition-colors font-mono tracking-tighter">
                    {item.step}
                  </span>
                </div>

                <div className="text-xs font-bold text-sky-600 uppercase tracking-wider mb-1">
                  Bước {idx + 1}: {item.subtitle}
                </div>

                <h3 className="text-xl font-bold text-blue-950 mb-3 group-hover:text-blue-900 transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              {/* Step checklist highlights */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                {item.highlights.map((point, pIdx) => (
                  <div key={pIdx} className="flex items-center gap-2 text-xs text-slate-700 font-medium">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              {/* Step indicator arrow for desktop */}
              {idx < steps.length - 1 && (
                <div className="hidden md:flex absolute -right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-blue-200 shadow-md items-center justify-center text-blue-800 z-10">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

        </div>

        {/* CTA prompt below steps */}
        <div className="mt-12 text-center">
          <button
            type="button"
            onClick={onStartBooking}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl bg-blue-900 hover:bg-blue-800 active:bg-blue-950 text-white font-bold text-base shadow-xl shadow-blue-900/20 hover:shadow-2xl hover:shadow-blue-900/30 transition-all cursor-pointer transform hover:-translate-y-0.5"
          >
            <span>Bắt đầu đặt lịch ngay bây giờ</span>
            <ArrowRight className="w-5 h-5 text-sky-300" />
          </button>
          <p className="text-xs text-slate-500 mt-2.5">
            ⚡ Chỉ mất 45 giây • Không cần thanh toán trước • Hỗ trợ hủy lịch miễn phí
          </p>
        </div>

      </div>
    </section>
  );
}
