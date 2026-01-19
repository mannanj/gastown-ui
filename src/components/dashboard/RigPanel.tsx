'use client';

interface Rig {
  id: string;
  name: string;
  path: string;
  status: 'active' | 'idle' | 'syncing';
  workers: number;
  openBeads: number;
  branch: string;
  lastActivity: string;
  health: number;
}

const mockRigs: Rig[] = [
  {
    id: 'gastown',
    name: 'gastown',
    path: '~/gt/gastown',
    status: 'active',
    workers: 8,
    openBeads: 12,
    branch: 'main',
    lastActivity: '2m ago',
    health: 94,
  },
  {
    id: 'beads',
    name: 'beads',
    path: '~/gt/beads',
    status: 'active',
    workers: 5,
    openBeads: 7,
    branch: 'develop',
    lastActivity: '5m ago',
    health: 88,
  },
  {
    id: 'wyvern',
    name: 'wyvern',
    path: '~/gt/wyvern',
    status: 'syncing',
    workers: 3,
    openBeads: 4,
    branch: 'feat/api-v2',
    lastActivity: '12m ago',
    health: 72,
  },
  {
    id: 'efrit',
    name: 'efrit',
    path: '~/gt/efrit',
    status: 'idle',
    workers: 0,
    openBeads: 2,
    branch: 'main',
    lastActivity: '1h ago',
    health: 100,
  },
];

const statusConfig = {
  active: { color: '#22c55e', label: 'ACTIVE' },
  idle: { color: '#60636c', label: 'IDLE' },
  syncing: { color: '#ff6b35', label: 'SYNCING' },
};

export default function RigPanel() {
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
          <span className="text-xl">🏗️</span>
          <h3
            className="text-sm font-semibold text-[#9fa2a9] uppercase tracking-widest"
            style={{ fontFamily: 'Orbitron, monospace' }}
          >
            Active Rigs
          </h3>
        </div>

        <button
          className="px-3 py-1.5 text-xs font-semibold uppercase tracking-wider bg-[#ff6b35]/10 border border-[#ff6b35]/30 text-[#ff6b35] rounded hover:bg-[#ff6b35]/20 transition-colors"
          style={{ fontFamily: 'Orbitron, monospace' }}
        >
          + Add Rig
        </button>
      </div>

      {/* Rig List */}
      <div className="divide-y divide-[#1a1b1d]">
        {mockRigs.map((rig) => {
          const config = statusConfig[rig.status];
          return (
            <div
              key={rig.id}
              className="px-4 py-3 hover:bg-[#1a1b1d]/50 transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                {/* Status Indicator */}
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{
                    backgroundColor: config.color,
                    boxShadow: rig.status !== 'idle' ? `0 0 10px ${config.color}` : 'none',
                  }}
                />

                {/* Name & Path */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-sm font-semibold text-white"
                      style={{ fontFamily: 'Orbitron, monospace' }}
                    >
                      {rig.name}
                    </span>
                    <span
                      className="px-1.5 py-0.5 text-[10px] rounded"
                      style={{
                        fontFamily: 'Orbitron, monospace',
                        color: config.color,
                        background: `${config.color}15`,
                      }}
                    >
                      {config.label}
                    </span>
                  </div>
                  <p className="text-xs text-[#60636c]" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
                    {rig.path} • <span className="text-[#7a7d87]">{rig.branch}</span>
                  </p>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-xs" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
                  <div className="text-center">
                    <p className="text-[#9fa2a9] font-semibold">{rig.workers}</p>
                    <p className="text-[#4c4e56]">workers</p>
                  </div>
                  <div className="text-center">
                    <p className="text-[#ff6b35] font-semibold">{rig.openBeads}</p>
                    <p className="text-[#4c4e56]">beads</p>
                  </div>
                </div>

                {/* Health Gauge */}
                <div className="w-20">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-[#60636c]" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
                      HEALTH
                    </span>
                    <span
                      className="text-[10px] font-semibold"
                      style={{
                        fontFamily: 'Orbitron, monospace',
                        color: rig.health > 80 ? '#22c55e' : rig.health > 50 ? '#f59e0b' : '#ef4444',
                      }}
                    >
                      {rig.health}%
                    </span>
                  </div>
                  <div className="h-1.5 bg-[#1a1b1d] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${rig.health}%`,
                        background: rig.health > 80
                          ? 'linear-gradient(90deg, #22c55e 0%, #4ade80 100%)'
                          : rig.health > 50
                          ? 'linear-gradient(90deg, #f59e0b 0%, #fbbf24 100%)'
                          : 'linear-gradient(90deg, #ef4444 0%, #f87171 100%)',
                        boxShadow: `0 0 10px ${rig.health > 80 ? 'rgba(34,197,94,0.5)' : rig.health > 50 ? 'rgba(245,158,11,0.5)' : 'rgba(239,68,68,0.5)'}`,
                      }}
                    />
                  </div>
                </div>

                {/* Last Activity */}
                <span className="text-xs text-[#4c4e56] w-16 text-right" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
                  {rig.lastActivity}
                </span>

                {/* Actions */}
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 bg-[#1a1b1d] border border-[#2d2e32] rounded hover:border-[#3f4147] transition-colors">
                    <svg className="w-3.5 h-3.5 text-[#7a7d87]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
