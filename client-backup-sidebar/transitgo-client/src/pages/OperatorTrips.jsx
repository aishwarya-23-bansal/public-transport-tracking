import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../App.css";

function OperatorTrips() {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [updatingId, setUpdatingId] = useState(null);

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
            console.error("Fetch trips error:", error);
            setError(
                error.response?.data?.message ||
                "Unable to load trips."
            );
        } finally {
            setLoading(false);
        }
    };

    const updateTripStatus = async (tripId, status) => {
        try {
            setUpdatingId(tripId);

            const response = await api.put(
                `/trips/${tripId}/status`,
                { status }
            );

            setTrips((currentTrips) =>
                currentTrips.map((trip) =>
                    trip._id === tripId
                        ? response.data.trip
                        : trip
                )
            );
        } catch (error) {
            console.error("Update trip status error:", error);

            alert(
                error.response?.data?.message ||
                "Unable to update trip status."
            );
        } finally {
            setUpdatingId(null);
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
                    <h1>Manage Trips</h1>

                    <p>
                        Start, monitor and complete your assigned trips.
                    </p>
                </div>

                {loading && (
                    <div className="operator-empty">
                        <h3>Loading trips...</h3>
                        <p>
                            Please wait while your assigned trips are loaded.
                        </p>
                    </div>
                )}

                {!loading && error && (
                    <div className="operator-empty">
                        <h3>Unable to load trips</h3>
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
                        <h3>No trips assigned</h3>
                        <p>
                            Assigned trips will appear here.
                        </p>
                    </div>
                )}

                {!loading && !error && trips.length > 0 && (
                    <div className="operator-trips-list">
                        {trips.map((trip) => (
                            <div
                                className="trip-card"
                                key={trip._id}
                            >
                                <div className="trip-header">
                                    <div>
                                        <span className="route-label">
                                            ASSIGNED TRIP
                                        </span>

                                        <h2>
                                            Route{" "}
                                            {trip.route?.routeNumber || "N/A"}
                                        </h2>
                                    </div>

                                    <span
                                        className={`trip-status ${trip.status
                                            .toLowerCase()
                                            .replace(" ", "-")}`}
                                    >
                                        {trip.status}
                                    </span>
                                </div>

                                <div className="trip-route">
                                    <div>
                                        <span>Starting Point</span>

                                        <strong>
                                            {trip.route?.source || "Unknown"}
                                        </strong>
                                    </div>

                                    <div className="trip-arrow">
                                        →
                                    </div>

                                    <div>
                                        <span>Destination</span>

                                        <strong>
                                            {trip.route?.destination ||
                                                "Unknown"}
                                        </strong>
                                    </div>
                                </div>

                                <div className="trip-information">
                                    <div>
                                        <span>Journey Date</span>

                                        <strong>
                                            {new Date(
                                                trip.journeyDate
                                            ).toLocaleDateString("en-IN", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric"
                                            })}
                                        </strong>
                                    </div>

                                    <div>
                                        <span>Departure</span>

                                        <strong>
                                            {trip.startTime}
                                        </strong>
                                    </div>

                                    <div>
                                        <span>Expected Arrival</span>

                                        <strong>
                                            {trip.endTime}
                                        </strong>
                                    </div>

                                    <div>
                                        <span>Passengers</span>

                                        <strong>
                                            {trip.passengerCount}
                                        </strong>
                                    </div>

                                    <div>
                                        <span>Distance</span>

                                        <strong>
                                            {trip.route?.distance || 0} km
                                        </strong>
                                    </div>
                                </div>

                                <div className="trip-actions">
                                    {trip.status === "Scheduled" && (
                                        <>
                                            <button
                                                className="start-trip-button"
                                                disabled={
                                                    updatingId === trip._id
                                                }
                                                onClick={() =>
                                                    updateTripStatus(
                                                        trip._id,
                                                        "In Progress"
                                                    )
                                                }
                                            >
                                                {updatingId === trip._id
                                                    ? "Updating..."
                                                    : "Start Trip"}
                                            </button>

                                            <button
                                                className="cancel-trip-button"
                                                disabled={
                                                    updatingId === trip._id
                                                }
                                                onClick={() =>
                                                    updateTripStatus(
                                                        trip._id,
                                                        "Cancelled"
                                                    )
                                                }
                                            >
                                                Cancel Trip
                                            </button>
                                        </>
                                    )}

                                    {trip.status === "In Progress" && (
                                        <>
                                            <button
                                                className="complete-trip-button"
                                                disabled={
                                                    updatingId === trip._id
                                                }
                                                onClick={() =>
                                                    updateTripStatus(
                                                        trip._id,
                                                        "Completed"
                                                    )
                                                }
                                            >
                                                {updatingId === trip._id
                                                    ? "Updating..."
                                                    : "Complete Trip"}
                                            </button>

                                            <button
                                                className="cancel-trip-button"
                                                disabled={
                                                    updatingId === trip._id
                                                }
                                                onClick={() =>
                                                    updateTripStatus(
                                                        trip._id,
                                                        "Cancelled"
                                                    )
                                                }
                                            >
                                                Cancel Trip
                                            </button>
                                        </>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

export default OperatorTrips;