import React, { useState } from 'react';
import { 
  AlertOctagon, 
  X, 
  ShieldAlert, 
  BadgeDollarSign, 
  FileText, 
  CheckCircle2, 
  PhoneCall, 
  User, 
  MapPin,
  Lock
} from 'lucide-react';
import { useOrders } from '../../context/OrderContext';

export default function DisputeModal() {
  const { 
    orders, 
    activeDisputeOrderId, 
    closeDisputeModal, 
    fileDispute 
  } = useOrders();

  const order = orders.find(o => o.id === activeDisputeOrderId);

  const [reason, setReason] = useState('Khách từ chối thanh toán sau khi thợ đã sửa xong');
  const [unpaidAmount, setUnpaidAmount] = useState(order?.estimatedTotal || 250000);
  const [evidenceNote, setEvidenceNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!order) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      fileDispute(order.id, {
        reason,
        unpaidAmount: Number(unpaidAmount),
        evidenceNote
      });
      setSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        closeDisputeModal();
      }, 2000);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border-2 border-rose-500 overflow-hidden transform animate-in zoom-in-95 duration-200 text-left max-h-[92vh] flex flex-col">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-rose-700 via-rose-800 to-red-950 text-white p-5 shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-white shrink-0">
              <AlertOctagon className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded-full bg-white/20 text-white">
                BẢO VỆ ĐỐI TÁC THỢ ĐIỆN LẠNH
              </span>
              <h3 className="text-base sm:text-lg font-black text-white mt-0.5">
                Khiếu Nại Khách Hàng Không Trả Tiền
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={closeDisputeModal}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        {isSuccess ? (
          <div className="p-8 text-center space-y-3 my-auto">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h4 className="text-xl font-black text-slate-900">
              Đã Tiếp Nhận Khiếu Nại Của Bạn!
            </h4>
            <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
              Tổng đài CoolCall đã tiếp nhận hồ sơ quỵt tiền đơn <strong>{order.bookingCode}</strong>. Chúng tôi đã kích hoạt bảo hiểm tiền công cho bạn và đưa số điện thoại khách hàng vào danh sách đen.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
            
            {/* Target Customer Info */}
            <div className="p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500 font-medium">Mã đơn bị quỵt:</span>
                <span className="font-mono font-bold text-rose-800 bg-white px-2 py-0.5 rounded border border-rose-200">
                  {order.bookingCode}
                </span>
              </div>

              <div className="flex items-center gap-2 font-bold text-slate-900">
                <User className="w-4 h-4 text-rose-600" />
                <span>{order.customerName}</span>
                <span className="text-slate-400">•</span>
                <span className="text-rose-700">{order.customerPhone}</span>
              </div>

              <div className="flex items-start gap-2 text-slate-600">
                <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <span>{order.addressDetail}, {order.districtName}</span>
              </div>
            </div>

            {/* Select Dispute Reason */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Lý do khiếu nại không thanh toán <span className="text-rose-500">*</span>
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500 cursor-pointer"
              >
                <option value="Khách từ chối thanh toán sau khi thợ đã sửa xong">Khách từ chối thanh toán sau khi thợ đã sửa xong</option>
                <option value="Khách hứa chuyển khoản nhưng đến giờ quỵt không chuyển">Khách hứa chuyển khoản nhưng đến giờ quỵt không chuyển</option>
                <option value="Khách thanh toán thiếu tiền linh kiện thay thế">Khách thanh toán thiếu tiền linh kiện thay thế đã thỏa thuận</option>
                <option value="Khách cố tình khóa cửa vắng mặt không nghiệm thu thanh toán">Khách cố tình khóa cửa vắng mặt không nghiệm thu thanh toán</option>
                <option value="Khách vô cớ cự cãi, ép thợ giảm giá không theo bảng niêm yết">Khách vô cớ cự cãi, ép thợ giảm giá không theo bảng niêm yết</option>
              </select>
            </div>

            {/* Unpaid Amount */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Số tiền khách chưa thanh toán (VNĐ) <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-rose-600 font-bold text-sm">
                  ₫
                </div>
                <input
                  type="number"
                  value={unpaidAmount}
                  onChange={(e) => setUnpaidAmount(e.target.value)}
                  placeholder="Nhập số tiền bị nợ..."
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>
            </div>

            {/* Evidence & Details */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Mô tả sự việc chi tiết & Bằng chứng
              </label>
              <textarea
                rows={3}
                value={evidenceNote}
                onChange={(e) => setEvidenceNote(e.target.value)}
                placeholder="VD: Thợ đã vệ sinh xịt rửa sạch và bơm gas R32 xong, khách bật thử máy đã mát lạnh 18 độ. Nhưng khi yêu cầu thanh toán 250k thì khách nói không có tiền mặt, hẹn gửi tài khoản rồi tắt máy không nghe..."
                className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
            </div>

            {/* Protection Policy Banner */}
            <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200 space-y-2 text-[11px] text-amber-950">
              <div className="flex items-center gap-1.5 font-bold text-amber-900">
                <ShieldAlert className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Chính sách bảo vệ 100% tiền công thợ của CoolCall:</span>
              </div>
              <ul className="list-disc pl-4 space-y-1 text-slate-700">
                <li>CoolCall hỗ trợ tạm ứng tiền công cho thợ sau khi bộ phận kiểm duyệt xác minh sự việc.</li>
                <li>Khách hàng này sẽ bị khóa tài khoản vĩnh viễn và đưa vào danh sách đen nợ xấu trên toàn mạng lưới Đà Nẵng.</li>
                <li>Ban pháp chế CoolCall sẽ trực tiếp liên hệ can thiệp để đòi lại quyền lợi cho bạn.</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
              <button
                type="button"
                onClick={closeDisputeModal}
                className="px-4 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-bold cursor-pointer"
              >
                Hủy bỏ
              </button>

              <button
                type="submit"
                disabled={submitting}
                className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 active:bg-rose-800 text-white text-xs sm:text-sm font-bold shadow-lg shadow-rose-900/25 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {submitting ? (
                  <span>Đang gửi hồ sơ...</span>
                ) : (
                  <>
                    <AlertOctagon className="w-4 h-4 text-amber-300" />
                    <span>Gửi khiếu nại lên Tổng đài</span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
}
