const Job = require('../models/Job');

class JobService {
    async createJob(companyId, jobData) {
        const job = new Job({
            ...jobData,
            companyId
        });
        return await job.save();
    }

    async getCompanyJobs(companyId) {
        return await Job.find({ companyId }).sort({ createdAt: -1 });
    }

    async updateJob(jobId, companyId, updates) {
        return await Job.findOneAndUpdate(
            { _id: jobId, companyId },
            updates,
            { new: true }
        );
    }

    async deleteJob(jobId, companyId) {
        return await Job.findOneAndDelete({ _id: jobId, companyId });
    }
}

module.exports = new JobService();
