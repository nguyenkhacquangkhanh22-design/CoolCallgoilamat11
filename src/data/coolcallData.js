// CoolCall Data: Services, Danang Districts, Pricing, Reviews, FAQs

export const DANANG_DISTRICTS = [
  { id: 'hai-chau', name: 'Quận Hải Châu', hubs: ['Nguyễn Văn Linh', 'Bạch Đằng', 'Lê Duẩn', 'Trưng Nữ Vương'], activeTechs: 5, estTime: '15-20 phút' },
  { id: 'thanh-khe', name: 'Quận Thanh Khê', hubs: ['Điện Biên Phủ', 'Hà Huy Tập', 'Nguyễn Tất Thành'], activeTechs: 4, estTime: '20-25 phút' },
  { id: 'son-tra', name: 'Quận Sơn Trà', hubs: ['Võ Văn Kiệt', 'Ngô Quyền', 'Phạm Văn Đồng'], activeTechs: 3, estTime: '20-30 phút' },
  { id: 'ngu-hanh-son', name: 'Quận Ngũ Hành Sơn', hubs: ['Lê Văn Hiến', 'Hồ Xuân Hương', 'Võ Nguyên Giáp'], activeTechs: 3, estTime: '25-30 phút' },
  { id: 'cam-le', name: 'Quận Cẩm Lệ', hubs: ['Cách Mạng Tháng 8', 'Nguyễn Hữu Thọ', 'Lê Đại Hành'], activeTechs: 3, estTime: '25-30 phút' },
  { id: 'lien-chieu', name: 'Quận Liên Chiểu', hubs: ['Tôn Đức Thắng', 'Nguyễn Lương Bằng', 'Khu Công Nghiệp'], activeTechs: 2, estTime: '25-35 phút' },
  { id: 'hoa-vang', name: 'Huyện Hòa Vang', hubs: ['Quốc Lộ 14B', 'Khu Công Nghệ Cao'], activeTechs: 2, estTime: '30-40 phút' },
];

export const SERVICE_CATEGORIES = [
  { id: 'all', name: 'Tất cả dịch vụ' },
  { id: 'cleaning', name: 'Vệ sinh & Bảo dưỡng' },
  { id: 'repair', name: 'Sửa chữa sự cố' },
  { id: 'gas-install', name: 'Nạp gas & Di dời' },
];

