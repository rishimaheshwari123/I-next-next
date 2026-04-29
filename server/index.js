const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const fs = require('fs');
const fileUpload = require('express-fileupload');
const connectDB = require("./config/db");
const { cloudinaryConnect } = require("./config/cloudinary");

const app = express();

dotenv.config();

connectDB();
cloudinaryConnect();


// Create uploads directory if it doesn't exist
const uploadsDir = 'uploads/resumes';
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// middleware 
app.use(express.json());
app.use(cors());
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

// route 
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Ha bhai chal rha hu!"
    })
})
app.use("/api/v1/contact", require("./routes/contactRoute"));
app.use("/api/v1/auth", require("./routes/authRoute"));
app.use("/api/v1/image", require("./routes/imageRoute"));
app.use("/api/v1/blog", require("./routes/blogRoute"));
app.use("/api/v1/domain", require("./routes/domainRoute"))

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port no ${PORT}`);
});
