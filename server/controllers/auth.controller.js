const { MongoErrorLabel } = require('mongodb')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

exports.postLogin = (req, res, next) => {
    const username = req.body.username
    const password = req.body.password

    User.findOne({ username: username }).then(user => {
        if (!user) {
            return res.status(400).json({ error: "User doesn't exist" });
        }
        bcrypt.compare(password, user.password)
            .then(doMatch => {
                if (doMatch) {
                    return res.status(200).json({
                        _id: user._id,
                        username: user.username,
                        avatar: user.avatar
                    })
                }
                res.status(400).json({ error: " Username or password Not Matched" });
            }).catch(err => {
                console.log(MongoErrorLabel);
            })
    }).catch(err => console.log(err));
}
exports.postLogout = (req, res, next) => {
    res.status(200).json({ message: "Logged out successfully" })
};

exports.postSignup = (req, res, next) => {
    const fullname = req.body.fullname
    const username = req.body.username
    const password = req.body.password
    const confirmPassword = req.body.confirmPassword
    const gender = req.body.gender

    if (password !== confirmPassword) {
        return res.status(400).json({ error: "Passwords don't match" });
    }
    User.findOne({ username }).then(userDoc => {
        if (userDoc) {
            return res.status(400).json({ error: "Username already exists" });
        }
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`

        return bcrypt.hash(password, 12).then(hashedPassword => {
            const user = new User({
                fullname,
                username,
                password: hashedPassword,
                gender,
                avatar: gender === "male" ? boyProfilePic : girlProfilePic
            });
            return user.save()
        }).then((user) => {
            res.status(201).json({
                _id: user._id,
                fullname: user.fullname,
                username: user.username,
                avatar: user.avatar
            })
        })
    }).catch(err => {
        console.log(err)
    });
}


