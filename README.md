# 🌱 Smart Farm IoT API - Hệ thống quản lý thiết bị & cảm biến

> **Node.js** + **Sequelize** + **PostgreSQL** + **Adafruit IO** + **Grafana** (phân tích)

Hệ thống API phục vụ quản lý thiết bị IoT, dữ liệu cảm biến, điều khiển tự động dựa trên ngưỡng và tích hợp với nền tảng Adafruit IO. Dữ liệu được lưu trữ trên PostgreSQL, sẵn sàng để trực quan hóa với Grafana.


## 📋 Mục lục

- [Giới thiệu](#-giới-thiệu)
- [Tính năng chính](#-tính-năng-chính)
- [Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [Cài đặt & Chạy dự án](#-cài-đặt--chạy-dự-án)
- [Seeding dữ liệu mẫu](#-seeding-dữ-liệu-mẫu)
- [Cấu trúc thư mục](#-cấu-trúc-thư-mục)
- [API Endpoints](#-api-endpoints)
- [Cơ chế hoạt động tự động](#-cơ-chế-hoạt-động-tự-động)
- [Tích hợp Grafana](#-tích-hợp-grafana)
- [Biến môi trường](#-biến-môi-trường)
- [Tác giả](#-tác-giả)


## 🚀 Giới thiệu

Dự án xây dựng **hệ thống API** quản lý thiết bị IoT trong nông nghiệp thông minh. Hệ thống cho phép:

- Quản lý **Zone** (khu vực) và **Device** (thiết bị)
- Ghi nhận dữ liệu từ cảm biến (nhiệt độ, độ ẩm, ánh sáng, độ ẩm đất)
- Điều khiển thiết bị (bật/tắt đèn, máy bơm)
- Tự động điều khiển dựa trên **ngưỡng cài đặt**
- Lưu trữ lịch sử điều khiển và dữ liệu cảm biến
- Hỗ trợ xác thực người dùng với JWT
- Tích hợp sẵn với **Grafana** để phân tích và dashboard


## ✨ Tính năng chính

| Module | Chức năng |
|--------|-----------|
| **Zone** | CRUD khu vực, lấy danh sách thiết bị theo zone |
| **Device** | CRUD thiết bị, lọc theo zone, loại, trạng thái |
| **Sensor Reading** | Lưu dữ liệu cảm biến, lọc theo nhiều điều kiện (device, thời gian, khoảng giá trị) |
| **Device Control** | Ghi nhận lịch sử điều khiển, cập nhật trạng thái thiết bị |
| **Threshold** | Quản lý ngưỡng cảnh báo/điều khiển tự động |
| **Alert** | Tạo và quản lý cảnh báo, đánh dấu đã xử lý |
| **Authentication** | Đăng ký, đăng nhập với JWT |
| **Adafruit Integration** | Lấy dữ liệu từ Adafruit mỗi 5 giây, điều khiển thiết bị từ xa |
| **Seeding** | Script tạo dữ liệu giả với `@faker-js/faker` cho mục đích kiểm thử |
| **Phân tích** | Dữ liệu được lưu trên PostgreSQL, dễ dàng kết nối với Grafana |


## 🛠 Công nghệ sử dụng

- **Node.js** v16+
- **Express.js** – framework web
- **Sequelize** – ORM (hỗ trợ PostgreSQL)
- **PostgreSQL** – cơ sở dữ liệu chính
- **Axios** – gọi API Adafruit
- **jsonwebtoken** – xác thực
- **dotenv** – quản lý biến môi trường
- **Adafruit IO** – nền tảng IoT
- **Grafana** – trực quan hóa dữ liệu (không bắt buộc)
- **@faker-js/faker** – tạo dữ liệu giả (chỉ dùng trong dev)


## ⚙️ Cài đặt & Chạy dự án

### 1. Clone repository
