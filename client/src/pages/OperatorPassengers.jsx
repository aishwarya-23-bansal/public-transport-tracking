import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../App.css";

function OperatorPassengers() {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchPassengers();
    }, []);

    const fetchPassengers = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/tickets/operator");
            setTickets(response.data.tickets || []);
        } catch (error) {
            console.error("Fetch passengers error:", error);

            setError(
                error.response?.data?.message ||
                "Unable to load passenger information."
            );
        } finally {
            setLoading(false);
        }
    };

    const bookedSeats = tickets.filter(
        (ticket) => ticket.status === "Confirmed"
    ).length;

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
                        to="/operator"
                        className="back-link"
                    >
                        Dashboard
                    </Link>
                </div>
            </nav>

            <main className="operator-content">
                <div className="operator-heading">
                    <h1>Passengers</h1>

                    <p>
                        View passenger information for your assigned trips.
                    </p>
                </div>

                {loading && (
                    <div className="operator-empty">
                        <h3>Loading passengers...</h3>

                        <p>
                            Please wait while passenger information is loaded.
                        </p>
                    </div>
                )}

                {!loading && error && (
                    <div className="operator-empty">
                        <h3>Unable to load passengers</h3>

                        <p>{error}</p>

                        <button
                            className="start-trip-button"
                            onClick={fetchPassengers}
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {!loading && !error && (
                    <>
                        <div className="passenger-summary">
                            <div className="operator-stat">
                                <span>Total Passengers</span>

                                <strong>
                                    {bookedSeats}
                                </strong>
                            </div>

                            <div className="operator-stat">
                                <span>Booked Seats</span>

                                <strong>
                                    {bookedSeats}
                                </strong>
                            </div>

                            <div className="operator-stat">
                                <span>Available Seats</span>

                                <strong>
                                    0
                                </strong>
                            </div>
                        </div>

                        <div className="passenger-section">
                            <div className="section-header">
                                <div>
                                    <h2>Passenger List</h2>

                                    <p>
                                        Passengers booked on your assigned trips.
                                    </p>
                                </div>
                            </div>

                            <div className="passenger-table-wrapper">
                                <table className="passenger-table">
                                    <thead>
                                        <tr>
                                            <th>Passenger</th>
                                            <th>Ticket ID</th>
                                            <th>Route</th>
                                            <th>Booking Status</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {tickets.length === 0 ? (
                                            <tr>
                                                <td colSpan="4">
                                                    No passengers found
                                                </td>
                                            </tr>
                                        ) : (
                                            tickets.map((ticket) => (
                                                <tr key={ticket._id}>
                                                    <td>
                                                        {ticket.user?.name ||
                                                            "Unknown"}
                                                    </td>

                                                    <td>
                                                        {ticket.ticketNumber}
                                                    </td>

                                                    <td>
                                                        Route{" "}
                                                        {ticket.route
                                                            ?.routeNumber ||
                                                            "N/A"}
                                                    </td>

                                                    <td>
                                                        {ticket.status}
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}

export default OperatorPassengers;