import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart2, Clock, TrendingUp, Star } from 'lucide-react';
import { getProgress } from '../services/api';
import type { ProgressResponse } from '../types/apiTypes';

interface ProgressDashboardProps {
  userId: string;
}

const iconProps = { size: 20, strokeWidth: 1.5, className: 'metric-icon' };

const ProgressDashboard: React.FC<ProgressDashboardProps> = ({ userId }) => {
  const [data, setData] = useState<ProgressResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    let cancelled = false;

    const fetchProgress = async () => {
      setLoading(true);
      setError(null);
      try {
        const resp = await getProgress(userId);
        if (!cancelled) setData(resp);
      } catch {
        if (!cancelled) setError('Unable to load progress right now.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchProgress();
    return () => {
      cancelled = true;
    };
  }, [userId]);

  const metrics = [
    {
      label: 'Total sessions',
      value: data?.total_sessions ?? '—',
      icon: <Clock {...iconProps} />,
    },
    {
      label: 'Average score',
      value: data?.average_cognitive_score ?? '—',
      icon: <Star {...iconProps} />,
    },
    {
      label: 'Last score',
      value: data?.last_session_score ?? '—',
      icon: <TrendingUp {...iconProps} />,
    },
    {
      label: 'Preferred level',
      value: data?.preferred_level ?? '—',
      icon: <BarChart2 {...iconProps} />,
    },
  ];

  return (
    <div className="progress-root">
      <div className="progress-container">
        <header className="progress-header">
          <div>
            <h2 className="panel-title">Progress dashboard</h2>
            <p className="panel-subtitle">
              Overview of how cognitive load has evolved for this user ID.
            </p>
          </div>
          <div className="progress-user">
            Viewing history for <span>{userId || '—'}</span>
          </div>
        </header>

        {loading && (
          <p className="progress-status">Loading progress…</p>
        )}

        {error && (
          <p className="progress-error">{error}</p>
        )}

        {!loading && !error && (
          <div className="progress-grid">
            {metrics.map((m) => (
              <motion.div
                key={m.label}
                className="metric-card"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {m.icon}
                <div className="metric-text">
                  <span className="metric-label">{m.label}</span>
                  <span className="metric-value">{m.value}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.div
          className="progress-chart"
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
        >
          <p className="chart-title">Visual trends (coming soon)</p>
          <p className="chart-caption">
            This area is intentionally reserved for a future accessibility‑
            friendly graph of cognitive scores over time.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressDashboard;