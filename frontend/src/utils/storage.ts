// const EXPIRATION_TIME_REFRESH = 3600 * 1000 * 24 * 7 // 7 days
// const EXPIRATION_TIME_ACCESS = 3600 * 1000 * 24 * 1 // 1 days

const EXPIRATION_TIME_REFRESH = 1000 * 20 // 20s
const EXPIRATION_TIME_ACCESS = 10 * 1000 // 10s

export const storage = {
    // Sử dụng sessionStorage cho accessToken (tự động xóa khi đóng tab)

    getCookieToken: (key: string) => {
        const match = document.cookie.match(new RegExp("(^| )" + key + "=([^;]+)"))
        if (match) {
            return match[2]
        }
        return null
    },
    setAccessToken: (token: string) => {
        document.cookie = `accessToken=${token}; path=/;expires=${new Date(Date.now() + EXPIRATION_TIME_ACCESS).toUTCString()}`
    },
    setCookieToken: (token: { accessToken: string; refreshToken: string }) => {
        document.cookie = `accessToken=${token.accessToken}; path=/;expires=${new Date(Date.now() + EXPIRATION_TIME_ACCESS).toUTCString()}`
        document.cookie = `refreshToken=${token.refreshToken}; path=/;expires=${new Date(Date.now() + EXPIRATION_TIME_REFRESH).toUTCString()}`
    },
    removeAllToken: () => {
        // Remove all tokens by setting them to expired
        document.cookie = "accessToken=; Max-Age=0; path=/;"
        document.cookie = "refreshToken=; Max-Age=0; path=/;"
    },
}
