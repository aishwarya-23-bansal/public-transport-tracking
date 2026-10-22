
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../App.css";

export default function SavedRoutes() {
  const [savedRoutes, setSavedRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [removing, setRemoving] = useState("");

  const fetchSavedRoutes = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/saved-routes");
      setSavedRoutes(response.data.savedRoutes || []);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Could not load saved routes. Please log in again if needed."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSavedRoutes();
  }, []);

  const removeRoute = async (savedRouteId) => {
    try {
      setRemoving(savedRouteId);
      await api.delete(`/saved-routes/${savedRouteId}`);

      setSavedRoutes((current) =>
        current.filter((item) => item._id !== savedRouteId)
      );
    } catch (err) {
      setError(
        err.response?.data?.message || "Could not remove this route."
      );
    } finally {
      setRemoving("");
    }
  };

  return (
    <div className="saved-routes-page">
      <nav className="main-nav">
        <Link to="/dashboard" className="brand">
          Transit<span>Go</span>
        </Link>

        <div className="nav-links">
          <Link to="/dashboard">Home</Link>
          <Link to="/routes">Routes</Link>
          <Link to="/tickets">Tickets</Link>
          <Link to="/history">History</Link>
          <Link to="/alerts">Updates</Link>
        </div>

        <div className="nav-user">
          <Link to="/profile">Profile</Link>
          <Link to="/dashboard">Dashboard</Link>
        </div>
      </nav>

      <main className="saved-routes-content">
        <section className="saved-routes-heading">
          <span>YOUR ROUTES</span>
          <h1>Saved Routes</h1>
          <p>Your favourite journeys, all in one place.</p>
        </section>

        {loading ? (
          <p>Loading your saved routes...</p>
        ) : error ? (
          <section className="saved-routes-empty">
            <h2>Unable to load saved routes</h2>
            <p>{error}</p>
            <button onClick={fetchSavedRoutes}>Try Again</button>
          </section>
        ) : savedRoutes.length === 0 ? (
          <section className="saved-routes-empty">
            <div className="saved-route-icon">→</div>
            <span>NO SAVED ROUTES</span>
            <h2>Your favourite routes will appear here.</h2>
            <p>
              Browse routes and select Save Route to keep a journey here.
            </p>
            <Link to="/routes" className="ticket-action">
              Search Routes →
            </Link>
          </section>
        ) : (
          <section className="saved-routes-list">
            <p>{savedRoutes.length} saved route(s)</p>

            {savedRoutes.map((item) => {
              const route = item.route;

              if (!route) return null;

              return (
                <article className="saved-route-card" key={item._id}>
                  <div>
                    <span>ROUTE {route.routeNumber || ""}</span>
                    <h2>
                      {route.source} → {route.destination}
                    </h2>
                    <p>
                      {route.distance != null
                        ? `${route.distance} km`
                        : ""}
                      {route.duration != null
                        ? ` · ${route.duration} min`
                        : ""}
                      {route.fare != null ? ` · ₹${route.fare}` : ""}
                    </p>
                  </div>

                  <div className="saved-route-actions">
                    <Link
                      to={`/routes/${route._id}`}
                      className="ticket-action"
                    >
                      View Route →
                    </Link>

                    <button
                      onClick={() => removeRoute(item._id)}
                      disabled={removing === item._id}
                    >
                      {removing === item._id ? "Removing..." : "Remove"}
                    </button>
                  </div>
                </article>
              );
            })}
          </section>
        )}
      </main>
    </div>
  );
}
