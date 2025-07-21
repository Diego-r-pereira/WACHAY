import useSWR from "swr";

const fetcher = (url) =>
    fetch(url).then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
    });

// Cambia la URL por la que corresponda a tu backend
export function useIncidents() {
    const { data, error, isLoading, mutate } = useSWR(
        "http://localhost:8000/incidents",
        fetcher,
        { refreshInterval: 20000 } // refresca cada 20 segundos (opcional)
    );
    return {
        incidents: data || [],
        isLoading,
        isError: error,
        mutate,
    };
}
