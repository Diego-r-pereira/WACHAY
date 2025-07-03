// src/services/api.js

// Simula fetch de imágenes satelitales
export async function fetchSatelliteImages() {
    // En el futuro aquí harás un fetch real
    // const res = await fetch("/api/satellite-images");
    // return await res.json();
    const { mockImages } = await import("./mockData.js");
    return mockImages;
}

// Simula fetch de incidentes
export async function fetchIncidents() {
    const { mockIncidents } = await import("./mockData.js");
    return mockIncidents;
}

// Simula reporte de incidente
export async function reportIncident(data) {
    // En el futuro, esto sería un POST
    // return fetch("/api/incidents", { method: "POST", body: JSON.stringify(data) });
    // Por ahora solo retorna ok
    return { ok: true, data };
}
