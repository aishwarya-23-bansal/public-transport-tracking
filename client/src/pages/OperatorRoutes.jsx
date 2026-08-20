import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../App.css";

function OperatorRoutes() {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchTrips();
    }, []);

    const fetchTrips = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/trips/operator");
            setTrips(response.data.trips || []);
        } catch (error) {
            console.error("Fetch operator routes error:", error);
            setError(
                error.response?.data?.message ||
                "Unable to load assigned routes."
            );
        } finally {
            setLoading(false);
        }
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
                    <h1>Assigned Routes</h1>
                    <p>
                        View the routes and schedules assigned to you.
                    </p>
                </div>

                {loading && (
                    <div className="operator-empty">
                        <h3>Loading routes...</h3>
                        <p>
                            Please wait while your assigned routes are loaded.
                        </p>
                    </div>
                )}

                {!loading && error && (
                    <div className="operator-empty">
                        <h3>Unable to load routes</h3>
                        <p>{error}</p>

                        <button
                            className="start-trip-button"
                            onClick={fetchTrips}
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {!loading && !error && trips.length === 0 && (
                    <div className="operator-empty">
                        <h3>No routes assigned</h3>
                        <p>
                            Routes assigned to you will appear here.
                        </p>
                    </div>
                )}

                {!loading && !error && trips.length > 0 && (
                    <div className="operator-routes-list">
                        {trips.map((trip) => (
                            <div
                                className="operator-route-card"
                                key={trip._id}
                            >
                                <div className="operator-route-header">
                                    <div>
                                        <span className="route-label">
                                            ROUTE
                                        </span>

                                        <h2>
                                            Route{" "}
                                            {trip.route?.routeNumber || "N/A"}
                                        </h2>
                                    </div>

                                    <span className="route-status">
                                        {trip.status}
                                    </span>
                                </div>

                                <div className="operator-route-info">
                                    <div>
                                        <span>From</span>

                                        <strong>
                                            {trip.route?.source || "Unknown"}
                                        </strong>
                                    </div>

                                    <div>
                                        <span>To</span>

                                        <strong>
                                            {trip.route?.destination ||
                                                "Unknown"}
                                        </strong>
                                    </div>

                                    <div>
                                        <span>Departure</span>

                                        <strong>
                                            {trip.startTime}
                                        </strong>
                                    </div>

                                    <div>
                                        <span>Passengers</span>

                                        <strong>
                                            {trip.passengerCount}
                                        </strong>
                                    </div>
                                </div>

                                <div className="operator-route-footer">
                                    <span>
                                        Journey:{" "}
                                        {new Date(
                                            trip.journeyDate
                                        ).toLocaleDateString("en-IN", {
                                            day: "2-digit",
                                            month: "short",
                                            year: "numeric"
                                        })}
                                    </span>

                                    <Link
                                        to={`/operator/routes/${trip.route?._id}`}
                                        className="route-details-button"
                                    >
                                        View Details
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

export default OperatorRoutes;