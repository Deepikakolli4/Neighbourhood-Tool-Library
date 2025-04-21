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

  const isOverdue = (endDate) => {
    const today = new Date();
    return new Date(endDate) < today;
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">My Reservations</h2>
      {reservations.length === 0 ? (
        <div className="alert alert-info">No reservations found.</div>
      ) : (
        reservations.map((r) => (
          <div key={r.id} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Tool ID: {r.tool_id}</h5>
              <p className="card-text"><strong>From:</strong> {formatDate(r.start_date)}</p>
              <p className="card-text">
                <strong>To:</strong> {formatDate(r.end_date)}{' '}
                {isOverdue(r.end_date) && (
                  <span className="badge bg-danger ms-2">Overdue</span>
                )}
              </p>
              <p className="card-text"><strong>Status:</strong> {r.status}</p>
              <button
                className="btn btn-danger"
                onClick={() => cancelReservation(r.id)}
              >
                Cancel
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ReservationsDashboard;
