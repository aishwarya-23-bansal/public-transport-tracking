import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../App.css";

function AdminBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [selectedBooking, setSelectedBooking] = useState(null);

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/tickets/admin");

            setBookings(response.data.tickets || []);
        } catch (error) {
            console.error("Fetch bookings error:", error);

            setError(
                error.response?.data?.message ||
                "Unable to load bookings."
            );
        } finally {
            setLoading(false);
        }
    };

    const totalBookings = bookings.length;

    const confirmedBookings = bookings.filter(
        (booking) => booking.status === "Confirmed"
    ).length;

    const cancelledBookings = bookings.filter(
        (booking) => booking.status === "Cancelled"
    ).length;

    return (
        <div className="admin-page">

            <nav className="navbar">

                <Link
                    to="/admin"
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
                        to="/admin"
                        className="back-link"
                    >
                        Dashboard
                    </Link>

                </div>

            </nav>


            <main className="admin-content">

                <div className="admin-heading">

                    <h1>Booking Management</h1>

                    <p>
                        Monitor tickets and passenger booking activity.
                    </p>

                </div>


                <div className="booking-stats">

                    <div className="admin-stat">
                        <span>Total Bookings</span>
                        <strong>{totalBookings}</strong>
                    </div>

                    <div className="admin-stat">
                        <span>Confirmed</span>
                        <strong>{confirmedBookings}</strong>
                    </div>

                    <div className="admin-stat">
                        <span>Cancelled</span>
                        <strong>{cancelledBookings}</strong>
                    </div>

                </div>


                <div className="booking-management-header">

                    <div>

                        <h2>Recent Bookings</h2>

                        <p>
                            View recent passenger ticket bookings.
                        </p>

                    </div>

                </div>


                {loading && (

                    <div className="admin-empty">

                        <h3>Loading bookings...</h3>

                        <p>
                            Please wait while bookings are loaded.
                        </p>

                    </div>

                )}


                {!loading && error && (

                    <div className="admin-empty">

                        <h3>Unable to load bookings</h3>

                        <p>{error}</p>

                        <button
                            type="button"
                            className="admin-primary-button"
                            onClick={fetchBookings}
                        >
                            Try Again
                        </button>

                    </div>

                )}


                {!loading && !error && (

                    <div className="admin-bookings-table-wrapper">

                        <table className="admin-bookings-table">

                            <thead>

                                <tr>
                                    <th>Ticket ID</th>
                                    <th>Passenger</th>
                                    <th>Route</th>
                                    <th>Date</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>

                            </thead>


                            <tbody>

                                {bookings.length === 0 ? (

                                    <tr>

                                        <td colSpan="6">
                                            No bookings available
                                        </td>

                                    </tr>

                                ) : (

                                    bookings.map((booking) => (

                                        <tr key={booking._id}>

                                            <td>
                                                {booking.ticketNumber}
                                            </td>

                                            <td>
                                                {booking.user?.name ||
                                                    "Unknown"}
                                            </td>

                                            <td>
                                                Route{" "}
                                                {booking.route?.routeNumber ||
                                                    "N/A"}
                                            </td>

                                            <td>
                                                {new Date(
                                                    booking.journeyDate
                                                ).toLocaleDateString(
                                                    "en-IN"
                                                )}
                                            </td>

                                            <td>
                                                {booking.status}
                                            </td>

                                            <td>

                                                <button
                                                    type="button"
                                                    className="admin-action-button"
                                                    onClick={() =>
                                                        setSelectedBooking(
                                                            booking
                                                        )
                                                    }
                                                >
                                                    View
                                                </button>

                                            </td>

                                        </tr>

                                    ))

                                )}

                            </tbody>

                        </table>

                    </div>

                )}

            </main>


            {selectedBooking && (

                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(0, 0, 0, 0.6)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 9999,
                        padding: "20px"
                    }}
                >

                    <div
                        style={{
                            background: "white",
                            padding: "30px",
                            borderRadius: "12px",
                            width: "450px",
                            maxWidth: "100%",
                            color: "#111"
                        }}
                    >

                        <h2>Booking Details</h2>

                        <p>
                            <strong>Ticket ID:</strong>{" "}
                            {selectedBooking.ticketNumber}
                        </p>

                        <p>
                            <strong>Passenger:</strong>{" "}
                            {selectedBooking.user?.name ||
                                "Unknown"}
                        </p>

                        <p>
                            <strong>Email:</strong>{" "}
                            {selectedBooking.user?.email ||
                                "N/A"}
                        </p>

                        <p>
                            <strong>Phone:</strong>{" "}
                            {selectedBooking.user?.phone ||
                                "N/A"}
                        </p>

                        <p>
                            <strong>Route:</strong>{" "}
                            {selectedBooking.route?.routeNumber ||
                                "N/A"}
                        </p>

                        <p>
                            <strong>From:</strong>{" "}
                            {selectedBooking.route?.source ||
                                "N/A"}
                        </p>

                        <p>
                            <strong>Destination:</strong>{" "}
                            {selectedBooking.route?.destination ||
                                "N/A"}
                        </p>

                        <p>
                            <strong>Journey Date:</strong>{" "}
                            {new Date(
                                selectedBooking.journeyDate
                            ).toLocaleDateString(
                                "en-IN"
                            )}
                        </p>

                        <p>
                            <strong>Fare:</strong>{" "}
                            ₹{selectedBooking.fare}
                        </p>

                        <p>
                            <strong>Status:</strong>{" "}
                            {selectedBooking.status}
                        </p>

                        <button
                            type="button"
                            className="admin-primary-button"
                            onClick={() =>
                                setSelectedBooking(null)
                            }
                        >
                            Close
                        </button>

                    </div>

                </div>

            )}

        </div>
    );
}

export default AdminBookings;