
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const mockImages = [
  { url: "/images/incendio_1.jpg", name: "Tunari - Zona Norte", date: "2025-06-30 14:25", detection: "🔥 Posible foco", severity: "High" },
  { url: "/images/incendio_2.jpg", name: "Tunari - Sipe Sipe", date: "2025-06-30 10:40", detection: "🌤️ Sin calor", severity: "Low" },
  { url: "/images/incendio_3.jpg", name: "Tunari - Melga", date: "2025-06-29 18:10", detection: "🔥 Zona cálida", severity: "Medium" }
];

export default function Simulacion() {
  const [images] = useState(mockImages);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {images.map((img, idx) => (
        <Card key={idx}>
          <img src={img.url} className="h-40 w-full object-cover" />
          <CardContent>
            <h3>{img.name}</h3>
            <p>{img.date}</p>
            <Badge>{img.severity}</Badge>
            <p>{img.detection}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
