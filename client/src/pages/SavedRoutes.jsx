import { Link } from "react-router-dom";
import "../App.css";

function SavedRoutes() {
    return (
        <div className="saved-routes-page">

            <nav className="main-nav">
                <Link to="/dashboard" className="brand">
                    Transit<span>Go</span>
                </Link>

                <div className="nav-links">
                    <Link to="/dashboard">Home</Link>
                    <Link to="/routes">Routes</Link>
                    <Link to="/tickets">Tickets</Link>
                    <Link to="/history">History</Link>
                    <Link to="/alerts">Updates</Link>
                </div>

                <div className="nav-user">
                    <Link to="/profile">Profile</Link>
                    <Link to="/dashboard">Dashboard</Link>
                </div>
            </nav>

            <main className="saved-routes-content">

                <section className="saved-routes-heading">
                    <span>YOUR ROUTES</span>
                    <h1>Saved Routes</h1>
                    <p>Keep your frequently used journeys one click away.</p>
                </section>

                <section className="saved-routes-empty">

                    <div className="saved-route-icon">
                        →
                    </div>

                    <span>NO SAVED ROUTES</span>

                    <h2>Your favourite routes will appear here.</h2>

                    <p>
                        Search for a route and save the journeys you use most
                        often for quicker access.
                    </p>

                    <Link to="/routes" className="ticket-action">
                        Search Routes →
                    </Link>

                </section>

            </main>

            <footer className="commuter-footer">
                <div>
                    <div className="brand">
                        Transit<span>Go</span>
                    </div>

                    <p>
                        Making public transport simpler, smarter and more accessible.
                    </p>
                </div>

                <div className="footer-links">
                    <Link to="/routes">Routes</Link>
                    <Link to="/tickets">Tickets</Link>
                    <Link to="/history">History</Link>
                </div>
            </footer>

        </div>
    );
}

export default SavedRoutes;