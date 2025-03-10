const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    industry: { type: String, required: true },
    description: String,
    website: String,
    isVerified: { type: Boolean, default: false },
    verificationDocuments: {
        businessRegistration: String,
        taxId: String
    },
    hiringNeeds: String,
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Company', companySchema);
