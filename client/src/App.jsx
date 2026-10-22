import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import AdminRoute from "./pages/AdminRoute";
import Home from "./pages/Home";
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
import RouteDetails from "./pages/RouteDetails";
import AdminDashboard from "./pages/AdminDashboard";
import AdminUsers from "./pages/AdminUsers";
import AdminRoutes from "./pages/AdminRoutes";
import AdminOperators from "./pages/AdminOperators";
import AdminBookings from "./pages/AdminBookings";
import AdminAlerts from "./pages/AdminAlerts";
import AdminNotifications from "./pages/AdminNotifications";
import BusTracking from "./pages/BusTracking";
import AdminLayout from "./pages/AdminLayout";
import "./transit-sidebar.css";
function TransitSidebar() {
    const location = useLocation();
    const isOperator = location.pathname.startsWith("/operator");
    const links = isOperator
        ? [
            ["Overview", "/operator", "⌂"],
            ["Routes", "/operator/routes", "↗"],
            ["Trips", "/operator/trips", "▣"],
            ["Passengers", "/operator/passengers", "♙"],
            ["Schedule", "/operator/schedule", "◷"],
          ]
        : [
            ["Home", "/dashboard", "⌂"],
            ["Find Routes", "/routes", "↗"],
            ["Track Bus", "/tracking", "◎"],
            ["My Tickets", "/tickets", "▣"],
            ["Trip History", "/history", "◷"],
            ["Saved Routes", "/saved-routes", "☆"],
            ["Travel Updates", "/alerts", "◉"],
            ["Notifications", "/notifications", "♧"],
          ];
    return <aside className="transit-sidebar">
        <Link to={isOperator ? "/operator" : "/dashboard"} className="transit-sidebar-brand">Transit<span>Go</span></Link>
        <p className="transit-sidebar-caption">{isOperator ? "OPERATOR WORKSPACE" : "YOUR JOURNEYS"}</p>
        <nav className="transit-sidebar-nav">
            {links.map(([label, to, symbol]) => <Link key={to} to={to} className={location.pathname === to || (to === "/routes" && location.pathname.startsWith("/routes/")) ? "selected" : ""}>
                <span className="transit-sidebar-icon">{symbol}</span><span>{label}</span>
            </Link>)}
        </nav>
        <div className="transit-sidebar-bottom">
            <Link to="/profile"><span className="transit-sidebar-icon">♙</span> Profile & settings</Link>
            <Link to="/login"><span className="transit-sidebar-icon">↪</span> Log out</Link>
        </div>
    </aside>;
}

function AppRoutes() {
    const location = useLocation();
    const path = location.pathname;
    const showSidebar = path !== "/" && path !== "/login" && path !== "/register" && !path.startsWith("/admin");
    return <div className={showSidebar ? "transit-app-shell has-transit-sidebar" : "transit-app-shell"}>
        {showSidebar && <TransitSidebar />}
        <div className="transit-app-content">
            <Routes>
                <Route path="/tracking" element={<BusTracking />} />
                <Route path="/" element={<Home />} />
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
                <Route path="/operator" element={<OperatorDashboard />} />
                <Route path="/operator/routes" element={<OperatorRoutes />} />
                <Route path="/operator/routes/:id" element={<OperatorRouteDetails />} />
                <Route path="/operator/trips" element={<OperatorTrips />} />
                <Route path="/operator/passengers" element={<OperatorPassengers />} />
                <Route path="/operator/schedule" element={<OperatorSchedule />} />
                <Route element={<AdminRoute />}>
                    <Route element={<AdminLayout />}>
                        <Route path="/admin" element={<AdminDashboard />} />
                        <Route path="/admin/users" element={<AdminUsers />} />
                        <Route path="/admin/routes" element={<AdminRoutes />} />
                        <Route path="/admin/operators" element={<AdminOperators />} />
                        <Route path="/admin/bookings" element={<AdminBookings />} />
                        <Route path="/admin/alerts" element={<AdminAlerts />} />
                        <Route path="/admin/notifications" element={<AdminNotifications />} />
                    </Route>
                </Route>
                <Route path="/routes/:id" element={<RouteDetails />} />
            </Routes>
        </div>
    </div>;
}

function App() {
    return <BrowserRouter><AppRoutes /></BrowserRouter>;
}

export default App;