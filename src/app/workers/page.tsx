'use client';

import { useState } from 'react';

interface Worker {
  id: string;
  name: string;
  role: 'Mayor' | 'Deacon' | 'Witness' | 'Refinery' | 'Dog' | 'Crew' | 'Polecat';
  icon: string;
  status: 'idle' | 'working' | 'merging' | 'stuck' | 'offline';
  currentTask?: string;
  rig?: string;
  progress?: number;
  uptime: string;
  tasksCompleted: number;
  tokensUsed: string;
  lastMessage?: string;
}

const mockWorkers: Worker[] = [
  { id: 'mayor-1', name: 'Mayor', role: 'Mayor', icon: '🎩', status: 'working', currentTask: 'Orchestrating convoy BK-127', rig: 'gastown', progress: 45, uptime: '4h 23m', tasksCompleted: 12, tokensUsed: '245K', lastMessage: 'Convoy initiated with 4 polecats' },
  { id: 'deacon-1', name: 'Deacon', role: 'Deacon', icon: '🐺', status: 'working', currentTask: 'Running patrol cycle #847', rig: 'town', progress: 72, uptime: '12h 05m', tasksCompleted: 847, tokensUsed: '890K', lastMessage: 'All systems nominal' },
  { id: 'witness-1', name: 'Witness', role: 'Witness', icon: '🦉', status: 'idle', currentTask: 'Monitoring polecats', rig: 'beads', uptime: '8h 12m', tasksCompleted: 34, tokensUsed: '156K', lastMessage: 'Polecat-B2 flagged for attention' },
  { id: 'refinery-1', name: 'Refinery', role: 'Refinery', icon: '🏭', status: 'merging', currentTask: 'Processing MR #234', rig: 'gastown', progress: 88, uptime: '6h 45m', tasksCompleted: 23, tokensUsed: '312K', lastMessage: '3 MRs in queue' },
  { id: 'dog-1', name: 'Scout', role: 'Dog', icon: '🐶', status: 'working', currentTask: 'Cleanup stale branches', rig: 'town', progress: 23, uptime: '2h 10m', tasksCompleted: 8, tokensUsed: '45K', lastMessage: 'Found 23 stale branches' },
  { id: 'dog-2', name: 'Boot', role: 'Dog', icon: '🐶', status: 'idle', currentTask: 'Checking on Deacon', rig: 'town', uptime: '12h 05m', tasksCompleted: 144, tokensUsed: '67K', lastMessage: 'Deacon healthy' },
  { id: 'dog-3', name: 'Patch', role: 'Dog', icon: '🐶', status: 'working', currentTask: 'Running plugin: lint-fix', rig: 'wyvern', progress: 56, uptime: '1h 32m', tasksCompleted: 5, tokensUsed: '34K', lastMessage: 'Plugin executing' },
  { id: 'crew-1', name: 'Alpha', role: 'Crew', icon: '👷', status: 'working', currentTask: 'Design: Auth flow refactor', rig: 'gastown', progress: 67, uptime: '3h 45m', tasksCompleted: 7, tokensUsed: '189K', lastMessage: 'Design 67% complete' },
  { id: 'crew-2', name: 'Bravo', role: 'Crew', icon: '👷', status: 'idle', rig: 'beads', uptime: '5h 20m', tasksCompleted: 11, tokensUsed: '234K', lastMessage: 'Awaiting assignment' },
  { id: 'crew-3', name: 'Charlie', role: 'Crew', icon: '👷', status: 'working', currentTask: 'Implementing bd-445', rig: 'beads', progress: 34, uptime: '2h 15m', tasksCompleted: 4, tokensUsed: '98K', lastMessage: 'Working on query optimization' },
  { id: 'polecat-1', name: 'Polecat-A1', role: 'Polecat', icon: '😺', status: 'working', currentTask: 'gt-892: Add retry logic', rig: 'gastown', progress: 89, uptime: '45m', tasksCompleted: 1, tokensUsed: '23K', lastMessage: 'Almost done' },
  { id: 'polecat-2', name: 'Polecat-A2', role: 'Polecat', icon: '😺', status: 'merging', currentTask: 'gt-893: Fix merge conflict', rig: 'gastown', progress: 95, uptime: '38m', tasksCompleted: 1, tokensUsed: '19K', lastMessage: 'Submitting MR' },
  { id: 'polecat-3', name: 'Polecat-B1', role: 'Polecat', icon: '😺', status: 'working', currentTask: 'bd-446: Update schema', rig: 'beads', progress: 22, uptime: '12m', tasksCompleted: 0, tokensUsed: '8K', lastMessage: 'Starting implementation' },
  { id: 'polecat-4', name: 'Polecat-B2', role: 'Polecat', icon: '😺', status: 'stuck', currentTask: 'bd-447: Test failing', rig: 'beads', progress: 67, uptime: '52m', tasksCompleted: 0, tokensUsed: '31K', lastMessage: 'Tests failing, need help' },
  { id: 'polecat-5', name: 'Polecat-C1', role: 'Polecat', icon: '😺', status: 'working', currentTask: 'wy-123: API endpoint', rig: 'wyvern', progress: 45, uptime: '28m', tasksCompleted: 0, tokensUsed: '15K', lastMessage: 'Implementing endpoint' },
];

