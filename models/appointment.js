const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
    doctor: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    appointmentTime: String,
    appointmentDuration: String,
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
