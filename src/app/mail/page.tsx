'use client';

import { useState } from 'react';

interface Message {
  id: string;
  from: { name: string; icon: string; role: string };
  to: { name: string; icon: string };
  subject: string;
  preview: string;
  timestamp: string;
  read: boolean;
  type: 'notification' | 'report' | 'alert' | 'request';
  rig?: string;
}

const mockMessages: Message[] = [
  { id: '1', from: { name: 'Mayor', icon: '🎩', role: 'Mayor' }, to: { name: 'Overseer', icon: '👁️' }, subject: 'Convoy BK-127 Complete', preview: 'All 4 polecats successfully merged their changes. Total: 12 files modified, 847 lines added...', timestamp: '5m ago', read: false, type: 'report', rig: 'gastown' },
  { id: '2', from: { name: 'Witness', icon: '🦉', role: 'Witness' }, to: { name: 'Overseer', icon: '👁️' }, subject: 'Polecat-B2 Requires Attention', preview: 'Tests failing on bd-447. Polecat has been stuck for 15 minutes. Recommend manual intervention...', timestamp: '12m ago', read: false, type: 'alert', rig: 'beads' },
  { id: '3', from: { name: 'Refinery', icon: '🏭', role: 'Refinery' }, to: { name: 'Overseer', icon: '👁️' }, subject: 'Merge Queue Status Update', preview: 'Processed 8 MRs in the last hour. Current queue depth: 4. Average merge time: 2m 34s...', timestamp: '30m ago', read: true, type: 'report', rig: 'gastown' },
  { id: '4', from: { name: 'Deacon', icon: '🐺', role: 'Deacon' }, to: { name: 'Overseer', icon: '👁️' }, subject: 'Patrol Cycle #847 Summary', preview: 'All systems nominal. Workers: 15 active. Rigs: 4 healthy. GUPP propagation: 100%...', timestamp: '1h ago', read: true, type: 'notification', rig: 'town' },
  { id: '5', from: { name: 'Crew-Alpha', icon: '👷', role: 'Crew' }, to: { name: 'Mayor', icon: '🎩' }, subject: 'Design Review: Auth Flow Refactor', preview: 'Completed initial design for the authentication flow refactor. Proposing OAuth2 with PKCE...', timestamp: '2h ago', read: true, type: 'request', rig: 'gastown' },
  { id: '6', from: { name: 'Dog-Scout', icon: '🐶', role: 'Dog' }, to: { name: 'Deacon', icon: '🐺' }, subject: 'Stale Branch Cleanup Complete', preview: 'Removed 23 stale branches across all rigs. Freed 450MB of git storage...', timestamp: '3h ago', read: true, type: 'report', rig: 'town' },
  { id: '7', from: { name: 'Mayor', icon: '🎩', role: 'Mayor' }, to: { name: 'Overseer', icon: '👁️' }, subject: 'Daily Summary Report', preview: 'Tasks completed: 47. Workers spawned: 12. Merges: 23. Token usage: 2.4M...', timestamp: '6h ago', read: true, type: 'report' },
];

const typeConfig = {
  notification: { color: '#60636c', label: 'INFO', icon: 'ℹ️' },
  report: { color: '#3b82f6', label: 'REPORT', icon: '📊' },
  alert: { color: '#ef4444', label: 'ALERT', icon: '⚠️' },
  request: { color: '#f59e0b', label: 'REQUEST', icon: '📋' },
};

