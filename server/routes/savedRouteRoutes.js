const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    getSavedRoutes,
    saveRoute,
    removeSavedRoute
} = require("../controllers/savedRouteController");


// Get my saved routes
router.get("/", protect, getSavedRoutes);

// Save a route
router.post("/", protect, saveRoute);

// Remove saved route
router.delete("/:id", protect, removeSavedRoute);


module.exports = router;