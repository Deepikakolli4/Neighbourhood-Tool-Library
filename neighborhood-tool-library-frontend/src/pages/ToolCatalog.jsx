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
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Tool Catalog</h2>

      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Search..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          className="border p-2 rounded"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">All Categories</option>
          <option value="Power Tools">Power Tools</option>
          <option value="Gardening">Gardening</option>
          <option value="Hand Tools">Hand Tools</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filtered.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </div>
  );
};

export default ToolCatalogPage;
