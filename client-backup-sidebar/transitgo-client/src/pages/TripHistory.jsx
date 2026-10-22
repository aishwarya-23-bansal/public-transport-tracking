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
            setError(error.response?.data?.message || "Unable to load trip history.");
        } finally {
            setLoading(false);
        }
    };

    const filteredTrips = tickets.filter((ticket) => {
        if (activeFilter === "completed") return ticket.status === "Completed";
        if (activeFilter === "cancelled") return ticket.status === "Cancelled";

        return ticket.status === "Completed" || ticket.status === "Cancelled";
    });

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    return (
        <div className="history-page">

            <nav className="main-nav">
                <Link to="/dashboard" className="brand">
                    Transit<span>Go</span>
                </Link>

                <div className="nav-links">
                    <Link to="/dashboard">Home</Link>
                    <Link to="/routes">Routes</Link>
                    <Link to="/tickets">Tickets</Link>
                    <Link to="/history" className="active">History</Link>
                    <Link to="/alerts">Updates</Link>
                </div>

                <div className="nav-user">
                    <Link to="/profile">Profile</Link>
                    <Link to="/dashboard">Dashboard</Link>
                </div>
            </nav>

            <main className="history-content">

                <section className="history-heading">
                    <span>YOUR JOURNEYS</span>
                    <h1>Trip History</h1>
                    <p>View your previous journeys and travel details.</p>
                </section>

                <div className="history-filters">
                    <button
                        className={activeFilter === "all" ? "history-filter active-filter" : "history-filter"}
                        onClick={() => setActiveFilter("all")}
                    >
                        All Trips
                    </button>

                    <button
                        className={activeFilter === "completed" ? "history-filter active-filter" : "history-filter"}
                        onClick={() => setActiveFilter("completed")}
                    >
                        Completed
                    </button>

                    <button
                        className={activeFilter === "cancelled" ? "history-filter active-filter" : "history-filter"}
                        onClick={() => setActiveFilter("cancelled")}
                    >
                        Cancelled
                    </button>
                </div>

                {loading && (
                    <div className="history-message">
                        <strong>Loading trip history...</strong>
                        <p>Please wait while we load your previous trips.</p>
                    </div>
                )}

                {!loading && error && (
                    <div className="history-message">
                        <strong>Unable to load trip history</strong>
                        <p>{error}</p>

                        <button className="history-action" onClick={fetchTrips}>
                            Try Again
                        </button>
                    </div>
                )}

                {!loading && !error && filteredTrips.length === 0 && (
                    <div className="history-message">
                        <strong>
                            {activeFilter === "completed"
                                ? "No completed trips"
                                : activeFilter === "cancelled"
                                    ? "No cancelled trips"
                                    : "No trips yet"}
                        </strong>

                        <p>
                            {activeFilter === "completed"
                                ? "Your completed journeys will appear here after you finish a trip."
                                : activeFilter === "cancelled"
                                    ? "Cancelled journeys will appear here."
                                    : "Your previous journeys will appear here after you travel with TransitGo."}
                        </p>

                        {activeFilter === "all" && (
                            <Link to="/routes" className="history-action">
                                Find a Route →
                            </Link>
                        )}
                    </div>
                )}

                {!loading && !error && filteredTrips.length > 0 && (
                    <section className="history-results">

                        <div className="history-results-header">
                            <div>
                                <span>JOURNEYS</span>
                                <h2>Previous trips</h2>
                            </div>

                            <small>
                                {filteredTrips.length}{" "}
                                {filteredTrips.length === 1 ? "trip" : "trips"}
                            </small>
                        </div>

                        <div className="history-list">

                            {filteredTrips.map((ticket) => (
                                <div className="history-row" key={ticket._id}>

                                    <div className="history-date">
                                        <span>{formatDate(ticket.journeyDate)}</span>
                                        <small>{ticket.ticketNumber}</small>
                                    </div>

                                    <div className="history-route">
                                        <strong>
                                            {ticket.route?.source || "Unknown"}
                                        </strong>

                                        <span>→</span>

                                        <strong>
                                            {ticket.route?.destination || "Unknown"}
                                        </strong>
                                    </div>

                                    <div className="history-route-info">
                                        <span>
                                            Route {ticket.route?.routeNumber || "N/A"}
                                        </span>

                                        <small>
                                            ₹{ticket.fare}
                                        </small>
                                    </div>

                                    <span
                                        className={`history-status ${ticket.status.toLowerCase()}`}
                                    >
                                        {ticket.status}
                                    </span>

                                </div>
                            ))}

                        </div>

                    </section>
                )}

            </main>

            <footer className="commuter-footer">
                <div>
                    <div className="brand">
                        Transit<span>Go</span>
                    </div>

                    <p>
                        Making public transport simpler, smarter and more accessible.
                    </p>
                </div>

                <div className="footer-links">
                    <Link to="/routes">Routes</Link>
                    <Link to="/tickets">Tickets</Link>
                    <Link to="/profile">Profile</Link>
                </div>
            </footer>

        </div>
    );
}

export default TripHistory;