const express = require('express');
const router = express.Router();
const {
  getAllTools, getToolById, createTool, deleteTool
} = require('../controllers/toolController');
const { authMiddleware, requireAdmin } = require('../middlewares/auth');

router.get('/', getAllTools);
router.get('/:id', getToolById);
router.post('/', authMiddleware, requireAdmin, createTool);
router.delete('/:id', authMiddleware, requireAdmin, deleteTool);

module.exports = router;
