const express = require('express');
const router = express.Router();
const jwtMiddleware = require('../middleware/auth');
const Ticket = require('../models/Ticket');
const Booking = require('../models/Booking');

// POST /api/booking/reserve
router.post('/reserve', jwtMiddleware, async (req, res) => {
  const tenantKey = req.user.tenant;
  const { type, quantity } = req.body;
  if (!type || !quantity) return res.status(400).json({ error: 'type and quantity required' });

  // Find ticket
  const ticket = await Ticket.findOne({ tenantKey, type });
  if (!ticket) return res.status(400).json({ error: `Ticket type ${type} not found` });
  if (ticket.available < quantity) return res.status(400).json({ error: 'Not enough tickets available' });

  const totalPrice = ticket.price * quantity;

  // Reduce availability
  ticket.available -= quantity;
  await ticket.save();

  // Save booking
  const booking = new Booking({
    tenantKey,
    user: req.user.sub,
    ticketType: type,
    quantity,
    totalPrice,
  });
  await booking.save();

  res.json({
    tenant: tenantKey,
    ticketType: type,
    quantity,
    totalPrice,
    remainingTickets: ticket.available,
    bookingTime: booking.createdAt,
  });
});

module.exports = router;
