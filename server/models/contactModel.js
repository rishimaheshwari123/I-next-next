const mongoose = require("mongoose")

const contactSchema = new mongoose.Schema(
    {
        // Basic Information
        contactPersonName: {
            type: String,
            required: true,
            trim: true,
        },
        companyName: {
            type: String,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true,
        },
        phone: {
            type: String,
            required: true,
            trim: true,
        },

        // Services
        servicesInterested: {
            type: [String],
            required: true,
            enum: [
                'Social Media Marketing',
                'Digital Marketing',
                'Lead Generation',
                'Business Growth Package',
                'Website Development',
                'Mobile App Development',
                'AI (Artificial Intelligence)',
                'Cyber Security',
                'Other'
            ]
        },
        otherServicesSpecify: {
            type: String,
            trim: true,
        },

        // Website Development Specific
        websiteType: {
            type: String,
            trim: true,
        },
        websiteVision: {
            type: String,
            trim: true,
        },
        websitePages: {
            type: String,
            trim: true,
        },
        brandGuidelinesReady: {
            type: String,
            enum: ['Yes, all ready', 'Some elements are ready', 'No, need assistance with this', ''],
        },
        specificIntegrations: {
            type: String,
            trim: true,
        },
        preferredCMS: {
            type: String,
            trim: true,
        },
        primaryCTA: {
            type: String,
            trim: true,
        },
        websitePurpose: {
            type: String,
            trim: true,
        },
        existingWebsite: {
            type: String,
            enum: ['No website', 'Outdated website', 'Basic website needing improvement', 'Modern website needing specific updates', ''],
        },
        ongoingMaintenance: {
            type: [String],
            enum: [
                'Content updates',
                'Security monitoring and updates',
                'Technical support and troubleshooting',
                'Performance optimization',
                'Backup and recovery',
                'None/Not sure'
            ]
        },

        // Social Media Marketing Specific
        socialMediaPlatforms: {
            type: [String],
            enum: ['Facebook', 'Instagram', 'LinkedIn', 'Twitter (X)', 'YouTube', 'TikTok', 'Pinterest', 'Other']
        },
        socialMediaGoals: {
            type: String,
            trim: true,
        },
        postingFrequency: {
            type: String,
            enum: ['Daily', 'Multiple times a week', 'Weekly', 'Bi-weekly', 'Monthly', ''],
        },
        targetDemographic: {
            type: String,
            trim: true,
        },
        contentType: {
            type: [String],
            enum: [
                'Promotional offers/product launches',
                'Behind-the-scenes glimpses',
                'Educational content/tips',
                'Customer testimonials/case studies',
                'Interactive polls/questions',
                'User-generated content',
                'News and industry updates'
            ]
        },

        // Digital Marketing/SEO Specific
        currentChallenges: {
            type: String,
            trim: true,
        },
        kpisImportant: {
            type: [String],
            enum: [
                'Website traffic',
                'Lead conversions',
                'Sales revenue',
                'Brand mentions/awareness',
                'Return on ad spend (ROAS)',
                'Search engine rankings',
                'Social media engagement'
            ]
        },
        competitorsAdmire: {
            type: String,
            trim: true,
        },
        uniqueSellingProposition: {
            type: String,
            trim: true,
        },
        geographicTarget: {
            type: String,
            enum: ['Local (e.g., city, region)', 'National', 'International', 'Not applicable', ''],
        },

        // Project Details
        budgetRange: {
            type: String,
            trim: true,
        },
        preferredStartDate: {
            type: Date,
        },
        expectedTimeframe: {
            type: String,
            trim: true,
        },
        projectDeadline: {
            type: String,
            enum: ['Specific deadline', 'Flexible timeframe', ''],
        },
        urgencyRating: {
            type: Number,
            min: 1,
            max: 5,
        },

        // Importance & Preferences
        proposalImportance: {
            type: Number,
            min: 1,
            max: 10,
        },
        involvementLevel: {
            type: Number,
            min: 1,
            max: 5,
        },
        clarityRating: {
            type: Number,
            min: 1,
            max: 5,
        },

        // Additional Information
        targetAudience: {
            type: String,
            trim: true,
        },
        visualStyle: {
            type: String,
            trim: true,
        },
        designInspiration: {
            type: String,
            trim: true,
        },
        preferredCommunication: {
            type: [String],
            enum: [
                'Email',
                'Phone Call',
                'Video Conference (e.g., Google Meet, Zoom)',
                'Project Management Tool (e.g., Asana, Trello)',
                'Chat Application (e.g., Slack, Microsoft Teams)'
            ]
        },
        existingMarketingMaterials: {
            type: String,
            enum: ['Yes, all ready', 'Some elements are ready', 'No, need assistance with this', ''],
        },
        expectedResults: {
            type: String,
            trim: true,
        },
        digitalMarketingFamiliarity: {
            type: String,
            enum: ['Not at all familiar', 'Slightly familiar', 'Moderately familiar', 'Very familiar', 'Expert', ''],
        },
        
        // Partnership Factors
        partnershipFactors: {
            transparentReporting: {
                type: String,
                enum: ['Very Important', 'Important', 'Less Important', ''],
            },
            proactiveCommunication: {
                type: String,
                enum: ['Very Important', 'Important', 'Less Important', ''],
            },
            dataDrivenStrategies: {
                type: String,
                enum: ['Very Important', 'Important', 'Less Important', ''],
            },
            longTermPartnership: {
                type: String,
                enum: ['Very Important', 'Important', 'Less Important', ''],
            },
        },

        // Source & Additional
        hearAboutUs: {
            type: String,
            enum: [
                'Search Engine (Google, Bing, etc.)',
                'Social Media',
                'Referral',
                'Online Advertisement',
                'Other'
            ],
        },
        additionalComments: {
            type: String,
            trim: true,
        },

        // Status
        status: {
            type: String,
            enum: ['new', 'in-progress', 'completed', 'archived'],
            default: 'new'
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Contact', contactSchema);

