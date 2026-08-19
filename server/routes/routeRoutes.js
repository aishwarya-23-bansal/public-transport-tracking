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

const router = express.Router();
router.get("/search", protect, searchRoutes);
router.get("/", protect, getRoutes);
router.get("/:id", protect, getRouteById);
router.post("/", protect, createRoute);
router.put("/:id", protect, updateRoute);
router.delete("/:id", protect, deleteRoute);

module.exports = router;