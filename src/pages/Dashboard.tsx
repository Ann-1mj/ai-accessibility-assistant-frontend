import React from 'react';
import ProgressDashboard from '../components/ProgressDashboard';

interface DashboardProps {
  userId: string;
}

const Dashboard: React.FC<DashboardProps> = ({ userId }) => {
  return (
    <div className="dashboard-root">
      <ProgressDashboard userId={userId} />
    </div>
  );
};

export default Dashboard;
