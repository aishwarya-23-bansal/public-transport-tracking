import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tickets from "./pages/Tickets";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import RoutesPage from "./pages/Routes";
import Alerts from "./pages/Alerts";
import Notifications from "./pages/Notifications";
import TripHistory from "./pages/TripHistory";

function App() {
    return (
        <BrowserRouter>

            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/routes" element={<RoutesPage />} />
                <Route path="/tickets" element={<Tickets />} />
                <Route path="/alerts" element={<Alerts />} />
                <Route path="/notifications" element={<Notifications />} />
                <Route path="/history" element={<TripHistory />} />
            </Routes>

        </BrowserRouter>
    );
}

export default App;