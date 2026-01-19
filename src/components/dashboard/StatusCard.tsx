'use client';

interface StatusCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  status?: 'success' | 'warning' | 'danger' | 'neutral';
}

export default function StatusCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  trendValue,
  status = 'neutral',
}: StatusCardProps) {
  const statusColors = {
    success: { bg: 'rgba(34,197,94,0.1)', border: 'rgba(34,197,94,0.3)', glow: 'rgba(34,197,94,0.2)' },
    warning: { bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)', glow: 'rgba(245,158,11,0.2)' },
    danger: { bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.3)', glow: 'rgba(239,68,68,0.2)' },
    neutral: { bg: 'rgba(255,107,53,0.05)', border: 'rgba(45,46,50,1)', glow: 'transparent' },
  };

  const colors = statusColors[status];

  return (
    <div
      className="relative p-5 rounded-lg border transition-all duration-300 hover:scale-[1.02] group"
      style={{
        background: `linear-gradient(135deg, ${colors.bg} 0%, rgba(26,27,29,0.95) 100%)`,
        borderColor: colors.border,
        boxShadow: `0 4px 20px rgba(0,0,0,0.3), 0 0 40px ${colors.glow}`,
      }}
    >
      {/* Noise Texture */}
      <div
        className="absolute inset-0 rounded-lg pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Rivets */}
      <div className="absolute top-2 left-2 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#4c4e56] to-[#2d2e32] shadow-inner" />
      <div className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#4c4e56] to-[#2d2e32] shadow-inner" />
      <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#4c4e56] to-[#2d2e32] shadow-inner" />
      <div className="absolute bottom-2 right-2 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-[#4c4e56] to-[#2d2e32] shadow-inner" />

      <div className="relative flex items-start justify-between">
        <div className="flex-1">
          <p
            className="text-xs font-semibold text-[#60636c] uppercase tracking-widest mb-2"
            style={{ fontFamily: 'Orbitron, monospace' }}
          >
            {title}
          </p>
          <p
            className="text-3xl font-bold text-white mb-1 tracking-tight"
            style={{ fontFamily: 'Orbitron, monospace' }}
          >
            {value}
          </p>
          {subtitle && (
            <p className="text-sm text-[#7a7d87]" style={{ fontFamily: 'Rajdhani, sans-serif' }}>
              {subtitle}
            </p>
          )}
          {trend && trendValue && (
            <div className="flex items-center gap-1 mt-2">
              <span
                className={`text-xs font-semibold ${
                  trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-[#7a7d87]'
                }`}
              >
                {trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'} {trendValue}
              </span>
            </div>
          )}
        </div>
        <div
          className="text-4xl opacity-80 group-hover:scale-110 transition-transform duration-300"
          style={{ filter: 'drop-shadow(0 0 10px rgba(255,107,53,0.3))' }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
