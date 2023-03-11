const User = require('../models/user');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const register = async (req, res) => {
    const user = await User.create({ ...req.body });
    const token = user.createJWT();

    // res.status(StatusCodes.CREATED).json({ user });
    res.status(StatusCodes.CREATED).json({ user: { name: user.name }, token });
}

const login = async (req, res) => {
    // res.send('login user');
    const { email, password } = req.body;
    if (!email || !password) {
        throw new BadRequestError('Please provide email and password');
    }
    const user = await User.findOne({ email });

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new UnauthenticatedError('Invalid email or password');
    }
    //compare password
    if (!user) {
        throw new UnauthenticatedError('User not found');
    }
    const token = user.createJWT();
    res.status(StatusCodes.OK).json({ user: { name: user.name }, token });
}

const logout = async (req, res) => {
    res.send('logout user');
}

module.exports = {
    register,
    login,
    logout
}
