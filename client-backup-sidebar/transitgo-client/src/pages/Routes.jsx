import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import api from "../services/api";
import "../App.css";

function RoutesPage() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [searched, setSearched] = useState(false);
    const [routes, setRoutes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const searchRoutes = async (source, destination) => {
        setLoading(true);
        setError("");
        setSearched(true);
        setRoutes([]);

        try {
            const response = await api.get("/routes/search", {
                params: {
                    source,
                    destination
                }
            });

            setRoutes(response.data.routes || []);
        } catch (error) {
            console.error("Route search error:", error);
            setError(error.response?.data?.message || "Unable to search routes.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const savedFrom = searchParams.get("from");
        const savedTo = searchParams.get("to");

        if (savedFrom && savedTo) {
            setFrom(savedFrom);
            setTo(savedTo);
            searchRoutes(savedFrom, savedTo);
        }
    }, []);

    const handleSearch = (e) => {
        e.preventDefault();

        if (!from.trim() || !to.trim()) return;

        navigate(
            `/routes?from=${encodeURIComponent(from.trim())}&to=${encodeURIComponent(to.trim())}`
        );

        searchRoutes(from.trim(), to.trim());
    };

    return (
        <div className="routes-page-new">

            <nav className="main-nav">
                <Link to="/dashboard" className="brand">
                    Transit<span>Go</span>
                </Link>

                <div className="nav-links">
                    <Link to="/dashboard">Home</Link>
                    <Link to="/routes" className="active">Routes</Link>
                    <Link to="/tickets">Tickets</Link>
                    <Link to="/history">History</Link>
                    <Link to="/alerts">Updates</Link>
                </div>

                <div className="nav-user">
                    <Link to="/profile">Profile</Link>
                    <Link to="/dashboard">Dashboard</Link>
                </div>
            </nav>

            <main className="routes-main">

                <section className="routes-intro">
                    <span>PUBLIC TRANSPORT</span>
                    <h1>Find your route</h1>
                    <p>Search available public transport between your starting point and destination.</p>
                </section>

                <section className="route-search-new">
                    <form onSubmit={handleSearch}>

                        <div className="route-search-input">
                            <label>FROM</label>
                            <input
                                type="text"
                                placeholder="Starting point"
                                value={from}
                                onChange={(e) => setFrom(e.target.value)}
                            />
                        </div>

                        <div className="route-search-arrow">
                            →
                        </div>

                        <div className="route-search-input">
                            <label>TO</label>
                            <input
                                type="text"
                                placeholder="Destination"
                                value={to}
                                onChange={(e) => setTo(e.target.value)}
                            />
                        </div>

                        <button type="submit" disabled={loading}>
                            {loading ? "Searching..." : "Find Routes"}
                        </button>

                    </form>
                </section>

                {!searched && (
                    <div className="route-message">
                        <strong>Search for your journey</strong>
                        <p>Enter your starting point and destination to see available routes.</p>
                    </div>
                )}

                {searched && loading && (
                    <div className="route-message">
                        <strong>Finding routes...</strong>
                        <p>Please wait while we search available transport.</p>
                    </div>
                )}

                {searched && !loading && error && (
                    <div className="route-message error-message">
                        <strong>Unable to find routes</strong>
                        <p>{error}</p>
                    </div>
                )}

                {searched && !loading && !error && routes.length === 0 && (
                    <div className="route-message">
                        <strong>No routes found</strong>
                        <p>No available routes were found between {from} and {to}.</p>
                    </div>
                )}

                {searched && !loading && !error && routes.length > 0 && (
                    <section className="route-results-new">

                        <div className="results-title">
                            <div>
                                <span>AVAILABLE TRANSPORT</span>
                                <h2>{from} → {to}</h2>
                            </div>

                            <small>
                                {routes.length} {routes.length === 1 ? "route" : "routes"} found
                            </small>
                        </div>

                        <div className="route-list">

                            {routes.map((route) => (
                                <div className="route-row" key={route._id}>

                                    <div className="route-number">
                                        <span>ROUTE</span>
                                        <strong>{route.routeNumber}</strong>
                                    </div>

                                    <div className="route-location">
                                        <strong>{route.source}</strong>
                                        <span>→</span>
                                        <strong>{route.destination}</strong>
                                    </div>

                                    <div className="route-info">
                                        <span>{route.duration} min</span>
                                        <small>{route.distance} km</small>
                                    </div>

                                    <div className="route-fare">
                                        <span>FARE</span>
                                        <strong>₹{route.fare}</strong>
                                    </div>

                                    <div className="route-status">
                                        <span>{route.status}</span>
                                    </div>

                                    <button
                                        onClick={() => navigate(`/routes/${route._id}`)}
                                    >
                                        View →
                                    </button>

                                </div>
                            ))}

                        </div>

                    </section>
                )}

            </main>

            <footer className="commuter-footer">
                <div>
                    <div className="brand">
                        Transit<span>Go</span>
                    </div>

                    <p>
                        Making public transport simpler, smarter and more accessible.
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

export default RoutesPage;