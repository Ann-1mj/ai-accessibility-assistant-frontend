import React, { useState } from 'react';
import ProgressDashboard from '../components/ProgressDashboard';
import { Clock, Star, TrendingUp, BarChart2 } from 'lucide-react';

const iconProps = { size: 20, strokeWidth: 1.5 };

interface DashboardProps {
  userId: string;
}

const Dashboard: React.FC<DashboardProps> = ({ userId }) => {
  // Example session scores and preferred level - replace with real API values
  const [sessionScores] = useState<number[]>([]);
  const [preferredLevel] = useState<string>('—');

  // Define the 3 metrics to display (excluding preferred level)
  const dashboardMetrics = [
    {
      label: 'Total sessions',
      value: '—',
      icon: <Clock {...iconProps} className="metric-icon" />,
    },
    {
      label: 'Average score',
      value: '—',
      icon: <Star {...iconProps} className="metric-icon" />,
    },
    {
      label: 'Last session score',
      value: '—',
      icon: <TrendingUp {...iconProps} className="metric-icon" />,
    },
  ];

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>
        <p className="dashboard-subtitle">View your progress and analytics</p>
      </div>
      <div className="preferred-level-box">
        <BarChart2 {...iconProps} className="metric-icon" />
        <div className="metric-text">
          <span className="metric-label">Preferred reading level</span>
          <span className="metric-value">{preferredLevel}</span>
        </div>
      </div>
      <ProgressDashboard userId={userId} metrics={dashboardMetrics} sessionScores={sessionScores} />
    </div>
  );
};

export default Dashboard;