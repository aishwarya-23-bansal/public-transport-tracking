const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const protect = require("../middleware/authMiddleware");

const {
    getProfile,
    updateProfile,
    changePassword,
    uploadProfileImage
} = require("../controllers/userController");

const router = express.Router();

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.put("/change-password", protect, changePassword);

router.put(
    "/profile/image",
    protect,
    upload.single("profileImage"),
    uploadProfileImage
);
module.exports = router;