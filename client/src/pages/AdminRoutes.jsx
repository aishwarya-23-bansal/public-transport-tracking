import { Link } from "react-router-dom";
import "../App.css";

function AdminRoutes() {
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

                    <button className="admin-primary-button">
                        Add Route
                    </button>

                </div>


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

                            <tr>
                                <td colSpan="6">
                                    No routes available
                                </td>
                            </tr>

                        </tbody>

                    </table>

                </div>

            </main>

        </div>
    );
}

export default AdminRoutes;