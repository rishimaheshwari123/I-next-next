const domainModel = require("../models/domainModel");
const mailSender = require("../utils/mailSenderr");

const createDomainInquiry = async (req, res) => {
    try {
        const { name, email, phone, address, domain, years } = req.body;

        // Validation
        if (!name || !email || !phone || !address || !domain || !years) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields"
            });
        }

        // Create domain inquiry
        const domainInquiry = await domainModel.create({
            name,
            email,
            phone,
            address,
            domain,
            years: parseInt(years)
        });

        // Send notification email to admin
        const adminEmail = "rishimaheshwari040@gmail.com";
        
        try {
            await mailSender(
                adminEmail,
                "New Domain Booking Inquiry - I Next ETS",
                `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f9fafb; padding: 20px;">
                    <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
                        <h1 style="color: white; margin: 0; font-size: 28px;">🌐 New Domain Inquiry</h1>
                        <p style="color: #e0e7ff; margin: 10px 0 0 0;">A new user wants to book a domain</p>
                    </div>
                    
                    <div style="background-color: white; padding: 30px; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                        <h2 style="color: #1f2937; margin-top: 0; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Customer Details</h2>
                        
                        <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
                            <tr>
                                <td style="padding: 12px; background-color: #f3f4f6; font-weight: bold; color: #374151; width: 40%; border-radius: 5px 0 0 0;">👤 Name:</td>
                                <td style="padding: 12px; background-color: #ffffff; color: #1f2937; border-left: 3px solid #667eea;">${name}</td>
                            </tr>
                            <tr>
                                <td style="padding: 12px; background-color: #f3f4f6; font-weight: bold; color: #374151;">📧 Email:</td>
                                <td style="padding: 12px; background-color: #ffffff; color: #1f2937; border-left: 3px solid #667eea;">
                                    <a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 12px; background-color: #f3f4f6; font-weight: bold; color: #374151;">📱 Phone:</td>
                                <td style="padding: 12px; background-color: #ffffff; color: #1f2937; border-left: 3px solid #667eea;">
                                    <a href="tel:${phone}" style="color: #667eea; text-decoration: none;">${phone}</a>
                                </td>
                            </tr>
                            <tr>
                                <td style="padding: 12px; background-color: #f3f4f6; font-weight: bold; color: #374151;">📍 Address:</td>
                                <td style="padding: 12px; background-color: #ffffff; color: #1f2937; border-left: 3px solid #667eea;">${address}</td>
                            </tr>
                        </table>

                        <h2 style="color: #1f2937; margin-top: 30px; border-bottom: 2px solid #667eea; padding-bottom: 10px;">Domain Information</h2>
                        
                        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px; margin: 20px 0;">
                            <table style="width: 100%;">
                                <tr>
                                    <td style="padding: 10px; color: white; font-weight: bold; font-size: 16px;">🌐 Domain Name:</td>
                                    <td style="padding: 10px; color: white; font-size: 18px; text-align: right; font-weight: bold;">${domain}</td>
                                </tr>
                                <tr>
                                    <td style="padding: 10px; color: #e0e7ff; font-weight: bold;">⏱️ Registration Period:</td>
                                    <td style="padding: 10px; color: #e0e7ff; text-align: right; font-size: 16px;">${years} Year${years > 1 ? 's' : ''}</td>
                                </tr>
                            </table>
                        </div>

                        <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 5px; margin: 20px 0;">
                            <p style="margin: 0; color: #92400e; font-weight: bold;">⚡ Action Required</p>
                            <p style="margin: 5px 0 0 0; color: #78350f;">Please contact the customer as soon as possible to discuss their domain requirements.</p>
                        </div>

                        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                            <p style="color: #6b7280; font-size: 14px; margin: 0;">Inquiry received on ${new Date(domainInquiry.createdAt).toLocaleString('en-IN', { 
                                dateStyle: 'full', 
                                timeStyle: 'short',
                                timeZone: 'Asia/Kolkata'
                            })}</p>
                        </div>
                    </div>
                    
                    <div style="text-align: center; margin-top: 20px; padding: 20px;">
                        <p style="color: #6b7280; font-size: 12px; margin: 0;">
                            This is an automated notification from I Next ETS Domain Booking System
                        </p>
                    </div>
                </div>
                `
            );
        } catch (emailError) {
            console.log("Email sending failed:", emailError);
        }

        return res.status(201).json({
            success: true,
            message: "Domain inquiry submitted successfully! We will contact you soon.",
            inquiry: domainInquiry
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in creating domain inquiry!"
        });
    }
};

const getAllDomainInquiries = async (req, res) => {
    try {
        const inquiries = await domainModel.find({}).sort({ createdAt: -1 });
        
        return res.status(200).json({
            success: true,
            totalInquiries: inquiries.length,
            inquiries
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in getting domain inquiries!"
        });
    }
};

const getSingleDomainInquiry = async (req, res) => {
    try {
        const { id } = req.params;
        const inquiry = await domainModel.findById(id);
        
        if (!inquiry) {
            return res.status(404).json({
                success: false,
                message: "Domain inquiry not found"
            });
        }
        
        return res.status(200).json({
            success: true,
            inquiry
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in getting domain inquiry!"
        });
    }
};

const updateDomainInquiryStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        if (!['pending', 'contacted', 'completed', 'cancelled'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status value"
            });
        }

        const inquiry = await domainModel.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!inquiry) {
            return res.status(404).json({
                success: false,
                message: "Domain inquiry not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Status updated successfully",
            inquiry
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in updating domain inquiry status!"
        });
    }
};

const deleteDomainInquiry = async (req, res) => {
    try {
        const { id } = req.params;
        await domainModel.findByIdAndDelete(id);
        
        return res.status(200).json({
            success: true,
            message: "Domain inquiry deleted successfully!"
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error in deleting domain inquiry!"
        });
    }
};

module.exports = {
    createDomainInquiry,
    getAllDomainInquiries,
    getSingleDomainInquiry,
    updateDomainInquiryStatus,
    deleteDomainInquiry
};
