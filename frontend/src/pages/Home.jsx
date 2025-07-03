import { Button } from "@/components/ui/button";
import { useAuth } from "@/services/auth.jsx";
import { Link } from "react-router-dom";
import { Flame, Satellite, MapPin, UserCheck } from "lucide-react";

export default function Home() {
    const { user } = useAuth();

    return (
        <div className="flex flex-col items-center justify-center flex-1 px-4">
            {/* Hero section */}
            <section className="w-full flex flex-col items-center justify-center mt-24 mb-12 text-center">
                <div className="flex flex-col items-center gap-3">
                    <Satellite size={52} className="text-blue-700 mb-2" />
                    <h1 className="text-5xl font-extrabold text-blue-700 mb-3 tracking-tight">
                        WACHAY
                    </h1>
                    <p className="text-lg text-slate-600 max-w-2xl">
                        <span className="font-semibold text-blue-700">Forest Fire Satellite Monitoring System</span><br />
                        Real-time monitoring, early fire detection and response for the Tunari National Park and surrounding areas in Bolivia.
                    </p>
                </div>
                <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
                    {!user && (
                        <Link to="/login">
                            <Button size="lg" className="px-8">Get Started</Button>
                        </Link>
                    )}
                    {user && (
                        <Link to="/dashboard">
                            <Button size="lg" className="px-8">Go to Dashboard</Button>
                        </Link>
                    )}
                    <a
                        href="https://es.wikipedia.org/wiki/Parque_nacional_Tunari"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-500 underline text-sm flex items-center justify-center gap-1"
                    >
                        <MapPin size={16} /> Learn more about Tunari National Park
                    </a>
                </div>
            </section>

            {/* Features section */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-5xl w-full mb-24">
                <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center">
                    <Flame size={36} className="text-red-500 mb-2" />
                    <h3 className="text-xl font-semibold mb-1">Early Fire Detection</h3>
                    <p className="text-slate-500 text-center">
                        AI-based image analysis on Sentinel-2 satellite data to detect forest fires and risks in real time.
                    </p>
                </div>
                <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center">
                    <Satellite size={36} className="text-blue-500 mb-2" />
                    <h3 className="text-xl font-semibold mb-1">Live Satellite Monitoring</h3>
                    <p className="text-slate-500 text-center">
                        Coverage of large forest areas, providing live and historical imagery for incident analysis and management.
                    </p>
                </div>
                <div className="bg-white rounded-2xl shadow-md p-6 flex flex-col items-center">
                    <UserCheck size={36} className="text-green-600 mb-2" />
                    <h3 className="text-xl font-semibold mb-1">Access for Rangers and Admins</h3>
                    <p className="text-slate-500 text-center">
                        Custom dashboards for park rangers, administrators, and the public to view, respond, and manage incidents.
                    </p>
                </div>
            </section>
        </div>
    );
}
