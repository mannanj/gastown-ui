import StatusCard from "@/components/dashboard/StatusCard";
import WorkerGrid from "@/components/dashboard/WorkerGrid";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import MergeQueue from "@/components/dashboard/MergeQueue";
import RigPanel from "@/components/dashboard/RigPanel";

export default function Home() {
  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
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
            COMMAND CENTER
          </h1>
          <p
            className="text-sm text-[#60636c]"
            style={{ fontFamily: 'Share Tech Mono, monospace' }}
          >
            System Status: All Workers Operational • Last Sync: 12s ago
          </p>
        </div>

        {/* Quick Actions */}
        <div className="flex items-center gap-3">
          <button
            className="px-4 py-2 text-sm font-semibold uppercase tracking-wider rounded transition-all duration-200"
            style={{
              fontFamily: 'Orbitron, monospace',
              background: 'linear-gradient(135deg, rgba(255,107,53,0.2) 0%, rgba(255,107,53,0.1) 100%)',
              border: '1px solid rgba(255,107,53,0.4)',
              color: '#ff6b35',
              boxShadow: '0 0 20px rgba(255,107,53,0.2)',
            }}
          >
            🚀 Launch Convoy
          </button>
          <button
            className="px-4 py-2 text-sm font-semibold uppercase tracking-wider bg-[#1a1b1d] border border-[#2d2e32] text-[#9fa2a9] rounded hover:border-[#3f4147] transition-colors"
            style={{ fontFamily: 'Orbitron, monospace' }}
          >
            + New Task
          </button>
        </div>
      </div>

      {/* Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatusCard
          title="Active Workers"
          value="15"
          subtitle="8 working • 7 idle"
          icon="👷"
          status="success"
          trend="up"
          trendValue="+3 from yesterday"
        />
        <StatusCard
          title="Open Beads"
          value="25"
          subtitle="12 in progress"
          icon="📿"
          status="neutral"
          trend="down"
          trendValue="-8 resolved today"
        />
        <StatusCard
          title="Merge Queue"
          value="4"
          subtitle="1 processing • 3 pending"
          icon="🏭"
          status="warning"
        />
        <StatusCard
          title="System Health"
          value="94%"
          subtitle="All rigs operational"
          icon="⚡"
          status="success"
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Left Column - 2/3 width */}
        <div className="xl:col-span-2 space-y-6">
          {/* Worker Grid */}
          <div
            className="rounded-lg border border-[#2d2e32] p-4"
            style={{
              background: 'linear-gradient(180deg, rgba(26,27,29,0.95) 0%, rgba(13,14,16,0.98) 100%)',
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xl">👷</span>
              <h2
                className="text-sm font-semibold text-[#9fa2a9] uppercase tracking-widest"
                style={{ fontFamily: 'Orbitron, monospace' }}
              >
                Worker Fleet
              </h2>
            </div>
            <WorkerGrid />
          </div>

          {/* Merge Queue */}
          <MergeQueue />
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          {/* Activity Feed */}
          <ActivityFeed />

          {/* Rig Panel */}
          <RigPanel />
        </div>
      </div>

      {/* Footer Stats Bar */}
      <div
        className="fixed bottom-0 left-64 right-0 h-8 border-t border-[#2d2e32] flex items-center justify-between px-6"
        style={{
          background: 'linear-gradient(180deg, rgba(26,27,29,0.98) 0%, rgba(13,14,16,1) 100%)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div className="flex items-center gap-6 text-xs" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
          <span className="text-[#60636c]">
            API: <span className="text-green-400">●</span> Connected
          </span>
          <span className="text-[#60636c]">
            Beads DB: <span className="text-green-400">●</span> Synced
          </span>
          <span className="text-[#60636c]">
            tmux: <span className="text-green-400">●</span> 15 sessions
          </span>
        </div>
        <div className="flex items-center gap-4 text-xs" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
          <span className="text-[#60636c]">
            Today: <span className="text-[#ff6b35]">47 tasks</span> completed
          </span>
          <span className="text-[#4c4e56]">│</span>
          <span className="text-[#60636c]">
            Tokens: <span className="text-[#ff6b35]">2.4M</span> used
          </span>
        </div>
      </div>
    </div>
  );
}
