import { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Tickets() {
    const [activeTab, setActiveTab] = useState("active");

    return (
        <div className="tickets-page">

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


            <main className="tickets-content">

                <div className="tickets-heading">

                    <h1>My Tickets</h1>

                    <p>
                        View and manage your transport bookings.
                    </p>

                </div>


                {/* TABS */}

                <div className="ticket-tabs">

                    <button
                        className={
                            activeTab === "active"
                                ? "active-tab"
                                : ""
                        }
                        onClick={() => setActiveTab("active")}
                    >
                        Active
                    </button>


                    <button
                        className={
                            activeTab === "past"
                                ? "active-tab"
                                : ""
                        }
                        onClick={() => setActiveTab("past")}
                    >
                        Past
                    </button>

                </div>


                {/* ACTIVE */}

                {activeTab === "active" && (

                    <div className="empty-tickets">

                        <h3>
                            No active tickets
                        </h3>

                        <p>
                            You don't have any active tickets yet.
                            Search for a route and book your journey.
                        </p>

                        <Link
                            to="/routes"
                            className="primary-button"
                        >
                            Find a Route
                        </Link>

                    </div>

                )}


                {/* PAST */}

                {activeTab === "past" && (

                    <div className="empty-tickets">

                        <h3>
                            No past tickets
                        </h3>

                        <p>
                            Your completed and expired tickets
                            will appear here.
                        </p>

                    </div>

                )}

            </main>

        </div>
    );
}

export default Tickets;