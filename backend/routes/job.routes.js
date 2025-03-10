const express = require('express');
const router = express.Router();
const jobController = require('../controllers/job.controller');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.post('/', jobController.createJob);
router.get('/', jobController.getJobs);
router.put('/:id', jobController.updateJob);
router.delete('/:id', jobController.deleteJob);

module.exports = router;
