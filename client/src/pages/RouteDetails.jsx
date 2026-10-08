import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../App.css";

function RouteDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [route, setRoute] = useState(null);
    const [journeyDate, setJourneyDate] = useState("");

    const [loading, setLoading] = useState(true);
    const [booking, setBooking] = useState(false);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);

    const [bookingMessage, setBookingMessage] = useState("");
    const [saveMessage, setSaveMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        fetchRoute();
        checkIfSaved();
    }, [id]);

    // -----------------------------
    // GET ROUTE
    // -----------------------------

    const fetchRoute = async () => {
        try {
            setLoading(true);

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

    // -----------------------------
    // CHECK IF ROUTE IS SAVED
    // -----------------------------

    const checkIfSaved = async () => {
        try {
            const response = await api.get("/saved-routes");

            const savedRoutes = response.data.savedRoutes || [];

            const alreadySaved = savedRoutes.some(
                (item) =>
                    item.route?._id === id
            );

            setSaved(alreadySaved);

        } catch (error) {
            console.error("Check saved route error:", error);
        }
    };

    // -----------------------------
    // SAVE / REMOVE ROUTE
    // -----------------------------

    const handleSaveRoute = async () => {
        try {
            setSaving(true);
            setSaveMessage("");

            if (!saved) {

                await api.post("/saved-routes", {
                    routeId: id
                });

                setSaved(true);
                setSaveMessage("Route saved successfully.");

            } else {

                const response = await api.get("/saved-routes");

                const savedRoutes = response.data.savedRoutes || [];

                const savedRoute = savedRoutes.find(
                    (item) =>
                        item.route?._id === id
                );

                if (savedRoute) {
                    await api.delete(
                        `/saved-routes/${savedRoute._id}`
                    );
                }

                setSaved(false);
                setSaveMessage("Route removed from saved routes.");
            }

        } catch (error) {
            console.error("Save route error:", error);

            setSaveMessage(
                error.response?.data?.message ||
                "Unable to update saved route."
            );

        } finally {
            setSaving(false);
        }
    };

    // -----------------------------
    // BOOK ROUTE
    // -----------------------------

    const handleBooking = async () => {

        if (!journeyDate) {
            setBookingMessage(
                "Please select a journey date."
            );
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

    // -----------------------------
    // LOADING
    // -----------------------------

    if (loading) {
        return (
            <div className="routes-page">
                <div className="route-details-loading">
                    Loading route details...
                </div>
            </div>
        );
    }

    // -----------------------------
    // ERROR
    // -----------------------------

    if (error || !route) {
        return (
            <div className="routes-page">

                <div className="route-details-error">

                    <h2>Route not found</h2>

                    <p>
                        {error ||
                            "Unable to load this route."}
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

    // -----------------------------
    // PAGE
    // -----------------------------

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

                    {/* HEADER */}

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


                    {/* ROUTE INFORMATION */}

                    <div className="route-detail-info">

                        <div>
                            <span>From</span>
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
                            <span>Distance</span>
                            <strong>
                                {route.distance} km
                            </strong>
                        </div>

                        <div>
                            <span>Duration</span>
                            <strong>
                                {route.duration} min
                            </strong>
                        </div>

                        <div>
                            <span>Fare</span>
                            <strong>
                                ₹{route.fare}
                            </strong>
                        </div>

                        <div>
                            <span>Total Stops</span>
                            <strong>
                                {route.stops?.length || 0}
                            </strong>
                        </div>

                    </div>


                    {/* STOPS */}

                    <div className="route-stop-section">

                        <h3>Route Stops</h3>

                        {route.stops?.length > 0 ? (

                            <div className="route-stop-list">

                                {route.stops.map(
                                    (stop, index) => (
                                        <div key={index}>
                                            {index + 1}. {stop}
                                        </div>
                                    )
                                )}

                            </div>

                        ) : (

                            <p>
                                No stops available.
                            </p>

                        )}

                    </div>


                    {/* SAVE ROUTE */}

                    <div className="save-route-section">

                        <button
                            type="button"
                            className="save-route-button"
                            onClick={handleSaveRoute}
                            disabled={saving}
                        >

                            {saving
                                ? "Updating..."
                                : saved
                                    ? "★ Saved Route"
                                    : "☆ Save Route"}

                        </button>

                        {saveMessage && (
                            <p className="save-route-message">
                                {saveMessage}
                            </p>
                        )}

                    </div>


                    {/* BOOKING */}

                    <div className="booking-section">

                        <h3>
                            Book This Route
                        </h3>

                        <p>
                            Select your journey date to book
                            this route.
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
                                        setJourneyDate(
                                            e.target.value
                                        )
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