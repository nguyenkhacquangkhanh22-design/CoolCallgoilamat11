import React from 'react';
import { 
  Clock, 
  ShieldCheck, 
  BadgeDollarSign, 
  UserCheck, 
  Sparkles, 
  HeartHandshake, 
  Award,
  Cpu
} from 'lucide-react';

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: <Clock className="w-7 h-7 text-sky-600" />,
      title: 'Có Mặt Siêu Nhanh 30 Phút',
      desc: 'Với hơn 14 thợ cơ động tại các trạm Hải Châu, Sơn Trà, Thanh Khê..., chúng tôi cam kết tiếp cận tận nơi không để bạn phải chịu cảnh nóng bức kéo dài.'
    },
    {
      icon: <UserCheck className="w-7 h-7 text-blue-700" />,
      title: '100% Thợ Có Chứng Chỉ Nghề',
      desc: 'Kỹ thuật viên được đào tạo bài bản từ các trường kỹ thuật cơ điện lạnh, lý lịch rõ ràng, văn hóa ứng xử lịch sự, trung thực và tận tâm.'
    },
    {
      icon: <BadgeDollarSign className="w-7 h-7 text-emerald-600" />,
      title: 'Báo Giá Minh Bạch - Không Vẽ Bệnh',
      desc: 'Tuyệt đối không có tình trạng tự ý nâng giá hay vẽ thêm lỗi. Báo giá chi tiết trước khi làm, khách đồng ý mới tiến hành, miễn phí kiểm tra.'
    },
    {
      icon: <ShieldCheck className="w-7 h-7 text-indigo-600" />,
      title: 'Bảo Hành Điện Tử 3 - 6 Tháng',
      desc: 'Mọi dịch vụ sửa chữa và linh kiện thay thế đều được kích hoạt bảo hành bằng số điện thoại. Lỗi tái phát trong thời gian bảo hành sẽ được xử lý miễn phí 100%.'
    },
    {
      icon: <Sparkles className="w-7 h-7 text-cyan-600" />,
      title: 'Vệ Sinh Khử Khuẩn Sạch Sâu',
      desc: 'Sử dụng bạt trùm chuyên dụng chống tràn nước, xịt rửa áp lực cao cả dàn nóng và dàn lạnh, thông máng nước triệt để, giữ sạch sẽ sàn nhà khách hàng.'
    },
    {
      icon: <Cpu className="w-7 h-7 text-purple-600" />,
      title: 'Linh Kiện Chính Hãng Chuẩn Đời',
      desc: 'SmartFix là đối tác của các hãng Daikin, Panasonic, Casper, LG, Toshiba... Cung cấp tụ, cảm biến, bo mạch, quạt và gas lạnh R32/R410A nguyên chất 100%.'
    }
  ];

  return (
    <section className="py-16 sm:py-24 bg-blue-950 text-white relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-800/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-sky-900/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-900 border border-blue-700 text-sky-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            Uy tín tạo niềm tin
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Vì Sao 15.000+ Khách Hàng Đà Nẵng Chọn SmartFix?
          </h2>
          <p className="mt-3 text-base sm:text-lg text-blue-200">
            Chúng tôi định nghĩa lại dịch vụ điện lạnh: Văn minh hơn, minh bạch hơn và luôn đặt trải nghiệm của khách hàng lên hàng đầu.
          </p>
        </div>

        {/* 6 Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <div
              key={i}
              className="bg-white/5 hover:bg-white/10 rounded-2xl p-7 border border-white/10 hover:border-sky-400/50 transition-all duration-300 shadow-lg text-left group"
            >
              <div className="w-14 h-14 rounded-2xl bg-white/10 group-hover:bg-white/20 border border-white/10 flex items-center justify-center mb-5 transition-colors">
                {r.icon}
              </div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-sky-300 transition-colors">
                {r.title}
              </h3>
              <p className="text-sm text-blue-200/80 leading-relaxed">
                {r.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Commitment Badge Bar */}
        <div className="mt-14 p-6 rounded-2xl bg-gradient-to-r from-blue-900 via-blue-800 to-sky-900 border border-blue-700 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <HeartHandshake className="w-10 h-10 text-amber-400 shrink-0" />
            <div>
              <div className="font-bold text-base text-white">Cam kết hài lòng 100%</div>
              <div className="text-xs text-blue-200">Nếu thợ phục vụ không lịch sự hoặc không sạch sẽ, SmartFix hoàn tiền 100% dịch vụ.</div>
            </div>
          </div>
          <a
            href="tel:0905888666"
            className="shrink-0 px-6 py-3 rounded-xl bg-white text-blue-950 font-black text-sm hover:bg-sky-100 transition-colors"
          >
            Đường dây nóng phản ánh: 0905.888.666
          </a>
        </div>

      </div>
    </section>
  );
}
