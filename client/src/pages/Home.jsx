import { Link, useNavigate } from "react-router-dom";
import "../App.css";

function Home() {
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        navigate("/routes");
    };

    return (
        <div className="home-page">

            {/* NAVBAR */}
            <nav className="home-navbar">

                <Link to="/" className="home-logo">
                    Transit<span>Go</span>
                </Link>

                <div className="home-nav-links">
                    <Link to="/">Home</Link>
                    <Link to="/routes">Bus Routes</Link>
                    <a href="#about">About</a>
                    <a href="#contact">Contact</a>
                </div>

                <div className="home-nav-actions">
                    <Link to="/login" className="home-login">
                        Login
                    </Link>

                    <Link to="/register" className="home-register">
                        Register
                    </Link>
                </div>

            </nav>


            {/* HERO */}
            <section className="home-hero">

                <div className="hero-content">

                    <span className="hero-tag">
                        🚌 SMARTER PUBLIC TRANSPORT
                    </span>

                    <h1>
                        Your journey,
                        <br />
                        <span>made simpler.</span>
                    </h1>

                    <p>
                        Discover routes, check bus schedules and
                        book your journey with TransitGo.
                    </p>

                </div>


                {/* SEARCH BOX */}
                <div className="booking-search">

                    <div className="booking-title">
                        <h2>Search Bus</h2>
                        <p>Find the best route for your journey</p>
                    </div>

                    <form onSubmit={handleSearch}>

                        <div className="search-fields">

                            <div className="search-field">
                                <label>From</label>

                                <input
                                    type="text"
                                    placeholder="Enter departure"
                                    required
                                />
                            </div>


                            <div className="swap-icon">
                                →
                            </div>


                            <div className="search-field">
                                <label>To</label>

                                <input
                                    type="text"
                                    placeholder="Enter destination"
                                    required
                                />
                            </div>


                            <div className="search-field">
                                <label>Journey Date</label>

                                <input
                                    type="date"
                                    required
                                />
                            </div>


                            <div className="search-field passenger-field">
                                <label>Passengers</label>

                                <select defaultValue="1">
                                    <option value="1">1 Passenger</option>
                                    <option value="2">2 Passengers</option>
                                    <option value="3">3 Passengers</option>
                                    <option value="4">4 Passengers</option>
                                    <option value="5">5 Passengers</option>
                                </select>
                            </div>

                        </div>


                        <button
                            type="submit"
                            className="search-button"
                        >
                            Search Buses →
                        </button>

                    </form>

                </div>

            </section>


            {/* WHY TRANSITGO */}
            <section className="home-section why-section">

                <div className="section-heading">

                    <span>WHY TRANSITGO</span>

                    <h2>
                        Everything you need for
                        <br />
                        a better journey.
                    </h2>

                </div>


                <div className="features-row">

                    <div className="feature-item">

                        <div className="feature-icon">
                            🚌
                        </div>

                        <h3>Easy Route Search</h3>

                        <p>
                            Find routes and schedules quickly
                            without unnecessary complexity.
                        </p>

                    </div>


                    <div className="feature-item">

                        <div className="feature-icon">
                            🎫
                        </div>

                        <h3>Simple Booking</h3>

                        <p>
                            Book your journey and manage
                            your tickets from one place.
                        </p>

                    </div>


                    <div className="feature-item">

                        <div className="feature-icon">
                            📍
                        </div>

                        <h3>Smart Travel</h3>

                        <p>
                            Get useful route information,
                            alerts and journey updates.
                        </p>

                    </div>


                    <div className="feature-item">

                        <div className="feature-icon">
                            🔔
                        </div>

                        <h3>Stay Updated</h3>

                        <p>
                            Receive important notifications
                            about your bookings and journeys.
                        </p>

                    </div>

                </div>

            </section>


            {/* POPULAR ROUTES */}
            <section className="home-section routes-section">

                <div className="section-heading route-heading">

                    <div>
                        <span>POPULAR ROUTES</span>

                        <h2>
                            Explore popular journeys
                        </h2>
                    </div>

                    <Link to="/routes" className="view-all">
                        View all routes →
                    </Link>

                </div>


                <div className="route-list">

                    <div className="route-item">

                        <div className="route-number">
                            101
                        </div>

                        <div className="route-info">
                            <strong>
                                GLA University
                            </strong>

                            <span>
                                Mathura Railway Station
                            </span>
                        </div>

                        <div className="route-arrow">
                            →
                        </div>

                        <div className="route-time">
                            <strong>08:30 AM</strong>
                            <span>Daily</span>
                        </div>

                    </div>


                    <div className="route-item">

                        <div className="route-number">
                            102
                        </div>

                        <div className="route-info">
                            <strong>
                                Mathura Railway Station
                            </strong>

                            <span>
                                GLA University
                            </span>
                        </div>

                        <div className="route-arrow">
                            →
                        </div>

                        <div className="route-time">
                            <strong>10:30 AM</strong>
                            <span>Daily</span>
                        </div>

                    </div>


                    <div className="route-item">

                        <div className="route-number">
                            103
                        </div>

                        <div className="route-info">
                            <strong>
                                GLA University
                            </strong>

                            <span>
                                Agra
                            </span>
                        </div>

                        <div className="route-arrow">
                            →
                        </div>

                        <div className="route-time">
                            <strong>01:00 PM</strong>
                            <span>Daily</span>
                        </div>

                    </div>

                </div>

            </section>


            {/* ABOUT */}
            <section
                id="about"
                className="home-section about-section"
            >

                <div className="about-content">

                    <span>ABOUT TRANSITGO</span>

                    <h2>
                        One platform for
                        <br />
                        every journey.
                    </h2>

                    <p>
                        TransitGo is a smart public transport
                        platform designed to make everyday
                        travel easier.
                    </p>

                    <p>
                        From discovering routes and booking
                        tickets to managing trips and receiving
                        travel updates, TransitGo brings the
                        complete journey together in one place.
                    </p>

                    <Link
                        to="/register"
                        className="about-button"
                    >
                        Start your journey →
                    </Link>

                </div>


                <div className="about-visual">

                    <div className="about-circle">
                        🚌
                    </div>

                    <div className="about-stat">
                        <strong>Simple.</strong>
                        <span>Smart. Connected.</span>
                    </div>

                </div>

            </section>


            {/* CONTACT */}
            <section
                id="contact"
                className="contact-section"
            >

                <div>

                    <span>CONTACT US</span>

                    <h2>
                        Need help with your journey?
                    </h2>

                    <p>
                        We're here to help you travel better.
                    </p>

                </div>


                <div className="contact-details">

                    <div>
                        <strong>Email</strong>
                        <span>support@transitgo.com</span>
                    </div>

                    <div>
                        <strong>Phone</strong>
                        <span>+91 1800 123 4567</span>
                    </div>

                    <div>
                        <strong>Location</strong>
                        <span>Mathura, Uttar Pradesh</span>
                    </div>

                </div>

            </section>


            {/* FOOTER */}
            <footer className="home-footer">

                <div className="footer-brand">

                    <Link to="/" className="home-logo">
                        Transit<span>Go</span>
                    </Link>

                    <p>
                        Travel smarter. Move better.
                    </p>

                </div>


                <div className="footer-links">

                    <Link to="/">Home</Link>
                    <Link to="/routes">Routes</Link>
                    <Link to="/login">Login</Link>
                    <Link to="/register">Register</Link>

                </div>


                <div className="footer-copy">
                    © 2026 TransitGo. All rights reserved.
                </div>

            </footer>

        </div>
    );
}

export default Home;