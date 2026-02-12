const SuccessResponse = require('../core/success')
const catchAsync = require('../middlewares/catchAsync')
const profileService = require('../services/profile.service')

class ProfileController {
    getAllProfiles = catchAsync(async (req, res, next) => {
        const result = await profileService.getAllProfiles()

        return SuccessResponse.ok(res, 'Lấy thông tin người dùng thành công', result)
    })
    getProfileById = catchAsync(async (req, res, next) => {
        const result = await profileService.getProfileById(req)

        return SuccessResponse.ok(res, 'Lấy thông tin người dùng thành công', result)
    })

    getProfileByUsername = catchAsync(async (req, res, next) => {
        const { username } = req.params
        const result = await profileService.getProfileByUsername(username)

        return SuccessResponse.ok(res, 'Lấy thông tin người dùng thành công', result)
    })

    updateProfile = catchAsync(async (req, res, next) => {
        const result = await profileService.updateProfile(req)

        return SuccessResponse.ok(res, 'Cập nhật thông tin người dùng thành công', result)
    })
}

module.exports = new ProfileController()
