const router = require('express').Router();
const Event = require('../models/Events');
const auth = require('../middleware/auth');


router.get('/', async (req, res) => {
const events = await Event.find();
res.json(events);
});


router.get('/my-events', auth, async (req, res) => {
const events = await Event.find({ createdBy: req.user.id });
res.json(events);
});

router.post('/', auth, async (req, res) => {
const event = await Event.create({ ...req.body, createdBy: req.user.id });
res.json(event);
});


module.exports = router;