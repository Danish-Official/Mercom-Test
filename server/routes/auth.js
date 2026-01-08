const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


router.post('/register', async (req, res) => {
const user = await User.create(req.body);
res.json(user);
});


router.post('/login', async (req, res) => {
const user = await User.findOne({ email: req.body.email });
if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
return res.status(401).json({ message: 'Invalid credentials' });
}
const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
res.json({ token });
});


module.exports = router;