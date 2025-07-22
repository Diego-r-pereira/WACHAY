import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetch("http://localhost:8000/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then((res) => res.json())
                .then((data) => {
                    setUser({
                        id: data.id,
                        username: data.username,
                        email: data.email,
                        full_name: data.full_name,
                        role: data.role,
                        token,
                    });
                })
                .catch(() => {
                    logout();  // token inválido → limpiar sesión
                });
        }
    }, []);

    const login = async (username, password) => {
        const res = await fetch("http://localhost:8000/login", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
                username,
                password,
            }),
        });

        if (res.ok) {
            const data = await res.json();
            localStorage.setItem("token", data.access_token);

            // obtener perfil real desde /me
            const profile = await fetch("http://localhost:8000/me", {
                headers: { Authorization: `Bearer ${data.access_token}` },
            }).then((r) => r.json());

            setUser({
                id: profile.id,
                username: profile.username,
                email: profile.email,
                full_name: profile.full_name,
                role: profile.role,
                token: data.access_token,
            });
        } else {
            throw new Error("Invalid credentials");
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}