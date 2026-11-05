import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { AuthContext } from './auth-context-base';

const STORAGE_KEY = 'coolcall_auth_user';

export function AuthProvider({ children }) {
  // role: 'guest' | 'customer'
  const [user, setUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem(STORAGE_KEY);
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (parsed && (parsed.phoneNumber || parsed.email)) {
          return parsed;
        }
      }
    } catch {
      // ignore
    }
    return null;
  });

  const [role, setRole] = useState(() => {
    try {
      const savedUser = localStorage.getItem(STORAGE_KEY);
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (parsed && (parsed.phoneNumber || parsed.email)) {
          return 'customer';
        }
      }
    } catch {
      // ignore
    }
    return 'guest';
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMessage, setAuthModalMessage] = useState('');
  const [initialAuthTab, setInitialAuthTab] = useState('register'); // 'register' | 'login' | 'google'

  // Google OTP State
  const [googleOtpState, setGoogleOtpState] = useState(null);

  // Global Toast State
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 6000);
  };

  const closeToast = () => {
    setToast(null);
  };

  const openAuthModal = (options = {}) => {
    setAuthModalMessage(options.message || 'Bạn phải đăng ký hoặc đăng nhập tài khoản để đặt thợ hoặc gọi thợ!');
    setInitialAuthTab(options.tab || 'register');
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setAuthModalMessage('');
  };

  // 1. Google Personal Gmail OTP Flow
  const sendGoogleOtp = async (email, fullName) => {
    const cleanEmail = (email || '').trim().toLowerCase();
    const cleanName = (fullName || '').trim() || cleanEmail.split('@')[0];

    // Generate random 6-digit OTP
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes

    const otpData = {
      email: cleanEmail,
      fullName: cleanName,
      otp: generatedOtp,
      expiresAt,
      sentAt: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };

    setGoogleOtpState(otpData);

    // Send real email via EmailJS
    const emailJsServiceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_m9bvt06';
    const emailJsTemplateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_ib38edo';
    const emailJsPublicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'aEOem-UrLQmXF8sRA';

    if (emailJsServiceId && emailJsTemplateId && emailJsPublicKey) {
      try {
        await emailjs.send(
          emailJsServiceId,
          emailJsTemplateId,
          {
            to_email: cleanEmail,
            to_name: cleanName,
            otp_code: generatedOtp,
            message: `Mã xác thực CoolCall OTP của bạn là: ${generatedOtp}. Mã có hiệu lực trong 5 phút.`
          },
          emailJsPublicKey
        );
        console.info('EmailJS OTP email successfully dispatched to:', cleanEmail);
      } catch (err) {
        console.warn('EmailJS service warning:', err);
      }
    }

    // Also attempt backend notification if backend server is active
    const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
    try {
      await fetch(`${apiUrl}/auth/google-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail, fullName: cleanName, otp: generatedOtp })
      });
    } catch {
      // client-side simulation is fully resilient
    }

    return { success: true, otp: generatedOtp, email: cleanEmail };
  };

  const resendGoogleOtp = async () => {
    if (!googleOtpState?.email) return { success: false, message: 'Chưa có thông tin email' };
    return await sendGoogleOtp(googleOtpState.email, googleOtpState.fullName);
  };

  const verifyGoogleOtp = async (inputOtp) => {
    if (!googleOtpState) {
      return { success: false, message: 'Vui lòng nhập email để nhận mã xác thực trước.' };
    }

    if (Date.now() > googleOtpState.expiresAt) {
      return { success: false, message: 'Mã xác thực đã hết hạn (quá 5 phút). Vui lòng nhấn gửi lại mã mới.' };
    }

    const cleanInput = (inputOtp || '').trim();
    // STRICT: Only accepts the exact random 6-digit OTP sent to the user's Gmail
    const isValid = cleanInput === googleOtpState.otp;

    if (!isValid) {
      return { 
        success: false, 
        message: 'Mã xác thực không chính xác. Vui lòng kiểm tra lại 6 chữ số trong hộp thư Gmail (hoặc mục Spam) của bạn!' 
      };
    }

    // OTP Verified! Upgrade user to CUSTOMER
    const verifiedCustomer = {
      id: 'usr_gg_' + Date.now(),
      fullName: googleOtpState.fullName,
      email: googleOtpState.email,
      phoneNumber: '0905888999',
      role: 'customer',
      provider: 'google',
      verifiedAt: new Date().toISOString(),
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
    };

    setUser(verifiedCustomer);
    setRole('customer');
    localStorage.setItem(STORAGE_KEY, JSON.stringify(verifiedCustomer));
    setGoogleOtpState(null);
    closeAuthModal();

    showToast(
      `🎉 Chúc mừng ${verifiedCustomer.fullName}! Xác thực Google (${verifiedCustomer.email}) thành công. Bạn đã trở thành Khách Hàng (Customer) và có thể đặt thợ gọi thợ ngay!`,
      'success'
    );

    // Sync to backend asynchronously
    const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
    try {
      await fetch(`${apiUrl}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(verifiedCustomer)
      });
    } catch {
      // offline fallback
    }

    return { success: true };
  };

  // 2. Normal Login with Phone and Password
  const login = async (phoneNumber, password) => {
    const cleanPhone = phoneNumber.replace(/[\s.-]/g, '');
    const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

    try {
      const res = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: cleanPhone, password })
      });
      if (res.ok) {
        const data = await res.json();
        const loggedUser = data.user;
        setUser(loggedUser);
        setRole('customer');
        localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedUser));
        closeAuthModal();
        showToast(`🎉 Đăng nhập thành công! Chào mừng Khách Hàng ${loggedUser.fullName} quay trở lại CoolCall.`, 'success');
        return { success: true };
      } else {
        const errData = await res.json();
        return { success: false, message: errData.message || 'Số điện thoại hoặc mật khẩu không đúng' };
      }
    } catch {
      // Client-side fallback if backend server is not running
      const localUsers = JSON.parse(localStorage.getItem('coolcall_registered_users') || '[]');
      const found = localUsers.find(u => u.phoneNumber === cleanPhone && u.password === password);
      
      if (found) {
        const loggedUser = {
          fullName: found.fullName,
          phoneNumber: found.phoneNumber,
          provider: 'phone',
          role: 'customer'
        };
        setUser(loggedUser);
        setRole('customer');
        localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedUser));
        closeAuthModal();
        showToast(`🎉 Đăng nhập thành công! Chào mừng Khách Hàng ${loggedUser.fullName} quay trở lại.`, 'success');
        return { success: true };
      }
      
      // Default demo account
      if (cleanPhone === '0905123456' && password === '123456') {
        const loggedUser = {
          fullName: 'Nguyễn Văn Khách',
          phoneNumber: '0905123456',
          provider: 'phone',
          role: 'customer'
        };
        setUser(loggedUser);
        setRole('customer');
        localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedUser));
        closeAuthModal();
        showToast(`🎉 Đăng nhập thành công với tài khoản Khách Hàng!`, 'success');
        return { success: true };
      }

      return { success: false, message: 'Số điện thoại hoặc mật khẩu chưa chính xác. Vui lòng kiểm tra lại hoặc Đăng ký mới.' };
    }
  };

  // 3. Normal Register with fullName, phoneNumber, password
  const register = async (fullName, phoneNumber, password) => {
    const cleanPhone = phoneNumber.replace(/[\s.-]/g, '');
    const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

    try {
      const res = await fetch(`${apiUrl}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, phoneNumber: cleanPhone, password })
      });
      if (res.ok) {
        const data = await res.json();
        const newUser = data.user;
        setUser(newUser);
        setRole('customer');
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
        closeAuthModal();
        showToast(`🎉 Đăng ký thành công! Bạn đã trở thành Khách Hàng (Customer) của CoolCall và có thể đặt thợ ngay!`, 'success');
        return { success: true };
      } else {
        const errData = await res.json();
        return { success: false, message: errData.message || 'Đăng ký không thành công' };
      }
    } catch {
      // Local fallback
      const localUsers = JSON.parse(localStorage.getItem('coolcall_registered_users') || '[]');
      if (localUsers.some(u => u.phoneNumber === cleanPhone)) {
        return { success: false, message: 'Số điện thoại này đã được đăng ký. Vui lòng chuyển sang tab Đăng nhập.' };
      }

      const newUser = {
        fullName,
        phoneNumber: cleanPhone,
        password,
        role: 'customer',
        createdAt: new Date().toISOString()
      };

      localUsers.push(newUser);
      localStorage.setItem('coolcall_registered_users', JSON.stringify(localUsers));

      const sessionUser = {
        fullName,
        phoneNumber: cleanPhone,
        provider: 'phone',
        role: 'customer'
      };

      setUser(sessionUser);
      setRole('customer');
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sessionUser));
      closeAuthModal();
      showToast(`🎉 Đăng ký thành công! Bạn đã trở thành Khách Hàng (Customer) của CoolCall và có thể đặt thợ ngay!`, 'success');
      return { success: true };
    }
  };

  // 4. Logout back to Guest role
  const logout = () => {
    setUser(null);
    setRole('guest');
    localStorage.removeItem(STORAGE_KEY);
    showToast('🔒 Bạn đã đăng xuất và trở về quyền Khách (Guest - Chỉ xem).', 'info');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        isGuest: role === 'guest',
        isCustomer: role === 'customer',
        isAuthModalOpen,
        authModalMessage,
        initialAuthTab,
        googleOtpState,
        toast,
        openAuthModal,
        closeAuthModal,
        sendGoogleOtp,
        verifyGoogleOtp,
        resendGoogleOtp,
        login,
        register,
        logout,
        showToast,
        closeToast
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
