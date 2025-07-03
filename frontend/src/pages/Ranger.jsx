import { useAuth } from "@/services/auth.jsx";
import { Flame, Globe, Image, FilePlus, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { mockIncidents, mockImages } from "@/services/mockData";


// Datos de ejemplo
const mockStats = [
    { label: "Active Fires", value: 3, icon: <Flame className="text-red-500" /> },
    { label: "Area Monitored (ha)", value: "280,000", icon: <Globe className="text-blue-700" /> },
    { label: "Satellite Images (24h)", value: 16, icon: <Image className="text-indigo-500" /> },
];

// const mockIncidents = [
//     { id: "INC-1027", date: "2025-06-07 14:25", location: "Tunari - Zona Norte", status: "Active", severity: "High" },
//     { id: "INC-1024", date: "2025-06-07 10:43", location: "Tunari - Sipe Sipe", status: "Extinguished", severity: "Medium" },
//     { id: "INC-1021", date: "2025-06-06 22:15", location: "Tunari - Melga", status: "Active", severity: "Low" },
// ];

export default function Ranger() {
    const { user } = useAuth();

    // Modal state
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({
        location: "",
        severity: "Medium",
        description: "",
    });
    const [submitted, setSubmitted] = useState(false);

    const handleFormChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleReport = (e) => {
        e.preventDefault();
        // Validación simple
        if (!form.location || !form.description) return;
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setOpen(false);
            setForm({
                location: "",
                severity: "Medium",
                description: "",
            });
            // Aquí puedes disparar una notificación real
        }, 1200);
    };

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 flex flex-col gap-6 px-4 py-8 max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-green-700 mb-1">Ranger Dashboard</h1>
                        <span className="text-slate-600">
              Welcome, <b>{user.email}</b> <Badge variant="outline">guard</Badge>
            </span>
                    </div>
                    {/* Modal Trigger */}
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                                <FilePlus size={16} /> Report Incident
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Report New Incident</DialogTitle>
                                <DialogDescription>
                                    Please provide details about the new fire or incident detected.
                                </DialogDescription>
                            </DialogHeader>
                            {submitted ? (
                                <div className="p-6 flex flex-col items-center">
                                    <Flame size={48} className="text-orange-500 mb-2 animate-bounce" />
                                    <div className="text-green-600 font-semibold text-lg mb-2">Incident reported!</div>
                                    <div className="text-xs text-slate-500 text-center">
                                        The emergency response team will be notified automatically.
                                    </div>
                                </div>
                            ) : (
                                <form onSubmit={handleReport} className="flex flex-col gap-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Location</label>
                                        <Input
                                            name="location"
                                            placeholder="e.g., Tunari - Sector Norte"
                                            value={form.location}
                                            onChange={handleFormChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Severity</label>
                                        <select
                                            name="severity"
                                            value={form.severity}
                                            onChange={handleFormChange}
                                            className="border rounded px-2 py-1 w-full"
                                        >
                                            <option value="Low">Low</option>
                                            <option value="Medium">Medium</option>
                                            <option value="High">High</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium mb-1">Description</label>
                                        <Textarea
                                            name="description"
                                            placeholder="Add any observations, smoke, wind, area burned..."
                                            value={form.description}
                                            onChange={handleFormChange}
                                            rows={3}
                                            required
                                        />
                                    </div>
                                    <Button type="submit" className="w-full" disabled={!form.location || !form.description}>
                                        Submit Report
                                    </Button>
                                </form>
                            )}
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Stats cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {mockStats.map((stat) => (
                        <Card key={stat.label}>
                            <CardContent className="flex items-center gap-4 p-5">
                                <div className="p-2 bg-slate-100 rounded-full">{stat.icon}</div>
                                <div>
                                    <div className="text-2xl font-bold">{stat.value}</div>
                                    <div className="text-slate-500 text-sm">{stat.label}</div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Map section (placeholder) */}
                <div className="w-full h-72 bg-slate-200 rounded-xl flex flex-col items-center justify-center shadow-inner mb-6">
                    <Globe size={40} className="text-green-400 mb-2" />
                    <span className="text-slate-600">[Map placeholder] Satellite View Coming Soon</span>
                </div>

                {/* Recent Incidents */}
                <div>
                    <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
                        <Flame className="text-red-500" /> Recent Fires & Incidents
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-slate-700 border">
                            <thead className="bg-slate-100">
                            <tr>
                                <th className="px-3 py-2">ID</th>
                                <th className="px-3 py-2">Date</th>
                                <th className="px-3 py-2">Location</th>
                                <th className="px-3 py-2">Status</th>
                                <th className="px-3 py-2">Severity</th>
                            </tr>
                            </thead>
                            <tbody>
                            {mockIncidents.map((inc) => (
                                <tr key={inc.id} className="border-t">
                                    <td className="px-3 py-2">{inc.id}</td>
                                    <td className="px-3 py-2">{inc.date}</td>
                                    <td className="px-3 py-2">{inc.location}</td>
                                    <td className="px-3 py-2">
                                        <Badge color={inc.status === "Active" ? "destructive" : "default"}>
                                            {inc.status}
                                        </Badge>
                                    </td>
                                    <td className="px-3 py-2">{inc.severity}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Quick Access: Satellite Images */}
                <div className="flex flex-wrap gap-6 justify-center mb-8">
                    {mockImages.map((img) => (
                        <div
                            key={img.id}
                            className="w-44 h-32 rounded-lg shadow relative overflow-hidden group bg-slate-200"
                        >
                            <img
                                src={img.url}
                                alt={img.description}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute left-0 bottom-0 w-full bg-black/50 text-white text-xs px-2 py-1">
                                {img.date}
                            </div>
                        </div>
                    ))}
                </div>

                <section className="my-8 w-full max-w-2xl mx-auto">
                    <h2 className="text-xl font-bold mb-4">Latest Incident Reports</h2>
                    <ul className="space-y-4">
                        {mockIncidents.map((inc) => (
                            <li key={inc.id} className="bg-white rounded shadow px-4 py-2 flex gap-4 items-center">
                                <img src={inc.image} className="w-12 h-12 rounded object-cover border" />
                                <div>
                                    <div className="font-semibold">{inc.type}</div>
                                    <div className="text-slate-500 text-xs">{inc.date}</div>
                                    <div className="text-slate-700 text-sm">{inc.description}</div>
                                    <div className="text-xs text-slate-400">Reported by: {inc.reportedBy}</div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            </main>

            {/* Footer personalizado */}
            <footer className="bg-slate-50 border-t border-slate-200 py-4 text-center text-slate-500 text-xs mt-6">
                <div className="flex flex-col items-center gap-1">
                    <span>For urgent fire reports contact: <b className="text-green-700">800-123-456</b> <Phone className="inline-block ml-1" size={13}/></span>
                    <span>Shift Supervisor: <b>Lic. Ana Paredes</b></span>
                </div>
            </footer>
        </div>
    );
}
