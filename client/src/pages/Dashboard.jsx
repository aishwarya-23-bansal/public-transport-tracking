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

            {/* Navbar */}
            <nav className="navbar">

                <div className="brand">
                    <div className="logo">🚍</div>
                    <h2>Transit<span>Go</span></h2>
                </div>

                <div className="nav-right">
                    <span>🔔</span>
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </div>

            </nav>


            {/* Main content */}
            <main className="dashboard-content">

                <div className="welcome">
                    <div>
                        <h1>Welcome back! 👋</h1>
                        <p>Plan your next journey with TransitGo.</p>
                    </div>
                </div>


                {/* Search */}
                <div className="search-card">

                    <h2>🔎 Find a Route</h2>

                    <div className="search-fields">

                        <div>
                            <label>From</label>
                            <input
                                type="text"
                                placeholder="Enter starting point"
                            />
                        </div>

                        <div>
                            <label>To</label>
                            <input
                                type="text"
                                placeholder="Enter destination"
                            />
                        </div>

                        <button>
                            Search
                        </button>

                    </div>

                </div>


                {/* Stats */}
                <div className="stats">

                    <div className="stat-card">
                        <span>🎫</span>
                        <div>
                            <h3>0</h3>
                            <p>Active Tickets</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <span>❤️</span>
                        <div>
                            <h3>0</h3>
                            <p>Favorite Routes</p>
                        </div>
                    </div>

                    <div className="stat-card">
                        <span>🚌</span>
                        <div>
                            <h3>0</h3>
                            <p>Upcoming Trips</p>
                        </div>
                    </div>

                </div>


                {/* Upcoming trip */}
                <section className="dashboard-section">

                    <div className="section-heading">
                        <h2>Upcoming Trip</h2>
                        <Link to="/tickets">View all</Link>
                    </div>

                    <div className="empty-card">
                        <div className="empty-icon">🚌</div>

                        <h3>No upcoming trips</h3>

                        <p>
                            Search for a route and book your next journey.
                        </p>

                        <button>
                            Find a Route
                        </button>
                    </div>

                </section>


                {/* Quick actions */}
                <section className="dashboard-section">

                    <h2>Quick Actions</h2>

                    <div className="quick-actions">

                        <div className="action-card">
                            <span>🔎</span>
                            <h3>Search Routes</h3>
                            <p>Find buses and routes.</p>
                        </div>

                        <div className="action-card">
                            <span>🎫</span>
                            <h3>My Tickets</h3>
                            <p>View your bookings.</p>
                        </div>

                        <div className="action-card">
                            <span>👤</span>
                            <h3>Profile</h3>
                            <p>Manage your account.</p>
                        </div>

                    </div>

                </section>

            </main>

        </div>
    );
}

export default Dashboard;