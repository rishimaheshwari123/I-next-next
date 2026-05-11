const express = require('express');
const router = express.Router();
const {
  createSupportTicket,
  getAllSupportTickets,
  getSingleSupportTicket,
  updateSupportTicket,
  deleteSupportTicket,
  getTicketStats
} = require('../controllers/supportCtrl');

// Public route
router.post('/create', createSupportTicket);

// Admin routes
router.get('/getAll', getAllSupportTickets);
router.get('/stats', getTicketStats);
router.get('/:id', getSingleSupportTicket);
router.put('/update/:id', updateSupportTicket);
router.delete('/delete/:id', deleteSupportTicket);

module.exports = router;
