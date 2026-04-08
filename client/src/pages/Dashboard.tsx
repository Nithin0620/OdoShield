import { useEffect } from "react";
import { Link } from "react-router-dom";
import { TrendingUp, AlertTriangle, Shield, BadgeCheck, Activity, Loader2 } from "lucide-react";
import { useDashboardStore } from "../store/dashboardStore";

const iconsMap: Record<string, any> = {
  Activity, AlertTriangle, TrendingUp, BadgeCheck, Shield
};

export default function Dashboard() {
  const { stats, suspiciousCenters, recentVehicles, riskDistribution, fraudCluster, loading, error, fetchDashboardData } = useDashboardStore();

  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (loading) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-primary">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="text-sm font-medium">Loading Dashboard Insights...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-xl">
        <p className="font-medium flex items-center gap-2"><AlertTriangle className="h-4 w-4" /> Failed to load dashboard</p>
        <p className="text-sm opacity-80 mt-1">{error}</p>
      </div>
    );
  }

  const cx = 300, cy = 200, r = 140;
  // Fallback for SVG graph if empty
  const centerNode = fraudCluster?.length > 0 ? fraudCluster[0] : null;
  const carNodes = fraudCluster?.length > 1 ? fraudCluster.slice(1).map((n: any, i: number, arr: any[]) => {
    const angle = (2 * Math.PI * i) / arr.length - Math.PI / 2;
    return { ...n, x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
  }) : [];

  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-4 gap-4">
        {stats?.map((s: any, i: number) => {
          const IconComponent = iconsMap[s.icon] || Activity;
          return (
            <div
              key={s.label || i}
              className="glass-card-hover p-5 animate-slide-up"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">{s.label}</p>
                <div className={`h-8 w-8 rounded-lg bg-secondary flex items-center justify-center ${s.glow || ''}`}>
                  <IconComponent className={`h-4 w-4 ${s.accent || 'text-primary'}`} />
                </div>
              </div>
              <p className="text-2xl font-bold text-foreground">{s.value || 0}</p>
              <p className={`text-xs mt-1 ${s.accent || 'text-primary'}`}>{s.sub}</p>
            </div>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Fraud Cluster Map */}
        <div className="col-span-2 glass-card p-5 animate-slide-up-delay-1">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
              Fraud Cluster Map
            </h2>
            <span className="inline-flex items-center gap-1.5 bg-odo-fraud-bg text-destructive text-xs font-medium px-2.5 py-1 rounded-full border border-odo-fraud-border">
              <span className="h-1.5 w-1.5 rounded-full bg-destructive animate-pulse-glow" />
              Live
            </span>
          </div>

          {!centerNode ? (
            <div className="flex h-[360px] items-center justify-center text-muted-foreground text-sm border-2 border-dashed border-border/50 rounded-xl">
              No active fraud clusters detected in graph
            </div>
          ) : (
            <svg viewBox="0 0 600 400" className="w-full" style={{ maxHeight: 360 }}>
              <defs>
                <filter id="glow-red">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="glow-green">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <linearGradient id="line-red" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0.2" />
                </linearGradient>
                <linearGradient id="line-green" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#22c55e" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              {/* Edges */}
              {carNodes.map((n: any) => (
                <line
                  key={n.id}
                  x1={centerNode.x} y1={centerNode.y}
                  x2={n.x} y2={n.y}
                  stroke={n.suspicious ? "url(#line-red)" : "url(#line-green)"}
                  strokeWidth={2}
                  strokeDasharray={n.suspicious ? "none" : "4 4"}
                />
              ))}
              {/* Center node */}
              <rect
                x={centerNode.x - 16} y={centerNode.y - 16}
                width={32} height={32} rx={6}
                fill="#ef4444" filter="url(#glow-red)" opacity={0.9}
              />
              <text x={centerNode.x} y={centerNode.y + 36} textAnchor="middle" className="text-[10px]" fill="hsl(215 20% 55%)">
                {centerNode.label || centerNode.id}
              </text>
              {/* Car nodes */}
              {carNodes.map((n: any) => (
                <g key={n.id}>
                  <circle cx={n.x} cy={n.y} r={12}
                    fill={n.suspicious ? "#ef4444" : "#22c55e"}
                    filter={n.suspicious ? "url(#glow-red)" : "url(#glow-green)"}
                    opacity={0.85}
                  />
                  <text x={n.x} y={n.y + 24} textAnchor="middle" className="text-[9px]" fill="hsl(215 20% 55%)">
                    {n.id}
                  </text>
                </g>
              ))}
            </svg>
          )}

          <div className="flex items-center gap-6 mt-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-foreground/50" /> Car Node</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-foreground/50" /> Service Center</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-destructive glow-fraud" /> Suspicious</span>
            <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-odo-verified glow-verified" /> Verified</span>
          </div>
        </div>

        {/* Insights Panel */}
        <div className="col-span-1 space-y-4">
          <div className="glass-card-hover p-4 animate-slide-up-delay-2">
            <h3 className="text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-3">
              Top Suspicious Service Centers
            </h3>
            {suspiciousCenters?.length ? (
              <div className="space-y-2.5">
                {suspiciousCenters.map((c: any) => (
                  <div key={c.name} className="flex items-center justify-between group">
                    <span className="text-sm text-foreground group-hover:text-primary transition-colors duration-300">{c.name}</span>
                    <span
                      className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${
                        c.level === "high"
                          ? "bg-odo-fraud-bg text-destructive border border-odo-fraud-border"
                          : "bg-odo-warning-bg text-odo-warning border border-odo-warning-border"
                      }`}
                    >
                      {c.score}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs text-muted-foreground py-2 text-center">No high-risk centers found</div>
            )}
          </div>

          <div className="glass-card-hover p-4 animate-slide-up-delay-2">
            <h3 className="text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-3">
              Recently Flagged Vehicles
            </h3>
            {recentVehicles?.length ? (
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-muted-foreground">
                    <th className="text-left font-medium pb-2">VIN</th>
                    <th className="text-left font-medium pb-2">Owner</th>
                    <th className="text-left font-medium pb-2">Score</th>
                    <th className="text-right font-medium pb-2" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {recentVehicles.map((v: any) => (
                    <tr key={v.vin} className="group hover:bg-secondary/30 transition-colors duration-300">
                      <td className="py-2.5 font-mono text-xs text-foreground">{v.vin}</td>
                      <td className="py-2.5 text-foreground">{v.owner}</td>
                      <td className="py-2.5 text-destructive font-medium">{v.score}</td>
                      <td className="py-2.5 text-right">
                        <Link to={`/report/${v.vin}`} className="text-primary text-xs font-medium hover:underline transition-all duration-300">
                          View →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-xs text-muted-foreground py-2 text-center">No recently flagged vehicles</div>
            )}
          </div>

          <div className="glass-card-hover p-4 animate-slide-up-delay-3">
            <h3 className="text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-3">
              Risk Distribution
            </h3>
            {riskDistribution?.length ? (
              <div className="space-y-3">
                {riskDistribution.map((r: any) => (
                  <div key={r.label}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-foreground">{r.label}</span>
                      <span className="text-muted-foreground">{r.pct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden neo-inset">
                      <div
                        className={`h-full rounded-full ${r.color || 'bg-primary'} transition-all duration-1000 ease-out`}
                        style={{ width: `${r.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs text-muted-foreground py-2 text-center">No distribution data available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
