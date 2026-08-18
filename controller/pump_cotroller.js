const axios = require('axios');

// API key của bạn từ Adafruit
const { AIO_KEY } = process.env;

// URL của API Adafruit để điều khiển máy bơm
const apiUrl = "https://io.adafruit.com/api/v2/hoangvyne/feeds/may-bom/data";

// Hàm điều khiển bật/tắt máy bơm
// true sẽ bật máy bơm, false sẽ tắt máy bơm
const togglePump = async (isPumpOn) => {
  try {
    const response = await axios.post(
      apiUrl,
      { value: isPumpOn ? '1' : '0' },  // Gửi giá trị "1" để bật, "0" để tắt
      {
        headers: {
          'Content-Type': 'application/json',
          'X-AIO-Key': AIO_KEY,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error controlling pump:", error);
    throw new Error("Không thể điều khiển máy bơm");
  }
};

// Hàm kiểm tra trạng thái máy bơm
const getPumpStatus = async () => {
  try {
    const response = await axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        'X-AIO-Key': AIO_KEY,
      },
    });
    return response.data[0]?.value === "1";  // Kiểm tra trạng thái máy bơm (ON/OFF)
  } catch (error) {
    console.error("Error fetching pump status:", error);
    throw new Error("Lỗi khi lấy trạng thái máy bơm");
  }
};

// Export các hàm để sử dụng ở nơi khác
module.exports = {
  togglePump,
  getPumpStatus
};
