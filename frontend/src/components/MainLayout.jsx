import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/services/auth.jsx";

export default function MainLayout({ children }) {
    // ...resto del código
    const { user, logout } = useAuth();

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            {/* Navbar */}
            <nav className="bg-white border-b border-slate-200 shadow-sm px-8 py-4 flex items-center justify-between">
                <div className="font-extrabold text-2xl text-blue-700 tracking-tight">WACHAY</div>
                <div className="space-x-6 flex items-center">
                    <Link to="/" className={location.pathname === "/" ? "text-blue-600 font-bold" : "text-slate-600 hover:text-blue-500"}>Home</Link>
                    <Link to="/dashboard" className={location.pathname === "/dashboard" ? "text-blue-600 font-bold" : "text-slate-600 hover:text-blue-500"}>Dashboard</Link>
                    {!user && (
                        <Link to="/login" className={location.pathname === "/login" ? "text-blue-600 font-bold" : "text-slate-600 hover:text-blue-500"}>Login</Link>
                    )}
                    {user && (
                        <span className="ml-4 flex items-center gap-2">
              <span className="text-slate-600">Hello, <b>{user.email}</b> ({user.role})</span>
              <button onClick={logout} className="text-red-500 underline ml-2">Logout</button>
            </span>
                    )}
                </div>
            </nav>
            {/* Content */}
            <main className="flex-1 flex flex-col">{children}</main>
            {/* Footer */}
            <footer className="bg-white border-t border-slate-200 py-2 text-center text-xs text-slate-400">
                © {new Date().getFullYear()} WACHAY. All rights reserved.
            </footer>
        </div>
    );
}
