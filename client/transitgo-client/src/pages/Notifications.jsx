import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../App.css";

function Notifications() {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/notifications");
            setNotifications(response.data.notifications || []);
        } catch (error) {
            console.error("Fetch notifications error:", error);
            setError(
                error.response?.data?.message ||
                "Unable to load notifications."
            );
        } finally {
            setLoading(false);
        }
    };

    const markAsRead = async (id) => {
        try {
            await api.put(`/notifications/${id}/read`);

            setNotifications((current) =>
                current.map((notification) =>
                    notification._id === id
                        ? { ...notification, read: true }
                        : notification
                )
            );
        } catch (error) {
            console.error("Mark notification error:", error);
        }
    };

    return (
        <div className="notifications-page">
            <nav className="navbar">
                <Link to="/dashboard" className="dashboard-logo">
                    Transit<span>Go</span>
                </Link>

                <div className="nav-right">
                    <Link to="/profile" className="profile-link">
                        Profile
                    </Link>

                    <Link to="/dashboard" className="back-link">
                        Dashboard
                    </Link>
                </div>
            </nav>

            <main className="notifications-content">
                <div className="notifications-heading">
                    <h1>Notifications</h1>
                    <p>
                        Stay updated with your account and journeys.
                    </p>
                </div>

                {loading && (
                    <div className="notification-list">
                        <div className="notification-card">
                            <div className="notification-content">
                                <h3>Loading notifications...</h3>
                                <p>
                                    Please wait while we load your updates.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {!loading && error && (
                    <div className="notification-list">
                        <div className="notification-card">
                            <div className="notification-content">
                                <h3>Unable to load notifications</h3>
                                <p>{error}</p>

                                <button
                                    className="primary-button"
                                    onClick={fetchNotifications}
                                >
                                    Try Again
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {!loading &&
                    !error &&
                    notifications.length === 0 && (
                        <div className="notification-list">
                            <div className="notification-card">
                                <div className="notification-content">
                                    <h3>No new notifications</h3>
                                    <p>
                                        You're all caught up. New updates
                                        will appear here.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                {!loading &&
                    !error &&
                    notifications.length > 0 && (
                        <div className="notification-list">
                            {notifications.map((notification) => (
                                <div
                                    className={`notification-card ${
                                        notification.read
                                            ? ""
                                            : "unread-notification"
                                    }`}
                                    key={notification._id}
                                    onClick={() =>
                                        !notification.read &&
                                        markAsRead(notification._id)
                                    }
                                >
                                    <div className="notification-content">
                                        <span className="notification-label">
                                            {notification.type}
                                        </span>

                                        <h3>
                                            {notification.title}
                                        </h3>

                                        <p>
                                            {notification.message}
                                        </p>

                                        <span className="notification-time">
                                            {new Date(
                                                notification.createdAt
                                            ).toLocaleString("en-IN", {
                                                day: "2-digit",
                                                month: "short",
                                                hour: "2-digit",
                                                minute: "2-digit"
                                            })}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
            </main>
        </div>
    );
}

export default Notifications;