const roleConfig = {
  Mayor: { color: '#ffd700', description: 'Chief orchestrator and concierge' },
  Deacon: { color: '#8b5cf6', description: 'Daemon beacon running patrols' },
  Witness: { color: '#06b6d4', description: 'Polecat supervisor and unsticker' },
  Refinery: { color: '#ff6b35', description: 'Merge queue processor' },
  Dog: { color: '#84cc16', description: 'Deacon helpers for maintenance' },
  Crew: { color: '#3b82f6', description: 'Long-lived coding agents' },
  Polecat: { color: '#f59e0b', description: 'Ephemeral swarm workers' },
};

const statusConfig = {
  idle: { color: '#60636c', label: 'IDLE' },
  working: { color: '#22c55e', label: 'WORKING' },
  merging: { color: '#ff6b35', label: 'MERGING' },
  stuck: { color: '#ef4444', label: 'STUCK' },
  offline: { color: '#3f4147', label: 'OFFLINE' },
};

export default function WorkersPage() {
  const [selectedWorker, setSelectedWorker] = useState<Worker | null>(null);
  const [roleFilter, setRoleFilter] = useState<string>('all');

  const filteredWorkers = roleFilter === 'all'
    ? mockWorkers
    : mockWorkers.filter(w => w.role === roleFilter);

  const roles = ['all', 'Mayor', 'Deacon', 'Witness', 'Refinery', 'Dog', 'Crew', 'Polecat'];

  return (
    <div className="p-6 h-[calc(100vh-3.5rem)] flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1
            className="text-2xl font-bold tracking-wider mb-1"
            style={{
              fontFamily: 'Orbitron, monospace',
              color: '#ff6b35',
              textShadow: '0 0 20px rgba(255,107,53,0.3)',
            }}
          >
            WORKER FLEET
          </h1>
          <p className="text-sm text-[#60636c]" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
            {mockWorkers.filter(w => w.status !== 'offline').length} online • {mockWorkers.filter(w => w.status === 'working' || w.status === 'merging').length} active
          </p>
        </div>

        <div className="flex gap-3">
          <button
            className="px-4 py-2 text-sm font-semibold uppercase tracking-wider rounded transition-all duration-200"
            style={{
              fontFamily: 'Orbitron, monospace',
              background: 'linear-gradient(135deg, rgba(255,107,53,0.2) 0%, rgba(255,107,53,0.1) 100%)',
              border: '1px solid rgba(255,107,53,0.4)',
              color: '#ff6b35',
            }}
          >
            + Spawn Worker
          </button>
        </div>
      </div>

      {/* Role Filter */}
      <div className="flex items-center gap-2 mb-4">
        {roles.map((role) => {
          const config = role !== 'all' ? roleConfig[role as keyof typeof roleConfig] : null;
          return (
            <button
              key={role}
              onClick={() => setRoleFilter(role)}
              className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded transition-all ${
                roleFilter === role
                  ? 'text-white shadow-lg'
                  : 'bg-[#1a1b1d] text-[#7a7d87] border border-[#2d2e32] hover:border-[#3f4147]'
              }`}
              style={{
                fontFamily: 'Orbitron, monospace',
                ...(roleFilter === role && config ? { backgroundColor: config.color, boxShadow: `0 0 15px ${config.color}40` } : {}),
                ...(roleFilter === role && !config ? { backgroundColor: '#ff6b35', boxShadow: '0 0 15px rgba(255,107,53,0.4)' } : {}),
              }}
            >
              {role}
            </button>
          );
        })}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex gap-4 min-h-0">
        {/* Worker List */}
        <div
          className="flex-1 rounded-lg border border-[#2d2e32] overflow-hidden"
          style={{ background: 'linear-gradient(180deg, rgba(26,27,29,0.95) 0%, rgba(13,14,16,0.98) 100%)' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4 overflow-y-auto h-full">
            {filteredWorkers.map((worker) => {
              const role = roleConfig[worker.role];
              const status = statusConfig[worker.status];
              return (
                <div
                  key={worker.id}
                  onClick={() => setSelectedWorker(worker)}
                  className={`p-4 rounded-lg border transition-all cursor-pointer ${
                    selectedWorker?.id === worker.id
                      ? 'border-[#ff6b35] shadow-[0_0_20px_rgba(255,107,53,0.2)]'
                      : 'border-[#2d2e32] hover:border-[#3f4147]'
                  }`}
                  style={{ background: 'rgba(26,27,29,0.8)' }}
                >
                  {/* Header */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{worker.icon}</span>
                      <div>
                        <p className="text-sm font-semibold text-white" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                          {worker.name}
                        </p>
                        <p className="text-xs" style={{ fontFamily: 'Share Tech Mono, monospace', color: role.color }}>
                          {worker.role}
                        </p>
                      </div>
                    </div>
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: status.color,
                        boxShadow: worker.status !== 'offline' ? `0 0 10px ${status.color}` : 'none',
                      }}
                    />
                  </div>

                  {/* Task */}
                  {worker.currentTask && (
                    <p className="text-xs text-[#7a7d87] mb-2 truncate" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
                      {worker.currentTask}
                    </p>
                  )}

                  {/* Progress */}
                  {worker.progress !== undefined && (
                    <div className="mb-2">
                      <div className="h-1.5 bg-[#1a1b1d] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${worker.progress}%`,
                            background: `linear-gradient(90deg, ${status.color}88 0%, ${status.color} 100%)`,
                            boxShadow: `0 0 10px ${status.color}`,
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Stats */}
                  <div className="flex items-center justify-between text-[10px] text-[#60636c]" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
                    <span>{worker.uptime}</span>
                    {worker.rig && (
                      <span className="px-1.5 py-0.5 bg-[#1a1b1d] rounded">{worker.rig}</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Worker Detail Panel */}
        {selectedWorker && (
          <div
            className="w-80 rounded-lg border border-[#2d2e32] overflow-hidden flex-shrink-0"
            style={{ background: 'linear-gradient(180deg, rgba(26,27,29,0.95) 0%, rgba(13,14,16,0.98) 100%)' }}
          >
            <div className="p-4 border-b border-[#2d2e32]">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-4xl">{selectedWorker.icon}</span>
                <div>
                  <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'Orbitron, monospace' }}>
                    {selectedWorker.name}
                  </h3>
                  <p className="text-sm" style={{ color: roleConfig[selectedWorker.role].color, fontFamily: 'Share Tech Mono, monospace' }}>
                    {selectedWorker.role}
                  </p>
                </div>
              </div>
              <p className="text-xs text-[#7a7d87]" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                {roleConfig[selectedWorker.role].description}
              </p>
            </div>

            <div className="p-4 space-y-4">
              {/* Status */}
              <div>
                <p className="text-[10px] text-[#60636c] uppercase mb-1" style={{ fontFamily: 'Orbitron, monospace' }}>Status</p>
                <span
                  className="px-2 py-1 text-xs font-bold rounded"
                  style={{
                    color: statusConfig[selectedWorker.status].color,
                    background: `${statusConfig[selectedWorker.status].color}15`,
                    fontFamily: 'Orbitron, monospace',
                  }}
                >
                  {statusConfig[selectedWorker.status].label}
                </span>
              </div>

              {/* Current Task */}
              {selectedWorker.currentTask && (
                <div>
                  <p className="text-[10px] text-[#60636c] uppercase mb-1" style={{ fontFamily: 'Orbitron, monospace' }}>Current Task</p>
                  <p className="text-sm text-[#c4c6cb]" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
                    {selectedWorker.currentTask}
                  </p>
                </div>
              )}

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-2 bg-[#1a1b1d] rounded">
                  <p className="text-[10px] text-[#60636c] uppercase" style={{ fontFamily: 'Orbitron, monospace' }}>Uptime</p>
                  <p className="text-sm text-white font-semibold" style={{ fontFamily: 'Share Tech Mono, monospace' }}>{selectedWorker.uptime}</p>
                </div>
                <div className="p-2 bg-[#1a1b1d] rounded">
                  <p className="text-[10px] text-[#60636c] uppercase" style={{ fontFamily: 'Orbitron, monospace' }}>Tasks</p>
                  <p className="text-sm text-white font-semibold" style={{ fontFamily: 'Share Tech Mono, monospace' }}>{selectedWorker.tasksCompleted}</p>
                </div>
                <div className="p-2 bg-[#1a1b1d] rounded">
                  <p className="text-[10px] text-[#60636c] uppercase" style={{ fontFamily: 'Orbitron, monospace' }}>Tokens</p>
                  <p className="text-sm text-[#ff6b35] font-semibold" style={{ fontFamily: 'Share Tech Mono, monospace' }}>{selectedWorker.tokensUsed}</p>
                </div>
                <div className="p-2 bg-[#1a1b1d] rounded">
                  <p className="text-[10px] text-[#60636c] uppercase" style={{ fontFamily: 'Orbitron, monospace' }}>Rig</p>
                  <p className="text-sm text-white font-semibold" style={{ fontFamily: 'Share Tech Mono, monospace' }}>{selectedWorker.rig || 'N/A'}</p>
                </div>
              </div>

              {/* Last Message */}
              {selectedWorker.lastMessage && (
                <div>
                  <p className="text-[10px] text-[#60636c] uppercase mb-1" style={{ fontFamily: 'Orbitron, monospace' }}>Last Message</p>
                  <p className="text-sm text-[#9fa2a9] italic" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
                    "{selectedWorker.lastMessage}"
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <button className="flex-1 px-3 py-2 text-xs font-semibold uppercase tracking-wider bg-[#ff6b35]/10 border border-[#ff6b35]/30 text-[#ff6b35] rounded hover:bg-[#ff6b35]/20 transition-colors" style={{ fontFamily: 'Orbitron, monospace' }}>
                  Message
                </button>
                <button className="flex-1 px-3 py-2 text-xs font-semibold uppercase tracking-wider bg-[#1a1b1d] border border-[#2d2e32] text-[#9fa2a9] rounded hover:border-[#3f4147] transition-colors" style={{ fontFamily: 'Orbitron, monospace' }}>
                  Restart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
