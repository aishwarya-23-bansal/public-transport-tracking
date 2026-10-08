const express = require("express");
const router = express.Router();

const {
    getAlerts,
    createAlert,
    deleteAlert
} = require("../controllers/alertController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// Everyone logged in can view alerts
router.get("/", protect, getAlerts);

// Admin only
router.post(
    "/",
    protect,
    authorizeRoles("admin"),
    createAlert
);

router.delete(
    "/:id",
    protect,
    authorizeRoles("admin"),
    deleteAlert
);

module.exports = router;