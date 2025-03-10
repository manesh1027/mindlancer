const express = require('express');
const router = express.Router();
const clientController = require('../controllers/client.controller');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

router.get('/dashboard-stats', clientController.getDashboardStats);
router.get('/job-activity', clientController.getJobActivity);
router.put('/company-profile', clientController.updateCompanyProfile);
router.post('/submit-verification', clientController.submitVerification);

module.exports = router;
