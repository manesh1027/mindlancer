const jobService = require('../services/job.service');
const ApiResponse = require('../utils/response');
const Job = require('../models/Job');

exports.createJob = async (req, res) => {
    try {
        const job = await jobService.createJob(req.userData.userId, req.body);
        return ApiResponse.success(res, job, 'Job created successfully', 201);
    } catch (error) {
        return ApiResponse.error(res, error.message, 400);
    }
};

exports.getJobs = async (req, res) => {
    try {
        const companyId = req.userData.userId;
        const jobs = await Job.find({ companyId })
            .sort({ createdAt: -1 });
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateJob = async (req, res) => {
    try {
        const { id } = req.params;
        const companyId = req.userData.userId;
        
        const job = await Job.findOneAndUpdate(
            { _id: id, companyId },
            req.body,
            { new: true }
        );
        
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        
        res.json(job);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.deleteJob = async (req, res) => {
    try {
        const { id } = req.params;
        const companyId = req.userData.userId;
        
        const job = await Job.findOneAndDelete({ _id: id, companyId });
        
        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }
        
        res.json({ message: 'Job deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
