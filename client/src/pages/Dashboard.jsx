import { Link, useNavigate } from "react-router-dom";
import "../App.css";

function Dashboard() {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };
    return (
        <div className="dashboard">

            {/* NAVBAR */}
            <nav className="navbar">
                <Link to="/dashboard" className="dashboard-logo">
                    Transit<span>Go</span>
                </Link>
                <div className="nav-right">
                    <Link to="/profile" className="profile-link">
                        Profile
                    </Link>
                    <button
                        className="logout-button"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            </nav>

            {/* MAIN */}
            <main className="dashboard-content">

                {/* WELCOME */}
                <section className="welcome-section">
                    <div>
                        <p className="welcome-label">
                            COMMUTER DASHBOARD
                        </p>
                        <h1>
                            Welcome back!
                        </h1>
                        <p className="welcome-description">
                            Plan your journey, find routes and manage
                            your travel information.
                        </p>
                    </div>
                </section>

                {/* ROUTE SEARCH */}

                {/* STATISTICS */}
                <section className="stats">
                    <div className="stat-card">
                        <div>
                            <p className="stat-label">
                                ACTIVE TICKETS
                            </p>
                            <h3>
                                0
                            </h3>
                            <p className="stat-description">
                                No active tickets
                            </p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div>
                            <p className="stat-label">
                                SAVED ROUTES
                            </p>
                            <h3>
                                0
                            </h3>
                            <p className="stat-description">
                                No saved routes
                            </p>
                        </div>
                    </div>
                    <div className="stat-card">
                        <div>
                            <p className="stat-label">
                                UPCOMING TRIPS
                            </p>
                            <h3>
                                0
                            </h3>
                            <p className="stat-description">
                                No upcoming trips
                            </p>
                        </div>
                    </div>
                </section>

                {/* UPCOMING TRIP */}
                <section className="dashboard-section">
                    <div className="section-heading">
                        <div>
                            <h2>
                                Upcoming Trip
                            </h2>
                            <p>
                                Your next scheduled journey
                            </p>
                        </div>
                    </div>
                    <div className="empty-card">
                        <h3>
                            No upcoming trips
                        </h3>
                        <p>
                            You don't have any scheduled trips yet.
                            Search for a route to plan your journey.
                        </p>
                        <Link
                            to="/routes"
                            className="primary-button"
                        >
                            Find a Route
                        </Link>
                    </div>
                </section>

                {/* QUICK ACTIONS */}
                <section className="dashboard-section">
                    <div className="section-heading">
                        <div>
                            <h2>
                                Quick Actions
                            </h2>
                            <p>
                                Access frequently used features
                            </p>
                        </div>
                    </div>

                    <div className="quick-actions">

                        {/* ROUTES */}
                        <Link
                            to="/routes"
                            className="action-card action-link"
                        >
                            <div className="action-content">
                                <h3>
                                    Search Routes
                                </h3>
                                <p>
                                    Find available public transport
                                    routes between your locations.
                                </p>
                                <span className="action-button">
                                    Find a Route
                                </span>
                            </div>
                        </Link>

                        {/* TICKETS */}
                        <div className="action-card">
                            <div className="action-content">
                                <h3>
                                    My Tickets
                                </h3>
                                <p>
                                    View and manage your transport
                                    tickets and bookings.
                                </p>
                                <span className="coming-button">
                                    Coming Soon
                                </span>
                            </div>
                        </div>
                        {/* PROFILE */}
                        <Link
                            to="/profile"
                            className="action-card action-link"
                        >
                            <div className="action-content">
                                <h3>
                                    Profile
                                </h3>
                                <p>
                                    Manage your personal information
                                    and emergency contact.
                                </p>
                                <span className="action-button">
                                    View Profile
                                </span>
                            </div>
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    );
}
export default Dashboard;