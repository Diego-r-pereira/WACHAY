// src/services/mockData.js

export const mockImages = [
    {
        id: 1,
        url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80",
        date: "2025-06-01",
        description: "Forest overview, morning pass"
    },
    {
        id: 2,
        url: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80",
        date: "2025-06-02",
        description: "NDVI anomaly detected"
    },
    {
        id: 3,
        url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=400&q=80",
        date: "2025-06-03",
        description: "Normal conditions"
    },
    {
        id: 4,
        url: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80",
        date: "2025-06-04",
        description: "Potential smoke signal"
    }
];

export const mockIncidents = [
    {
        id: 101,
        date: "2025-06-04 13:15",
        type: "Fire alert",
        description: "Possible fire detected in Tunari, sector C-4. Urgent field verification requested.",
        image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=200&q=80",
        reportedBy: "juan.ranger@mail.com"
    }
];
