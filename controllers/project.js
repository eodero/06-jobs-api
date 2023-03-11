const Project = require('../models/Project')
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFound } = require('../errors');

const getAllProjects = async (req, res) => {
    res.send('get all projects');
}

const getProject = async (req, res) => {
    res.send('get project');
}

const createProject = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const project = await Project.create(req.body);
    res.status(StatusCodes.CREATED).json({ project });
    res.json(req.body)
}

const updateProject = async (req, res) => {
    res.send('update project');
}

const deleteProject = async (req, res) => {
    res.send('delete project');
}

module.exports = {
    getAllProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject
}