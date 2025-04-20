const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tools', require('./routes/toolRoutes'));
app.use('/api/reservations', require('./routes/reservationRoutes'));
app.use('/api/damages', require('./routes/damageReportRoutes'));
app.use('/api/reviews', require('./routes/reviewRoutes'));

module.exports = app;
