const pool = require('../config/db');

exports.createReview = async (req, res) => {
  const { tool_id, rating, comment } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO reviews (tool_id, user_id, rating, comment)
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [tool_id, req.user.userId, rating, comment]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: `Failed to post review ${err}` });
  }
};

exports.getToolReviews = async (req, res) => {
  const { toolId } = req.params;

  try {
    const result = await pool.query(
      `SELECT r.*, u.name AS reviewer_name
       FROM reviews r
       JOIN users u ON r.user_id = u.id
       WHERE r.tool_id = $1`,
      [toolId]
    );

    res.json(result.rows);
  } catch  (err) {
    res.status(500).json({ error: `Failed to fetch reviews ${err}` });
  }
};
