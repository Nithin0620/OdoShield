import { 
  Shield, 
  FileText, 
  Wrench, 
  GitCommit, 
  AlertTriangle, 
  Activity,
  Car,
  Truck,
  History,
  Database,
  MapPin
} from "lucide-react";
import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";

/**
 * TODO [TigerGraph Integration]:
 */
const gaugeData = [{ value: 85 }];

const timeline = [
  { year: "2021", km: "22,000 km", source: "RTO Record", status: "verified" },
  { year: "2022", km: "40,000 km", source: "Insurance Claim", status: "verified" },
  { year: "2023", km: "61,000 km", source: "Service Record", status: "verified" },
  { year: "2024", km: "20,000 km", source: "Mileage Rollback Detected", status: "anomaly" },
];

const sources = [
  { icon: Shield, name: "RTO Records", status: "Verified", ok: true },
  { icon: FileText, name: "Insurance Records", status: "Verified", ok: true },
  { icon: Wrench, name: "Service Center Log", status: "Conflict Detected", ok: false },
  { icon: GitCommit, name: "Blockchain Record", status: "Immutable", ok: true },
];

export default function VehicleReport() {
  return (
    <div className="flex flex-col gap-8 font-sans">
      {/* Active Scan Header */}
      <div className="command-module p-8 border-odo-fraud/20 bg-odo-fraud-bg/40 relative overflow-hidden">
        <div className="absolute inset-0 road-bg opacity-[0.03] rotate-1" />
        <div className="scanner-bar !bg-odo-fraud opacity-20" />
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex items-center gap-6">
            <div className="h-16 w-16 bg-white rounded-2xl flex items-center justify-center border border-border/60 shadow-sm animate-car-bob">
               <Car className="h-8 w-8 text-odo-fraud" />
            </div>
            <div className="space-y-1">
              <h1 className="text-4xl font-black italic tracking-tighter text-foreground mono leading-none">
                MH12AB1234
              </h1>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.4em] opacity-70">Vehicle_Telemetry_Dossier // 0x8C2F-B</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="text-right hidden md:block">
                <p className="text-[10px] font-bold text-muted-foreground uppercase leading-none">Status</p>
                <p className="text-sm font-black text-odo-fraud mt-1">CRITICAL_ANOMALY</p>
             </div>
             <div className="h-12 w-px bg-odo-fraud/20 mx-2" />
             <span className="inline-flex items-center gap-3 px-6 py-3 bg-odo-fraud text-white font-black italic text-sm rounded-xl shadow-lg shadow-odo-fraud/20">
                <AlertTriangle className="h-5 w-5" />
                FRAUD DETECTED
             </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Col: Analysis & Verification */}
        <div className="lg:col-span-4 space-y-8">
          <section className="command-module p-8 text-center flex flex-col items-center gap-8">
             <div className="flex items-center justify-between w-full">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground italic">Risk_Saturation</h4>
                <div className="h-px flex-1 mx-4 bg-border/40" />
             </div>
             
             <div className="relative h-56 w-56 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="112" cy="112" r="100" fill="none" stroke="currentColor" strokeWidth="4" className="text-secondary" />
                  <circle cx="112" cy="112" r="100" fill="none" stroke="currentColor" strokeWidth="10" 
                    strokeDasharray="628" strokeDashoffset={628 * (1 - 0.85)} className="text-odo-fraud" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
                   <span className="text-6xl font-black italic text-foreground leading-none">85%</span>
                   <span className="text-[10px] font-black text-odo-fraud uppercase tracking-[0.3em] mt-2">Anomaly_Score</span>
                </div>
             </div>

             <div className="p-5 bg-secondary/30 border border-border/80 rounded-2xl w-full text-left relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 opacity-5">
                   <AlertTriangle className="h-24 w-24" />
                </div>
                <p className="text-xs font-bold text-muted-foreground leading-relaxed italic z-10 relative">
                  "Non-linear mileage jump detected between Insurance cycle 22 and RTO audit 24. Historical path reconstruction shows 12k discrepancy."
                </p>
             </div>
          </section>

          <section className="command-module p-8 space-y-6">
             <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground italic">System_Associations</h4>
             <div className="space-y-4">
                <div className="flex justify-between items-center p-4 bg-secondary/20 rounded-xl border border-border/40 group hover:border-primary/20 transition-all">
                   <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-primary opacity-50" />
                      <span className="text-[10px] font-black uppercase text-muted-foreground">Primary_Hub</span>
                   </div>
                   <span className="text-sm font-black text-foreground">AutoFix Hub</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-odo-fraud-bg/40 rounded-xl border border-odo-fraud/20 border-l-odo-fraud border-l-4">
                   <div className="flex items-center gap-3">
                      <History className="h-4 w-4 text-odo-fraud opacity-50" />
                      <span className="text-[10px] font-black uppercase text-odo-fraud">Owner_Risk</span>
                   </div>
                   <span className="text-sm font-black text-odo-fraud">3_FLAGS // CRIT</span>
                </div>
             </div>
          </section>
        </div>

        {/* Right Col: Timeline & Sources */}
        <div className="lg:col-span-8 space-y-8">
          <section className="command-module p-10 relative overflow-hidden">
             <div className="absolute top-0 right-0 h-32 w-32 road-bg opacity-[0.02] -rotate-12 translate-x-10 -translate-y-10" />
             <h4 className="text-xs font-black uppercase tracking-widest text-primary italic mb-12 flex items-center gap-3">
                <Truck className="h-5 w-5 animate-car-bob" />
                Historical Telemetry Stream
             </h4>
             
             <div className="relative pl-12 space-y-12">
                <div className="absolute left-5 top-2 bottom-2 w-2 road-bg opacity-10 rounded-full" />
                <div className="absolute left-[23px] top-2 bottom-2 w-px bg-primary/20" />
                
                {timeline.map((t, i) => (
                  <div key={i} className="relative group">
                     {/* Node Point */}
                     <div className={`absolute -left-[35px] top-1.5 h-10 w-10 rounded-xl border-4 flex items-center justify-center transition-all bg-white z-20 ${
                       t.status === 'anomaly' ? 'border-odo-fraud text-odo-fraud shadow-lg shadow-odo-fraud/20' : 'border-primary text-primary shadow-sm'
                     }`}>
                        <Activity className="h-5 w-5" />
                     </div>

                     <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 p-6 bg-secondary/10 rounded-2xl hover:bg-secondary/20 transition-all border border-transparent hover:border-border">
                        <div className="space-y-2">
                          <p className="text-2xl font-black text-foreground mono leading-none tracking-tighter">{t.km}</p>
                          <div className="flex items-center gap-3">
                             <div className="px-2 py-0.5 bg-white border border-border/60 rounded text-[9px] font-black uppercase text-muted-foreground">{t.source}</div>
                             <span className="text-[10px] font-bold text-primary/40 uppercase">Cycle_{t.year}</span>
                          </div>
                        </div>
                        {t.status === 'anomaly' && (
                          <div className="px-5 py-2 bg-odo-fraud text-white text-[11px] font-black uppercase tracking-[0.2em] italic rounded-lg shadow-sm">
                            Telemetric_Outlier
                          </div>
                        )}
                     </div>
                  </div>
                ))}
             </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="command-module p-8">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-muted-foreground italic mb-8">Data_Ingestion</h4>
              <div className="space-y-6">
                 {sources.map(s => (
                   <div key={s.name} className="flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                        <div className={`p-2 rounded-lg transition-colors ${s.ok ? 'bg-primary/5 text-primary' : 'bg-odo-fraud/5 text-odo-fraud'}`}>
                          <s.icon className="h-5 w-5" />
                        </div>
                        <span className="text-xs font-black text-foreground uppercase tracking-tight">{s.name}</span>
                      </div>
                      <div className={`h-2.5 w-2.5 rounded-full ${s.ok ? 'bg-odo-verified' : 'bg-odo-fraud animate-pulse shadow-[0_0_12px_hsl(var(--odo-fraud))]'}`} />
                   </div>
                 ))}
              </div>
            </section>

            <section className="command-module p-8 bg-primary text-white flex flex-col justify-center items-center text-center gap-6 relative overflow-hidden">
               <div className="absolute inset-0 road-bg opacity-[0.05] rotate-45 scale-150" />
               <div className="h-14 w-14 bg-white/20 backdrop-blur-md flex items-center justify-center rounded-2xl transform rotate-12 relative z-10 shadow-xl">
                  <Shield className="h-8 w-8" />
               </div>
               <div className="relative z-10">
                  <h5 className="text-lg font-black uppercase tracking-tighter leading-none">OdoShield Authenticated</h5>
                  <p className="text-[11px] font-bold opacity-70 mt-3 px-4 leading-relaxed uppercase tracking-widest">Cross-Hub GSQL pattern validation verified for MH12-AB Series.</p>
               </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
