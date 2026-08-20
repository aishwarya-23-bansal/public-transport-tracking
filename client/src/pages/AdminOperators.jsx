import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../App.css";

function AdminOperators() {
    const [operators, setOperators] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [showAddOperator, setShowAddOperator] = useState(false);
    const [selectedOperator, setSelectedOperator] = useState(null);

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        password: ""
    });

    useEffect(() => {
        fetchOperators();
    }, []);

    const fetchOperators = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/users");

            const operatorUsers = (response.data.users || [])
                .filter((user) => user.role === "operator");

            setOperators(operatorUsers);
        } catch (error) {
            console.error("Fetch operators error:", error);

            setError(
                error.response?.data?.message ||
                "Unable to load operators."
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

    const handleAddOperator = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/users", {
                name: form.name,
                email: form.email,
                phone: form.phone,
                password: form.password,
                role: "operator"
            });

            alert(
                response.data.message ||
                "Operator created successfully"
            );

            setForm({
                name: "",
                email: "",
                phone: "",
                password: ""
            });

            setShowAddOperator(false);

            fetchOperators();
        } catch (error) {
            console.error("Create operator error:", error);

            alert(
                error.response?.data?.message ||
                "Unable to create operator."
            );
        }
    };

    const handleViewOperator = (operator) => {
        setSelectedOperator(operator);
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

                    <h1>Operator Management</h1>

                    <p>
                        Manage transport operators and their assignments.
                    </p>

                </div>


                <div className="operator-management-header">

                    <div>

                        <h2>Operators</h2>

                        <p>
                            View operator accounts and current status.
                        </p>

                    </div>

                    <button
                        type="button"
                        className="admin-primary-button"
                        onClick={() => setShowAddOperator(true)}
                    >
                        Add Operator
                    </button>

                </div>


                {loading && (

                    <div className="admin-empty">

                        <h3>Loading operators...</h3>

                        <p>
                            Please wait while operators are loaded.
                        </p>

                    </div>

                )}


                {!loading && error && (

                    <div className="admin-empty">

                        <h3>Unable to load operators</h3>

                        <p>{error}</p>

                        <button
                            type="button"
                            className="admin-primary-button"
                            onClick={fetchOperators}
                        >
                            Try Again
                        </button>

                    </div>

                )}


                {!loading && !error && (

                    <div className="admin-operators-table-wrapper">

                        <table className="admin-operators-table">

                            <thead>

                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Assigned Route</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>

                            </thead>


                            <tbody>

                                {operators.length === 0 ? (

                                    <tr>

                                        <td colSpan="5">
                                            No operators available
                                        </td>

                                    </tr>

                                ) : (

                                    operators.map((operator) => (

                                        <tr key={operator._id}>

                                            <td>
                                                {operator.name}
                                            </td>

                                            <td>
                                                {operator.email}
                                            </td>

                                            <td>
                                                Not Assigned
                                            </td>

                                            <td>
                                                Active
                                            </td>

                                            <td>

                                                <button
                                                    type="button"
                                                    className="admin-action-button"
                                                    onClick={() =>
                                                        handleViewOperator(
                                                            operator
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


            {showAddOperator && (

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

                        <h2>Add Operator</h2>

                        <form onSubmit={handleAddOperator}>

                            <div className="input-group">

                                <label>Name</label>

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Enter operator name"
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
                                    placeholder="Enter phone number"
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


                            <p>
                                <strong>Role:</strong> Operator
                            </p>


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
                                    Create Operator
                                </button>

                                <button
                                    type="button"
                                    className="admin-action-button"
                                    onClick={() =>
                                        setShowAddOperator(false)
                                    }
                                >
                                    Cancel
                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}


            {selectedOperator && (

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

                        <h2>Operator Details</h2>

                        <p>
                            <strong>Name:</strong>{" "}
                            {selectedOperator.name}
                        </p>

                        <p>
                            <strong>Email:</strong>{" "}
                            {selectedOperator.email}
                        </p>

                        <p>
                            <strong>Phone:</strong>{" "}
                            {selectedOperator.phone}
                        </p>

                        <p>
                            <strong>Role:</strong>{" "}
                            {selectedOperator.role}
                        </p>

                        <p>
                            <strong>Status:</strong> Active
                        </p>

                        <p>
                            <strong>Assigned Route:</strong>{" "}
                            Not Assigned
                        </p>

                        <button
                            type="button"
                            className="admin-primary-button"
                            onClick={() =>
                                setSelectedOperator(null)
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

export default AdminOperators;