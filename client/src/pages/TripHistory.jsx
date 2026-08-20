import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../App.css";

function TripHistory() {
    const [activeFilter, setActiveFilter] = useState("all");
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchTrips();
    }, []);

    const fetchTrips = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/tickets/my");
            setTickets(response.data.tickets || []);
        } catch (error) {
            console.error("Fetch trip history error:", error);
            setError(
                error.response?.data?.message ||
                "Unable to load trip history."
            );
        } finally {
            setLoading(false);
        }
    };

    const completedTrips = tickets.filter(
        (ticket) => ticket.status === "Completed"
    );

    const cancelledTrips = tickets.filter(
        (ticket) => ticket.status === "Cancelled"
    );

    const filteredTrips =
        activeFilter === "completed"
            ? completedTrips
            : activeFilter === "cancelled"
                ? cancelledTrips
                : tickets.filter(
                    (ticket) =>
                        ticket.status === "Completed" ||
                        ticket.status === "Cancelled"
                );

    return (
        <div className="history-page">
            <nav className="navbar">
                <Link to="/dashboard" className="dashboard-logo">
                    Transit<span>Go</span>
                </Link>

                <div className="nav-right">
                    <Link to="/profile" className="profile-link">
                        Profile
                    </Link>

                    <Link to="/dashboard" className="back-link">
                        Dashboard
                    </Link>
                </div>
            </nav>

            <main className="history-content">
                <div className="history-heading">
                    <h1>Trip History</h1>
                    <p>
                        View your previous journeys and travel details.
                    </p>
                </div>

                <div className="history-filters">
                    <button
                        className={
                            activeFilter === "all"
                                ? "history-filter active-filter"
                                : "history-filter"
                        }
                        onClick={() => setActiveFilter("all")}
                    >
                        All Trips
                    </button>

                    <button
                        className={
                            activeFilter === "completed"
                                ? "history-filter active-filter"
                                : "history-filter"
                        }
                        onClick={() => setActiveFilter("completed")}
                    >
                        Completed
                    </button>

                    <button
                        className={
                            activeFilter === "cancelled"
                                ? "history-filter active-filter"
                                : "history-filter"
                        }
                        onClick={() => setActiveFilter("cancelled")}
                    >
                        Cancelled
                    </button>
                </div>

                {loading && (
                    <div className="empty-history">
                        <h3>Loading trip history...</h3>
                        <p>
                            Please wait while we load your previous trips.
                        </p>
                    </div>
                )}

                {!loading && error && (
                    <div className="empty-history">
                        <h3>Unable to load trip history</h3>
                        <p>{error}</p>

                        <button
                            className="primary-button"
                            onClick={fetchTrips}
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {!loading && !error && filteredTrips.length === 0 && (
                    <div className="empty-history">
                        <h3>
                            {activeFilter === "completed"
                                ? "No completed trips"
                                : activeFilter === "cancelled"
                                    ? "No cancelled trips"
                                    : "No trips yet"}
                        </h3>

                        <p>
                            {activeFilter === "completed"
                                ? "Your completed journeys will appear here after you finish a trip."
                                : activeFilter === "cancelled"
                                    ? "Cancelled journeys will appear here."
                                    : "Your previous journeys will appear here after you start travelling with TransitGo."}
                        </p>

                        {activeFilter === "all" && (
                            <Link
                                to="/routes"
                                className="primary-button"
                            >
                                Find a Route
                            </Link>
                        )}
                    </div>
                )}

                {!loading && !error && filteredTrips.length > 0 && (
                    <div className="history-list">
                        {filteredTrips.map((ticket) => (
                            <div
                                className="history-card"
                                key={ticket._id}
                            >
                                <div className="history-card-header">
                                    <div>
                                        <span>Ticket</span>
                                        <h2>{ticket.ticketNumber}</h2>
                                    </div>

                                    <span
                                        className={`history-status ${ticket.status.toLowerCase()}`}
                                    >
                                        {ticket.status}
                                    </span>
                                </div>

                                <div className="history-route">
                                    <div>
                                        <span>From</span>
                                        <strong>
                                            {ticket.route?.source || "Unknown"}
                                        </strong>
                                    </div>

                                    <div>
                                        <span>To</span>
                                        <strong>
                                            {ticket.route?.destination || "Unknown"}
                                        </strong>
                                    </div>
                                </div>

                                <div className="history-details">
                                    <div>
                                        <span>Route</span>
                                        <strong>
                                            {ticket.route?.routeNumber || "N/A"}
                                        </strong>
                                    </div>

                                    <div>
                                        <span>Journey Date</span>
                                        <strong>
                                            {new Date(
                                                ticket.journeyDate
                                            ).toLocaleDateString("en-IN", {
                                                day: "2-digit",
                                                month: "short",
                                                year: "numeric"
                                            })}
                                        </strong>
                                    </div>

                                    <div>
                                        <span>Fare</span>
                                        <strong>₹{ticket.fare}</strong>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

export default TripHistory;