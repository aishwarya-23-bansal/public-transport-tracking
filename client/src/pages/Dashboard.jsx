import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

function Dashboard() {
    const navigate = useNavigate();
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");

    const handleSearch = (e) => {
        e.preventDefault();

        if (!from.trim() || !to.trim()) {
            alert("Please enter both starting point and destination.");
            return;
        }

        navigate(
            `/routes?from=${encodeURIComponent(from.trim())}&to=${encodeURIComponent(to.trim())}`
        );
    };

    return (
        <div className="commuter-home">

            <nav className="main-nav">
                <Link to="/dashboard" className="brand">
                    Transit<span>Go</span>
                </Link>

                <div className="nav-links">
                    <Link to="/dashboard" className="active">Home</Link>
                    <Link to="/routes">Routes</Link>
                    <Link to="/tickets">Tickets</Link>
                    <Link to="/history">History</Link>
                    <Link to="/alerts">Updates</Link>
                </div>

                <Link to="/profile" className="profile-nav">
                    Profile
                </Link>
            </nav>

            <main>

                <section className="travel-hero">
                    <div className="hero-content">
                        <span className="hero-label">SMART PUBLIC TRANSPORT</span>

                        <h1>
                            Where are you
                            <br />
                            going today?
                        </h1>

                        <p>
                            Find routes, check schedules and manage your
                            journeys from one place.
                        </p>
                    </div>

                    <div className="route-search">
                        <div className="search-heading">
                            <strong>Plan your journey</strong>
                            <span>Find the best available route</span>
                        </div>

                        <form onSubmit={handleSearch}>

                            <div className="search-field">
                                <label>FROM</label>

                                <input
                                    type="text"
                                    placeholder="Starting point"
                                    value={from}
                                    onChange={(e) => setFrom(e.target.value)}
                                />
                            </div>

                            <div className="search-arrow">
                                →
                            </div>

                            <div className="search-field">
                                <label>TO</label>

                                <input
                                    type="text"
                                    placeholder="Destination"
                                    value={to}
                                    onChange={(e) => setTo(e.target.value)}
                                />
                            </div>

                            <button type="submit">
                                Find Routes
                            </button>

                        </form>
                    </div>
                </section>

                <section className="quick-section">

                    <div className="section-heading">
                        <span>QUICK ACCESS</span>
                        <h2>Manage your journey</h2>
                    </div>

                    <div className="quick-links">

                        <Link to="/tickets" className="quick-link">
                            <div>
                                <strong>My Tickets</strong>
                                <p>View your active bookings</p>
                            </div>

                            <span>→</span>
                        </Link>

                        <Link to="/history" className="quick-link">
                            <div>
                                <strong>Trip History</strong>
                                <p>View your previous journeys</p>
                            </div>

                            <span>→</span>
                        </Link>

                        <Link to="/saved-routes" className="quick-link">
                            <div>
                                <strong>Saved Routes</strong>
                                <p>Access your frequently used routes</p>
                            </div>

                            <span>→</span>
                        </Link>

                        <Link to="/alerts" className="quick-link">
                            <div>
                                <strong>Travel Updates</strong>
                                <p>Check service alerts and updates</p>
                            </div>

                            <span>→</span>
                        </Link>

                    </div>

                </section>

                <section className="info-section">

                    <div className="info-block">
                        <span>01</span>

                        <div>
                            <h3>Search</h3>

                            <p>
                                Enter your starting point and destination
                                to find available public transport.
                            </p>
                        </div>
                    </div>

                    <div className="info-block">
                        <span>02</span>

                        <div>
                            <h3>Choose</h3>

                            <p>
                                Compare routes, fares and journey details
                                before you travel.
                            </p>
                        </div>
                    </div>

                    <div className="info-block">
                        <span>03</span>

                        <div>
                            <h3>Travel</h3>

                            <p>
                                Book your ticket and stay updated throughout
                                your journey.
                            </p>
                        </div>
                    </div>

                </section>

            </main>

            <footer className="commuter-footer">

                <div>
                    <Link to="/dashboard" className="brand">
                        Transit<span>Go</span>
                    </Link>

                    <p>
                        Making public transport simpler and smarter.
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

export default Dashboard;