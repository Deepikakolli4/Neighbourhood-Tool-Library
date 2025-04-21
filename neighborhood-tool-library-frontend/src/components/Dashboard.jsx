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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <h3>Your Tools</h3>
      <ul>
        {tools.length === 0 ? (
          <li>No tools available</li>
        ) : (
          tools.map((tool) => (
            <li key={tool.id}>
              <h4>{tool.name}</h4>
              <p>{tool.description}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Dashboard;
