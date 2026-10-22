import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../App.css";

function OperatorDashboard() {
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
            console.error("Fetch operator dashboard error:", error);
            setError(
                error.response?.data?.message ||
                "Unable to load dashboard data."
            );
        } finally {
            setLoading(false);
        }
    };

    const assignedRoutes = new Set(
        trips
            .map((trip) => trip.route?._id)
            .filter(Boolean)
    ).size;

    const activeTrips = trips.filter(
        (trip) => trip.status === "In Progress"
    ).length;

    const today = new Date().toISOString().split("T")[0];

    const todayTrips = trips.filter(
        (trip) =>
            new Date(trip.journeyDate)
                .toISOString()
                .split("T")[0] === today
    );

    const passengersToday = todayTrips.reduce(
        (total, trip) => total + (trip.passengerCount || 0),
        0
    );

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

                    <Link to="/login" className="back-link">
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

                {loading && (
                    <div className="operator-empty">
                        <h3>Loading dashboard...</h3>
                        <p>
                            Please wait while we load your assigned trips.
                        </p>
                    </div>
                )}

                {!loading && error && (
                    <div className="operator-empty">
                        <h3>Unable to load dashboard</h3>
                        <p>{error}</p>

                        <button
                            className="start-trip-button"
                            onClick={fetchTrips}
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {!loading && !error && (
                    <>
                        <section className="operator-stats">
                            <div className="operator-stat">
                                <span>Assigned Routes</span>
                                <strong>{assignedRoutes}</strong>
                            </div>

                            <div className="operator-stat">
                                <span>Active Trips</span>
                                <strong>{activeTrips}</strong>
                            </div>

                            <div className="operator-stat">
                                <span>Passengers Today</span>
                                <strong>{passengersToday}</strong>
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

                            {todayTrips.length === 0 ? (
                                <div className="operator-empty">
                                    <h3>No routes assigned today</h3>
                                    <p>
                                        Assigned routes and trip schedules
                                        will appear here.
                                    </p>
                                </div>
                            ) : (
                                <div className="operator-route-list">
                                    {todayTrips.map((trip) => (
                                        <div
                                            className="trip-card"
                                            key={trip._id}
                                        >
                                            <div className="trip-header">
                                                <div>
                                                    <span className="route-label">
                                                        ASSIGNED ROUTE
                                                    </span>

                                                    <h2>
                                                        Route{" "}
                                                        {trip.route?.routeNumber ||
                                                            "N/A"}
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
                                                    <span>From</span>
                                                    <strong>
                                                        {trip.route?.source ||
                                                            "Unknown"}
                                                    </strong>
                                                </div>

                                                <div className="trip-arrow">
                                                    →
                                                </div>

                                                <div>
                                                    <span>To</span>
                                                    <strong>
                                                        {trip.route?.destination ||
                                                            "Unknown"}
                                                    </strong>
                                                </div>
                                            </div>

                                            <div className="trip-information">
                                                <div>
                                                    <span>Departure</span>
                                                    <strong>
                                                        {trip.startTime}
                                                    </strong>
                                                </div>

                                                <div>
                                                    <span>Arrival</span>
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
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </section>
                    </>
                )}

                <section className="operator-actions">
                    <Link
                        to="/operator/routes"
                        className="operator-action"
                    >
                        <h3>Assigned Routes</h3>
                        <p>
                            View your assigned transport routes.
                        </p>
                        <span>View Routes</span>
                    </Link>

                    <Link
                        to="/operator/trips"
                        className="operator-action"
                    >
                        <h3>Manage Trips</h3>
                        <p>
                            Start, update and complete assigned trips.
                        </p>
                        <span>Manage Trips</span>
                    </Link>

                    <Link
                        to="/operator/passengers"
                        className="operator-action"
                    >
                        <h3>Passengers</h3>
                        <p>
                            View passenger and booking information.
                        </p>
                        <span>View Passengers</span>
                    </Link>

                    <Link
                        to="/operator/schedule"
                        className="operator-action"
                    >
                        <h3>Schedule</h3>
                        <p>
                            View your daily assigned trip schedule.
                        </p>
                        <span>View Schedule</span>
                    </Link>
                </section>
            </main>
        </div>
    );
}

export default OperatorDashboard;