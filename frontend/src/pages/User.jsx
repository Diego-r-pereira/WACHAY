import { useAuth } from "@/services/auth.jsx";
import { Image } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { mockImages } from "@/services/mockData.jsx";

export default function User() {
    const { user } = useAuth();

    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1 flex flex-col items-center justify-center px-4 py-8">
                {/* Header */}
                <div className="max-w-xl w-full flex flex-col items-center gap-2 mb-8">
                    <h1 className="text-3xl font-extrabold text-blue-700 mb-1 flex items-center gap-2">
                        <Image className="text-indigo-500" /> Latest Satellite Images
                    </h1>
                    <span className="text-slate-600">
            Welcome, <b>{user.email}</b> <Badge variant="outline">user</Badge>
          </span>
                    <p className="text-slate-500 text-center text-sm">
                        Here you can view the most recent satellite images of the monitored forest area.
                    </p>
                </div>

                {/* Gallery */}
                {/*<div className="flex flex-wrap gap-6 justify-center mb-8">*/}
                {/*    {[1, 2, 3, 4, 5, 6].map((i) => (*/}
                {/*        <div*/}
                {/*            key={i}*/}
                {/*            className="w-44 h-32 bg-gradient-to-br from-slate-300 to-slate-200 rounded-lg flex items-center justify-center shadow-md"*/}
                {/*        >*/}
                {/*            <span className="text-slate-400 text-xs">Image #{i}</span>*/}
                {/*        </div>*/}
                {/*    ))}*/}
                {/*</div>*/}

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

                {/* Limited access notice */}
                <div className="mt-2 text-center text-sm text-slate-400 max-w-md">
          <span>
            Access limited. If you need more features, please contact an administrator.
          </span>
                </div>
            </main>

            <footer className="bg-slate-50 border-t border-slate-200 py-3 text-center text-slate-500 text-xs">
                &copy; {new Date().getFullYear()} WACHAY. Powered by Satellite Data.
            </footer>
        </div>
    );
}
