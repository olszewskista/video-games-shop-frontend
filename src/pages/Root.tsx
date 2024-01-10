import { Outlet, useLoaderData } from "react-router-dom";
import MainNavigation from "../components/MainNavigation";
import { useUser } from "../context/UserProvider";
import { useEffect } from "react";

export default function RootLayout() {
    const { dispatch } = useUser();
    const token = useLoaderData();
    useEffect(() => {
        async function fetchUser() {
            if (!token || token === 'EXPIRED') return
            try {
                const response = await fetch('http://localhost:3000/user', {
                    method: 'get',
                    headers: {
                        'Authorization': 'Bearer ' + sessionStorage.getItem('token'),
                    },
                })
                const resData = await response.json();
                dispatch({ type: 'LOGIN', payload: resData })
            } catch (error) {
                console.log(error)
            }
        }
        fetchUser()
    }, [token, dispatch])

    return <>
        <MainNavigation />
        <main>
            <Outlet />
        </main>
    </>
}