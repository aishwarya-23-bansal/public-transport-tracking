import { useState } from "react";
import "../App.css";

function Profile() {
    const [name, setName] = useState("Aishwarya Bansal");
    const [email] = useState("aish@example.com");
    const [phone, setPhone] = useState("9999999999");

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Profile updated!");
    };

    return (
        <div className="profile-page">

            <div className="profile-header">
                <div>
                    <h1>My Profile</h1>
                    <p>Manage your personal information</p>
                </div>

                <button onClick={() => window.history.back()}>
                    ← Back
                </button>
            </div>

            <div className="profile-card">

                <div className="profile-photo-section">
                    <div className="profile-photo">
                        👤
                    </div>

                    <h2>{name}</h2>
                    <p>Commuter</p>

                    <button className="photo-button">
                        Change Photo
                    </button>
                </div>

                <div className="profile-form">

                    <h2>Personal Information</h2>

                    <form onSubmit={handleSubmit}>

                        <div className="profile-row">

                            <div className="input-group">
                                <label>Full Name</label>

                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>

                            <div className="input-group">
                                <label>Phone</label>

                                <input
                                    type="tel"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>

                        </div>

                        <div className="input-group">
                            <label>Email</label>

                            <input
                                type="email"
                                value={email}
                                disabled
                            />
                        </div>

                        <div className="emergency-section">

                            <h3>Emergency Contact</h3>

                            <div className="profile-row">

                                <div className="input-group">
                                    <label>Contact Name</label>

                                    <input
                                        type="text"
                                        placeholder="e.g. Mom"
                                    />
                                </div>

                                <div className="input-group">
                                    <label>Contact Phone</label>

                                    <input
                                        type="tel"
                                        placeholder="Enter phone number"
                                    />
                                </div>

                            </div>

                        </div>

                        <button className="save-button" type="submit">
                            Save Changes
                        </button>

                    </form>

                </div>

            </div>

        </div>
    );
}

export default Profile;