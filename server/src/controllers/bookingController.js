import { db } from '../data/db.js';
import { validateBookingInput, sanitizeString } from '../utils/validator.js';

export const bookingController = {
  // POST /api/bookings - Customer submits a new booking
  createBooking(req, res) {
    try {
      const { isValid, errors, sanitizedData } = validateBookingInput(req.body || {});

      if (!isValid) {
        return res.status(400).json({
          success: false,
          message: 'Dữ liệu không hợp lệ',
          errors
        });
      }

      const newBooking = db.createBooking(sanitizedData);

      console.log(`[CoolCall Audit] New booking created: ${newBooking.bookingCode} for ${newBooking.fullName} in ${newBooking.district}`);

      return res.status(201).json({
        success: true,
        message: 'Đặt lịch thợ CoolCall thành công',
        data: newBooking
      });
    } catch (error) {
      console.error('Error in createBooking:', error);
      return res.status(500).json({
        success: false,
        message: 'Lỗi hệ thống khi tạo đơn đặt lịch'
      });
    }
  },

  // GET /api/bookings/:code - Track booking by code
  getBookingByCode(req, res) {
    try {
      const code = sanitizeString(req.params.code);
      const booking = db.getBookingByCode(code);

      if (!booking) {
        return res.status(404).json({
          success: false,
          message: `Không tìm thấy đơn đặt lịch với mã: ${code}`
        });
      }

      return res.status(200).json({
        success: true,
        data: booking
      });
    } catch (error) {
      console.error('Error in getBookingByCode:', error);
      return res.status(500).json({
        success: false,
        message: 'Lỗi hệ thống khi tra cứu đơn'
      });
    }
  },

  // GET /api/bookings - Admin list of all bookings (Protected by API Key)
  getAllBookings(req, res) {
    try {
      const authHeader = req.headers.authorization;
      const adminKey = process.env.ADMIN_API_KEY || 'coolcall_secure_admin_2026_danang';

      // Verify Bearer token or api-key header
      const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : req.headers['x-api-key'];

      if (token !== adminKey) {
        return res.status(401).json({
          success: false,
          message: 'Không có quyền truy cập. Vui lòng cung cấp Admin API Key hợp lệ.'
        });
      }

      const bookings = db.getAllBookings();
      return res.status(200).json({
        success: true,
        total: bookings.length,
        data: bookings
      });
    } catch (error) {
      console.error('Error in getAllBookings:', error);
      return res.status(500).json({
        success: false,
        message: 'Lỗi hệ thống'
      });
    }
  }
};
