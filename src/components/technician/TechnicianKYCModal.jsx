import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CheckCircle2, 
  Upload, 
  Camera, 
  FileText, 
  Award, 
  User, 
  MapPin, 
  Sparkles, 
  AlertCircle, 
  Clock, 
  Wrench, 
  Check, 
  ArrowRight, 
  ArrowLeft,
  Scan,
  RefreshCw,
  Building,
  Eye,
  Zap
} from 'lucide-react';
import { useAuth } from '../../context/useAuth';
import { useOrders } from '../../context/OrderContext';
import { DANANG_DISTRICTS } from '../../data/smartfixData';

export default function TechnicianKYCModal() {
  const { isKycModalOpen, closeKycModal, registerTechnicianKYC, user } = useAuth();

  const [currentStep, setCurrentStep] = useState(1); // 1: Info, 2: CCCD, 3: Certificate, 4: Face Match

  // Step 1: Info & Experience
  const [fullName, setFullName] = useState(user?.fullName || 'Nguyễn Khắc Quang Khánh');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '0905888999');
  const [password, setPassword] = useState('123456');
  const [district, setDistrict] = useState('hai-chau');
  const [address, setAddress] = useState('120 Nguyễn Văn Linh, Q. Hải Châu, Đà Nẵng');
  const [experienceYears, setExperienceYears] = useState('5 - 8 năm');
  const [previousWorkplace, setPreviousWorkplace] = useState('Trung tâm Kỹ thuật Cơ Điện Lạnh Daikin Đà Nẵng');

  // Specialties
  const ALL_SPECIALTIES = [
    'Máy lạnh treo tường Inverter dân dụng',
    'Máy lạnh âm trần Cassette 4 hướng thổi',
    'Máy lạnh áp trần & Giấu trần nối ống gió',
    'Máy lạnh tủ đứng công nghiệp nhà xưởng',
    'Hệ thống điều hòa trung tâm VRV / VRF',
    'Sửa chữa chuyên sâu bo mạch điện tử Inverter',
    'Bơm nạp Gas R32, R410A, R22 chuẩn áp suất',
    'Thi công hàn ống đồng & Tháo lắp di dời trên cao'
  ];
  const [selectedSpecialties, setSelectedSpecialties] = useState([
    'Máy lạnh treo tường Inverter dân dụng',
    'Máy lạnh âm trần Cassette 4 hướng thổi',
    'Sửa chữa chuyên sâu bo mạch điện tử Inverter',
    'Bơm nạp Gas R32, R410A, R22 chuẩn áp suất'
  ]);

  // AC Brands
  const ALL_BRANDS = ['Daikin', 'Panasonic', 'Mitsubishi Electric', 'Toshiba', 'LG', 'Samsung', 'Casper', 'Gree', 'Carrier', 'Funiki'];
  const [selectedBrands, setSelectedBrands] = useState(['Daikin', 'Panasonic', 'Mitsubishi Electric', 'Toshiba', 'LG']);

  // Step 2: CCCD 2 sides
  const [cccdNumber, setCccdNumber] = useState('048092008888');
  const [cccdFront, setCccdFront] = useState('');
  const [cccdBack, setCccdBack] = useState('');
  const [ocrStatus, setOcrStatus] = useState(false);

  // Step 3: Certificate
  const [certificateName, setCertificateName] = useState('Chứng chỉ Kỹ Thuật Cơ Điện Lạnh & Điều Hòa Không Khí');
  const [certificateIssuer, setCertificateIssuer] = useState('Trường Cao Đẳng Nghề Đà Nẵng');
  const [certificateYear, setCertificateYear] = useState('2020');
  const [certificatePhoto, setCertificatePhoto] = useState('');

  // Step 4: Face Match & Liveness
  const [selfiePhoto, setSelfiePhoto] = useState('');
  const [isScanningFace, setIsScanningFace] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [faceMatchSuccess, setFaceMatchSuccess] = useState(false);
  const [commitRules, setCommitRules] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isKycModalOpen) return null;

  // Toggle helpers
  const toggleSpecialty = (item) => {
    if (selectedSpecialties.includes(item)) {
      setSelectedSpecialties(selectedSpecialties.filter(s => s !== item));
    } else {
      setSelectedSpecialties([...selectedSpecialties, item]);
    }
  };

  const toggleBrand = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter(b => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  // Sample quick loaders for easy testing
  const handleLoadSampleCCCD = () => {
    setCccdNumber('048092008888');
    setCccdFront('https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&w=500&q=80');
    setCccdBack('https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&w=500&q=80');
    setOcrStatus(true);
  };

  const handleLoadSampleCertificate = () => {
    setCertificateName('Bằng Tốt Nghiệp Kỹ Thuật Nhiệt Lạnh & Máy Lạnh Không Khí');
    setCertificateIssuer('Trường Cao Đẳng Nghề Đà Nẵng');
    setCertificateYear('2020');
    setCertificatePhoto('https://images.unsplash.com/photo-1607453998774-d533f65dac99?auto=format&fit=crop&w=500&q=80');
  };

  const handleLoadSampleSelfie = () => {
    setSelfiePhoto('https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=400&q=80');
  };

  // Image upload handler
  const handleFileUpload = (e, setter) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setter(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // AI Face Match Check Simulation
  const handleStartFaceMatch = () => {
    if (!selfiePhoto) {
      handleLoadSampleSelfie();
    }
    setIsScanningFace(true);
    setScanProgress(10);
    setFaceMatchSuccess(false);

    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScanningFace(false);
          setFaceMatchSuccess(true);
          return 100;
        }
        return prev + 18;
      });
    }, 280);
  };

  // Final Submit
  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    if (!faceMatchSuccess) {
      alert('Vui lòng hoàn thành bước quét xác thực khuôn mặt AI Face Match trước!');
      return;
    }

    setIsSubmitting(true);
    const res = await registerTechnicianKYC({
      fullName,
      phoneNumber,
      password,
      district,
      address,
      experienceYears,
      previousWorkplace,
      specialties: selectedSpecialties,
      acBrands: selectedBrands,
      cccdNumber,
      cccdFront: cccdFront || 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&w=500&q=80',
      cccdBack: cccdBack || 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?auto=format&fit=crop&w=500&q=80',
      certificateName,
      certificateIssuer,
      certificateYear,
      certificatePhoto: certificatePhoto || 'https://images.unsplash.com/photo-1607453998774-d533f65dac99?auto=format&fit=crop&w=500&q=80',
      selfiePhoto: selfiePhoto || 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=400&q=80'
    });
    if (res?.success && switchRole) {
      switchRole('technician');
    }
    setIsSubmitting(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-2 border-amber-400 overflow-hidden flex flex-col max-h-[94vh] text-left">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-amber-950 text-white p-5 shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-amber-400/20 border border-amber-400/50 flex items-center justify-center text-amber-300 font-bold shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-black tracking-wider px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                  XÁC THỰC eKYC 100%
                </span>
                <span className="text-xs text-sky-300 font-semibold">Đối tác Kỹ thuật viên</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-white mt-0.5">
                Đăng Ký Trở Thành Thợ CoolCall Đà Nẵng
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={closeKycModal}
            className="p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Tracker */}
        <div className="bg-slate-50 px-4 sm:px-6 py-3 border-b border-slate-200 shrink-0">
          <div className="grid grid-cols-4 gap-2 text-center">
            {[
              { step: 1, label: '1. Hồ sơ nghề' },
              { step: 2, label: '2. CCCD 2 mặt' },
              { step: 3, label: '3. Chứng chỉ nghề' },
              { step: 4, label: '4. eKYC Khuôn mặt' }
            ].map(item => (
              <button
                key={item.step}
                type="button"
                onClick={() => setCurrentStep(item.step)}
                className={`py-1.5 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  currentStep === item.step
                    ? 'bg-blue-900 text-white shadow-xs'
                    : currentStep > item.step
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-slate-200/80 text-slate-500'
                }`}
              >
                {currentStep > item.step ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : null}
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 p-5 sm:p-6 overflow-y-auto space-y-5">
          
          {/* ================= STEP 1: INFO & EXPERIENCE ================= */}
          {currentStep === 1 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-950 flex items-center justify-between">
                <span className="font-semibold">
                  📌 Bước 1: Khai báo thông tin nghề nghiệp, thâm niên và chuyên môn sửa chữa
                </span>
                <span className="text-[11px] text-blue-700 font-bold">1/4</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Họ và tên thợ <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="VD: Nguyễn Văn Hùng"
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Số điện thoại nhận cuốc <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="VD: 0905 888 999"
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Tạo mật khẩu đăng nhập thợ <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Ít nhất 6 ký tự (VD: 123456)"
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Trạm khu vực nhận việc chính <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-800 cursor-pointer"
                  >
                    {DANANG_DISTRICTS.map(d => (
                      <option key={d.id} value={d.id}>{d.name} ({d.hubs.join(', ')})</option>
                    ))}
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Địa chỉ hiện tại ở Đà Nẵng <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="VD: 120 Nguyễn Văn Linh, P. Nam Dương, Q. Hải Châu"
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Thâm niên kinh nghiệm trong nghề <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-800 cursor-pointer"
                  >
                    <option value="1 - 2 năm (Thợ phụ)">1 - 2 năm (Thợ phụ)</option>
                    <option value="3 - 5 năm (Thợ lành nghề)">3 - 5 năm (Thợ lành nghề)</option>
                    <option value="5 - 8 năm (Thợ chuyên gia)">5 - 8 năm (Thợ chuyên gia)</option>
                    <option value="Trên 8 năm (Bậc thầy nhiệt lạnh)">Trên 8 năm (Bậc thầy nhiệt lạnh)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Đơn vị từng công tác trước đây
                  </label>
                  <input
                    type="text"
                    value={previousWorkplace}
                    onChange={(e) => setPreviousWorkplace(e.target.value)}
                    placeholder="VD: Trung tâm Daikin Đà Nẵng, Điện Máy Chợ Lớn..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-800"
                  />
                </div>
              </div>

              {/* Specialties checklist */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Các hạng mục thiết bị điều hòa bạn có thể sửa chữa: <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {ALL_SPECIALTIES.map(item => {
                    const checked = selectedSpecialties.includes(item);
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => toggleSpecialty(item)}
                        className={`p-2 rounded-xl text-left border flex items-center justify-between cursor-pointer transition-all ${
                          checked 
                            ? 'bg-blue-50 border-blue-400 text-blue-950 font-bold' 
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <span>{item}</span>
                        {checked && <Check className="w-4 h-4 text-blue-700 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Brands checklist */}
              <div className="pt-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                  Các thương hiệu điều hòa bạn thông thạo linh kiện:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {ALL_BRANDS.map(brand => {
                    const checked = selectedBrands.includes(brand);
                    return (
                      <button
                        key={brand}
                        type="button"
                        onClick={() => toggleBrand(brand)}
                        className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                          checked
                            ? 'bg-amber-400 text-amber-950 border-amber-500 font-bold'
                            : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                        }`}
                      >
                        {brand} {checked ? '✓' : ''}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Next button */}
              <div className="pt-4 flex justify-end">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-5 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <span>Tiếp tục: Chụp CCCD 2 mặt</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 2: CCCD 2 SIDES ================= */}
          {currentStep === 2 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-950 flex items-center justify-between">
                <span className="font-semibold">
                  🪪 Bước 2: Tải ảnh chụp Căn cước công dân (CCCD) mặt trước & mặt sau
                </span>
                <button
                  type="button"
                  onClick={handleLoadSampleCCCD}
                  className="px-2.5 py-1 rounded-lg bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-[11px] cursor-pointer transition-colors shadow-xs"
                >
                  ⚡ Điền nhanh ảnh CCCD mẫu
                </button>
              </div>

              {/* CCCD Number Input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Số Căn cước công dân (12 chữ số) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  maxLength={12}
                  value={cccdNumber}
                  onChange={(e) => setCccdNumber(e.target.value)}
                  placeholder="VD: 048092008888"
                  className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 font-mono text-sm font-bold text-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-800"
                />
              </div>

              {/* 2 Upload Boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Front CCCD */}
                <div className="p-4 rounded-2xl border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50 text-center space-y-2 relative overflow-hidden">
                  <span className="text-xs font-bold text-slate-800 block">Mặt trước CCCD</span>
                  
                  {cccdFront ? (
                    <div className="relative group">
                      <img src={cccdFront} alt="CCCD Mặt trước" className="w-full h-36 object-cover rounded-xl border" />
                      <button
                        type="button"
                        onClick={() => setCccdFront('')}
                        className="absolute top-2 right-2 p-1 rounded-full bg-slate-900/80 text-white hover:bg-rose-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer block py-6 space-y-1">
                      <Camera className="w-8 h-8 text-slate-400 mx-auto" />
                      <span className="text-xs text-blue-800 font-bold block">Tải ảnh hoặc chụp mặt trước</span>
                      <span className="text-[10px] text-slate-400 block">Rõ số thẻ, họ tên, quốc huy</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => handleFileUpload(e, setCccdFront)} 
                        className="hidden" 
                      />
                    </label>
                  )}
                </div>

                {/* Back CCCD */}
                <div className="p-4 rounded-2xl border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50 text-center space-y-2 relative overflow-hidden">
                  <span className="text-xs font-bold text-slate-800 block">Mặt sau CCCD (Chip & Vân tay)</span>
                  
                  {cccdBack ? (
                    <div className="relative group">
                      <img src={cccdBack} alt="CCCD Mặt sau" className="w-full h-36 object-cover rounded-xl border" />
                      <button
                        type="button"
                        onClick={() => setCccdBack('')}
                        className="absolute top-2 right-2 p-1 rounded-full bg-slate-900/80 text-white hover:bg-rose-600"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ) : (
                    <label className="cursor-pointer block py-6 space-y-1">
                      <Camera className="w-8 h-8 text-slate-400 mx-auto" />
                      <span className="text-xs text-blue-800 font-bold block">Tải ảnh hoặc chụp mặt sau</span>
                      <span className="text-[10px] text-slate-400 block">Rõ chip điện tử & ngày cấp</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => handleFileUpload(e, setCccdBack)} 
                        className="hidden" 
                      />
                    </label>
                  )}
                </div>

              </div>

              {/* OCR Status banner */}
              {(cccdFront || cccdBack) && (
                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>
                    ✓ AI OCR đã kiểm tra: Hình ảnh đủ ánh sáng, rõ nét 4 góc, khớp số định danh công dân Đà Nẵng.
                  </span>
                </div>
              )}

              {/* Navigation buttons */}
              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="px-4 py-2 rounded-xl border text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  Quay lại
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-5 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <span>Tiếp tục: Bằng cấp & Chứng chỉ</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 3: CERTIFICATES ================= */}
          {currentStep === 3 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-3.5 rounded-2xl bg-blue-50 border border-blue-200 text-xs text-blue-950 flex items-center justify-between">
                <span className="font-semibold">
                  📜 Bước 3: Tải ảnh Chứng chỉ hành nghề / Bằng cấp điện lạnh
                </span>
                <button
                  type="button"
                  onClick={handleLoadSampleCertificate}
                  className="px-2.5 py-1 rounded-lg bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-[11px] cursor-pointer shadow-xs"
                >
                  ⚡ Điền nhanh bằng nghề mẫu
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Tên chứng chỉ / Bằng tốt nghiệp nghề <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={certificateName}
                    onChange={(e) => setCertificateName(e.target.value)}
                    placeholder="VD: Chứng chỉ Kỹ Thuật Cơ Điện Lạnh & Điều Hòa Không Khí"
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Trường / Đơn vị đào tạo cấp bằng <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={certificateIssuer}
                    onChange={(e) => setCertificateIssuer(e.target.value)}
                    placeholder="VD: Cao Đẳng Nghề Đà Nẵng, Học viện Daikin..."
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-800"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Năm tốt nghiệp / cấp bằng <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={certificateYear}
                    onChange={(e) => setCertificateYear(e.target.value)}
                    placeholder="VD: 2020"
                    className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-800"
                  />
                </div>
              </div>

              {/* Upload Certificate Photo */}
              <div className="p-4 rounded-2xl border-2 border-dashed border-slate-300 hover:border-blue-500 bg-slate-50 text-center space-y-2">
                <span className="text-xs font-bold text-slate-800 block">Ảnh chụp bằng tốt nghiệp / chứng chỉ</span>
                
                {certificatePhoto ? (
                  <div className="relative group max-w-sm mx-auto">
                    <img src={certificatePhoto} alt="Chứng chỉ nghề" className="w-full h-40 object-cover rounded-xl border" />
                    <button
                      type="button"
                      onClick={() => setCertificatePhoto('')}
                      className="absolute top-2 right-2 p-1 rounded-full bg-slate-900/80 text-white hover:bg-rose-600"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer block py-6 space-y-1">
                    <Award className="w-8 h-8 text-amber-500 mx-auto" />
                    <span className="text-xs text-blue-800 font-bold block">Tải ảnh chụp bằng cấp / chứng chỉ</span>
                    <span className="text-[10px] text-slate-400 block">Rõ con dấu đỏ và số hiệu bằng</span>
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => handleFileUpload(e, setCertificatePhoto)} 
                      className="hidden" 
                    />
                  </label>
                )}
              </div>

              {/* Navigation buttons */}
              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="px-4 py-2 rounded-xl border text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  Quay lại
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(4)}
                  className="px-5 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-md cursor-pointer"
                >
                  <span>Tiếp tục: eKYC Quét khuôn mặt</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* ================= STEP 4: AI FACE MATCH & KYC ================= */}
          {currentStep === 4 && (
            <div className="space-y-4 animate-in fade-in">
              <div className="p-3.5 rounded-2xl bg-gradient-to-r from-blue-950 to-slate-900 text-white text-xs flex items-center justify-between">
                <div>
                  <span className="font-bold text-amber-300 block">
                    🤖 Bước 4: Xác thực Người Thật Thợ Thật (AI Face Match & Liveness)
                  </span>
                  <span className="text-[11px] text-slate-300">
                    Đối chiếu khuôn mặt trực tiếp với ảnh trên CCCD để đảm bảo người thật 100%
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleLoadSampleSelfie}
                  className="px-2.5 py-1 rounded-lg bg-amber-400 hover:bg-amber-500 text-amber-950 font-bold text-[11px] cursor-pointer shadow-xs shrink-0"
                >
                  ⚡ Dùng ảnh chân dung mẫu
                </button>
              </div>

              {/* Face Match Comparison Section */}
              <div className="grid grid-cols-2 gap-4">
                
                {/* Photo 1: CCCD Front Photo */}
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center">
                  <span className="text-[11px] font-bold text-slate-500 block mb-1">Ảnh trên CCCD</span>
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden mx-auto border-2 border-blue-900">
                    <img 
                      src={cccdFront || 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=150&q=80'} 
                      alt="Ảnh CCCD" 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  <span className="text-[10px] text-emerald-700 font-bold mt-1 block">✓ Đã trích xuất chân dung</span>
                </div>

                {/* Photo 2: Live Selfie Portrait */}
                <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200 text-center relative">
                  <span className="text-[11px] font-bold text-slate-500 block mb-1">Ảnh Chân Dung Selfie</span>
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden mx-auto border-2 border-amber-500 relative">
                    <img 
                      src={selfiePhoto || 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?auto=format&fit=crop&w=150&q=80'} 
                      alt="Ảnh Selfie" 
                      className="w-full h-full object-cover" 
                    />
                    {isScanningFace && (
                      <div className="absolute inset-0 bg-sky-500/30 flex items-center justify-center animate-pulse">
                        <Scan className="w-10 h-10 text-white animate-spin" />
                      </div>
                    )}
                  </div>

                  <label className="mt-1.5 block cursor-pointer text-[10px] text-blue-800 font-bold hover:underline">
                    <span>Đổi ảnh selfie khác</span>
                    <input type="file" accept="image/*" onChange={(e) => handleFileUpload(e, setSelfiePhoto)} className="hidden" />
                  </label>
                </div>

              </div>

              {/* AI Scan Trigger Button */}
              {!faceMatchSuccess ? (
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 text-center space-y-3">
                  <button
                    type="button"
                    onClick={handleStartFaceMatch}
                    disabled={isScanningFace}
                    className="px-6 py-3 rounded-2xl bg-blue-900 hover:bg-blue-800 text-white font-extrabold text-sm shadow-lg shadow-blue-900/30 flex items-center justify-center gap-2 mx-auto cursor-pointer transition-transform hover:scale-105"
                  >
                    <Scan className="w-5 h-5 text-sky-300" />
                    <span>
                      {isScanningFace ? `Đang phân tích eKYC (${scanProgress}%)...` : 'Bắt đầu quét AI Face Match xác thực người thật'}
                    </span>
                  </button>

                  {isScanningFace && (
                    <div className="space-y-1.5 max-w-sm mx-auto">
                      <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                        <div 
                          className="bg-emerald-500 h-full transition-all duration-300"
                          style={{ width: `${scanProgress}%` }}
                        />
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium">
                        Đang phân tích 68 điểm mốc sinh trắc học và kiểm tra Liveness...
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                /* Face Match Verification Result */
                <div className="p-4 rounded-2xl bg-emerald-50 border-2 border-emerald-400 space-y-2 animate-in zoom-in-95">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-emerald-900 uppercase flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Kết quả sinh trắc học eKYC
                    </span>
                    <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-emerald-600 text-white">
                      ĐỘ TRÙNG KHỚP: 98.6%
                    </span>
                  </div>

                  <p className="text-xs text-slate-700">
                    ✓ <strong>Xác nhận người thật & thợ thật:</strong> Khuôn mặt trong ảnh selfie hoàn toàn trùng khớp với chân dung trên thẻ CCCD.
                  </p>
                  <p className="text-[11px] text-slate-500">
                    ✓ Bằng cấp & chứng chỉ nghề nhiệt lạnh hợp lệ, sẵn sàng tiếp nhận các đơn sửa chữa tại địa bàn Đà Nẵng.
                  </p>
                </div>
              )}

              {/* Commit Rules Checkbox */}
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-2.5 text-xs">
                <input
                  type="checkbox"
                  id="rules"
                  checked={commitRules}
                  onChange={(e) => setCommitRules(e.target.checked)}
                  className="mt-0.5 w-4 h-4 text-blue-900 rounded cursor-pointer"
                />
                <label htmlFor="rules" className="text-slate-700 cursor-pointer font-medium leading-relaxed">
                  Tôi cam kết thông tin CCCD và bằng cấp trên là chính xác 100%. Tôi cam kết tuân thủ quy chế đối tác thợ CoolCall: Báo đúng giá niêm yết, không vẽ bệnh, không tráo linh kiện và bảo hành uy tín cho khách hàng.
                </label>
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="px-4 py-2 rounded-xl border text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  Quay lại
                </button>

                <button
                  type="button"
                  onClick={handleFinalSubmit}
                  disabled={!faceMatchSuccess || !commitRules || isSubmitting}
                  className="px-6 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white font-extrabold text-xs sm:text-sm shadow-xl shadow-emerald-950/20 flex items-center gap-2 cursor-pointer transition-all transform hover:scale-105"
                >
                  {isSubmitting ? (
                    <span>Đang kích hoạt tài khoản...</span>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 text-amber-300" />
                      <span>Hoàn tất eKYC & Kích hoạt Thẻ Thợ CoolCall</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
}
