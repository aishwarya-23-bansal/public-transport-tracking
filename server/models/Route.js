const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema(
    {
        routeNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        source: {
            type: String,
            required: true,
            trim: true
        },

        destination: {
            type: String,
            required: true,
            trim: true
        },

        stops: [
            {
                type: String,
                trim: true
            }
        ],

        distance: {
            type: Number,
            required: true,
            min: 0
        },

        duration: {
            type: Number,
            required: true,
            min: 0
        },

        fare: {
            type: Number,
            required: true,
            min: 0
        },

        status: {
            type: String,
            enum: ["Active", "Inactive"],
            default: "Active"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Route", routeSchema);