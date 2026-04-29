# I Next ETS - Server Configuration

## 📋 Overview
This is the backend server for I Next ETS website, handling contact forms, career applications, and email notifications.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
cd server
npm install
```

### 2. Environment Setup
Create a `.env` file in the server directory with the following variables:

```env
# Server Configuration
PORT=8080

# Email Configuration (Gmail SMTP)
MAIL_HOST=smtp.gmail.com
MAIL_USER=dailypharma24@gmail.com
MAIL_PASS=ibiz ufts ltqu auzy

# JWT Secret (for future authentication)
JWT_SECRET=lisjdoifklksp85145614648

# Application Configuration
NODE_ENV=development

# Email Recipients
ADMIN_EMAIL=info.inextets@gmail.com
```

### 3. Run the Server

**Development Mode (with auto-reload):**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

## 📧 Email Configuration

### Gmail App Password Setup
1. Go to your Google Account settings
2. Enable 2-Step Verification
3. Go to Security > App passwords
4. Generate a new app password for "Mail"
5. Use this password in `MAIL_PASS` (remove spaces)

**Note:** The current password format `ibiz ufts ltqu auzy` should be entered as `ibizuftsliquauzy` (without spaces)

## 🛠️ API Endpoints

### Contact Form
- **POST** `/api/v1/contact/contactus`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "contact": "1234567890",
    "message": "Your message here"
  }
  ```

### Career Application
- **POST** `/api/v1/contact/career`
- **Content-Type:** `multipart/form-data`
- **Body:**
  - `name`: Applicant name
  - `email`: Applicant email
  - `contact`: Phone number
  - `message`: Cover letter
  - `applicationFor`: Position applying for
  - `resume`: PDF/DOC file (max 5MB)

## 📁 Project Structure

```
server/
├── controllers/        # Request handlers
│   ├── career.js      # Career form controller
│   └── contactCtrl.js # Contact form controller
├── routes/            # API routes
│   └── contactRoute.js
├── template/          # Email templates
│   ├── career.js
│   └── contactFormRes.js
├── utils/             # Utility functions
│   ├── mailSenderr.js
│   └── resumeSender.js
├── uploads/           # Resume uploads directory
│   └── resumes/
├── .env              # Environment variables (not in git)
├── .env.example      # Example environment file
├── .gitignore        # Git ignore rules
├── index.js          # Server entry point
└── package.json      # Dependencies
```

## 🔒 Security Notes

1. **Never commit `.env` file** - It's already in `.gitignore`
2. **Use App Passwords** - Don't use your actual Gmail password
3. **Rotate secrets regularly** - Change JWT_SECRET periodically
4. **HTTPS in production** - Always use SSL/TLS in production

## 🐛 Troubleshooting

### Email not sending?
- Check if Gmail App Password is correct (no spaces)
- Verify 2-Step Verification is enabled
- Check if "Less secure app access" is disabled (use App Password instead)

### Port already in use?
- Change PORT in `.env` file
- Or kill the process using port 8080:
  ```bash
  # Windows
  netstat -ano | findstr :8080
  taskkill /PID <PID> /F
  
  # Linux/Mac
  lsof -ti:8080 | xargs kill -9
  ```

### File upload not working?
- Check if `uploads/resumes` directory exists
- Verify file size is under 5MB
- Ensure multer is properly configured

## 📝 Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port number | `8080` |
| `MAIL_HOST` | SMTP server host | `smtp.gmail.com` |
| `MAIL_USER` | Email account | `your-email@gmail.com` |
| `MAIL_PASS` | Gmail App Password | `abcd efgh ijkl mnop` |
| `JWT_SECRET` | Secret key for JWT | `random-secret-key` |
| `NODE_ENV` | Environment mode | `development` or `production` |
| `ADMIN_EMAIL` | Admin email for notifications | `info.inextets@gmail.com` |

## 🔄 Updates & Maintenance

### Update Dependencies
```bash
npm update
```

### Check for Security Vulnerabilities
```bash
npm audit
npm audit fix
```

## 📞 Support
For issues or questions, contact: info.inextets@gmail.com
