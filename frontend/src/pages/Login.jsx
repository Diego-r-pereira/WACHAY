import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { useAuth } from "@/services/auth.jsx";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { user, login } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (user) {
            if (user.role === "admin") navigate("/admin");
            else if (user.role === "guard") navigate("/ranger");
            else navigate("/dashboard");
        }
    }, [user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            // NO necesitas navigate() aquí → lo hacemos desde useEffect
        } catch {
            alert("Login failed");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center flex-1">
            <div className="w-full max-w-sm bg-white rounded-xl shadow p-6">
                <h1 className="text-xl font-bold mb-4 text-center">Login</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                    <Input
                        type="text"
                        placeholder="Email or Username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button type="submit" className="w-full">Sign In</Button>
                </form>
            </div>
        </div>
    );
}