const path = require('path');
const fs = require('fs');
const { careerEmail } = require("../template/career");
const resumeSender = require("../utils/resumeSender");

const careerCtrl = async (req, res) => {
    let tempFilePath = null;
    try {
        const {
            name,
            email,
            contact,
            applicationFor,
            experienceType,
            totalExperience,
            currentCTC,
            noticePeriod,
            currentCompany,
            highestEducation,
            passoutYear,
            technologies
        } = req.body;

        const resumeFile = req.files ? req.files.resume : null;

        if (!email || !name || !contact || !resumeFile || !applicationFor) {
            return res.status(400).send({
                message: "Please provide all required fields including resume",
                success: false
            });
        }

        tempFilePath = resumeFile.tempFilePath;

        // Validate file type
        const allowedTypes = /pdf|doc|docx/;
        const extname = allowedTypes.test(path.extname(resumeFile.name).toLowerCase());
        const mimetype = allowedTypes.test(resumeFile.mimetype);

        if (!extname || !mimetype) {
            // Delete temp file if invalid type
            if (tempFilePath && fs.existsSync(tempFilePath)) {
                fs.unlinkSync(tempFilePath);
            }
            return res.status(400).send({
                message: 'Only PDF, DOC, and DOCX files are allowed',
                success: false
            });
        }

        // Validate file size (5MB limit)
        if (resumeFile.size > 5 * 1024 * 1024) {
            // Delete temp file if too large
            if (tempFilePath && fs.existsSync(tempFilePath)) {
                fs.unlinkSync(tempFilePath);
            }
            return res.status(400).send({
                message: 'File size must be less than 5MB',
                success: false
            });
        }

        // Parse technologies array safely
        let techArray = [];
        if (technologies) {
            try {
                techArray = JSON.parse(technologies);
            } catch (e) {
                if (Array.isArray(technologies)) {
                    techArray = technologies;
                } else if (typeof technologies === 'string') {
                    techArray = technologies.split(',').map(t => t.trim()).filter(Boolean);
                }
            }
        }

        // Send email with resume attachment (from tempFilePath or reading it)
        await resumeSender(
            'info.inextets@gmail.com',
            // 'rishimaheshwari040@gmail.com',

            "New Career Application - I Next ETS",
            careerEmail(
                name,
                email,
                contact,
                applicationFor,
                resumeFile,
                totalExperience,
                currentCTC,
                noticePeriod,
                currentCompany,
                highestEducation,
                passoutYear,
                experienceType,
                techArray
            ),
            [{
                filename: resumeFile.name,
                path: resumeFile.tempFilePath // Let nodemailer read it from disk
            }]
        );

        // Delete temporary file after sending email successfully
        if (tempFilePath && fs.existsSync(tempFilePath)) {
            try {
                fs.unlinkSync(tempFilePath);
            } catch (err) {
                console.error("Error deleting temp file:", err);
            }
        }

        res.status(200).send({
            message: "Application submitted successfully! Our team will contact you soon.",
            success: true
        });
    } catch (error) {
        console.error("Error sending career application email:", error);

        // Clean up temp file on error
        if (tempFilePath && fs.existsSync(tempFilePath)) {
            try {
                fs.unlinkSync(tempFilePath);
            } catch (err) {
                console.error("Error deleting temp file on error:", err);
            }
        }

        res.status(500).send({
            message: "Error submitting application. Please try again.",
            success: false,
            error: error.message
        });
    }
};

module.exports = { careerCtrl };

