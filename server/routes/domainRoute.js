const express = require("express");
const {
    createDomainInquiry,
    getAllDomainInquiries,
    getSingleDomainInquiry,
    updateDomainInquiryStatus,
    deleteDomainInquiry
} = require("../controllers/domainCtrl");

const router = express.Router();

router.post("/create", createDomainInquiry);
router.get("/getAll", getAllDomainInquiries);
router.get("/get/:id", getSingleDomainInquiry);
router.put("/update-status/:id", updateDomainInquiryStatus);
router.delete("/delete/:id", deleteDomainInquiry);

module.exports = router;
