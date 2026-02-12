const AuthService = require('../services/auth.service')
const SuccessResponse = require('../core/success')
const catchAsync = require('../middlewares/catchAsync')

class AuthController {
    // [POST] /api/auth/login
    loginUser = catchAsync(async (req, res, next) => {
        const result = await AuthService.loginUser(req)

        res.cookie('cookie', result.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 15 * 60 * 1000 * 24, // 24 hours
            path: '/',
        })

        return SuccessResponse.ok(res, result.message, {
            user: result.user,
            accessToken: result.accessToken,
            refreshToken: result.refreshToken,
        })
    })
}

module.exports = new AuthController()
