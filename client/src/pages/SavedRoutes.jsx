import { Link } from "react-router-dom";
import "../App.css";

function SavedRoutes() {
    return (
        <div className="saved-routes-page">

            <nav className="navbar">

                <Link to="/dashboard" className="dashboard-logo">
                    Transit<span>Go</span>
                </Link>

                <div className="nav-right">

                    <Link to="/profile" className="profile-link">
                        Profile
                    </Link>

                    <Link to="/dashboard" className="back-link">
                        Dashboard
                    </Link>

                </div>

            </nav>


            <main className="saved-routes-content">

                <div className="saved-routes-heading">

                    <h1>Saved Routes</h1>

                    <p>
                        Quickly access routes you use frequently.
                    </p>

                </div>


                <div className="saved-routes-empty">

                    <h3>
                        No saved routes
                    </h3>

                    <p>
                        Save your frequently used routes to access
                        them quickly in the future.
                    </p>

                    <Link
                        to="/routes"
                        className="primary-button"
                    >
                        Search Routes
                    </Link>

                </div>

            </main>

        </div>
    );
}

export default SavedRoutes;