export function getTokenDuration() {
    const storedExpirationDate = sessionStorage.getItem('expiration')
    const expirationDate = storedExpirationDate ? new Date(storedExpirationDate) : null
    const now = new Date()
    const duration = expirationDate ? expirationDate.getTime() - now.getTime() : 0
    return duration
}

export function getAuthToken() {
    const token = sessionStorage.getItem('token')

    if (!token) {
        return null
    }

    const tokenDuration = getTokenDuration()

    if (tokenDuration < 0) {
        return 'EXPIRED'
    }

    return token
}
