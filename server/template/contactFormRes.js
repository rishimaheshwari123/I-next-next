const contactUsEmail = (contactData) => {
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
        additionalComments
    } = contactData;

    return `<!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <title>New Contact Form Submission</title>
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
                max-width: 800px;
                margin: 20px auto;
                padding: 30px;
                background-color: #ffffff;
                border-radius: 10px;
                box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
            }
            .logo {
                max-width: 150px;
                margin-bottom: 20px;
            }
            .header {
                background: linear-gradient(135deg, #2563EB 0%, #9333EA 100%);
                color: white;
                padding: 25px;
                border-radius: 8px;
                margin-bottom: 30px;
            }
            .header h1 {
                margin: 0;
                font-size: 28px;
            }
            .header p {
                margin: 5px 0 0 0;
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
                display: flex;
                align-items: center;
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
                display: block;
                margin-bottom: 4px;
            }
            .value {
                color: #1f2937;
                display: block;
            }
            .badge {
                display: inline-block;
                padding: 6px 14px;
                background-color: #dbeafe;
                color: #1e40af;
                border-radius: 12px;
                font-size: 13px;
                margin: 3px;
                font-weight: 500;
            }
            .rating-bar {
                display: inline-block;
                width: 200px;
                height: 8px;
                background-color: #e5e7eb;
                border-radius: 4px;
                margin-left: 10px;
                position: relative;
                vertical-align: middle;
            }
            .rating-fill {
                height: 100%;
                background: linear-gradient(90deg, #2563EB 0%, #9333EA 100%);
                border-radius: 4px;
            }
            .footer {
                margin-top: 30px;
                padding-top: 20px;
                border-top: 2px solid #e5e7eb;
                text-align: center;
                color: #6b7280;
                font-size: 14px;
            }
            .urgent-badge {
                background-color: #fee2e2;
                color: #991b1b;
                padding: 4px 12px;
                border-radius: 12px;
                font-size: 12px;
                font-weight: bold;
                margin-left: 10px;
            }
            .grid-2 {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 15px;
            }
            @media (max-width: 600px) {
                .grid-2 {
                    grid-template-columns: 1fr;
                }
            }
        </style>
    </head>
    <body>
        <div class="container">
            <center>
                <img class="logo" src="https://i.ibb.co/N608STN/inext-ets-logo.jpg" alt="I Next ETS">
            </center>
            
            <div class="header">
                <h1>🎉 New Contact Form Submission</h1>
                <p>A potential client has submitted an inquiry - ${new Date().toLocaleString()}</p>
                ${urgencyRating >= 4 ? '<p style="margin-top: 10px; font-size: 16px;">⚠️ <strong>HIGH PRIORITY INQUIRY</strong></p>' : ''}
            </div>

            <!-- Basic Information -->
            <div class="section">
                <div class="section-title">📋 Basic Information</div>
                <div class="info-row">
                    <span class="label">Contact Person:</span>
                    <span class="value">${contactPersonName}</span>
                </div>
                ${companyName ? `
                <div class="info-row">
                    <span class="label">Company Name:</span>
                    <span class="value">${companyName}</span>
                </div>
                ` : ''}
                <div class="info-row">
                    <span class="label">Email:</span>
                    <span class="value"><a href="mailto:${email}" style="color: #2563EB; text-decoration: none;">${email}</a></span>
                </div>
                <div class="info-row">
                    <span class="label">Phone:</span>
                    <span class="value"><a href="tel:${phone}" style="color: #2563EB; text-decoration: none;">${phone}</a></span>
                </div>
            </div>

            <!-- Services Interested -->
            <div class="section">
                <div class="section-title">🎯 Services Interested</div>
                <div class="info-row">
                    ${servicesInterested.map(service => `<span class="badge">${service}</span>`).join('')}
                </div>
                ${otherServicesSpecify ? `
                <div class="info-row">
                    <span class="label">Other Services Specified:</span>
                    <span class="value">${otherServicesSpecify}</span>
                </div>
                ` : ''}
            </div>

            <!-- Website Development Details -->
            ${websiteType || websiteVision || websitePages || brandGuidelinesReady || specificIntegrations || preferredCMS || primaryCTA || websitePurpose || existingWebsite || (ongoingMaintenance && ongoingMaintenance.length > 0) ? `
            <div class="section">
                <div class="section-title">🌐 Website Development Details</div>
                ${websiteType ? `
                <div class="info-row">
                    <span class="label">Website Type:</span>
                    <span class="value">${websiteType}</span>
                </div>
                ` : ''}
                ${websiteVision ? `
                <div class="info-row">
                    <span class="label">Website Vision:</span>
                    <span class="value">${websiteVision}</span>
                </div>
                ` : ''}
                ${websitePages ? `
                <div class="info-row">
                    <span class="label">Number of Pages:</span>
                    <span class="value">${websitePages}</span>
                </div>
                ` : ''}
                ${brandGuidelinesReady ? `
                <div class="info-row">
                    <span class="label">Brand Guidelines Ready:</span>
                    <span class="value">${brandGuidelinesReady}</span>
                </div>
                ` : ''}
                ${specificIntegrations ? `
                <div class="info-row">
                    <span class="label">Specific Integrations:</span>
                    <span class="value">${specificIntegrations}</span>
                </div>
                ` : ''}
                ${preferredCMS ? `
                <div class="info-row">
                    <span class="label">Preferred CMS:</span>
                    <span class="value">${preferredCMS}</span>
                </div>
                ` : ''}
                ${primaryCTA ? `
                <div class="info-row">
                    <span class="label">Primary Call-to-Action:</span>
                    <span class="value">${primaryCTA}</span>
                </div>
                ` : ''}
                ${websitePurpose ? `
                <div class="info-row">
                    <span class="label">Website Purpose:</span>
                    <span class="value">${websitePurpose}</span>
                </div>
                ` : ''}
                ${existingWebsite ? `
                <div class="info-row">
                    <span class="label">Existing Website Status:</span>
                    <span class="value">${existingWebsite}</span>
                </div>
                ` : ''}
                ${ongoingMaintenance && ongoingMaintenance.length > 0 ? `
                <div class="info-row">
                    <span class="label">Ongoing Maintenance Needed:</span><br>
                    ${ongoingMaintenance.map(item => `<span class="badge">${item}</span>`).join('')}
                </div>
                ` : ''}
            </div>
            ` : ''}

            <!-- Social Media Marketing Details -->
            ${(socialMediaPlatforms && socialMediaPlatforms.length > 0) || socialMediaGoals || postingFrequency || targetDemographic || (contentType && contentType.length > 0) ? `
            <div class="section">
                <div class="section-title">📱 Social Media Marketing Details</div>
                ${socialMediaPlatforms && socialMediaPlatforms.length > 0 ? `
                <div class="info-row">
                    <span class="label">Platforms:</span><br>
                    ${socialMediaPlatforms.map(platform => `<span class="badge">${platform}</span>`).join('')}
                </div>
                ` : ''}
                ${socialMediaGoals ? `
                <div class="info-row">
                    <span class="label">Social Media Goals:</span>
                    <span class="value">${socialMediaGoals}</span>
                </div>
                ` : ''}
                ${postingFrequency ? `
                <div class="info-row">
                    <span class="label">Posting Frequency:</span>
                    <span class="value">${postingFrequency}</span>
                </div>
                ` : ''}
                ${targetDemographic ? `
                <div class="info-row">
                    <span class="label">Target Demographic:</span>
                    <span class="value">${targetDemographic}</span>
                </div>
                ` : ''}
                ${contentType && contentType.length > 0 ? `
                <div class="info-row">
                    <span class="label">Content Type Preferences:</span><br>
                    ${contentType.map(type => `<span class="badge">${type}</span>`).join('')}
                </div>
                ` : ''}
            </div>
            ` : ''}

            <!-- Digital Marketing/SEO Details -->
            ${currentChallenges || (kpisImportant && kpisImportant.length > 0) || competitorsAdmire || uniqueSellingProposition || geographicTarget ? `
            <div class="section">
                <div class="section-title">📈 Digital Marketing/SEO Details</div>
                ${currentChallenges ? `
                <div class="info-row">
                    <span class="label">Current Marketing Challenges:</span>
                    <span class="value">${currentChallenges}</span>
                </div>
                ` : ''}
                ${kpisImportant && kpisImportant.length > 0 ? `
                <div class="info-row">
                    <span class="label">Important KPIs:</span><br>
                    ${kpisImportant.map(kpi => `<span class="badge">${kpi}</span>`).join('')}
                </div>
                ` : ''}
                ${competitorsAdmire ? `
                <div class="info-row">
                    <span class="label">Competitors They Admire:</span>
                    <span class="value">${competitorsAdmire}</span>
                </div>
                ` : ''}
                ${uniqueSellingProposition ? `
                <div class="info-row">
                    <span class="label">Unique Selling Proposition:</span>
                    <span class="value">${uniqueSellingProposition}</span>
                </div>
                ` : ''}
                ${geographicTarget ? `
                <div class="info-row">
                    <span class="label">Geographic Target:</span>
                    <span class="value">${geographicTarget}</span>
                </div>
                ` : ''}
            </div>
            ` : ''}

            <!-- Project Details -->
            <div class="section">
                <div class="section-title">💼 Project Details</div>
                ${budgetRange ? `
                <div class="info-row">
                    <span class="label">Budget Range:</span>
                    <span class="value">${budgetRange}</span>
                </div>
                ` : ''}
                ${preferredStartDate ? `
                <div class="info-row">
                    <span class="label">Preferred Start Date:</span>
                    <span class="value">${new Date(preferredStartDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                ` : ''}
                ${expectedTimeframe ? `
                <div class="info-row">
                    <span class="label">Expected Timeframe:</span>
                    <span class="value">${expectedTimeframe}</span>
                </div>
                ` : ''}
                ${projectDeadline ? `
                <div class="info-row">
                    <span class="label">Project Deadline:</span>
                    <span class="value">${projectDeadline}</span>
                </div>
                ` : ''}
                ${urgencyRating ? `
                <div class="info-row">
                    <span class="label">Project Urgency:</span>
                    <span class="value">
                        ${urgencyRating}/5
                        ${urgencyRating >= 4 ? '<span class="urgent-badge">HIGH PRIORITY</span>' : ''}
                        <div class="rating-bar">
                            <div class="rating-fill" style="width: ${(urgencyRating / 5) * 100}%"></div>
                        </div>
                    </span>
                </div>
                ` : ''}
                ${proposalImportance ? `
                <div class="info-row">
                    <span class="label">Proposal Importance:</span>
                    <span class="value">
                        ${proposalImportance}/10
                        <div class="rating-bar">
                            <div class="rating-fill" style="width: ${(proposalImportance / 10) * 100}%"></div>
                        </div>
                    </span>
                </div>
                ` : ''}
                ${involvementLevel ? `
                <div class="info-row">
                    <span class="label">Client Involvement Level:</span>
                    <span class="value">
                        ${involvementLevel}/5
                        <div class="rating-bar">
                            <div class="rating-fill" style="width: ${(involvementLevel / 5) * 100}%"></div>
                        </div>
                    </span>
                </div>
                ` : ''}
                ${clarityRating ? `
                <div class="info-row">
                    <span class="label">Project Clarity:</span>
                    <span class="value">
                        ${clarityRating}/5
                        <div class="rating-bar">
                            <div class="rating-fill" style="width: ${(clarityRating / 5) * 100}%"></div>
                        </div>
                    </span>
                </div>
                ` : ''}
            </div>

            <!-- Additional Information -->
            ${targetAudience || visualStyle || designInspiration || (preferredCommunication && preferredCommunication.length > 0) || existingMarketingMaterials || expectedResults || digitalMarketingFamiliarity ? `
            <div class="section">
                <div class="section-title">ℹ️ Additional Information</div>
                ${targetAudience ? `
                <div class="info-row">
                    <span class="label">Target Audience:</span>
                    <span class="value">${targetAudience}</span>
                </div>
                ` : ''}
                ${visualStyle ? `
                <div class="info-row">
                    <span class="label">Visual Style Preference:</span>
                    <span class="value">${visualStyle}</span>
                </div>
                ` : ''}
                ${designInspiration ? `
                <div class="info-row">
                    <span class="label">Design Inspiration:</span>
                    <span class="value">${designInspiration}</span>
                </div>
                ` : ''}
                ${preferredCommunication && preferredCommunication.length > 0 ? `
                <div class="info-row">
                    <span class="label">Preferred Communication:</span><br>
                    ${preferredCommunication.map(method => `<span class="badge">${method}</span>`).join('')}
                </div>
                ` : ''}
                ${existingMarketingMaterials ? `
                <div class="info-row">
                    <span class="label">Existing Marketing Materials:</span>
                    <span class="value">${existingMarketingMaterials}</span>
                </div>
                ` : ''}
                ${expectedResults ? `
                <div class="info-row">
                    <span class="label">Expected Results:</span>
                    <span class="value">${expectedResults}</span>
                </div>
                ` : ''}
                ${digitalMarketingFamiliarity ? `
                <div class="info-row">
                    <span class="label">Digital Marketing Familiarity:</span>
                    <span class="value">${digitalMarketingFamiliarity}</span>
                </div>
                ` : ''}
            </div>
            ` : ''}

            <!-- Partnership Factors -->
            ${partnershipFactors && (partnershipFactors.transparentReporting || partnershipFactors.proactiveCommunication || partnershipFactors.dataDrivenStrategies || partnershipFactors.longTermPartnership) ? `
            <div class="section">
                <div class="section-title">🤝 Partnership Factors</div>
                ${partnershipFactors.transparentReporting ? `
                <div class="info-row">
                    <span class="label">Transparent Reporting:</span>
                    <span class="value">${partnershipFactors.transparentReporting}</span>
                </div>
                ` : ''}
                ${partnershipFactors.proactiveCommunication ? `
                <div class="info-row">
                    <span class="label">Proactive Communication:</span>
                    <span class="value">${partnershipFactors.proactiveCommunication}</span>
                </div>
                ` : ''}
                ${partnershipFactors.dataDrivenStrategies ? `
                <div class="info-row">
                    <span class="label">Data-Driven Strategies:</span>
                    <span class="value">${partnershipFactors.dataDrivenStrategies}</span>
                </div>
                ` : ''}
                ${partnershipFactors.longTermPartnership ? `
                <div class="info-row">
                    <span class="label">Long-Term Partnership:</span>
                    <span class="value">${partnershipFactors.longTermPartnership}</span>
                </div>
                ` : ''}
            </div>
            ` : ''}

            <!-- Source & Comments -->
            <div class="section">
                <div class="section-title">💬 Source & Additional Comments</div>
                ${hearAboutUs ? `
                <div class="info-row">
                    <span class="label">How They Heard About Us:</span>
                    <span class="value">${hearAboutUs}</span>
                </div>
                ` : ''}
                ${additionalComments ? `
                <div class="info-row">
                    <span class="label">Additional Comments:</span>
                    <span class="value">${additionalComments}</span>
                </div>
                ` : ''}
            </div>

            <div class="footer">
                <p><strong>I Next ETS</strong> - Digital Marketing Agency</p>
                <p>📧 <a href="mailto:${email}" style="color: #2563EB; text-decoration: none;">${email}</a> | 📞 <a href="tel:${phone}" style="color: #2563EB; text-decoration: none;">${phone}</a></p>
                <p style="margin-top: 15px; color: #991b1b; font-weight: bold;">⚠️ Please respond to the client within 24-48 hours</p>
                <p style="margin-top: 10px; font-size: 12px;">This is an automated notification from your website contact form.</p>
            </div>
        </div>
    </body>
    </html>
    `;
};

module.exports = { contactUsEmail };
