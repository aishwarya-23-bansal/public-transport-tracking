const Route = require("../models/Route");

// Create a new route
const createRoute = async (req, res) => {
    try {
        const {
            routeNumber,
            source,
            destination,
            stops,
            distance,
            duration,
            fare,
            status
        } = req.body;

        if (
            !routeNumber ||
            !source ||
            !destination ||
            distance === undefined ||
            duration === undefined ||
            fare === undefined
        ) {
            return res.status(400).json({
                message: "Please provide all required route details"
            });
        }

        const existingRoute = await Route.findOne({
            routeNumber
        });

        if (existingRoute) {
            return res.status(400).json({
                message: "Route number already exists"
            });
        }

        const route = await Route.create({
            routeNumber,
            source,
            destination,
            stops: stops || [],
            distance,
            duration,
            fare,
            status: status || "Active"
        });

        res.status(201).json({
            message: "Route created successfully",
            route
        });

    } catch (error) {
        console.error("Create route error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// Get all routes
const getRoutes = async (req, res) => {
    try {
        const routes = await Route.find().sort({
            createdAt: -1
        });

        res.status(200).json({
            routes
        });

    } catch (error) {
        console.error("Get routes error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// Get single route
const getRouteById = async (req, res) => {
    try {
        const route = await Route.findById(req.params.id);

        if (!route) {
            return res.status(404).json({
                message: "Route not found"
            });
        }

        res.status(200).json({
            route
        });

    } catch (error) {
        console.error("Get route error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// Update route
const updateRoute = async (req, res) => {
    try {
        const route = await Route.findById(req.params.id);

        if (!route) {
            return res.status(404).json({
                message: "Route not found"
            });
        }

        const updatedRoute = await Route.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        res.status(200).json({
            message: "Route updated successfully",
            route: updatedRoute
        });

    } catch (error) {
        console.error("Update route error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// Delete route
const deleteRoute = async (req, res) => {
    try {
        const route = await Route.findById(req.params.id);

        if (!route) {
            return res.status(404).json({
                message: "Route not found"
            });
        }

        await Route.findByIdAndDelete(req.params.id);

        res.status(200).json({
            message: "Route deleted successfully"
        });

    } catch (error) {
        console.error("Delete route error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// Search routes
const searchRoutes = async (req, res) => {
    try {
        const { source, destination, routeNumber } = req.query;

        const filter = {};

        if (source) {
            filter.source = {
                $regex: source,
                $options: "i"
            };
        }

        if (destination) {
            filter.destination = {
                $regex: destination,
                $options: "i"
            };
        }

        if (routeNumber) {
            filter.routeNumber = {
                $regex: routeNumber,
                $options: "i"
            };
        }

        const routes = await Route.find(filter);

        res.status(200).json({
            routes
        });

    } catch (error) {
        console.error("Search routes error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


module.exports = {
    createRoute,
    getRoutes,
    getRouteById,
    updateRoute,
    deleteRoute,
    searchRoutes
};