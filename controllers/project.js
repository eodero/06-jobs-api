const Project = require('../models/Project')
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const getAllProjects = async (req, res) => {
    //find projects associated with user
    const projects = await Project.find({
        createdBy: req.user.userId
    }).sort('createdAt')
    res.status(StatusCodes.OK).json({ projects, count: projects.length })
}

const getProject = async (req, res) => {

    const { user: { userId }, params: { id: projectId } } = req

    const project = await Project.findOne({ _id: projectId, createdBy: userId })

    if (!project) {
        throw new NotFoundError(`No project with id ${projectId}`)
    }
    res.status(StatusCodes.OK).json({ project })
}

const createProject = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const project = await Project.create( req.body );
    res.status(StatusCodes.CREATED).json({ project });
}

const updateProject = async (req, res) => {
    // res.send('update project');
    const { body: { task, dueDate, assignedTo, description }, user: { userId }, params: { id: projectId } } = req

    if (task === '' || dueDate === '' || assignedTo === '' || description === '') {
        throw new BadRequestError('All fields must be provided')
    }

    const project = await Project.findByIdAndUpdate({ _id: projectId, createdBy: userId }, req.body, { new: true, runValidators: true })

    if (!project) {
        throw new NotFoundError(`No project with id ${projectId}`)
    }
    res.status(StatusCodes.OK).json({ project })
}

const deleteProject = async (req, res) => {
    const { user: { userId }, params: { id: projectId } } = req

    const project = await Project.findByIdAndRemove({
        _id: projectId,
        createdBy: userId
    })
    if (!project) {
        throw new NotFoundError(`No project with id ${projectId}`)
    }
    res.status(StatusCodes.OK).json({msg: "The entry was deleted"});
}

module.exports = {
    getAllProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject
}