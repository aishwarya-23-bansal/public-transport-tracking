const Notification = require("../models/Notification");

// Get notifications for logged-in user
const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({
            user: req.user._id
        }).sort({ createdAt: -1 });

        res.status(200).json({
            notifications
        });

    } catch (error) {
        console.error("Get notifications error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// Create notification for all users
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

        // Create one notification for every user
        for (const user of users) {

            await Notification.create({
                user: user._id,
                title: title,
                message: message,
                type: type || "System",
                read: false
            });

        }

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


// Mark one notification as read
const markAsRead = async (req, res) => {
    try {
        const notification = await Notification.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user._id
            },
            {
                read: true
            },
            {
                new: true
            }
        );

        if (!notification) {
            return res.status(404).json({
                message: "Notification not found"
            });
        }

        res.status(200).json({
            message: "Notification marked as read",
            notification
        });

    } catch (error) {

        console.error("Mark notification read error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


// Mark all notifications as read
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

        console.error("Mark all notifications read error:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};


module.exports = {
    getNotifications,
    createNotification,
    markAsRead,
    markAllAsRead
};