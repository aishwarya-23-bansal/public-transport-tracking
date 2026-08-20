const express = require("express");
const {
    createTrip,
    getOperatorTrips,
    getAllTrips,
    updateTripStatus
} = require("../controllers/tripController");
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const router = express.Router();

router.post("/", protect, authorizeRoles("admin"), createTrip);
router.get("/operator", protect, authorizeRoles("operator"), getOperatorTrips);
router.get("/", protect, authorizeRoles("admin"), getAllTrips);
router.put("/:id/status", protect, authorizeRoles("operator"), updateTripStatus);

module.exports = router;