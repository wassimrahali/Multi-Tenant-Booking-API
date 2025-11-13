const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

// Login: body = { username, tenant }
router.post('/login', (req, res) => {
  const { username, tenant } = req.body;
  if (!username || !tenant) return res.status(400).json({ error: 'username and tenant required' });

  const token = jwt.sign({ sub: username, tenant }, JWT_SECRET, { expiresIn: '1h' });
  res.json({ status: 'success', token });
});

module.exports = router;
