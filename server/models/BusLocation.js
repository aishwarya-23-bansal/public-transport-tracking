const mongoose = require("mongoose");

const busLocationSchema = new mongoose.Schema(
  {
    busNumber: {
      type: String,
      required: true,
      trim: true
    },
    route: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Route",
      required: true
    },
    startLatitude: { type: Number, required: true },
    startLongitude: { type: Number, required: true },
    endLatitude: { type: Number, required: true },
    endLongitude: { type: Number, required: true },
    progressPercent: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    source: {
      type: String,
      default: "SIMULATED"
    },
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("BusLocation", busLocationSchema);