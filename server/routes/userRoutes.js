const express = require("express");
const upload = require("../middleware/uploadMiddleware");
const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const {
    getProfile,
    updateProfile,
    changePassword,
    uploadProfileImage,
    getAllUsers,
    createAdminUser,
    getUserByIdAdmin,
    updateUserAdmin,
    deleteUserAdmin ,
     getAdminStats
} = require("../controllers/userController");

const router = express.Router();

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.put("/change-password", protect, changePassword);
router.get("/", protect, authorizeRoles("admin"), getAllUsers);
router.post("/", protect, authorizeRoles("admin"), createAdminUser);
router.get(
    "/admin/stats",
    protect,
    authorizeRoles("admin"),
    getAdminStats
);
router.get("/:id", protect, authorizeRoles("admin"), getUserByIdAdmin);
router.put(
    "/:id",
    protect,
    authorizeRoles("admin"),
    updateUserAdmin
);

router.delete(
    "/:id",
    protect,
    authorizeRoles("admin"),
    deleteUserAdmin
);
router.put(
    "/profile/image",
    protect,
    upload.single("profileImage"),
    uploadProfileImage
);
module.exports = router;