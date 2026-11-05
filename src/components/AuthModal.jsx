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
  KeyRound,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/useAuth';

export default function AuthModal() {
  const { 
    isAuthModalOpen, 
    authModalMessage, 
    initialAuthTab, 
    googleOtpState,
    closeAuthModal, 
    sendGoogleOtp,
    verifyGoogleOtp,
    resendGoogleOtp,
    login, 
    register
  } = useAuth();

  const [activeTab, setActiveTab] = useState(initialAuthTab || 'google');
  const [prevTab, setPrevTab] = useState(initialAuthTab);
  if (initialAuthTab !== prevTab) {
    setPrevTab(initialAuthTab);
    setActiveTab(initialAuthTab || 'google');
  }

  // Google Login State
  const [googleName, setGoogleName] = useState('');
  const [googleEmail, setGoogleEmail] = useState('');
  const [googleStep, setGoogleStep] = useState('input'); // 'input' | 'otp'
  const [otpInput, setOtpInput] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  // Login form state
  const [loginPhone, setLoginPhone] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Register form state
  const [regFullName, setRegFullName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);

  // UI state
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isAuthModalOpen) return null;

  // 1. Handle Google Send OTP
  const handleGoogleSendOtp = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!googleEmail.trim()) {
      setErrorMsg('Vui lòng nhập địa chỉ Gmail cá nhân của bạn');
      return;
    }

    if (!googleEmail.includes('@') || !googleEmail.includes('.')) {
      setErrorMsg('Địa chỉ email không hợp lệ (VD: tenban@gmail.com)');
      return;
    }

    setIsSubmitting(true);
    const result = await sendGoogleOtp(googleEmail.trim(), googleName.trim());
    setIsSubmitting(false);

    if (result.success) {
      setGoogleStep('otp');
      setSuccessMsg(`Mã xác thực đã được gửi về Gmail: ${result.email}`);
      setResendCooldown(60);
      const timer = setInterval(() => {
        setResendCooldown((prev) => {
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

  // 2. Handle Google Verify OTP
  const handleGoogleVerifyOtp = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!otpInput.trim() || otpInput.trim().length !== 6) {
      setErrorMsg('Vui lòng nhập đầy đủ 6 chữ số mã xác thực OTP từ Gmail');
      return;
    }

    setIsSubmitting(true);
    const result = await verifyGoogleOtp(otpInput.trim());
    setIsSubmitting(false);

    if (!result.success) {
      setErrorMsg(result.message);
    }
  };

  // Resend OTP
  const handleResendOtp = async () => {
    if (resendCooldown > 0) return;
    setErrorMsg('');
    setIsSubmitting(true);
    const result = await resendGoogleOtp();
    setIsSubmitting(false);
    if (result.success) {
      setSuccessMsg('Đã gửi mã xác thực mới vào hộp thư Gmail của bạn!');
      setResendCooldown(60);
    } else {
      setErrorMsg(result.message || 'Lỗi gửi lại mã');
    }
  };

  // 3. Handle Normal Login
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
    const result = await login(loginPhone, loginPassword);
    setIsSubmitting(false);

    if (!result.success) {
      setErrorMsg(result.message);
    }
  };

  // 4. Handle Normal Register
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!regFullName.trim() || regFullName.trim().length < 2) {
      setErrorMsg('Họ và tên phải có ít nhất 2 ký tự');
      return;
    }

    const phoneRegex = /(84|0[3|5|7|8|9])+([0-9]{8})\b/;
    if (!phoneRegex.test(regPhone.replace(/\s+/g, ''))) {
      setErrorMsg('Số điện thoại không hợp lệ (VD: 0905123456)');
      return;
    }

    if (!regPassword || regPassword.length < 6) {
      setErrorMsg('Mật khẩu phải có ít nhất 6 ký tự');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setErrorMsg('Mật khẩu xác nhận không khớp');
      return;
    }

    setIsSubmitting(true);
    const result = await register(regFullName.trim(), regPhone.trim(), regPassword);
    setIsSubmitting(false);

    if (!result.success) {
      setErrorMsg(result.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-blue-100 overflow-hidden transform animate-in zoom-in-95 duration-200 text-left max-h-[92vh] flex flex-col"
      >
        {/* Modal Top Header with Deep Navy Blue */}
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
              CoolCall • Phân Quyền Người Dùng
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-black text-white">
            {activeTab === 'google' 
              ? 'Đăng Nhập Google (Gmail OTP)' 
              : activeTab === 'login' 
              ? 'Đăng Nhập Bằng Số Điện Thoại' 
              : 'Đăng Ký Tài Khoản Mới'}
          </h3>

          <p className="text-xs text-blue-200 mt-1 leading-relaxed">
            {authModalMessage || 'Quý khách cần đăng ký hoặc đăng nhập tài khoản để đặt thợ hoặc gọi thợ.'}
          </p>
        </div>

        {/* Modal Body Scrollable */}
        <div className="p-5 sm:p-6 space-y-4 overflow-y-auto">
          
          {/* Tab Selector: 3 options */}
          <div className="grid grid-cols-3 gap-1 rounded-2xl bg-slate-100 p-1 select-none">
            <button
              type="button"
              onClick={() => { setActiveTab('google'); setErrorMsg(''); setSuccessMsg(''); }}
              className={`py-2 px-1 text-xs font-bold rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                activeTab === 'google'
                  ? 'bg-white text-blue-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
              <span>Google Gmail</span>
            </button>

            <button
              type="button"
              onClick={() => { setActiveTab('login'); setErrorMsg(''); setSuccessMsg(''); }}
              className={`py-2 px-1 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'login'
                  ? 'bg-white text-blue-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Đăng nhập SĐT
            </button>

            <button
              type="button"
              onClick={() => { setActiveTab('register'); setErrorMsg(''); setSuccessMsg(''); }}
              className={`py-2 px-1 text-xs font-bold rounded-xl transition-all cursor-pointer ${
                activeTab === 'register'
                  ? 'bg-white text-blue-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Đăng ký mới
            </button>
          </div>

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

          {/* ========================================================= */}
          {/* TAB 1: GOOGLE SIGN-IN VIA PERSONAL GMAIL OTP              */}
          {/* ========================================================= */}
          {activeTab === 'google' && (
            <div className="space-y-4">
              
              {googleStep === 'input' ? (
                /* Step 1: Input Name & Gmail */
                <form onSubmit={handleGoogleSendOtp} className="space-y-4">
                  <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-200/80 text-xs text-blue-950">
                    <p className="font-bold flex items-center gap-1.5 mb-1">
                      <Sparkles className="w-4 h-4 text-sky-600" />
                      Xác thực Google cá nhân 2 bước
                    </p>
                    <p className="text-slate-600 leading-relaxed">
                      Nhập địa chỉ Gmail cá nhân của bạn. Hệ thống CoolCall sẽ gửi mã xác thực OTP 6 số về hộp thư Gmail để xác minh và nâng cấp quyền thành <strong>Khách Hàng (Customer)</strong>.
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Họ và tên của bạn
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        value={googleName}
                        onChange={(e) => setGoogleName(e.target.value)}
                        placeholder="VD: Nguyễn Khắc Quang Khánh"
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:bg-white transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Địa chỉ Gmail cá nhân <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        value={googleEmail}
                        onChange={(e) => setGoogleEmail(e.target.value)}
                        placeholder="VD: quangkhanh22@gmail.com"
                        required
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:bg-white transition-all"
                      />
                    </div>
                    <span className="text-[11px] text-slate-500 mt-1 block">
                      Mã xác thực OTP bảo mật 6 số sẽ được gửi về hộp thư Gmail này.
                    </span>
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
                        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                          <path fill="#ffffff" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                          <path fill="#ffffff" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                          <path fill="#ffffff" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                          <path fill="#ffffff" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                        </svg>
                        <span>Gửi mã xác thực về Gmail</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* Step 2: Input OTP & Simulated Gmail Notification Box */
                <form onSubmit={handleGoogleVerifyOtp} className="space-y-4">
                  
                  {/* SIMULATED GMAIL NOTIFICATION BOX */}
                  {googleOtpState && (
                    <div className="rounded-2xl border-2 border-emerald-400/80 bg-gradient-to-b from-emerald-50/60 to-white p-4 shadow-md text-left space-y-3">
                      <div className="flex items-center justify-between border-b border-emerald-200/60 pb-2">
                        <div className="flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                          <span className="text-xs font-black text-emerald-900 uppercase tracking-wide flex items-center gap-1">
                            📬 Hộp Thư Gmail Cá Nhân (Mô Phỏng Hộp Thư Đến)
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-slate-500">{googleOtpState.sentAt}</span>
                      </div>

                      <div className="text-xs text-slate-700 space-y-1">
                        <p><strong>Người gửi:</strong> CoolCall Security &lt;security-noreply@coolcall.danang.vn&gt;</p>
                        <p><strong>Gửi đến:</strong> <span className="text-blue-900 font-semibold">{googleOtpState.email}</span></p>
                        <p><strong>Tiêu đề:</strong> [CoolCall] Mã xác thực liên kết tài khoản Google</p>
                      </div>

                      <div className="p-3 rounded-xl bg-white border border-emerald-300 shadow-inner text-center">
                        <p className="text-xs text-slate-600 mb-1">
                          Kính gửi <strong>{googleOtpState.fullName}</strong>, mã OTP kích hoạt tài khoản của bạn là:
                        </p>
                        <div className="text-3xl font-black font-mono tracking-widest text-blue-950 py-1">
                          {googleOtpState.otp}
                        </div>
                        <p className="text-[10px] text-slate-400">
                          (Mã có hiệu lực trong 5 phút. Vui lòng không chia sẻ mã này)
                        </p>
                      </div>

                      {/* 1-Click Auto Fill Button for Instant Verification */}
                      <button
                        type="button"
                        onClick={() => setOtpInput(googleOtpState.otp)}
                        className="w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Bấm vào đây để tự động điền mã {googleOtpState.otp}</span>
                      </button>
                    </div>
                  )}

                  {/* OTP Input Field */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                      Nhập mã xác thực 6 số <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <KeyRound className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        maxLength={6}
                        value={otpInput}
                        onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
                        placeholder="••••••"
                        className="w-full pl-9 pr-3 py-3 rounded-xl border border-blue-300 bg-white text-center text-xl font-mono font-black tracking-[0.5em] text-blue-950 focus:outline-none focus:ring-2 focus:ring-blue-800"
                        autoFocus
                      />
                    </div>
                  </div>

                  {/* Resend and change email row */}
                  <div className="flex items-center justify-between text-xs text-slate-600">
                    <button
                      type="button"
                      onClick={() => setGoogleStep('input')}
                      className="text-blue-700 hover:underline font-semibold cursor-pointer"
                    >
                      ← Đổi địa chỉ Gmail khác
                    </button>

                    <button
                      type="button"
                      disabled={resendCooldown > 0}
                      onClick={handleResendOtp}
                      className="flex items-center gap-1 font-semibold text-slate-600 hover:text-blue-900 disabled:opacity-50 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      {resendCooldown > 0 ? (
                        <span>Gửi lại sau {resendCooldown}s</span>
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

          {/* ========================================================= */}
          {/* TAB 2: NORMAL PHONE LOGIN                                 */}
          {/* ========================================================= */}
          {activeTab === 'login' && (
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

          {/* ========================================================= */}
          {/* TAB 3: REGISTER NEW ACCOUNT (Tên, SĐT, Mật khẩu)           */}
          {/* ========================================================= */}
          {activeTab === 'register' && (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
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
                  Số điện thoại <span className="text-rose-500">*</span>
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
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Mật khẩu (ít nhất 6 ký tự) <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showRegPassword ? 'text' : 'password'}
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Nhập mật khẩu"
                    className="w-full pl-9 pr-10 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:bg-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowRegPassword(!showRegPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    {showRegPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Xác nhận lại mật khẩu <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type="password"
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    placeholder="Nhập lại mật khẩu"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-800 focus:bg-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-xl bg-blue-900 hover:bg-blue-800 active:bg-blue-950 text-white font-bold text-sm shadow-md shadow-blue-900/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 mt-2"
              >
                {isSubmitting ? (
                  <span>Đang tạo tài khoản...</span>
                ) : (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Đăng ký & Kích hoạt quyền đặt thợ</span>
                  </>
                )}
              </button>
            </form>
          )}

          {/* Trust Guarantee Note */}
          <div className="pt-2 text-center text-xs text-slate-500 flex items-center justify-center gap-1.5 border-t border-slate-100">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Thông tin được bảo mật và dùng để điều phối thợ đến tận nhà tại Đà Nẵng.</span>
          </div>

        </div>
      </div>
    </div>
  );
}
