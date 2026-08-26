import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import api from "../services/api";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await api.post("/auth/login", {
                email,
                password
            });

            const token = response.data.token;
            const user = response.data.user;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));

            if (user.role === "commuter") {
                navigate("/dashboard");
            } else if (user.role === "operator") {
                navigate("/operator");
            } else if (user.role === "admin") {
                navigate("/admin");
            } else {
                setError("Invalid account role.");
            }

        } catch (error) {
            console.error(error);

            setError(
                error.response?.data?.message ||
                "Invalid email or password."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">

            <div className="login-left">
                <div className="brand">
                    <div className="logo"></div>
                    <h1>Transit<span>Go</span></h1>
                </div>

                <div className="hero-text">
                    <h2>Travel smarter.<br />Move better.</h2>

                    <p>
                        Track buses, discover routes and book your
                        journey — all in one place.
                    </p>

                    <div className="features">
                        <div>Real-time route tracking</div>
                        <div>Easy ticket booking</div>
                        <div>Smart ETA updates</div>
                    </div>
                </div>
            </div>

            <div className="login-right">
                <div className="login-card">

                    <div className="mobile-logo">
                        🚍 TransitGo
                    </div>

                    <h2>Welcome back!</h2>

                    <p className="login-subtitle">
                        Login to continue your journey
                    </p>

                    {error && (
                        <div className="form-error">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin}>

                        <div className="input-group">
                            <label>Email</label>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setError("");
                                }}
                                required
                            />
                        </div>

                        <div className="input-group">
                            <label>Password</label>

                            <input
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError("");
                                }}
                                required
                            />
                        </div>

                        <div className="login-options">
                            <label className="remember">
                                <input type="checkbox" />
                                Remember me
                            </label>

                            <a href="#">Forgot password?</a>
                        </div>

                        <button
                            className="login-button"
                            type="submit"
                            disabled={loading}
                        >
                            {loading ? "Logging in..." : "Login →"}
                        </button>

                    </form>

                    <div className="divider">
                        <span>OR</span>
                    </div>

                    <p className="register-text">
                        Don't have an account?
                        <Link to="/register"> Create one</Link>
                    </p>

                </div>
            </div>

        </div>
    );
}

export default Login;