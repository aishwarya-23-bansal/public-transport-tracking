import { Link } from "react-router-dom";
import "../App.css";

function OperatorRouteDetails() {
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

                    <Link
                        to="/operator/routes"
                        className="back-link"
                    >
                        Assigned Routes
                    </Link>

                </div>

            </nav>


            <main className="operator-content">

                <div className="operator-heading">

                    <h1>Route Details</h1>

                    <p>
                        Detailed information about your assigned route.
                    </p>

                </div>


                <div className="route-detail-card">

                    <div className="route-detail-top">

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


                    <div className="route-detail-grid">

                        <div>
                            <span>Starting Point</span>
                            <strong>GLA University</strong>
                        </div>

                        <div>
                            <span>Destination</span>
                            <strong>Mathura Railway Station</strong>
                        </div>

                        <div>
                            <span>Departure</span>
                            <strong>08:30 AM</strong>
                        </div>

                        <div>
                            <span>Expected Arrival</span>
                            <strong>09:15 AM</strong>
                        </div>

                        <div>
                            <span>Total Stops</span>
                            <strong>6</strong>
                        </div>

                        <div>
                            <span>Distance</span>
                            <strong>18 km</strong>
                        </div>

                    </div>


                    <div className="route-stops">

                        <h3>Route Stops</h3>

                        <div className="stop-list">

                            <div>GLA University</div>

                            <div>Chowki</div>

                            <div>Bus Stand</div>

                            <div>Mathura Cantt</div>

                            <div>Mathura Railway Station</div>

                        </div>

                    </div>


                    <Link
                        to="/operator/routes"
                        className="route-back-button"
                    >
                        Back to Assigned Routes
                    </Link>

                </div>

            </main>

        </div>
    );
}

export default OperatorRouteDetails;