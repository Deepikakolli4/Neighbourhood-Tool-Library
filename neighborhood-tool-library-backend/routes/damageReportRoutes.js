const express = require('express');
const router = express.Router();
const { createReport, getAllReports } = require('../controllers/damageReportController');
const { authMiddleware, requireAdmin } = require('../middlewares/auth');

router.post('/', authMiddleware, createReport);             // Authenticated users
router.get('/', authMiddleware, requireAdmin, getAllReports); // Admin only

module.exports = router;
