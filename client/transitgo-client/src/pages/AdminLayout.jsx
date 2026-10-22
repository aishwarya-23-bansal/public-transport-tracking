import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Users, Route as RouteIcon, BusFront, UserRoundCog,
  Ticket, BellRing, Send, UserRound, LogOut, PanelLeftClose
} from "lucide-react";
import { useState } from "react";
import "../admin-layout.css";

const navItems = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/routes", label: "Routes", icon: RouteIcon },
  { to: "/tracking", label: "Bus tracking", icon: BusFront },
  { to: "/admin/operators", label: "Operators", icon: UserRoundCog },
  { to: "/admin/bookings", label: "Bookings", icon: Ticket },
  { to: "/admin/alerts", label: "Travel alerts", icon: BellRing },
  { to: "/admin/notifications", label: "Notifications", icon: Send },
];

export default function AdminLayout() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();
  const user = (() => {
    try { return JSON.parse(localStorage.getItem("user") || "null"); }
    catch { return null; }
  })();

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    navigate("/login", { replace: true });
  }

  return (
    <div className={`admin-shell ${mobileOpen ? "sidebar-open" : ""}`}>
      {mobileOpen && <button className="sidebar-scrim" aria-label="Close menu" onClick={() => setMobileOpen(false)} />}
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <span className="sidebar-brand-mark"><BusFront size={22} /></span>
          <span>Transit<span className="brand-accent">Go</span><small>TRANSPORT OPERATIONS</small></span>
          <button className="sidebar-close" aria-label="Close menu" onClick={() => setMobileOpen(false)}><PanelLeftClose size={18} /></button>
        </div>
        <div className="sidebar-section-label">WORKSPACE</div>
        <nav className="sidebar-nav" aria-label="Admin navigation">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink key={to} to={to} end={end} onClick={() => setMobileOpen(false)} className={({ isActive }) => `sidebar-link ${isActive ? "active" : ""}`}>
              <Icon size={18} strokeWidth={1.9} /><span>{label}</span>
            </NavLink>
          ))}
        </nav>
        <div className="sidebar-bottom">
          <NavLink to="/profile" className="sidebar-link" onClick={() => setMobileOpen(false)}><UserRound size={18} /><span>My profile</span></NavLink>
          <button className="sidebar-link sidebar-logout" onClick={logout}><LogOut size={18} /><span>Log out</span></button>
          <div className="sidebar-user"><div className="sidebar-avatar">{(user?.name || user?.email || "A").slice(0, 1).toUpperCase()}</div><div className="sidebar-user-text"><strong>{user?.name || "Administrator"}</strong><span>Administrator</span></div><span className="online-dot" /></div>
        </div>
      </aside>
      <div className="admin-main-column">
        <header className="admin-topbar">
          <button className="mobile-menu-toggle" onClick={() => setMobileOpen(true)} aria-label="Open navigation"><span /><span /><span /></button>
          <div className="topbar-breadcrumb">Workspace <span>/</span> <strong>Admin</strong></div>
          <div className="topbar-right"><span className="topbar-status"><i /> System workspace</span><NavLink to="/profile" className="topbar-profile"><UserRound size={17} /> Profile</NavLink></div>
        </header>
        <div className="admin-route-content"><Outlet /></div>
      </div>
    </div>
  );
}
