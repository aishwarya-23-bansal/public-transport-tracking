import { Link } from "react-router-dom";
import "../App.css";

function Alerts() {
    return (
        <div className="alerts-page">

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


            <main className="alerts-content">

                <div className="alerts-heading">

                    <h1>Travel Alerts</h1>

                    <p>
                        Important updates about routes and public transport services.
                    </p>

                </div>


                <div className="alerts-list">

                    <div className="alert-card">

                        <span className="alert-type">
                            SERVICE STATUS
                        </span>

                        <h3>
                            No current service alerts
                        </h3>

                        <p>
                            There are currently no reported disruptions
                            affecting your routes.
                        </p>

                    </div>

                </div>

            </main>

        </div>
    );
}

export default Alerts;