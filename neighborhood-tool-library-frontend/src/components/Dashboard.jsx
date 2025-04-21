import React, { useEffect, useState } from 'react';
import api from '../api/api';

const Dashboard = () => {
  const [tools, setTools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the tools from the API
  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await api.get('http://localhost:5000/api/tools', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setTools(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching tools');
        setLoading(false);
      }
    };

    fetchTools();
  }, []);

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-2">Loading your tools...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container text-center py-5">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">Dashboard</h2>
      <h4 className="mb-3">Your Tools</h4>

      {tools.length === 0 ? (
        <div className="alert alert-info">No tools available</div>
      ) : (
        <div className="row">
          {tools.map((tool) => (
            <div className="col-md-6 col-lg-4 mb-4" key={tool.id}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{tool.name}</h5>
                  <p className="card-text">{tool.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
