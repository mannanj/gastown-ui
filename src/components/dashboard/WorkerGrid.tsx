'use client';

import { useState } from 'react';

interface Worker {
  id: string;
  role: string;
  icon: string;
  name: string;
  status: 'idle' | 'working' | 'merging' | 'stuck' | 'offline';
  currentTask?: string;
  rig?: string;
  progress?: number;
  uptime?: string;
}

const mockWorkers: Worker[] = [
  { id: 'mayor-1', role: 'Mayor', icon: '🎩', name: 'Mayor', status: 'working', currentTask: 'Orchestrating convoy BK-127', rig: 'gastown', progress: 45, uptime: '4h 23m' },
  { id: 'deacon-1', role: 'Deacon', icon: '🐺', name: 'Deacon', status: 'working', currentTask: 'Running patrol cycle #847', rig: 'town', progress: 72, uptime: '12h 05m' },
  { id: 'witness-1', role: 'Witness', icon: '🦉', name: 'Witness', status: 'idle', currentTask: 'Monitoring polecats', rig: 'beads', uptime: '8h 12m' },
  { id: 'refinery-1', role: 'Refinery', icon: '🏭', name: 'Refinery', status: 'merging', currentTask: 'Processing MR #234 (3 in queue)', rig: 'gastown', progress: 88, uptime: '6h 45m' },
  { id: 'dog-1', role: 'Dog', icon: '🐶', name: 'Scout', status: 'working', currentTask: 'Cleanup stale branches', rig: 'town', progress: 23, uptime: '2h 10m' },
  { id: 'dog-2', role: 'Dog', icon: '🐶', name: 'Boot', status: 'idle', currentTask: 'Checking on Deacon', rig: 'town', uptime: '12h 05m' },
  { id: 'dog-3', role: 'Dog', icon: '🐶', name: 'Patch', status: 'working', currentTask: 'Running plugin: lint-fix', rig: 'wyvern', progress: 56, uptime: '1h 32m' },
  { id: 'crew-1', role: 'Crew', icon: '👷', name: 'Alpha', status: 'working', currentTask: 'Design: Auth flow refactor', rig: 'gastown', progress: 67, uptime: '3h 45m' },
  { id: 'crew-2', role: 'Crew', icon: '👷', name: 'Bravo', status: 'idle', rig: 'beads', uptime: '5h 20m' },
  { id: 'crew-3', role: 'Crew', icon: '👷', name: 'Charlie', status: 'working', currentTask: 'Implementing bd-445', rig: 'beads', progress: 34, uptime: '2h 15m' },
  { id: 'polecat-1', role: 'Polecat', icon: '😺', name: 'Polecat-A1', status: 'working', currentTask: 'gt-892: Add retry logic', rig: 'gastown', progress: 89, uptime: '45m' },
  { id: 'polecat-2', role: 'Polecat', icon: '😺', name: 'Polecat-A2', status: 'merging', currentTask: 'gt-893: Fix merge conflict', rig: 'gastown', progress: 95, uptime: '38m' },
  { id: 'polecat-3', role: 'Polecat', icon: '😺', name: 'Polecat-B1', status: 'working', currentTask: 'bd-446: Update schema', rig: 'beads', progress: 22, uptime: '12m' },
  { id: 'polecat-4', role: 'Polecat', icon: '😺', name: 'Polecat-B2', status: 'stuck', currentTask: 'bd-447: Test failing', rig: 'beads', progress: 67, uptime: '52m' },
  { id: 'polecat-5', role: 'Polecat', icon: '😺', name: 'Polecat-C1', status: 'working', currentTask: 'wy-123: API endpoint', rig: 'wyvern', progress: 45, uptime: '28m' },
];

const statusConfig = {
  idle: { color: '#60636c', label: 'IDLE', bg: 'rgba(96,99,108,0.1)' },
  working: { color: '#22c55e', label: 'WORKING', bg: 'rgba(34,197,94,0.1)' },
  merging: { color: '#ff6b35', label: 'MERGING', bg: 'rgba(255,107,53,0.1)' },
  stuck: { color: '#ef4444', label: 'STUCK', bg: 'rgba(239,68,68,0.1)' },
  offline: { color: '#3f4147', label: 'OFFLINE', bg: 'rgba(63,65,71,0.1)' },
};

