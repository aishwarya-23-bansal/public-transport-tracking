const SavedRoute = require("../models/SavedRoute");

// Get saved routes for logged-in user
const getSavedRoutes = async (req, res) => {
    try {
        const savedRoutes = await SavedRoute.find({
            user: req.user._id
        })
            .populate("route")
            .sort({ createdAt: -1 });

        res.status(200).json({
            savedRoutes
        });
    } catch (error) {
        console.error("Get saved routes error:", error);

        res.status(500).json({
            message: "Unable to load saved routes"
        });
    }
};


// Save a route
const saveRoute = async (req, res) => {
    try {
        const { routeId } = req.body;

        if (!routeId) {
            return res.status(400).json({
                message: "Route ID is required"
            });
        }

        const alreadySaved = await SavedRoute.findOne({
            user: req.user._id,
            route: routeId
        });

        if (alreadySaved) {
            return res.status(400).json({
                message: "Route already saved"
            });
        }

        const savedRoute = await SavedRoute.create({
            user: req.user._id,
            route: routeId
        });

        const populatedRoute = await savedRoute.populate("route");

        res.status(201).json({
            message: "Route saved successfully",
            savedRoute: populatedRoute
        });

    } catch (error) {
        console.error("Save route error:", error);

        res.status(500).json({
            message: "Unable to save route"
        });
    }
};


// Remove saved route
const removeSavedRoute = async (req, res) => {
    try {
        const { id } = req.params;

        const savedRoute = await SavedRoute.findOne({
            _id: id,
            user: req.user._id
        });

        if (!savedRoute) {
            return res.status(404).json({
                message: "Saved route not found"
            });
        }

        await savedRoute.deleteOne();

        res.status(200).json({
            message: "Route removed from saved routes"
        });

    } catch (error) {
        console.error("Remove saved route error:", error);

        res.status(500).json({
            message: "Unable to remove saved route"
        });
    }
};


module.exports = {
    getSavedRoutes,
    saveRoute,
    removeSavedRoute
};