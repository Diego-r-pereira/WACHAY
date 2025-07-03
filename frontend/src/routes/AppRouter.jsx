import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import Dashboard from "../pages/Dashboard";
import Admin from "../pages/Admin";
import Ranger from "../pages/Ranger";
import User from "../pages/User";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";

export default function AppRouter() {
    return (
        <Router>
            <MainLayout>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    {/* Ruta inteligente que redirige según rol */}
                    <Route path="/dashboard" element={<ProtectedRoute roles={["admin","guard","user"]}><Dashboard /></ProtectedRoute>} />
                    <Route path="/admin" element={<ProtectedRoute roles={["admin"]}><Admin /></ProtectedRoute>} />
                    <Route path="/ranger" element={<ProtectedRoute roles={["guard"]}><Ranger /></ProtectedRoute>} />
                    <Route path="/user" element={<ProtectedRoute roles={["user"]}><User /></ProtectedRoute>} />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </MainLayout>
        </Router>
    );
}
