import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
import "../App.css";

function RouteDetails() {
    const { id } = useParams();
    const [journeyDate, setJourneyDate] = useState("");
    const [booking, setBooking] = useState(false);
    const [bookingMessage, setBookingMessage] = useState("");
    const [route, setRoute] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchRoute();
    }, [id]);

    const fetchRoute = async () => {
        try {
            const response = await api.get(`/routes/${id}`);

            setRoute(response.data.route);

        } catch (error) {
            console.error("Route details error:", error);

            setError(
                error.response?.data?.message ||
                "Unable to load route details."
            );

        } finally {
            setLoading(false);
        }
    };
    const handleBooking = async () => {
        if (!journeyDate) {
            setBookingMessage("Please select a journey date.");
            return;
        }

        try {
            setBooking(true);
            setBookingMessage("");

            const ticketNumber =
                "TKT" + Date.now();

            await api.post("/tickets", {
                ticketNumber,
                route: route._id,
                journeyDate,
                fare: route.fare
            });

            setBookingMessage(
                "Booking successful. Your ticket has been created."
            );

        } catch (error) {
            console.error("Booking error:", error);

            setBookingMessage(
                error.response?.data?.message ||
                "Unable to complete booking."
            );

        } finally {
            setBooking(false);
        }
    };
    if (loading) {
        return (
            <div className="routes-page">
                <div className="route-details-loading">
                    Loading route details...
                </div>
            </div>
        );
    }

    if (error || !route) {
        return (
            <div className="routes-page">

                <div className="route-details-error">

                    <h2>Route not found</h2>

                    <p>
                        {error || "Unable to load this route."}
                    </p>

                    <Link
                        to="/routes"
                        className="route-back-button"
                    >
                        Back to Routes
                    </Link>

                </div>

            </div>
        );
    }

    return (
        <div className="routes-page">

            <nav className="navbar">

                <Link
                    to="/dashboard"
                    className="dashboard-logo"
                >
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
                        to="/routes"
                        className="back-link"
                    >
                        Routes
                    </Link>

                </div>

            </nav>


            <main className="routes-content">

                <div className="routes-heading">

                    <h1>Route Details</h1>

                    <p>
                        Detailed information about your selected route.
                    </p>

                </div>


                <div className="route-detail-card">

                    <div className="route-detail-header">

                        <div>

                            <span>ROUTE</span>

                            <h2>
                                {route.routeNumber}
                            </h2>

                        </div>

                        <span className="route-detail-status">
                            {route.status}
                        </span>

                    </div>
                    <div className="route-detail-info">

                        <div>
                            <span>From</span>
                            <strong>{route.source}</strong>
                        </div>

                        <div>
                            <span>Destination</span>
                            <strong>{route.destination}</strong>
                        </div>

                        <div>
                            <span>Distance</span>
                            <strong>{route.distance} km</strong>
                        </div>

                        <div>
                            <span>Duration</span>
                            <strong>{route.duration} min</strong>
                        </div>

                        <div>
                            <span>Fare</span>
                            <strong>₹{route.fare}</strong>
                        </div>

                        <div>
                            <span>Total Stops</span>
                            <strong>{route.stops?.length || 0}</strong>
                        </div>

                    </div>
                    <div className="route-stop-section">

                        <h3>Route Stops</h3>

                        {route.stops?.length > 0 ? (

                            <div className="route-stop-list">

                                {route.stops.map((stop, index) => (
                                    <div key={index}>
                                        {index + 1}. {stop}
                                    </div>
                                ))}

                            </div>

                        ) : (

                            <p>
                                No stops available.
                            </p>

                        )}

                    </div>
                    <div className="booking-section">

                        <h3>Book This Route</h3>

                        <p>
                            Select your journey date to book this route.
                        </p>

                        <div className="booking-form">

                            <div className="booking-field">

                                <label htmlFor="journeyDate">
                                    Journey Date
                                </label>

                                <input
                                    id="journeyDate"
                                    type="date"
                                    value={journeyDate}
                                    onChange={(e) =>
                                        setJourneyDate(e.target.value)
                                    }
                                    min={
                                        new Date()
                                            .toISOString()
                                            .split("T")[0]
                                    }
                                />

                            </div>


                            <button
                                type="button"
                                className="book-route-button"
                                onClick={handleBooking}
                                disabled={booking}
                            >
                                {booking
                                    ? "Booking..."
                                    : "Book This Route"}
                            </button>

                        </div>


                        {bookingMessage && (
                            <p className="booking-message">
                                {bookingMessage}
                            </p>
                        )}

                    </div>
                    <Link
                        to="/routes"
                        className="route-back-button"
                    >
                        Back to Routes
                    </Link>

                </div>

            </main>

        </div>
    );
}

export default RouteDetails;