import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../App.css";

function RoutesPage() {
    const navigate = useNavigate();
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [searched, setSearched] = useState(false);
    const [routes, setRoutes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!from.trim() || !to.trim()) {
            return;
        }
        setLoading(true);
        setError("");
        setSearched(true);
        setRoutes([]);
        try {
            const response = await api.get("/routes/search", {
                params: {
                    source: from,
                    destination: to
                }
            });
            setRoutes(response.data.routes || []);

        } catch (error) {
            console.error("Route search error:", error);
            setError(
                error.response?.data?.message ||
                "Unable to search routes."
            );

        } finally {
            setLoading(false);
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
                    <p>Search for available public transport between your starting point and destination.</p>
                </div>
                <div className="route-search-card">
                    <form onSubmit={handleSearch}>
                        <div className="route-input">
                            <label htmlFor="from">FROM</label>
                            <input id="from" type="text" placeholder="Starting point" value={from} onChange={(e) => setFrom(e.target.value)}
                            />
                        </div>
                        <div className="route-input">
                            <label htmlFor="to">
                                TO
                            </label>
                            <input
                                id="to"
                                type="text"
                                placeholder="Destination"
                                value={to}
                                onChange={(e) =>
                                    setTo(e.target.value)
                                }
                            />
                        </div>
                        <button type="submit" className="search-route-button" disabled={loading}>
                            {loading ? "Searching..." : "Find Routes"}
                        </button>
                    </form>
                </div>
                {!searched && (
                    <div className="no-routes">
                        <h3>Search for a route</h3>
                        <p>Enter your starting point and destination above to find available routes.</p>
                    </div>
                )}
                {searched && loading && (
                    <div className="no-routes">
                        <h3>Searching routes...</h3>
                        <p>Finding available routes for your journey. </p>
                    </div>
                )}
                {searched && !loading && error && (
                    <div className="no-routes">
                        <h3>Unable to find routes</h3>
                        <p>{error}</p>
                    </div>
                )}

                {searched && !loading && !error && routes.length === 0 && (
                    <div className="no-routes">
                        <h3>No routes found</h3>
                        <p> No available routes were found between {from} and {to}. </p>
                    </div>
                )}
                {searched && !loading && !error && routes.length > 0 && (
                    <section className="route-results">
                        <div className="results-header">
                            <div>
                                <h2>Available Routes</h2>
                                <p>Routes from {from} to {to}</p>
                            </div>
                            <span>
                                {routes.length}{" "}
                                {routes.length === 1 ? "route" : "routes"}{" "}found
                            </span>
                        </div>
                        {routes.map((route) => (
                            <div
                                className="route-card"
                                key={route._id}
                            >
                                <div className="route-times">
                                    <div>
                                        <strong>{route.routeNumber}</strong>
                                        <span>{route.source}</span>
                                    </div>
                                    <div className="route-duration">
                                        {route.duration} min
                                    </div>
                                    <div className="route-end">
                                        <strong>{route.destination}</strong>
                                        <span>{route.distance} km</span>
                                    </div>
                                </div>
                                <div className="route-details">
                                    <div>
                                        <span>Stops</span>
                                        <strong>{route.stops?.length || 0} </strong>
                                    </div>
                                    <div>
                                        <span>Fare</span>
                                        <strong>₹{route.fare}</strong>
                                    </div>
                                    <div>
                                        <span>Status</span>
                                        <strong>{route.status}</strong>
                                    </div>
                                    <button type="button" onClick={() => navigate(`/routes/${route._id}`)}>
                                        View Details
                                    </button>
                                </div>
                            </div>
                        ))}
                    </section>
                )}
            </main>
        </div>
    );
}

export default RoutesPage;