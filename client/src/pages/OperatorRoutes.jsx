import { Link } from "react-router-dom";
import "../App.css";

function OperatorRoutes() {
    return (
        <div className="operator-page">
            <nav className="navbar">
                <Link to="/operator" className="dashboard-logo">
                    Transit<span>Go</span>
                </Link>
                <div className="nav-right">
                    <Link to="/profile" className="profile-link">
                        Profile
                    </Link>
                    <Link to="/operator" className="back-link">
                        Dashboard
                    </Link>
                </div>
            </nav>
            <main className="operator-content">
                <div className="operator-heading">
                    <h1>Assigned Routes</h1>
                    <p>
                        View the routes and schedules assigned to you.
                    </p>
                </div>
                <div className="operator-route-card">
                    <div className="operator-route-header">
                        <div>
                            <span className="route-label">
                                ROUTE
                            </span>
                            <h2>Route 101</h2>
                        </div>
                        <span className="route-status">
                            Assigned
                        </span>
                    </div>
                    <div className="operator-route-info">
                        <div>
                            <span>From</span>
                            <strong>GLA University</strong>
                        </div>
                        <div>
                            <span>To</span>
                            <strong>Mathura Railway Station</strong>
                        </div>
                        <div>
                            <span>Departure</span>
                            <strong>08:30 AM</strong>
                        </div>
                        <div>
                            <span>Passengers</span>
                            <strong>0</strong>
                        </div>
                    </div>
                    <div className="operator-route-footer">
                        <span>
                            Schedule: Monday - Friday
                        </span>
                        <Link
                            to="/operator/routes/101"
                            className="route-details-button"
                        >
                            View Details
                        </Link>
                    </div>
                </div>
                <div className="operator-empty">
                    <h3>
                        No additional routes
                    </h3>
                    <p>
                        Other routes assigned to you will appear here.
                    </p>
                </div>
            </main>
        </div>
    );
}
export default OperatorRoutes;