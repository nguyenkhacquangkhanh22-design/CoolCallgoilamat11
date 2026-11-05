import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { sanitizeString, isValidVietnamesePhone } from '../utils/validator.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const USERS_FILE = path.join(__dirname, '../data/users.json');

function initUsersDb() {
  if (!fs.existsSync(USERS_FILE)) {
    const initialUsers = [
      {
        id: 'usr_default_1',
        fullName: 'Nguyễn Văn Khách',
        phoneNumber: '0905123456',
        passwordHash: hashPassword('123456'),
        role: 'customer',
        createdAt: new Date().toISOString()
      }
    ];
    fs.writeFileSync(USERS_FILE, JSON.stringify(initialUsers, null, 2), 'utf-8');
  }
}

initUsersDb();

function readUsers() {
  try {
    const content = fs.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(content || '[]');
  } catch {
    return [];
  }
}

function writeUsers(users) {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf-8');
    return true;
  } catch {
    return false;
  }
}

function hashPassword(password) {
  return crypto.createHash('sha256').update(password + '_coolcall_salt_2026').digest('hex');
}

export const authController = {
  // POST /api/auth/register
  register(req, res) {
    try {
      const { fullName, phoneNumber, password } = req.body || {};

      const cleanName = sanitizeString(fullName);
      const cleanPhone = (phoneNumber || '').replace(/[\s.-]/g, '');

      if (!cleanName || cleanName.length < 2) {
        return res.status(400).json({ success: false, message: 'Họ và tên phải từ 2 ký tự' });
      }

      if (!isValidVietnamesePhone(cleanPhone)) {
        return res.status(400).json({ success: false, message: 'Số điện thoại không hợp lệ (VD: 0905123456)' });
      }

      if (!password || password.length < 6) {
        return res.status(400).json({ success: false, message: 'Mật khẩu phải có ít nhất 6 ký tự' });
      }

      const users = readUsers();
      if (users.some(u => u.phoneNumber === cleanPhone)) {
        return res.status(409).json({ success: false, message: 'Số điện thoại này đã được đăng ký tài khoản. Vui lòng đăng nhập.' });
      }

      const newUser = {
        id: 'usr_' + Date.now(),
        fullName: cleanName,
        phoneNumber: cleanPhone,
        passwordHash: hashPassword(password),
        role: 'customer',
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      writeUsers(users);

      const token = 'token_' + crypto.randomBytes(16).toString('hex');

      return res.status(201).json({
        success: true,
        message: 'Đăng ký tài khoản thành công',
        token,
        user: {
          id: newUser.id,
          fullName: newUser.fullName,
          phoneNumber: newUser.phoneNumber,
          role: newUser.role,
          provider: 'phone'
        }
      });
    } catch (error) {
      console.error('Register error:', error);
      return res.status(500).json({ success: false, message: 'Lỗi hệ thống khi đăng ký' });
    }
  },

  // POST /api/auth/login
  login(req, res) {
    try {
      const { phoneNumber, password } = req.body || {};
      const cleanPhone = (phoneNumber || '').replace(/[\s.-]/g, '');

      if (!cleanPhone || !password) {
        return res.status(400).json({ success: false, message: 'Vui lòng cung cấp số điện thoại và mật khẩu' });
      }

      const users = readUsers();
      const user = users.find(u => u.phoneNumber === cleanPhone);

      if (!user || user.passwordHash !== hashPassword(password)) {
        return res.status(401).json({ success: false, message: 'Số điện thoại hoặc mật khẩu chưa đúng' });
      }

      const token = 'token_' + crypto.randomBytes(16).toString('hex');

      return res.status(200).json({
        success: true,
        message: 'Đăng nhập thành công',
        token,
        user: {
          id: user.id,
          fullName: user.fullName,
          phoneNumber: user.phoneNumber,
          role: user.role,
          provider: 'phone'
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      return res.status(500).json({ success: false, message: 'Lỗi hệ thống khi đăng nhập' });
    }
  },

  // POST /api/auth/google-otp (Simulate / Record OTP dispatch)
  googleOtp(req, res) {
    try {
      const { email, fullName, otp } = req.body || {};
      const cleanEmail = sanitizeString(email || '');
      const cleanName = sanitizeString(fullName || '');

      return res.status(200).json({
        success: true,
        message: `Mã OTP đã gửi về ${cleanEmail}`,
        email: cleanEmail,
        fullName: cleanName,
        otp
      });
    } catch (error) {
      console.error('Google OTP error:', error);
      return res.status(500).json({ success: false, message: 'Lỗi gửi mã OTP' });
    }
  },

  // POST /api/auth/google
  googleLogin(req, res) {
    try {
      const { fullName, email, avatar, googleId } = req.body || {};
      const cleanName = sanitizeString(fullName || 'Khách hàng Google');
      const cleanEmail = sanitizeString(email || 'google_user@coolcall.vn');

      const users = readUsers();
      let user = users.find(u => u.email === cleanEmail);

      if (!user) {
        user = {
          id: 'usr_gg_' + (googleId || Date.now()),
          fullName: cleanName,
          email: cleanEmail,
          phoneNumber: '0905888999',
          avatar: avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
          role: 'customer',
          provider: 'google',
          createdAt: new Date().toISOString()
        };
        users.push(user);
        writeUsers(users);
      }

      const token = 'token_gg_' + crypto.randomBytes(16).toString('hex');

      return res.status(200).json({
        success: true,
        message: 'Đăng nhập Google thành công',
        token,
        user: {
          id: user.id,
          fullName: user.fullName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          avatar: user.avatar,
          role: 'customer',
          provider: 'google'
        }
      });
    } catch (error) {
      console.error('Google auth error:', error);
      return res.status(500).json({ success: false, message: 'Lỗi đăng nhập Google' });
    }
  }
};
