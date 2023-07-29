const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const saltRounds = 10

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        maxLength: 20,
        minLength: 8,
        trim: true,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    },
    auth: {
        type: String,
        default: ''
    },
    token: {
        type: String
    },
    tokenExp: {
        type: Number
    }
});

// 비밀번호 암호화
userSchema.pre('save', function(next) {
    const user = this
    if (user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function(err, salt) {
            if (err) return next(err)
            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)
                user.password = hash
                next()
            })
        })
    }
})

const User = mongoose.model('User', userSchema)
module.exports = {User}