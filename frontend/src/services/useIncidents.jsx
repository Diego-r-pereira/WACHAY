import useSWR from "swr";

const fetcher = (url) =>
    fetch(url).then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
    });

export function useIncidents(endpoint = "http://localhost:8000/incidents/active") {
    const { data, error, isLoading, mutate } = useSWR(
        endpoint,
        fetcher,
        { refreshInterval: 20000 }
    );
    return {
        incidents: data || [],
        isLoading,
        isError: error,
        mutate,
    };
}
