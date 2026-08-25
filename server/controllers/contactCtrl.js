const { contactUsEmail } = require("../template/contactFormRes");
const mailSender = require("../utils/mailSenderr");
const Contact = require("../models/contactModel");

const contactCtrl = async (req, res) => {
    try {
        // Destructure all fields from req.body
        const {
            // Basic Information
            contactPersonName,
            companyName,
            email,
            phone,

            // Services
            servicesInterested,
            otherServicesSpecify,

            // Website Development Specific
            websiteType,
            websiteVision,
            websitePages,
            brandGuidelinesReady,
            specificIntegrations,
            preferredCMS,
            primaryCTA,
            websitePurpose,
            existingWebsite,
            ongoingMaintenance,

            // Social Media Marketing Specific
            socialMediaPlatforms,
            socialMediaGoals,
            postingFrequency,
            targetDemographic,
            contentType,

            // Digital Marketing/SEO Specific
            currentChallenges,
            kpisImportant,
            competitorsAdmire,
            uniqueSellingProposition,
            geographicTarget,

            // Project Details
            budgetRange,
            preferredStartDate,
            expectedTimeframe,
            projectDeadline,
            urgencyRating,

            // Importance & Preferences
            proposalImportance,
            involvementLevel,
            clarityRating,

            // Additional Information
            targetAudience,
            visualStyle,
            designInspiration,
            preferredCommunication,
            existingMarketingMaterials,
            expectedResults,
            digitalMarketingFamiliarity,

            // Partnership Factors
            partnershipFactors,

            // Source & Additional
            hearAboutUs,
            additionalComments,

            // Status
            status
        } = req.body;

        // Validate required fields
        if (!contactPersonName || !email || !phone || !servicesInterested) {
            return res.status(400).send({
                message: "Please provide all required fields (Name, Email, Phone, Services)",
                success: false
            });
        }

        // Create contact data object with only defined fields
        const contactData = {
            // Basic Information
            contactPersonName,
            companyName,
            email,
            phone,

            // Services
            servicesInterested,
            otherServicesSpecify,

            // Website Development Specific
            websiteType,
            websiteVision,
            websitePages,
            brandGuidelinesReady,
            specificIntegrations,
            preferredCMS,
            primaryCTA,
            websitePurpose,
            existingWebsite,
            ongoingMaintenance,

            // Social Media Marketing Specific
            socialMediaPlatforms,
            socialMediaGoals,
            postingFrequency,
            targetDemographic,
            contentType,

            // Digital Marketing/SEO Specific
            currentChallenges,
            kpisImportant,
            competitorsAdmire,
            uniqueSellingProposition,
            geographicTarget,

            // Project Details
            budgetRange,
            preferredStartDate,
            expectedTimeframe,
            projectDeadline,
            urgencyRating,

            // Importance & Preferences
            proposalImportance,
            involvementLevel,
            clarityRating,

            // Additional Information
            targetAudience,
            visualStyle,
            designInspiration,
            preferredCommunication,
            existingMarketingMaterials,
            expectedResults,
            digitalMarketingFamiliarity,

            // Partnership Factors
            partnershipFactors,

            // Source & Additional
            hearAboutUs,
            additionalComments,

            // Status
            status
        };

        // Save to database
        const newContact = await Contact.create(contactData);

        // Send email to admin
        try {
            await mailSender(
                "info.inextets@gmail.com",
                // "rishimaheshwari040@gmail.com",
                "New Contact Form Submission - I Next ETS",
                contactUsEmail(contactData)
            );
        } catch (emailError) {
            console.error('Failed to send admin email:', emailError.message);
            // Don't fail the request if email fails - contact is already saved
        }

        res.status(200).send({
            message: "Thank you! Your inquiry has been submitted successfully. We'll contact you soon!",
            success: true,
            contactId: newContact._id
        });

    } catch (error) {
        console.error("Contact form error:", error);
        res.status(500).send({
            message: "Error submitting contact form. Please try again.",
            success: false,
            error: error.message
        });
    }
};

// Get all contacts (for admin/staff)
const getAllContacts = async (req, res) => {
    try {
        let query = {};
        
        // If the user is not a super admin (i.e. is an employee or a staff member), they can only see contacts assigned to them
        if (req.user && (req.user.role !== "admin" || req.user.isStaff)) {
            query.assignedTo = req.user.id;
        }

        const contacts = await Contact.find(query)
            .populate("assignedTo")
            .sort({ createdAt: -1 });

        res.status(200).send({
            success: true,
            contacts,
            total: contacts.length
        });
    } catch (error) {
        console.error("Error fetching contacts:", error);
        res.status(500).send({
            message: "Error fetching contacts",
            success: false
        });
    }
};

// Get single contact by ID
const getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id).populate("assignedTo");

        if (!contact) {
            return res.status(404).send({
                message: "Contact not found",
                success: false
            });
        }

        res.status(200).send({
            success: true,
            contact
        });
    } catch (error) {
        console.error("Error fetching contact:", error);
        res.status(500).send({
            message: "Error fetching contact",
            success: false
        });
    }
};

// Update contact status, assignment, and notes
const updateContactStatus = async (req, res) => {
    try {
        const { status, assignedTo, assignedToModel, noteText } = req.body;
        
        const updateData = {};
        if (status) updateData.status = status;
        if (assignedTo !== undefined) {
            updateData.assignedTo = assignedTo || null;
            updateData.assignedToModel = assignedToModel || null;
        }

        let contact;
        if (noteText) {
            contact = await Contact.findByIdAndUpdate(
                req.params.id,
                { 
                    $set: updateData,
                    $push: { 
                        notes: { 
                            text: noteText, 
                            addedBy: req.user?.name || req.user?.email || "Unknown" 
                        } 
                    } 
                },
                { new: true }
            ).populate("assignedTo");
        } else {
            contact = await Contact.findByIdAndUpdate(
                req.params.id,
                updateData,
                { new: true }
            ).populate("assignedTo");
        }

        if (!contact) {
            return res.status(404).send({
                message: "Contact not found",
                success: false
            });
        }

        res.status(200).send({
            success: true,
            message: "Contact updated successfully",
            contact
        });
    } catch (error) {
        console.error("Error updating contact:", error);
        res.status(500).send({
            message: "Error updating contact",
            success: false
        });
    }
};

// Delete contact
const deleteContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id);

        if (!contact) {
            return res.status(404).send({
                message: "Contact not found",
                success: false
            });
        }

        res.status(200).send({
            success: true,
            message: "Contact deleted successfully"
        });
    } catch (error) {
        console.error("Error deleting contact:", error);
        res.status(500).send({
            message: "Error deleting contact",
            success: false
        });
    }
};

module.exports = {
    contactCtrl,
    getAllContacts,
    getContactById,
    updateContactStatus,
    deleteContact
};