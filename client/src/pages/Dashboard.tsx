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
  { vin: "MH12AB1234", owner: "Rajesh K.", score: 91 },
  { vin: "DL3CAF9021", owner: "Anil S.", score: 87 },
  { vin: "KA01MX4532", owner: "Meera P.", score: 79 },
];

// SVG Graph data
const cx = 300, cy = 200, r = 140;
const centerNode = { x: cx, y: cy, label: "AutoFix Hub, Pune" };
const carNodes = [
  { id: "MH12AB1234", suspicious: true },
  { id: "MH14CD5678", suspicious: true },
  { id: "DL3CAF9021", suspicious: true },
  { id: "KA01MX4532", suspicious: true },
  { id: "MH02XY3344", suspicious: false },
  { id: "PB10EE9988", suspicious: false },
].map((n, i, arr) => {
  const angle = (2 * Math.PI * i) / arr.length - Math.PI / 2;
  return { ...n, x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) };
});

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-6 h-full font-sans">
      {/* Top Telemetry Bar */}
      <div className="flex flex-wrap items-center gap-6 p-5 command-module bg-white border-border/40">
        <div className="flex items-center gap-3 border-r border-border pr-6">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Live Network Monitor</span>
        </div>
        
        <div className="flex items-center gap-8 flex-1">
          <div className="flex flex-col">
            <span className="text-[9px] mono text-muted-foreground uppercase opacity-70">Current_Protocol</span>
            <div className="flex items-center gap-2 mt-0.5">
               <span className="text-xs font-bold text-foreground">ODOSHIELD_V2 // ALPHA</span>
            </div>
          </div>
          
          <div className="flex flex-col">
            <span className="text-[9px] mono text-muted-foreground uppercase opacity-70">Threat_Status</span>
            <div className="flex items-center gap-1.5 mt-0.5">
               <div className="h-1.5 w-1.5 rounded-full bg-odo-verified" />
               <span className="text-xs font-bold text-odo-verified uppercase">Nominal</span>
            </div>
          </div>

          <div className="ml-auto flex items-center gap-4">
             <div className="h-8 w-px bg-border/50" />
             <div className="text-right">
                <p className="text-[9px] mono text-muted-foreground uppercase leading-none">Global_Time</p>
                <p className="text-xs font-bold text-foreground mt-1 tracking-tighter">22:04:12.82</p>
             </div>
             <button className="h-10 w-10 flex items-center justify-center bg-primary text-primary-foreground rounded-lg hover:shadow-lg transition-all active:scale-95">
                <Activity className="h-5 w-5" />
             </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        {/* Main Monitoring Module */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="flex-1 command-module border-border relative group min-h-[500px] overflow-hidden">
            {/* Animated Road Pattern Overlay */}
            <div className="absolute inset-x-0 bottom-0 h-24 road-bg opacity-10 pointer-events-none" />
            
            {/* Radar Backdrop */}
            <div className="absolute inset-0 pointer-events-none opacity-30">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-border/20 rounded-full" />
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] h-[100%] border border-border/40 rounded-full" />
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] border border-border/60 rounded-full" />
               
               {/* Radar Sweep */}
               <div 
                  className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-primary/[0.04] to-transparent origin-top-left -translate-x-full -translate-y-full rounded-tl-full"
                  style={{ animation: 'radar-sweep 15s linear infinite', clipPath: 'polygon(0 0, 100% 0, 100% 100%)' }}
                />
            </div>

            <div className="absolute top-8 left-10 z-20">
               <h3 className="text-2xl font-black tracking-tight text-foreground uppercase flex items-center gap-3">
                <Navigation2 className="h-6 w-6 text-primary" />
                Live Hub Monitor
               </h3>
               <p className="text-[10px] font-bold text-muted-foreground mt-1.5 uppercase tracking-widest pl-9">Maharashtra Central Region // Pune-Mumbai Corridor</p>
            </div>

            {/* Live Map / Graph Integration */}
            <div className="relative h-full w-full p-16">
               <svg viewBox="0 0 600 400" className="w-full h-full drop-shadow-sm">
                  {/* Dynamic Paths */}
                  {carNodes.map((n, i) => (
                    <g key={n.id}>
                      <path
                        d={`M ${centerNode.x} ${centerNode.y} L ${n.x} ${n.y}`}
                        stroke={n.suspicious ? "hsl(var(--odo-fraud))" : "hsl(var(--primary))"}
                        strokeWidth={1.5}
                        strokeDasharray="6 6"
                        opacity={0.15}
                      />
                      
                      {/* Moving Vehicle Icon */}
                      <g>
                        <animateMotion 
                          dur={`${4 + i}s`} 
                          repeatCount="indefinite" 
                          path={`M ${centerNode.x} ${centerNode.y} L ${n.x} ${n.y}`}
                        />
                        <g className="animate-car-bob">
                          <Car className={`h-4 w-4 ${n.suspicious ? 'text-odo-fraud' : 'text-primary'}`} x="-8" y="-8" />
                        </g>
                      </g>
                    </g>
                  ))}

                  {/* Hub Node */}
                  <g className="filter drop-shadow-sm cursor-pointer hover:scale-105 transition-transform origin-center">
                     <rect
                      x={centerNode.x - 22} y={centerNode.y - 22}
                      width={44} height={44} rx={12}
                      fill="hsl(var(--primary))"
                    />
                    <Shield className="h-6 w-6 text-white" x={centerNode.x - 11} y={centerNode.y - 11} />
                  </g>

                  {/* Target Nodes */}
                  {carNodes.map((n) => (
                    <g key={n.id} className="cursor-crosshair group transition-all duration-300">
                      <circle cx={n.x} cy={n.y} r={n.suspicious ? 12 : 8}
                        fill={n.suspicious ? "hsl(var(--odo-fraud))" : "white"}
                        stroke={n.suspicious ? "none" : "hsl(var(--primary))"}
                        strokeWidth={2}
                        className="group-hover:scale-125 transition-transform shadow-sm"
                      />
                      {n.suspicious && (
                        <circle cx={n.x} cy={n.y} r={20} fill="transparent" stroke="hsl(var(--odo-fraud))" strokeWidth={1} opacity={0.4}>
                          <animate attributeName="r" from="12" to="40" dur="2s" repeatCount="indefinite" />
                          <animate attributeName="opacity" from="0.4" to="0" dur="2s" repeatCount="indefinite" />
                        </circle>
                      )}
                      <text x={n.x} y={n.y + 30} textAnchor="middle" className="text-[9px] font-black fill-foreground/60 opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-tighter">
                        {n.id}
                      </text>
                    </g>
                  ))}
               </svg>
            </div>

            {/* Legend Overlay */}
            <div className="absolute bottom-10 left-10 flex gap-8 z-20">
               <div className="flex items-center gap-3">
                  <div className="h-3 w-3 bg-primary rounded-sm shadow-sm" />
                  <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Active_Node</span>
               </div>
               <div className="flex items-center gap-3">
                  <div className="h-3 w-3 bg-odo-fraud rounded-sm shadow-sm animate-pulse" />
                  <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Fraud_Cluster</span>
               </div>
            </div>
          </div>
        </div>

        {/* Diagnostic Sidebar */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <section className="command-module p-8 flex flex-col gap-6 bg-primary/5">
             <div className="flex justify-between items-center mb-2">
                <h4 className="text-xs font-black uppercase tracking-widest text-primary italic">Live Asset Stats</h4>
                <Truck className="h-5 w-5 text-primary opacity-30" />
             </div>
             
             <div className="space-y-8">
                <div className="flex items-center gap-5">
                   <div className="h-16 w-16 rounded-2xl border-2 border-primary/10 bg-white flex items-center justify-center relative shadow-sm">
                      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full -rotate-90">
                         <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="4" className="text-secondary" />
                         <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="6" 
                           strokeDasharray="264" strokeDashoffset={264 * (1 - 0.94)} className="text-primary" />
                      </svg>
                      <span className="text-sm font-black text-primary">94%</span>
                   </div>
                   <div>
                      <p className="text-xs font-black uppercase text-foreground leading-tight">Verification Rate</p>
                      <p className="text-[10px] text-muted-foreground mt-1">Cross-hub parity active</p>
                   </div>
                </div>

                <div className="flex items-center gap-5">
                   <div className="h-16 w-16 rounded-2xl border-2 border-accent/10 bg-white flex items-center justify-center relative shadow-sm">
                      <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full -rotate-90">
                         <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="4" className="text-secondary" />
                         <circle cx="50" cy="50" r="42" fill="none" stroke="currentColor" strokeWidth="6" 
                           strokeDasharray="264" strokeDashoffset={264 * (1 - 0.18)} className="text-accent" />
                      </svg>
                      <span className="text-sm font-black text-accent">18%</span>
                   </div>
                   <div>
                      <p className="text-xs font-black uppercase text-foreground leading-tight">Risk Saturation</p>
                      <p className="text-[10px] text-muted-foreground mt-1">Cluster analysis pending</p>
                   </div>
                </div>
             </div>
          </section>

          <section className="command-module flex-1 p-8 relative">
            <div className="scanner-bar" />
            <div className="flex justify-between items-center mb-8">
              <h4 className="text-xs font-black uppercase tracking-widest text-muted-foreground italic">Threat Feed</h4>
              <div className="h-1 w-12 bg-border rounded-full" />
            </div>
            <div className="space-y-5">
              {flaggedVehicles.map((v, i) => (
                <div key={v.vin} className="group p-5 bg-secondary/30 rounded-xl hover:bg-secondary/50 transition-all cursor-pointer border border-transparent hover:border-border shadow-sm">
                   <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-2">
                         <Car className="h-3 w-3 text-odo-fraud" />
                         <span className="text-[10px] font-black text-odo-fraud uppercase tracking-tighter">FLAG_{i+1}</span>
                      </div>
                      <span className="text-[9px] font-bold text-muted-foreground opacity-60">HUB_ID: 802</span>
                   </div>
                   <p className="text-sm font-black text-foreground mb-2 mono tracking-tight text-primary">{v.vin}</p>
                   <div className="flex justify-between items-center mt-4">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-odo-fraud animate-pulse" />
                        <span className="text-xs font-black text-odo-fraud uppercase">Critical Risk</span>
                      </div>
                      <Link to={`/report/${v.vin}`} className="text-[10px] font-black text-primary hover:underline underline-offset-4 decoration-2">
                        DOSS_REP →
                      </Link>
                   </div>
                </div>
              ))}
            </div>
          </section>

          <div className="command-module p-6 bg-accent border-none shadow-lg shadow-accent/20">
             <div className="flex items-center gap-4 text-white">
                <AlertTriangle className="h-6 w-6 animate-bounce" />
                <div>
                   <p className="text-xs font-black uppercase tracking-widest leading-none">Security Advisory</p>
                   <p className="text-[10px] font-bold opacity-80 mt-1.5 uppercase leading-tight">Possible spoofing attempt detected in North-West sector</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
