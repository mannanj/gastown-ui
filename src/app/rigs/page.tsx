'use client';

import { useState } from 'react';

interface Rig {
  id: string;
  name: string;
  path: string;
  status: 'active' | 'idle' | 'syncing' | 'error';
  branch: string;
  workers: { total: number; active: number };
  beads: { open: number; inProgress: number; completed: number };
  health: number;
  lastSync: string;
  commits: number;
  mergestoday: number;
}

const mockRigs: Rig[] = [
  { id: 'gastown', name: 'gastown', path: '~/gt/gastown', status: 'active', branch: 'main', workers: { total: 8, active: 6 }, beads: { open: 5, inProgress: 7, completed: 34 }, health: 94, lastSync: '2m ago', commits: 1247, mergestoday: 12 },
  { id: 'beads', name: 'beads', path: '~/gt/beads', status: 'active', branch: 'develop', workers: { total: 5, active: 3 }, beads: { open: 3, inProgress: 4, completed: 28 }, health: 88, lastSync: '5m ago', commits: 892, mergestoday: 7 },
  { id: 'wyvern', name: 'wyvern', path: '~/gt/wyvern', status: 'syncing', branch: 'feat/api-v2', workers: { total: 3, active: 2 }, beads: { open: 2, inProgress: 2, completed: 15 }, health: 72, lastSync: '12m ago', commits: 456, mergestoday: 3 },
  { id: 'efrit', name: 'efrit', path: '~/gt/efrit', status: 'idle', branch: 'main', workers: { total: 0, active: 0 }, beads: { open: 2, inProgress: 0, completed: 8 }, health: 100, lastSync: '1h ago', commits: 234, mergestoday: 0 },
];

const statusConfig = {
  active: { color: '#22c55e', label: 'ACTIVE', icon: '●' },
  idle: { color: '#60636c', label: 'IDLE', icon: '○' },
  syncing: { color: '#ff6b35', label: 'SYNCING', icon: '◐' },
  error: { color: '#ef4444', label: 'ERROR', icon: '✕' },
};

