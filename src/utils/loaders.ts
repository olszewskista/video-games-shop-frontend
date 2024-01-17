import { redirect } from 'react-router-dom'
import {getAuthToken} from '../utils/auth'

export function tokenLoader() {
    return getAuthToken()
}

export function storeLoader() {
    const token = getAuthToken()
    if (!token || token === 'EXPIRED') {
        return redirect('/login')
    }

    return token
}

export async function libraryLoader() {
    const token = getAuthToken()
    if (!token || token === 'EXPIRED') {
        return redirect('/login')
    }

    try {
        const response = await fetch('http://localhost:3000/user/library', {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        })
        const resData = await response.json()
        console.log(resData)
        return resData
    } catch (error) {
        console.log(error)
    }

    return []
}

export function profileLoader() {
    const token = getAuthToken()
    if (!token || token === 'EXPIRED') {
        return redirect('/login')
    }

    return token
}

export async function adminLoader() {
    const token = getAuthToken()
    if (!token || token === 'EXPIRED') {
        return redirect('/login')
    }

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