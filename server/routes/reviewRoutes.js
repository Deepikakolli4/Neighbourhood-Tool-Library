const express = require('express');
const router = express.Router();
const { createReview, getToolReviews } = require('../controllers/reviewController');
const { authMiddleware } = require('../middlewares/auth');

router.post('/', authMiddleware, createReview);             // Authenticated users
router.get('/:toolId', getToolReviews);                     // Public

module.exports = router;
