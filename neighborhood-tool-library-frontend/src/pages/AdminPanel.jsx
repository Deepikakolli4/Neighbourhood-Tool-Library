import React, { useEffect, useState } from 'react';
import api from '../api/api';

const AdminPanel = () => {
  const [tools, setTools] = useState([]);
  const [damageReports, setDamageReports] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    api
      .get('/tools', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTools(res.data));

    api
      .get('/reports', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setDamageReports(res.data));
  }, []);

  const resolveDamage = (id) => {
    const token = localStorage.getItem('token');
    api
      .patch(`/reports/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() =>
        setDamageReports((prev) => prev.filter((d) => d.id !== id))
      );
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Admin Panel</h2>

      <h3 className="text-lg font-semibold mt-4">Manage Tools</h3>
      {tools.map((tool) => (
        <div key={tool.id} className="border p-2 mb-2">
          <p>{tool.name}</p>
        </div>
      ))}

      <h3 className="text-lg font-semibold mt-6">Damage Reports</h3>
      {damageReports.map((report) => (
        <div key={report.id} className="border p-2 mb-2">
          <p><strong>Tool:</strong> {report.toolName}</p>
          <p><strong>Reported By:</strong> {report.reportedBy}</p>
          <p><strong>Description:</strong> {report.description}</p>
          <button
            className="mt-2 bg-green-600 text-white px-2 py-1 rounded"
            onClick={() => resolveDamage(report.id)}
          >
            Mark as Resolved
          </button>
        </div>
      ))}
    </div>
  );
};

export default AdminPanel;
