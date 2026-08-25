import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import api from "../services/api";
import "../App.css";

function RoutesPage() {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const [from, setFrom] = useState(searchParams.get("from") || "");
    const [to, setTo] = useState(searchParams.get("to") || "");
    const [searched, setSearched] = useState(!!searchParams.get("from") && !!searchParams.get("to"));
    const [routes, setRoutes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const searchRoutes = async (source, destination) => {
        setLoading(true);
        setError("");

        try {
            const response = await api.get("/routes/search", {
                params: { source, destination }
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
        const source = searchParams.get("from");
        const destination = searchParams.get("to");

        if (source && destination) {
            setFrom(source);
            setTo(destination);
            setSearched(true);
            searchRoutes(source, destination);
        }
    }, []);

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!from.trim() || !to.trim()) return;

        setSearched(true);
        setRoutes([]);
        setError("");

        setSearchParams({
            from: from.trim(),
            to: to.trim()
        });

        await searchRoutes(from.trim(), to.trim());
    };

    const handleViewDetails = (id) => {
        navigate(`/routes/${id}?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`);
    };

    return (
        <div className="routes-page">
            <nav className="navbar">
                <Link to="/dashboard" className="dashboard-logo">Transit<span>Go</span></Link>
                <div className="nav-right">
                    <Link to="/profile" className="profile-link">Profile</Link>
                    <Link to="/dashboard" className="back-link">Dashboard</Link>
                </div>
            </nav>

            <main className="routes-content">
                <div className="routes-heading">
                    <span className="routes-eyebrow">TRANSITGO ROUTES</span>
                    <h1>Find your route</h1>
                    <p>Search available public transport between your starting point and destination.</p>
                </div>

                <section className="route-search">
                    <form onSubmit={handleSearch}>
                        <div className="route-search-fields">
                            <div className="route-input">
                                <label htmlFor="from">FROM</label>
                                <input id="from" type="text" placeholder="Starting point" value={from} onChange={(e) => setFrom(e.target.value)} required />
                            </div>

                            <div className="route-swap">→</div>

                            <div className="route-input">
                                <label htmlFor="to">TO</label>
                                <input id="to" type="text" placeholder="Destination" value={to} onChange={(e) => setTo(e.target.value)} required />
                            </div>

                            <button type="submit" className="search-route-button" disabled={loading}>
                                {loading ? "Searching..." : "Find Routes →"}
                            </button>
                        </div>
                    </form>
                </section>

                {!searched && (
                    <div className="routes-message">
                        <div className="routes-message-icon">🚌</div>
                        <h3>Where are you travelling?</h3>
                        <p>Enter your starting point and destination above to find available routes.</p>
                    </div>
                )}

                {searched && loading && (
                    <div className="routes-message">
                        <div className="routes-loader">Searching...</div>
                        <h3>Finding routes</h3>
                        <p>We're checking available routes for your journey.</p>
                    </div>
                )}

                {searched && !loading && error && (
                    <div className="routes-message routes-error">
                        <h3>Unable to find routes</h3>
                        <p>{error}</p>
                    </div>
                )}

                {searched && !loading && !error && routes.length === 0 && (
                    <div className="routes-message">
                        <h3>No routes found</h3>
                        <p>No available routes were found between <strong>{from}</strong> and <strong>{to}</strong>.</p>
                    </div>
                )}

                {searched && !loading && !error && routes.length > 0 && (
                    <section className="route-results">
                        <div className="results-header">
                            <div>
                                <span className="results-eyebrow">SEARCH RESULTS</span>
                                <h2>{from} → {to}</h2>
                            </div>
                            <span className="results-count">{routes.length} {routes.length === 1 ? "route" : "routes"} found</span>
                        </div>

                        <div className="routes-table-wrapper">
                            <table className="routes-table">
                                <thead>
                                    <tr>
                                        <th>ROUTE</th>
                                        <th>JOURNEY</th>
                                        <th>DURATION</th>
                                        <th>DISTANCE</th>
                                        <th>STOPS</th>
                                        <th>FARE</th>
                                        <th>STATUS</th>
                                        <th></th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {routes.map((route) => (
                                        <tr key={route._id}>
                                            <td><strong className="route-number-text">{route.routeNumber}</strong></td>
                                            <td>
                                                <div className="journey-cell">
                                                    <strong>{route.source}</strong>
                                                    <span>→</span>
                                                    <strong>{route.destination}</strong>
                                                </div>
                                            </td>
                                            <td>{route.duration} min</td>
                                            <td>{route.distance} km</td>
                                            <td>{route.stops?.length || 0}</td>
                                            <td><strong>₹{route.fare}</strong></td>
                                            <td>
                                                <span className={`route-status ${route.status?.toLowerCase() === "active" ? "active" : ""}`}>
                                                    {route.status}
                                                </span>
                                            </td>
                                            <td>
                                                <button type="button" className="route-view-button" onClick={() => handleViewDetails(route._id)}>
                                                    View →
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}

export default RoutesPage;