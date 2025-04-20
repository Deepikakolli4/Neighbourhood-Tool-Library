const pool = require('../config/db');

exports.createReport = async (req, res) => {
  const { tool_id, description } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO damagereports (tool_id, user_id, description)
       VALUES ($1, $2, $3) RETURNING *`,
      [tool_id, req.user.userId, description]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: `Failed to report damage ${err}` });
  }
};

exports.getAllReports = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT dr.*, u.name AS reporter_name, t.name AS tool_name
      FROM damagereports dr
      JOIN users u ON dr.user_id = u.id
      JOIN tools t ON dr.tool_id = t.id
      ORDER BY reported_at DESC
    `);

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: `Failed to fetch reports ${err}` });
  }
};
