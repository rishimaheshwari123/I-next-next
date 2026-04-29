const express = require("express");
const { 
    contactCtrl, 
    getAllContacts, 
    getContactById, 
    updateContactStatus, 
    deleteContact 
} = require("../controllers/contactCtrl");
const { careerCtrl } = require("../controllers/career");
const router = express.Router();

// Contact routes
router.post("/contact", contactCtrl);
router.get("/contacts", getAllContacts);
router.get("/contact/:id", getContactById);
router.put("/contact/:id", updateContactStatus);
router.delete("/contact/:id", deleteContact);

// Career route
router.post("/career", careerCtrl);

module.exports = router;