import { useCallback, useEffect, useState } from "react";
import "./BusTracking.css";

const API_BASE =
  import.meta.env.VITE_API_URL || "http://localhost:8000/api";

function getToken() {
  return (
    localStorage.getItem("token") ||
    sessionStorage.getItem("token") ||
    ""
  );
}
function getUserRole() {
  try {
    const user =
      localStorage.getItem("user") ||
      sessionStorage.getItem("user");

    return user ? JSON.parse(user).role : "";
  } catch {
    return "";
  }
}

export default function BusTracking() {
    const isAdmin = getUserRole() === "admin";
  const [buses, setBuses] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [busyBus, setBusyBus] = useState("");

  const [form, setForm] = useState({
    busNumber: "",
    routeId: "",
    startLatitude: "27.4924",
    startLongitude: "77.6737",
    endLatitude: "27.1767",
    endLongitude: "78.0081",
  });

  const headers = {
    Authorization: `Bearer ${getToken()}`,
    "Content-Type": "application/json",
  };

  const loadData = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [busResponse, routeResponse] = await Promise.all([
        fetch(`${API_BASE}/tracking`, { headers }),
        fetch(`${API_BASE}/routes`, { headers }),
      ]);

      const busData = await busResponse.json();
      const routeData = await routeResponse.json();

      if (!busResponse.ok) {
        throw new Error(busData.message || "Could not load bus locations");
      }

      if (!routeResponse.ok) {
        throw new Error(routeData.message || "Could not load routes");
      }

      setBuses(busData.buses || []);
      setRoutes(routeData.routes || []);
    } catch (err) {
      setError(err.message || "Unable to connect to the server");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  async function createDemoBus(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    try {
      const response = await fetch(`${API_BASE}/tracking/demo`, {
        method: "POST",
        headers,
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not create demo bus");
      }

      setMessage("Demo bus created successfully.");
      setForm((current) => ({ ...current, busNumber: "" }));
      await loadData();
    } catch (err) {
      setError(err.message);
    }
  }

  async function moveBus(busId) {
    setBusyBus(busId);
    setError("");
    setMessage("");

    try {
      const response = await fetch(
        `${API_BASE}/tracking/${busId}/simulate`,
        {
          method: "POST",
          headers,
          body: JSON.stringify({ step: 10 }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Could not update bus location");
      }

      setMessage("Simulated bus location updated.");
      await loadData();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusyBus("");
    }
  }

  return (
    <main className="tracking-page">
      <header className="tracking-header">
        <div>
          <p className="tracking-eyebrow">PUBLIC TRANSPORT</p>
          <h1>Live Bus Tracking</h1>
          <p>Monitor bus locations and estimated arrival times.</p>
        </div>

        <button
          className="tracking-refresh"
          onClick={loadData}
          disabled={loading}
        >
          {loading ? "Loading..." : "↻ Refresh"}
        </button>
      </header>

      <div className="tracking-notice">
        Demo mode: locations are simulated, not received from physical GPS
        devices.
      </div>

      {error && <div className="tracking-error">{error}</div>}
      {message && <div className="tracking-success">{message}</div>}

      <section className="tracking-stats">
        <article className="tracking-stat">
          <span>Tracked buses</span>
          <strong>{buses.length}</strong>
        </article>

        <article className="tracking-stat">
          <span>Active routes</span>
          <strong>
            {routes.filter((route) => route.status === "Active").length}
          </strong>
        </article>

        <article className="tracking-stat">
          <span>Tracking source</span>
          <strong className="tracking-source">Simulated GPS</strong>
        </article>
      </section>

      <section className="tracking-section">
        <div className="tracking-section-heading">
          <div>
            <h2>Bus locations</h2>
            <p>Current estimated position and remaining journey time.</p>
          </div>
        </div>

        {loading ? (
          <p className="tracking-empty">Loading bus locations...</p>
        ) : buses.length === 0 ? (
          <p className="tracking-empty">
            No buses are being tracked yet. An admin can create a demo bus
            below.
          </p>
        ) : (
          <div className="tracking-grid">
            {buses.map((bus) => (
              <article className="tracking-card" key={bus._id}>
                <div className="tracking-card-top">
                  <div className="tracking-bus-icon">🚌</div>
                  <div>
                    <h3>{bus.busNumber}</h3>
                    <p>
                      Route {bus.route?.routeNumber || "—"}
                    </p>
                  </div>
                  <span className="tracking-live">DEMO</span>
                </div>

                <div className="tracking-destination">
                  <span>{bus.route?.source || "Starting point"}</span>
                  <span>→</span>
                  <span>{bus.route?.destination || "Destination"}</span>
                </div>

                <div className="tracking-eta">
                  <div>
                    <span>Estimated arrival</span>
                    <strong>{bus.etaMinutes ?? "—"} min</strong>
                  </div>
                  <div>
                    <span>Journey progress</span>
                    <strong>{bus.progressPercent ?? 0}%</strong>
                  </div>
                </div>

                <div className="tracking-progress">
                  <div
                    style={{
                      width: `${Math.min(
                        100,
                        Math.max(0, bus.progressPercent || 0)
                      )}%`,
                    }}
                  />
                </div>

                <p className="tracking-coordinates">
                  Latitude: {Number(bus.latitude).toFixed(5)}
                  <br />
                  Longitude: {Number(bus.longitude).toFixed(5)}
                </p>

                <button
                  className="tracking-move"
                  onClick={() => moveBus(bus._id)}
                  disabled={busyBus === bus._id}
                >
                  {busyBus === bus._id
                    ? "Updating..."
                    : "Simulate movement +10%"}
                </button>
              </article>
            ))}
          </div>
        )}
      </section>

{isAdmin && (
    <section className="tracking-section tracking-admin">
        <h2>Create a demo bus</h2>
        <p>
          Select an existing route and enter start and end coordinates.
          This action requires an admin account.
        </p>
        <form onSubmit={createDemoBus} className="tracking-form">
          <label>
            Bus number
            <input
              required
              value={form.busNumber}
              placeholder="e.g. BUS-101"
              onChange={(e) =>
                setForm({ ...form, busNumber: e.target.value })
              }
            />
          </label>

          <label>
            Route
            <select
              required
              value={form.routeId}
              onChange={(e) =>
                setForm({ ...form, routeId: e.target.value })
              }
            >
              <option value="">Select a route</option>
              {routes.map((route) => (
                <option key={route._id} value={route._id}>
                  {route.routeNumber}: {route.source} → {route.destination}
                </option>
              ))}
            </select>
          </label>

          {[
            ["startLatitude", "Start latitude"],
            ["startLongitude", "Start longitude"],
            ["endLatitude", "End latitude"],
            ["endLongitude", "End longitude"],
          ].map(([key, label]) => (
            <label key={key}>
              {label}
              <input
                required
                type="number"
                step="any"
                value={form[key]}
                onChange={(e) =>
                  setForm({ ...form, [key]: e.target.value })
                }
              />
            </label>
          ))}

          <button
            type="submit"
            className="tracking-create"
            disabled={!routes.length}
          >
            Create demo bus
          </button>
        </form>
      </section>
      )}
    </main>
  );
}