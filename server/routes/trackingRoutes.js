const express = require("express");

const {
  getBusLocations,
  createDemoBus,
  simulateMovement
} = require("../controllers/trackingController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

// Authenticated users can view tracked buses
router.get("/", protect, getBusLocations);

// Only admins can create demo buses or move them
router.post("/demo", protect, authorizeRoles("admin"), createDemoBus);
router.post(
  "/:id/simulate",
  protect,
  authorizeRoles("admin"),
  simulateMovement
);

module.exports = router;