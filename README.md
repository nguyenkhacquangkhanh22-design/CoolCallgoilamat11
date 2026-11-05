# SmartFix - Dịch Vụ Đặt Thợ Sửa Chữa & Vệ Sinh Máy Lạnh Trực Tuyến (Đà Nẵng)

Ứng dụng web Single Page Application (SPA) hoàn chỉnh được phát triển bằng **React 19**, **Vite** và **Tailwind CSS**, cung cấp dịch vụ đặt thợ điện lạnh tận nhà nhanh chóng trong vòng 30 phút tại TP. Đà Nẵng.

---

## 🎨 Bảng Màu Chủ Đạo (Color Palette)

- **Xanh dương đậm (Navy / Deep Blue - `bg-blue-950`, `bg-blue-900`, `text-blue-950`)**: Sử dụng cho Header, Footer, tiêu đề lớn, thanh điều hướng chính, thẻ nổi bật và các nút kêu gọi hành động (CTA) chủ đạo.
- **Xanh dương nhạt (Sky / Light Blue - `bg-blue-50`, `bg-blue-100`, `border-blue-200`, `text-blue-700`)**: Dùng cho màu nền phụ, badge trạng thái, viền thẻ dịch vụ, chip gợi ý nhanh và hiệu ứng hover tương tác.
- **Nền trắng sạch sẽ (Clean White - `bg-white`)**: Tạo không gian thoáng đãng, hiện đại, tăng tính chuyên nghiệp và độ tin cậy.
- **Điểm nhấn màu sắc hỗ trợ**: Xanh ngọc lục bảo (Emerald) cho cam kết bảo hành và tình trạng thợ trực tuyến, Hổ phách (Amber) cho đánh giá sao và huy hiệu ưu đãi.

---

## 🚀 Các Tính Năng & Thành Phần Giao Diện Chính

### 1. Header / Navigation
- **Logo SmartFix**: Biểu tượng kết hợp bông tuyết làm lạnh & cờ-lê kỹ thuật chuyên nghiệp.
- **Slogan**: *"Thợ sửa máy lạnh tận tâm - Có mặt sau 30 phút"*.
- **Thanh thông báo thời gian thực**: Hiển thị số lượng thợ đang trực sẵn tại các quận Đà Nẵng, cam kết tốc độ và hotline 24/7.
- **Menu điều hướng**: Dịch vụ, Bảng giá, Quy trình 3 bước, Khu vực phục vụ, Đánh giá, Hỏi đáp.
- **Nút "Đặt thợ ngay" & Hotline khẩn cấp**: Nổi bật với hiệu ứng xung nhịp (pulse badge).
- **Mobile Menu Drawer**: Tương thích 100% trên thiết bị di động.

### 2. Hero Section (Màn Hình Chào Mừng)
- Tiêu đề bắt mắt, truyền tải giá trị cam kết tốc độ và độ tin cậy tại Đà Nẵng.
- **Thanh tìm kiếm nhanh dịch vụ**:
  - Chọn nhanh quận/huyện tại Đà Nẵng (Hải Châu, Thanh Khê, Sơn Trà, Ngũ Hành Sơn, Cẩm Lệ, Liên Chiểu, Hòa Vang).
  - Ô nhập dịch vụ cần tìm (Vệ sinh, Không lạnh, Chảy nước, Bơm gas...).
  - Nút **"Tìm thợ ngay"** màu xanh dương đậm nổi bật.
  - Các chip từ khóa tìm kiếm nhanh một chạm (Vệ sinh máy lạnh 150k, Máy bị chảy nước 180k...).
- **Khu vực minh họa kỹ thuật viên**: Card đồ họa chuyên nghiệp thể hiện thợ lành nghề có chứng chỉ, thời gian điều phối ước tính và điểm đánh giá 4.9/5 ⭐ từ hơn 2.450+ khách hàng.

### 3. Danh Sách Dịch Vụ (Services Grid)
- Bộ lọc dịch vụ đa tầng: *Tất cả*, *Vệ sinh & Bảo dưỡng*, *Sửa chữa sự cố*, *Nạp gas & Di dời*.
- Các thẻ dịch vụ trực quan:
  1. **Vệ sinh máy lạnh treo tường** (150.000đ/bộ)
  2. **Vệ sinh máy lạnh âm trần / Áp trần** (250.000đ/bộ)
  3. **Khắc phục máy lạnh không lạnh / Kém lạnh** (Từ 200.000đ)
  4. **Xử lý máy lạnh chảy nước, nhỏ giọt** (180.000đ)
  5. **Bơm gas máy lạnh R32 / R410A / R22** (Từ 150.000đ)
  6. **Sửa bo mạch điều khiển & Lỗi chớp đèn** (Từ 250.000đ)
  7. **Tháo lắp & Di dời máy lạnh trọn gói** (Từ 350.000đ)
  8. **Thay thế Block máy nén chính hãng** (Bảo hành 12 tháng)
