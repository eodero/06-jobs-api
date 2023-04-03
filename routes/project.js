const express = require('express');
const router = express.Router();

const { getAllProjects, getProject, createProject, updateProject, deleteProject } = require('../controllers/project')

router.route('/').get(getAllProjects).post(createProject)
router.route('/:id').get(getProject).patch(updateProject).delete(deleteProject)

module.exports = router
  

// app.post('/tasks/:id', function(req, res) {
//   var taskId = req.params.id;
//   var assignedTo = req.body.assignedTo;
//   db.collection('tasks').updateOne(
//     { _id: ObjectId(taskId) },
//     { $set: { assignedTo: ObjectId(assignedTo) } },
//     function(err, result) {
//       if (err) throw err;
//       res.redirect('/');
//     }
//   );
// });