import React, { useState } from 'react';
import { 
  Wrench, 
  User, 
  MapPin, 
  Phone, 
  Clock, 
  Zap, 
  Calendar, 
  Check, 
  X, 
  MessageSquare, 
  AlertOctagon, 
  CheckCircle2, 
  ShieldCheck, 
  Star, 
  ArrowRight, 
  TrendingUp, 
  Bell, 
  PlusCircle,
  HelpCircle,
  Navigation,
  Eye
} from 'lucide-react';
import { useOrders } from '../../context/OrderContext';

export default function TechnicianPortal() {
  const { 
    technicianProfile, 
    toggleTechnicianOnline, 
    orders, 
    pendingCount, 
    activeOrders, 
    acceptOrder, 
    rejectOrder, 
    updateOrderStatus, 
    openChat, 
    openDisputeModal,
    switchRole,
    createOrder
  } = useOrders();

  const [activeTab, setActiveTab] = useState('pending'); // 'pending' | 'active' | 'history'
  const [rejectingOrderId, setRejectingOrderId] = useState(null);
  const [rejectReason, setRejectReason] = useState('Đang bận sửa cuốc khác chưa kịp di chuyển');

  const pendingOrders = orders.filter(o => o.status === 'pending');
  const inProgressOrders = orders.filter(o => ['accepted', 'arrived', 'in_progress'].includes(o.status));
  const completedOrDisputedOrders = orders.filter(o => ['completed', 'rejected', 'disputed'].includes(o.status));

  // Quick test helper to simulate receiving an urgent order from customer
  const handleSimulateNewUrgent = () => {
    createOrder({
      fullName: 'Chị Mai Linh',
      phoneNumber: '0905.777.999',
      district: 'hai-chau',
      districtName: 'Quận Hải Châu',
      addressDetail: '102 Phan Châu Trinh, P. Phước Ninh',
      serviceTitle: 'Sửa máy lạnh không mát, chảy nước',
      acBrand: 'Daikin Inverter',
      acQuantity: 1,
      issueDescription: 'Máy đang bật mà phòng nóng bức, chảy nước ra tường.',
      scheduleType: 'urgent',
      estimatedTotal: 250000
    });
  };

  const handleSimulateNewScheduled = () => {
    createOrder({
      fullName: 'Anh Quốc Bảo',
      phoneNumber: '0935.111.222',
      district: 'son-tra',
      districtName: 'Quận Sơn Trà',
      addressDetail: '45 Võ Văn Kiệt (gần Cầu Rồng)',
      serviceTitle: 'Vệ sinh máy lạnh treo tường (2 bộ)',
      acBrand: 'Panasonic',
      acQuantity: 2,
      issueDescription: 'Vệ sinh bảo dưỡng định kỳ 6 tháng.',
      scheduleType: 'scheduled',
      appointmentSlot: '14:00 - 16:00',
      estimatedTotal: 270000
    });
  };

  return (
    <div className="min-h-full bg-slate-100/90 text-slate-800 pb-24 text-left">
      
      {/* 1. Partner Header & Tech Profile Bar */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-slate-900 text-white border-b border-blue-900 shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            
            {/* Tech Profile Summary */}
            <div className="flex items-center gap-3.5">
              <div className="relative">
                <img 
                  src={technicianProfile.avatar} 
                  alt={technicianProfile.name}
                  className="w-13 h-13 rounded-2xl object-cover border-2 border-sky-400 shadow-md"
                />
                <span className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-blue-950 ${
                  technicianProfile.isOnline ? 'bg-emerald-400' : 'bg-rose-500'
                }`} />
              </div>

              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-lg font-black text-white">
                    {technicianProfile.name}
                  </h2>
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-sky-900/80 text-sky-300 border border-sky-700">
                    {technicianProfile.id}
                  </span>
                  <span className="text-xs font-bold text-amber-300 flex items-center gap-1 bg-amber-950/60 px-2 py-0.5 rounded-full border border-amber-800/80">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    {technicianProfile.rating} (184 đánh giá)
                  </span>
                </div>

                <p className="text-xs text-blue-200 mt-1 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>{technicianProfile.stationHub}</span>
                </p>
              </div>
            </div>

            {/* Controls: Online toggle & Back to customer */}
            <div className="flex items-center gap-2.5 flex-wrap">
              {/* Online / Busy toggle */}
              <button
                type="button"
                onClick={toggleTechnicianOnline}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs ${
                  technicianProfile.isOnline 
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 hover:bg-emerald-500/30' 
                    : 'bg-rose-500/20 text-rose-300 border border-rose-400/40 hover:bg-rose-500/30'
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${technicianProfile.isOnline ? 'bg-emerald-400 animate-ping' : 'bg-rose-400'}`} />
                <span>{technicianProfile.isOnline ? '🟢 Đang nhận đơn' : '🔴 Tạm nghỉ'}</span>
              </button>

              {/* Switch back to Customer View */}
              <button
                type="button"
                onClick={() => switchRole('customer')}
                className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer border border-white/20"
              >
                <Eye className="w-4 h-4 text-sky-300" />
                <span>Xem giao diện Khách</span>
              </button>
            </div>

          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-blue-900/60">
            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Thu nhập hôm nay</span>
              <span className="text-base font-black text-amber-300">
                {technicianProfile.todayEarnings.toLocaleString('vi-VN')}đ
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Đơn chờ tiếp nhận</span>
              <span className="text-base font-black text-sky-300">{pendingCount} đơn</span>
            </div>

            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Đang thực hiện</span>
              <span className="text-base font-black text-emerald-400">{activeOrders.length} đơn</span>
            </div>

            <div className="p-2.5 rounded-xl bg-white/5 border border-white/10">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Đã xong hôm nay</span>
              <span className="text-base font-black text-white">3 cuốc</span>
            </div>
          </div>

        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 space-y-6">

        {/* Demo Simulator Alert Bar to easily test incoming orders */}
        <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-blue-950 font-bold">
            <Bell className="w-4 h-4 text-blue-700 animate-bounce" />
            <span>Khu vực test thông báo đơn mới:</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSimulateNewUrgent}
              className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Zap className="w-3.5 h-3.5 text-amber-300" />
              <span>+ Giả lập đơn Cấp Tốc (30p)</span>
            </button>
            <button
              type="button"
              onClick={handleSimulateNewScheduled}
              className="px-3 py-1.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Calendar className="w-3.5 h-3.5 text-sky-300" />
              <span>+ Giả lập đơn Đặt Trước</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 pb-2 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'pending'
                ? 'bg-blue-900 text-white shadow-md shadow-blue-900/20'
                : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
            }`}
          >
            <span>Đơn mới chờ nhận</span>
            {pendingCount > 0 && (
              <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[11px] font-black flex items-center justify-center animate-pulse">
                {pendingCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('active')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'active'
                ? 'bg-blue-900 text-white shadow-md shadow-blue-900/20'
                : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
            }`}
          >
            <span>Đang thực hiện</span>
            {activeOrders.length > 0 && (
              <span className="w-5 h-5 rounded-full bg-emerald-600 text-white text-[11px] font-black flex items-center justify-center">
                {activeOrders.length}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('history')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'history'
                ? 'bg-blue-900 text-white shadow-md shadow-blue-900/20'
                : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200'
            }`}
          >
            <span>Lịch sử & Khiếu nại</span>
            <span className="text-[11px] text-slate-400 font-semibold">({completedOrDisputedOrders.length})</span>
          </button>
        </div>

        {/* Tab 1: Đơn mới chờ nhận (Pending) */}
        {activeTab === 'pending' && (
          <div className="space-y-4">
            {pendingOrders.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 shadow-xs space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-900 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7 text-emerald-600" />
                </div>
                <h3 className="text-base font-bold text-slate-800">
                  Hiện tại không có đơn hàng nào đang chờ!
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Bạn đang ở chế độ trực tuyến. Hệ thống sẽ tự động phát chuông cảnh báo ngay khi có khách đặt đơn cấp tốc hoặc đặt trước.
                </p>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleSimulateNewUrgent}
                    className="px-4 py-2 rounded-xl bg-blue-900 text-white text-xs font-bold hover:bg-blue-800 cursor-pointer"
                  >
                    Tạo thử 1 đơn cấp tốc
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pendingOrders.map((order) => {
                  const isUrgent = order.scheduleType === 'urgent';
                  const isRejecting = rejectingOrderId === order.id;

                  return (
                    <div
                      key={order.id}
                      className={`rounded-3xl p-5 sm:p-6 bg-white border-2 shadow-lg transition-all flex flex-col justify-between ${
                        isUrgent 
                          ? 'border-rose-400/80 shadow-rose-900/10' 
                          : 'border-blue-300 shadow-blue-900/10'
                      }`}
                    >
                      <div className="space-y-3.5">
                        {/* Top Badges */}
                        <div className="flex items-center justify-between gap-2">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black uppercase tracking-wider ${
                            isUrgent 
                              ? 'bg-rose-100 text-rose-800 border border-rose-300 animate-pulse' 
                              : 'bg-blue-100 text-blue-900 border border-blue-200'
                          }`}>
                            {isUrgent ? (
                              <>
                                <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                                <span>Cấp tốc (30 phút)</span>
                              </>
                            ) : (
                              <>
                                <Calendar className="w-3.5 h-3.5 text-blue-700" />
                                <span>Đặt hẹn trước</span>
                              </>
                            )}
                          </span>

                          <span className="font-mono text-xs font-bold text-slate-400">
                            {order.bookingCode}
                          </span>
                        </div>

                        {/* Customer & Location */}
                        <div>
                          <h4 className="text-base font-bold text-blue-950 flex items-center gap-2">
                            <User className="w-4 h-4 text-blue-700" />
                            <span>{order.customerName}</span>
                            <span className="text-slate-400">•</span>
                            <a 
                              href={`tel:${order.customerPhone}`}
                              className="text-emerald-700 font-semibold hover:underline"
                            >
                              {order.customerPhone}
                            </a>
                          </h4>

                          <p className="text-xs text-slate-600 mt-1 flex items-start gap-1.5">
                            <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0 mt-0.5" />
                            <span><strong>{order.addressDetail}</strong>, {order.districtName}</span>
                          </p>
                        </div>

                        {/* Service detail */}
                        <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
                          <div className="flex justify-between">
                            <span className="text-slate-500">Dịch vụ:</span>
                            <strong className="text-blue-950 font-bold text-right">{order.serviceTitle}</strong>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Thiết bị:</span>
                            <span className="text-slate-800 font-medium">{order.acBrand} ({order.acQuantity} máy)</span>
                          </div>
                          {order.issueDescription && (
                            <div className="pt-1.5 border-t border-slate-200 text-slate-600">
                              <span className="font-semibold text-slate-700">Mô tả lỗi:</span> {order.issueDescription}
                            </div>
                          )}
                        </div>

                        {/* Time & Price bar */}
                        <div className="flex items-center justify-between text-xs pt-1">
                          <span className="text-slate-500 flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            {isUrgent ? 'Cần đến ngay' : `${order.appointmentDate} (${order.appointmentSlot})`}
                          </span>

                          <div className="text-right">
                            <span className="text-sm font-black text-blue-950">
                              {Number(order.estimatedTotal).toLocaleString('vi-VN')}đ
                            </span>
                          </div>
                        </div>

                        {/* Inline Reject Form */}
                        {isRejecting && (
                          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 space-y-2 text-xs animate-in fade-in">
                            <span className="font-bold text-rose-800 block">Lý do từ chối:</span>
                            <select
                              value={rejectReason}
                              onChange={(e) => setRejectReason(e.target.value)}
                              className="w-full p-2 rounded-lg border border-rose-300 bg-white font-medium text-slate-800"
                            >
                              <option value="Đang bận sửa cuốc khác chưa kịp di chuyển">Đang bận sửa cuốc khác chưa kịp di chuyển</option>
                              <option value="Khoảng cách quá xa trạm kỹ thuật hiện tại">Khoảng cách quá xa trạm kỹ thuật hiện tại</option>
                              <option value="Không mang đủ linh kiện đặc thù cho dòng máy này">Không mang đủ linh kiện đặc thù cho dòng máy này</option>
                            </select>
                            <div className="flex justify-end gap-2 pt-1">
                              <button
                                type="button"
                                onClick={() => setRejectingOrderId(null)}
                                className="px-2.5 py-1 rounded bg-slate-200 text-slate-700 font-bold"
                              >
                                Hủy
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  rejectOrder(order.id, rejectReason);
                                  setRejectingOrderId(null);
                                }}
                                className="px-2.5 py-1 rounded bg-rose-600 text-white font-bold"
                              >
                                Xác nhận từ chối
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Action buttons */}
                      {!isRejecting && (
                        <div className="pt-4 border-t border-slate-100 flex items-center gap-2 mt-4">
                          <button
                            type="button"
                            onClick={() => setRejectingOrderId(order.id)}
                            className="flex-1 py-2.5 px-3 rounded-xl border border-rose-200 hover:bg-rose-50 text-rose-600 font-bold text-xs flex items-center justify-center gap-1 transition-colors cursor-pointer"
                          >
                            <X className="w-3.5 h-3.5" />
                            <span>Từ chối</span>
                          </button>

                          <button
                            type="button"
                            onClick={() => acceptOrder(order.id)}
                            className="flex-1 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1 shadow-md shadow-emerald-900/20 transition-all cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5" />
                            <span>Nhận đơn ngay</span>
                          </button>
                        </div>
                      )}

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Đơn đang thực hiện (Active) */}
        {activeTab === 'active' && (
          <div className="space-y-4">
            {inProgressOrders.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 shadow-xs space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <Wrench className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-slate-800">
                  Không có đơn nào đang thực hiện
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Vui lòng chuyển qua tab "Đơn mới chờ nhận" để tiếp nhận cuốc khách hàng mới.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {inProgressOrders.map((order) => {
                  return (
                    <div
                      key={order.id}
                      className="rounded-3xl p-5 sm:p-6 bg-white border-2 border-emerald-400 shadow-xl shadow-emerald-950/5 flex flex-col justify-between"
                    >
                      <div className="space-y-3.5">
                        
                        {/* Status bar */}
                        <div className="flex items-center justify-between">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase bg-emerald-100 text-emerald-900 border border-emerald-300">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                            <span>
                              {order.status === 'accepted' && 'Đã nhận - Đang di chuyển'}
                              {order.status === 'arrived' && 'Đã có mặt tại nhà khách'}
                              {order.status === 'in_progress' && 'Đang tiến hành sửa chữa'}
                            </span>
                          </span>

                          <span className="font-mono text-xs font-bold text-slate-400">
                            {order.bookingCode}
                          </span>
                        </div>

                        {/* Customer Info & Phone */}
                        <div>
                          <div className="flex items-center justify-between">
                            <h4 className="text-base font-bold text-blue-950 flex items-center gap-2">
                              <User className="w-4 h-4 text-blue-700" />
                              <span>{order.customerName}</span>
                            </h4>

                            <a
                              href={`tel:${order.customerPhone}`}
                              className="px-3 py-1 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold text-xs flex items-center gap-1 hover:bg-emerald-100 transition-colors"
                            >
                              <Phone className="w-3.5 h-3.5 text-emerald-600" />
                              <span>{order.customerPhone}</span>
                            </a>
                          </div>

                          <p className="text-xs text-slate-600 mt-1.5 flex items-start gap-1.5">
                            <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                            <span><strong>{order.addressDetail}</strong>, {order.districtName}</span>
                          </p>
                        </div>

                        {/* Service detail */}
                        <div className="p-3 rounded-2xl bg-blue-50/70 border border-blue-100 text-xs space-y-1">
                          <div className="flex justify-between">
                            <span className="text-slate-500">Dịch vụ:</span>
                            <strong className="text-blue-950 font-bold">{order.serviceTitle}</strong>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500">Đơn giá thu:</span>
                            <span className="font-black text-blue-900">
                              {Number(order.estimatedTotal).toLocaleString('vi-VN')}đ
                            </span>
                          </div>
                        </div>

                        {/* Workflow Status Controls */}
                        <div className="pt-2">
                          <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1.5">
                            Cập nhật tiến độ cuốc:
                          </span>
                          <div className="grid grid-cols-3 gap-2 text-xs">
                            <button
                              type="button"
                              onClick={() => updateOrderStatus(order.id, 'arrived')}
                              className={`p-2 rounded-xl font-bold border transition-colors cursor-pointer ${
                                order.status === 'arrived' 
                                  ? 'bg-blue-900 text-white border-blue-900' 
                                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                              }`}
                            >
                              📍 Đã đến nơi
                            </button>

                            <button
                              type="button"
                              onClick={() => updateOrderStatus(order.id, 'in_progress')}
                              className={`p-2 rounded-xl font-bold border transition-colors cursor-pointer ${
                                order.status === 'in_progress' 
                                  ? 'bg-blue-900 text-white border-blue-900' 
                                  : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                              }`}
                            >
                              🔧 Đang sửa
                            </button>

                            <button
                              type="button"
                              onClick={() => updateOrderStatus(order.id, 'completed')}
                              className="p-2 rounded-xl font-bold bg-emerald-600 hover:bg-emerald-700 text-white transition-colors cursor-pointer shadow-xs"
                            >
                              ✅ Hoàn tất
                            </button>
                          </div>
                        </div>

                      </div>

                      {/* Main Action Bar: Chat & Dispute */}
                      <div className="pt-4 border-t border-slate-100 flex items-center gap-2 mt-4">
                        {/* Direct Chat with Customer */}
                        <button
                          type="button"
                          onClick={() => openChat(order.id)}
                          className="flex-1 py-2.5 px-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-blue-900/20 transition-all cursor-pointer"
                        >
                          <MessageSquare className="w-3.5 h-3.5 text-sky-300" />
                          <span>Chat với khách</span>
                          {order.chatMessages.length > 0 && (
                            <span className="text-[10px] bg-white/20 px-1.5 py-0.2 rounded-full font-bold">
                              {order.chatMessages.length}
                            </span>
                          )}
                        </button>

                        {/* Dispute / Non-payment Report Button */}
                        <button
                          type="button"
                          onClick={() => openDisputeModal(order.id)}
                          className="py-2.5 px-3 rounded-xl border border-rose-300 hover:bg-rose-50 text-rose-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                          title="Báo cáo khách quỵt tiền / không chịu thanh toán"
                        >
                          <AlertOctagon className="w-3.5 h-3.5 text-rose-600" />
                          <span>Khiếu nại không trả tiền</span>
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Lịch sử & Khiếu nại (History) */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            {completedOrDisputedOrders.length === 0 ? (
              <div className="bg-white rounded-3xl p-10 text-center border border-slate-200 shadow-xs space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h3 className="text-base font-bold text-slate-800">
                  Chưa có lịch sử cuốc hoàn thành hoặc khiếu nại
                </h3>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {completedOrDisputedOrders.map((order) => {
                  const isDisputed = order.status === 'disputed' || order.dispute;
                  const isRejected = order.status === 'rejected';

                  return (
                    <div
                      key={order.id}
                      className={`rounded-3xl p-5 bg-white border-2 shadow-xs space-y-3 ${
                        isDisputed 
                          ? 'border-rose-400 bg-rose-50/20' 
                          : isRejected 
                            ? 'border-slate-200 opacity-75' 
                            : 'border-emerald-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-black uppercase ${
                          isDisputed
                            ? 'bg-rose-100 text-rose-800 border border-rose-300'
                            : isRejected
                              ? 'bg-slate-100 text-slate-600'
                              : 'bg-emerald-100 text-emerald-800'
                        }`}>
                          {isDisputed && '⚠️ Đang khiếu nại không trả tiền'}
                          {isRejected && '❌ Thợ đã từ chối'}
                          {order.status === 'completed' && '✅ Hoàn tất & Nghiệm thu'}
                        </span>

                        <span className="font-mono text-xs font-bold text-slate-400">
                          {order.bookingCode}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-sm font-bold text-slate-900">
                          {order.customerName} ({order.customerPhone})
                        </h4>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {order.addressDetail}, {order.districtName}
                        </p>
                      </div>

                      {/* Dispute detail banner */}
                      {isDisputed && order.dispute && (
                        <div className="p-3 rounded-2xl bg-rose-100/70 border border-rose-200 text-xs space-y-1 text-rose-950">
                          <div className="flex justify-between font-bold">
                            <span>Số tiền bị nợ:</span>
                            <span className="text-rose-700 font-black">
                              {Number(order.dispute.unpaidAmount).toLocaleString('vi-VN')}đ
                            </span>
                          </div>
                          <div>
                            <span className="font-semibold text-rose-900">Lý do: </span>
                            <span>{order.dispute.reason}</span>
                          </div>
                          <div className="text-[11px] text-emerald-800 font-semibold pt-1">
                            ✓ Tổng đài CoolCall đang xử lý & cam kết bảo hiểm 100% tiền công cho thợ.
                          </div>
                        </div>
                      )}

                      {/* Rejection detail */}
                      {isRejected && (
                        <p className="text-xs text-slate-500 italic">
                          Lý do từ chối: {order.rejectReason || 'Bận việc khác'}
                        </p>
                      )}

                      <div className="pt-2 flex items-center justify-between border-t border-slate-100 text-xs">
                        <button
                          type="button"
                          onClick={() => openChat(order.id)}
                          className="text-blue-900 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Xem lại đoạn chat</span>
                        </button>

                        <span className="font-bold text-slate-700">
                          {Number(order.estimatedTotal).toLocaleString('vi-VN')}đ
                        </span>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

      </div>

    </div>
  );
}
