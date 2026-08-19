import { Link } from "react-router-dom";
import "../App.css";

function OperatorDashboard() {
    return (
        <div className="operator-page">
            <nav className="navbar">
                <Link to="/dashboard" className="dashboard-logo">
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
            <main className="operator-content">
                <div className="operator-heading">
                    <div>
                        <h1>Operator Dashboard</h1>
                        <p>
                            Manage assigned routes, trips and passenger information.
                        </p>
                    </div>
                </div>
                <section className="operator-stats">
                    <div className="operator-stat">
                        <span>Assigned Routes</span>
                        <strong>0</strong>
                    </div>
                    <div className="operator-stat">
                        <span>Active Trips</span>
                        <strong>0</strong>
                    </div>
                    <div className="operator-stat">
                        <span>Passengers Today</span>
                        <strong>0</strong>
                    </div>
                    <div className="operator-stat">
                        <span>Bus Status</span>
                        <strong>Available</strong>
                    </div>
                </section>
                <section className="operator-section">
                    <div className="section-header">
                        <div>
                            <h2>Today's Assigned Routes</h2>
                            <p>
                                Routes currently assigned to you.
                            </p>
                        </div>
                    </div>
                    <div className="operator-empty">
                        <h3>No routes assigned</h3>
                        <p>
                            Assigned routes and trip schedules
                            will appear here.
                        </p>
                    </div>
                </section>
                <section className="operator-actions">
                    <Link to="/operator/routes" className="operator-action">
                        <h3>Assigned Routes</h3>
                        <p>
                            View your assigned transport routes.
                        </p>
                        <span>View Routes</span>
                    </Link>
                    <Link to="/operator/trips" className="operator-action">
                        <h3>Manage Trips</h3>
                        <p>
                            Start, update and complete assigned trips.
                        </p>
                        <span>Manage Trips</span>
                    </Link>
                    <Link to="/operator/passengers" className="operator-action">
                        <h3>Passengers</h3>
                        <p>
                            View passenger and booking information.
                        </p>
                        <span>View Passengers</span>
                    </Link>
                    <Link to="/operator/schedule" className="operator-action">
                        <h3>Schedule</h3>
                        <p> View your daily assigned trip schedule.</p>
                        <span>View Schedule</span>
                    </Link>
                </section>
            </main>
        </div>
    );
}

export default OperatorDashboard;