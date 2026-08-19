import { Link } from "react-router-dom";
import "../App.css";

function AdminDashboard() {
    return (
        <div className="admin-page">
            <nav className="navbar">
                <Link to="/admin" className="dashboard-logo">
                    Transit<span>Go</span>
                </Link>
                <div className="nav-right">
                    <Link to="/profile" className="profile-link">
                        Profile
                    </Link>
                    <Link to="/dashboard" className="back-link">
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
                        <strong>0</strong>
                    </div>
                    <div className="admin-stat">
                        <span>Active Routes</span>
                        <strong>0</strong>
                    </div>
                    <div className="admin-stat">
                        <span>Operators</span>
                        <strong>0</strong>
                    </div>
                    <div className="admin-stat">
                        <span>Today's Bookings</span>
                        <strong>0</strong>
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
                        <span>Manage Users</span>
                    </Link>
                    <Link
                        to="/admin/routes"
                        className="admin-action"
                    >
                        <h3>Route Management</h3>
                        <p>
                            Manage transport routes and schedules.
                        </p>
                        <span>Manage Routes</span>
                    </Link>
                    <Link
                        to="/admin/operators"
                        className="admin-action"
                    >
                        <h3>Operators</h3>
                        <p>
                            Manage transport operators and assignments.
                        </p>
                        <span>Manage Operators</span>
                    </Link>
                    <Link
                        to="/admin/bookings"
                        className="admin-action"
                    >
                        <h3>Bookings</h3>
                        <p>
                            Monitor tickets and booking activity.
                        </p>
                        <span>View Bookings</span>
                    </Link>
                </section>
                <section className="admin-overview">
                    <h2>System Overview</h2>
                    <div className="admin-empty">
                        <h3>
                            No system data available
                        </h3>
                        <p>
                            Dashboard statistics will appear here
                            after the backend is connected.
                        </p>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default AdminDashboard;