- Mỗi thẻ gồm: Icon trực quan, mô tả chi tiết, giá tiền ước tính, danh sách công việc kiểm tra (checklist), thời gian thi công, chính sách bảo hành và nút **"Đặt gói này"** (tự động điền vào form và cuộn mượt xuống vị trí đặt lịch).

### 4. Quy Trình Đặt Thợ 3 Bước Tiện Lợi
- **Bước 1**: Chọn Dịch Vụ & Thời Gian (chọn giờ hẹn hoặc yêu cầu thợ gấp sau 30 phút).
- **Bước 2**: Nhập Địa Chỉ Tại Đà Nẵng (hệ thống tự động kết nối thợ cơ động gần nhất).
- **Bước 3**: Xác Nhận & Thợ Đến Tận Nhà (kiểm tra miễn phí, báo giá trước, nghiệm thu hài lòng mới thanh toán).

### 5. Form Đặt Lịch Thợ Sửa Nhanh (Booking Form)
- **Họ tên & Số điện thoại**: Có kiểm tra định dạng số điện thoại Việt Nam chuẩn.
- **Quận / Huyện Đà Nẵng & Địa chỉ chi tiết**: Tự động thông báo trạm kỹ thuật gần nhất và thời gian thợ tiếp cận.
- **Loại máy & Hãng máy**: Inverter, Mono thông thường, Âm trần cassette, Tủ đứng; các thương hiệu Daikin, Panasonic, Casper, LG, Toshiba, Mitsubishi...
- **Số lượng máy**: Tự động áp dụng **giảm giá 10%** khi đặt từ 2 máy trở lên.
- **Tình trạng hư hỏng**: Có sẵn các chip tình trạng thông dụng bấm chọn nhanh (Không lạnh, Chảy nước, Hôi mốc, Báo lỗi đèn đỏ...).
- **Khung giờ hẹn**: Tùy chọn *⚡ Cần thợ gấp ngay (20 - 30 phút)* hoặc *📅 Đặt lịch hẹn trước* (chọn ngày & khung giờ sáng, trưa, chiều, tối).
- **Bảng tóm tắt & Tạm tính chi phí thời gian thực**: Hiển thị đơn giá, giảm giá, phí kiểm tra tại nhà 0đ.
- **Nút "Xác nhận đặt lịch ngay"**: Kèm hiệu ứng loading xử lý chuyên nghiệp.
- **Popup xác nhận đặt lịch thành công (Modal + Pháo hoa Confetti)**:
  - Hiển thị Mã đơn đặt thợ (VD: `#CC-8942`) có nút sao chép.
  - Phân bổ thông tin kỹ thuật viên phụ trách, số điện thoại thợ và thời gian dự kiến có mặt.
  - Tóm tắt đầy đủ địa chỉ, dịch vụ và cam kết bảo hành.

### 6. Bảng Giá Minh Bạch (Pricing Table)
- Bảng giá chi tiết tất cả các linh kiện thay thế, công vệ sinh, nạp gas, sửa bo mạch kèm thời hạn bảo hành minh bạch.
- Có ô tìm kiếm nhanh hạng mục.

### 7. Khu Vực Phục Vụ Tại Đà Nẵng (Coverage Network)
- Bản đồ trạm kỹ thuật tại các quận: Hải Châu, Thanh Khê, Sơn Trà, Ngũ Hành Sơn, Cẩm Lệ, Liên Chiểu, Hòa Vang.
- Bấm chọn quận để tự động điền vào form đặt lịch.

### 8. Đánh Giá Khách Hàng & FAQ
- Đánh giá chân thực từ khách hàng tại Đà Nẵng kèm avatar, số sao và gói dịch vụ đã thực hiện.
- Khối câu hỏi thường gặp (Accordion) giải đáp mọi thắc mắc của khách hàng.

### 9. Footer Hoàn Chỉnh
- Nền xanh đậm chữ trắng (`bg-blue-950`).
- Danh sách 5 trạm kỹ thuật trên các trục đường chính tại Đà Nẵng.
- Hotline cứu hộ điện lạnh 24/7: **0905.888.666**.
- Giờ làm việc, email, chính sách bảo hành và bản quyền SmartFix.

### 10. Floating Actions (Hành động nổi)
- Nút gọi khẩn cấp hotline và nút đặt thợ nhanh ghim ở góc màn hình.
- Thanh hành động cố định ở đáy màn hình trên điện thoại di động giúp khách hàng bấm gọi hoặc đặt lịch trong 1 chạm.

---

## 🛠️ Hướng Dẫn Cài Đặt & Chạy Ứng Dụng

### Yêu cầu môi trường:
- Node.js version 18+ (hoặc mới hơn)
- npm hoặc yarn

### Cài đặt và khởi chạy:
```bash
# 1. Cài đặt các thư viện phụ thuộc
npm install

# 2. Khởi chạy môi trường phát triển (Dev Server)
npm run dev

# 3. Kiểm tra chất lượng mã nguồn
npm run lint

# 4. Đóng gói bản Production
npm run build
```
