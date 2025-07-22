import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export function useSatelliteImages() {
    const { data, error, isLoading } = useSWR(
        "http://localhost:8000/satellite-images",  // asegúrate que tu backend responde aquí
        fetcher,
        { refreshInterval: 30000 }  // refresca cada 30 segundos opcionalmente
    );

    return {
        images: data || [],
        isLoading,
        isError: error,
    };
}