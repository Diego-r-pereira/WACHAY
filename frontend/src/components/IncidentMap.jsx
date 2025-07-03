
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const fireIcon = (severity = "Medium") =>
  L.divIcon({
    html: '<div style="font-size: 24px; color:' +
      (severity === "High" ? "red" : severity === "Low" ? "orange" : "gold") +
      '">🔥</div>',
    iconSize: [24, 24],
    className: "leaflet-div-icon",
  });

export default function IncidentMap({ incidents }) {
  const tunariCenter = [-17.3507, -66.2431];

  return (
    <div className="rounded border overflow-hidden shadow">
      <MapContainer center={tunariCenter} zoom={10} scrollWheelZoom={true} style={{ height: "400px", width: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {incidents.filter(i => i.latitude && i.longitude).map(i => (
          <Marker key={i.id} position={[i.latitude, i.longitude]} icon={fireIcon(i.severity)}>
            <Popup>
              <strong>{i.code}</strong><br />
              {i.location}<br />
              Estado: {i.status}<br />
              Severidad: {i.severity}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
