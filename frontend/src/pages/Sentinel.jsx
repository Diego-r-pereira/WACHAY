
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const bbox = [-66.3563, -17.4870, -66.1222, -17.1714];

export default function Sentinel() {
  const [scenes, setScenes] = useState([]);

  useEffect(() => {
    const fetchScenes = async () => {
      const res = await fetch("https://earth-search.aws.element84.com/v0/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          collections: ["sentinel-s2-l2a-cogs"],
          intersects: { type: "Polygon", coordinates: [[
            [bbox[0], bbox[1]], [bbox[2], bbox[1]], [bbox[2], bbox[3]], [bbox[0], bbox[3]], [bbox[0], bbox[1]]
          ]]},
          sort: [{ field: "properties.datetime", direction: "desc" }],
          limit: 6
        })
      });
      const data = await res.json();
      setScenes(data.features || []);
    };
    fetchScenes();
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {scenes.map(scene => (
        <Card key={scene.id}>
          <img src={scene.assets.thumbnail.href} className="h-40 w-full object-cover" />
          <CardContent>
            <p>{new Date(scene.properties.datetime).toLocaleString()}</p>
            <Badge>{scene.properties["eo:cloud_cover"]}% clouds</Badge>
            <a href={scene.assets.visual.href} target="_blank" className="underline text-blue-600">Ver Imagen</a>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
