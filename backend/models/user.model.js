const mongoose = require('mongoose')

const AchievementSchema = new mongoose.Schema(
    {
        year: {
            type: String,
            trim: true,
            max: 100,
        },
        event: {
            type: String,
            trim: true,
            max: 1000,
        },
        desc: {
            type: String,
            trim: true,
            max: 1000,
        },
    },
    { timestamps: false }
)

const ProjectSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            min: 3,
            max: 500,
        },
        desc: {
            type: String,
            trim: true,
            max: 1000,
        },
        link: {
            type: String,
            trim: true,
            max: 200,
        },
        imageUrl: {
            type: String,
            trim: true,
            max: 200,
        },
    },
    { timestamps: false }
)

const UserSchema = new mongoose.Schema(
    {
        displayName: {
            type: String,
            required: true,
            trim: true,
            min: 3,
            max: 20,
        },
        username: {
            type: String,
            required: true,
            trim: true,
            min: 3,
            max: 50,
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        avatar: {
            type: String,
            max: 500,
            trim: true,
            default: 'https://plus.unsplash.com/premium_photo-1739178656495-8109a8bc4f53?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        },
        quote: {
            type: String,
            max: 500,
            trim: true,
            default: '',
        },
        position: {
            type: String,
            max: 500,
            trim: true,
            default: 'Frontend Developer',
        },
        desc: {
            type: String,
            max: 1000,
            trim: true,
            default: '',
        },
        project: [ProjectSchema],
        aboutMe: {
            type: String,
            max: 1000,
            trim: true,
            default: '',
        },
        classData: {
            numberOfClassesTaught: {
                type: String,
            },
            totalStudents: {
                type: String,
            },
            expTeachingYears: {
                type: String,
            },
        },
        achievements: [AchievementSchema],
        socialLinks: {
            linkedin: {
                type: String,
                max: 500,
                default: '',
            },
            github: {
                type: String,
                max: 500,
                default: '',
            },
            facebook: {
                type: String,
                max: 500,
                default: '',
            },
        },
        password: {
            type: String,
            min: 6,
            max: 150,
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user',
        },
    },
    { timestamps: true }
)

module.exports = { UserModel: mongoose.model('UserModel', UserSchema) }
