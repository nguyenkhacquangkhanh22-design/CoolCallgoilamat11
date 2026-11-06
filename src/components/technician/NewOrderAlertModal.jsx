import React, { useState } from 'react';
import { 
  Zap, 
  Calendar, 
  MapPin, 
  Phone, 
  User, 
  Wrench, 
  Clock, 
  Check, 
  X, 
  AlertTriangle 
} from 'lucide-react';
import { useOrders } from '../../context/OrderContext';

export default function NewOrderAlertModal() {
  const { incomingAlertOrder, acceptOrder, rejectOrder, dismissIncomingAlert } = useOrders();
  const [showRejectReason, setShowRejectReason] = useState(false);
  const [rejectReason, setRejectReason] = useState('Đang bận sửa cuốc khác chưa kịp di chuyển');

  if (!incomingAlertOrder) return null;

  const isUrgent = incomingAlertOrder.scheduleType === 'urgent';

  const handleConfirmReject = () => {
    rejectOrder(incomingAlertOrder.id, rejectReason);
    setShowRejectReason(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border-2 border-amber-400 overflow-hidden transform animate-in zoom-in-95 duration-200 text-left">
        
        {/* Top Header Banner */}
        <div className={`p-5 text-white ${
          isUrgent 
            ? 'bg-gradient-to-r from-rose-600 via-rose-700 to-amber-600 animate-pulse' 
            : 'bg-gradient-to-r from-blue-900 to-sky-700'
        }`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-white/20 flex items-center justify-center text-white shrink-0">
                {isUrgent ? <Zap className="w-6 h-6 text-amber-300 fill-amber-300" /> : <Calendar className="w-6 h-6 text-sky-200" />}
              </div>
              <div>
                <span className="text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded-full bg-white/20 text-white inline-block">
                  {isUrgent ? '🚨 ĐƠN TRỰC TIẾP CẤP TỐC' : '📅 ĐƠN HẸN ĐẶT TRƯỚC'}
                </span>
                <h3 className="text-lg font-black text-white mt-0.5">
                  {isUrgent ? 'YÊU CẦU CÓ MẶT SAU 30 PHÚT' : 'KHÁCH HÀNG HẸN LỊCH MỚI'}
                </h3>
              </div>
            </div>

            <button
              type="button"
              onClick={dismissIncomingAlert}
              className="p-1.5 rounded-full bg-white/10 hover:bg-white/25 text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Order Details Body */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[70vh] overflow-y-auto">
          {/* Customer & Location */}
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Mã đơn:</span>
              <span className="font-mono font-bold text-blue-950 bg-blue-100 px-2 py-0.5 rounded">
                {incomingAlertOrder.bookingCode}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm font-bold text-blue-950">
              <User className="w-4 h-4 text-blue-700" />
              <span>{incomingAlertOrder.customerName}</span>
              <span className="text-slate-400">•</span>
              <span className="text-emerald-700 font-semibold">{incomingAlertOrder.customerPhone}</span>
            </div>

            <div className="flex items-start gap-2 text-xs text-slate-700">
              <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span>
                <strong className="text-slate-900">{incomingAlertOrder.addressDetail}</strong>, {incomingAlertOrder.districtName}
              </span>
            </div>
          </div>

          {/* Service & Equipment */}
          <div className="p-3.5 rounded-2xl bg-blue-50/70 border border-blue-100 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-500">Dịch vụ yêu cầu:</span>
              <span className="font-bold text-blue-900 text-right">{incomingAlertOrder.serviceTitle}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-slate-500">Thiết bị:</span>
              <span className="font-semibold text-slate-800">
                {incomingAlertOrder.acBrand} ({incomingAlertOrder.acQuantity} máy)
              </span>
            </div>

            {incomingAlertOrder.issueDescription && (
              <div className="pt-2 border-t border-blue-100 text-slate-600">
                <span className="font-semibold text-slate-700">Hiện tượng lỗi: </span>
                <span>{incomingAlertOrder.issueDescription}</span>
              </div>
            )}
          </div>

          {/* Pricing & Time */}
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-amber-50/80 border border-amber-200">
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-800 block">Thời gian mong muốn</span>
              <span className="text-xs font-black text-amber-950 flex items-center gap-1 mt-0.5">
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                {isUrgent ? 'Ưu tiên khẩn cấp 30 phút' : `${incomingAlertOrder.appointmentDate} (${incomingAlertOrder.appointmentSlot})`}
              </span>
            </div>

            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-500 block">Tạm tính tiền công</span>
              <span className="text-lg font-black text-blue-950">
                {Number(incomingAlertOrder.estimatedTotal).toLocaleString('vi-VN')}đ
              </span>
            </div>
          </div>

          {/* Reject Reason Form Toggle */}
          {showRejectReason && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 space-y-3 animate-in fade-in">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-800">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Chọn lý do từ chối đơn hàng:</span>
              </div>
              <select
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-rose-300 bg-white text-xs text-slate-800 font-medium focus:outline-none"
              >
                <option value="Đang bận sửa cuốc khác chưa kịp di chuyển">Đang bận sửa cuốc khác chưa kịp di chuyển</option>
                <option value="Khoảng cách quá xa trạm kỹ thuật hiện tại">Khoảng cách quá xa trạm kỹ thuật hiện tại (&gt;10km)</option>
                <option value="Không mang đủ linh kiện đặc thù cho dòng máy này">Không mang đủ linh kiện đặc thù cho dòng máy này</option>
                <option value="Đã hết giờ làm việc / Kết thúc ca trực">Đã hết giờ làm việc / Kết thúc ca trực</option>
              </select>

              <div className="flex items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => setShowRejectReason(false)}
                  className="px-3 py-1.5 rounded-xl bg-slate-200 hover:bg-slate-300 text-xs font-bold text-slate-700 cursor-pointer"
                >
                  Hủy
                </button>
                <button
                  type="button"
                  onClick={handleConfirmReject}
                  className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-xs font-bold text-white shadow-xs cursor-pointer"
                >
                  Xác nhận từ chối
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons Footer */}
        {!showRejectReason && (
          <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowRejectReason(true)}
              className="flex-1 py-3 px-4 rounded-xl border border-rose-200 hover:bg-rose-50 text-rose-600 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
              <span>Từ chối nhận đơn</span>
            </button>

            <button
              type="button"
              onClick={() => acceptOrder(incomingAlertOrder.id)}
              className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-900/20 transition-all cursor-pointer transform hover:scale-[1.02]"
            >
              <Check className="w-4 h-4" />
              <span>Nhận đơn ngay</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
