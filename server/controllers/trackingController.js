const BusLocation = require("../models/BusLocation");
const Route = require("../models/Route");

const getBusLocations = async (req, res) => {
  try {
    const buses = await BusLocation.find()
      .populate("route")
      .sort({ lastUpdated: -1 });

    const results = buses.map((bus) => {
      const progress = bus.progressPercent / 100;
      const route = bus.route;
      const duration = Number(route?.duration) || 0;

      return {
        _id: bus._id,
        busNumber: bus.busNumber,
        route,
        latitude:
          bus.startLatitude +
          (bus.endLatitude - bus.startLatitude) * progress,
        longitude:
          bus.startLongitude +
          (bus.endLongitude - bus.startLongitude) * progress,
        progressPercent: bus.progressPercent,
        etaMinutes: Math.ceil(duration * (1 - progress)),
        source: bus.source,
        lastUpdated: bus.lastUpdated
      };
    });

    res.json({ buses: results });
  } catch (error) {
    console.error("Get bus locations error:", error);
    res.status(500).json({ message: "Unable to fetch bus locations" });
  }
};

const createDemoBus = async (req, res) => {
  try {
    const {
      busNumber,
      routeId,
      startLatitude,
      startLongitude,
      endLatitude,
      endLongitude
    } = req.body;

    const coordinates = [
      startLatitude,
      startLongitude,
      endLatitude,
      endLongitude
    ];

    if (
      !busNumber ||
      !routeId ||
      coordinates.some(
        (value) =>
          value === undefined ||
          value === null ||
          value === "" ||
          !Number.isFinite(Number(value))
      )
    ) {
      return res.status(400).json({
        message:
          "Provide busNumber, routeId and all four valid coordinates"
      });
    }

    if (
      Math.abs(Number(startLatitude)) > 90 ||
      Math.abs(Number(endLatitude)) > 90 ||
      Math.abs(Number(startLongitude)) > 180 ||
      Math.abs(Number(endLongitude)) > 180
    ) {
      return res.status(400).json({
        message: "Coordinates are outside valid latitude/longitude ranges"
      });
    }

    const route = await Route.findById(routeId);

    if (!route) {
      return res.status(404).json({ message: "Route not found" });
    }

    const bus = await BusLocation.create({
      busNumber,
      route: routeId,
      startLatitude: Number(startLatitude),
      startLongitude: Number(startLongitude),
      endLatitude: Number(endLatitude),
      endLongitude: Number(endLongitude),
      progressPercent: 0,
      source: "SIMULATED"
    });

    res.status(201).json({
      message: "Demo bus created",
      bus
    });
  } catch (error) {
    console.error("Create demo bus error:", error);
    res.status(500).json({ message: "Unable to create demo bus" });
  }
};

const simulateMovement = async (req, res) => {
  try {
    const bus = await BusLocation.findById(req.params.id);

    if (!bus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    const step = Number(req.body.step ?? 10);

    if (!Number.isFinite(step) || step <= 0 || step > 100) {
      return res.status(400).json({
        message: "Step must be a number greater than 0 and at most 100"
      });
    }

    bus.progressPercent = Math.min(100, bus.progressPercent + step);
    bus.lastUpdated = new Date();

    await bus.save();

    const progress = bus.progressPercent / 100;

    res.json({
      message: "Simulated bus movement updated",
      bus: {
        _id: bus._id,
        busNumber: bus.busNumber,
        latitude:
          bus.startLatitude +
          (bus.endLatitude - bus.startLatitude) * progress,
        longitude:
          bus.startLongitude +
          (bus.endLongitude - bus.startLongitude) * progress,
        progressPercent: bus.progressPercent,
        lastUpdated: bus.lastUpdated,
        source: "SIMULATED"
      }
    });
  } catch (error) {
    console.error("Simulate movement error:", error);
    res.status(500).json({ message: "Unable to simulate bus movement" });
  }
};

module.exports = {
  getBusLocations,
  createDemoBus,
  simulateMovement
};