import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../App.css";

function AdminRoutes() {
    const [routes, setRoutes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [showAddRoute, setShowAddRoute] = useState(false);
    const [selectedRoute, setSelectedRoute] = useState(null);
    const [editingRoute, setEditingRoute] = useState(null);

    const [form, setForm] = useState({
        routeNumber: "",
        source: "",
        destination: "",
        stops: "",
        distance: "",
        duration: "",
        fare: "",
        status: "Active"
    });

    useEffect(() => {
        fetchRoutes();
    }, []);

    const fetchRoutes = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/routes");
            setRoutes(response.data.routes || []);
        } catch (error) {
            console.error("Fetch routes error:", error);

            setError(
                error.response?.data?.message ||
                "Unable to load routes."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const resetForm = () => {
        setForm({
            routeNumber: "",
            source: "",
            destination: "",
            stops: "",
            distance: "",
            duration: "",
            fare: "",
            status: "Active"
        });
    };

    const handleAddRoute = async (e) => {
        e.preventDefault();

        try {
            const routeData = {
                ...form,
                stops: form.stops
                    .split(",")
                    .map((stop) => stop.trim())
                    .filter(Boolean),
                distance: Number(form.distance),
                duration: Number(form.duration),
                fare: Number(form.fare)
            };

            const response = await api.post(
                "/routes",
                routeData
            );

            alert(
                response.data.message ||
                "Route created successfully"
            );

            resetForm();
            setShowAddRoute(false);
            fetchRoutes();
        } catch (error) {
            console.error("Create route error:", error);

            alert(
                error.response?.data?.message ||
                "Unable to create route."
            );
        }
    };

    const handleViewRoute = async (id) => {
        try {
            const response = await api.get(`/routes/${id}`);

            setSelectedRoute(response.data.route);
        } catch (error) {
            console.error("View route error:", error);

            alert(
                error.response?.data?.message ||
                "Unable to load route."
            );
        }
    };

    const handleEditRoute = (route) => {
        setEditingRoute(route);

        setForm({
            routeNumber: route.routeNumber,
            source: route.source,
            destination: route.destination,
            stops: route.stops.join(", "),
            distance: route.distance,
            duration: route.duration,
            fare: route.fare,
            status: route.status
        });
    };

    const handleUpdateRoute = async (e) => {
        e.preventDefault();

        try {
            const routeData = {
                ...form,
                stops: form.stops
                    .split(",")
                    .map((stop) => stop.trim())
                    .filter(Boolean),
                distance: Number(form.distance),
                duration: Number(form.duration),
                fare: Number(form.fare)
            };

            const response = await api.put(
                `/routes/${editingRoute._id}`,
                routeData
            );

            alert(
                response.data.message ||
                "Route updated successfully"
            );

            resetForm();
            setEditingRoute(null);
            fetchRoutes();
        } catch (error) {
            console.error("Update route error:", error);

            alert(
                error.response?.data?.message ||
                "Unable to update route."
            );
        }
    };

    const handleDeleteRoute = async (id) => {
        const confirmed = window.confirm(
            "Are you sure you want to delete this route?"
        );

        if (!confirmed) {
            return;
        }

        try {
            const response = await api.delete(
                `/routes/${id}`
            );

            alert(
                response.data.message ||
                "Route deleted successfully"
            );

            fetchRoutes();
        } catch (error) {
            console.error("Delete route error:", error);

            alert(
                error.response?.data?.message ||
                "Unable to delete route."
            );
        }
    };

    return (
        <div className="admin-page">
            <nav className="navbar">
                <Link
                    to="/admin"
                    className="dashboard-logo"
                >
                    Transit<span>Go</span>
                </Link>

                <div className="nav-right">
                    <Link
                        to="/profile"
                        className="profile-link"
                    >
                        Profile
                    </Link>

                    <Link
                        to="/admin"
                        className="back-link"
                    >
                        Dashboard
                    </Link>
                </div>
            </nav>

            <main className="admin-content">
                <div className="admin-heading">
                    <h1>Route Management</h1>

                    <p>
                        Manage transport routes, stops and schedules.
                    </p>
                </div>

                <div className="route-management-header">
                    <div>
                        <h2>Routes</h2>

                        <p>
                            View and manage all registered transport routes.
                        </p>
                    </div>

                    <button
                        type="button"
                        className="admin-primary-button"
                        onClick={() => setShowAddRoute(true)}
                    >
                        Add Route
                    </button>
                </div>

                {loading && (
                    <div className="admin-empty">
                        <h3>Loading routes...</h3>

                        <p>
                            Please wait while routes are loaded.
                        </p>
                    </div>
                )}

                {!loading && error && (
                    <div className="admin-empty">
                        <h3>Unable to load routes</h3>

                        <p>{error}</p>

                        <button
                            type="button"
                            className="admin-primary-button"
                            onClick={fetchRoutes}
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {!loading && !error && (
                    <div className="admin-routes-table-wrapper">
                        <table className="admin-routes-table">
                            <thead>
                                <tr>
                                    <th>Route</th>
                                    <th>From</th>
                                    <th>Destination</th>
                                    <th>Stops</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {routes.length === 0 ? (
                                    <tr>
                                        <td colSpan="6">
                                            No routes available
                                        </td>
                                    </tr>
                                ) : (
                                    routes.map((route) => (
                                        <tr key={route._id}>
                                            <td>
                                                Route{" "}
                                                {route.routeNumber}
                                            </td>

                                            <td>
                                                {route.source}
                                            </td>

                                            <td>
                                                {route.destination}
                                            </td>

                                            <td>
                                                {route.stops.length}
                                            </td>

                                            <td>
                                                {route.status}
                                            </td>

                                            <td>
                                                <button
                                                    type="button"
                                                    className="admin-action-button"
                                                    onClick={() =>
                                                        handleViewRoute(
                                                            route._id
                                                        )
                                                    }
                                                >
                                                    View
                                                </button>

                                                <button
                                                    type="button"
                                                    className="admin-action-button"
                                                    onClick={() =>
                                                        handleEditRoute(
                                                            route
                                                        )
                                                    }
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    type="button"
                                                    className="admin-action-button"
                                                    onClick={() =>
                                                        handleDeleteRoute(
                                                            route._id
                                                        )
                                                    }
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </main>

            {showAddRoute && (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(0, 0, 0, 0.6)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 9999,
                        padding: "20px"
                    }}
                >
                    <div
                        style={{
                            background: "white",
                            padding: "30px",
                            borderRadius: "12px",
                            width: "450px",
                            maxWidth: "100%",
                            color: "#111"
                        }}
                    >
                        <h2>Add Route</h2>

                        <form onSubmit={handleAddRoute}>
                            <div className="input-group">
                                <label>Route Number</label>

                                <input
                                    name="routeNumber"
                                    value={form.routeNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label>Source</label>

                                <input
                                    name="source"
                                    value={form.source}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label>Destination</label>

                                <input
                                    name="destination"
                                    value={form.destination}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label>Stops</label>

                                <input
                                    name="stops"
                                    placeholder="Stop 1, Stop 2, Stop 3"
                                    value={form.stops}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="input-group">
                                <label>Distance (km)</label>

                                <input
                                    type="number"
                                    name="distance"
                                    value={form.distance}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label>Duration (minutes)</label>

                                <input
                                    type="number"
                                    name="duration"
                                    value={form.duration}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label>Fare</label>

                                <input
                                    type="number"
                                    name="fare"
                                    value={form.fare}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    gap: "10px",
                                    marginTop: "20px"
                                }}
                            >
                                <button
                                    type="submit"
                                    className="admin-primary-button"
                                >
                                    Create Route
                                </button>

                                <button
                                    type="button"
                                    className="admin-action-button"
                                    onClick={() => {
                                        resetForm();
                                        setShowAddRoute(false);
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {editingRoute && (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(0, 0, 0, 0.6)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 9999,
                        padding: "20px"
                    }}
                >
                    <div
                        style={{
                            background: "white",
                            padding: "30px",
                            borderRadius: "12px",
                            width: "450px",
                            maxWidth: "100%",
                            color: "#111"
                        }}
                    >
                        <h2>Edit Route</h2>

                        <form onSubmit={handleUpdateRoute}>
                            <div className="input-group">
                                <label>Route Number</label>

                                <input
                                    name="routeNumber"
                                    value={form.routeNumber}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label>Source</label>

                                <input
                                    name="source"
                                    value={form.source}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label>Destination</label>

                                <input
                                    name="destination"
                                    value={form.destination}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label>Stops</label>

                                <input
                                    name="stops"
                                    value={form.stops}
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="input-group">
                                <label>Distance (km)</label>

                                <input
                                    type="number"
                                    name="distance"
                                    value={form.distance}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label>Duration (minutes)</label>

                                <input
                                    type="number"
                                    name="duration"
                                    value={form.duration}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label>Fare</label>

                                <input
                                    type="number"
                                    name="fare"
                                    value={form.fare}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label>Status</label>

                                <select
                                    name="status"
                                    value={form.status}
                                    onChange={handleChange}
                                >
                                    <option value="Active">
                                        Active
                                    </option>

                                    <option value="Inactive">
                                        Inactive
                                    </option>
                                </select>
                            </div>

                            <div
                                style={{
                                    display: "flex",
                                    gap: "10px",
                                    marginTop: "20px"
                                }}
                            >
                                <button
                                    type="submit"
                                    className="admin-primary-button"
                                >
                                    Update Route
                                </button>

                                <button
                                    type="button"
                                    className="admin-action-button"
                                    onClick={() => {
                                        resetForm();
                                        setEditingRoute(null);
                                    }}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {selectedRoute && (
                <div
                    style={{
                        position: "fixed",
                        inset: 0,
                        background: "rgba(0, 0, 0, 0.6)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        zIndex: 9999,
                        padding: "20px"
                    }}
                >
                    <div
                        style={{
                            background: "white",
                            padding: "30px",
                            borderRadius: "12px",
                            width: "450px",
                            maxWidth: "100%",
                            color: "#111"
                        }}
                    >
                        <h2>
                            Route {selectedRoute.routeNumber}
                        </h2>

                        <p>
                            <strong>From:</strong>{" "}
                            {selectedRoute.source}
                        </p>

                        <p>
                            <strong>Destination:</strong>{" "}
                            {selectedRoute.destination}
                        </p>

                        <p>
                            <strong>Distance:</strong>{" "}
                            {selectedRoute.distance} km
                        </p>

                        <p>
                            <strong>Duration:</strong>{" "}
                            {selectedRoute.duration} minutes
                        </p>

                        <p>
                            <strong>Fare:</strong>{" "}
                            ₹{selectedRoute.fare}
                        </p>

                        <p>
                            <strong>Status:</strong>{" "}
                            {selectedRoute.status}
                        </p>

                        <h3>Stops</h3>

                        {selectedRoute.stops.map(
                            (stop, index) => (
                                <p key={index}>
                                    {index + 1}. {stop}
                                </p>
                            )
                        )}

                        <button
                            type="button"
                            className="admin-primary-button"
                            onClick={() =>
                                setSelectedRoute(null)
                            }
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminRoutes;