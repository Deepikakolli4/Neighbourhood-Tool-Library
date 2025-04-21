import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api/api';
import ReviewSection from '../components/ReviewSection';

const ToolDetail = () => {
  const { id } = useParams();
  const [tool, setTool] = useState(null);

  useEffect(() => {
    const fetchTool = async () => {
      try {
        const response = await api.get(`/tools/${id}`);
        setTool(response.data);
      } catch (err) {
        console.error('Error fetching tool:', err);
      }
    };
    fetchTool();
  }, [id]);

  const handleReserve = async () => {
    const token = localStorage.getItem('token');
  
    // Get the current date and time
    const currentDate = new Date();
  
    // Calculate the start and end dates (48 hours apart)
    const startDate = new Date(currentDate.getTime() + 48 * 60 * 60 * 1000); // 48 hours from now
    const endDate = new Date(startDate.getTime() + 48 * 60 * 60 * 1000); // 48 hours after start date
  
    // Format the dates in ISO 8601 format
    const startDateISO = startDate.toISOString();
    const endDateISO = endDate.toISOString();
  
    try {
      await api.post(
        `/reservations`,
        {
          tool_id: tool.id,
          start_date: startDateISO,
          end_date: endDateISO,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert('Reservation successful!');
      setTool((prev) => ({ ...prev, available: false }));
    } catch (err) {
      console.error('Reservation failed:', err);
      alert('Failed to reserve the tool.');
    }
  };

  if (!tool) {
    return (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-2">Loading tool details...</p>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <div className="card mb-4">
        {tool.image_url && (
          <img
            src={tool.image_url}
            alt={tool.name}
            className="card-img-top"
            onError={(e) => {
              e.target.onerror = null;
              // e.target.src = '/images/default-tool.jpg'; // Optional fallback
            }}
            style={{ objectFit: 'cover', height: '400px', width: '400px' }}
          />
        )}
        <div className="card-body">
          <h2 className="card-title">{tool.name}</h2>
          <p className="card-text">{tool.description}</p>
          <p className="card-text">
            <strong>Available:</strong>{' '}
            <span className={tool.available ? 'text-success' : 'text-danger'}>
              {tool.available ? 'Yes' : 'No'}
            </span>
          </p>

          {tool.available && (
            <button className="btn btn-primary mt-2" onClick={handleReserve}>
              Reserve
            </button>
          )}
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <h5 className="card-title mb-3">Reviews</h5>
          <ReviewSection toolId={tool.id} />
        </div>
      </div>
    </div>
  );
};

export default ToolDetail;
