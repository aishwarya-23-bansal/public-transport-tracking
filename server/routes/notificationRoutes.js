const express = require("express");

const {
    getNotifications,
    createNotification,
    markAsRead,
    markAllAsRead
} = require("../controllers/notificationController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Logged-in users
router.get("/", protect, getNotifications);

router.put(
    "/:id/read",
    protect,
    markAsRead
);

router.put(
    "/read-all",
    protect,
    markAllAsRead
);

// Admin only
router.post(
    "/",
    protect,
    authorizeRoles("admin"),
    createNotification
);

module.exports = router;