export default function RigsPage() {
  const [selectedRig, setSelectedRig] = useState<Rig | null>(mockRigs[0]);

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
            RIG MANAGEMENT
          </h1>
          <p className="text-sm text-[#60636c]" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
            {mockRigs.length} rigs configured • {mockRigs.filter(r => r.status === 'active').length} active
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
          + Add Rig
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex gap-6 min-h-0">
        {/* Rig List */}
        <div className="w-80 flex-shrink-0 space-y-3 overflow-y-auto">
          {mockRigs.map((rig) => {
            const status = statusConfig[rig.status];
            return (
              <div
                key={rig.id}
                onClick={() => setSelectedRig(rig)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedRig?.id === rig.id
                    ? 'border-[#ff6b35] shadow-[0_0_20px_rgba(255,107,53,0.2)]'
                    : 'border-[#2d2e32] hover:border-[#3f4147]'
                }`}
                style={{ background: 'linear-gradient(180deg, rgba(26,27,29,0.95) 0%, rgba(13,14,16,0.98) 100%)' }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">🏗️</span>
                    <span className="text-lg font-bold text-white" style={{ fontFamily: 'Orbitron, monospace' }}>
                      {rig.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span style={{ color: status.color }}>{status.icon}</span>
                    <span
                      className="text-[10px] font-semibold uppercase"
                      style={{ fontFamily: 'Orbitron, monospace', color: status.color }}
                    >
                      {status.label}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#60636c] mb-3" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
                  {rig.path} • <span className="text-[#7a7d87]">{rig.branch}</span>
                </p>

                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#9fa2a9]">
                    <span className="text-[#ff6b35]">{rig.workers.active}</span>/{rig.workers.total} workers
                  </span>
                  <span className="text-[#9fa2a9]">
                    <span className="text-[#ff6b35]">{rig.beads.inProgress}</span> in progress
                  </span>
                </div>

                {/* Health Bar */}
                <div className="mt-3">
                  <div className="h-1 bg-[#1a1b1d] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${rig.health}%`,
                        background: rig.health > 80
                          ? 'linear-gradient(90deg, #22c55e 0%, #4ade80 100%)'
                          : rig.health > 50
                          ? 'linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%)'
                          : 'linear-gradient(90deg, #ef4444 0%, #f87171 100%)',
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Rig Detail */}
        {selectedRig && (
          <div
            className="flex-1 rounded-lg border border-[#2d2e32] overflow-hidden"
            style={{ background: 'linear-gradient(180deg, rgba(26,27,29,0.95) 0%, rgba(13,14,16,0.98) 100%)' }}
          >
            {/* Detail Header */}
            <div className="p-6 border-b border-[#2d2e32]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,107,53,0.2) 0%, rgba(255,107,53,0.05) 100%)',
                      border: '1px solid rgba(255,107,53,0.3)',
                    }}
                  >
                    🏗️
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white" style={{ fontFamily: 'Orbitron, monospace' }}>
                      {selectedRig.name}
                    </h2>
                    <p className="text-sm text-[#60636c]" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
                      {selectedRig.path}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button className="px-4 py-2 text-sm font-semibold uppercase tracking-wider bg-[#1a1b1d] border border-[#2d2e32] text-[#9fa2a9] rounded hover:border-[#3f4147] transition-colors" style={{ fontFamily: 'Orbitron, monospace' }}>
                    Sync
                  </button>
                  <button className="px-4 py-2 text-sm font-semibold uppercase tracking-wider bg-[#1a1b1d] border border-[#2d2e32] text-[#9fa2a9] rounded hover:border-[#3f4147] transition-colors" style={{ fontFamily: 'Orbitron, monospace' }}>
                    Configure
                  </button>
                </div>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="p-6 grid grid-cols-4 gap-4 border-b border-[#2d2e32]">
              <div className="p-4 bg-[#1a1b1d] rounded-lg">
                <p className="text-[10px] text-[#60636c] uppercase mb-1" style={{ fontFamily: 'Orbitron, monospace' }}>Health</p>
                <p className="text-3xl font-bold" style={{
                  fontFamily: 'Orbitron, monospace',
                  color: selectedRig.health > 80 ? '#22c55e' : selectedRig.health > 50 ? '#f59e0b' : '#ef4444',
                }}>
                  {selectedRig.health}%
                </p>
              </div>
              <div className="p-4 bg-[#1a1b1d] rounded-lg">
                <p className="text-[10px] text-[#60636c] uppercase mb-1" style={{ fontFamily: 'Orbitron, monospace' }}>Workers</p>
                <p className="text-3xl font-bold text-white" style={{ fontFamily: 'Orbitron, monospace' }}>
                  <span className="text-[#ff6b35]">{selectedRig.workers.active}</span>
                  <span className="text-lg text-[#60636c]">/{selectedRig.workers.total}</span>
                </p>
              </div>
              <div className="p-4 bg-[#1a1b1d] rounded-lg">
                <p className="text-[10px] text-[#60636c] uppercase mb-1" style={{ fontFamily: 'Orbitron, monospace' }}>Open Beads</p>
                <p className="text-3xl font-bold text-[#3b82f6]" style={{ fontFamily: 'Orbitron, monospace' }}>
                  {selectedRig.beads.open + selectedRig.beads.inProgress}
                </p>
              </div>
              <div className="p-4 bg-[#1a1b1d] rounded-lg">
                <p className="text-[10px] text-[#60636c] uppercase mb-1" style={{ fontFamily: 'Orbitron, monospace' }}>Merges Today</p>
                <p className="text-3xl font-bold text-[#22c55e]" style={{ fontFamily: 'Orbitron, monospace' }}>
                  {selectedRig.mergestoday}
                </p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="p-6 grid grid-cols-2 gap-6">
              {/* Git Info */}
              <div>
                <h3 className="text-sm font-semibold text-[#9fa2a9] uppercase tracking-widest mb-4" style={{ fontFamily: 'Orbitron, monospace' }}>
                  Git Information
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-[#1a1b1d] rounded">
                    <span className="text-xs text-[#60636c]" style={{ fontFamily: 'Orbitron, monospace' }}>BRANCH</span>
                    <span className="text-sm text-white font-semibold" style={{ fontFamily: 'Share Tech Mono, monospace' }}>{selectedRig.branch}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#1a1b1d] rounded">
                    <span className="text-xs text-[#60636c]" style={{ fontFamily: 'Orbitron, monospace' }}>COMMITS</span>
                    <span className="text-sm text-white font-semibold" style={{ fontFamily: 'Share Tech Mono, monospace' }}>{selectedRig.commits.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#1a1b1d] rounded">
                    <span className="text-xs text-[#60636c]" style={{ fontFamily: 'Orbitron, monospace' }}>LAST SYNC</span>
                    <span className="text-sm text-white font-semibold" style={{ fontFamily: 'Share Tech Mono, monospace' }}>{selectedRig.lastSync}</span>
                  </div>
                </div>
              </div>

              {/* Beads Summary */}
              <div>
                <h3 className="text-sm font-semibold text-[#9fa2a9] uppercase tracking-widest mb-4" style={{ fontFamily: 'Orbitron, monospace' }}>
                  Beads Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-[#1a1b1d] rounded">
                    <span className="text-xs text-[#60636c]" style={{ fontFamily: 'Orbitron, monospace' }}>OPEN</span>
                    <span className="text-sm text-[#60636c] font-semibold" style={{ fontFamily: 'Share Tech Mono, monospace' }}>{selectedRig.beads.open}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#1a1b1d] rounded">
                    <span className="text-xs text-[#3b82f6]" style={{ fontFamily: 'Orbitron, monospace' }}>IN PROGRESS</span>
                    <span className="text-sm text-[#3b82f6] font-semibold" style={{ fontFamily: 'Share Tech Mono, monospace' }}>{selectedRig.beads.inProgress}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-[#1a1b1d] rounded">
                    <span className="text-xs text-[#22c55e]" style={{ fontFamily: 'Orbitron, monospace' }}>COMPLETED</span>
                    <span className="text-sm text-[#22c55e] font-semibold" style={{ fontFamily: 'Share Tech Mono, monospace' }}>{selectedRig.beads.completed}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
