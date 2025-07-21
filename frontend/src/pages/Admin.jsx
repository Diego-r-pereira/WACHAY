import { useEffect, useState } from "react";
import { useAuth } from "@/services/auth.jsx";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, Edit, Trash } from "lucide-react";
import { toast } from "sonner"; // Usa sonner, recomendado por Shadcn
import { InputField } from "@/components/InputField";

const roleLabels = {
    admin: { label: "Administrator", color: "blue" },
    guard: { label: "Ranger", color: "green" },
    user: { label: "User", color: "slate" },
};

export default function Admin() {
    const { user } = useAuth();
    const [users, setUsers] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        username: "",
        password: "",
        role: "user",
        id: null
    });

    // Traer usuarios reales
    const fetchUsers = async () => {
        try {
            const res = await fetch("http://localhost:8000/users");
            if (!res.ok) throw new Error("No se pudo obtener usuarios");
            const data = await res.json();
            setUsers(data);
        } catch {
            toast.error("Error al cargar usuarios");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    // --- Validaciones extra ---
    const validateForm = () => {
        if (!form.name.trim() || !form.email.trim() || !form.username.trim() || (!editMode && !form.password.trim())) {
            toast.error("Completa todos los campos obligatorios.");
            return false;
        }
        // Email simple
        if (!/\S+@\S+\.\S+/.test(form.email)) {
            toast.error("Correo electrónico inválido.");
            return false;
        }
        // Password mínimo (solo para crear)
        if (!editMode && form.password.length < 6) {
            toast.error("La contraseña debe tener al menos 6 caracteres.");
            return false;
        }
        return true;
    };

    // Crear usuario nuevo
    const handleCreate = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:8000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                full_name: form.name,
                email: form.email,
                username: form.username,
                password: form.password,
                role: form.role,
            }),
        });
        if (res.ok) {
            toast.success("Usuario creado correctamente");
            setModalOpen(false);
            setForm({ name: "", email: "", username: "", password: "", role: "user", id: null });
            fetchUsers();
        } else {
            const err = await res.json();
            toast.error("Error al crear usuario: " + (err.detail || "desconocido"));
        }
    };

    // Eliminar usuario real
    const handleDelete = async (id) => {
        if (id === user.id) {
            toast.error("No puedes eliminarte a ti mismo.");
            return;
        }
        if (!window.confirm("¿Seguro que deseas borrar este usuario?")) return;
        const res = await fetch(`http://localhost:8000/users/${id}`, { method: "DELETE" });
        if (res.ok) {
            toast.success("Usuario eliminado correctamente");
            fetchUsers();
        } else {
            toast.error("Error al eliminar usuario");
        }
    };

    // Abrir modal de edición y cargar datos de usuario
    const handleEditOpen = (u) => {
        if (u.id === user.id) {
            toast.error("No puedes editar tu propio usuario aquí.");
            return;
        }
        setEditMode(true);
        setModalOpen(true);
        setForm({
            name: u.full_name,
            email: u.email,
            username: u.username,
            password: "",
            role: u.role,
            id: u.id
        });
    };

    // Editar usuario real
    const handleEdit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;
        const payload = {
            full_name: form.name,
            email: form.email,
            username: form.username,
            role: form.role,
        };
        if (form.password) payload.password = form.password;
        const res = await fetch(`http://localhost:8000/users/${form.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
        });
        if (res.ok) {
            toast.success("Usuario actualizado correctamente");
            setModalOpen(false);
            setEditMode(false);
            setForm({ name: "", email: "", username: "", password: "", role: "user", id: null });
            fetchUsers();
        } else {
            toast.error("Error al editar usuario");
        }
    };

    return (
        <div className="max-w-7xl mx-auto p-6">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">User Management</h2>
                <Button onClick={() => { setModalOpen(true); setEditMode(false); setForm({ name: "", email: "", username: "", password: "", role: "user", id: null }); }}>
                    <UserPlus size={18} className="mr-2" /> New User
                </Button>
            </div>
            <Card className="w-full">
                <CardContent className="p-4">
                    <div className="overflow-x-auto">
                    <table className="w-full min-w-[800px]">
                        <thead>
                        <tr>
                            <th className="text-left px-4 py-2">Name</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Username</th>
                            <th className="px-4 py-2">Role</th>
                            <th className="px-4 py-2"></th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map(u => (
                            <tr key={u.id} className="border-t">
                                <td className="px-4 py-2">{u.full_name}</td>
                                <td className="px-4 py-2 whitespace-nowrap">{u.email}</td>
                                <td className="px-4 py-2">{u.username}</td>
                                <td className="px-4 py-2">
                                    <Badge className="capitalize">{roleLabels[u.role]?.label || u.role}</Badge>
                                </td>
                                <td className="px-4 py-2 flex gap-2">
                                    <Button
                                        variant="outline"
                                        size="xs"
                                        className="mr-1"
                                        onClick={() => handleEditOpen(u)}
                                        disabled={u.id === user.id} // Bloquea botón editar a sí mismo
                                    >
                                        <Edit size={14} />
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        size="xs"
                                        onClick={() => handleDelete(u.id)}
                                        disabled={u.id === user.id} // Bloquea botón borrar a sí mismo
                                    >
                                        <Trash size={14} />
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    </div>
                </CardContent>
            </Card>

            {/* Modal de creación/edición */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <form className="bg-white p-8 rounded-xl shadow space-y-4 w-[340px]"
                          onSubmit={editMode ? handleEdit : handleCreate}>
                        <h3 className="text-xl font-bold mb-2">{editMode ? "Edit User" : "Create User"}</h3>
                        <InputField
                            label="Name"
                            name="name"
                            value={form.name}
                            onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                            required
                        />
                        <InputField
                            label="Email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                            required
                        />
                        <InputField
                            label="Username"
                            name="username"
                            value={form.username}
                            onChange={e => setForm(f => ({ ...f, username: e.target.value }))}
                            required
                        />
                        <InputField
                            label={editMode ? "New password (optional)" : "Password"}
                            name="password"
                            type="password"
                            value={form.password}
                            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                            required={!editMode}
                        />
                        <select className="w-full border p-2 rounded mt-2" value={form.role}
                                onChange={e => setForm(f => ({ ...f, role: e.target.value }))}>
                            <option value="admin">Administrator</option>
                            <option value="guard">Ranger</option>
                            <option value="user">User</option>
                        </select>
                        <div className="flex justify-between pt-3">
                            <Button type="button" variant="outline" onClick={() => { setModalOpen(false); setEditMode(false); }}>Cancel</Button>
                            <Button type="submit">{editMode ? "Save" : "Create"}</Button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}