const careerEmail = (
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
) => {
    return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>New Career Application</title>
        <style>
            body {
                background-color: #f4f4f4;
                font-family: Arial, sans-serif;
                font-size: 16px;
                color: #333333;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 700px;
                margin: 20px auto;
                padding: 30px;
                background-color: #ffffff;
                border-radius: 10px;
                box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
            }
            .header {
                background: linear-gradient(135deg, #2563EB 0%, #FF6B00 100%);
                color: white;
                padding: 25px;
                border-radius: 8px;
                margin-bottom: 30px;
                text-align: center;
            }
            .header h1 {
                margin: 0;
                font-size: 28px;
            }
            .header p {
                margin: 10px 0 0 0;
                opacity: 0.9;
                font-size: 14px;
            }
            .section {
                margin-bottom: 25px;
                padding: 20px;
                background-color: #f9fafb;
                border-left: 4px solid #2563EB;
                border-radius: 5px;
            }
            .section-title {
                font-size: 20px;
                font-weight: bold;
                color: #2563EB;
                margin-bottom: 15px;
            }
            .info-row {
                margin: 10px 0;
                padding: 8px 0;
                border-bottom: 1px solid #e5e7eb;
            }
            .info-row:last-child {
                border-bottom: none;
            }
            .label {
                font-weight: bold;
                color: #4b5563;
                display: inline-block;
                min-width: 180px;
            }
            .value {
                color: #1f2937;
            }
            .resume-badge {
                display: inline-block;
                padding: 8px 16px;
                background-color: #dbeafe;
                color: #1e40af;
                border-radius: 12px;
                font-size: 14px;
                font-weight: 600;
                margin-top: 10px;
            }
            .footer {
                margin-top: 30px;
                padding-top: 20px;
                border-top: 2px solid #e5e7eb;
                text-align: center;
                color: #6b7280;
                font-size: 14px;
            }
            .highlight {
                font-size: 18px;
                font-weight: 600;
                color: #FF6B00;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🎯 New Career Application</h1>
                <p>A candidate has applied for a position at I Next ETS</p>
                <p style="font-size: 12px; margin-top: 5px;">Received on ${new Date().toLocaleString()}</p>
            </div>

            <!-- Applicant Information -->
            <div class="section">
                <div class="section-title">👤 Applicant Information</div>
                <div class="info-row">
                    <span class="label">Full Name:</span>
                    <span class="value">${name || 'N/A'}</span>
                </div>
                <div class="info-row">
                    <span class="label">Email Address:</span>
                    <span class="value"><a href="mailto:${email}" style="color: #2563EB; text-decoration: none;">${email || 'N/A'}</a></span>
                </div>
                <div class="info-row">
                    <span class="label">Contact Number:</span>
                    <span class="value"><a href="tel:${contact}" style="color: #2563EB; text-decoration: none;">${contact || 'N/A'}</a></span>
                </div>
            </div>

            <!-- Position Details -->
            <div class="section">
                <div class="section-title">💼 Position Applied For</div>
                <div class="info-row">
                    <span class="highlight">${applicationFor || 'N/A'}</span>
                </div>
            </div>

            <!-- Professional Details -->
            <div class="section">
                <div class="section-title">💼 Professional Information</div>
                <div class="info-row">
                    <span class="label">Total Experience:</span>
                    <span class="value">${totalExperience || 'Not Provided'}</span>
                </div>
                <div class="info-row">
                    <span class="label">Current Company:</span>
                    <span class="value">${currentCompany || 'Not Provided'}</span>
                </div>
                <div class="info-row">
                    <span class="label">Current CTC:</span>
                    <span class="value">${currentCTC || 'Not Provided'}</span>
                </div>
                <div class="info-row">
                    <span class="label">Expected CTC:</span>
                    <span class="value">${expectedCTC || 'Not Provided'}</span>
                </div>
                <div class="info-row">
                    <span class="label">Notice Period:</span>
                    <span class="value">${noticePeriod || 'Not Provided'}</span>
                </div>
            </div>

            <!-- Educational Details -->
            <div class="section">
                <div class="section-title">🎓 Educational Information</div>
                <div class="info-row">
                    <span class="label">Highest Education:</span>
                    <span class="value">${highestEducation || 'Not Provided'}</span>
                </div>
                <div class="info-row">
                    <span class="label">Passout Year:</span>
                    <span class="value">${passoutYear || 'Not Provided'}</span>
                </div>
            </div>

           

            <div class="footer">
                <p style="font-size: 16px; font-weight: bold; color: #2563EB; margin-bottom: 10px;">I Next ETS - Digital Marketing Agency</p>
                <p>📧 <a href="mailto:${email}" style="color: #2563EB; text-decoration: none;">${email}</a> | 📞 <a href="tel:${contact}" style="color: #2563EB; text-decoration: none;">${contact}</a></p>
                <p style="margin-top: 15px; color: #991b1b; font-weight: bold;">⚠️ Please review the application and respond within 48 hours</p>
                <p style="margin-top: 10px; font-size: 12px; color: #9ca3af;">This is an automated notification from your career application form.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};

module.exports = { careerEmail };
