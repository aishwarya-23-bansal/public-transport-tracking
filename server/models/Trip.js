const mongoose = require("mongoose");

const tripSchema = new mongoose.Schema(
    {
        route: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Route",
            required: true
        },
        operator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        journeyDate: {
            type: Date,
            required: true
        },
        startTime: {
            type: String,
            required: true
        },
        endTime: {
            type: String,
            required: true
        },
        status: {
            type: String,
            enum: ["Scheduled", "In Progress", "Completed", "Cancelled"],
            default: "Scheduled"
        },
        passengerCount: {
            type: Number,
            default: 0,
            min: 0
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Trip", tripSchema);