'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const navigation = [
  { name: 'Command Center', href: '/', icon: '⚡' },
  { name: 'Workers', href: '/workers', icon: '👷' },
  { name: 'Rigs', href: '/rigs', icon: '🏗️' },
  { name: 'Work Queue', href: '/beads', icon: '📿' },
  { name: 'Merge Queue', href: '/merge', icon: '🏭' },
  { name: 'Town Mail', href: '/mail', icon: '📬' },
];

const workerRoles = [
  { role: 'Mayor', icon: '🎩', status: 'online' },
  { role: 'Deacon', icon: '🐺', status: 'busy' },
  { role: 'Witness', icon: '🦉', status: 'online' },
  { role: 'Refinery', icon: '🏭', status: 'busy' },
  { role: 'Dogs', icon: '🐶', status: 'online', count: 3 },
  { role: 'Crew', icon: '👷', status: 'online', count: 5 },
  { role: 'Polecats', icon: '😺', status: 'busy', count: 12 },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={`
        fixed left-0 top-0 h-screen z-50
        bg-gradient-to-b from-[#1a1b1d] via-[#15161a] to-[#0d0e10]
        border-r border-[#2d2e32] transition-all duration-300
        ${collapsed ? 'w-16' : 'w-64'}
      `}
      style={{
        boxShadow: 'inset -1px 0 0 rgba(255,255,255,0.02), 4px 0 20px rgba(0,0,0,0.5)',
      }}
    >
      {/* Noise Overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Header */}
      <div className="relative p-4 border-b border-[#2d2e32]">
        <div className="flex items-center gap-3">
          {/* Animated Gear Icon */}
          <div className="relative w-10 h-10 flex items-center justify-center">
            <svg
              className="w-10 h-10 animate-[spin_20s_linear_infinite]"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                d="M12 15a3 3 0 100-6 3 3 0 000 6z"
                stroke="#ff6b35"
                strokeWidth="1.5"
              />
              <path
                d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"
                stroke="#ff6b35"
                strokeWidth="1.5"
                fill="rgba(255,107,53,0.1)"
              />
            </svg>
            {/* Glow effect */}
            <div className="absolute inset-0 bg-[#ff6b35] opacity-20 blur-xl rounded-full" />
          </div>

          {!collapsed && (
            <div>
              <h1
                className="text-lg font-bold tracking-wider"
                style={{
                  fontFamily: 'Orbitron, monospace',
                  color: '#ff6b35',
                  textShadow: '0 0 10px rgba(255,107,53,0.5)',
                }}
              >
                GAS TOWN
              </h1>
              <p className="text-xs text-[#7a7d87] tracking-wide" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
                v0.1.0 // OPERATIONAL
              </p>
            </div>
          )}
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 bg-[#2d2e32] border border-[#3f4147] rounded-full flex items-center justify-center hover:bg-[#3f4147] transition-colors"
        >
          <span className="text-xs text-[#9fa2a9]">{collapsed ? '›' : '‹'}</span>
        </button>
      </div>

      {/* Navigation */}
      <nav className="relative p-3 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                ${isActive
                  ? 'bg-gradient-to-r from-[#ff6b35]/20 to-transparent border-l-2 border-[#ff6b35]'
                  : 'hover:bg-[#1f2023] border-l-2 border-transparent'
                }
              `}
              title={collapsed ? item.name : undefined}
            >
              <span className="text-xl">{item.icon}</span>
              {!collapsed && (
                <span
                  className={`text-sm font-medium tracking-wide ${isActive ? 'text-[#ff6b35]' : 'text-[#9fa2a9]'}`}
                  style={{ fontFamily: 'Rajdhani, sans-serif' }}
                >
                  {item.name}
                </span>
              )}
              {isActive && !collapsed && (
                <div className="ml-auto w-1.5 h-1.5 bg-[#ff6b35] rounded-full shadow-[0_0_10px_rgba(255,107,53,0.8)]" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Divider */}
      <div className="mx-4 my-4 h-px bg-gradient-to-r from-transparent via-[#3f4147] to-transparent" />

      {/* Worker Status */}
      {!collapsed && (
        <div className="relative px-4">
          <h2
            className="text-xs font-semibold text-[#60636c] uppercase tracking-widest mb-3"
            style={{ fontFamily: 'Orbitron, monospace' }}
          >
            Active Workers
          </h2>
          <div className="space-y-2">
            {workerRoles.map((worker) => (
              <div
                key={worker.role}
                className="flex items-center gap-2 px-2 py-1.5 rounded bg-[#1a1b1d]/50 border border-[#2d2e32]/50"
              >
                <span className="text-base">{worker.icon}</span>
                <span className="text-sm text-[#9fa2a9] flex-1" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                  {worker.role}
                </span>
                {worker.count && (
                  <span className="text-xs text-[#60636c] px-1.5 py-0.5 bg-[#2d2e32] rounded">
                    ×{worker.count}
                  </span>
                )}
                <div
                  className={`w-2 h-2 rounded-full ${
                    worker.status === 'online' ? 'bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]' :
                    worker.status === 'busy' ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]' :
                    'bg-[#4c4e56]'
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Bottom Status */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#2d2e32] bg-[#0d0e10]/80">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
          {!collapsed && (
            <span className="text-xs text-[#60636c]" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
              SYSTEM NOMINAL
            </span>
          )}
        </div>
      </div>
    </aside>
  );
}
