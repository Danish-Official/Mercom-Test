require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const eventRoutes = require('./routes/events');
const newsletterRoutes = require('./routes/newsletter');


const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGO_URI);


app.use('/api/auth', authRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/newsletter', newsletterRoutes);


app.listen(process.env.PORT || 5000, () => console.log(`Server running on port ${process.env.PORT || 5000}`));