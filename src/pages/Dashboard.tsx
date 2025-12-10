import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { initialProjectsSample } from '../store/projectsSlice';

interface StatCardProps {
  title: string;
  value: number;
}
const StatCard: React.FC<StatCardProps> = ({ title, value }) => (
  <div className="stat-card">
    <div className="stat-title">{title}</div>
    <div className="stat-value">{value}</div>
  </div>
);

interface Project {
  id: number;
  name: string;
  description: string;
  status: string;
}

const Dashboard = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(res => setUsers(res.data))
      .catch(() => { });

    const saved = localStorage.getItem('demo_projects');
    if (saved) setProjects(JSON.parse(saved));
    else {
      setProjects(initialProjectsSample);
      localStorage.setItem('demo_projects', JSON.stringify(initialProjectsSample));
    }
  }, []);

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
