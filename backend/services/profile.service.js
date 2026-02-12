const { UserModel } = require('../models/user.model')
const ErrorResponse = require('../core/error')
const { uploadToCloudinary } = require('../utils/cloudinary')

class ProfileService {
    async getAllProfiles() {
        const profiles = await UserModel.find().select('-password').lean()
        return profiles
    }

    async getProfileById(req) {
        const { id } = req.user
        const profile = await UserModel.findById(id).select('-password').lean()

        if (!profile) {
            throw new ErrorResponse('Không tìm thấy người dùng', 404)
        }

        return profile
    }

    async getProfileByUsername(username) {
        const profile = await UserModel.findOne({ username }).select('-password').lean()

        if (!profile) {
            throw new ErrorResponse('Không tìm thấy người dùng', 404)
        }

        return profile
    }

    async updateProfile(req) {
        const userId = req.user.id
        const { displayName, quote, position, desc, project, aboutMe, classData, achievements, socialLinks, avatar } = req.body
        const profile = await UserModel.findById(userId)
        if (!profile) {
            throw new ErrorResponse('Không tìm thấy người dùng', 404)
        }

        const username = profile.username // Lấy username để đặt tên file

        // Xử lý upload avatar nếu có file
        if (req.files && req.files.avatar) {
            const avatarFile = req.files.avatar[0]
            // Upload avatar với tên file = username
            const publicId = username // VD: trongandev
            const avatarUrl = await uploadToCloudinary(avatarFile.buffer, publicId, 'mindx-teaching/avatars')
            profile.avatar = avatarUrl
        } else if (avatar && avatar !== profile.avatar) {
            // Nếu avatar là URL mới (paste URL) - không xử lý delete vì không phải từ cloudinary
            profile.avatar = avatar
        }
        // Xử lý upload ảnh cho projects
        if (project) {
            const updatedProjects = []
            const parseProject = typeof project === 'string' ? JSON.parse(project) : project
            for (let i = 0; i < parseProject.length; i++) {
                const proj = typeof parseProject[i] === 'string' ? JSON.parse(parseProject[i]) : parseProject[i]
                const updatedProj = { ...proj }

                // Kiểm tra nếu có file upload cho project này
                if (req.files && req.files[`project_${i}`]) {
                    const projectImageFile = req.files[`project_${i}`][0]

                    // Upload ảnh với tên file = username-project-index
                    const publicId = `${username}-project-${i}` // VD: trongandev-project-0
                    const imageUrl = await uploadToCloudinary(projectImageFile.buffer, publicId, 'mindx-teaching/projects')
                    updatedProj.imageUrl = imageUrl
                } else if (proj.imageUrl) {
                    // Giữ nguyên URL nếu không có file mới
                    updatedProj.imageUrl = proj.imageUrl
                }

                updatedProjects.push(updatedProj)
            }
            profile.project = updatedProjects
        }

        // Cập nhật các trường khác
        if (displayName !== undefined) profile.displayName = displayName
        if (quote !== undefined) profile.quote = quote
        if (position !== undefined) profile.position = position
        if (desc !== undefined) profile.desc = desc
        if (aboutMe !== undefined) profile.aboutMe = aboutMe
        if (classData !== undefined) {
            profile.classData = typeof classData === 'string' ? JSON.parse(classData) : classData
        }
        if (achievements !== undefined) {
            profile.achievements = typeof achievements === 'string' ? JSON.parse(achievements) : achievements
        }
        if (socialLinks !== undefined) {
            profile.socialLinks = typeof socialLinks === 'string' ? JSON.parse(socialLinks) : socialLinks
        }
        await profile.save()
        delete profile.password
        return profile
    }
}

module.exports = new ProfileService()
