import { Link } from "react-router-dom";
import "../App.css";

function AdminOperators() {
    return (
        <div className="admin-page">
            <nav className="navbar">
                <Link to="/admin" className="dashboard-logo">
                    Transit<span>Go</span>
                </Link>
                <div className="nav-right">
                    <Link to="/profile" className="profile-link">
                        Profile
                    </Link>
                    <Link to="/admin" className="back-link">
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
                    <button className="admin-primary-button">
                        Add Operator
                    </button>
                </div>
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
                            <tr>
                                <td colSpan="5">
                                    No operators available
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}

export default AdminOperators;