const express = require("express");

const protect = require("../middleware/authMiddleware");

const {
    getProfile,
    updateProfile
} = require("../controllers/userController");

const router = express.Router();

router.get("/profile", protect, getProfile);

router.put("/profile", protect, updateProfile);

module.exports = router;