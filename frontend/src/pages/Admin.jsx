import { useAuth } from "@/services/auth.jsx";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, Edit, Trash, ShieldCheck } from "lucide-react";
import { useState } from "react";

// 👤 Usuarios de ejemplo (esto luego lo consumirás del backend)
const mockUsers = [
    { id: 1, email: "admin@wachay.com", role: "admin", name: "Diego Pereira" },
    { id: 2, email: "ranger1@wachay.com", role: "guard", name: "Ana Paredes" },
    { id: 3, email: "ranger2@wachay.com", role: "guard", name: "José Gómez" },
    { id: 4, email: "public@wachay.com", role: "user", name: "Erika Rivera" },
];

const roleLabels = {
    admin: { label: "Administrator", color: "blue" },
    guard: { label: "Ranger", color: "green" },
    user: { label: "User", color: "slate" },
};

export default function Admin() {
    const { user } = useAuth();
    const [users, setUsers] = useState(mockUsers);

    // Handlers (solo mock, aquí integrarás backend)
    const handleEditRole = (id) => alert("Edit role (mock)");
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            setUsers((prev) => prev.filter((u) => u.id !== id));
        }
    };
    const handleAddUser = () => alert("Add user (mock)");

    return (
        <div className="flex flex-col gap-6 px-4 py-8 max-w-5xl mx-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-blue-700 mb-1 flex items-center gap-2">
                        <ShieldCheck className="text-blue-600" /> Admin Panel
                    </h1>
                    <span className="text-slate-600">
            Welcome, <b>{user.email}</b> <Badge variant="outline">admin</Badge>
          </span>
                </div>
                <div className="flex gap-2">
                    <Button size="sm" onClick={handleAddUser} className="flex items-center gap-1">
                        <UserPlus size={16} /> Add User
                    </Button>
                </div>
            </div>

            {/* User Table */}
            <Card>
                <CardContent className="p-4">
                    <h2 className="text-lg font-bold mb-3">User Management</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-slate-700 border">
                            <thead className="bg-slate-100">
                            <tr>
                                <th className="px-3 py-2">Name</th>
                                <th className="px-3 py-2">Email</th>
                                <th className="px-3 py-2">Role</th>
                                <th className="px-3 py-2">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {users.map((u) => (
                                <tr key={u.id} className="border-t hover:bg-slate-50 transition">
                                    <td className="px-3 py-2">{u.name}</td>
                                    <td className="px-3 py-2">{u.email}</td>
                                    <td className="px-3 py-2">
                                        <Badge
                                            className={
                                                u.role === "admin"
                                                    ? "bg-blue-100 text-blue-700"
                                                    : u.role === "guard"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-slate-200 text-slate-700"
                                            }
                                        >
                                            {roleLabels[u.role].label}
                                        </Badge>
                                    </td>
                                    <td className="px-3 py-2 flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="xs"
                                            onClick={() => handleEditRole(u.id)}
                                            className="flex items-center gap-1"
                                        >
                                            <Edit size={14} /> Edit Role
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="xs"
                                            onClick={() => handleDelete(u.id)}
                                            className="flex items-center gap-1"
                                            disabled={u.id === user.id} // no puede eliminarse a sí mismo
                                        >
                                            <Trash size={14} /> Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                        {users.length === 0 && (
                            <div className="py-4 text-center text-slate-400">No users available.</div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Future logs/settings */}
            <Card>
                <CardContent className="p-4">
                    <h2 className="text-lg font-bold mb-3">Activity Logs & Settings</h2>
                    <div className="text-slate-500 italic">
                        {/* Placeholder para logs o configuración avanzada */}
                        Coming soon: system logs, password reset, invitation links and advanced settings!
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
