import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../App.css";

function AdminDashboard() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        activeRoutes: 0,
        operators: 0,
        todaysBookings: 0
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const response = await api.get("/users/admin/stats");

            setStats({
                totalUsers: response.data.totalUsers || 0,
                activeRoutes: response.data.activeRoutes || 0,
                operators: response.data.operators || 0,
                todaysBookings: response.data.todaysBookings || 0
            });
        } catch (error) {
            console.error("Failed to load admin stats:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-page">

            <nav className="navbar">

                <Link
                    to="/admin"
                    className="dashboard-logo"
                >
                    Transit<span>Go</span>
                </Link>

                <div className="nav-right">

                    <Link
                        to="/profile"
                        className="profile-link"
                    >
                        Profile
                    </Link>

                    <Link
                        to="/dashboard"
                        className="back-link"
                    >
                        Logout
                    </Link>

                </div>

            </nav>


            <main className="admin-content">

                <div className="admin-heading">

                    <h1>Admin Dashboard</h1>

                    <p>
                        Manage users, routes, operators and transport operations.
                    </p>

                </div>


                <section className="admin-stats">

                    <div className="admin-stat">
                        <span>Total Users</span>

                        <strong>
                            {loading ? "..." : stats.totalUsers}
                        </strong>
                    </div>


                    <div className="admin-stat">
                        <span>Active Routes</span>

                        <strong>
                            {loading ? "..." : stats.activeRoutes}
                        </strong>
                    </div>


                    <div className="admin-stat">
                        <span>Operators</span>

                        <strong>
                            {loading ? "..." : stats.operators}
                        </strong>
                    </div>


                    <div className="admin-stat">
                        <span>Today's Bookings</span>

                        <strong>
                            {loading ? "..." : stats.todaysBookings}
                        </strong>
                    </div>

                </section>


                <section className="admin-actions">

                    <Link
                        to="/admin/users"
                        className="admin-action"
                    >
                        <h3>User Management</h3>

                        <p>
                            View and manage registered users.
                        </p>

                        <span>
                            Manage Users
                        </span>
                    </Link>


                    <Link
                        to="/admin/routes"
                        className="admin-action"
                    >
                        <h3>Route Management</h3>

                        <p>
                            Manage transport routes and schedules.
                        </p>

                        <span>
                            Manage Routes
                        </span>
                    </Link>


                    <Link
                        to="/admin/operators"
                        className="admin-action"
                    >
                        <h3>Operators</h3>

                        <p>
                            Manage transport operators and assignments.
                        </p>

                        <span>
                            Manage Operators
                        </span>
                    </Link>


                    <Link
                        to="/admin/bookings"
                        className="admin-action"
                    >
                        <h3>Bookings</h3>

                        <p>
                            Monitor tickets and booking activity.
                        </p>

                        <span>
                            View Bookings
                        </span>
                    </Link>


                    <Link
                        to="/admin/alerts"
                        className="admin-action"
                    >
                        <h3>Travel Alerts</h3>

                        <p>
                            Create and manage travel alerts.
                        </p>

                        <span>
                            Manage Alerts
                        </span>
                    </Link>


                    <Link
                        to="/admin/notifications"
                        className="admin-action"
                    >
                        <h3>Notifications</h3>

                        <p>
                            Create and send notifications to users.
                        </p>

                        <span>
                            Manage Notifications
                        </span>
                    </Link>

                </section>


                <section className="admin-overview">

                    <h2>
                        System Overview
                    </h2>

                    <div className="admin-empty">

                        <h3>
                            System Management
                        </h3>

                        <p>
                            Use the management sections above to control
                            users, routes, operators, bookings, alerts
                            and notifications.
                        </p>

                    </div>

                </section>

            </main>

        </div>
    );
}

export default AdminDashboard;