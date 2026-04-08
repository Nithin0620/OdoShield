import { Link } from "react-router-dom";
import { TrendingUp, AlertTriangle, Shield, BadgeCheck, Activity, Car, Truck, Navigation2 } from "lucide-react";

/**
 * TODO [TigerGraph Integration]:
 * Replace all mock data below with TigerGraph GSQL queries:
 *
 * 1. `stats` → GET /query/{graph_name}/dashboard_stats
 */
const stats = [
  { label: "Vehicles Scanned", value: "1,24,847", icon: Activity, accent: "text-primary" },
  { label: "Fraud Rings Detected", value: "312", icon: AlertTriangle, accent: "text-destructive" },
  { label: "Avg Loss Prevented", value: "₹1.24L", icon: TrendingUp, accent: "text-odo-warning" },
  { label: "Trust Certificates", value: "89,241", icon: BadgeCheck, accent: "text-odo-verified" },
];

const flaggedVehicles = [
  { vin: "MH12AB1234", owner: "Rajesh K.", score: 91, status: "critical" },
  { vin: "DL3CAF9021", owner: "Anil S.", score: 87, status: "critical" },
  { vin: "KA01MX4532", owner: "Meera P.", score: 54, status: "warning" },
  { vin: "MH02XY3344", owner: "Suresh D.", score: 12, status: "safe" },
];

