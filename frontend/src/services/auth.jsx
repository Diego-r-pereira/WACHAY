// Simulación básica de autenticación y roles (esto luego irá a backend)
import { createContext, useContext, useState } from "react";

// Crea el contexto de autenticación
const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    // Simula login con un rol elegido
    async function login(email, password) {
        const params = new URLSearchParams();
        params.append("username", email);
        params.append("password", password);

        const res = await fetch("http://localhost:8000/login", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: params,
            credentials: "include",
        });

        if (!res.ok) {
            alert("Login failed!");
            return null;
        }

        const data = await res.json();
        localStorage.setItem("user", JSON.stringify(data));
        setUser(data);  // 👈
        return data;
    }


    function logout() {
        setUser(null);
        localStorage.removeItem("user");
    }

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook para usar el contexto
export function useAuth() {
    return useContext(AuthContext);
}
