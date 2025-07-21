import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/services/auth.jsx";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useAuth();
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        const user = await login(email, password);  // 👈 Cambiar a password
        if (!user) return;
        if (user.role === "admin") navigate("/admin");
        else if (user.role === "guard") navigate("/ranger");
        else navigate("/dashboard");
    }

    return (
        <div className="flex flex-col items-center justify-center flex-1">
            <form className="bg-white p-8 rounded shadow-md flex flex-col gap-4 w-80" onSubmit={handleSubmit}>
                <h2 className="text-2xl font-bold text-center">Login</h2>
                <Input
                    type="text"
                    name="username"
                    placeholder="Email or Username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button type="submit">Sign In</Button>
            </form>
        </div>
    );
}
