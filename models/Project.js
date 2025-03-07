const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    project: {
        type: String,
        required: [true, 'Project name is required'],
        maxLength: 50
    },
    dueDate: {
        type: Date,
        required: [true, 'Due date is required']
    },
    description: {
        type: String,
        required: [true, 'Please add a description']
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Project owner is required']
    },
    assignedTo: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: [true, 'Project assignee is required']
    },
    status: {
        type: String,
        enum: ['open', 'closed'],
        default: 'open'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Project', ProjectSchema);