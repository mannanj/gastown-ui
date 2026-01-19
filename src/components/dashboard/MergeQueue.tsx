'use client';

interface MergeRequest {
  id: string;
  branch: string;
  author: string;
  authorIcon: string;
  status: 'pending' | 'processing' | 'conflict' | 'merged';
  title: string;
  rig: string;
  filesChanged: number;
  additions: number;
  deletions: number;
  queuePosition?: number;
}

const mockMRs: MergeRequest[] = [
  {
    id: 'mr-237',
    branch: 'feat/gupp-retry-v2',
    author: 'Polecat-A1',
    authorIcon: '😺',
    status: 'processing',
    title: 'Improve GUPP retry mechanism with exponential backoff',
    rig: 'gastown',
    filesChanged: 4,
    additions: 156,
    deletions: 23,
  },
  {
    id: 'mr-236',
    branch: 'fix/patrol-timeout',
    author: 'Dog-Patch',
    authorIcon: '🐶',
    status: 'pending',
    title: 'Fix patrol timeout issue in Deacon loop',
    rig: 'gastown',
    filesChanged: 2,
    additions: 34,
    deletions: 12,
    queuePosition: 1,
  },
  {
    id: 'mr-235',
    branch: 'feat/schema-v3',
    author: 'Polecat-B1',
    authorIcon: '😺',
    status: 'conflict',
    title: 'Database schema migration for v3 fields',
    rig: 'beads',
    filesChanged: 8,
    additions: 245,
    deletions: 89,
    queuePosition: 2,
  },
  {
    id: 'mr-234',
    branch: 'docs/api-endpoints',
    author: 'Crew-Charlie',
    authorIcon: '👷',
    status: 'pending',
    title: 'Update API documentation for new endpoints',
    rig: 'wyvern',
    filesChanged: 3,
    additions: 89,
    deletions: 15,
    queuePosition: 3,
  },
];

const statusConfig = {
  pending: { color: '#60636c', label: 'QUEUED', bg: 'rgba(96,99,108,0.1)' },
  processing: { color: '#ff6b35', label: 'MERGING', bg: 'rgba(255,107,53,0.1)' },
  conflict: { color: '#ef4444', label: 'CONFLICT', bg: 'rgba(239,68,68,0.1)' },
  merged: { color: '#22c55e', label: 'MERGED', bg: 'rgba(34,197,94,0.1)' },
};

export default function MergeQueue() {
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
          <span className="text-xl">🏭</span>
          <h3
            className="text-sm font-semibold text-[#9fa2a9] uppercase tracking-widest"
            style={{ fontFamily: 'Orbitron, monospace' }}
          >
            Merge Queue
          </h3>
          <span className="px-2 py-0.5 text-xs bg-[#ff6b35]/20 text-[#ff6b35] rounded font-semibold">
            {mockMRs.length} in queue
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#ff6b35] rounded-full animate-pulse shadow-[0_0_10px_rgba(255,107,53,0.6)]" />
          <span className="text-xs text-[#ff6b35]" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
            Refinery Active
          </span>
        </div>
      </div>

      {/* Queue Items */}
      <div className="divide-y divide-[#1a1b1d]">
        {mockMRs.map((mr, index) => {
          const config = statusConfig[mr.status];
          return (
            <div
              key={mr.id}
              className="px-4 py-3 hover:bg-[#1a1b1d]/50 transition-colors cursor-pointer group"
            >
              <div className="flex items-start gap-3">
                {/* Position / Status */}
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0"
                  style={{
                    background: config.bg,
                    border: `1px solid ${config.color}30`,
                    color: config.color,
                    fontFamily: 'Orbitron, monospace',
                  }}
                >
                  {mr.status === 'processing' ? (
                    <div className="w-5 h-5 border-2 border-[#ff6b35] border-t-transparent rounded-full animate-spin" />
                  ) : mr.status === 'conflict' ? (
                    '⚠️'
                  ) : (
                    `#${mr.queuePosition || 0}`
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-sm font-semibold text-[#c4c6cb] hover:text-white transition-colors"
                      style={{ fontFamily: 'Share Tech Mono, monospace' }}
                    >
                      {mr.id}
                    </span>
                    <span
                      className="px-1.5 py-0.5 text-[10px] font-bold rounded uppercase"
                      style={{
                        fontFamily: 'Orbitron, monospace',
                        color: config.color,
                        background: config.bg,
                      }}
                    >
                      {config.label}
                    </span>
                    <span className="px-1.5 py-0.5 text-[10px] bg-[#1a1b1d] text-[#60636c] rounded" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
                      {mr.rig}
                    </span>
                  </div>

                  <p className="text-sm text-[#9fa2a9] mb-2 truncate" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                    {mr.title}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-[#60636c]" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
                    <span className="flex items-center gap-1">
                      <span>{mr.authorIcon}</span>
                      {mr.author}
                    </span>
                    <span className="text-[#4c4e56]">│</span>
                    <span>{mr.branch}</span>
                    <span className="text-[#4c4e56]">│</span>
                    <span>{mr.filesChanged} files</span>
                    <span className="text-green-500">+{mr.additions}</span>
                    <span className="text-red-500">-{mr.deletions}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-1.5 bg-[#1a1b1d] border border-[#2d2e32] rounded hover:border-[#ff6b35] transition-colors">
                    <svg className="w-4 h-4 text-[#7a7d87]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </button>
                  {mr.status === 'conflict' && (
                    <button className="p-1.5 bg-red-500/10 border border-red-500/30 rounded hover:bg-red-500/20 transition-colors">
                      <span className="text-xs text-red-400">Resolve</span>
                    </button>
                  )}
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

      {/* Footer Stats */}
      <div className="px-4 py-3 border-t border-[#2d2e32] bg-[#0d0e10]/50 flex items-center justify-between">
        <div className="flex items-center gap-4 text-xs" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
          <span className="text-[#60636c]">Today: <span className="text-green-400">23 merged</span></span>
          <span className="text-[#4c4e56]">│</span>
          <span className="text-[#60636c]">Avg time: <span className="text-[#ff6b35]">2m 34s</span></span>
        </div>
        <button
          className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-[#1a1b1d] border border-[#2d2e32] rounded hover:border-[#ff6b35] hover:text-[#ff6b35] transition-colors"
          style={{ fontFamily: 'Orbitron, monospace' }}
        >
          View All
        </button>
      </div>
    </div>
  );
}
