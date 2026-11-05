// Service Controller: Returns services and Danang districts
const SERVICES = [
  { id: 'vesinh-treotuong', title: 'Vệ sinh máy lạnh treo tường', price: 150000, priceDisplay: '150.000đ', warranty: '30 ngày' },
  { id: 'vesinh-amtran', title: 'Vệ sinh máy lạnh âm trần / Áp trần', price: 250000, priceDisplay: '250.000đ', warranty: '30 ngày' },
  { id: 'sua-khonglanh', title: 'Sửa máy lạnh không lạnh / Kém lạnh', price: 200000, priceDisplay: 'Từ 200.000đ', warranty: '3 - 6 tháng' },
  { id: 'sua-chaynuoc', title: 'Xử lý máy lạnh chảy nước, nhỏ giọt', price: 180000, priceDisplay: '180.000đ', warranty: '3 tháng' },
  { id: 'napgas-chinhhang', title: 'Nạp gas máy lạnh R32 / R410A / R22', price: 150000, priceDisplay: 'Từ 150.000đ', warranty: '3 tháng' },
  { id: 'sua-boardmach', title: 'Sửa bo mạch điều khiển & Lỗi chớp đèn', price: 250000, priceDisplay: 'Từ 250.000đ', warranty: '6 tháng' },
  { id: 'thaolap-didon', title: 'Tháo lắp & Di dời máy lạnh trọn gói', price: 350000, priceDisplay: 'Từ 350.000đ', warranty: '6 tháng' },
  { id: 'thay-block', title: 'Thay thế Block (Máy nén) chính hãng', price: 800000, priceDisplay: 'Báo giá sau kiểm tra', warranty: '12 tháng' },
];

const DISTRICTS = [
  { id: 'hai-chau', name: 'Quận Hải Châu', activeTechs: 5, estTime: '15-20 phút' },
  { id: 'thanh-khe', name: 'Quận Thanh Khê', activeTechs: 4, estTime: '20-25 phút' },
  { id: 'son-tra', name: 'Quận Sơn Trà', activeTechs: 3, estTime: '20-30 phút' },
  { id: 'ngu-hanh-son', name: 'Quận Ngũ Hành Sơn', activeTechs: 3, estTime: '25-30 phút' },
  { id: 'cam-le', name: 'Quận Cẩm Lệ', activeTechs: 3, estTime: '25-30 phút' },
  { id: 'lien-chieu', name: 'Quận Liên Chiểu', activeTechs: 2, estTime: '25-35 phút' },
  { id: 'hoa-vang', name: 'Huyện Hòa Vang', activeTechs: 2, estTime: '30-40 phút' },
];

export const serviceController = {
  getServices(req, res) {
    return res.status(200).json({
      success: true,
      data: SERVICES
    });
  },

  getDistricts(req, res) {
    return res.status(200).json({
      success: true,
      data: DISTRICTS
    });
  }
};
