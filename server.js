const express = require("express");
const cors = require("cors");
const path = require("path");
const routes = require("./routes");
const userRoutes = require("./routes/user_routes");
const zoneRoutes = require("./routes/zone_routes");
const deviceRoutes = require("./routes/device_routes");
const sensor_readingRoutes = require("./routes/sensor_reading_routes");
const alertRoutes = require("./routes/alert_routes");
const device_thresholdRoutes = require("./routes/device_threshold_routes");
const device_controlRoutes = require("./routes/device_control_routes");
const ledRoutes = require("./routes/led_routes");
const pumpRoutes = require("./routes/pump_routes");
const sequelize = require("./config/db");
require("dotenv").config();

const app = express();
const port = 3001;

require("./controller/sensorDataFetcher");

if (process.env.SYNC === "true") {
  console.log("🔄 SYNC === 'true' → đống bộ schema…");
  require("./model/user_model");
  require("./model/zones_model");
  require("./model/devices_model");
  require("./model/device_threshold_model");
  require("./model/sensor_reading_model");
  require("./model/device_control_model");
  require("./model/alert_model");
  sequelize.sync({ force: true }); // biến SYNC chỉ cần tạo bảng, không force xóa
  console.log(" Database synchronized");
} else {
  console.log(" SYNC !== 'true' → bỏ qua sync");
}
if (process.env.SEED === "true") {
  console.log(" Seeding…");
  require("./scripts/seed")();
  console.log(" Seeding done");
} else {
  console.log(" Skip seeding");
}

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use("/users", userRoutes);
app.use("/zone", zoneRoutes);
app.use("/device", deviceRoutes);
app.use("/sensor-reading", sensor_readingRoutes);
app.use("/alert", alertRoutes);
app.use("/device_threshold", device_thresholdRoutes);
app.use("/device-control",device_controlRoutes);
app.use("/led", ledRoutes);
app.use("/pump", pumpRoutes);
routes(app);
app.listen(port, () => {
  console.log("Server is running on port " + port);
});
