import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE = path.join(__dirname, 'bookings.json');

// Ensure database file exists
function initDb() {
  if (!fs.existsSync(DB_FILE)) {
    const initialData = [
      {
        bookingCode: 'CC-1001',
        fullName: 'Trần Văn Hoàng',
        phoneNumber: '0905112233',
        district: 'Quận Hải Châu',
        addressDetail: '120 Bạch Đằng',
        fullAddress: '120 Bạch Đằng, Quận Hải Châu, Đà Nẵng',
        serviceName: 'Vệ sinh máy lạnh treo tường',
        servicePriceDisplay: '150.000đ',
        acType: 'Treo tường Inverter (Tiết kiệm điện)',
        acBrand: 'Daikin',
        acQuantity: 2,
        issueDescription: 'Bảo dưỡng định kỳ',
        scheduleType: 'Cần thợ gấp (sau 30 phút)',
        customerNote: 'Nhà có thang sẵn',
        estimatedTotal: 270000,
        status: 'completed',
        technician: {
          name: 'Nguyễn Văn Hùng',
          phone: '0905.888.666',
          estArrival: 'Đã hoàn thành'
        },
        createdAt: new Date(Date.now() - 86400000).toISOString()
      }
    ];
    fs.writeFileSync(DB_FILE, JSON.stringify(initialData, null, 2), 'utf-8');
  }
}

initDb();

function readBookings() {
  try {
    const content = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(content || '[]');
  } catch (error) {
    console.error('Error reading bookings DB:', error);
    return [];
  }
}

function writeBookings(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error writing bookings DB:', error);
    return false;
  }
}

// Technician pool in Danang
const TECHNICIANS = [
  { name: 'Nguyễn Văn Hùng', phone: '0905.888.666', district: 'Quận Hải Châu' },
  { name: 'Trần Đình Trọng', phone: '0905.888.666', district: 'Quận Sơn Trà' },
  { name: 'Phạm Đức Thành', phone: '0905.888.666', district: 'Quận Thanh Khê' },
  { name: 'Lê Quốc Việt', phone: '0905.888.666', district: 'Quận Cẩm Lệ' },
  { name: 'Đặng Minh Khang', phone: '0905.888.666', district: 'Quận Ngũ Hành Sơn' },
  { name: 'Võ Hoàng Nam', phone: '0905.888.666', district: 'Quận Liên Chiểu' },
];

export const db = {
  getAllBookings() {
    return readBookings();
  },

  getBookingByCode(code) {
    const list = readBookings();
    return list.find((b) => b.bookingCode.toUpperCase() === code.toUpperCase()) || null;
  },

  createBooking(validatedData) {
    const list = readBookings();

    // Generate unique booking code
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const bookingCode = `CC-${randomNum}`;

    // Match technician near district
    const matchedTech = TECHNICIANS.find((t) => t.district === validatedData.district) || TECHNICIANS[0];

    const newBooking = {
      bookingCode,
      ...validatedData,
      status: 'confirmed',
      technician: {
        name: matchedTech.name,
        phone: matchedTech.phone,
        activeDistrict: validatedData.district,
        estArrival: validatedData.scheduleType.includes('gấp')
          ? 'Sau 25 - 30 phút'
          : validatedData.scheduleType
      },
      createdAt: new Date().toISOString()
    };

    list.unshift(newBooking);
    writeBookings(list);
    return newBooking;
  },

  updateStatus(code, status) {
    const list = readBookings();
    const index = list.findIndex((b) => b.bookingCode.toUpperCase() === code.toUpperCase());
    if (index === -1) return null;
    list[index].status = status;
    list[index].updatedAt = new Date().toISOString();
    writeBookings(list);
    return list[index];
  }
};
