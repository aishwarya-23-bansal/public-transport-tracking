import { Link } from "react-router-dom";
import "../App.css";

function AdminBookings() {
    return (
        <div className="admin-page">
            <nav className="navbar">
                <Link to="/admin" className="dashboard-logo">
                    Transit<span>Go</span>
                </Link>
                <div className="nav-right">
                    <Link to="/profile" className="profile-link">
                        Profile
                    </Link>
                    <Link to="/admin" className="back-link">
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
                        <strong>0</strong>
                    </div>
                    <div className="admin-stat">
                        <span>Confirmed</span>
                        <strong>0</strong>
                    </div>
                    <div className="admin-stat">
                        <span>Cancelled</span>
                        <strong>0</strong>
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
                <div className="admin-bookings-table-wrapper">
                    <table className="admin-bookings-table">
                        <thead>
                            <tr>
                                <th>Ticket ID</th>
                                <th>Passenger</th>
                                <th>Route</th>
                                <th>Date</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan="5">
                                    No bookings available
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

export default AdminBookings;