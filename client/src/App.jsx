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
import SavedRoutes from "./pages/SavedRoutes";
import OperatorDashboard from "./pages/OperatorDashboard";
import OperatorRoutes from "./pages/OperatorRoutes";
import OperatorRouteDetails from "./pages/OperatorRouteDetails";
import OperatorTrips from "./pages/OperatorTrips";
import OperatorPassengers from "./pages/OperatorPassengers";
import OperatorSchedule from "./pages/OperatorSchedule";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminRoutes from "./pages/AdminRoutes";

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
                <Route path="/saved-routes" element={<SavedRoutes />} />
                <Route path="/operator" element={<OperatorDashboard />}/>
                <Route path="/operator/routes" element={<OperatorRoutes />}/>
                <Route path="/operator/routes/101" element={<OperatorRouteDetails />}/>
                <Route path="/operator/trips" element={<OperatorTrips />}/>
                <Route path="/operator/passengers" element={<OperatorPassengers />}/>
                <Route path="/operator/schedule" element={<OperatorSchedule />}/>
                <Route path="/admin" element={<AdminDashboard />}/>
                <Route path="/admin/users" element={<AdminUsers />}/>
                <Route path="/admin/routes" element={<AdminRoutes />}/>
            </Routes>

        </BrowserRouter>
    );
}

export default App;