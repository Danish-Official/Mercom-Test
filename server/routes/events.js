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

router.put('/:id', auth, async (req, res) => {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    if (req.user.role !== 'admin' && event.createdBy.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Not authorized' });
    }
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
});

router.delete('/:id', auth, async (req, res) => {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    if (req.user.role !== 'admin' && event.createdBy.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Not authorized' });
    }
    await Event.findByIdAndDelete(req.params.id);
    res.json({ message: 'Event deleted' });
});

module.exports = router;