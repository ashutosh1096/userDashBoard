import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StatCard = ({ title, value }) => (
  <div className="stat-card">
    <div className="stat-title">{title}</div>
    <div className="stat-value">{value}</div>
  </div>
);

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(()=>{
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res=> setUsers(res.data))
      .catch(()=>{});

    const saved = localStorage.getItem('demo_projects');
    if (saved) setProjects(JSON.parse(saved));
    else {
      const starter = [
        { id: 1, name: 'Website Redesign', description: 'Update UI/UX', status: 'active' },
        { id: 2, name: 'Mobile App', description: 'Build cross-platform app', status: 'planning' }
      ];
      setProjects(starter);
      localStorage.setItem('demo_projects', JSON.stringify(starter));
    }
  },[]);

  return (
    <div className="page dashboard-page">
      <h2>Dashboard</h2>
      <div className="stats-row">
        <StatCard title="Total Users" value={users.length} />
        <StatCard title="Total Projects" value={projects.length} />
      </div>
    </div>
  );
};

export default Dashboard;
