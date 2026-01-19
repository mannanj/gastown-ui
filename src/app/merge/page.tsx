'use client';

import { useState } from 'react';

interface MergeRequest {
  id: string;
  branch: string;
  author: { name: string; icon: string; role: string };
  status: 'pending' | 'processing' | 'conflict' | 'merged' | 'failed';
  title: string;
  description: string;
  rig: string;
  filesChanged: number;
  additions: number;
  deletions: number;
  created: string;
  checks: { passed: number; failed: number; pending: number };
}

const mockMRs: MergeRequest[] = [
  { id: 'mr-237', branch: 'feat/gupp-retry-v2', author: { name: 'Polecat-A1', icon: '😺', role: 'Polecat' }, status: 'processing', title: 'Improve GUPP retry mechanism with exponential backoff', description: 'Implements exponential backoff for failed GUPP propagations to prevent thundering herd issues', rig: 'gastown', filesChanged: 4, additions: 156, deletions: 23, created: '15m ago', checks: { passed: 4, failed: 0, pending: 1 } },
  { id: 'mr-236', branch: 'fix/patrol-timeout', author: { name: 'Dog-Patch', icon: '🐶', role: 'Dog' }, status: 'pending', title: 'Fix patrol timeout issue in Deacon loop', description: 'Increases timeout threshold and adds retry logic for patrol cycle failures', rig: 'gastown', filesChanged: 2, additions: 34, deletions: 12, created: '30m ago', checks: { passed: 5, failed: 0, pending: 0 } },
  { id: 'mr-235', branch: 'feat/schema-v3', author: { name: 'Polecat-B1', icon: '😺', role: 'Polecat' }, status: 'conflict', title: 'Database schema migration for v3 fields', description: 'Adds new columns for tracking worker metrics and performance data', rig: 'beads', filesChanged: 8, additions: 245, deletions: 89, created: '1h ago', checks: { passed: 3, failed: 1, pending: 0 } },
  { id: 'mr-234', branch: 'docs/api-endpoints', author: { name: 'Crew-Charlie', icon: '👷', role: 'Crew' }, status: 'pending', title: 'Update API documentation for new endpoints', description: 'Documents the new /api/v2/workers endpoint with examples and schemas', rig: 'wyvern', filesChanged: 3, additions: 89, deletions: 15, created: '2h ago', checks: { passed: 2, failed: 0, pending: 0 } },
  { id: 'mr-233', branch: 'feat/witness-alerts', author: { name: 'Crew-Alpha', icon: '👷', role: 'Crew' }, status: 'merged', title: 'Add Witness alerting system for stuck polecats', description: 'Implements automatic detection and notification for stuck workers', rig: 'gastown', filesChanged: 6, additions: 312, deletions: 45, created: '3h ago', checks: { passed: 5, failed: 0, pending: 0 } },
  { id: 'mr-232', branch: 'fix/memory-leak', author: { name: 'Polecat-C1', icon: '😺', role: 'Polecat' }, status: 'merged', title: 'Fix memory leak in long-running workers', description: 'Properly cleans up event listeners and timers on worker shutdown', rig: 'gastown', filesChanged: 2, additions: 23, deletions: 8, created: '4h ago', checks: { passed: 5, failed: 0, pending: 0 } },
];

const statusConfig = {
  pending: { color: '#60636c', label: 'PENDING', bg: 'rgba(96,99,108,0.15)' },
  processing: { color: '#ff6b35', label: 'PROCESSING', bg: 'rgba(255,107,53,0.15)' },
  conflict: { color: '#ef4444', label: 'CONFLICT', bg: 'rgba(239,68,68,0.15)' },
  merged: { color: '#22c55e', label: 'MERGED', bg: 'rgba(34,197,94,0.15)' },
  failed: { color: '#ef4444', label: 'FAILED', bg: 'rgba(239,68,68,0.15)' },
};

