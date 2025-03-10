const Company = require('../models/Company');
const Job = require('../models/Job');

class ClientService {
    async getDashboardStats(userId) {
        const stats = {
            activeJobs: await Job.countDocuments({ 
                companyId: userId, 
                status: 'active' 
            }),
            completedJobs: await Job.countDocuments({ 
                companyId: userId, 
                status: 'completed' 
            }),
            totalSpent: await Job.aggregate([
                { $match: { companyId: userId, status: 'completed' } },
                { $group: { _id: null, total: { $sum: '$budgetMax' } } }
            ]),
            activeProposals: 0
        };
        return stats;
    }

    async updateCompanyProfile(userId, updates) {
        return await Company.findOneAndUpdate(
            { userId },
            { ...updates, updatedAt: Date.now() },
            { new: true, upsert: true }
        );
    }
}

module.exports = new ClientService();
