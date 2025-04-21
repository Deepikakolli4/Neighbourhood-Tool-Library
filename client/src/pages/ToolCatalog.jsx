import React, { useEffect, useState } from 'react';
import api from '../api/api';
import ToolCard from '../components/ToolCard';

const ToolCatalogPage = () => {
  const [tools, setTools] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    api.get('/tools').then((res) => {
      setTools(res.data);
      setFiltered(res.data);
    });
  }, []);

  useEffect(() => {
    const lower = keyword.toLowerCase();
    const result = tools.filter(
      (tool) =>
        tool.name.toLowerCase().includes(lower) &&
        (category === '' || tool.category === category)
    );
    setFiltered(result);
  }, [keyword, category, tools]);

  return (
    <div className="container py-4">
      <h2 className="mb-4">Tool Catalog</h2>

      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Power Tools">Power Tools</option>
            <option value="Gardening">Gardening</option>
            <option value="Hand Tools">Hand Tools</option>
          </select>
        </div>
      </div>

      <div className="row">
        {filtered.map((tool) => (
          <div key={tool.id} className="col-md-4 mb-4">
            <ToolCard tool={tool} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ToolCatalogPage;
