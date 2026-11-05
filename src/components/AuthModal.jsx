import React, { useState } from 'react';
import { 
  X, 
  User, 
  Phone, 
  Lock, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  AlertCircle, 
  CheckCircle2, 
  ArrowRight,
  Mail,
  RotateCcw,
  Sparkles,
  ExternalLink,
  Inbox,
  LogIn,
  Smartphone,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../context/useAuth';

export default function AuthModal() {
  const { 
    isAuthModalOpen, 
    authModalMessage, 
    authMode,
    initialAuthTab, 
    simulatedSmsToast,
    closeSimulatedSmsToast,
    closeAuthModal, 
    sendPhoneOtp,
    resendPhoneOtp,
    verifyPhoneOtp,
    sendGoogleOtp,
    verifyGoogleOtp,
    resendGoogleOtp,
    login
  } = useAuth();

  // Active Tab:
  // If register: 'phone-register' | 'google'
  // If login: 'login' | 'google'
  const defaultTab = authMode === 'login' ? 'login' : 'phone-register';
  const [activeTab, setActiveTab] = useState(initialAuthTab || defaultTab);
  const [prevTab, setPrevTab] = useState(initialAuthTab);
  if (initialAuthTab !== prevTab) {
    setPrevTab(initialAuthTab);
    setActiveTab(initialAuthTab || defaultTab);
  }

  // Phone Register Form State
  const [regFullName, setRegFullName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [phoneOtpStep, setPhoneOtpStep] = useState('input'); // 'input' | 'otp'
  const [phoneOtpInput, setPhoneOtpInput] = useState('');
  const [phonePassword, setPhonePassword] = useState('');
  const [showPhonePassword, setShowPhonePassword] = useState(false);
  const [phoneResendCooldown, setPhoneResendCooldown] = useState(0);

  // Google Flow State
  const [googleName, setGoogleName] = useState('');
  const [googleEmail, setGoogleEmail] = useState('');
  const [googleStep, setGoogleStep] = useState('input'); // 'input' | 'otp'
  const [googleOtpInput, setGoogleOtpInput] = useState('');
  const [googleResendCooldown, setGoogleResendCooldown] = useState(0);

  // Login Form State
  const [loginPhone, setLoginPhone] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // UI status
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthModalOpen) return null;

  const isRegisterMode = authMode === 'register';

  // 1. Phone OTP Send
  const handleSendPhoneOtp = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!regFullName.trim() || regFullName.trim().length < 2) {
      setErrorMsg('Vui lòng nhập họ và tên của bạn (ít nhất 2 ký tự)');
      return;
    }

    const cleanPhone = regPhone.replace(/[\s.-]/g, '');
    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (!phoneRegex.test(cleanPhone)) {
      setErrorMsg('Số điện thoại không hợp lệ (VD: 0905 123 456)');
      return;
    }

    setIsSubmitting(true);
    const result = await sendPhoneOtp(cleanPhone, regFullName.trim());
    setIsSubmitting(false);

    if (result.success) {
      setPhoneOtpStep('otp');
      setSuccessMsg(`Đã tạo mã xác thực gửi về SĐT: ${cleanPhone}`);
      setPhoneResendCooldown(60);
      const timer = setInterval(() => {
        setPhoneResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setErrorMsg(result.message || 'Không thể gửi mã xác thực. Vui lòng thử lại!');
    }
  };

  // 2. Phone OTP Verify & Register
  const handleVerifyPhoneOtp = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!phoneOtpInput.trim() || phoneOtpInput.trim().length !== 6) {
      setErrorMsg('Vui lòng nhập đúng 6 chữ số mã xác thực OTP gửi về số điện thoại');
      return;
    }

    if (!phonePassword || phonePassword.length < 6) {
      setErrorMsg('Vui lòng tạo mật khẩu ít nhất 6 ký tự để tiện đăng nhập lại sau này');
      return;
    }

    setIsSubmitting(true);
    const result = await verifyPhoneOtp(phoneOtpInput.trim(), phonePassword);
    setIsSubmitting(false);

    if (!result.success) {
      setErrorMsg(result.message);
    }
  };

  const handleResendPhoneOtp = async () => {
    if (phoneResendCooldown > 0) return;
    setErrorMsg('');
    setIsSubmitting(true);
    const result = await resendPhoneOtp();
    setIsSubmitting(false);
    if (result.success) {
      setSuccessMsg('Đã gửi lại mã xác thực mới về số điện thoại!');
      setPhoneResendCooldown(60);
    } else {
      setErrorMsg(result.message || 'Lỗi gửi lại mã');
    }
  };

  // 3. Google Send OTP Flow
  const handleGoogleSendOtp = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!googleEmail.trim()) {
      setErrorMsg('Vui lòng nhập địa chỉ Gmail cá nhân của bạn');
      return;
    }

    if (!googleEmail.includes('@') || !googleEmail.includes('.')) {
      setErrorMsg('Địa chỉ email không hợp lệ (VD: nguyenvana@gmail.com)');
      return;
    }

    setIsSubmitting(true);
    const result = await sendGoogleOtp(googleEmail.trim(), googleName.trim());
    setIsSubmitting(false);

    if (result.success) {
      setGoogleStep('otp');
      setSuccessMsg(`Đã gửi mã xác thực về Gmail: ${result.email}`);
      setGoogleResendCooldown(60);
      const timer = setInterval(() => {
        setGoogleResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setErrorMsg(result.message || 'Không thể gửi mã xác thực. Vui lòng thử lại.');
    }
  };

  // 4. Google Verify OTP
  const handleGoogleVerifyOtp = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!googleOtpInput.trim() || googleOtpInput.trim().length !== 6) {
      setErrorMsg('Vui lòng nhập đầy đủ 6 chữ số mã xác thực OTP từ Gmail');
      return;
    }

    setIsSubmitting(true);
    const result = await verifyGoogleOtp(googleOtpInput.trim());
    setIsSubmitting(false);

    if (!result.success) {
      setErrorMsg(result.message);
    }
  };

  const handleResendGoogleOtp = async () => {
    if (googleResendCooldown > 0) return;
    setErrorMsg('');
    setIsSubmitting(true);
    const result = await resendGoogleOtp();
    setIsSubmitting(false);
    if (result.success) {
      setSuccessMsg('Đã gửi lại mã xác thực mới vào hộp thư Gmail của bạn!');
      setGoogleResendCooldown(60);
    } else {
      setErrorMsg(result.message || 'Lỗi gửi lại mã');
    }
  };

  // 5. Normal Phone Login
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!loginPhone.trim()) {
      setErrorMsg('Vui lòng nhập số điện thoại');
      return;
    }

    if (!loginPassword) {
      setErrorMsg('Vui lòng nhập mật khẩu');
      return;
    }

    setIsSubmitting(true);
    const result = await login(loginPhone.trim(), loginPassword);
    setIsSubmitting(false);

    if (!result.success) {
      setErrorMsg(result.message);
    }
  };

  return (
    <>
      {/* SIMULATED PHONE SMS NOTIFICATION BANNER (Realtime Push) */}
      {simulatedSmsToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] w-[94%] max-w-md bg-slate-950/95 backdrop-blur-md text-white rounded-2xl shadow-2xl border border-slate-700/80 p-4 animate-in slide-in-from-top-4 duration-300">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  Tin nhắn SMS Tổng Đài
                </span>
                <span className="text-[10px] text-slate-400">{simulatedSmsToast.time}</span>
              </div>
              <p className="text-xs font-bold text-white mt-0.5">Tổng đài SmartFix Đà Nẵng</p>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Gửi đến: <strong className="text-white font-mono">{simulatedSmsToast.phoneNumber}</strong><br />
                Mã xác thực OTP đăng ký của bạn là: <strong className="text-amber-300 font-mono text-base tracking-widest">{simulatedSmsToast.otp}</strong> (Hiệu lực 5 phút).
              </p>
              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setPhoneOtpInput(simulatedSmsToast.otp);
                    closeSimulatedSmsToast();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 cursor-pointer shadow-sm transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Điền nhanh mã ({simulatedSmsToast.otp})</span>
                </button>
                <button
                  type="button"
                  onClick={closeSimulatedSmsToast}
                  className="px-2.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs cursor-pointer"
                >
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL OVERLAY */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
        <div 
          className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-blue-100 overflow-hidden transform animate-in zoom-in-95 duration-200 text-left max-h-[92vh] flex flex-col"
        >
          {/* Modal Header */}
          <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 text-white p-5 sm:p-6 relative shrink-0">
            <button
              onClick={closeAuthModal}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Đóng cửa sổ"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-sky-300">
                SmartFix • Phân Quyền Người Dùng
              </span>
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white">
              {isRegisterMode ? 'Đăng Ký Tài Khoản Mới' : 'Đăng Nhập Tài Khoản'}
            </h3>

            <p className="text-xs text-blue-200 mt-1 leading-relaxed">
              {authModalMessage || (isRegisterMode 
                ? 'Quý khách vui lòng hoàn tất đăng ký để kích hoạt quyền đặt thợ và gọi thợ.' 
                : 'Đăng nhập vào tài khoản của bạn để đặt thợ hoặc gọi thợ.')}
            </p>
          </div>

          {/* Modal Body */}
          <div className="p-5 sm:p-6 space-y-4 overflow-y-auto">
            
            {/* TAB SELECTOR: CHỈ HIỂN THỊ PHƯƠNG THỨC TƯƠNG ỨNG (KHÔNG LẪN LỘN ĐĂNG NHẬP / ĐĂNG KÝ) */}
            {isRegisterMode ? (
              // BÊN ĐĂNG KÝ: CHỈ CÓ CÁC PHƯƠNG THỨC XÁC THỰC ĐĂNG KÝ (BỎ HOÀN TOÀN TAB ĐĂNG NHẬP)
              <div className="grid grid-cols-2 gap-1.5 rounded-2xl bg-slate-100 p-1.5 select-none">
                <button
                  type="button"
                  onClick={() => { setActiveTab('phone-register'); setErrorMsg(''); setSuccessMsg(''); }}
                  className={`py-2 px-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeTab === 'phone-register'
                      ? 'bg-blue-900 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5 shrink-0" />
                  <span>Xác thực OTP qua SĐT</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setActiveTab('google'); setErrorMsg(''); setSuccessMsg(''); }}
                  className={`py-2 px-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeTab === 'google'
                      ? 'bg-white text-blue-950 shadow-sm border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Google Gmail OTP</span>
                </button>
              </div>
            ) : (
              // BÊN ĐĂNG NHẬP: GIỮ NGUYÊN ĐẦY ĐỦ LUỒNG ĐĂNG NHẬP
              <div className="grid grid-cols-2 gap-1.5 rounded-2xl bg-slate-100 p-1.5 select-none">
                <button
                  type="button"
                  onClick={() => { setActiveTab('login'); setErrorMsg(''); setSuccessMsg(''); }}
                  className={`py-2 px-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeTab === 'login'
                      ? 'bg-blue-900 text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <LogIn className="w-3.5 h-3.5 shrink-0" />
                  <span>Đăng nhập SĐT</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setActiveTab('google'); setErrorMsg(''); setSuccessMsg(''); }}
                  className={`py-2 px-2 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                    activeTab === 'google'
                      ? 'bg-white text-blue-950 shadow-sm border border-slate-200'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/50'
                  }`}
                >
                  <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                  </svg>
                  <span>Gmail OTP</span>
                </button>
              </div>
            )}

            {/* Error Message Box */}
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                <AlertCircle className="w-4 h-4 shrink-0 text-rose-500" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Success Notification Box */}
            {successMsg && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                <span>{successMsg}</span>
              </div>
            )}

            {/* ========================================================================= */}
            {/* LUỒNG 1: ĐĂNG KÝ BẰNG MÃ XÁC THỰC OTP GỬI VỀ SỐ ĐIỆN THOẠI               */}
            {/* ========================================================================= */}
            {isRegisterMode && activeTab === 'phone-register' && (
              <div className="space-y-4">
                {phoneOtpStep === 'input' ? (
                  // BƯỚC 1: NHẬP HỌ TÊN VÀ SỐ ĐIỆN THOẠI ĐỂ GỬI MÃ OTP
                  <form onSubmit={handleSendPhoneOtp} className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Họ và tên của bạn <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          value={regFullName}
                          onChange={(e) => setRegFullName(e.target.value)}
                          placeholder="VD: Nguyễn Văn An"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Số điện thoại nhận mã OTP <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <Phone className="w-4 h-4" />
                        </div>
                        <input
                          type="tel"
                          value={regPhone}
                          onChange={(e) => setRegPhone(e.target.value)}
                          placeholder="VD: 0905 123 456"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:bg-white"
                        />
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                        <Smartphone className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                        <span>Hệ thống sẽ gửi mã OTP gồm 6 chữ số ngẫu nhiên về số điện thoại này.</span>
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-4 rounded-xl bg-blue-900 hover:bg-blue-800 active:bg-blue-950 text-white font-bold text-sm shadow-md shadow-blue-900/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-2"
                    >
                      {isSubmitting ? (
                        <span>Đang gửi mã xác thực về SĐT...</span>
                      ) : (
                        <>
                          <Smartphone className="w-4 h-4 text-sky-300" />
                          <span>Gửi mã xác thực OTP về SĐT</span>
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  // BƯỚC 2: NHẬP MÃ OTP 6 CHỮ SỐ VÀ TẠO MẬT KHẨU
                  <form onSubmit={handleVerifyPhoneOtp} className="space-y-4 animate-in fade-in">
                    <div className="p-3 bg-blue-50/80 border border-blue-200 rounded-xl flex items-center justify-between">
                      <div className="text-left text-xs">
                        <span className="text-slate-500 block">Đã gửi mã xác thực đến:</span>
                        <strong className="text-sm text-blue-950 font-mono">{regPhone}</strong>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setPhoneOtpStep('input');
                          setPhoneOtpInput('');
                          setErrorMsg('');
                        }}
                        className="text-xs text-blue-700 hover:text-blue-900 font-semibold hover:underline cursor-pointer"
                      >
                        Đổi SĐT khác
                      </button>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Nhập mã xác thực 6 số gửi về SĐT <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        value={phoneOtpInput}
                        onChange={(e) => setPhoneOtpInput(e.target.value.replace(/\D/g, ''))}
                        placeholder="• • • • • •"
                        className="w-full py-3 px-4 rounded-xl border border-blue-300 bg-white text-center font-mono text-2xl font-black text-blue-950 tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800 shadow-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Tạo mật khẩu cho tài khoản <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <Lock className="w-4 h-4" />
                        </div>
                        <input
                          type={showPhonePassword ? 'text' : 'password'}
                          value={phonePassword}
                          onChange={(e) => setPhonePassword(e.target.value)}
                          placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
                          className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:bg-white"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPhonePassword(!showPhonePassword)}
                          className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          {showPhonePassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1 block">Dùng mật khẩu này để đăng nhập lại bằng SĐT vào các lần sau.</span>
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-slate-500">Chưa nhận được tin nhắn?</span>
                      <button
                        type="button"
                        disabled={phoneResendCooldown > 0}
                        onClick={handleResendPhoneOtp}
                        className="flex items-center gap-1 font-semibold text-blue-900 hover:text-blue-700 disabled:opacity-50 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        {phoneResendCooldown > 0 ? (
                          <span>Gửi lại sau {phoneResendCooldown}s</span>
                        ) : (
                          <span>Gửi lại mã OTP</span>
                        )}
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-4 rounded-xl bg-blue-900 hover:bg-blue-800 active:bg-blue-950 text-white font-bold text-sm shadow-md shadow-blue-900/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <span>Đang xác nhận mã OTP...</span>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Xác nhận mã & Hoàn tất đăng ký</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* ========================================================================= */}
            {/* LUỒNG 2: XÁC THỰC QUA GMAIL OTP (EMAILJS THỰC TẾ)                         */}
            {/* ========================================================================= */}
            {activeTab === 'google' && (
              <div className="space-y-4">
                {googleStep === 'input' ? (
                  <form onSubmit={handleGoogleSendOtp} className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Họ và tên của bạn <span className="text-slate-400 font-normal">(Tùy chọn)</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          type="text"
                          value={googleName}
                          onChange={(e) => setGoogleName(e.target.value)}
                          placeholder="VD: Nguyễn Văn An"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                        Địa chỉ Gmail nhận mã xác thực <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          type="email"
                          value={googleEmail}
                          onChange={(e) => setGoogleEmail(e.target.value)}
                          placeholder="VD: nguyenvana@gmail.com"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:bg-white"
                        />
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                        <span>Mã xác thực gồm 6 chữ số sẽ được gửi thẳng về hòm thư Gmail của bạn.</span>
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-4 rounded-xl bg-blue-900 hover:bg-blue-800 active:bg-blue-950 text-white font-bold text-sm shadow-md shadow-blue-900/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-2"
                    >
                      {isSubmitting ? (
                        <span>Đang gửi mã về Gmail...</span>
                      ) : (
                        <>
                          <Mail className="w-4 h-4 text-sky-300" />
                          <span>Gửi mã xác thực về hòm thư Gmail</span>
                        </>
                      )}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleGoogleVerifyOtp} className="space-y-4 animate-in fade-in">
                    <div className="p-3 bg-blue-50/80 border border-blue-200 rounded-xl flex items-center justify-between">
                      <div className="text-left text-xs">
                        <span className="text-slate-500 block">Đã gửi mã đến Gmail:</span>
                        <strong className="text-sm text-blue-950 font-mono">{googleEmail}</strong>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setGoogleStep('input');
                          setGoogleOtpInput('');
                          setErrorMsg('');
                        }}
                        className="text-xs text-blue-700 hover:text-blue-900 font-semibold hover:underline cursor-pointer"
                      >
                        Đổi Gmail khác
                      </button>
                    </div>

                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1.5 text-slate-700">
                      <div className="flex items-center gap-1.5 font-bold text-blue-950">
                        <Inbox className="w-4 h-4 text-blue-700" />
                        <span>Hướng dẫn lấy mã xác thực:</span>
                      </div>
                      <ol className="list-decimal list-inside space-y-0.5 text-[11px] text-slate-600 pl-1">
                        <li>Mở ứng dụng <strong>Gmail</strong> trên điện thoại hoặc máy tính của bạn.</li>
                        <li>Kiểm tra mục Hộp thư đến (Inbox) hoặc thư mục <strong>Spam / Thư rác</strong>.</li>
                        <li>Tìm thư từ <strong>SmartFix Đà Nẵng</strong> để lấy mã xác thực gồm 6 chữ số.</li>
                      </ol>
                      <div className="pt-1.5">
                        <a
                          href="https://mail.google.com"
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-800 hover:text-blue-950 hover:underline"
                        >
                          <span>Mở hộp thư Gmail (mail.google.com)</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                        Nhập mã xác thực 6 số từ Gmail <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        maxLength={6}
                        value={googleOtpInput}
                        onChange={(e) => setGoogleOtpInput(e.target.value.replace(/\D/g, ''))}
                        placeholder="• • • • • •"
                        className="w-full py-3 px-4 rounded-xl border border-blue-300 bg-white text-center font-mono text-2xl font-black text-blue-950 tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-blue-800 focus:border-blue-800 shadow-xs"
                      />
                    </div>

                    <div className="flex items-center justify-between text-xs pt-1">
                      <span className="text-slate-500">Chưa nhận được thư?</span>
                      <button
                        type="button"
                        disabled={googleResendCooldown > 0}
                        onClick={handleResendGoogleOtp}
                        className="flex items-center gap-1 font-semibold text-blue-900 hover:text-blue-700 disabled:opacity-50 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        {googleResendCooldown > 0 ? (
                          <span>Gửi lại sau {googleResendCooldown}s</span>
                        ) : (
                          <span>Gửi lại mã OTP</span>
                        )}
                      </button>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-4 rounded-xl bg-blue-900 hover:bg-blue-800 active:bg-blue-950 text-white font-bold text-sm shadow-md shadow-blue-900/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                    >
                      {isSubmitting ? (
                        <span>Đang xác nhận mã OTP...</span>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                          <span>Xác nhận mã & Trở thành Customer</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* ========================================================================= */}
            {/* LUỒNG 3: ĐĂNG NHẬP BẰNG SĐT & MẬT KHẨU (KHI Ở CHẾ ĐỘ ĐĂNG NHẬP)           */}
            {/* ========================================================================= */}
            {!isRegisterMode && activeTab === 'login' && (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Số điện thoại <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Phone className="w-4 h-4" />
                    </div>
                    <input
                      type="tel"
                      value={loginPhone}
                      onChange={(e) => setLoginPhone(e.target.value)}
                      placeholder="VD: 0905 123 456"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Mật khẩu <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      type={showLoginPassword ? 'text' : 'password'}
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="Nhập mật khẩu của bạn"
                      className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:bg-white"
                    />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-4 rounded-xl bg-blue-900 hover:bg-blue-800 active:bg-blue-950 text-white font-bold text-sm shadow-md shadow-blue-900/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span>Đang đăng nhập...</span>
                  ) : (
                    <>
                      <span>Đăng nhập & Tiếp tục</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Bảo mật cam kết */}
            <div className="pt-2 text-center text-xs text-slate-500 flex items-center justify-center gap-1.5 border-t border-slate-100">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Thông tin được bảo mật và dùng để điều phối thợ đến tận nhà tại Đà Nẵng.</span>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
