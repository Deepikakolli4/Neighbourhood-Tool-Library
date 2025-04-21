import React from 'react';
import { useNavigate } from 'react-router-dom';

const ToolCard = ({ tool }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/tools/${tool.id}`);
  };

  return (
    <div className="card h-100 shadow-sm cursor-pointer" onClick={handleClick} style={{ cursor: 'pointer' }}>
      {tool.image_url && (
        <img
          src={tool.image_url}
          alt={tool.name}
          className="card-img-top"
          onError={(e) => {
            e.target.onerror = null;
            // e.target.src = '/images/default-tool.jpg'; // Optional fallback
            console.log(e);
          }}
          style={{ objectFit: 'cover', height: '200px' }}
        />
      )}
      <div className="card-body">
        <h5 className="card-title">{tool.name}</h5>
        <p className="card-text">
          {tool.description.length > 100
            ? `${tool.description.slice(0, 100)}...`
            : tool.description}
        </p>
        <p className="text-muted mb-1"><small>Category: {tool.category}</small></p>
        <p className="mb-0">
          <small>
            Status:{' '}

            <span className={tool.available ? 'text-success' : 'text-danger'}>
              {tool.available}
            </span>
          </small>
        </p>
      </div>
    </div>
  );
};

export default ToolCard;
