const express = require('express');
const router = express.Router();
const {
  createReservation, getMyReservations, cancelReservation
} = require('../controllers/reservationController');
const { authMiddleware } = require('../middlewares/auth');

router.post('/', authMiddleware, createReservation);
router.get('/my', authMiddleware, getMyReservations);
router.delete('/:id', authMiddleware, cancelReservation);

module.exports = router;
