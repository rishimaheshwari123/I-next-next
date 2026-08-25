const express = require("express");
const { 
    contactCtrl, 
    getAllContacts, 
    getContactById, 
    updateContactStatus, 
    deleteContact 
} = require("../controllers/contactCtrl");
const { careerCtrl } = require("../controllers/career");
const { auth } = require("../middleware/auth");
const router = express.Router();

// Contact routes
router.post("/contact", contactCtrl);
router.get("/contacts", auth, getAllContacts);
router.get("/contact/:id", auth, getContactById);
router.put("/contact/:id", auth, updateContactStatus);
router.delete("/contact/:id", auth, deleteContact);

// Career route
router.post("/career", careerCtrl);

module.exports = router;