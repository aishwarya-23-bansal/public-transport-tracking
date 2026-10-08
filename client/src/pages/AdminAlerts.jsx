import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../App.css";

function AdminAlerts() {
    const [alerts, setAlerts] = useState([]);

    const [form, setForm] = useState({
        title: "",
        message: "",
        type: "info"
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    useEffect(() => {
        loadAlerts();
    }, []);

    const loadAlerts = async () => {
        try {
            const response = await api.get("/alerts");
            setAlerts(response.data.alerts || []);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to load alerts."
            );
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");
        setLoading(true);

        try {
            await api.post("/alerts", form);

            setForm({
                title: "",
                message: "",
                type: "info"
            });

            setSuccess("Alert created successfully.");

            await loadAlerts();
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to create alert."
            );
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Delete this alert?")) {
            return;
        }

        try {
            await api.delete(`/alerts/${id}`);

            await loadAlerts();

            setSuccess("Alert deleted successfully.");
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Unable to delete alert."
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

                    <h1>Travel Alerts</h1>

                    <p>
                        Create and manage important transport alerts.
                    </p>

                </div>


                {/* CREATE ALERT */}

                <section className="admin-overview">

                    <h2>Create Alert</h2>

                    <form onSubmit={handleSubmit}>

                        <div>
                            <label>
                                Title
                            </label>

                            <input
                                type="text"
                                name="title"
                                value={form.title}
                                onChange={handleChange}
                                placeholder="Alert title"
                                required
                            />
                        </div>


                        <div>
                            <label>
                                Message
                            </label>

                            <textarea
                                name="message"
                                value={form.message}
                                onChange={handleChange}
                                placeholder="Enter alert message"
                                rows="4"
                                required
                            />
                        </div>


                        <div>
                            <label>
                                Type
                            </label>

                            <select
                                name="type"
                                value={form.type}
                                onChange={handleChange}
                            >

                                <option value="info">
                                    Information
                                </option>

                                <option value="warning">
                                    Warning
                                </option>

                                <option value="danger">
                                    Danger
                                </option>

                                <option value="success">
                                    Success
                                </option>

                            </select>

                        </div>


                        <button
                            type="submit"
                            disabled={loading}
                        >
                            {loading
                                ? "Creating..."
                                : "Create Alert"}
                        </button>

                    </form>


                    {success && (
                        <p>
                            {success}
                        </p>
                    )}


                    {error && (
                        <p>
                            {error}
                        </p>
                    )}

                </section>


                {/* EXISTING ALERTS */}

                <section className="admin-overview">

                    <h2>
                        Existing Alerts
                    </h2>


                    {alerts.length === 0 ? (

                        <div className="admin-empty">

                            <h3>
                                No alerts available
                            </h3>

                            <p>
                                Create an alert using the form above.
                            </p>

                        </div>

                    ) : (

                        alerts.map((alert) => (

                            <div
                                key={alert._id}
                                className="admin-empty"
                            >

                                <h3>
                                    {alert.title}
                                </h3>

                                <p>
                                    {alert.message}
                                </p>

                                <small>
                                    Type: {alert.type}
                                </small>

                                <br />

                                <button
                                    onClick={() =>
                                        handleDelete(alert._id)
                                    }
                                >
                                    Delete
                                </button>

                            </div>

                        ))

                    )}

                </section>

            </main>

        </div>
    );
}

export default AdminAlerts;