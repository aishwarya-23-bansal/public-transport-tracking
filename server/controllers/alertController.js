const Route = require("../models/Route");
const Trip = require("../models/Trip");
const Alert = require("../models/Alert");

// Get all alerts
const getAlerts = async (req, res) => {
    try {
        const alerts = [];

        // 1. Admin-created alerts
        const adminAlerts = await Alert.find({ isActive: true })
            .populate("createdBy", "name")
            .sort({ createdAt: -1 });

        adminAlerts.forEach((alert) => {
            alerts.push({
                _id: alert._id,
                type: alert.type,
                title: alert.title,
                message: alert.message,
                createdAt: alert.createdAt
            });
        });

        // 2. Inactive routes
        const inactiveRoutes = await Route.find({
            status: "Inactive"
        });

        inactiveRoutes.forEach((route) => {
            alerts.push({
                type: "route",
                title: "Route Unavailable",
                message: `${route.routeNumber} from ${route.source} to ${route.destination} is currently unavailable.`,
                createdAt: route.updatedAt || new Date()
            });
        });

        // 3. Cancelled trips
        const cancelledTrips = await Trip.find({
            status: "Cancelled"
        }).populate("route");

        cancelledTrips.forEach((trip) => {
            alerts.push({
                type: "trip",
                title: "Trip Cancelled",
                message: `Trip from ${
                    trip.route?.source || "Unknown"
                } to ${
                    trip.route?.destination || "Unknown"
                } has been cancelled.`,
                createdAt: trip.updatedAt || new Date()
            });
        });

        // Sort newest first
        alerts.sort(
            (a, b) =>
                new Date(b.createdAt) - new Date(a.createdAt)
        );

        res.status(200).json({ alerts });

    } catch (error) {
        console.error("Get alerts error:", error);

        res.status(500).json({
            message: "Unable to fetch travel alerts",
            error: error.message
        });
    }
};


// Create admin alert
const createAlert = async (req, res) => {
    try {
        const { title, message, type } = req.body;

        if (!title || !message) {
            return res.status(400).json({
                message: "Title and message are required"
            });
        }

        const alert = await Alert.create({
            title,
            message,
            type: type || "info",
            createdBy: req.user._id
        });

        res.status(201).json({
            message: "Alert created successfully",
            alert
        });

    } catch (error) {
        console.error("Create alert error:", error);

        res.status(500).json({
            message: "Failed to create alert",
            error: error.message
        });
    }
};


// Delete admin alert
const deleteAlert = async (req, res) => {
    try {
        const alert = await Alert.findById(req.params.id);

        if (!alert) {
            return res.status(404).json({
                message: "Alert not found"
            });
        }

        await alert.deleteOne();

        res.status(200).json({
            message: "Alert deleted successfully"
        });

    } catch (error) {
        console.error("Delete alert error:", error);

        res.status(500).json({
            message: "Failed to delete alert",
            error: error.message
        });
    }
};


module.exports = {
    getAlerts,
    createAlert,
    deleteAlert
};