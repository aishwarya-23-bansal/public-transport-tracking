import { Link } from "react-router-dom";
import "../App.css";

function Notifications() {
    return (
        <div className="notifications-page">

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


            <main className="notifications-content">

                <div className="notifications-heading">

                    <h1>Notifications</h1>

                    <p>
                        Stay updated with your account and journeys.
                    </p>

                </div>


                <div className="notification-list">

                    <div className="notification-card">

                        <div className="notification-content">

                            <span className="notification-label">
                                ACCOUNT
                            </span>

                            <h3>
                                Welcome to TransitGo
                            </h3>

                            <p>
                                Your account has been successfully created.
                                You can now search routes and manage your profile.
                            </p>

                            <span className="notification-time">
                                Recent
                            </span>

                        </div>

                    </div>


                    <div className="notification-card">

                        <div className="notification-content">

                            <span className="notification-label">
                                SYSTEM
                            </span>

                            <h3>
                                No new updates
                            </h3>

                            <p>
                                You're all caught up. New notifications
                                will appear here.
                            </p>

                            <span className="notification-time">
                                Current
                            </span>

                        </div>

                    </div>

                </div>

            </main>

        </div>
    );
}

export default Notifications;