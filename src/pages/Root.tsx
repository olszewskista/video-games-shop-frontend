import { Outlet, useLoaderData } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import { useUser } from "../context/UserProvider";
import { useEffect } from "react";
import { useKeycloak } from "@react-keycloak/web";

export default function RootLayout() {
    const { dispatch } = useUser();
    const token = useLoaderData();
    const {keycloak} = useKeycloak()
    console.log(keycloak.token)
    useEffect(() => {
        async function fetchUser() {
            // if (!keycloak.token || token === 'EXPIRED') return
            if (!keycloak.token) return
            console.log("df")
            try {
                const response = await fetch('http://localhost:3000/user', {
                    method: 'get',
                    headers: {
                        'Authorization': 'Bearer ' + keycloak.token,
                    },
                })
                const resData = await response.json();
                console.log(resData)
                dispatch({ type: 'LOGIN', payload: resData})
            } catch (error) {
                console.log(error)
            }
        }
        fetchUser()
    }, [token, dispatch, keycloak])

    return <>
        <MainNavigation />
        <main>
            <Outlet />
        </main>
    </>
}