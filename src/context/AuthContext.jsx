import React, { useState } from 'react';
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
  const [initialAuthTab, setInitialAuthTab] = useState('login'); // 'login' | 'register'

  const openAuthModal = (options = {}) => {
    setAuthModalMessage(options.message || 'Vui lòng đăng nhập hoặc đăng ký tài khoản để gọi thợ!');
    setInitialAuthTab(options.tab || 'login');
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setAuthModalMessage('');
  };

  // Login with phone and password
  const login = async (phoneNumber, password) => {
    const cleanPhone = phoneNumber.replace(/[\s.-]/g, '');
    const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

    try {
      // Try backend first
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
        return { success: true };
      }
      
      // Also allow test account if any
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
        return { success: true };
      }

      return { success: false, message: 'Số điện thoại hoặc mật khẩu chưa chính xác. Vui lòng thử lại hoặc Đăng ký mới.' };
    }
  };

  // Register with fullName, phoneNumber, password
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
      return { success: true };
    }
  };

  // Login / Register with Google
  const loginWithGoogle = async (googleProfile = null) => {
    // Standard mock/real Google profile
    const profile = googleProfile || {
      fullName: 'Khách hàng Google',
      email: 'khachhang.coolcall@gmail.com',
      phoneNumber: '0905888999',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      provider: 'google',
      role: 'customer'
    };

    const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

    try {
      const res = await fetch(`${apiUrl}/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setRole('customer');
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data.user));
        closeAuthModal();
        return { success: true };
      }
    } catch {
      // Fallback
    }

    setUser(profile);
    setRole('customer');
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
    closeAuthModal();
    return { success: true };
  };

  // Logout back to Guest role
  const logout = () => {
    setUser(null);
    setRole('guest');
    localStorage.removeItem(STORAGE_KEY);
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
        openAuthModal,
        closeAuthModal,
        login,
        register,
        loginWithGoogle,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
