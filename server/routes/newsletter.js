const router = require('express').Router();
const Newsletter = require('../models/Newsletter');
const auth = require('../middleware/auth');

router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const existing = await Newsletter.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Already subscribed' });

    const subscriber = await Newsletter.create({ email });
    res.json({ message: 'Subscribed successfully', subscriber });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.get('/subscribers', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
  const subscribers = await Newsletter.find();
  res.json(subscribers);
});

router.delete('/subscribers/:id', auth, async (req, res) => {
  if (req.user.role !== 'admin') return res.status(403).json({ message: 'Admin only' });
  await Newsletter.findByIdAndDelete(req.params.id);
  res.json({ message: 'Subscriber removed' });
});

module.exports = router;