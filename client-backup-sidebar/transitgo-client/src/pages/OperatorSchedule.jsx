import { Link } from "react-router-dom";
import "../App.css";

function OperatorSchedule() {
    return (
        <div className="operator-page">

            <nav className="navbar">

                <Link to="/operator" className="dashboard-logo">
                    Transit<span>Go</span>
                </Link>

                <div className="nav-right">

                    <Link to="/profile" className="profile-link">
                        Profile
                    </Link>

                    <Link to="/operator" className="back-link">
                        Dashboard
                    </Link>

                </div>

            </nav>


            <main className="operator-content">

                <div className="operator-heading">

                    <h1>Schedule</h1>

                    <p>
                        View your assigned trip schedule.
                    </p>

                </div>


                <div className="schedule-card">

                    <div className="schedule-header">

                        <div>
                            <span className="route-label">
                                TODAY
                            </span>

                            <h2>Monday Schedule</h2>
                        </div>

                    </div>


                    <div className="schedule-row">

                        <div className="schedule-time">
                            <strong>08:30 AM</strong>
                            <span>Departure</span>
                        </div>

                        <div className="schedule-route">
                            <strong>Route 101</strong>
                            <span>
                                GLA University → Mathura Railway Station
                            </span>
                        </div>

                        <span className="schedule-status">
                            Scheduled
                        </span>

                    </div>


                    <div className="schedule-row">

                        <div className="schedule-time">
                            <strong>10:30 AM</strong>
                            <span>Departure</span>
                        </div>

                        <div className="schedule-route">
                            <strong>Route 102</strong>
                            <span>
                                Mathura Railway Station → GLA University
                            </span>
                        </div>

                        <span className="schedule-status">
                            Scheduled
                        </span>

                    </div>


                    <div className="schedule-empty">

                        <h3>
                            No more trips scheduled
                        </h3>

                        <p>
                            Additional trips assigned to you will appear here.
                        </p>

                    </div>

                </div>

            </main>

        </div>
    );
}

export default OperatorSchedule;