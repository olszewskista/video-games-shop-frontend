import { useState, useEffect, useRef } from 'react';
import Keycloak from 'keycloak-js';

const client = new Keycloak({
    url: import.meta.env.VITE_URL,
    realm: import.meta.env.VITE_REALM,
    clientId: import.meta.env.VITE_CLIENT_ID,
});

console.log(import.meta.env.VITE_URL)
console.log(import.meta.env.VITE_CLIENT_ID)
console.log(import.meta.env.VITE_REALM)

const useAuth = () => {
    const isRun = useRef(false);
    const [token, setToken] = useState<string | undefined>(undefined);
    const [isLogin, setLogin] = useState(false);

    useEffect(() => {
        async function runAuth() {
            if (isRun.current) return;

            isRun.current = true;
            try {
                const authenticated = await client.init({
                    onLoad: 'login-required'
                });
                setLogin(authenticated);
                setToken(client.token);
                if (client.token) sessionStorage.setItem('token', client.token);
            } catch (error) {
                console.log(error);
            }
        }
        runAuth();
    }, []);

    return { isLogin, token };
};

export default useAuth;
