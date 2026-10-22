import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../App.css";

function Alerts() {
    const [alerts, setAlerts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchAlerts();
    }, []);

    const fetchAlerts = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/alerts");
            setAlerts(response.data.alerts || []);
        } catch (error) {
            console.error("Fetch alerts error:", error);
            setError(error.response?.data?.message || "Unable to load travel alerts.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="alerts-page">
            <nav className="navbar">
                <Link to="/dashboard" className="dashboard-logo">
                    Transit<span>Go</span>
                </Link>

                <div className="nav-right">
                    <Link to="/profile" className="profile-link">Profile</Link>
                    <Link to="/dashboard" className="back-link">Dashboard</Link>
                </div>
            </nav>

            <main className="alerts-content">
                <div className="alerts-heading">
                    <h1>Travel Alerts</h1>
                    <p>Important updates about routes and public transport services.</p>
                </div>

                {loading && (
                    <div className="alert-card">
                        <h3>Loading alerts...</h3>
                        <p>Please wait while we check for service updates.</p>
                    </div>
                )}

                {!loading && error && (
                    <div className="alert-card">
                        <h3>Unable to load alerts</h3>
                        <p>{error}</p>
                        <button className="primary-button" onClick={fetchAlerts}>
                            Try Again
                        </button>
                    </div>
                )}

                {!loading && !error && alerts.length === 0 && (
                    <div className="alert-card">
                        <span className="alert-type">SERVICE STATUS</span>
                        <h3>No current service alerts</h3>
                        <p>There are currently no reported disruptions affecting your routes.</p>
                    </div>
                )}

                {!loading && !error && alerts.length > 0 && (
                    <div className="alerts-list">
                        {alerts.map((alert) => (
                            <div className="alert-card" key={alert._id}>
                                <span className="alert-type">
                                    {alert.type || "SERVICE UPDATE"}
                                </span>

                                <h3>{alert.title}</h3>

                                <p>{alert.message}</p>

                                {alert.route && (
                                    <small>
                                        Route: {alert.route.routeNumber || alert.route}
                                    </small>
                                )}

                                {alert.createdAt && (
                                    <small>
                                        {new Date(alert.createdAt).toLocaleString("en-IN")}
                                    </small>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}

export default Alerts;