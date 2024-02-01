const jwt = require('jsonwebtoken')
const users = require('../data/users.js')

const verifyToken = (req, res, next) => {
    const header = req.header("authorization")

    if (!header) {
        return res.status(400).json({ message: 'Missing auth token' })
    }

    const [_, token] = header.split(" ")

    const verifiedToken = jwt.verify(token, 'secret')

    const foundUser = users.find(u => u.username === verifiedToken.username)
    // check if the user exists, skipping this for now
    delete foundUser.password

    req.user = foundUser
    
    next()
}

const verifyAdminRole = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    if (req.user.role !== 'ADMIN') {
        return res.status(403).json({ message: 'Forbidden' })
    }

    next()
}

module.exports = {
    verifyToken,
    verifyAdminRole
}