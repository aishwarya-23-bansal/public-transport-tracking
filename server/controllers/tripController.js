const Trip = require("../models/Trip");
const Route = require("../models/Route");
const User = require("../models/User");

const createTrip = async (req, res) => {
    try {
        const {
            route,
            operator,
            journeyDate,
            startTime,
            endTime
        } = req.body;

        if (!route || !operator || !journeyDate || !startTime || !endTime) {
            return res.status(400).json({
                message: "Please provide all required trip details"
            });
        }

        const routeExists = await Route.findById(route);

        if (!routeExists) {
            return res.status(404).json({
                message: "Route not found"
            });
        }

        const operatorExists = await User.findOne({
            _id: operator,
            role: "operator"
        });

        if (!operatorExists) {
            return res.status(404).json({
                message: "Operator not found"
            });
        }

        const trip = await Trip.create({
            route,
            operator,
            journeyDate,
            startTime,
            endTime
        });

        const populatedTrip = await Trip.findById(trip._id)
            .populate("route")
            .populate("operator", "name email");

        res.status(201).json({
            message: "Trip created successfully",
            trip: populatedTrip
        });
    } catch (error) {
        console.error("Create trip error:", error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

const getOperatorTrips = async (req, res) => {
    try {
        const trips = await Trip.find({
            operator: req.user._id
        })
            .populate("route")
            .sort({ journeyDate: 1, startTime: 1 });

        res.status(200).json({
            trips
        });
    } catch (error) {
        console.error("Get operator trips error:", error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

const getAllTrips = async (req, res) => {
    try {
        const trips = await Trip.find()
            .populate("route")
            .populate("operator", "name email")
            .sort({ journeyDate: 1, startTime: 1 });

        res.status(200).json({
            trips
        });
    } catch (error) {
        console.error("Get all trips error:", error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

const updateTripStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const allowedStatuses = [
            "Scheduled",
            "In Progress",
            "Completed",
            "Cancelled"
        ];

        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({
                message: "Invalid trip status"
            });
        }

        const trip = await Trip.findOne({
            _id: req.params.id,
            operator: req.user._id
        });

        if (!trip) {
            return res.status(404).json({
                message: "Trip not found"
            });
        }

        trip.status = status;
        await trip.save();

        const updatedTrip = await Trip.findById(trip._id)
            .populate("route")
            .populate("operator", "name email");

        res.status(200).json({
            message: "Trip status updated successfully",
            trip: updatedTrip
        });
    } catch (error) {
        console.error("Update trip status error:", error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    createTrip,
    getOperatorTrips,
    getAllTrips,
    updateTripStatus
};