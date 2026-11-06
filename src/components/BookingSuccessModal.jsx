import React, { useEffect, useState } from 'react';
import { 
  CheckCircle, 
  Phone, 
  Copy, 
  Check, 
  X, 
  ShieldCheck, 
  Wrench,
  MessageSquare,
  ArrowRight
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useOrders } from '../context/OrderContext';

export default function BookingSuccessModal({ booking, onClose }) {
  const [copied, setCopied] = useState(false);
  const { openChat, switchRole } = useOrders();

  useEffect(() => {
    // Fire confetti effect
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore if confetti fails
    }
  }, []);

  if (!booking) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(booking.bookingCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleOpenChat = () => {
    onClose();
    openChat(booking.bookingCode);
  };

  const handleSwitchToTechnician = () => {
    onClose();
    switchRole('technician');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-blue-100 overflow-hidden transform animate-in zoom-in-95 duration-200 text-left max-h-[90vh] overflow-y-auto"
      >
        {/* Top Header with Deep Navy Background */}
        <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-900 text-white p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle className="w-7 h-7" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-sky-300">
                Đặt lịch thành công!
              </span>
              <h3 className="text-xl font-black text-white">
                CoolCall Đã Tiếp Nhận Yêu Cầu
              </h3>
            </div>
          </div>

          {/* Booking Code Bar */}
          <div className="mt-4 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
            <span className="text-slate-300">Mã đơn đặt thợ:</span>
            <div className="flex items-center gap-2">
              <span className="font-mono font-bold text-sm bg-white/10 px-2.5 py-1 rounded-lg text-amber-300 tracking-wider">
                {booking.bookingCode}
              </span>
              <button
                type="button"
                onClick={handleCopyCode}
                className="p-1 rounded bg-white/10 hover:bg-white/20 text-white text-[10px] flex items-center gap-1 transition-colors cursor-pointer"
                title="Sao chép mã đơn"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Đã chép' : 'Chép'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4">
          
          {/* Dispatch Notice Box */}
          <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-200 flex items-start gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-900 text-white flex items-center justify-center shrink-0 mt-0.5">
              <Wrench className="w-5 h-5 text-sky-300" />
            </div>
            <div className="text-xs">
              <div className="font-bold text-blue-950 text-sm mb-0.5">
                Kỹ thuật viên đang tiếp nhận đơn
              </div>
              <p className="text-slate-600 leading-relaxed">
                Đơn hàng đã được phát đến mạng lưới thợ khu vực của bạn. Thợ sẽ liên hệ hoặc chat trực tiếp với bạn ngay!
              </p>
            </div>
          </div>

          {/* Information Details */}
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/80 space-y-2 text-xs">
            <div className="flex justify-between py-1 border-b border-slate-200/60">
              <span className="text-slate-500">Khách hàng:</span>
              <strong className="text-slate-900">{booking.fullName} — {booking.phoneNumber}</strong>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-200/60">
              <span className="text-slate-500">Địa chỉ:</span>
              <span className="text-slate-800 font-medium text-right max-w-[260px]">{booking.fullAddress}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-200/60">
              <span className="text-slate-500">Gói dịch vụ:</span>
              <span className="text-blue-950 font-bold">{booking.serviceName}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-200/60">
              <span className="text-slate-500">Thiết bị:</span>
              <span className="text-slate-800">{booking.acBrand} ({booking.acQuantity} máy) • {booking.acType}</span>
            </div>

            <div className="flex justify-between py-1 border-b border-slate-200/60">
              <span className="text-slate-500">Thời gian yêu cầu:</span>
              <span className="text-blue-900 font-semibold">{booking.scheduleType}</span>
            </div>

            <div className="flex justify-between py-1 pt-1">
              <span className="text-slate-700 font-bold">Tạm tính ước lượng:</span>
              <span className="text-base font-black text-blue-950">
                {Number(booking.estimatedTotal).toLocaleString('vi-VN')}đ
              </span>
            </div>
          </div>

          {/* Action Buttons: Chat trực tiếp & Switch to Tech */}
          <div className="space-y-2 pt-1">
            <button
              type="button"
              onClick={handleOpenChat}
              className="w-full py-3 px-4 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-blue-900/20 transition-all cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-sky-300" />
              <span>💬 Mở khung chat trực tiếp với thợ</span>
            </button>

            <button
              type="button"
              onClick={handleSwitchToTechnician}
              className="w-full py-2.5 px-4 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-950 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <Wrench className="w-3.5 h-3.5 text-amber-600" />
              <span>🛠️ Thử đóng vai Thợ để xem thông báo & nhận đơn này</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-700" />
            </button>
          </div>

          {/* Close button */}
          <div className="pt-2 text-center">
            <button
              type="button"
              onClick={onClose}
              className="text-xs text-slate-500 hover:text-slate-800 font-semibold cursor-pointer"
            >
              Đóng cửa sổ
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
