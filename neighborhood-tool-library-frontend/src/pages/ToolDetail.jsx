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
        <div className="card-body">
          <h2 className="card-title">{tool.name}</h2>
          <p className="card-text">{tool.description}</p>
          <p className="card-text">
            <strong>Available:</strong>{' '}
            <span className={tool.available ? 'text-success' : 'text-danger'}>
              {tool.available ? 'Yes' : 'No'}
            </span>
          </p>
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