export const SERVICES = [
  {
    id: 'vesinh-treotuong',
    category: 'cleaning',
    title: 'Vệ sinh máy lạnh treo tường',
    badge: 'Khuyên dùng định kỳ',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    price: 150000,
    priceDisplay: '150.000đ',
    unit: '/ bộ',
    duration: '35 - 45 phút',
    warranty: 'Bảo hành 30 ngày sạch mát',
    popular: true,
    description: 'Tháo vỏ, xịt rửa dàn lạnh áp lực cao, thông máng thoát nước, xịt rửa dàn nóng, kiểm tra đo gas miễn phí.',
    features: [
      'Xịt rửa dàn lạnh, màng lọc nano',
      'Vệ sinh máng và ống thoát nước ngưng',
      'Xịt rửa quạt và dàn nóng ngoài trời',
      'Khử khuẩn & khử mùi nấm mốc',
      'Đo kiểm tra áp suất gas miễn phí'
    ],
    recommendedFor: 'Máy lạnh dân dụng, phòng trọ, gia đình sử dụng 3-4 tháng chưa rửa'
  },
  {
    id: 'vesinh-amtran',
    category: 'cleaning',
    title: 'Vệ sinh máy lạnh âm trần / Áp trần',
    badge: 'Chuyên nghiệp văn phòng',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
    price: 250000,
    priceDisplay: '250.000đ',
    unit: '/ bộ',
    duration: '60 - 90 phút',
    warranty: 'Bảo hành 30 ngày',
    popular: false,
    description: 'Bảo dưỡng máy cassette 4 hướng thổi cho biệt thự, khách sạn, quán cafe, công ty. Bạt che chuyên dụng, không dơ trần.',
    features: [
      'Tháo mặt nạ, vệ sinh lưới lọc & bơm xả',
      'Treo bạt chuyên dụng chống tràn nước',
      'Xịt rửa cánh quạt lồng sóc công suất lớn',
      'Bảo dưỡng hệ thống bo mạch chống ẩm',
      'Kiểm tra dòng điện làm việc định mức'
    ],
    recommendedFor: 'Văn phòng, khách sạn, nhà hàng, quán cafe tại Đà Nẵng'
  },
  {
    id: 'sua-khonglanh',
    category: 'repair',
    title: 'Sửa máy lạnh không lạnh / Kém lạnh',
    badge: 'Bắt bệnh chuẩn xác',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-200',
    price: 200000,
    priceDisplay: 'Từ 200.000đ',
    unit: '/ lỗi',
    duration: '30 - 60 phút',
    warranty: 'Bảo hành 3 - 6 tháng',
    popular: true,
    description: 'Khắc phục triệt để tình trạng máy chạy nhưng chỉ ra gió quạt, block không chạy, yếu lạnh, phòng không mát.',
    features: [
      'Đo dòng máy nén (Block), kiểm tra tụ ngậm',
      'Kiểm tra cảm biến nhiệt độ (Sensor) dàn lạnh',
      'Kiểm tra rò rỉ xì giàn hoặc van tiết lưu',
      'Báo giá linh kiện chính hãng trước khi thay',
      'Bảo hành thay thế từ 3 đến 6 tháng'
    ],
    recommendedFor: 'Máy mở nhiệt độ 16-20°C nhưng phòng vẫn nóng nực'
  },
  {
    id: 'sua-chaynuoc',
    category: 'repair',
    title: 'Xử lý máy lạnh chảy nước, nhỏ giọt',
    badge: 'Xử lý dứt điểm 100%',
    badgeColor: 'bg-sky-100 text-sky-800 border-sky-200',
    price: 180000,
    priceDisplay: '180.000đ',
    unit: '/ máy',
    duration: '30 - 45 phút',
    warranty: 'Bảo hành 3 tháng không chảy lại',
    popular: true,
    description: 'Xử lý máy lạnh nhỏ giọt nước làm ướt giường nệm, tường nhà, sàn gỗ. Thông nghẹt ống thoát nước ngưng và cân chỉnh máng.',
    features: [
      'Thổi thông đường ống xả bằng máy áp lực',
      'Cân chỉnh lại độ dốc máng hứng nước',
      'Bọc bảo ôn chống đọng sương rỉ nước',
      'Tặng kèm xịt rửa sạch sẽ dàn lạnh',
      'Cam kết không ứ nước chảy ngược lại'
    ],
    recommendedFor: 'Máy lạnh chảy tong tỏng vào ban đêm gây mất ngủ'
  },
  {
    id: 'napgas-chinhhang',
    category: 'gas-install',
    title: 'Nạp gas máy lạnh R32 / R410A / R22',
    badge: 'Gas chuẩn Ấn Độ / Mỹ',
    badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-200',
    price: 150000,
    priceDisplay: 'Từ 150.000đ',
    unit: '/ lần nạp',
    duration: '20 - 30 phút',
    warranty: 'Bảo hành rò rỉ 3 tháng',
    popular: false,
    description: 'Kiểm tra áp suất PSI bằng đồng hồ kỹ thuật số. Nạp bổ sung gas chính hãng độ tinh khiết 99.9%, giúp máy lạnh sâu buốt.',
    features: [
      'Kiểm tra áp suất gas hiện tại miễn phí',
      'Dùng gas chuẩn nhập khẩu (R32, R410A, R22)',
      'Hàn vá điểm xì giắc co nếu có xì nhẹ',
      'Không pha tạp chất làm hỏng lốc máy',
      'Giúp máy tiết kiệm điện đến 30%'
    ],
    recommendedFor: 'Máy lạnh chạy lâu năm hoặc vừa di chuyển phòng bị hụt gas'
  },
  {
    id: 'sua-boardmach',
    category: 'repair',
    title: 'Sửa bo mạch điều khiển & Lỗi chớp đèn',
    badge: 'Chuyên gia Inverter',
    badgeColor: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    price: 250000,
    priceDisplay: 'Từ 250.000đ',
    unit: '/ bo',
    duration: '1 - 2 giờ',
    warranty: 'Bảo hành 6 tháng',
    popular: false,
    description: 'Xử lý lỗi chớp đèn timer, máy tự tắt mở, không nhận remote, báo mã lỗi Daikin (U4, L5...), Panasonic (H11, F99...).',
    features: [
      'Đọc chính xác mã lỗi hệ thống điều hòa',
      'Sửa vi mạch công suất Inverter chuyên sâu',
      'Thay linh kiện IC, tụ lọc chính hãng',
      'Chống thằn lằn, ẩm mốc xâm nhập bo mạch',
      'Test tải chạy thử 30 phút trước khi bàn giao'
    ],
    recommendedFor: 'Máy báo lỗi chớp đèn đỏ/cam liên tục không khởi động'
  },
  {
    id: 'thaolap-didon',
    category: 'gas-install',
    title: 'Tháo lắp & Di dời máy lạnh trọn gói',
    badge: 'Cẩn thận - An toàn',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-200',
    price: 350000,
    priceDisplay: 'Từ 350.000đ',
    unit: '/ bộ',
    duration: '60 - 90 phút',
    warranty: 'Bảo hành kỹ thuật 6 tháng',
    popular: false,
    description: 'Khóa nhốt gas an toàn không hao hụt, tháo dỡ gọn gàng, vận chuyển cẩn thận, khoan lắp đặt thẩm mỹ và hút chân không chuẩn.',
    features: [
      'Thu hồi khóa giữ toàn bộ gas trong lốc',
      'Tháo gỡ máy gọn gàng, bọc xốp bảo vệ',
      'Lắp đặt chuẩn thăng bằng, hút chân không',
      'Uốn ống đồng cẩn thận không gập méo',
      'Dọn dẹp sạch bụi khoan tường sau khi lắp'
    ],
    recommendedFor: 'Khách hàng chuyển nhà, chuyển phòng trọ, văn phòng'
  },
  {
    id: 'thay-block',
    category: 'repair',
    title: 'Thay thế Block (Máy nén) chính hãng',
    badge: 'Bảo hành dài hạn 12T',
    badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
    price: 800000,
    priceDisplay: 'Báo giá sau kiểm tra',
    unit: '/ máy',
    duration: '1 - 3 giờ',
    warranty: 'Bảo hành 12 tháng chính hãng',
    popular: false,
    description: 'Thay lốc máy lạnh mới 100% đúng công suất và hãng máy. Vệ sinh đường ống nitơ, thay cáp tiết lưu, hút chân không sâu.',
    features: [
      'Block chính hãng 1HP, 1.5HP, 2HP, 2.5HP',
      'Xúc rửa hệ thống bằng khí Nitơ chuyên dụng',
      'Thay phin lọc gas mới chống tắc ẩm',
      'Bảo hành tem điện tử 1 năm tận nhà',
      'Thu hồi block cũ giá hợp lý nếu khách muốn'
    ],
    recommendedFor: 'Máy lạnh bị kẹt cơ, chập cháy cuộn dây lốc máy nén'
  }
];

