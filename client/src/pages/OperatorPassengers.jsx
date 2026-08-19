import { Link } from "react-router-dom";
import "../App.css";

function OperatorPassengers() {
    return (
        <div className="operator-page">

            <nav className="navbar">

                <Link to="/operator" className="dashboard-logo">
                    Transit<span>Go</span>
                </Link>

                <div className="nav-right">

                    <Link to="/profile" className="profile-link">
                        Profile
                    </Link>

                    <Link to="/operator" className="back-link">
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


                <div className="passenger-summary">

                    <div className="operator-stat">
                        <span>Today's Passengers</span>
                        <strong>0</strong>
                    </div>

                    <div className="operator-stat">
                        <span>Booked Seats</span>
                        <strong>0</strong>
                    </div>

                    <div className="operator-stat">
                        <span>Available Seats</span>
                        <strong>0</strong>
                    </div>

                </div>


                <div className="passenger-section">

                    <div className="section-header">

                        <div>
                            <h2>Passenger List</h2>

                            <p>
                                Passengers booked on your current trip.
                            </p>
                        </div>

                    </div>


                    <div className="passenger-table-wrapper">

                        <table className="passenger-table">

                            <thead>
                                <tr>
                                    <th>Passenger</th>
                                    <th>Ticket ID</th>
                                    <th>Seat</th>
                                    <th>Booking Status</th>
                                </tr>
                            </thead>

                            <tbody>

                                <tr>
                                    <td colSpan="4">
                                        No passengers found
                                    </td>
                                </tr>

                            </tbody>

                        </table>

                    </div>

                </div>

            </main>

        </div>
    );
}

export default OperatorPassengers;