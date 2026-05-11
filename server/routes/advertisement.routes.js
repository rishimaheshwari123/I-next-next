const express = require('express');
const router = express.Router();
const advertisementController = require('../controllers/advertisement.controller');

// Public route
router.get('/active', advertisementController.getActiveAdvertisements);

// Admin routes
router.post('/create',  advertisementController.createAdvertisement);
router.get('/getAll', advertisementController.getAllAdvertisements);
router.put('/update/:id',  advertisementController.updateAdvertisement);
router.delete('/delete/:id',  advertisementController.deleteAdvertisement);

module.exports = router;