export default function WorkerGrid() {
  const [filter, setFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredWorkers = filter === 'all'
    ? mockWorkers
    : mockWorkers.filter(w => w.role.toLowerCase() === filter.toLowerCase());

  const roles = ['all', 'Mayor', 'Deacon', 'Witness', 'Refinery', 'Dog', 'Crew', 'Polecat'];

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {roles.map((role) => (
            <button
              key={role}
              onClick={() => setFilter(role)}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded transition-all duration-200 ${
                filter === role
                  ? 'bg-[#ff6b35] text-white shadow-[0_0_15px_rgba(255,107,53,0.4)]'
                  : 'bg-[#1a1b1d] text-[#7a7d87] border border-[#2d2e32] hover:border-[#3f4147]'
              }`}
              style={{ fontFamily: 'Orbitron, monospace' }}
            >
              {role}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded ${viewMode === 'grid' ? 'bg-[#2d2e32]' : 'bg-transparent'}`}
          >
            <svg className="w-4 h-4 text-[#7a7d87]" fill="currentColor" viewBox="0 0 16 16">
              <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5v-3z"/>
            </svg>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded ${viewMode === 'list' ? 'bg-[#2d2e32]' : 'bg-transparent'}`}
          >
            <svg className="w-4 h-4 text-[#7a7d87]" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Worker Grid */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3' : 'space-y-2'}>
        {filteredWorkers.map((worker) => {
          const status = statusConfig[worker.status];
          return (
            <div
              key={worker.id}
              className={`
                relative p-4 rounded-lg border transition-all duration-200 hover:border-[#3f4147] cursor-pointer group
                ${viewMode === 'list' ? 'flex items-center gap-4' : ''}
              `}
              style={{
                background: `linear-gradient(135deg, ${status.bg} 0%, rgba(26,27,29,0.95) 100%)`,
                borderColor: '#2d2e32',
              }}
            >
              {/* Status Indicator */}
              <div
                className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full"
                style={{
                  backgroundColor: status.color,
                  boxShadow: worker.status !== 'offline' ? `0 0 10px ${status.color}` : 'none',
                }}
              />

              {/* Icon & Name */}
              <div className={`flex items-center gap-3 ${viewMode === 'list' ? 'w-40' : 'mb-3'}`}>
                <span className="text-2xl">{worker.icon}</span>
                <div>
                  <p className="text-sm font-semibold text-white" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                    {worker.name}
                  </p>
                  <p className="text-xs text-[#60636c]" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
                    {worker.role}
                  </p>
                </div>
              </div>

              {/* Task Info */}
              {worker.currentTask && (
                <div className={viewMode === 'list' ? 'flex-1' : 'mb-3'}>
                  <p
                    className="text-xs text-[#7a7d87] truncate"
                    style={{ fontFamily: 'Share Tech Mono, monospace' }}
                    title={worker.currentTask}
                  >
                    {worker.currentTask}
                  </p>
                </div>
              )}

              {/* Progress Bar */}
              {worker.progress !== undefined && (
                <div className={viewMode === 'list' ? 'w-32' : 'mb-2'}>
                  <div className="h-1.5 bg-[#1a1b1d] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${worker.progress}%`,
                        background: `linear-gradient(90deg, ${status.color}88 0%, ${status.color} 100%)`,
                        boxShadow: `0 0 10px ${status.color}`,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className={`flex items-center justify-between text-xs ${viewMode === 'list' ? 'w-32' : ''}`}>
                {worker.rig && (
                  <span className="px-2 py-0.5 bg-[#1a1b1d] text-[#60636c] rounded" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
                    {worker.rig}
                  </span>
                )}
                {worker.uptime && (
                  <span className="text-[#4c4e56]" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
                    {worker.uptime}
                  </span>
                )}
              </div>

              {/* Hover Glow */}
              <div
                className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  boxShadow: `inset 0 0 30px ${status.color}11`,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
