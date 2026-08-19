import { Link } from "react-router-dom";
import "../App.css";

function AdminUsers() {
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
                    <h1>User Management</h1>
                    <p>
                        View and manage registered TransitGo users.
                    </p>
                </div>
                <div className="user-management-header">
                    <div>
                        <h2>Registered Users</h2>
                        <p>
                            Manage commuter and operator accounts.
                        </p>
                    </div>
                    <button className="admin-primary-button">
                        Add User
                    </button>
                </div>
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
                            <tr>
                                <td colSpan="5">
                                    No users available
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
export default AdminUsers;