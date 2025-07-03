import { useAuth } from "@/services/auth.jsx";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function Dashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            if (user.role === "admin") navigate("/admin", { replace: true });
            else if (user.role === "guard") navigate("/ranger", { replace: true });
            else if (user.role === "user") navigate("/user", { replace: true });
        }
    }, [user, navigate]);

    return null; // O puedes poner un spinner de carga
}
