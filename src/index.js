require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const bookingRouter = require('./routes/booking');

const app = express();
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error', err));

app.use('/api/auth', authRouter);
app.use('/api/booking', bookingRouter);

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
