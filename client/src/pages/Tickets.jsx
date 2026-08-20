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

            setError(
                error.response?.data?.message ||
                "Unable to load tickets."
            );

        } finally {
            setLoading(false);
        }
    };

    const handleCancel = async (ticketId) => {
        const confirmed = window.confirm(
            "Are you sure you want to cancel this ticket?"
        );

        if (!confirmed) {
            return;
        }

        try {
            setCancellingId(ticketId);

            await api.put(`/tickets/${ticketId}/cancel`);

            await fetchTickets();

        } catch (error) {
            console.error("Cancel ticket error:", error);

            alert(
                error.response?.data?.message ||
                "Unable to cancel ticket."
            );

        } finally {
            setCancellingId(null);
        }
    };

    const activeTickets = tickets.filter(
        (ticket) =>
            ticket.status === "Confirmed"
    );

    const pastTickets = tickets.filter(
        (ticket) =>
            ticket.status === "Completed" ||
            ticket.status === "Cancelled"
    );

    const displayedTickets =
        activeTab === "active"
            ? activeTickets
            : pastTickets;

    return (
        <div className="tickets-page">

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
                        to="/dashboard"
                        className="back-link"
                    >
                        Dashboard
                    </Link>
                </div>
            </nav>
            <main className="tickets-content">
                <div className="tickets-heading">
                    <h1>My Tickets</h1>
                    <p>View and manage your transport bookings.</p>
                </div>
                <div className="ticket-tabs">
                    <button
                        className={activeTab === "active"? "active-tab": ""}
                        onClick={() =>setActiveTab("active")}>
                        Active
                    </button>
                    <button
                        className={activeTab === "past"? "active-tab": ""}
                        onClick={() =>setActiveTab("past")}>
                        Past
                    </button>
                </div>
                {loading && (
                    <div className="empty-tickets">
                        <h3>
                            Loading tickets...
                        </h3>
                        <p>
                            Please wait while we load your bookings.
                        </p>
                    </div>
                )}
                {!loading && error && (
                    <div className="empty-tickets">
                        <h3>Unable to load tickets</h3>
                        <p>{error}</p>
                        <button className="primary-button"onClick={fetchTickets}>
                            Try Again
                        </button>
                    </div>
                )}
                {!loading &&!error &&displayedTickets.length === 0 && (
                        <div className="empty-tickets">
                            <h3>
                                {activeTab === "active"
                                    ? "No active tickets"
                                    : "No past tickets"}
                            </h3>
                            <p>
                                {activeTab === "active"
                                    ? "You don't have any active tickets yet. Search for a route and book your journey."
                                    : "Your completed and cancelled tickets will appear here."}
                            </p>
                            {activeTab === "active" && (
                                <Link
                                    to="/routes"
                                    className="primary-button"
                                >
                                    Find a Route
                                </Link>
                            )}
                        </div>
                    )}
                {!loading &&!error &&displayedTickets.length > 0 && (
                        <div className="tickets-list">
                            {displayedTickets.map((ticket) => (
                                <div
                                    className="ticket-card"
                                    key={ticket._id}>
                                    <div className="ticket-card-header">
                                        <div>
                                            <span className="ticket-label">TICKET</span>
                                            <h2>
                                                {ticket.ticketNumber}
                                            </h2>
                                        </div>
                                        <span className={`ticket-status ${ticket.status.toLowerCase()}`}>
                                            {ticket.status}
                                        </span>
                                    </div>
                                    <div className="ticket-route">
                                        <div>
                                            <span>FROM</span>
                                            <strong>
                                                {ticket.route?.source ||
                                                    "Unknown"}
                                            </strong>
                                        </div>
                                        <div className="ticket-arrow">
                                            →
                                        </div>
                                        <div>
                                            <span>TO</span>
                                            <strong>{ticket.route?.destination ||"Unknown"}</strong>
                                        </div>
                                    </div>
                                    <div className="ticket-details">
                                        <div>
                                            <span>Journey Date</span>
                                            <strong>{new Date(
                                                    ticket.journeyDate).toLocaleDateString("en-IN",
                                                    {day: "2-digit",month: "short",year: "numeric"})}</strong>
                                        </div>
                                        <div>
                                            <span>Route</span>
                                            <strong>{ticket.route?.routeNumber ||"N/A"}</strong>
                                        </div>
                                        <div>
                                            <span>Fare</span>
                                            <strong>₹{ticket.fare}</strong>
                                        </div>
                                    </div>
                                    {ticket.status === "Confirmed" && (
                                        <div className="ticket-actions">
                                            <button
                                                type="button"
                                                className="cancel-ticket-button"
                                                disabled={cancellingId ===ticket._id
                                                }
                                                onClick={() => handleCancel(ticket._id)}>
                                                {cancellingId === ticket._id
                                                    ? "Cancelling..."
                                                    : "Cancel Ticket"}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
            </main>
        </div>
    );
}

export default Tickets;