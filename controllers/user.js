const User  = require('../models/User')
const { StatusCodes } = require('http-status-codes');

const getAllUsers = async (req, res) => {
    const users = await User.find().sort('name')
    res.status(StatusCodes.OK).json({ users, count: users.length })
}

module.exports = getAllUsers