'use client';

import { useState } from 'react';

interface Bead {
  id: string;
  title: string;
  description: string;
  status: 'open' | 'in_progress' | 'review' | 'merged' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignee?: { name: string; icon: string };
  rig: string;
  created: string;
  updated: string;
  labels: string[];
}

const mockBeads: Bead[] = [
  { id: 'gt-892', title: 'Add retry logic to GUPP handler', description: 'Implement exponential backoff for failed GUPP propagations', status: 'in_progress', priority: 'high', assignee: { name: 'Polecat-A1', icon: '😺' }, rig: 'gastown', created: '2h ago', updated: '15m ago', labels: ['enhancement', 'gupp'] },
  { id: 'gt-893', title: 'Fix merge conflict in worker spawn', description: 'Race condition when spawning multiple polecats simultaneously', status: 'review', priority: 'critical', assignee: { name: 'Polecat-A2', icon: '😺' }, rig: 'gastown', created: '4h ago', updated: '30m ago', labels: ['bug', 'concurrency'] },
  { id: 'bd-446', title: 'Update schema for v3 fields', description: 'Add new columns for tracking worker metrics', status: 'in_progress', priority: 'medium', assignee: { name: 'Polecat-B1', icon: '😺' }, rig: 'beads', created: '1d ago', updated: '1h ago', labels: ['database', 'migration'] },
  { id: 'bd-447', title: 'Fix test failures in bead router', description: 'Integration tests failing after route changes', status: 'in_progress', priority: 'high', assignee: { name: 'Polecat-B2', icon: '😺' }, rig: 'beads', created: '6h ago', updated: '45m ago', labels: ['bug', 'tests'] },
  { id: 'wy-123', title: 'Implement new API endpoint', description: 'Add /api/v2/workers endpoint with filtering', status: 'in_progress', priority: 'medium', assignee: { name: 'Polecat-C1', icon: '😺' }, rig: 'wyvern', created: '3h ago', updated: '20m ago', labels: ['api', 'feature'] },
  { id: 'gt-890', title: 'Refactor Mayor orchestration logic', description: 'Clean up convoy management code', status: 'open', priority: 'low', rig: 'gastown', created: '2d ago', updated: '1d ago', labels: ['refactor'] },
  { id: 'gt-888', title: 'Add Deacon health monitoring', description: 'Implement heartbeat tracking for patrol cycles', status: 'open', priority: 'medium', rig: 'gastown', created: '3d ago', updated: '2d ago', labels: ['monitoring', 'deacon'] },
  { id: 'bd-445', title: 'Optimize bead query performance', description: 'Add indexes and caching for common queries', status: 'merged', priority: 'high', assignee: { name: 'Crew-Charlie', icon: '👷' }, rig: 'beads', created: '5d ago', updated: '1d ago', labels: ['performance', 'database'] },
];

const statusConfig = {
  open: { color: '#60636c', label: 'OPEN', bg: 'rgba(96,99,108,0.15)' },
  in_progress: { color: '#3b82f6', label: 'IN PROGRESS', bg: 'rgba(59,130,246,0.15)' },
  review: { color: '#f59e0b', label: 'IN REVIEW', bg: 'rgba(245,158,11,0.15)' },
  merged: { color: '#22c55e', label: 'MERGED', bg: 'rgba(34,197,94,0.15)' },
  closed: { color: '#6b7280', label: 'CLOSED', bg: 'rgba(107,114,128,0.15)' },
};

const priorityConfig = {
  low: { color: '#6b7280', label: 'LOW' },
  medium: { color: '#3b82f6', label: 'MED' },
  high: { color: '#f59e0b', label: 'HIGH' },
  critical: { color: '#ef4444', label: 'CRIT' },
};

