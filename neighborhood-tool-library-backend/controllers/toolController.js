const pool = require('../config/db');

exports.getAllTools = async (req, res) => {
  const { category, available } = req.query;
  let query = 'SELECT * FROM tools';
  const params = [];

  if (category) {
    params.push(category);
    query += ` WHERE category = $${params.length}`;
  }

  // Optional: Add availability logic here

  const result = await pool.query(query, params);
  res.json(result.rows);
};

exports.getToolById = async (req, res) => {
  const result = await pool.query('SELECT * FROM tools WHERE id = $1', [req.params.id]);
  res.json(result.rows[0]);
};

exports.createTool = async (req, res) => {
  const { name, description, category, image_url } = req.body;
  const result = await pool.query(
    'INSERT INTO tools (name, description, category, image_url) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, description, category, image_url]
  );
  res.status(201).json(result.rows[0]);
};

exports.deleteTool = async (req, res) => {
  await pool.query('DELETE FROM tools WHERE id = $1', [req.params.id]);
  res.sendStatus(204);
};

