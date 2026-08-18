import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/auth/register", {
                name,
                email,
                phone,
                password
            });

            alert(response.data.message || "Registration successful!");

            navigate("/login");

        } catch (error) {
            console.error(error);

            alert(
                error.response?.data?.message ||
                "Registration failed"
            );
        }
    };

    return (
        <div className="login-page">

            <div className="login-left">

                <div className="brand">
                    <div className="logo">🚍</div>
                    <h1>Transit<span>Go</span></h1>
                </div>

                <div className="hero-text">
                    <h2>Start your journey.</h2>

                    <p>
                        Create your account and make public
                        transport easier and smarter.
                    </p>

                    <div className="features">
                        <div>📍 Find routes easily</div>
                        <div>🎫 Book your tickets</div>
                        <div>⏱️ Track your journey</div>
                    </div>
                </div>

            </div>


            <div className="login-right">

                <div className="login-card">

                    <div className="mobile-logo">
                        🚍 TransitGo
                    </div>

                    <h2>Create account</h2>

                    <p className="login-subtitle">
                        Join TransitGo today
                    </p>

                    <form onSubmit={handleRegister}>

                        <div className="input-group">
                            <label>Name</label>

                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </div>


                        <div className="input-group">
                            <label>Email</label>

                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>


                        <div className="input-group">
                            <label>Phone</label>

                            <input
                                type="tel"
                                placeholder="Enter your phone number"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                required
                            />
                        </div>


                        <div className="input-group">
                            <label>Password</label>

                            <input
                                type="password"
                                placeholder="Create a password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>


                        <button className="login-button" type="submit">
                            Create Account →
                        </button>

                    </form>


                    <p className="register-text">
                        Already have an account?{" "}
                        <Link to="/login">Login</Link>
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Register;