export default function BeadsPage() {
  const [filter, setFilter] = useState('all');
  const [rigFilter, setRigFilter] = useState('all');

  const filteredBeads = mockBeads.filter(bead => {
    if (filter !== 'all' && bead.status !== filter) return false;
    if (rigFilter !== 'all' && bead.rig !== rigFilter) return false;
    return true;
  });

  return (
    <div className="p-6 space-y-6 pb-16">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-2xl font-bold tracking-wider mb-1"
            style={{
              fontFamily: 'Orbitron, monospace',
              color: '#ff6b35',
              textShadow: '0 0 20px rgba(255,107,53,0.3)',
            }}
          >
            WORK QUEUE
          </h1>
          <p className="text-sm text-[#60636c]" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
            {filteredBeads.length} beads • {filteredBeads.filter(b => b.status === 'in_progress').length} in progress
          </p>
        </div>

        <button
          className="px-4 py-2 text-sm font-semibold uppercase tracking-wider rounded transition-all duration-200"
          style={{
            fontFamily: 'Orbitron, monospace',
            background: 'linear-gradient(135deg, rgba(255,107,53,0.2) 0%, rgba(255,107,53,0.1) 100%)',
            border: '1px solid rgba(255,107,53,0.4)',
            color: '#ff6b35',
          }}
        >
          + Create Bead
        </button>
      </div>

      {/* Filters */}
      <div
        className="flex items-center gap-4 p-4 rounded-lg border border-[#2d2e32]"
        style={{ background: 'rgba(26,27,29,0.95)' }}
      >
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#60636c] uppercase" style={{ fontFamily: 'Orbitron, monospace' }}>Status:</span>
          {['all', 'open', 'in_progress', 'review', 'merged'].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1 text-xs rounded transition-all ${
                filter === s
                  ? 'bg-[#ff6b35] text-white'
                  : 'bg-[#1a1b1d] text-[#7a7d87] border border-[#2d2e32] hover:border-[#3f4147]'
              }`}
              style={{ fontFamily: 'Share Tech Mono, monospace' }}
            >
              {s === 'all' ? 'ALL' : s.toUpperCase().replace('_', ' ')}
            </button>
          ))}
        </div>

        <div className="w-px h-6 bg-[#2d2e32]" />

        <div className="flex items-center gap-2">
          <span className="text-xs text-[#60636c] uppercase" style={{ fontFamily: 'Orbitron, monospace' }}>Rig:</span>
          {['all', 'gastown', 'beads', 'wyvern'].map((r) => (
            <button
              key={r}
              onClick={() => setRigFilter(r)}
              className={`px-3 py-1 text-xs rounded transition-all ${
                rigFilter === r
                  ? 'bg-[#ff6b35] text-white'
                  : 'bg-[#1a1b1d] text-[#7a7d87] border border-[#2d2e32] hover:border-[#3f4147]'
              }`}
              style={{ fontFamily: 'Share Tech Mono, monospace' }}
            >
              {r.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Beads Table */}
      <div
        className="rounded-lg border border-[#2d2e32] overflow-hidden"
        style={{ background: 'linear-gradient(180deg, rgba(26,27,29,0.95) 0%, rgba(13,14,16,0.98) 100%)' }}
      >
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-[#2d2e32] bg-[#1a1b1d]/50">
          <div className="col-span-1 text-xs text-[#60636c] uppercase" style={{ fontFamily: 'Orbitron, monospace' }}>ID</div>
          <div className="col-span-4 text-xs text-[#60636c] uppercase" style={{ fontFamily: 'Orbitron, monospace' }}>Title</div>
          <div className="col-span-1 text-xs text-[#60636c] uppercase" style={{ fontFamily: 'Orbitron, monospace' }}>Status</div>
          <div className="col-span-1 text-xs text-[#60636c] uppercase" style={{ fontFamily: 'Orbitron, monospace' }}>Priority</div>
          <div className="col-span-2 text-xs text-[#60636c] uppercase" style={{ fontFamily: 'Orbitron, monospace' }}>Assignee</div>
          <div className="col-span-1 text-xs text-[#60636c] uppercase" style={{ fontFamily: 'Orbitron, monospace' }}>Rig</div>
          <div className="col-span-2 text-xs text-[#60636c] uppercase" style={{ fontFamily: 'Orbitron, monospace' }}>Updated</div>
        </div>

        {/* Table Body */}
        {filteredBeads.map((bead) => {
          const status = statusConfig[bead.status];
          const priority = priorityConfig[bead.priority];
          return (
            <div
              key={bead.id}
              className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-[#1a1b1d] hover:bg-[#1a1b1d]/50 transition-colors cursor-pointer group"
            >
              <div className="col-span-1">
                <span className="text-sm text-[#ff6b35] font-semibold" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
                  {bead.id}
                </span>
              </div>
              <div className="col-span-4">
                <p className="text-sm text-[#c4c6cb] truncate group-hover:text-white transition-colors" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  {bead.title}
                </p>
                <div className="flex gap-1 mt-1">
                  {bead.labels.map((label) => (
                    <span key={label} className="px-1.5 py-0.5 text-[10px] bg-[#1a1b1d] text-[#60636c] rounded">
                      {label}
                    </span>
                  ))}
                </div>
              </div>
              <div className="col-span-1">
                <span
                  className="px-2 py-0.5 text-[10px] font-bold rounded uppercase"
                  style={{ fontFamily: 'Orbitron, monospace', color: status.color, background: status.bg }}
                >
                  {status.label}
                </span>
              </div>
              <div className="col-span-1">
                <span
                  className="px-2 py-0.5 text-[10px] font-bold rounded"
                  style={{ fontFamily: 'Orbitron, monospace', color: priority.color, background: `${priority.color}15` }}
                >
                  {priority.label}
                </span>
              </div>
              <div className="col-span-2">
                {bead.assignee ? (
                  <div className="flex items-center gap-2">
                    <span>{bead.assignee.icon}</span>
                    <span className="text-sm text-[#9fa2a9]" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                      {bead.assignee.name}
                    </span>
                  </div>
                ) : (
                  <span className="text-sm text-[#4c4e56]">Unassigned</span>
                )}
              </div>
              <div className="col-span-1">
                <span className="px-2 py-0.5 text-xs bg-[#1a1b1d] text-[#60636c] rounded" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
                  {bead.rig}
                </span>
              </div>
              <div className="col-span-2 text-sm text-[#60636c]" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
                {bead.updated}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
