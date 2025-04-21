import React from 'react';
import { useNavigate } from 'react-router-dom';

const ToolCard = ({ tool }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/tools/${tool.id}`);
  };

  return (
    <div
      className="border rounded-lg p-4 shadow hover:shadow-lg cursor-pointer transition"
      onClick={handleClick}
    >
      <h3 className="text-lg font-bold mb-2">{tool.name}</h3>
      <p className="text-gray-600 mb-1">{tool.description.slice(0, 100)}...</p>
      <p className="text-sm text-gray-400">Category: {tool.category}</p>
      <p className="text-sm text-gray-500">
        Status:{' '}
        <span className={tool.available ? 'text-green-600' : 'text-red-600'}>
          {tool.available ? 'Available' : 'Unavailable'}
        </span>
      </p>
    </div>
  );
};

export default ToolCard;