export const AC_TYPES = [
  { id: 'wall-inverter', name: 'Treo tường Inverter (Tiết kiệm điện)', popular: true },
  { id: 'wall-mono', name: 'Treo tường Mono (Máy thường tiêu chuẩn)', popular: true },
  { id: 'ceiling-cassette', name: 'Máy âm trần Cassette / Giấu trần' },
  { id: 'floor-standing', name: 'Máy áp trần hoặc Tủ đứng công suất lớn' },
];

export const AC_BRANDS = [
  'Daikin',
  'Panasonic',
  'Casper',
  'LG',
  'Toshiba',
  'Mitsubishi Electric',
  'Midea',
  'Samsung',
  'Gree',
  'Aqua',
  'Nagakawa',
  'Hãng khác'
];

export const COMMON_ISSUES = [
  'Máy lạnh không phả hơi lạnh / chỉ ra gió mát',
  'Máy bị chảy nước, rỉ nước dàn lạnh vào phòng',
  'Cần vệ sinh, bảo dưỡng định kỳ sạch sẽ',
  'Máy lạnh bật không lên / không nhận remote',
  'Máy kêu to, rung lắc dàn nóng hoặc dàn lạnh',
  'Máy chớp đèn báo lỗi (Timer chớp liên tục)',
  'Máy có mùi hôi mốc khó chịu khi bật',
  'Cần tháo lắp, di dời sang vị trí mới',
  'Kiểm tra và bơm nạp thêm gas'
];

