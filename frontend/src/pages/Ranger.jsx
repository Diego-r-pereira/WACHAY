import { useAuth } from "@/services/auth.jsx";
import { useIncidents } from "@/services/useIncidents";
import { useSatelliteImages } from "@/services/useSatelliteImages";
import { Flame, Globe, Image, FilePlus, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

import Map, { Marker } from "react-map-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { MapPin } from "lucide-react";

import maplibregl from "maplibre-gl";

export default function Ranger() {
    const { user } = useAuth();
    // const { incidents, isLoading, isError, mutate } = useIncidents();
    const [showAll, setShowAll] = useState(false);
    const { incidents, isLoading, isError, mutate } = useIncidents(
        showAll ? "http://localhost:8000/incidents" : "http://localhost:8000/incidents/active"
    );

    const { images: satelliteImages, isLoading: loadingImages } = useSatelliteImages();
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

    const handleReport = async (e) => {
        e.preventDefault();
        if (!form.location || !form.description) return;

        setSubmitted(true);

        try {
            const res = await fetch("http://localhost:8000/incidents", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    location: form.location,
                    severity: form.severity,
                    description: form.description,
                }),
            });

            if (res.ok) {
                await mutate();
                setTimeout(() => {
                    setSubmitted(false);
                    setOpen(false);
                    setForm({
                        location: "",
                        severity: "Medium",
                        description: "",
                    });
                }, 1200);
            } else {
                setSubmitted(false);
                alert("Error al reportar el incidente");
            }
        } catch (err) {
            console.error("Error en reporte de incidente:", err);
            setSubmitted(false);
            alert("Error al reportar el incidente");
        }
    };

    const handleConfirm = async (incidentId) => {
        const token = localStorage.getItem("token");  // 🔐 Obtener token guardado en login
        try {
            const res = await fetch(`http://localhost:8000/incidents/${incidentId}/confirm`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ status: "Confirmed" }),
            });

            if (res.ok) {
                await mutate();
                alert("Incidente confirmado correctamente");
            } else {
                alert("Error al confirmar incidente");
            }
        } catch (err) {
            console.error("Error confirmando incidente:", err);
            alert("Error al confirmar incidente");
        }
    };

    const activeFires = incidents.filter((inc) => inc.status === "Active").length;

    const stats = [
        { label: "Active Fires", value: activeFires, icon: <Flame className="text-red-500" /> },
        { label: "Area Monitored (ha)", value: "280,000", icon: <Globe className="text-blue-700" /> },
        { label: "Satellite Images (24h)", value: satelliteImages.length, icon: <Image className="text-indigo-500" /> },
    ];

    const MAPBOX_TOKEN = "pk.eyJ1IjoiZGllZ29ycCIsImEiOiJjbWRlMTgwaW0wYmJ0MmxxNXNwZXR5amtoIn0.x9mAQEktqK2EtnH379_rJQ";  // 👈 token

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 flex flex-col gap-6 px-4 py-8 max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                    <div>
                        <h1 className="text-3xl font-extrabold text-green-700 mb-1">Ranger Dashboard</h1>
                        <span className="text-slate-600">
                            Welcome, <b>{user?.full_name || user?.username}</b> {user?.role}
                        </span>
                    </div>
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="sm" className="flex items-center gap-1">
                                <FilePlus size={16} /> Report Incident
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Report New Incident</DialogTitle>
                                <DialogDescription>Please provide details about the new fire or incident detected.</DialogDescription>
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
                    {stats.map((stat) => (
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

                {/* Map placeholder */}
                <div className="w-full h-72 rounded-xl overflow-hidden shadow mb-6">
                    <Map
                        mapLib={maplibregl}  // ✅ Especifica que use maplibre-gl en lugar de mapbox-gl
                        initialViewState={{
                            longitude: -66.15,
                            latitude: -17.4,
                            zoom: 9
                        }}
                        mapStyle="https://api.maptiler.com/maps/streets/style.json?key=YOUR_MAPTILER_KEY"  // Mapbox style compatible con MapTiler o cambia a tu Mapbox style
                        mapboxAccessToken={MAPBOX_TOKEN}  // Puedes dejarlo vacío si usas MapTiler o propio
                    >
                        {incidents.map((inc) => (
                            inc.longitude && inc.latitude && (
                                <Marker key={inc.id} longitude={inc.longitude} latitude={inc.latitude}>
                                    <MapPin className="text-red-500" />
                                </Marker>
                            )
                        ))}
                    </Map>
                </div>

                {/* Recent Incidents with Confirm button */}
                <div>
                    <div className="flex justify-between items-center mb-3">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <Flame className="text-red-500" /> Recent Fires & Incidents
                        </h2>
                        <button
                            onClick={() => setShowAll(!showAll)}
                            className="text-sm text-blue-600 underline"
                        >
                            {showAll ? "Show Active Only" : "Show All Incidents"}
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-slate-700 border">
                            <thead className="bg-slate-100">
                            <tr>
                                <th className="px-3 py-2">ID</th>
                                <th className="px-3 py-2">Date</th>
                                <th className="px-3 py-2">Location</th>
                                <th className="px-3 py-2">Status</th>
                                <th className="px-3 py-2">Severity</th>
                                <th className="px-3 py-2">Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {isLoading ? (
                                <tr>
                                    <td colSpan={6}>Loading...</td>
                                </tr>
                            ) : isError ? (
                                <tr>
                                    <td colSpan={6} className="text-red-500">Error loading incidents</td>
                                </tr>
                            ) : (
                                incidents.map((inc) => (
                                    <tr key={inc.id} className="border-t">
                                        <td className="px-3 py-2">{inc.code}</td>
                                        <td className="px-3 py-2">{new Date(inc.date).toLocaleString()}</td>
                                        <td className="px-3 py-2">{inc.location}</td>
                                        <td className="px-3 py-2">
                                            <Badge color={inc.status === "Active" ? "destructive" : "default"}>
                                                {inc.status}
                                            </Badge>
                                        </td>
                                        <td className="px-3 py-2">{inc.severity}</td>
                                        <td className="px-3 py-2">
                                            {inc.status !== "Confirmed" && (
                                                <button
                                                    onClick={() => handleConfirm(inc.id)}
                                                    className="text-blue-600 underline text-sm"
                                                >
                                                    Confirmar
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Satellite Images */}
                <div className="flex flex-wrap gap-6 justify-center mb-8">
                    {loadingImages ? (
                        <span>Loading satellite images...</span>
                    ) : satelliteImages.length === 0 ? (
                        <span>No satellite images available</span>
                    ) : (
                        satelliteImages.map((img) => (
                            <div
                                key={img.id}
                                className="w-44 h-32 rounded-lg shadow relative overflow-hidden group bg-slate-200"
                            >
                                <img
                                    src={img.url}
                                    alt={img.description || "Satellite image"}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute left-0 bottom-0 w-full bg-black/50 text-white text-xs px-2 py-1">
                                    {img.date}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </main>

            <footer className="bg-slate-50 border-t border-slate-200 py-4 text-center text-slate-500 text-xs mt-6">
                <div className="flex flex-col items-center gap-1">
          <span>
            For urgent fire reports contact: <b className="text-green-700">800-10-4466</b>{" "}
              <Phone className="inline-block ml-1" size={13} />
          </span>
                    <span>Chief Supervisor: <b>Lic. Fabiola Rojas</b></span>
                </div>
            </footer>
        </div>
    );
}