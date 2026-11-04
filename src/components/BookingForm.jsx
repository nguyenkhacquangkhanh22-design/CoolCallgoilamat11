import React, { useState } from 'react';
import { 
  User, 
  Phone, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  Zap, 
  ShieldCheck, 
  ChevronDown, 
  Percent, 
  Send, 
  Building 
} from 'lucide-react';
import { DANANG_DISTRICTS, SERVICES, AC_TYPES, AC_BRANDS, COMMON_ISSUES } from '../data/coolcallData';

export default function BookingForm({ selectedServiceFromParent, initialDistrict = 'hai-chau', onBookingSubmit }) {
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [district, setDistrict] = useState(initialDistrict);
  const [addressDetail, setAddressDetail] = useState('');
  const [serviceId, setServiceId] = useState('vesinh-treotuong');
  const [acType, setAcType] = useState('wall-inverter');
  const [acBrand, setAcBrand] = useState('Daikin');
  const [acQuantity, setAcQuantity] = useState(1);
  const [issueDescription, setIssueDescription] = useState('');
  const [scheduleType, setScheduleType] = useState('urgent'); // 'urgent' | 'scheduled'
  const [appointmentDate, setAppointmentDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [appointmentSlot, setAppointmentSlot] = useState('08:00 - 10:00');
  const [customerNote, setCustomerNote] = useState('');

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync when parent changes district or selected service during render
  const [prevDistrict, setPrevDistrict] = useState(initialDistrict);
  if (initialDistrict !== prevDistrict) {
    setPrevDistrict(initialDistrict);
    setDistrict(initialDistrict);
  }

  const [prevSelectedService, setPrevSelectedService] = useState(selectedServiceFromParent);
  if (selectedServiceFromParent && selectedServiceFromParent !== prevSelectedService) {
    setPrevSelectedService(selectedServiceFromParent);
    if (selectedServiceFromParent.id) {
      setServiceId(selectedServiceFromParent.id);
    }
  }

  // Selected service object
  const currentService = SERVICES.find((s) => s.id === serviceId) || SERVICES[0];
  const currentDistrictObj = DANANG_DISTRICTS.find((d) => d.id === district) || DANANG_DISTRICTS[0];

  // Price calculations
  const baseServicePrice = currentService.price || 150000;
  const rawTotal = baseServicePrice * acQuantity;
  const discountAmount = acQuantity >= 2 ? Math.round(rawTotal * 0.1) : 0;
  const estimatedTotal = rawTotal - discountAmount;

  // Quick select issue chip
  const handleToggleIssue = (issue) => {
    if (issueDescription.includes(issue)) {
      setIssueDescription((prev) => prev.replace(issue, '').trim().replace(/^,|,$/g, ''));
    } else {
      setIssueDescription((prev) => (prev ? `${prev}, ${issue}` : issue));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!fullName.trim()) {
      newErrors.fullName = 'Vui lòng nhập họ và tên của bạn';
    }

    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = 'Vui lòng nhập số điện thoại';
    } else if (!phoneRegex.test(phoneNumber.replace(/\s+/g, ''))) {
      newErrors.phoneNumber = 'Số điện thoại không hợp lệ (VD: 0905123456)';
    }

    if (!addressDetail.trim()) {
      newErrors.addressDetail = 'Vui lòng nhập địa chỉ cụ thể (số nhà, tên đường)';
    }

    if (scheduleType === 'scheduled' && !appointmentDate) {
      newErrors.appointmentDate = 'Vui lòng chọn ngày hẹn';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate network submission
    setTimeout(() => {
      setIsSubmitting(false);
      const bookingData = {
        bookingCode: `CC-${Math.floor(1000 + Math.random() * 9000)}`,
        fullName,
        phoneNumber,
        district: currentDistrictObj.name,
        addressDetail,
        fullAddress: `${addressDetail}, ${currentDistrictObj.name}, Đà Nẵng`,
        serviceName: currentService.title,
        servicePriceDisplay: currentService.priceDisplay,
        acType: AC_TYPES.find((t) => t.id === acType)?.name || acType,
        acBrand,
        acQuantity,
        issueDescription: issueDescription || 'Kiểm tra bảo dưỡng tổng thể',
        scheduleType: scheduleType === 'urgent' ? 'Cần thợ gấp (sau 30 phút)' : `Đặt trước: ${appointmentDate} lúc ${appointmentSlot}`,
        customerNote,
        estimatedTotal,
        technician: {
          name: 'Nguyễn Văn Hùng',
          phone: '0905.888.666',
          activeDistrict: currentDistrictObj.name,
          estArrival: scheduleType === 'urgent' ? 'Sau 25 - 30 phút' : `${appointmentSlot}, ${appointmentDate}`
        }
      };

      onBookingSubmit(bookingData);
    }, 600);
  };

  return (
    <section id="booking" className="py-16 sm:py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-bold uppercase tracking-wider mb-3 border border-blue-200">
            <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            Điều phối tức thì trong 30 giây
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-blue-950 tracking-tight">
            Đặt Lịch Thợ Sửa Máy Lạnh Nhanh
          </h2>
          <p className="mt-3 text-base sm:text-lg text-slate-600">
            Điền thông tin bên dưới, kỹ thuật viên CoolCall tại khu vực của bạn sẽ nhận thông báo và liên hệ xác nhận ngay.
          </p>
        </div>

        {/* Main Form Container */}
        <div className="bg-gradient-to-b from-blue-50/60 to-white rounded-3xl border border-blue-100 p-6 sm:p-10 shadow-xl shadow-blue-900/5">
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left 8 columns: Form inputs */}
            <div className="lg:col-span-8 space-y-6 text-left">
              
              {/* Section 1: Customer Contact info */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs">
                <h3 className="text-base font-bold text-blue-950 mb-4 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-900 flex items-center justify-center text-xs font-black">
                    1
                  </div>
                  <span>Thông tin khách hàng & Địa chỉ tại Đà Nẵng</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Họ và tên của bạn <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => {
                          setFullName(e.target.value);
                          if (errors.fullName) setErrors({ ...errors, fullName: null });
                        }}
                        placeholder="VD: Nguyễn Văn An"
                        className={`w-full pl-9 pr-3.5 py-3 rounded-xl border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-800 transition-all ${
                          errors.fullName ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 bg-slate-50/50'
                        }`}
                      />
                    </div>
                    {errors.fullName && (
                      <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Số điện thoại liên hệ <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        value={phoneNumber}
                        onChange={(e) => {
                          setPhoneNumber(e.target.value);
                          if (errors.phoneNumber) setErrors({ ...errors, phoneNumber: null });
                        }}
                        placeholder="VD: 0905 123 456"
                        className={`w-full pl-9 pr-3.5 py-3 rounded-xl border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-800 transition-all ${
                          errors.phoneNumber ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 bg-slate-50/50'
                        }`}
                      />
                    </div>
                    {errors.phoneNumber && (
                      <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.phoneNumber}
                      </p>
                    )}
                  </div>

                  {/* District in Danang */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Quận / Huyện tại Đà Nẵng <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-blue-700">
                        <MapPin className="w-4 h-4" />
                      </div>
                      <select
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="w-full pl-9 pr-8 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-800 appearance-none cursor-pointer"
                      >
                        {DANANG_DISTRICTS.map((d) => (
                          <option key={d.id} value={d.id}>
                            {d.name} (Đang có {d.activeTechs} thợ)
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                    <p className="text-[11px] text-emerald-700 mt-1 font-medium">
                      ✓ Trạm kỹ thuật gần bạn nhất: {currentDistrictObj.hubs[0]} (dự kiến đến sau {currentDistrictObj.estTime})
                    </p>
                  </div>

                  {/* Detailed Address */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Địa chỉ cụ thể <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Building className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={addressDetail}
                        onChange={(e) => {
                          setAddressDetail(e.target.value);
                          if (errors.addressDetail) setErrors({ ...errors, addressDetail: null });
                        }}
                        placeholder="Số nhà, tên đường, số phòng/tầng..."
                        className={`w-full pl-9 pr-3.5 py-3 rounded-xl border text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-800 transition-all ${
                          errors.addressDetail ? 'border-rose-400 bg-rose-50/30' : 'border-slate-200 bg-slate-50/50'
                        }`}
                      />
                    </div>
                    {errors.addressDetail && (
                      <p className="text-xs text-rose-500 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> {errors.addressDetail}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Section 2: Service & AC Details */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs">
                <h3 className="text-base font-bold text-blue-950 mb-4 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-900 flex items-center justify-center text-xs font-black">
                    2
                  </div>
                  <span>Chi tiết dịch vụ & Thiết bị máy lạnh</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  {/* Select Service */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Gói dịch vụ bạn cần làm <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={serviceId}
                        onChange={(e) => setServiceId(e.target.value)}
                        className="w-full px-3.5 py-3 rounded-xl border border-blue-200 bg-blue-50/50 text-sm font-bold text-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-800 appearance-none cursor-pointer"
                      >
                        {SERVICES.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.title} — {s.priceDisplay} ({s.unit})
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-500">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* AC Type */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Loại máy lạnh <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <select
                        value={acType}
                        onChange={(e) => setAcType(e.target.value)}
                        className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-800 appearance-none cursor-pointer"
                      >
                        {AC_TYPES.map((t) => (
                          <option key={t.id} value={t.id}>
                            {t.name}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* AC Brand */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Hãng máy lạnh
                    </label>
                    <div className="relative">
                      <select
                        value={acBrand}
                        onChange={(e) => setAcBrand(e.target.value)}
                        className="w-full px-3.5 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-blue-800 appearance-none cursor-pointer"
                      >
                        {AC_BRANDS.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* AC Quantity with Discount badge */}
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Số lượng máy cần phục vụ
                    </label>
                    <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                      {[1, 2, 3, 4, 5].map((qty) => (
                        <button
                          key={qty}
                          type="button"
                          onClick={() => setAcQuantity(qty)}
                          className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-bold border transition-all cursor-pointer ${
                            acQuantity === qty
                              ? 'bg-blue-900 text-white border-blue-900 shadow-sm'
                              : 'bg-slate-50 hover:bg-blue-50 text-slate-700 border-slate-200'
                          }`}
                        >
                          {qty} máy {qty >= 2 && <span className="text-[10px] text-amber-300 ml-1 font-normal hidden sm:inline">-10%</span>}
                        </button>
                      ))}
                    </div>
                    {acQuantity >= 2 && (
                      <p className="text-xs text-emerald-700 mt-2 font-bold flex items-center gap-1">
                        <Percent className="w-3.5 h-3.5 text-emerald-600" />
                        Đã tự động áp dụng mã giảm giá 10% cho đơn từ 2 máy trở lên!
                      </p>
                    )}
                  </div>
                </div>

                {/* Common Issue / Problem Description */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Tình trạng máy lạnh hư hỏng hoặc yêu cầu cụ thể
                  </label>
                  
                  {/* Quick chips */}
                  <div className="flex flex-wrap gap-1.5 mb-2.5">
                    {COMMON_ISSUES.slice(0, 6).map((issue, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => handleToggleIssue(issue)}
                        className={`text-xs px-2.5 py-1 rounded-lg border transition-colors cursor-pointer ${
                          issueDescription.includes(issue)
                            ? 'bg-blue-100 text-blue-900 border-blue-300 font-semibold'
                            : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        + {issue}
                      </button>
                    ))}
                  </div>

                  <textarea
                    rows={2}
                    value={issueDescription}
                    onChange={(e) => setIssueDescription(e.target.value)}
                    placeholder="Mô tả hiện tượng: máy không lạnh, chảy giọt nước, kêu rè rè, báo đèn đỏ..."
                    className="w-full p-3 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-800"
                  />
                </div>
              </div>

              {/* Section 3: Appointment Time Selection */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/90 shadow-xs">
                <h3 className="text-base font-bold text-blue-950 mb-4 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-900 flex items-center justify-center text-xs font-black">
                    3
                  </div>
                  <span>Thời gian bạn muốn thợ có mặt</span>
                </h3>

                {/* Two option cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                  {/* Urgent 30m option */}
                  <div
                    onClick={() => setScheduleType('urgent')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      scheduleType === 'urgent'
                        ? 'border-blue-900 bg-blue-50/70 shadow-sm'
                        : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-bold text-blue-950 flex items-center gap-1.5">
                        <Zap className="w-4 h-4 text-amber-500 fill-amber-500" />
                        Cần thợ gấp ngay
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900">
                        Ưu tiên hàng đầu
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">
                      Kỹ thuật viên gần nhất sẽ gọi lại và có mặt tại nhà bạn trong vòng <strong className="text-blue-900">20 - 30 phút</strong>.
                    </p>
                  </div>

                  {/* Scheduled option */}
                  <div
                    onClick={() => setScheduleType('scheduled')}
                    className={`p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                      scheduleType === 'scheduled'
                        ? 'border-blue-900 bg-blue-50/70 shadow-sm'
                        : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm font-bold text-blue-950 flex items-center gap-1.5">
                        <Calendar className="w-4 h-4 text-blue-700" />
                        Đặt lịch hẹn trước
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-900">
                        Chủ động giờ giấc
                      </span>
                    </div>
                    <p className="text-xs text-slate-600">
                      Chọn ngày và khung giờ bạn rảnh rỗi (sáng, trưa, chiều hoặc tối sau giờ làm).
                    </p>
                  </div>
                </div>

                {/* Date & Time slot fields if scheduled */}
                {scheduleType === 'scheduled' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-blue-50/50 border border-blue-100 animate-in fade-in">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Chọn ngày hẹn
                      </label>
                      <input
                        type="date"
                        value={appointmentDate}
                        onChange={(e) => setAppointmentDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-800"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Khung giờ hẹn
                      </label>
                      <select
                        value={appointmentSlot}
                        onChange={(e) => setAppointmentSlot(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-800"
                      >
                        <option value="08:00 - 10:00">Buổi sáng (08:00 - 10:00)</option>
                        <option value="10:00 - 12:00">Buổi trưa (10:00 - 12:00)</option>
                        <option value="13:00 - 15:00">Đầu giờ chiều (13:00 - 15:00)</option>
                        <option value="15:00 - 17:00">Cuối giờ chiều (15:00 - 17:00)</option>
                        <option value="17:00 - 19:00">Buổi tối (17:00 - 19:00)</option>
                        <option value="19:00 - 21:00">Tối muộn (19:00 - 21:00)</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Additional Note */}
                <div className="mt-4">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Ghi chú thêm cho thợ (không bắt buộc)
                  </label>
                  <input
                    type="text"
                    value={customerNote}
                    onChange={(e) => setCustomerNote(e.target.value)}
                    placeholder="VD: Căn hộ tầng 4 chung cư Mường Thanh, nhà có thang sẵn, bấm chuông cửa..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-slate-50/50 text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-800"
                  />
                </div>
              </div>

            </div>

            {/* Right 4 columns: Live Quote Summary & Submit CTA */}
            <div className="lg:col-span-4 sticky top-28 space-y-4 text-left">
              <div className="bg-white rounded-3xl p-6 border-2 border-blue-900/20 shadow-xl shadow-blue-900/10">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <h4 className="text-base font-bold text-blue-950">Tóm tắt đặt thợ</h4>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                    Bảo hành 3-6T
                  </span>
                </div>

                <div className="py-4 space-y-3 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Dịch vụ:</span>
                    <strong className="text-blue-950 text-right font-bold max-w-[170px] truncate">{currentService.title}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Loại máy:</span>
                    <span className="text-slate-800 font-medium">{acBrand} ({acQuantity} máy)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Khu vực:</span>
                    <span className="text-slate-800 font-semibold">{currentDistrictObj.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Thời gian hẹn:</span>
                    <span className="text-blue-900 font-bold">
                      {scheduleType === 'urgent' ? '⚡ Gấp sau 30 phút' : `${appointmentSlot}`}
                    </span>
                  </div>

                  <div className="pt-3 border-t border-slate-100 space-y-1.5">
                    <div className="flex justify-between text-slate-500">
                      <span>Đơn giá niêm yết:</span>
                      <span>{currentService.priceDisplay} x {acQuantity}</span>
                    </div>
                    {acQuantity >= 2 && (
                      <div className="flex justify-between text-emerald-600 font-semibold">
                        <span>Giảm giá (10% đa máy):</span>
                        <span>-{discountAmount.toLocaleString('vi-VN')}đ</span>
                      </div>
                    )}
                    <div className="flex justify-between text-slate-500">
                      <span>Phí kiểm tra tại nhà:</span>
                      <span className="text-emerald-700 font-bold">0đ (Miễn phí)</span>
                    </div>
                  </div>

                  {/* Estimated total */}
                  <div className="pt-4 border-t border-blue-100 flex items-baseline justify-between">
                    <span className="text-sm font-bold text-blue-950">Tạm tính ước lượng:</span>
                    <div className="text-right">
                      <div className="text-2xl font-black text-blue-950">
                        {estimatedTotal.toLocaleString('vi-VN')}đ
                      </div>
                      <span className="text-[10px] text-slate-400">Chính xác theo tình trạng thực tế</span>
                    </div>
                  </div>
                </div>

                {/* Big Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-4 py-4 px-6 rounded-2xl bg-blue-900 hover:bg-blue-800 active:bg-blue-950 text-white font-bold text-base shadow-xl shadow-blue-900/25 hover:shadow-2xl hover:shadow-blue-900/35 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Đang kết nối thợ...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 text-sky-300 transition-transform group-hover:translate-x-1" />
                      <span>Xác nhận đặt lịch ngay</span>
                    </>
                  )}
                </button>

                {/* Trust footer inside preview */}
                <div className="mt-4 pt-4 border-t border-slate-100 space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-slate-600">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Không phát sinh chi phí ngoài báo giá</span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Nghiệm thu hài lòng mới phải thanh toán</span>
                  </div>
                </div>

              </div>

              {/* Direct call box */}
              <div className="p-4 rounded-2xl bg-blue-50/80 border border-blue-100 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-blue-950">Cần tư vấn trực tiếp ngay?</div>
                  <div className="text-[11px] text-slate-500">Kỹ thuật viên trực 24/7</div>
                </div>
                <a
                  href="tel:0905888666"
                  className="px-3.5 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-sky-300" />
                  <span>0905.888.666</span>
                </a>
              </div>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
}
