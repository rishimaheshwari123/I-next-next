const express = require("express")
const { registerCtrl, loginCtrl, getAllClientsCtrl } = require("../controllers/authCtrl")
const router = express.Router()


router.post("/login", loginCtrl)
router.post("/register", registerCtrl)
router.get("/clients", getAllClientsCtrl)




module.exports = router