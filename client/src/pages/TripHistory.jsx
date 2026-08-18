import { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function TripHistory() {
    const [activeFilter, setActiveFilter] = useState("all");

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


                {/* FILTERS */}

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


                {/* ALL TRIPS */}

                {activeFilter === "all" && (

                    <div className="empty-history">

                        <h3>
                            No trips yet
                        </h3>

                        <p>
                            Your previous journeys will appear here
                            after you start travelling with TransitGo.
                        </p>

                        <Link
                            to="/routes"
                            className="primary-button"
                        >
                            Find a Route
                        </Link>

                    </div>

                )}


                {/* COMPLETED */}

                {activeFilter === "completed" && (

                    <div className="empty-history">

                        <h3>
                            No completed trips
                        </h3>

                        <p>
                            Your completed journeys will appear here
                            after you finish a trip.
                        </p>

                    </div>

                )}


                {/* CANCELLED */}

                {activeFilter === "cancelled" && (

                    <div className="empty-history">

                        <h3>
                            No cancelled trips
                        </h3>

                        <p>
                            Cancelled journeys will appear here.
                        </p>

                    </div>

                )}

            </main>

        </div>
    );
}

export default TripHistory;