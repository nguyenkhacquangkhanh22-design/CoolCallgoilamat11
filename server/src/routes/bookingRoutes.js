import express from 'express';
import { bookingController } from '../controllers/bookingController.js';

const router = express.Router();

// Public: Customer creates a booking
router.post('/', bookingController.createBooking);

// Public: Customer checks booking status by code
router.get('/:code', bookingController.getBookingByCode);

// Protected: Admin views all bookings
router.get('/', bookingController.getAllBookings);

export default router;
