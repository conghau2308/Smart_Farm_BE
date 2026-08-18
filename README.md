# 🌱 Smart Farm IoT API - Hệ thống quản lý thiết bị & cảm biến

> **Node.js** + **Sequelize** + **PostgreSQL** + **Adafruit IO** + **Grafana** (phân tích)

Hệ thống API phục vụ quản lý thiết bị IoT, dữ liệu cảm biến, điều khiển tự động dựa trên ngưỡng và tích hợp với nền tảng Adafruit IO. Dữ liệu được lưu trữ trên PostgreSQL, sẵn sàng để trực quan hóa với Grafana.

---

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

---

## 🚀 Giới thiệu

Dự án xây dựng **hệ thống API** quản lý thiết bị IoT trong nông nghiệp thông minh. Hệ thống cho phép:

- Quản lý **Zone** (khu vực) và **Device** (thiết bị)
- Ghi nhận dữ liệu từ cảm biến (nhiệt độ, độ ẩm, ánh sáng, độ ẩm đất)
- Điều khiển thiết bị (bật/tắt đèn, máy bơm)
- Tự động điều khiển dựa trên **ngưỡng cài đặt**
- Lưu trữ lịch sử điều khiển và dữ liệu cảm biến
- Hỗ trợ xác thực người dùng với JWT
- Tích hợp sẵn với **Grafana** để phân tích và dashboard

---

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

---

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

---

## ⚙️ Cài đặt & Chạy dự án

### 1. Clone repository

```bash
git clone <repository-url>
cd smart-farm-api
```

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Cấu hình biến môi trường

Tạo file `.env` ở thư mục gốc:

```env
# Cấu hình database (PostgreSQL)
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=smart_farm_db
DB_PORT=5432

# Adafruit IO
AIO_KEY=your_adafruit_aio_key

# JWT Secret
JWT_SECRET=your_secret_key

# Port
PORT=5000
```

> **Lưu ý:** Đảm bảo PostgreSQL đã được cài đặt và tạo database với tên `smart_farm_db`.

### 4. Tạo bảng và schema

Khi khởi động server lần đầu, Sequelize sẽ tự động tạo bảng (nếu chưa có) dựa trên models.

Hoặc bạn có thể chạy lệnh đồng bộ thủ công nếu dự án có script riêng.

### 5. Khởi động server

```bash
# Development (với nodemon)
npm run dev

# Production
npm start
```

Server sẽ chạy tại `http://localhost:5000`.

---

## 🌱 Seeding dữ liệu mẫu

Dự án cung cấp script `scripts/seed.js` để tạo dữ liệu giả cho các bảng, hữu ích cho việc kiểm thử và phát triển.

### Chạy seed

```bash
node scripts/seed.js
```

Script sẽ:

- Xóa tất cả bảng hiện có (`force: true`) và tạo lại.
- Tạo **20 user**, **5 zone**, **6 thiết bị** cố định (nhiệt độ, ánh sáng, độ ẩm đất, máy bơm, đèn LED, độ ẩm không khí).
- Tạo ngưỡng cho máy bơm và đèn LED (`device_id = 4` và `5`).
- Tạo **200 bản ghi cảm biến** ngẫu nhiên.
- Tạo bản ghi điều khiển cho thiết bị 4 và 5 (mặc định `manual`).
- Tạo **50 cảnh báo** từ dữ liệu cảm biến.

> ⚠️ **Cảnh báo:** Script này xóa sạch dữ liệu cũ. Chỉ nên dùng trong môi trường phát triển.

---

## 📁 Cấu trúc thư mục

