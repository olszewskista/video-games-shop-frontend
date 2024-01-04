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

export function libraryLoader() {
    const token = getAuthToken()
    if (!token || token === 'EXPIRED') {
        return redirect('/login')
    }

    return token
}

export function profileLoader() {
    const token = getAuthToken()
    if (!token || token === 'EXPIRED') {
        return redirect('/login')
    }

    return token
}