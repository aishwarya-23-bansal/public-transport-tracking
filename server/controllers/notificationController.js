const Notification = require("../models/Notification");

const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({
            user: req.user._id
        }).sort({ createdAt: -1 });

        res.status(200).json({ notifications });
    } catch (error) {
        console.error("Get notifications error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const markAsRead = async (req, res) => {
    try {
        const notification = await Notification.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!notification) {
            return res.status(404).json({
                message: "Notification not found"
            });
        }

        notification.read = true;
        await notification.save();

        res.status(200).json({
            message: "Notification marked as read",
            notification
        });
    } catch (error) {
        console.error("Mark notification error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

const markAllAsRead = async (req, res) => {
    try {
        await Notification.updateMany(
            { user: req.user._id, read: false },
            { read: true }
        );

        res.status(200).json({
            message: "All notifications marked as read"
        });
    } catch (error) {
        console.error("Mark all notifications error:", error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    getNotifications,
    markAsRead,
    markAllAsRead
};