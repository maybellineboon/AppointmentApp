var mongoose = require("mongoose");

var appointmentSchema = new mongoose.Schema({
    phoneNumber: String,
    appointmentTime: String,
    appointmentDate: String
});

module.exports = mongoose.model("Appointment", appointmentSchema);
