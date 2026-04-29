const multer = require('multer');
const path = require('path');
const { careerEmail } = require("../template/career");
const resumeSender = require("../utils/resumeSender");

// Configure multer for memory storage (no local save)
const storage = multer.memoryStorage();

const upload = multer({ 
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /pdf|doc|docx/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        
        if (extname && mimetype) {
            return cb(null, true);
        } else {
            cb(new Error('Only PDF, DOC, and DOCX files are allowed'));
        }
    }
});

const careerCtrl = async (req, res) => {
    upload.single('resume')(req, res, async (err) => {
        if (err) {
            return res.status(500).send({
                message: err.message || "Error uploading resume",
                success: false
            });
        }

        const { 
            name, 
            email, 
            contact, 
            applicationFor,
            totalExperience,
            currentCTC,
            expectedCTC,
            noticePeriod,
            currentCompany,
            highestEducation,
            passoutYear
        } = req.body;
        
        const resume = req.file;

        if (!email || !name || !contact || !resume || !applicationFor) {
            return res.status(400).send({
                message: "Please provide all required fields including resume",
                success: false
            });
        }

        try {
            // Send email with resume attachment (from memory buffer)
            await resumeSender(
                // "info.inextets@gmail.com",
                'rishimaheshwari040@gmail.com',
                "New Career Application - I Next ETS",
                careerEmail(
                    name, 
                    email, 
                    contact, 
                    applicationFor, 
                    resume,
                    totalExperience,
                    currentCTC,
                    expectedCTC,
                    noticePeriod,
                    currentCompany,
                    highestEducation,
                    passoutYear
                ),
                [{
                    filename: resume.originalname,
                    content: resume.buffer // Use buffer from memory
                }]
            );

            res.status(200).send({
                message: "Application submitted successfully! Our team will contact you soon.",
                success: true
            });
        } catch (error) {
            console.error("Error sending career application email:", error);
            res.status(500).send({
                message: "Error submitting application. Please try again.",
                success: false,
                error: error.message
            });
        }
    });
};

module.exports = { careerCtrl };
