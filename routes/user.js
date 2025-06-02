const express = require('express');
const { protect, adminOnly } = require('../middleware/auth');
const User = require('../models/User');
const router = express.Router();

router.get('/', protect, adminOnly, async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

router.get('/me', protect, async (req, res) => {
  res.json(req.user);
});

module.exports = router;