```text
├── config/
│   └── db.js                         # Kết nối Sequelize (PostgreSQL)
├── controllers/
│   ├── alert_controller.js
│   ├── device_controller.js
│   ├── device_control_controller.js
│   ├── device_threshold_controller.js
│   ├── sensor_reading_controller.js
│   ├── zone_controller.js
│   ├── auth_controller.js
│   ├── led_controller.js
│   └── pump_controller.js
├── models/
│   ├── devices_model.js
│   ├── zones_model.js
│   ├── sensor_reading_model.js
│   ├── temp_sensor_reading_model.js   # Bảng tạm lấy dữ liệu mới nhất
│   ├── device_control_model.js
│   ├── device_threshold_model.js
│   ├── alert_model.js
│   └── user_model.js
├── routes/
│   └── index.js                       # Định nghĩa các route
├── middleware/
│   └── auth.js                        # Xác thực token
├── services/
│   └── adafruit_service.js            # Fetch dữ liệu từ Adafruit (chạy định kỳ)
├── scripts/
│   └── seed.js                        # Script tạo dữ liệu mẫu
├── .env
├── package.json
└── server.js                          # Entry point
```

---

## 📌 API Endpoints

### 🔐 Authentication

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| `POST` | `/api/auth/register` | Đăng ký tài khoản (username, password, email, phone) |
| `POST` | `/api/auth/login` | Đăng nhập, nhận JWT token |
| `POST` | `/api/auth/logout` | Đăng xuất (client xóa token) |

---

### 🏷 Zone

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| `POST` | `/api/zones` | Tạo zone mới |
| `GET` | `/api/zones` | Lấy tất cả zone |
| `GET` | `/api/zones/name/:name` | Lấy zone theo tên |
| `PUT` | `/api/zones/name/:name` | Cập nhật zone theo tên |
| `DELETE` | `/api/zones/name/:name` | Xóa zone theo tên |
| `GET` | `/api/zones/:name/devices` | Lấy danh sách thiết bị trong zone |

---

### 📟 Device

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| `POST` | `/api/devices` | Tạo thiết bị mới |
| `GET` | `/api/devices` | Lấy danh sách (lọc theo zone, type, status) |
| `GET` | `/api/devices/name/:name` | Lấy thiết bị theo tên |
| `PUT` | `/api/devices/name/:name` | Cập nhật thiết bị theo tên |
| `PUT` | `/api/devices/device_id/:device_id` | Cập nhật thiết bị theo ID |
| `DELETE` | `/api/devices/name/:name` | Xóa thiết bị theo tên |

---

### 📊 Sensor Reading

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| `POST` | `/api/readings` | Tạo bản ghi cảm biến mới |
| `GET` | `/api/readings` | Lấy dữ liệu cảm biến (lọc theo `device_ids`, `data_type`, `value_min`, `value_max`, `from`, `to`) |

**Query params mẫu:**

```text
GET /api/readings?device_ids=1,2,3&data_type=temperature&value_min=20&value_max=30&from=2025-01-01&to=2025-01-31
```

> 💡 Dữ liệu được lấy từ bảng `temp_sensor_reading` (bảng tạm) để tối ưu truy vấn.

---

### 🎮 Device Control

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| `POST` | `/api/controls` | Tạo lệnh điều khiển mới |
| `GET` | `/api/controls/history` | Lấy lịch sử điều khiển (theo `device_id`) |
| `PUT` | `/api/controls/update-state/:id` | Cập nhật trạng thái thiết bị (ghi log vào `device_controls`) |
| `PUT` | `/api/controls/update/:device_id` | Cập nhật control (mode, status, updated_by) |
| `GET` | `/api/controls/device` | Lấy lịch sử điều khiển theo `device_id` (trả về 404 nếu không có) |

---

### ⚖️ Threshold

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| `POST` | `/api/thresholds` | Tạo ngưỡng mới |
| `GET` | `/api/thresholds` | Lấy tất cả ngưỡng |
| `GET` | `/api/thresholds/search` | Lọc theo `device_id`, `parameter` |
| `PUT` | `/api/thresholds/:id` | Cập nhật ngưỡng theo ID |
| `PUT` | `/api/thresholds/device/:device_id` | Cập nhật ngưỡng theo `device_id` |
| `DELETE` | `/api/thresholds/:id` | Xóa ngưỡng |

