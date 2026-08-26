import { Link, useNavigate } from "react-router-dom";
import "../App.css";

function Dashboard() {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user") || "null");

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    return (
        <div className="commuter-home">
            <nav className="main-nav">
                <Link to="/dashboard" className="brand">Transit<span>Go</span></Link>

                <div className="nav-links">
                    <Link to="/dashboard">Home</Link>
                    <Link to="/routes">Routes</Link>
                    <Link to="/tickets">Tickets</Link>
                    <Link to="/history">History</Link>
                    <Link to="/alerts">Updates</Link>
                </div>

                <div className="nav-user">
                    <Link to="/profile">{user?.name || "Profile"}</Link>
                    <button onClick={logout}>Logout</button>
                </div>
            </nav>

            <main>
                <section className="travel-hero">
                    <div className="hero-content">
                        <span className="hero-label">TRANSITGO FOR COMMUTERS</span>
                        <h1>Move smarter.<br />Travel easier.</h1>
                        <p>Find routes, track your journey and manage your public transport trips in one place.</p>
                    </div>

                    <div className="route-search">
                        <div className="search-title">
                            <span>PLAN YOUR JOURNEY</span>
                            <h2>Where do you want to go?</h2>
                        </div>

                        <div className="search-fields">
                            <div className="search-field">
                                <label>FROM</label>
                                <input type="text" placeholder="Starting point" />
                            </div>

                            <div className="search-direction">→</div>

                            <div className="search-field">
                                <label>TO</label>
                                <input type="text" placeholder="Destination" />
                            </div>

                            <Link to="/routes" className="find-route-btn">Find Routes</Link>
                        </div>
                    </div>
                </section>

                <section className="services-section">
                    <div className="section-title">
                        <span>TRAVEL SERVICES</span>
                        <h2>What do you need?</h2>
                    </div>

                    <div className="service-links">
                        <Link to="/routes">
                            <span>⌕</span>
                            <div>
                                <strong>Find a Route</strong>
                                <small>Search available transport</small>
                            </div>
                            <b>→</b>
                        </Link>

                        <Link to="/tickets">
                            <span>▣</span>
                            <div>
                                <strong>My Tickets</strong>
                                <small>View your active tickets</small>
                            </div>
                            <b>→</b>
                        </Link>

                        <Link to="/saved-routes">
                            <span>☆</span>
                            <div>
                                <strong>Saved Routes</strong>
                                <small>Access your favourite routes</small>
                            </div>
                            <b>→</b>
                        </Link>

                        <Link to="/alerts">
                            <span>!</span>
                            <div>
                                <strong>Service Updates</strong>
                                <small>Check transport alerts</small>
                            </div>
                            <b>→</b>
                        </Link>
                    </div>
                </section>

                <section className="travel-section">
                    <div className="section-title">
                        <span>YOUR TRAVEL</span>
                        <h2>Travel overview</h2>
                    </div>

                    <div className="travel-stats">
                        <div>
                            <span>ACTIVE TICKETS</span>
                            <strong>0</strong>
                            <small>No active tickets</small>
                        </div>

                        <div>
                            <span>UPCOMING TRIPS</span>
                            <strong>0</strong>
                            <small>No upcoming trips</small>
                        </div>

                        <div>
                            <span>SAVED ROUTES</span>
                            <strong>0</strong>
                            <small>No saved routes</small>
                        </div>
                    </div>
                </section>

                <section className="updates-section">
                    <div className="section-title">
                        <span>TRAVEL INFORMATION</span>
                        <h2>Service updates</h2>
                    </div>

                    <div className="empty-update">
                        <div>
                            <strong>No current service alerts</strong>
                            <p>There are no major disruptions affecting your routes.</p>
                        </div>
                        <Link to="/alerts">View all updates →</Link>
                    </div>
                </section>

                <section className="history-section">
                    <div>
                        <span>YOUR JOURNEYS</span>
                        <h2>Keep track of your travel</h2>
                        <p>View previous trips, tickets and your saved routes.</p>
                    </div>

                    <div className="history-actions">
                        <Link to="/history">Trip History →</Link>
                        <Link to="/profile">My Profile →</Link>
                    </div>
                </section>
            </main>

            <footer className="commuter-footer">
                <div className="brand">Transit<span>Go</span></div>
                <p>Making public transport simpler, smarter and more accessible.</p>
            </footer>
        </div>
    );
}

export default Dashboard;