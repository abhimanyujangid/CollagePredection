import { useState, useEffect } from 'react';

interface FetchState<T> {
    data: T | null;
    error: Error | null;
    loading: boolean;
}

type ApiFunction<T, P extends any[]> = (...params: P) => Promise<{ data: T }>;

const useFetch = <T, P extends any[]>(apiFunction: ApiFunction<T, P>, ...params: P): FetchState<T> => {
    const [data, setData] = useState<T | null>(null);
    const [error, setError] = useState<Error | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await apiFunction(...params);
                setData(response.data);
                setError(null);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('An error occurred'));
                setData(null);
            } finally {
                setLoading(false);
            }
        };
        
        fetchData();
    }, [apiFunction, ...params]);

    return { data, error, loading };
};

export default useFetch;
