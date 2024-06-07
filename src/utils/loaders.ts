import { redirect } from 'react-router-dom'
import {getAuthToken} from '../utils/auth'
import keycloak from './keycloak'

export async function tokenLoader() {
    const token = await new Promise((res) => {
        setTimeout(() => {
            res(keycloak.token)
        }, 500);
    })
    console.log(token)
    return token
    // return getAuthToken()
}

export async function libraryLoader() {
    const token = getAuthToken()
    if (!keycloak.token || token === 'EXPIRED') {
        return redirect('/login')
    }

    try {
        const response = await fetch('http://localhost:3000/user/library', {
            headers: {
                'Authorization': 'Bearer ' + keycloak.token,
            }
        })
        const resData = await response.json()
        return resData
    } catch (error) {
        console.log(error)
    }

    return []
}

export function authLoader() {
    const token = getAuthToken()
    // console.log(token)
    if (!keycloak.token || token === 'EXPIRED') {
        return redirect('/login')
    }

    return token
}

export async function adminLoader() {
    const token = await new Promise((res) => {
        setTimeout(() => {
            res(keycloak.token)
        }, 200);
    })
    console.log(token)

    try {
        const response = await fetch('http://localhost:3000/auth/admin', {
            headers: {
                Authorization: 'Bearer ' + token,
            }
        })
        if (!response.ok) {
            throw new Error('Unauthorized')
        }
    } catch (error) {
        return redirect('..')
    }

    return token
}