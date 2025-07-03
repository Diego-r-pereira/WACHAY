// Simulación básica de autenticación y roles (esto luego irá a backend)
import { createContext, useContext, useState } from "react";

// Crea el contexto de autenticación
const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(
        JSON.parse(localStorage.getItem("user")) || null
    );

    // Simula login con un rol elegido
    function login(email, role) {
        const userData = { email, role };
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
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
