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

  if (!tool) return <div>Loading...</div>;

  return (
    <div>
      <h2>{tool.name}</h2>
      <p>{tool.description}</p>
      <p>Available: {tool.available ? 'Yes' : 'No'}</p>
      <ReviewSection toolId={tool.id} />
    </div>
  );
};

export default ToolDetail;