// SVG Graph data
const cx = 300, cy = 200, r = 140;
const centerNode = { x: cx, y: cy, label: "AutoFix Hub, Pune" };
const carNodes = [
  { id: "MH12AB1234", risk: "critical" },
  { id: "MH14CD5678", risk: "critical" },
  { id: "DL3CAF9021", risk: "warning" },
  { id: "KA01MX4532", risk: "warning" },
  { id: "MH02XY3344", risk: "safe" },
  { id: "PB10EE9988", risk: "safe" },
].map((n, i, arr) => {
  const angle = (2 * Math.PI * i) / arr.length - Math.PI / 2;
  return { ...n, x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
});

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6 h-full font-sans">
      {/* Top Telemetry Bar */}
      <div className="flex flex-wrap items-center gap-6 p-6 command-module bg-white border-border/40">
        <div className="flex items-center gap-4 border-r border-border pr-8">
          <div className="h-3 w-3 rounded-full bg-primary animate-pulse" />
          <span className="text-[12px] font-black uppercase tracking-[0.2em] text-primary italic">Live Network Monitor</span>
        </div>
        
        <div className="flex items-center gap-10 flex-1">
          <div className="flex flex-col">
            <span className="text-[10px] mono text-muted-foreground uppercase opacity-70 tracking-widest">Current_Protocol</span>
            <div className="flex items-center gap-2 mt-1">
               <span className="text-sm font-black text-foreground">ODOSHIELD_V2 // PRO</span>
            </div>
          </div>
          
          <div className="flex flex-col">
            <span className="text-[10px] mono text-muted-foreground uppercase opacity-70 tracking-widest">Threat_Status</span>
            <div className="flex items-center gap-2 mt-1">
               <div className="h-2 w-2 rounded-full bg-odo-verified animate-pulse" />
               <span className="text-sm font-black text-odo-verified uppercase tracking-widest">Systems Nominal</span>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-6">
             <div className="h-10 w-px bg-border/50" />
             <div className="text-right">
                <p className="text-[10px] mono text-muted-foreground uppercase leading-none tracking-widest">Global_Sync</p>
                <p className="text-sm font-black text-foreground mt-1.5 tracking-tighter italic">22:04:12.82</p>
             </div>
             <button className="h-12 w-12 flex items-center justify-center bg-primary text-primary-foreground rounded-xl shadow-lg shadow-primary/20 hover:scale-110 transition-all active:scale-95">
                <Activity className="h-5 w-5" />
             </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 flex-1">
        {/* Main Monitoring Module */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          <div className="flex-1 command-module border-border relative group min-h-[550px] overflow-hidden">
            {/* Animated Road Pattern Overlay */}
            <div className="absolute inset-x-0 bottom-0 h-32 road-bg opacity-[0.05] pointer-events-none scale-110 -rotate-1" />
            
            {/* Radar Backdrop */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-border/20 rounded-full" />
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] border border-primary/10 rounded-full" />
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] border border-primary/20 rounded-full" />
               
               <div 
                  className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-primary/[0.08] to-transparent origin-top-left -translate-x-full -translate-y-full rounded-tl-full"
                  style={{ animation: 'radar-sweep 12s linear infinite', clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }}
                />
            </div>

            <div className="absolute top-10 left-10 z-20">
               <h3 className="text-3xl font-black italic tracking-tighter text-foreground uppercase flex items-center gap-4">
                <Navigation2 className="h-7 w-7 text-primary animate-bounce-slow" />
                Active Hub Monitor
               </h3>
               <p className="text-[11px] font-black text-muted-foreground mt-2 uppercase tracking-[0.3em] pl-11 opacity-60">West-Hub Cluster // Regional Data Synthesis Active</p>
            </div>

            {/* Live Map / Graph Integration */}
            <div className="relative h-full w-full p-20">
               <svg viewBox="0 0 600 400" className="w-full h-full drop-shadow-xl overflow-visible">
                  {/* Dynamic Paths */}
                  {carNodes.map((n, i) => {
                    const color = n.risk === 'critical' ? "hsl(var(--odo-fraud))" : n.risk === 'warning' ? "hsl(var(--odo-warning))" : "hsl(var(--odo-verified))";
                    return (
                      <g key={n.id}>
                        <path
                          d={`M ${centerNode.x} ${centerNode.y} L ${n.x} ${n.y}`}
                          stroke={color}
                          strokeWidth={2}
                          strokeDasharray="8 8"
                          opacity={0.15}
                        />
                        
                        {/* Moving Vehicle Icon */}
                        <g>
                          <animateMotion 
                            dur={`${5 + i}s`} 
                            repeatCount="indefinite" 
                            path={`M ${centerNode.x} ${centerNode.y} L ${n.x} ${n.y}`}
                          />
                          <g className="animate-car-bob">
                            <Car className="h-5 w-5" style={{ color }} x="-10" y="-10" />
                          </g>
                        </g>
                      </g>
                    );
                  })}

                  {/* Hub Node */}
                  <g className="filter drop-shadow-lg cursor-pointer hover:scale-110 transition-transform origin-center z-50">
                     <rect
                      x={centerNode.x - 25} y={centerNode.y - 25}
                      width={50} height={50} rx={14}
                      fill="hsl(var(--primary))"
                      className="shadow-xl"
                    />
                    <Shield className="h-7 w-7 text-white" x={centerNode.x - 14} y={centerNode.y - 14} />
                  </g>

                  {/* Target Nodes */}
                  {carNodes.map((n) => {
                    const color = n.risk === 'critical' ? "hsl(var(--odo-fraud))" : n.risk === 'warning' ? "hsl(var(--odo-warning))" : "hsl(var(--odo-verified))";
                    return (
                      <g key={n.id} className="cursor-crosshair group transition-all duration-300">
                        <circle cx={n.x} cy={n.y} r={n.risk === 'critical' ? 14 : 10}
                          fill={color}
                          stroke="white"
                          strokeWidth={3}
                          className="group-hover:scale-150 transition-transform shadow-lg"
                        />
                        {n.risk !== 'safe' && (
                          <circle cx={n.x} cy={n.y} r={20} fill="transparent" stroke={color} strokeWidth={2} opacity={0.5}>
                            <animate attributeName="r" from="10" to="50" dur="2.5s" repeatCount="indefinite" />
                            <animate attributeName="opacity" from="0.5" to="0" dur="2.5s" repeatCount="indefinite" />
                          </circle>
                        )}
                        <text x={n.x} y={n.y + 45} textAnchor="middle" className="text-[11px] font-black fill-foreground opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                          {n.id}
                        </text>
                      </g>
                    );
                  })}
               </svg>
            </div>

            {/* Legend Overlay */}
            <div className="absolute bottom-12 left-12 flex gap-10 z-20">
               <div className="flex items-center gap-3">
                  <div className="h-4 w-4 bg-odo-verified rounded-lg shadow-lg" />
                  <span className="text-[11px] font-black uppercase text-muted-foreground tracking-[0.2em]">Verified_Safe</span>
               </div>
               <div className="flex items-center gap-3">
                  <div className="h-4 w-4 bg-odo-warning rounded-lg shadow-lg" />
                  <span className="text-[11px] font-black uppercase text-muted-foreground tracking-[0.2em]">Suspicious</span>
               </div>
               <div className="flex items-center gap-3">
                  <div className="h-4 w-4 bg-odo-fraud rounded-lg shadow-lg animate-pulse" />
                  <span className="text-[11px] font-black uppercase text-muted-foreground tracking-[0.2em]">Fraud_Confirmed</span>
               </div>
            </div>
          </div>
        </div>

        {/* Diagnostic Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-8">
          <section className="command-module p-10 flex flex-col gap-8 bg-primary/5">
             <div className="flex justify-between items-center">
                <h4 className="text-sm font-black uppercase tracking-widest text-primary italic">Live Asset Parity</h4>
                <Truck className="h-6 w-6 text-primary opacity-20" />
             </div>
             
             <div className="space-y-10">
                <div className="flex gap-6 items-center">
                   <div className="h-20 w-20 rounded-3xl border-2 border-primary/10 bg-white flex items-center justify-center relative shadow-md">
                      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full -rotate-90">
                         <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="6" className="text-secondary" opacity={0.2} />
                         <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8" 
                           strokeDasharray="264" strokeDashoffset={264 * (1 - 0.94)} className="text-odo-verified" strokeLinecap="round" />
                      </svg>
                      <span className="text-base font-black text-odo-verified">94%</span>
                   </div>
                   <div>
                      <p className="text-sm font-black uppercase text-foreground">Clean Threshold</p>
                      <p className="text-[11px] font-bold text-muted-foreground mt-2 opacity-60">Audit score average</p>
                   </div>
                </div>

                <div className="flex gap-6 items-center">
                   <div className="h-20 w-20 rounded-3xl border-2 border-odo-fraud/10 bg-white flex items-center justify-center relative shadow-md">
                      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full -rotate-90">
                         <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="6" className="text-secondary" opacity={0.2} />
                         <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="8" 
                           strokeDasharray="264" strokeDashoffset={264 * (1 - 0.18)} className="text-odo-fraud" strokeLinecap="round" />
                      </svg>
                      <span className="text-base font-black text-odo-fraud">18%</span>
                   </div>
                   <div>
                      <p className="text-sm font-black uppercase text-foreground">Fraud Saturation</p>
                      <p className="text-[11px] font-bold text-muted-foreground mt-2 opacity-60">High-risk cluster density</p>
                   </div>
                </div>
             </div>
          </section>

          <section className="command-module flex-1 p-10 relative overflow-hidden">
            <div className="scanner-bar opacity-20" />
            <div className="flex justify-between items-center mb-10">
              <h4 className="text-sm font-black uppercase tracking-[0.3em] text-muted-foreground italic">Live Threat Feed</h4>
              <div className="h-1.5 w-16 bg-primary/10 rounded-full" />
            </div>
            <div className="space-y-6">
              {flaggedVehicles.map((v, i) => {
                const colorClass = v.status === 'critical' ? 'text-odo-fraud' : v.status === 'warning' ? 'text-odo-warning' : 'text-odo-verified';
                const bgColorClass = v.status === 'critical' ? 'bg-odo-fraud/5 border-odo-fraud/20' : v.status === 'warning' ? 'bg-odo-warning/5 border-odo-warning/20' : 'bg-odo-verified/5 border-odo-verified/20';
                
                return (
                  <div key={v.vin} className={`group p-6 rounded-2xl transition-all cursor-pointer border hover:shadow-xl hover:scale-[1.02] ${bgColorClass} shadow-sm`}>
                     <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                           <Car className={`h-4 w-4 ${colorClass}`} />
                           <span className={`text-[11px] font-black uppercase tracking-widest ${colorClass}`}>
                             {v.status === 'critical' ? 'FRAUD_DETECTED' : v.status === 'warning' ? 'SUSPICIOUS_PATH' : 'CERTIFIED_SAFE'}
                           </span>
                        </div>
                        <span className="text-[10px] font-black text-muted-foreground opacity-40 uppercase tracking-tighter">SCORE_{v.score}</span>
                     </div>
                     <p className={`text-lg font-black italic tracking-tighter mb-2 mono ${colorClass}`}>{v.vin}</p>
                     <div className="flex justify-between items-center mt-6">
                        <div className="flex items-center gap-3">
                          <div className={`h-2.5 w-2.5 rounded-full animate-pulse ${v.status === 'critical' ? 'bg-odo-fraud' : v.status === 'warning' ? 'bg-odo-warning' : 'bg-odo-verified'}`} />
                          <span className={`text-[11px] font-black uppercase tracking-widest ${colorClass}`}>
                            {v.status === 'critical' ? 'Critical Halt' : v.status === 'warning' ? 'Audit Pending' : 'Active Pass'}
                          </span>
                        </div>
                        <Link to={`/report/${v.vin}`} className="text-[11px] font-black text-primary hover:underline underline-offset-8 decoration-2 uppercase tracking-tight">
                          Dossier →
                        </Link>
                     </div>
                  </div>
                );
              })}
            </div>
          </section>

          <div className="command-module p-8 bg-accent border-none shadow-2xl shadow-accent/30 scale-105">
             <div className="flex items-center gap-6 text-white">
                <AlertTriangle className="h-8 w-8 animate-pulse" />
                <div>
                   <p className="text-sm font-black uppercase tracking-[0.2em] leading-none">Security Advisory</p>
                   <p className="text-[11px] font-bold opacity-90 mt-2 uppercase leading-relaxed tracking-tight">North-Sector spoofing cluster identified. Immediate hub isolation active for MH-Series.</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