---

### 🔔 Alert

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| `POST` | `/api/alerts` | Tạo cảnh báo mới |
| `GET` | `/api/alerts` | Lọc alert (`is_resolved`, `alert_type`) |
| `PUT` | `/api/alerts/:id/resolve` | Đánh dấu đã xử lý |

---

### 💡 Điều khiển thiết bị (Adafruit)

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| `POST` | `/api/led/toggle` | Bật/tắt đèn LED (gửi `value=100` hoặc `0`) |
| `GET` | `/api/led/status` | Lấy trạng thái đèn |
| `POST` | `/api/pump/toggle` | Bật/tắt máy bơm (`1`/`0`) |
| `GET` | `/api/pump/status` | Lấy trạng thái máy bơm |

---

## 🤖 Cơ chế hoạt động tự động

Hệ thống tự động gọi API Adafruit mỗi 5 giây (trong `services/adafruit_service.js`) và xử lý:

1. Lấy dữ liệu từ 6 feed: `temp`, `lux`, `soil_moisture`, `pump_status`, `led_status`, `humidity`.
2. Lưu dữ liệu vào bảng `sensor_readings` và cập nhật bảng `temp_sensor_reading` (lưu giá trị mới nhất).
3. Với **LED (`device_id = 5`)**:
   - Nếu `mode = 'auto'`, so sánh giá trị ánh sáng với ngưỡng `max_value`.
   - Nếu `lux < threshold` → bật LED (gửi `value=100` lên Adafruit).
   - Nếu `lux >= threshold` → tắt LED.
4. Với **Máy bơm (`device_id = 4`)**:
   - Nếu `mode = 'auto'`, so sánh độ ẩm đất với ngưỡng.
   - Nếu `soil_moisture < threshold` → bật máy bơm.
   - Nếu `soil_moisture >= threshold` → tắt máy bơm.

> ⚠️ **Lưu ý:** Biến `previousSensorData` được dùng để tránh gửi lệnh điều khiển lặp lại liên tục khi giá trị không đổi.

---

## 📈 Tích hợp Grafana

Dữ liệu được lưu trên PostgreSQL nên bạn có thể dễ dàng kết nối với **Grafana** để tạo dashboard trực quan.

### Các bước nhanh

1. Cài đặt Grafana (nếu chưa có).
2. Thêm **PostgreSQL** làm data source.
3. Cấu hình kết nối tới database `smart_farm_db`.
4. Tạo các truy vấn SQL để hiển thị biểu đồ nhiệt độ, độ ẩm, trạng thái thiết bị, v.v.

**Ví dụ query:**

```sql
SELECT recorded_at AS time, value
FROM sensor_readings
WHERE device_id = 1 AND data_type = 'temperature'
ORDER BY recorded_at DESC
LIMIT 100;
```

Grafana giúp theo dõi xu hướng, thiết lập cảnh báo và phân tích dữ liệu theo thời gian thực.

---

## 🔑 Biến môi trường

| Tên biến | Mô tả | Ví dụ |
|----------|-------|-------|
| `DB_HOST` | Host PostgreSQL | `localhost` |
| `DB_USER` | Tên đăng nhập DB | `postgres` |
| `DB_PASSWORD` | Mật khẩu DB | `yourpassword` |
| `DB_NAME` | Tên database | `smart_farm_db` |
| `DB_PORT` | Cổng PostgreSQL (mặc định 5432) | `5432` |
| `AIO_KEY` | Adafruit IO Key | `aio_xxxxx` |
| `JWT_SECRET` | Secret cho JWT | `mySuperSecretKey` |
| `PORT` | Port chạy server | `5000` |

> ⚠️ Không commit file `.env` chứa thông tin bí mật lên GitHub. Nên thêm `.env` vào `.gitignore`.

---

## 👨‍💻 Tác giả

**Võ Công Hậu** – [GitHub](https://github.com/conghau2308)

---

## 📄 License

MIT © 2025
