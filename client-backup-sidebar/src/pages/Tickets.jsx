import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../App.css";

function Tickets() {
    const [activeTab, setActiveTab] = useState("active");
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [cancellingId, setCancellingId] = useState(null);

    useEffect(() => {
        fetchTickets();
    }, []);

    const fetchTickets = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/tickets/my");
            setTickets(response.data.tickets || []);
        } catch (error) {
            console.error("Fetch tickets error:", error);
            setError(error.response?.data?.message || "Unable to load tickets.");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (ticketId) => {
        const confirmed = window.confirm("Are you sure you want to cancel this ticket?");

        if (!confirmed) return;

        try {
            setCancellingId(ticketId);
            await api.put(`/tickets/${ticketId}/cancel`);
            await fetchTickets();
        } catch (error) {
            console.error("Cancel ticket error:", error);
            alert(error.response?.data?.message || "Unable to cancel ticket.");
        } finally {
            setCancellingId(null);
        }
    };

    const displayedTickets = tickets.filter((ticket) => {
        if (activeTab === "active") return ticket.status === "Confirmed";

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
        <div className="tickets-page">

            <nav className="main-nav">
                <Link to="/dashboard" className="brand">
                    Transit<span>Go</span>
                </Link>

                <div className="nav-links">
                    <Link to="/dashboard">Home</Link>
                    <Link to="/routes">Routes</Link>
                    <Link to="/tickets" className="active">Tickets</Link>
                    <Link to="/history">History</Link>
                    <Link to="/alerts">Updates</Link>
                </div>

                <div className="nav-user">
                    <Link to="/profile">Profile</Link>
                    <Link to="/dashboard">Dashboard</Link>
                </div>
            </nav>

            <main className="tickets-content">

                <section className="tickets-heading">
                    <span>YOUR BOOKINGS</span>
                    <h1>My Tickets</h1>
                    <p>View and manage your transport bookings.</p>
                </section>

                <div className="ticket-tabs">
                    <button
                        className={activeTab === "active" ? "active-tab" : ""}
                        onClick={() => setActiveTab("active")}
                    >
                        Active
                    </button>

                    <button
                        className={activeTab === "past" ? "active-tab" : ""}
                        onClick={() => setActiveTab("past")}
                    >
                        Past
                    </button>
                </div>

                {loading && (
                    <div className="ticket-message">
                        <strong>Loading tickets...</strong>
                        <p>Please wait while we load your bookings.</p>
                    </div>
                )}

                {!loading && error && (
                    <div className="ticket-message">
                        <strong>Unable to load tickets</strong>
                        <p>{error}</p>

                        <button className="ticket-action" onClick={fetchTickets}>
                            Try Again
                        </button>
                    </div>
                )}

                {!loading && !error && displayedTickets.length === 0 && (
                    <div className="ticket-message">

                        <strong>
                            {activeTab === "active"
                                ? "No active tickets"
                                : "No past tickets"}
                        </strong>

                        <p>
                            {activeTab === "active"
                                ? "You don't have any active tickets yet. Search for a route and book your journey."
                                : "Your completed and cancelled tickets will appear here."}
                        </p>

                        {activeTab === "active" && (
                            <Link to="/routes" className="ticket-action">
                                Find a Route →
                            </Link>
                        )}

                    </div>
                )}

                {!loading && !error && displayedTickets.length > 0 && (
                    <section className="ticket-results">

                        <div className="ticket-results-header">
                            <div>
                                <span>{activeTab === "active" ? "ACTIVE BOOKINGS" : "PREVIOUS BOOKINGS"}</span>
                                <h2>
                                    {activeTab === "active"
                                        ? "Upcoming journeys"
                                        : "Past journeys"}
                                </h2>
                            </div>

                            <small>
                                {displayedTickets.length}{" "}
                                {displayedTickets.length === 1 ? "ticket" : "tickets"}
                            </small>
                        </div>

                        <div className="ticket-list">

                            {displayedTickets.map((ticket) => (
                                <div className="ticket-row" key={ticket._id}>

                                    <div className="ticket-number">
                                        <span>TICKET</span>
                                        <strong>{ticket.ticketNumber}</strong>
                                    </div>

                                    <div className="ticket-route">
                                        <strong>
                                            {ticket.route?.source || "Unknown"}
                                        </strong>

                                        <span>→</span>

                                        <strong>
                                            {ticket.route?.destination || "Unknown"}
                                        </strong>
                                    </div>

                                    <div className="ticket-info">
                                        <span>{formatDate(ticket.journeyDate)}</span>
                                        <small>
                                            Route {ticket.route?.routeNumber || "N/A"}
                                        </small>
                                    </div>

                                    <div className="ticket-fare">
                                        <span>FARE</span>
                                        <strong>₹{ticket.fare}</strong>
                                    </div>

                                    <span className={`ticket-status ${ticket.status.toLowerCase()}`}>
                                        {ticket.status}
                                    </span>

                                    {ticket.status === "Confirmed" && (
                                        <button
                                            type="button"
                                            className="cancel-ticket-button"
                                            disabled={cancellingId === ticket._id}
                                            onClick={() => handleCancel(ticket._id)}
                                        >
                                            {cancellingId === ticket._id
                                                ? "Cancelling..."
                                                : "Cancel"}
                                        </button>
                                    )}

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

export default Tickets;