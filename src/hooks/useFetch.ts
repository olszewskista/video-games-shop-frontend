import { useKeycloak } from '@react-keycloak/web';
import { useState, useEffect } from 'react';

type Method = 'get' | 'post' | 'put' | 'delete';

export default function useFetch<T>(initalValue: T | null, url: string, method: Method = 'get') {
    const [data, setData] = useState(initalValue);
    const [error, setError] = useState<null | string>(null);
    const [isLoading, setIsLoading] = useState(false);
    const {keycloak} = useKeycloak()
    // console.log(keycloak.token)

    useEffect(() => {
        async function fetchData() {
            setIsLoading(true);
            if (!keycloak.token) return
            try {
                const response = await fetch(url, {
                    method: method,
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + keycloak.token,
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
    }, [method, url, keycloak]);

    return { data, error, isLoading, setData };
}
