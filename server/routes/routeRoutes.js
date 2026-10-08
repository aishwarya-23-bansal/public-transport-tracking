const express = require("express");

const {
    createRoute,
    getRoutes,
    getRouteById,
    updateRoute,
    deleteRoute,
    searchRoutes
} = require("../controllers/routeController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.get("/search", protect, searchRoutes);
router.get("/", protect, getRoutes);
router.get("/:id", protect, getRouteById);

// ADMIN ONLY
router.post("/", protect, authorizeRoles("admin"), createRoute);
router.put("/:id", protect, authorizeRoles("admin"), updateRoute);
router.delete("/:id", protect, authorizeRoles("admin"), deleteRoute);

module.exports = router;