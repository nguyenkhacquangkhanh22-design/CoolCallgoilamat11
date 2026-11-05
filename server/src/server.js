import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

import bookingRoutes from './routes/bookingRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import authRoutes from './routes/authRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from server/.env
dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// 1. Security: Helmet for HTTP Headers
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

// 2. Security: CORS Configuration
const allowedOrigins = (process.env.CLIENT_URL || 'http://localhost:5173')
  .split(',')
  .map(o => o.trim());

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps, curl, postman) or if origin is in whitelist
    if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
      return callback(null, true);
    }
    return callback(new Error(`CORS blocked request from origin: ${origin}`));
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Api-Key']
}));

// 3. Security: Request payload limit (prevent memory exhaustion attacks)
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// 4. Security: Global Rate Limiting (DDoS & Brute Force Protection)
const globalLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 mins
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100', 10),
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau 15 phút.'
  }
});
app.use('/api', globalLimiter);

// Strict Rate Limiting for Booking Creation (prevent form spam)
const bookingLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 15, // max 15 bookings per 15 minutes per IP
  message: {
    success: false,
    message: 'Bạn đã đặt lịch quá nhiều lần trong thời gian ngắn. Vui lòng liên hệ hotline 0905.888.666 để được hỗ trợ ngay.'
  }
});

// 5. API Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingLimiter, bookingRoutes);
app.use('/api/services', serviceRoutes);

// Health Check Endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: 'SmartFix Backend API'
  });
});

app.get('/api', (req, res) => {
  res.status(200).json({
    message: 'Chào mừng bạn đến với SmartFix Backend API (Đà Nẵng)',
    version: '1.0.0',
    documentation: {
      postBooking: 'POST /api/bookings',
      trackBooking: 'GET /api/bookings/:code',
      listBookings: 'GET /api/bookings (Requires Admin Token)',
      services: 'GET /api/services',
      districts: 'GET /api/services/districts'
    }
  });
});

// 6. 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Đường dẫn API '${req.originalUrl}' không tồn tại trên hệ thống SmartFix.`
  });
});

// 7. Global Error Handler (Hides stack trace in production for security)
app.use((err, req, res, _next) => {
  console.error('[SmartFix Error Handler]:', err.message);
  res.status(err.status || 500).json({
    success: false,
    message: NODE_ENV === 'production' ? 'Đã xảy ra lỗi máy chủ nội bộ' : err.message
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`===============================================`);
  console.log(`🚀 SmartFix Backend API running securely on port ${PORT}`);
  console.log(`🔒 Mode: ${NODE_ENV}`);
  console.log(`🌐 Allowed Origins: ${allowedOrigins.join(', ')}`);
  console.log(`📡 Health Check: http://localhost:${PORT}/health`);
  console.log(`===============================================`);
});
