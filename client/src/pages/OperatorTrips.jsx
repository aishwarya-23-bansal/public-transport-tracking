import { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function OperatorTrips() {
    const [tripStatus, setTripStatus] = useState("Scheduled");

    const startTrip = () => {
        setTripStatus("In Progress");
    };

    const completeTrip = () => {
        setTripStatus("Completed");
    };

    const cancelTrip = () => {
        setTripStatus("Cancelled");
    };

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

                    <h1>Manage Trips</h1>

                    <p>
                        Start, monitor and complete your assigned trips.
                    </p>

                </div>


                <div className="trip-card">

                    <div className="trip-header">

                        <div>

                            <span className="route-label">
                                TODAY'S TRIP
                            </span>

                            <h2>Route 101</h2>

                        </div>

                        <span
                            className={`trip-status ${
                                tripStatus
                                    .toLowerCase()
                                    .replace(" ", "-")
                            }`}
                        >
                            {tripStatus}
                        </span>

                    </div>


                    <div className="trip-route">

                        <div>
                            <span>Starting Point</span>
                            <strong>GLA University</strong>
                        </div>

                        <div className="trip-arrow">
                            →
                        </div>

                        <div>
                            <span>Destination</span>
                            <strong>Mathura Railway Station</strong>
                        </div>

                    </div>


                    <div className="trip-information">

                        <div>
                            <span>Departure</span>
                            <strong>08:30 AM</strong>
                        </div>

                        <div>
                            <span>Expected Arrival</span>
                            <strong>09:15 AM</strong>
                        </div>

                        <div>
                            <span>Passengers</span>
                            <strong>0</strong>
                        </div>

                        <div>
                            <span>Distance</span>
                            <strong>18 km</strong>
                        </div>

                    </div>


                    <div className="trip-actions">

                        {tripStatus === "Scheduled" && (
                            <button
                                className="start-trip-button"
                                onClick={startTrip}
                            >
                                Start Trip
                            </button>
                        )}


                        {tripStatus === "In Progress" && (
                            <button
                                className="complete-trip-button"
                                onClick={completeTrip}
                            >
                                Complete Trip
                            </button>
                        )}


                        {(tripStatus === "Scheduled" ||
                            tripStatus === "In Progress") && (
                            <button
                                className="cancel-trip-button"
                                onClick={cancelTrip}
                            >
                                Cancel Trip
                            </button>
                        )}

                    </div>

                </div>


                <div className="operator-empty">

                    <h3>
                        No other trips
                    </h3>

                    <p>
                        Additional assigned trips will appear here.
                    </p>

                </div>

            </main>

        </div>
    );
}

export default OperatorTrips;