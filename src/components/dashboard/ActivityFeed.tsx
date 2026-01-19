'use client';

import { useState, useEffect } from 'react';

interface Activity {
  id: string;
  type: 'merge' | 'task' | 'mail' | 'spawn' | 'error' | 'success' | 'patrol';
  worker: string;
  workerIcon: string;
  message: string;
  timestamp: string;
  rig?: string;
}

const mockActivities: Activity[] = [
  { id: '1', type: 'merge', worker: 'Refinery', workerIcon: '🏭', message: 'Merged MR #234: Add retry logic to GUPP handler', timestamp: '2s ago', rig: 'gastown' },
  { id: '2', type: 'spawn', worker: 'Witness', workerIcon: '🦉', message: 'Spawned Polecat-C2 for task wy-124', timestamp: '15s ago', rig: 'wyvern' },
  { id: '3', type: 'success', worker: 'Polecat-A1', workerIcon: '😺', message: 'Completed gt-892: Add retry logic', timestamp: '28s ago', rig: 'gastown' },
  { id: '4', type: 'mail', worker: 'Mayor', workerIcon: '🎩', message: 'Sent convoy completion report to Overseer', timestamp: '45s ago', rig: 'town' },
  { id: '5', type: 'patrol', worker: 'Deacon', workerIcon: '🐺', message: 'Patrol cycle #847 checkpoint: all systems nominal', timestamp: '1m ago', rig: 'town' },
  { id: '6', type: 'task', worker: 'Crew-Alpha', workerIcon: '👷', message: 'Started design work on Auth flow refactor', timestamp: '2m ago', rig: 'gastown' },
  { id: '7', type: 'error', worker: 'Polecat-B2', workerIcon: '😺', message: 'Tests failing on bd-447, escalating to Witness', timestamp: '3m ago', rig: 'beads' },
  { id: '8', type: 'merge', worker: 'Refinery', workerIcon: '🏭', message: 'Queued MR #235: Schema migration fix', timestamp: '4m ago', rig: 'beads' },
  { id: '9', type: 'success', worker: 'Dog-Patch', workerIcon: '🐶', message: 'Plugin lint-fix completed successfully', timestamp: '5m ago', rig: 'wyvern' },
  { id: '10', type: 'spawn', worker: 'Mayor', workerIcon: '🎩', message: 'Initiated convoy BK-128 with 4 polecats', timestamp: '6m ago', rig: 'beads' },
];

const typeConfig = {
  merge: { color: '#ff6b35', icon: '🔀', label: 'MERGE' },
  task: { color: '#3b82f6', icon: '📋', label: 'TASK' },
  mail: { color: '#8b5cf6', icon: '📬', label: 'MAIL' },
  spawn: { color: '#22c55e', icon: '✨', label: 'SPAWN' },
  error: { color: '#ef4444', icon: '⚠️', label: 'ERROR' },
  success: { color: '#22c55e', icon: '✅', label: 'DONE' },
  patrol: { color: '#60636c', icon: '🔄', label: 'PATROL' },
};

export default function ActivityFeed() {
  const [activities, setActivities] = useState(mockActivities);
  const [filter, setFilter] = useState<string>('all');

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Would connect to real data source here
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const filteredActivities = filter === 'all'
    ? activities
    : activities.filter(a => a.type === filter);

  return (
    <div
      className="rounded-lg border border-[#2d2e32] overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, rgba(26,27,29,0.95) 0%, rgba(13,14,16,0.98) 100%)',
      }}
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-[#2d2e32] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
          <h3
            className="text-sm font-semibold text-[#9fa2a9] uppercase tracking-widest"
            style={{ fontFamily: 'Orbitron, monospace' }}
          >
            Live Activity
          </h3>
        </div>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-2 py-1 text-xs bg-[#1a1b1d] border border-[#2d2e32] rounded text-[#7a7d87] focus:outline-none focus:border-[#ff6b35]"
          style={{ fontFamily: 'Share Tech Mono, monospace' }}
        >
          <option value="all">All Events</option>
          <option value="merge">Merges</option>
          <option value="task">Tasks</option>
          <option value="spawn">Spawns</option>
          <option value="error">Errors</option>
          <option value="success">Success</option>
          <option value="mail">Mail</option>
          <option value="patrol">Patrol</option>
        </select>
      </div>

      {/* Activity List */}
      <div className="max-h-[400px] overflow-y-auto">
        {filteredActivities.map((activity, index) => {
          const config = typeConfig[activity.type];
          return (
            <div
              key={activity.id}
              className="px-4 py-3 border-b border-[#1a1b1d] hover:bg-[#1a1b1d]/50 transition-colors cursor-pointer group"
              style={{
                animation: `fadeIn 0.3s ease-out ${index * 0.05}s both`,
              }}
            >
              <div className="flex items-start gap-3">
                {/* Type Icon */}
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0"
                  style={{
                    background: `${config.color}15`,
                    border: `1px solid ${config.color}30`,
                  }}
                >
                  {config.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-base">{activity.workerIcon}</span>
                    <span className="text-sm font-semibold text-[#c4c6cb]" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                      {activity.worker}
                    </span>
                    <span
                      className="px-1.5 py-0.5 text-[10px] font-bold rounded uppercase"
                      style={{
                        fontFamily: 'Orbitron, monospace',
                        color: config.color,
                        background: `${config.color}15`,
                      }}
                    >
                      {config.label}
                    </span>
                    {activity.rig && (
                      <span className="px-1.5 py-0.5 text-[10px] bg-[#1a1b1d] text-[#60636c] rounded" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
                        {activity.rig}
                      </span>
                    )}
                  </div>
                  <p
                    className="text-sm text-[#7a7d87] truncate group-hover:text-[#9fa2a9] transition-colors"
                    style={{ fontFamily: 'Share Tech Mono, monospace' }}
                  >
                    {activity.message}
                  </p>
                </div>

                {/* Timestamp */}
                <span
                  className="text-xs text-[#4c4e56] flex-shrink-0"
                  style={{ fontFamily: 'Share Tech Mono, monospace' }}
                >
                  {activity.timestamp}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="px-4 py-2 border-t border-[#2d2e32] bg-[#0d0e10]/50">
        <p className="text-xs text-[#4c4e56] text-center" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
          Showing {filteredActivities.length} events • Auto-refreshing
        </p>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
