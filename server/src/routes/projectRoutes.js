const express = require('express');
const router = express.Router();
const projectController = require('../controllers/projectController');
const verifyToken = require('../middlewares/verifyToken');

router.get('/', verifyToken, projectController.getProjects);
router.get('/:id', verifyToken, projectController.getProjectById);
router.post('/', verifyToken, projectController.createProject);
router.get('/all', verifyToken, projectController.getAllProjectsForGuru);

module.exports = router;