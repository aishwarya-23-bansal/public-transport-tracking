import { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

function RoutesPage() {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [searched, setSearched] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();

        if (from.trim() && to.trim()) {
            setSearched(true);
        }
    };

    return (
        <div className="routes-page">

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


            <main className="routes-content">

                <div className="routes-heading">
                    <h1>Find a Route</h1>

                    <p>
                        Search for available public transport between
                        your starting point and destination.
                    </p>
                </div>


                <div className="route-search-card">

                    <form onSubmit={handleSearch}>

                        <div className="route-input">
                            <label htmlFor="from">FROM</label>

                            <input
                                id="from"
                                type="text"
                                placeholder="Starting point"
                                value={from}
                                onChange={(e) => setFrom(e.target.value)}
                            />
                        </div>


                        <div className="route-input">
                            <label htmlFor="to">TO</label>

                            <input
                                id="to"
                                type="text"
                                placeholder="Destination"
                                value={to}
                                onChange={(e) => setTo(e.target.value)}
                            />
                        </div>


                        <button
                            type="submit"
                            className="search-route-button"
                        >
                            Find Routes
                        </button>

                    </form>

                </div>


                {!searched && (
                    <div className="no-routes">

                        <h3>Search for a route</h3>

                        <p>
                            Enter your starting point and destination
                            above to find available routes.
                        </p>

                    </div>
                )}


                {searched && (
                    <section className="route-results">

                        <div className="results-header">

                            <div>
                                <h2>Available Routes</h2>

                                <p>
                                    Routes from {from} to {to}
                                </p>
                            </div>

                            <span>3 routes found</span>

                        </div>


                        <div className="route-card">

                            <div className="route-times">

                                <div>
                                    <strong>08:30 AM</strong>
                                    <span>{from}</span>
                                </div>

                                <div className="route-duration">
                                    45 min
                                </div>

                                <div className="route-end">
                                    <strong>09:15 AM</strong>
                                    <span>{to}</span>
                                </div>

                            </div>

                            <div className="route-details">

                                <div>
                                    <span>Stops</span>
                                    <strong>6</strong>
                                </div>

                                <div>
                                    <span>Fare</span>
                                    <strong>₹25</strong>
                                </div>

                                <button type="button">
                                    View Details
                                </button>

                            </div>

                        </div>


                        <div className="route-card">

                            <div className="route-times">

                                <div>
                                    <strong>09:15 AM</strong>
                                    <span>{from}</span>
                                </div>

                                <div className="route-duration">
                                    55 min
                                </div>

                                <div className="route-end">
                                    <strong>10:10 AM</strong>
                                    <span>{to}</span>
                                </div>

                            </div>

                            <div className="route-details">

                                <div>
                                    <span>Stops</span>
                                    <strong>8</strong>
                                </div>

                                <div>
                                    <span>Fare</span>
                                    <strong>₹20</strong>
                                </div>

                                <button type="button">
                                    View Details
                                </button>

                            </div>

                        </div>


                        <div className="route-card">

                            <div className="route-times">

                                <div>
                                    <strong>10:00 AM</strong>
                                    <span>{from}</span>
                                </div>

                                <div className="route-duration">
                                    40 min
                                </div>

                                <div className="route-end">
                                    <strong>10:40 AM</strong>
                                    <span>{to}</span>
                                </div>

                            </div>

                            <div className="route-details">

                                <div>
                                    <span>Stops</span>
                                    <strong>5</strong>
                                </div>

                                <div>
                                    <span>Fare</span>
                                    <strong>₹30</strong>
                                </div>

                                <button type="button">
                                    View Details
                                </button>

                            </div>

                        </div>

                    </section>
                )}

            </main>

        </div>
    );
}

export default RoutesPage;