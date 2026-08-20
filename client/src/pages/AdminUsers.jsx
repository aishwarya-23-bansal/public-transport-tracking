import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../App.css";

function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/users");
            setUsers(response.data.users || []);
        } catch (error) {
            console.error("Fetch users error:", error);

            setError(
                error.response?.data?.message ||
                "Unable to load users."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-page">
            <nav className="navbar">
                <Link to="/admin" className="dashboard-logo">
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
                    <h1>User Management</h1>

                    <p>
                        View and manage registered TransitGo users.
                    </p>
                </div>

                <div className="user-management-header">
                    <div>
                        <h2>Registered Users</h2>

                        <p>
                            Manage commuter, operator and admin accounts.
                        </p>
                    </div>

                    <button
                        className="admin-primary-button"
                        disabled
                    >
                        Add User
                    </button>
                </div>

                {loading && (
                    <div className="admin-empty">
                        <h3>Loading users...</h3>

                        <p>
                            Please wait while users are loaded.
                        </p>
                    </div>
                )}

                {!loading && error && (
                    <div className="admin-empty">
                        <h3>Unable to load users</h3>

                        <p>{error}</p>

                        <button
                            className="admin-primary-button"
                            onClick={fetchUsers}
                        >
                            Try Again
                        </button>
                    </div>
                )}

                {!loading && !error && (
                    <div className="users-table-wrapper">
                        <table className="users-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {users.length === 0 ? (
                                    <tr>
                                        <td colSpan="5">
                                            No users available
                                        </td>
                                    </tr>
                                ) : (
                                    users.map((user) => (
                                        <tr key={user._id}>
                                            <td>
                                                {user.name}
                                            </td>

                                            <td>
                                                {user.email}
                                            </td>

                                            <td>
                                                {user.role}
                                            </td>

                                            <td>
                                                Active
                                            </td>

                                            <td>
                                                <button
                                                    className="admin-action-button"
                                                    disabled
                                                >
                                                    View
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
        </div>
    );
}

export default AdminUsers;