export const REVIEWS = [
  {
    id: 1,
    name: 'Anh Trần Quốc Bảo',
    district: 'Quận Hải Châu, Đà Nẵng',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    service: 'Vệ sinh 2 máy lạnh Inverter Daikin',
    date: '2 ngày trước',
    comment: 'Gọi CoolCall lúc 13h30 trời nóng gay gắt, đúng 25 phút sau anh thợ tên Hùng đã có mặt mang đầy đủ máy móc xịt rửa, bạt che cẩn thận không để văng một giọt nước nào ra sàn gỗ. Máy sau khi rửa mát lạnh sâu buốt!'
  },
  {
    id: 2,
    name: 'Chị Mai Thu Thảo',
    district: 'Quận Sơn Trà, Đà Nẵng',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
    service: 'Sửa máy lạnh chảy nước & Bơm gas',
    date: '3 ngày trước',
    comment: 'Máy lạnh phòng ngủ bị chảy nước ròng ròng làm ướt hết nệm. Đặt lịch trên web CoolCall rất tiện, thợ báo giá trước 180k đúng y niêm yết, thông ống thoát nước và cân chỉnh lại máng là xong ngay. Rất hài lòng!'
  },
  {
    id: 3,
    name: 'Anh Lê Minh Trí (Chủ Homestay)',
    district: 'Quận Ngũ Hành Sơn, Đà Nẵng',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    service: 'Bảo dưỡng định kỳ 6 máy lạnh phòng khách',
    date: '1 tuần trước',
    comment: 'Homestay gần biển nên máy lạnh hay bị bám bụi và rỉ sét. Đội ngũ CoolCall làm việc rất chuyên nghiệp, có hóa đơn điện tử và bảo hành đàng hoàng. Giá giảm 10% khi làm từ máy thứ 2 trở lên.'
  },
  {
    id: 4,
    name: 'Chị Nguyễn Phương Vy',
    district: 'Quận Thanh Khê, Đà Nẵng',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
    service: 'Sửa lỗi bo mạch máy lạnh Panasonic chớp đèn H11',
    date: 'Hôm qua',
    comment: 'Kêu thợ khác họ phán thay máy mới tốn mấy triệu, may mắn gọi bên CoolCall gặp anh thợ lành nghề kiểm tra sửa lại giắc tín hiệu bo mạch chỉ hết 250k. Thợ trung thực, có tâm, sẽ ủng hộ dài lâu!'
  }
];

export const PRICING_LIST = [
  { item: 'Vệ sinh máy lạnh treo tường (dưới 2.5 HP)', price: '150.000đ / máy', note: 'Giảm 10% khi làm từ 2 máy trở lên', warranty: '30 ngày' },
  { item: 'Vệ sinh máy lạnh âm trần Cassette / Tủ đứng', price: '250.000đ - 350.000đ', note: 'Bạt che chuyên dụng, xịt rửa hóa chất', warranty: '30 ngày' },
  { item: 'Nạp bổ sung Gas R32 / R410A', price: '150.000đ - 250.000đ', note: 'Đo đồng hồ áp suất chuẩn, gas chính hãng', warranty: '3 tháng' },
  { item: 'Nạp bổ sung Gas R22 (máy đời cũ)', price: '120.000đ - 180.000đ', note: 'Nạp theo đúng PSI định mức máy', warranty: '3 tháng' },
  { item: 'Khắc phục máy chảy nước dàn lạnh', price: '180.000đ / lần', note: 'Thông ống, căn chỉnh máng, vệ sinh máy', warranty: '3 tháng' },
  { item: 'Thay tụ quạt dàn lạnh / dàn nóng', price: '200.000đ - 280.000đ', note: 'Tụ chính hãng đúng trị số microfarad', warranty: '6 tháng' },
  { item: 'Thay tụ đề Block (khởi động máy nén)', price: '250.000đ - 350.000đ', note: 'Linh kiện chất lượng cao', warranty: '6 tháng' },
  { item: 'Sửa bo mạch Inverter báo lỗi', price: '350.000đ - 650.000đ', note: 'Khảo sát và báo giá chi tiết trước khi làm', warranty: '6 tháng' },
  { item: 'Tháo dỡ máy lạnh nguyên bộ', price: '180.000đ - 200.000đ', note: 'Thu hồi nhốt gas cẩn thận 100%', warranty: '-' },
  { item: 'Lắp đặt máy lạnh treo tường', price: '250.000đ - 350.000đ', note: 'Khoan bắt giá đỡ, hút chân không tiêu chuẩn', warranty: '6 tháng' },
  { item: 'Công kiểm tra tại nhà (nếu khách không sửa)', price: '50.000đ', note: 'Miễn phí 100% nếu khách đồng ý sửa chữa', warranty: '-' },
];

