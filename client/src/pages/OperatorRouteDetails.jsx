import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
import "../App.css";

function OperatorRouteDetails() {
    const { id } = useParams();

    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchRouteDetails();
    }, [id]);

    const fetchRouteDetails = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/trips/operator");

            const assignedTrip = response.data.trips.find(
                (trip) => trip.route?._id === id
            );

            if (!assignedTrip) {
                setError("Assigned route not found.");
                return;
            }

            setTrip(assignedTrip);
        } catch (error) {
            console.error("Fetch route details error:", error);

            setError(
                error.response?.data?.message ||
                "Unable to load route details."
            );
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="operator-page">
                <nav className="navbar">
                    <Link to="/operator" className="dashboard-logo">
                        Transit<span>Go</span>
                    </Link>
                </nav>

                <main className="operator-content">
                    <div className="operator-empty">
                        <h3>Loading route details...</h3>
                        <p>
                            Please wait while the route information is loaded.
                        </p>
                    </div>
                </main>
            </div>
        );
    }

    if (error || !trip) {
        return (
            <div className="operator-page">
                <nav className="navbar">
                    <Link to="/operator" className="dashboard-logo">
                        Transit<span>Go</span>
                    </Link>

                    <div className="nav-right">
                        <Link
                            to="/operator/routes"
                            className="back-link"
                        >
                            Assigned Routes
                        </Link>
                    </div>
                </nav>

                <main className="operator-content">
                    <div className="operator-empty">
                        <h3>Unable to load route</h3>
                        <p>
                            {error || "Route details not found."}
                        </p>

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

    const route = trip.route;

    return (
        <div className="operator-page">
            <nav className="navbar">
                <Link to="/operator" className="dashboard-logo">
                    Transit<span>Go</span>
                </Link>

                <div className="nav-right">
                    <Link
                        to="/profile"
                        className="profile-link"
                    >
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

                            <h2>
                                Route {route.routeNumber}
                            </h2>
                        </div>

                        <span className="route-status">
                            {trip.status}
                        </span>
                    </div>

                    <div className="route-detail-grid">
                        <div>
                            <span>Starting Point</span>

                            <strong>
                                {route.source}
                            </strong>
                        </div>

                        <div>
                            <span>Destination</span>

                            <strong>
                                {route.destination}
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
                            <span>Total Stops</span>

                            <strong>
                                {route.stops?.length || 0}
                            </strong>
                        </div>

                        <div>
                            <span>Distance</span>

                            <strong>
                                {route.distance} km
                            </strong>
                        </div>
                    </div>

                    <div className="route-stops">
                        <h3>Route Stops</h3>

                        <div className="stop-list">
                            {route.stops?.map((stop, index) => (
                                <div key={index}>
                                    {stop}
                                </div>
                            ))}
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