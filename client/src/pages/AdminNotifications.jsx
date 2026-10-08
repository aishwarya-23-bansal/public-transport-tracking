import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../App.css";

function AdminNotifications() {
    const [form, setForm] = useState({
        title: "",
        message: "",
        type: "info"
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);
        setSuccess("");
        setError("");

        try {
            const response = await api.post(
                "/notifications",
                form
            );

            setSuccess(
                response.data.message ||
                "Notification sent successfully."
            );

            setForm({
                title: "",
                message: "",
                type: "info"
            });
        } catch (err) {
            setError(
                err.response?.data?.message ||
                "Failed to send notification."
            );
        } finally {
            setLoading(false);
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

                    <h1>Notifications</h1>

                    <p>
                        Send important notifications to registered users.
                    </p>

                </div>


                <section className="admin-overview">

                    <h2>Send Notification</h2>

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
                                placeholder="Notification title"
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
                                placeholder="Enter notification message"
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
                                ? "Sending..."
                                : "Send Notification"}
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

            </main>

        </div>
    );
}

export default AdminNotifications;