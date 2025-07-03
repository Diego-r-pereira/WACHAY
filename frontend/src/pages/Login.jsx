import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/services/auth.jsx";

export default function Login() {
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("user");
    const { login } = useAuth();
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        login(email, role);
        navigate("/dashboard");
    }

    return (
        <div className="flex flex-col items-center justify-center flex-1">
            <form
                className="bg-white p-8 rounded shadow-md flex flex-col gap-4 w-80"
                onSubmit={handleSubmit}
            >
                <h2 className="text-2xl font-bold mb-2">Login</h2>
                <Input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <select
                    className="border rounded p-2"
                    value={role}
                    onChange={e => setRole(e.target.value)}
                >
                    <option value="admin">Administrator</option>
                    <option value="guard">Guardabosques</option>
                    <option value="user">Usuario común</option>
                </select>
                <Button type="submit">Sign In</Button>
            </form>
        </div>
    );
}
