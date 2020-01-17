var mongoose = require("mongoose");

var appointmentSchema = new mongoose.Schema({
    doctor: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    appointmentTime: String,
    appointmentDate: String,
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }
});

module.exports = mongoose.model("Appointment", appointmentSchema);
