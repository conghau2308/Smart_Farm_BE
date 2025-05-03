const user_routes = require('./user_routes');
const zone_routes = require("./user_routes");
const device_routes = require("./device_routes");
const sensor_reading_routes = require("./sensor_reading_routes");
const alert_routes = require("./alert_routes");
const device_threshold_routes = require ("./device_threshold_routes");
const device_control_routes = require("./device_control_routes");


const routes = (app) => {
    app.use('/User', user_routes);
    app.use('/Zone', zone_routes);
    app.use('/Device', device_routes );
    app.use('/Sensor-reading', sensor_reading_routes);
    app.use('/Alert', alert_routes);
    app.use('/Device-threshold', device_threshold_routes);
    app.use('/Device-control', device_control_routes);
   
}

module.exports = routes;