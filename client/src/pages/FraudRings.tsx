import { useState, useEffect } from "react";
import { AlertTriangle, Network, ChevronRight, Loader2 } from "lucide-react";
import { useFraudStore } from "../store/fraudStore";

const severityConfig: Record<string, any> = {
  critical: { label: "Critical", className: "bg-odo-fraud-bg text-destructive border-odo-fraud-border glow-fraud" },
  high: { label: "High", className: "bg-odo-fraud-bg text-destructive border-odo-fraud-border" },
  medium: { label: "Medium", className: "bg-odo-warning-bg text-odo-warning border-odo-warning-border" },
};

export default function FraudRings() {
  const { rings, loading, error, fetchRings } = useFraudStore();
  const [selectedRing, setSelectedRing] = useState<any>(null);

  useEffect(() => {
    fetchRings();
  }, [fetchRings]);

  useEffect(() => {
    if (rings?.length > 0 && !selectedRing) {
      setSelectedRing(rings[0]);
    }
  }, [rings, selectedRing]);

  if (loading) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-primary">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="text-sm font-medium">Running Community Detection on Graph...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-xl">
        <p className="font-medium flex items-center gap-2"><AlertTriangle className="h-4 w-4" /> Failed to detect fraud rings</p>
        <p className="text-sm opacity-80 mt-1">{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-5 flex items-center justify-between animate-slide-up">
        <div>
          <h1 className="text-lg font-bold text-foreground flex items-center gap-2">
            <Network className="h-5 w-5 text-primary" />
            Fraud Ring Detection
          </h1>
          <p className="text-xs text-muted-foreground mt-1">
            Graph-based anomaly detection across service centers, vehicles, and owners
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 bg-odo-fraud-bg text-destructive text-xs font-medium px-2.5 py-1 rounded-full border border-odo-fraud-border">
            <span className="h-1.5 w-1.5 rounded-full bg-destructive animate-pulse-glow" />
            {rings?.length || 0} Active Rings
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Ring List */}
        <div className="col-span-1 space-y-3 animate-slide-up-delay-1 max-h-[600px] overflow-y-auto custom-scrollbar">
          <h2 className="text-xs font-semibold tracking-wide uppercase text-muted-foreground px-1">
            Detected Rings
          </h2>
          {rings?.length > 0 ? rings.map((ring: any) => {
            const sc = severityConfig[ring.severity] || severityConfig.medium;
            const isSelected = selectedRing?.id === ring.id;
            return (
              <button
                key={ring.id}
                onClick={() => setSelectedRing(ring)}
                className={`w-full text-left glass-card-hover p-4 transition-all duration-300 ${
                  isSelected ? "ring-1 ring-primary/50 shadow-[0_0_15px_hsl(var(--primary)/0.1)]" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">{ring.name}</span>
                  <ChevronRight className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${isSelected ? "rotate-90 text-primary" : ""}`} />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${sc.className}`}>
                    {sc.label}
                  </span>
                  <span className="text-xs text-muted-foreground">{ring.detectedDate}</span>
                </div>
                <div className="flex gap-4 text-xs text-muted-foreground">
                  <span>{ring.vehicleCount} vehicles</span>
                  <span>{ring.centerCount} centers</span>
                  <span className="text-destructive font-medium">{ring.totalLoss} loss</span>
                </div>
              </button>
            );
          }) : (
            <div className="text-xs text-muted-foreground p-4 text-center glass-card">No clusters identified</div>
          )}
        </div>

        {/* Graph Visualization */}
        <div className="col-span-2 glass-card p-5 animate-slide-up-delay-2 h-fit">
          {selectedRing ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
                  {selectedRing.name} — Network Graph
                </h2>
                <span className={`text-xs font-medium px-2.5 py-1 rounded-full border ${
                  severityConfig[selectedRing.severity]?.className || severityConfig.medium.className
                }`}>
                  {selectedRing.severity.toUpperCase()}
                </span>
              </div>

              <svg viewBox="0 0 420 340" className="w-full" style={{ maxHeight: 340 }}>
                <defs>
                  <filter id="fr-glow-red">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                  <filter id="fr-glow-green">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                  </filter>
                </defs>
                {/* Edges */}
                {selectedRing.edges?.map((edge: any, i: number) => {
                  const from = selectedRing.nodes.find((n: any) => n.id === edge.from);
                  const to = selectedRing.nodes.find((n: any) => n.id === edge.to);
                  if (!from || !to) return null;
                  return (
                    <line
                      key={i}
                      x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                      stroke="hsl(0 72% 55% / 0.4)"
                      strokeWidth={1.5}
                      strokeDasharray={from.type === "owner" || to.type === "owner" ? "4 4" : "none"}
                    />
                  );
                })}
                {/* Nodes */}
                {selectedRing.nodes?.map((node: any) => {
                  if (node.type === "center") {
                    return (
                      <g key={node.id}>
                        <rect x={node.x - 14} y={node.y - 14} width={28} height={28} rx={5}
                          fill="#ef4444" filter="url(#fr-glow-red)" opacity={0.9} />
                        <text x={node.x} y={node.y + 30} textAnchor="middle" className="text-[9px]" fill="hsl(215 20% 55%)">
                          {node.id}
                        </text>
                      </g>
                    );
                  }
                  if (node.type === "owner") {
                    return (
                      <g key={node.id}>
                        <polygon
                          points={`${node.x},${node.y - 12} ${node.x + 12},${node.y + 8} ${node.x - 12},${node.y + 8}`}
                          fill="#a78bfa" filter="url(#fr-glow-red)" opacity={0.85}
                        />
                        <text x={node.x} y={node.y + 24} textAnchor="middle" className="text-[9px]" fill="hsl(215 20% 55%)">
                          {node.id}
                        </text>
                      </g>
                    );
                  }
                  const isSuspicious = node.suspicious !== false;
                  return (
                    <g key={node.id}>
                      <circle cx={node.x} cy={node.y} r={10}
                        fill={isSuspicious ? "#ef4444" : "#22c55e"}
                        filter={isSuspicious ? "url(#fr-glow-red)" : "url(#fr-glow-green)"}
                        opacity={0.85}
                      />
                      <text x={node.x} y={node.y + 22} textAnchor="middle" className="text-[9px]" fill="hsl(215 20% 55%)">
                        {node.id}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Legend */}
              <div className="flex items-center gap-6 mt-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-destructive glow-fraud" /> Suspicious Vehicle</span>
                <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-full bg-odo-verified glow-verified" /> Clean Vehicle</span>
                <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-destructive" /> Service Center</span>
                <span className="flex items-center gap-1.5"><span className="h-0 w-0 border-l-[5px] border-r-[5px] border-b-[8px] border-l-transparent border-r-transparent border-b-purple-400" /> Owner</span>
              </div>

              {/* Ring Stats */}
              <div className="grid grid-cols-4 gap-3 mt-5">
                <div className="bg-secondary/50 rounded-lg p-3 text-center neo-inset">
                  <p className="text-lg font-bold text-foreground">{selectedRing.vehicleCount}</p>
                  <p className="text-xs text-muted-foreground">Vehicles</p>
                </div>
                <div className="bg-secondary/50 rounded-lg p-3 text-center neo-inset">
                  <p className="text-lg font-bold text-foreground">{selectedRing.centerCount}</p>
                  <p className="text-xs text-muted-foreground">Centers</p>
                </div>
                <div className="bg-secondary/50 rounded-lg p-3 text-center neo-inset">
                  <p className="text-lg font-bold text-foreground">{selectedRing.ownerCount}</p>
                  <p className="text-xs text-muted-foreground">Owners</p>
                </div>
                <div className="bg-secondary/50 rounded-lg p-3 text-center neo-inset">
                  <p className="text-lg font-bold text-destructive">{selectedRing.totalLoss}</p>
                  <p className="text-xs text-muted-foreground">Est. Loss</p>
                </div>
              </div>
            </>
          ) : (
            <div className="h-[400px] flex items-center justify-center text-muted-foreground text-sm">
              Please select a cluster cluster to visualize
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
