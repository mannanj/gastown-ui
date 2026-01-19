'use client';

import { useState } from 'react';

export default function Header() {
  const [showMail, setShowMail] = useState(false);
  const currentTime = new Date().toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return (
    <header
      className="fixed top-0 right-0 left-64 h-14 z-40 border-b border-[#2d2e32]"
      style={{
        background: 'linear-gradient(180deg, rgba(26,27,29,0.95) 0%, rgba(13,14,16,0.98) 100%)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div className="h-full px-6 flex items-center justify-between">
        {/* Left: Breadcrumb / Title */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-[#60636c] text-sm" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
              ~/gt
            </span>
            <span className="text-[#3f4147]">/</span>
            <span
              className="text-[#ff6b35] font-semibold tracking-wide"
              style={{ fontFamily: 'Orbitron, monospace', fontSize: '14px' }}
            >
              COMMAND CENTER
            </span>
          </div>
        </div>

        {/* Right: Status & Actions */}
        <div className="flex items-center gap-6">
          {/* System Clock */}
          <div
            className="text-[#60636c] text-sm tabular-nums"
            style={{ fontFamily: 'Share Tech Mono, monospace' }}
          >
            <span className="text-[#3f4147] mr-2">SYS:</span>
            {currentTime}
          </div>

          {/* Divider */}
          <div className="w-px h-6 bg-[#2d2e32]" />

          {/* Mail Indicator */}
          <button
            onClick={() => setShowMail(!showMail)}
            className="relative flex items-center gap-2 px-3 py-1.5 bg-[#1a1b1d] border border-[#2d2e32] rounded hover:border-[#3f4147] transition-colors"
          >
            <span className="text-lg">📬</span>
            <span className="text-sm text-[#9fa2a9]" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              Mail
            </span>
            {/* Unread Badge */}
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#ff6b35] text-white text-xs rounded-full flex items-center justify-center font-bold shadow-[0_0_10px_rgba(255,107,53,0.5)]">
              3
            </span>
          </button>

          {/* GUPP Status */}
          <div className="flex items-center gap-2 px-3 py-1.5 bg-[#1a1b1d] border border-[#2d2e32] rounded">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
            <span
              className="text-xs text-green-400 font-semibold tracking-wider"
              style={{ fontFamily: 'Orbitron, monospace' }}
            >
              GUPP ACTIVE
            </span>
          </div>

          {/* Overseer Badge */}
          <div
            className="flex items-center gap-2 px-3 py-1.5 rounded border"
            style={{
              background: 'linear-gradient(135deg, rgba(255,107,53,0.1) 0%, rgba(255,107,53,0.05) 100%)',
              borderColor: 'rgba(255,107,53,0.3)',
            }}
          >
            <span className="text-lg">👁️</span>
            <span
              className="text-sm font-semibold tracking-wide"
              style={{
                fontFamily: 'Orbitron, monospace',
                color: '#ff6b35',
                textShadow: '0 0 10px rgba(255,107,53,0.3)',
              }}
            >
              OVERSEER
            </span>
          </div>
        </div>
      </div>

      {/* Scanline Effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)',
        }}
      />
    </header>
  );
}