export default function MailPage() {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [filter, setFilter] = useState('all');

  const unreadCount = mockMessages.filter(m => !m.read).length;
  const filteredMessages = filter === 'all'
    ? mockMessages
    : filter === 'unread'
    ? mockMessages.filter(m => !m.read)
    : mockMessages.filter(m => m.type === filter);

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
            TOWN MAIL
          </h1>
          <p className="text-sm text-[#60636c]" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
            {unreadCount} unread • {mockMessages.length} total messages
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
          + Compose
        </button>
      </div>

      {/* Mail Container */}
      <div className="flex-1 flex gap-4 min-h-0">
        {/* Message List */}
        <div
          className="w-96 flex-shrink-0 rounded-lg border border-[#2d2e32] overflow-hidden flex flex-col"
          style={{ background: 'linear-gradient(180deg, rgba(26,27,29,0.95) 0%, rgba(13,14,16,0.98) 100%)' }}
        >
          {/* Filters */}
          <div className="p-3 border-b border-[#2d2e32] flex gap-2 flex-wrap">
            {['all', 'unread', 'alert', 'report', 'request'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-2 py-1 text-[10px] rounded transition-all ${
                  filter === f
                    ? 'bg-[#ff6b35] text-white'
                    : 'bg-[#1a1b1d] text-[#7a7d87] border border-[#2d2e32]'
                }`}
                style={{ fontFamily: 'Orbitron, monospace' }}
              >
                {f.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto">
            {filteredMessages.map((message) => {
              const typeConf = typeConfig[message.type];
              return (
                <div
                  key={message.id}
                  onClick={() => setSelectedMessage(message)}
                  className={`p-3 border-b border-[#1a1b1d] cursor-pointer transition-colors ${
                    selectedMessage?.id === message.id ? 'bg-[#1a1b1d]' : 'hover:bg-[#1a1b1d]/50'
                  } ${!message.read ? 'border-l-2 border-l-[#ff6b35]' : ''}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{message.from.icon}</span>
                    <span className="text-sm font-semibold text-[#c4c6cb]" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                      {message.from.name}
                    </span>
                    <span
                      className="px-1.5 py-0.5 text-[9px] rounded"
                      style={{ fontFamily: 'Orbitron, monospace', color: typeConf.color, background: `${typeConf.color}15` }}
                    >
                      {typeConf.label}
                    </span>
                    {message.rig && (
                      <span className="px-1.5 py-0.5 text-[9px] bg-[#1a1b1d] text-[#60636c] rounded">
                        {message.rig}
                      </span>
                    )}
                  </div>
                  <p className={`text-sm mb-1 truncate ${!message.read ? 'text-white font-semibold' : 'text-[#9fa2a9]'}`} style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                    {message.subject}
                  </p>
                  <p className="text-xs text-[#60636c] truncate" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
                    {message.preview}
                  </p>
                  <p className="text-[10px] text-[#4c4e56] mt-1" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
                    {message.timestamp}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Message Detail */}
        <div
          className="flex-1 rounded-lg border border-[#2d2e32] overflow-hidden"
          style={{ background: 'linear-gradient(180deg, rgba(26,27,29,0.95) 0%, rgba(13,14,16,0.98) 100%)' }}
        >
          {selectedMessage ? (
            <div className="h-full flex flex-col">
              {/* Message Header */}
              <div className="p-4 border-b border-[#2d2e32]">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{selectedMessage.from.icon}</span>
                    <div>
                      <p className="text-lg font-semibold text-white" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
                        {selectedMessage.from.name}
                      </p>
                      <p className="text-xs text-[#60636c]" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
                        {selectedMessage.from.role} • {selectedMessage.timestamp}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#60636c]">To:</span>
                    <span className="text-lg">{selectedMessage.to.icon}</span>
                    <span className="text-sm text-[#9fa2a9]">{selectedMessage.to.name}</span>
                  </div>
                </div>
                <h2 className="text-xl font-bold text-[#ff6b35]" style={{ fontFamily: 'Orbitron, monospace' }}>
                  {selectedMessage.subject}
                </h2>
              </div>

              {/* Message Body */}
              <div className="flex-1 p-4 overflow-y-auto">
                <p className="text-[#c4c6cb] leading-relaxed" style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '15px' }}>
                  {selectedMessage.preview}
                </p>
                <p className="text-[#9fa2a9] mt-4 leading-relaxed" style={{ fontFamily: 'Rajdhani, sans-serif', fontSize: '15px' }}>
                  This is a placeholder for the full message content. In a real implementation, this would contain the complete message body with all relevant details, logs, and attachments.
                </p>
              </div>

              {/* Message Actions */}
              <div className="p-4 border-t border-[#2d2e32] flex items-center gap-3">
                <button className="px-4 py-2 text-sm font-semibold uppercase tracking-wider bg-[#ff6b35]/10 border border-[#ff6b35]/30 text-[#ff6b35] rounded hover:bg-[#ff6b35]/20 transition-colors" style={{ fontFamily: 'Orbitron, monospace' }}>
                  Reply
                </button>
                <button className="px-4 py-2 text-sm font-semibold uppercase tracking-wider bg-[#1a1b1d] border border-[#2d2e32] text-[#9fa2a9] rounded hover:border-[#3f4147] transition-colors" style={{ fontFamily: 'Orbitron, monospace' }}>
                  Forward
                </button>
                <button className="px-4 py-2 text-sm font-semibold uppercase tracking-wider bg-[#1a1b1d] border border-[#2d2e32] text-[#9fa2a9] rounded hover:border-[#3f4147] transition-colors" style={{ fontFamily: 'Orbitron, monospace' }}>
                  Archive
                </button>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <span className="text-6xl mb-4 block opacity-30">📬</span>
                <p className="text-[#60636c]" style={{ fontFamily: 'Share Tech Mono, monospace' }}>
                  Select a message to view
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