export default function MergePage() {
  const [selectedMR, setSelectedMR] = useState<MergeRequest | null>(mockMRs[0]);
  const [filter, setFilter] = useState('all');

  const filteredMRs = filter === 'all'
    ? mockMRs
    : mockMRs.filter(mr => mr.status === filter);

  const queuedCount = mockMRs.filter(mr => mr.status === 'pending' || mr.status === 'processing').length;

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
            MERGE QUEUE
          </h1>
          <p className="text-sm text-[#60636c]" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
            {queuedCount} in queue • Refinery: <span className="text-[#22c55e]">ACTIVE</span>
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Refinery Status */}
          <div className="flex items-center gap-3 px-4 py-2 bg-[#1a1b1d] border border-[#2d2e32] rounded-lg">
            <span className="text-2xl">🏭</span>
            <div>
              <p className="text-xs text-[#60636c] uppercase" style={{ fontFamily: 'Orbitron, monospace' }}>Refinery</p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#ff6b35] rounded-full animate-pulse shadow-[0_0_10px_rgba(255,107,53,0.6)]" />
                <span className="text-sm text-[#ff6b35] font-semibold" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
                  Processing MR-237
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 mb-4">
        {['all', 'pending', 'processing', 'conflict', 'merged'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded transition-all ${
              filter === f
                ? 'bg-[#ff6b35] text-white shadow-[0_0_15px_rgba(255,107,53,0.4)]'
                : 'bg-[#1a1b1d] text-[#7a7d87] border border-[#2d2e32] hover:border-[#3f4147]'
            }`}
            style={{ fontFamily: 'Orbitron, monospace' }}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex gap-6 min-h-0">
        {/* MR List */}
        <div className="w-96 flex-shrink-0 space-y-2 overflow-y-auto">
          {filteredMRs.map((mr, index) => {
            const status = statusConfig[mr.status];
            return (
              <div
                key={mr.id}
                onClick={() => setSelectedMR(mr)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedMR?.id === mr.id
                    ? 'border-[#ff6b35] shadow-[0_0_20px_rgba(255,107,53,0.2)]'
                    : 'border-[#2d2e32] hover:border-[#3f4147]'
                }`}
                style={{ background: 'linear-gradient(180deg, rgba(26,27,29,0.95) 0%, rgba(13,14,16,0.98) 100%)' }}
              >
                {/* Queue Position for pending/processing */}
                {(mr.status === 'pending' || mr.status === 'processing') && (
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className="text-[10px] uppercase tracking-wider"
                      style={{ fontFamily: 'Orbitron, monospace', color: status.color }}
                    >
                      {mr.status === 'processing' ? '▶ NOW PROCESSING' : `#${index + 1} IN QUEUE`}
                    </span>
                    {mr.status === 'processing' && (
                      <div className="w-4 h-4 border-2 border-[#ff6b35] border-t-transparent rounded-full animate-spin" />
                    )}
                  </div>
                )}

                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-bold text-[#ff6b35]" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
                    {mr.id}
                  </span>
                  <span
                    className="px-1.5 py-0.5 text-[9px] rounded"
                    style={{ fontFamily: 'Orbitron, monospace', color: status.color, background: status.bg }}
                  >
                    {status.label}
                  </span>
                  <span className="px-1.5 py-0.5 text-[9px] bg-[#1a1b1d] text-[#60636c] rounded">
                    {mr.rig}
                  </span>
                </div>

                <p className="text-sm text-[#c4c6cb] mb-2 line-clamp-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  {mr.title}
                </p>

                <div className="flex items-center justify-between text-xs text-[#60636c]" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
                  <div className="flex items-center gap-2">
                    <span>{mr.author.icon}</span>
                    <span>{mr.author.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-green-500">+{mr.additions}</span>
                    <span className="text-red-500">-{mr.deletions}</span>
                  </div>
                </div>

                {/* Progress bar for processing */}
                {mr.status === 'processing' && (
                  <div className="mt-3 h-1 bg-[#1a1b1d] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#ff6b35] to-[#f6b57f] animate-pulse"
                      style={{ width: '65%', boxShadow: '0 0 10px rgba(255,107,53,0.5)' }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* MR Detail */}
        {selectedMR && (
          <div
            className="flex-1 rounded-lg border border-[#2d2e32] overflow-hidden flex flex-col"
            style={{ background: 'linear-gradient(180deg, rgba(26,27,29,0.95) 0%, rgba(13,14,16,0.98) 100%)' }}
          >
            {/* Detail Header */}
            <div className="p-6 border-b border-[#2d2e32]">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <span className="text-xl font-bold text-[#ff6b35]" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
                    {selectedMR.id}
                  </span>
                  <span
                    className="px-2 py-1 text-xs font-bold rounded"
                    style={{
                      fontFamily: 'Orbitron, monospace',
                      color: statusConfig[selectedMR.status].color,
                      background: statusConfig[selectedMR.status].bg,
                    }}
                  >
                    {statusConfig[selectedMR.status].label}
                  </span>
                </div>
                <span className="text-sm text-[#60636c]" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
                  {selectedMR.created}
                </span>
              </div>

              <h2 className="text-xl font-bold text-white mb-2" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                {selectedMR.title}
              </h2>
              <p className="text-sm text-[#7a7d87]" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                {selectedMR.description}
              </p>
            </div>

            {/* Info Grid */}
            <div className="p-6 grid grid-cols-3 gap-4 border-b border-[#2d2e32]">
              <div>
                <p className="text-[10px] text-[#60636c] uppercase mb-2" style={{ fontFamily: 'Orbitron, monospace' }}>Author</p>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{selectedMR.author.icon}</span>
                  <div>
                    <p className="text-sm text-white font-semibold">{selectedMR.author.name}</p>
                    <p className="text-xs text-[#60636c]">{selectedMR.author.role}</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-[10px] text-[#60636c] uppercase mb-2" style={{ fontFamily: 'Orbitron, monospace' }}>Branch</p>
                <p className="text-sm text-[#ff6b35] font-semibold" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
                  {selectedMR.branch}
                </p>
                <p className="text-xs text-[#60636c]">→ main</p>
              </div>
              <div>
                <p className="text-[10px] text-[#60636c] uppercase mb-2" style={{ fontFamily: 'Orbitron, monospace' }}>Changes</p>
                <p className="text-sm text-white font-semibold" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
                  {selectedMR.filesChanged} files
                </p>
                <p className="text-xs">
                  <span className="text-green-500">+{selectedMR.additions}</span>
                  {' '}
                  <span className="text-red-500">-{selectedMR.deletions}</span>
                </p>
              </div>
            </div>

            {/* Checks */}
            <div className="p-6 border-b border-[#2d2e32]">
              <p className="text-[10px] text-[#60636c] uppercase mb-3" style={{ fontFamily: 'Orbitron, monospace' }}>CI Checks</p>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                  <span className="text-sm text-[#9fa2a9]">{selectedMR.checks.passed} passed</span>
                </div>
                {selectedMR.checks.failed > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full" />
                    <span className="text-sm text-red-400">{selectedMR.checks.failed} failed</span>
                  </div>
                )}
                {selectedMR.checks.pending > 0 && (
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" />
                    <span className="text-sm text-yellow-400">{selectedMR.checks.pending} pending</span>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 mt-auto border-t border-[#2d2e32] flex items-center gap-3">
              {selectedMR.status === 'conflict' && (
                <button className="px-4 py-2 text-sm font-semibold uppercase tracking-wider bg-red-500/10 border border-red-500/30 text-red-400 rounded hover:bg-red-500/20 transition-colors" style={{ fontFamily: 'Orbitron, monospace' }}>
                  Resolve Conflict
                </button>
              )}
              {(selectedMR.status === 'pending' || selectedMR.status === 'conflict') && (
                <button className="px-4 py-2 text-sm font-semibold uppercase tracking-wider bg-[#ff6b35]/10 border border-[#ff6b35]/30 text-[#ff6b35] rounded hover:bg-[#ff6b35]/20 transition-colors" style={{ fontFamily: 'Orbitron, monospace' }}>
                  Force Merge
                </button>
              )}
              <button className="px-4 py-2 text-sm font-semibold uppercase tracking-wider bg-[#1a1b1d] border border-[#2d2e32] text-[#9fa2a9] rounded hover:border-[#3f4147] transition-colors" style={{ fontFamily: 'Orbitron, monospace' }}>
                View Diff
              </button>
              <button className="px-4 py-2 text-sm font-semibold uppercase tracking-wider bg-[#1a1b1d] border border-[#2d2e32] text-[#9fa2a9] rounded hover:border-[#3f4147] transition-colors" style={{ fontFamily: 'Orbitron, monospace' }}>
                Requeue
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
