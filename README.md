# Phần Mềm Quản Lý Spa Mini

Phần mềm quản lý lịch hẹn và khách hàng cho spa mini, được phát triển bằng HTML, CSS và JavaScript thuần.

## Tính năng

### 1. Quản lý khách hàng
- Thêm/xóa/sửa thông tin khách hàng: Họ tên, SĐT, ngày sinh, địa chỉ, ghi chú
- Tìm kiếm nhanh theo tên, số điện thoại
- Xem lịch sử đến spa của từng khách hàng

### 2. Quản lý lịch hẹn
- Tạo lịch hẹn theo ngày/giờ với nhân viên cụ thể
- Cảnh báo trùng lịch khi đặt lịch hẹn
- Hiển thị lịch hẹn theo dạng bảng (tuần/ngày/danh sách)

### 3. Quản lý nhân viên
- Thêm nhân viên, xem và chỉnh sửa thông tin
- Phân ca làm việc theo ngày
- Theo dõi số lượng ca làm việc

### 4. Thống kê cơ bản
- Số lượng khách theo ngày/tuần/tháng
- Lịch sử khách hàng quay lại
- Thống kê dịch vụ được sử dụng nhiều nhất

## Cài đặt và Sử dụng

### Yêu cầu
- Trình duyệt web hiện đại (Chrome, Firefox, Edge, Safari)
- Không cần cài đặt bất kỳ dependencies nào

### Cách cài đặt
1. Tải toàn bộ source code về máy
2. Mở file `index.html` bằng trình duyệt web

### Tài khoản demo
- Username: admin
- Password: admin123

## Cấu trúc dự án
```
/
├── index.html          # Trang đăng nhập
├── dashboard.html      # Trang tổng quan
├── customers.html      # Trang quản lý khách hàng
├── appointments.html   # Trang quản lý lịch hẹn
├── staff.html          # Trang quản lý nhân viên
├── statistics.html     # Trang thống kê
├── css/
│   ├── style.css       # CSS chung
│   ├── dashboard.css   # CSS cho trang tổng quan
│   ├── customers.css   # CSS cho trang khách hàng
│   ├── appointments.css # CSS cho trang lịch hẹn
│   ├── staff.css       # CSS cho trang nhân viên
│   └── statistics.css  # CSS cho trang thống kê
├── js/
│   ├── login.js        # JavaScript cho trang đăng nhập
│   ├── dashboard.js    # JavaScript cho trang tổng quan
│   ├── customers.js    # JavaScript cho trang khách hàng
│   ├── appointments.js # JavaScript cho trang lịch hẹn
│   ├── staff.js        # JavaScript cho trang nhân viên
│   └── statistics.js   # JavaScript cho trang thống kê
└── img/
    └── avatar-default.png # Ảnh avatar mặc định
```

## Lưu ý
- Đây là phiên bản demo nên dữ liệu được lưu trữ tạm thời trong localStorage của trình duyệt
- Trong môi trường thực tế, cần kết nối với backend và cơ sở dữ liệu để lưu trữ dữ liệu

## Hướng dẫn sử dụng

1. **Đăng nhập**
   - Sử dụng tài khoản demo để đăng nhập
   - Username: admin, Password: admin123

2. **Quản lý khách hàng**
   - Tạo khách hàng mới bằng cách nhấn nút "Thêm khách hàng"
   - Tìm kiếm khách hàng bằng thanh tìm kiếm
   - Sửa/Xóa/Xem chi tiết khách hàng bằng các nút tương ứng

3. **Quản lý lịch hẹn**
   - Xem lịch hẹn theo tuần/ngày/danh sách
   - Thêm lịch hẹn mới bằng cách nhấn nút "Thêm lịch hẹn"
   - Chọn khách hàng, dịch vụ, nhân viên và thời gian cho lịch hẹn

4. **Quản lý nhân viên**
   - Thêm nhân viên mới
   - Xem thống kê số ca làm việc
   - Quản lý lịch làm việc của nhân viên

5. **Thống kê**
   - Xem biểu đồ thống kê khách hàng
   - Xem thống kê dịch vụ phổ biến
   - Xem danh sách top khách hàng thường xuyên

## Liên hệ hỗ trợ

Nếu bạn cần hỗ trợ hoặc có câu hỏi về sản phẩm, vui lòng liên hệ qua email: hotro@spamini.vn 