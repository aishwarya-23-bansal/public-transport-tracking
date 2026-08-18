import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "../App.css";

function Profile() {
    const [profile, setProfile] = useState({
        name: "",
        email: "",
        phone: "",
        role: "",
        emergencyContactName: "",
        emergencyContactPhone: "",
        profileImage: ""
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            const response = await api.get("/users/profile");

            const user = response.data.user;

            setProfile({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                role: user.role || "",
                emergencyContactName: user.emergencyContactName || "",
                emergencyContactPhone: user.emergencyContactPhone || "",
                profileImage: user.profileImage || ""
            });

        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.put("/users/profile", {
                name: profile.name,
                phone: profile.phone,
                emergencyContactName: profile.emergencyContactName,
                emergencyContactPhone: profile.emergencyContactPhone
            });

            setMessage("Profile updated successfully.");

            setTimeout(() => {
                setMessage("");
            }, 3000);

        } catch (error) {
            console.error(error);

            setMessage(
                error.response?.data?.message ||
                "Unable to update profile."
            );

            setTimeout(() => {
                setMessage("");
            }, 3000);
        }
    };

    if (loading) {
        return (
            <div className="profile-loading">
                Loading profile...
            </div>
        );
    }

    return (
        <div className="profile-page">

            {message && (
                <div className="toast success">
                    <span className="toast-icon">✓</span>
                    {message}
                </div>
            )}

            <div className="profile-header">

                <div>
                    <h1>Profile</h1>
                    <p>Manage your personal information and preferences.</p>
                </div>

                <Link to="/dashboard" className="back-button">
                    Back to Dashboard
                </Link>

            </div>


            <div className="profile-container">

                {/* Profile Summary */}

                <div className="profile-summary">

                    <div className="profile-image">

                        {profile.profileImage ? (
                            <img
                                src={`http://localhost:8000${profile.profileImage}`}
                                alt="Profile"
                            />
                        ) : (
                            <span>
                                {profile.name
                                    ? profile.name.charAt(0).toUpperCase()
                                    : "U"}
                            </span>
                        )}

                    </div>

                    <h2>{profile.name}</h2>

                    <p className="profile-role">
                        {profile.role || "Commuter"}
                    </p>

                    <button className="change-photo-button">
                        Change Photo
                    </button>

                    <div className="profile-divider"></div>

                    <div className="profile-info">

                        <div>
                            <span>Email</span>
                            <strong>{profile.email}</strong>
                        </div>

                        <div>
                            <span>Phone</span>
                            <strong>{profile.phone || "Not added"}</strong>
                        </div>

                    </div>

                </div>


                {/* Profile Form */}

                <div className="profile-details">

                    <div className="details-header">
                        <h2>Personal Information</h2>
                        <p>Update your account information below.</p>
                    </div>

                    <form onSubmit={handleSubmit}>

                        <div className="profile-grid">

                            <div className="profile-field">
                                <label>Full Name</label>

                                <input
                                    type="text"
                                    name="name"
                                    value={profile.name}
                                    onChange={handleChange}
                                />
                            </div>


                            <div className="profile-field">
                                <label>Email Address</label>

                                <input
                                    type="email"
                                    value={profile.email}
                                    disabled
                                />
                            </div>


                            <div className="profile-field">
                                <label>Phone Number</label>

                                <input
                                    type="text"
                                    name="phone"
                                    value={profile.phone}
                                    onChange={handleChange}
                                />
                            </div>


                            <div className="profile-field">
                                <label>Account Role</label>

                                <input
                                    type="text"
                                    value={profile.role}
                                    disabled
                                />
                            </div>

                        </div>


                        <div className="emergency-box">

                            <div className="emergency-heading">
                                <h3>Emergency Contact</h3>
                                <p>
                                    Keep a trusted contact available for emergencies.
                                </p>
                            </div>

                            <div className="profile-grid">

                                <div className="profile-field">
                                    <label>Contact Name</label>

                                    <input
                                        type="text"
                                        name="emergencyContactName"
                                        value={profile.emergencyContactName}
                                        onChange={handleChange}
                                    />
                                </div>


                                <div className="profile-field">
                                    <label>Contact Phone</label>

                                    <input
                                        type="text"
                                        name="emergencyContactPhone"
                                        value={profile.emergencyContactPhone}
                                        onChange={handleChange}
                                    />
                                </div>

                            </div>

                        </div>


                        <div className="form-footer">

                            <button
                                type="button"
                                className="cancel-button"
                                onClick={fetchProfile}
                            >
                                Reset
                            </button>

                            <button
                                type="submit"
                                className="save-button"
                            >
                                Save Changes
                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default Profile;