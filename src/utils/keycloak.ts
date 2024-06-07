import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: import.meta.env.VITE_URL,
    realm: import.meta.env.VITE_REALM,
    clientId: import.meta.env.VITE_CLIENT_ID,
});

export default keycloak
