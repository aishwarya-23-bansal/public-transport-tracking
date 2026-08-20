import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../App.css";

function AdminUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [showAddUser, setShowAddUser] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        phone: "",
        role: "commuter"
    });

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

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleAddUser = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/users", form);

            alert(
                response.data.message ||
                "User created successfully"
            );

            setForm({
                name: "",
                email: "",
                password: "",
                phone: "",
                role: "commuter"
            });

            setShowAddUser(false);

            fetchUsers();
        } catch (error) {
            console.error("Create user error:", error);

            alert(
                error.response?.data?.message ||
                "Unable to create user."
            );
        }
    };

    const handleViewUser = async (id) => {
        try {
            const response = await api.get(`/users/${id}`);

            setSelectedUser(response.data.user);
        } catch (error) {
            console.error("View user error:", error);

            alert(
                error.response?.data?.message ||
                "Unable to load user."
            );
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
                        type="button"
                        className="admin-primary-button"
                        onClick={() => setShowAddUser(true)}
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
                            type="button"
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
                                                    type="button"
                                                    className="admin-action-button"
                                                    onClick={() =>
                                                        handleViewUser(
                                                            user._id
                                                        )
                                                    }
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

            {showAddUser && (
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
                            width: "400px",
                            maxWidth: "100%",
                            color: "#111"
                        }}
                    >
                        <h2>Add User</h2>

                        <form onSubmit={handleAddUser}>
                            <div className="input-group">
                                <label>Name</label>

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter name"
                                    value={form.name}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label>Email</label>

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Enter email"
                                    value={form.email}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label>Phone</label>

                                <input
                                    type="tel"
                                    name="phone"
                                    placeholder="Enter phone"
                                    value={form.phone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label>Password</label>

                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Create password"
                                    value={form.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div className="input-group">
                                <label>Role</label>

                                <select
                                    name="role"
                                    value={form.role}
                                    onChange={handleChange}
                                >
                                    <option value="commuter">
                                        Commuter
                                    </option>

                                    <option value="operator">
                                        Operator
                                    </option>

                                    <option value="admin">
                                        Admin
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
                                    Create User
                                </button>

                                <button
                                    type="button"
                                    className="admin-action-button"
                                    onClick={() =>
                                        setShowAddUser(false)
                                    }
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {selectedUser && (
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
                            width: "400px",
                            maxWidth: "100%",
                            color: "#111"
                        }}
                    >
                        <h2>User Details</h2>

                        <p>
                            <strong>Name:</strong>{" "}
                            {selectedUser.name}
                        </p>

                        <p>
                            <strong>Email:</strong>{" "}
                            {selectedUser.email}
                        </p>

                        <p>
                            <strong>Phone:</strong>{" "}
                            {selectedUser.phone}
                        </p>

                        <p>
                            <strong>Role:</strong>{" "}
                            {selectedUser.role}
                        </p>

                        <p>
                            <strong>Created:</strong>{" "}
                            {new Date(
                                selectedUser.createdAt
                            ).toLocaleDateString()}
                        </p>

                        <button
                            type="button"
                            className="admin-primary-button"
                            onClick={() =>
                                setSelectedUser(null)
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

export default AdminUsers;