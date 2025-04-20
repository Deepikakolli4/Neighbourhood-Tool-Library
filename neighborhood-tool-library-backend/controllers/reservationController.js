const pool = require('../config/db');

exports.createReservation = async (req, res) => {
    const { tool_id, start_date, end_date } = req.body;

    // Check for overlaps
    const overlapCheck = await pool.query(`
      SELECT * FROM reservations
      WHERE tool_id = $1 AND NOT (end_date < $2 OR start_date > $3)
    `, [tool_id, start_date, end_date]);

    if (overlapCheck.rows.length > 0) {
        return res.status(400).json({ error: 'Tool already reserved for these dates' });
    }

    const result = await pool.query(
        'INSERT INTO reservations (tool_id, user_id, start_date, end_date, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [tool_id, req.user.userId, start_date, end_date, 'pending']
    );
    res.status(201).json(result.rows[0]);
};

exports.getMyReservations = async (req, res) => {
    const result = await pool.query(
        'SELECT * FROM reservations WHERE user_id = $1 ORDER BY start_date DESC',
        [req.user.userId]
    );
    res.json(result.rows);
};

exports.cancelReservation = async (req, res) => {
    await pool.query('DELETE FROM reservations WHERE id = $1 AND user_id = $2', [
        req.params.id, req.user.userId
    ]);
    res.sendStatus(204);
};