export const FAQS = [
  {
    q: 'Bao lâu thì nên vệ sinh máy lạnh một lần?',
    a: 'Đối với hộ gia đình, nên vệ sinh 3 - 4 tháng/lần nếu sử dụng hàng ngày, hoặc 6 tháng/lần nếu ít dùng. Đối với văn phòng, nhà hàng, quán ăn hoặc nơi gần đường nhiều bụi tại Đà Nẵng, nên bảo dưỡng định kỳ 2 - 3 tháng/lần để máy làm lạnh sâu, tiết kiệm điện và tránh nấm mốc gây bệnh hô hấp.'
  },
  {
    q: 'Thợ CoolCall có mặt sau bao nhiêu phút từ khi đặt lịch?',
    a: 'CoolCall bố trí các đội thợ cơ động túc trực thường xuyên tại các trạm quận Hải Châu, Thanh Khê, Sơn Trà, Ngũ Hành Sơn, Cẩm Lệ và Liên Chiểu. Nếu quý khách chọn chế độ "Cần thợ gấp", thợ kỹ thuật gần nhất sẽ gọi xác nhận và có mặt tận nhà trong vòng 20 - 30 phút.'
  },
  {
    q: 'Nếu thợ đến kiểm tra nhưng tôi chưa muốn sửa thì có tốn phí không?',
    a: 'CoolCall miễn phí 100% chi phí kiểm tra và tư vấn nếu quý khách tiến hành sửa chữa. Trường hợp thợ đã đến tận nơi, tháo kiểm tra chi tiết và báo đúng giá niêm yết nhưng quý khách đổi ý chưa sửa, chúng tôi chỉ xin phép thu phí hỗ trợ xăng xe kiểm tra tượng trưng 50.000đ.'
  },
  {
    q: 'Dịch vụ sửa chữa và linh kiện có được bảo hành không?',
    a: 'Tất cả các dịch vụ sửa chữa và thay thế linh kiện tại CoolCall đều có dán tem bảo hành và kích hoạt bảo hành điện tử qua số điện thoại từ 3 đến 6 tháng (riêng block máy nén bảo hành 12 tháng). Trong thời gian bảo hành, nếu có bất kỳ trục trặc nào, thợ sẽ đến khắc phục miễn phí trong 30 phút.'
  },
  {
    q: 'Tôi có thể thanh toán bằng những hình thức nào?',
    a: 'Quý khách chỉ thanh toán sau khi máy đã chạy êm mát và khách hàng nghiệm thu hoàn toàn hài lòng. CoolCall hỗ trợ thanh toán linh hoạt qua Tiền mặt trực tiếp cho thợ, Quét mã QR chuyển khoản ngân hàng (VietQR) hoặc ví MoMo.'
  }
];

export const TECHNICIANS = [
  { name: 'Nguyễn Văn Hùng', exp: '8 năm kinh nghiệm', district: 'Phụ trách Q. Hải Châu & Thanh Khê', rating: 4.9, jobs: 1420 },
  { name: 'Trần Đình Trọng', exp: '6 năm kinh nghiệm', district: 'Phụ trách Q. Sơn Trà & Ngũ Hành Sơn', rating: 4.95, jobs: 980 },
  { name: 'Phạm Đức Thành', exp: '7 năm kinh nghiệm', district: 'Phụ trách Q. Cẩm Lệ & Liên Chiểu', rating: 4.88, jobs: 1150 }
];
