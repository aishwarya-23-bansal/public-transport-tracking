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


// ADMIN: Send notification to users
const createNotification = async (req, res) => {
    try {
        const { title, message, type } = req.body;

        if (!title || !message) {
            return res.status(400).json({
                message: "Title and message are required"
            });
        }

        const User = require("../models/User");

        const users = await User.find({}).select("_id");

        if (users.length === 0) {
            return res.status(400).json({
                message: "No users found"
            });
        }

        const notifications = users.map((user) => ({
            user: user._id,
            title,
            message,
            type: type || "info",
            read: false
        }));

        await Notification.insertMany(notifications);

        res.status(201).json({
            message: `Notification sent to ${users.length} users`
        });

    } catch (error) {
        console.error("Create notification error:", error);

        res.status(500).json({
            message: "Failed to create notification",
            error: error.message
        });
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
            {
                user: req.user._id,
                read: false
            },
            {
                read: true
            }
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
    createNotification,
    markAsRead,
    markAllAsRead
};