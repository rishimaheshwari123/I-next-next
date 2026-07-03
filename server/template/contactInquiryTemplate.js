const contactInquiryTemplate = (name, email, phone, subject, message) => {
  const currentDate = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
    dateStyle: "medium",
    timeStyle: "short",
  });

  return `<!DOCTYPE html>
  <html>
  <head>
      <meta charset="UTF-8">
      <title>New Contact Inquiry - I Next ETS</title>
      <style>
          body {
              background-color: #f3f4f6;
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              font-size: 16px;
              color: #1f2937;
              margin: 0;
              padding: 0;
              line-height: 1.6;
          }
          .wrapper {
              background-color: #f3f4f6;
              padding: 40px 20px;
          }
          .container {
              max-width: 650px;
              margin: 0 auto;
              background-color: #ffffff;
              border-radius: 16px;
              overflow: hidden;
              box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05);
          }
          .header {
              background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 50%, #f97316 100%);
              color: #ffffff;
              padding: 40px 30px;
              text-align: center;
              position: relative;
          }
          .header h1 {
              margin: 0;
              font-size: 26px;
              font-weight: 800;
              letter-spacing: -0.5px;
          }
          .header p {
              margin: 10px 0 0 0;
              opacity: 0.9;
              font-size: 14px;
              font-weight: 500;
          }
          .badge {
              display: inline-block;
              padding: 6px 14px;
              background-color: rgba(255, 255, 255, 0.15);
              border: 1px solid rgba(255, 255, 255, 0.25);
              border-radius: 9999px;
              font-size: 11px;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 1px;
              margin-bottom: 12px;
          }
          .content {
              padding: 35px 30px;
          }
          .section {
              margin-bottom: 30px;
          }
          .section-title {
              font-size: 14px;
              font-weight: 700;
              color: #4b5563;
              text-transform: uppercase;
              letter-spacing: 1.5px;
              border-bottom: 2px solid #f3f4f6;
              padding-bottom: 8px;
              margin-bottom: 20px;
          }
          .card {
              background-color: #f9fafb;
              border: 1px solid #f3f4f6;
              border-radius: 12px;
              padding: 20px;
          }
          .info-row {
              display: flex;
              margin-bottom: 14px;
              align-items: flex-start;
          }
          .info-row:last-child {
              margin-bottom: 0;
          }
          .label {
              font-weight: 700;
              color: #4b5563;
              width: 140px;
              flex-shrink: 0;
              font-size: 14px;
          }
          .value {
              color: #111827;
              font-size: 14px;
              word-break: break-all;
          }
          .value a {
              color: #2563eb;
              text-decoration: none;
              font-weight: 600;
          }
          .value a:hover {
              text-decoration: underline;
          }
          .message-box {
              background-color: #f8fafc;
              border-left: 4px solid #2563eb;
              border-radius: 4px 12px 12px 4px;
              padding: 20px;
              font-size: 14px;
              color: #334155;
              font-style: italic;
              white-space: pre-line;
              line-height: 1.6;
          }
          .footer {
              background-color: #f9fafb;
              border-top: 1px solid #f3f4f6;
              padding: 25px 30px;
              text-align: center;
              font-size: 12px;
              color: #9ca3af;
          }
          .footer p {
              margin: 5px 0;
          }
          .footer a {
              color: #4b5563;
              text-decoration: none;
              font-weight: 600;
          }
          .footer a:hover {
              color: #2563eb;
          }
          @media only screen and (max-width: 600px) {
              .wrapper {
                  padding: 20px 10px;
              }
              .content {
                  padding: 25px 20px;
              }
              .info-row {
                  flex-direction: column;
              }
              .label {
                  width: 100%;
                  margin-bottom: 4px;
              }
          }
      </style>
  </head>
  <body>
      <div class="wrapper">
          <div class="container">
              <!-- Email Header -->
              <div class="header">
                  <span class="badge">Inquiry Received</span>
                  <h1>New Website Inquiry</h1>
                  <p>A user has submitted a message via the home page contact form.</p>
              </div>

              <!-- Email Content -->
              <div class="content">
                  <!-- Contact Details Section -->
                  <div class="section">
                      <div class="section-title">Contact Details</div>
                      <div class="card">
                          <div class="info-row">
                              <div class="label">Full Name</div>
                              <div class="value">${name || "N/A"}</div>
                          </div>
                          <div class="info-row">
                              <div class="label">Email Address</div>
                              <div class="value">
                                  <a href="mailto:${email}">${email || "N/A"}</a>
                              </div>
                          </div>
                          <div class="info-row">
                              <div class="label">Phone Number</div>
                              <div class="value">
                                  <a href="tel:${phone}">${phone || "N/A"}</a>
                              </div>
                          </div>
                          <div class="info-row">
                              <div class="label">Submitted At</div>
                              <div class="value">${currentDate}</div>
                          </div>
                      </div>
                  </div>

                  <!-- Message Details Section -->
                  <div class="section">
                      <div class="section-title">Inquiry Details</div>
                      <div class="card">
                          <div class="info-row" style="margin-bottom: 15px;">
                              <div class="label">Subject</div>
                              <div class="value" style="font-weight: 700; color: #111827;">
                                  ${subject || "N/A"}
                              </div>
                          </div>
                          <div class="label" style="margin-bottom: 8px; display: block; width: 100%;">Message</div>
                          <div class="message-box">
                              ${message || "No message content provided."}
                          </div>
                      </div>
                  </div>
              </div>

              <!-- Email Footer -->
              <div class="footer">
                  <p><strong>I Next ETS</strong> &copy; ${new Date().getFullYear()}</p>
                  <p>Plot No - 11, Zone-I, MP Nagar, Bhopal, MP 462011</p>
                  <p>
                      <a href="https://inextets.in">Website</a> &bull; 
                      <a href="mailto:info.inextets@gmail.com">Support</a>
                  </p>
                  <p style="margin-top: 15px; font-size: 10px; opacity: 0.7;">
                      This is an automated notification from your website's contact inquiry system.
                  </p>
              </div>
          </div>
      </div>
  </body>
  </html>`;
};

module.exports = contactInquiryTemplate;
