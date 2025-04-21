const pool = require('../config/db');


exports.getAllTools = async (req, res) => {
  const { category } = req.query;
  let query = `
    SELECT * FROM tools
  `;
  const params = [];
  const conditions = [];

  if (category) {
    params.push(category);
    conditions.push(`category = $${params.length}`);
  }

  if (conditions.length > 0) {
    query += ` WHERE ` + conditions.join(' AND ');
  }

  try {
    const result = await pool.query(query, params);
    const tools = result.rows;

    // For each tool, check availability based on the reservations
    const toolsWithAvailability = await Promise.all(tools.map(async (tool) => {
      const availabilityQuery = `
        SELECT * FROM reservations
        WHERE tool_id = $1 AND status IN ('pending', 'active')
        AND start_date <= CURRENT_DATE AND end_date >= CURRENT_DATE
      `;
      const availabilityResult = await pool.query(availabilityQuery, [tool.id]);

      const available = availabilityResult.rows.length === 0 ? 'Available' : 'Unavailable';

      return {
        ...tool,
        available,
      };
    }));

    res.json(toolsWithAvailability);
  } catch (err) {
    console.error('Error fetching tools:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
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

