import React, { useEffect, useState } from 'react';
import api from '../api/api';

const ReservationsDashboard = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    api
      .get('/reservations/my', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setReservations(res.data))
      .catch((err) => console.error('Failed to fetch reservations', err));
  }, []);

  const cancelReservation = (id) => {
    const token = localStorage.getItem('token');
    api
      .delete(`/reservations/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setReservations((prev) => prev.filter((r) => r.id !== id));
      })
      .catch((err) => console.error('Cancel failed', err));
  };

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">My Reservations</h2>
      {reservations.map((r) => (
        <div key={r.id} className="border p-2 mb-2 rounded shadow">
          <p><strong>Tool ID:</strong> {r.tool_id}</p>
          <p><strong>From:</strong> {formatDate(r.start_date)}</p>
          <p><strong>To:</strong> {formatDate(r.end_date)}</p>
          <p><strong>Status:</strong> {r.status}</p>
          <button
            className="mt-2 bg-red-500 text-white px-2 py-1 rounded"
            onClick={() => cancelReservation(r.id)}
          >
            Cancel
          </button>
        </div>
      ))}
    </div>
  );
};

export default ReservationsDashboard;
