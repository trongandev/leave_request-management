type JwtPayload = {
    exp?: number
    iat?: number
    sub?: string
    [key: string]: unknown
}

function decodeBase64Url(value: string) {
    const normalizedValue = value.replace(/-/g, "+").replace(/_/g, "/")
    const paddedValue = normalizedValue.padEnd(Math.ceil(normalizedValue.length / 4) * 4, "=")
    return atob(paddedValue)
}

export function getJwtPayload(token: string): JwtPayload | null {
    try {
        const [, payload] = token.split(".")
        if (!payload) return null

        return JSON.parse(decodeBase64Url(payload)) as JwtPayload
    } catch {
        return null
    }
}

export function getJwtExpirationTime(token: string): number | null {
    const payload = getJwtPayload(token)
    if (!payload?.exp) return null

    return payload.exp * 1000
}

export function isJwtExpired(token: string, offsetMs = 0) {
    const expirationTime = getJwtExpirationTime(token)
    if (!expirationTime) return true

    return expirationTime <= Date.now() + offsetMs
}

export function hasValidJwt(token: string | null | undefined, offsetMs = 0) {
    if (!token) return false
    return !isJwtExpired(token, offsetMs)
}
