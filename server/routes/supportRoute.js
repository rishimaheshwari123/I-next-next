const express = require('express');
const router = express.Router();
const {
  createSupportTicket,
  addSupportNote,
  getMySupportTickets,
  getAllSupportTickets,
  getSingleSupportTicket,
  updateSupportTicket,
  deleteSupportTicket,
  getTicketStats
} = require('../controllers/supportCtrl');

// Public route
router.post('/create', createSupportTicket);

// User routes
router.get('/my-tickets/:userId', getMySupportTickets);

// Admin routes
router.get('/getAll', getAllSupportTickets);
router.get('/stats', getTicketStats);
router.get('/:id', getSingleSupportTicket);
router.put('/update/:id', updateSupportTicket);
router.post('/add-note/:id', addSupportNote);
router.delete('/delete/:id', deleteSupportTicket);

module.exports = router;
