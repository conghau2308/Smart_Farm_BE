const axios = require('axios');

// API key của bạn từ Adafruit
const { AIO_KEY } = process.env;

// URL của API Adafruit
const apiUrl = 'https://io.adafruit.com/api/v2/hoangvyne/feeds/led/data';

// Hàm điều khiển bật/tắt đèn LED
// true sẽ bật đèn, false sẽ tắt đèn
const toggleLight = async (isLightOn) => {
  try {
    const response = await axios.post(
      apiUrl,
      { value: isLightOn ? '1' : '0' }, // Gửi giá trị "0" hoặc "100"
      {
        headers: {
          'Content-Type': 'application/json',
          'X-AIO-Key': AIO_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error controlling light:", error);
    throw new Error("Không thể điều khiển đèn");
  }
};

// Hàm kiểm tra trạng thái đèn LED
const getLightStatus = async () => {
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        'X-AIO-Key': AIO_KEY,
      },
    });
    return response.data[0]?.value === "1"; // Kiểm tra trạng thái đèn (ON/OFF)
  } catch (error) {
    console.error("Error fetching light status:", error);
    throw new Error("Lỗi khi lấy trạng thái đèn");
  }
};

// Export các hàm để sử dụng ở nơi khác
module.exports = {
  toggleLight,
  getLightStatus
};
