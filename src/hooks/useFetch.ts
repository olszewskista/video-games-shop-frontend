import { useState, useEffect } from 'react';

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

export default function useFetch<T>(initalValue: T | null, url: string, method: Method = 'GET') {
    const [data, setData] = useState(initalValue);
    const [error, setError] = useState<null | string>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            try {
                const response = await fetch(url, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                    },
                });
                const resData = await response.json();

                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }

                setData(resData);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                }
            }
            setIsLoading(false);
        }
        fetchData();
    }, []);

    return { data, error, isLoading };
}
