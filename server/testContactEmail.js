const axios = require('axios');

// Dummy contact form data
const dummyContactData = {
    // Basic Information
    contactPersonName: "Rishi Maheshwari",
    companyName: "Test Company Pvt Ltd",
    email: "rishimaheshwari040@gmail.com",
    phone: "9009594537",
    
    // Services
    servicesInterested: [
        "Website Development",
        "Social Media Marketing",
        "Digital Marketing"
    ],
    otherServicesSpecify: "",
    
    // Website Development Specific
    websiteType: "E-commerce",
    websiteVision: "Modern online store with payment integration",
    websitePages: "10-15 pages",
    brandGuidelinesReady: "Some elements are ready",
    specificIntegrations: "Payment Gateway, CRM, Email Marketing",
    preferredCMS: "WordPress with WooCommerce",
    primaryCTA: "Buy Now",
    websitePurpose: "Sell products online and increase brand visibility",
    existingWebsite: "Outdated website",
    ongoingMaintenance: [
        "Content updates",
        "Security monitoring and updates",
        "Performance optimization"
    ],
    
    // Social Media Marketing Specific
    socialMediaPlatforms: ["Facebook", "Instagram", "LinkedIn"],
    socialMediaGoals: "Increase brand awareness and generate leads",
    postingFrequency: "Multiple times a week",
    targetDemographic: "Age 25-45, Urban professionals, Tech-savvy",
    contentType: [
        "Promotional offers/product launches",
        "Educational content/tips",
        "Customer testimonials/case studies"
    ],
    
    // Digital Marketing/SEO Specific
    currentChallenges: "Low website traffic and poor search rankings",
    kpisImportant: [
        "Website traffic",
        "Lead conversions",
        "Search engine rankings"
    ],
    competitorsAdmire: "Amazon, Flipkart",
    uniqueSellingProposition: "Premium quality products at affordable prices with 24/7 customer support",
    geographicTarget: "National",
    
    // Project Details
    budgetRange: "₹2,00,000 - ₹5,00,000",
    preferredStartDate: "2026-05-15",
    expectedTimeframe: "3-4 months",
    projectDeadline: "Specific deadline",
    urgencyRating: 4,
    
    // Importance & Preferences
    proposalImportance: 8,
    involvementLevel: 4,
    clarityRating: 4,
    
    // Additional Information
    targetAudience: "Young professionals and tech enthusiasts looking for quality products",
    visualStyle: "Modern, Clean, Professional with vibrant colors",
    designInspiration: "Apple.com, Nike.com - minimalist and user-friendly",
    preferredCommunication: [
        "Email",
        "Video Conference (e.g., Google Meet, Zoom)",
        "Project Management Tool (e.g., Asana, Trello)"
    ],
    existingMarketingMaterials: "Some elements are ready",
    expectedResults: "50% increase in website traffic, 30% increase in conversions within 6 months",
    digitalMarketingFamiliarity: "Moderately familiar",
    
    // Partnership Factors
    partnershipFactors: {
        transparentReporting: "Very Important",
        proactiveCommunication: "Very Important",
        dataDrivenStrategies: "Important",
        longTermPartnership: "Very Important"
    },
    
    // Source & Additional
    hearAboutUs: "Search Engine (Google, Bing, etc.)",
    additionalComments: "Looking forward to working with a professional team that understands our vision and can deliver quality results."
};

// Function to test contact form submission
async function testContactForm() {
    try {
        console.log('🚀 Starting contact form test...\n');
        console.log('📝 Submitting dummy contact data to: http://localhost:8080/api/v1/contact/contact\n');
        
        const response = await axios.post(
            'http://localhost:8080/api/v1/contact/contact',
            dummyContactData,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        console.log('✅ SUCCESS! Contact form submitted successfully\n');
        console.log('📧 Response:', response.data);
        console.log('\n📬 Check your email inbox for the admin notification!');
        console.log('📧 Email should be sent to: rishimaheshwari040@gmail.com\n');
        
    } catch (error) {
        console.error('❌ ERROR! Failed to submit contact form\n');
        
        if (error.response) {
            // Server responded with error
            console.error('Status:', error.response.status);
            console.error('Error Message:', error.response.data.message);
            console.error('Error Details:', error.response.data.error);
        } else if (error.request) {
            // Request made but no response
            console.error('No response from server. Is the server running on port 8080?');
            console.error('Run: cd server && npm start');
        } else {
            // Something else happened
            console.error('Error:', error.message);
        }
    }
}

// Run the test
console.log('═══════════════════════════════════════════════════════');
console.log('        CONTACT FORM EMAIL TEST SCRIPT');
console.log('═══════════════════════════════════════════════════════\n');

testContactForm();
