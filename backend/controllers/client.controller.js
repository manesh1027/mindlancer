const Company = require('../models/Company');
const Job = require('../models/Job');
const clientService = require('../services/client.service');
const ApiResponse = require('../utils/response');

exports.getDashboardStats = async (req, res) => {
    try {
        const stats = await clientService.getDashboardStats(req.userData.userId);
        return ApiResponse.success(res, stats);
    } catch (error) {
        return ApiResponse.error(res, error.message);
    }
};

exports.getJobActivity = async (req, res) => {
    try {
        const userId = req.userData.userId;
        const sixMonthsAgo = new Date();
        sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

        const jobActivity = await Job.aggregate([
            { 
                $match: { 
                    companyId: userId,
                    createdAt: { $gte: sixMonthsAgo }
                }
            },
            {
                $group: {
                    _id: { 
                        month: { $month: '$createdAt' },
                        year: { $year: '$createdAt' }
                    },
                    postedJobs: { $sum: 1 },
                    completedJobs: { 
                        $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] }
                    }
                }
            },
            { $sort: { '_id.year': 1, '_id.month': 1 } }
        ]);

        res.json(jobActivity);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateCompanyProfile = async (req, res) => {
    try {
        const userId = req.userData.userId;
        const updates = req.body;
        
        const company = await Company.findOneAndUpdate(
            { userId },
            { ...updates, updatedAt: Date.now() },
            { new: true, upsert: true }
        );

        res.json(company);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.submitVerification = async (req, res) => {
    try {
        const userId = req.userData.userId;
        const { businessRegistration, taxId } = req.body;

        const company = await Company.findOneAndUpdate(
            { userId },
            {
                'verificationDocuments.businessRegistration': businessRegistration,
                'verificationDocuments.taxId': taxId,
                updatedAt: Date.now()
            },
            { new: true }
        );

        res.json(company);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
