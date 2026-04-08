import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, ChevronDown, AlertTriangle, ShieldCheck, Clock } from "lucide-react";

/**
 * TODO [TigerGraph Integration]:
 * Replace `mockVehicles` with a GSQL query to TigerGraph.
 * Query: GET /query/{graph_name}/vehicle_search?searchTerm=...
 * Expected vertex type: Vehicle
 * Attributes: vin, owner, make, model, year, city, state, riskScore, status, lastChecked
 * The search should run a pattern match across VIN, owner name, and registration number.
 */
const mockVehicles = [
  { vin: "MH12AB1234", owner: "Rajesh Kumar", make: "Maruti", model: "Swift DZire VXI", year: 2019, city: "Pune", state: "MH", riskScore: 91, status: "fraud", lastChecked: "2024-03-15" },
  { vin: "DL3CAF9021", owner: "Anil Sharma", make: "Hyundai", model: "i20 Asta", year: 2020, city: "Delhi", state: "DL", riskScore: 87, status: "fraud", lastChecked: "2024-03-14" },
  { vin: "KA01MX4532", owner: "Meera Patil", make: "Honda", model: "City ZX CVT", year: 2021, city: "Bangalore", state: "KA", riskScore: 79, status: "suspicious", lastChecked: "2024-03-12" },
  { vin: "MH02XY3344", owner: "Suresh Desai", make: "Honda", model: "City V CVT", year: 2020, city: "Mumbai", state: "MH", riskScore: 12, status: "clean", lastChecked: "2024-03-10" },
  { vin: "PB10EE9988", owner: "Gurpreet Singh", make: "Toyota", model: "Innova Crysta", year: 2018, city: "Ludhiana", state: "PB", riskScore: 8, status: "clean", lastChecked: "2024-03-08" },
  { vin: "MH14CD5678", owner: "Vikram Joshi", make: "Tata", model: "Nexon XZ+", year: 2022, city: "Nashik", state: "MH", riskScore: 85, status: "fraud", lastChecked: "2024-03-16" },
  { vin: "TN07GH2211", owner: "Lakshmi Narayan", make: "Kia", model: "Seltos HTX", year: 2021, city: "Chennai", state: "TN", riskScore: 45, status: "suspicious", lastChecked: "2024-02-28" },
  { vin: "GJ05KL9900", owner: "Harsh Patel", make: "Maruti", model: "Baleno Delta", year: 2020, city: "Ahmedabad", state: "GJ", riskScore: 5, status: "clean", lastChecked: "2024-03-01" },
];

function VehicleScanPlaceholder({ seed }: { seed: string }) {
  return (
    <div className="w-full h-full bg-secondary/30 relative flex items-center justify-center overflow-hidden border-r border-border/40 group-hover:bg-primary/5 transition-colors">
       <div className="absolute inset-0 road-bg opacity-[0.03] rotate-45 scale-150" />
       <div className="scanner-bar !w-full opacity-60" style={{ animationDuration: '3s' }} />
       
       <div className="relative h-24 w-24">
          <svg viewBox="0 0 100 100" className="w-full h-full text-primary/10">
             <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
             <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2" />
             <line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 1" />
             <line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1 1" />
          </svg>
          
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="w-16 h-10 border-2 border-primary/20 rounded-lg relative overflow-hidden group-hover:border-primary/40 transition-all group-hover:scale-110 animate-car-bob">
                <div className="absolute top-2 left-2 right-2 h-[2px] bg-primary/20 group-hover:bg-primary/40" />
                <div className="absolute bottom-2 left-3 h-2 w-2 rounded-full border border-primary/20" />
                <div className="absolute bottom-2 right-3 h-2 w-2 rounded-full border border-primary/20" />
                
                {/* Internal Scan Line */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-primary/10 to-transparent h-full w-4 -translate-x-full animate-traffic-move" />
             </div>
          </div>
       </div>

       <div className="absolute bottom-3 left-0 w-full text-center">
          <span className="text-[8px] font-black uppercase tracking-[0.4em] text-primary/30">Dossier_{seed.slice(-4)}_Visual</span>
       </div>
    </div>
  );
}

const statusConfig = {
  fraud: { label: "Fraud Suspected", icon: AlertTriangle, className: "bg-odo-fraud text-white" },
  suspicious: { label: "Suspicious", icon: Clock, className: "bg-odo-warning text-white" },
  clean: { label: "Verified Clean", icon: ShieldCheck, className: "bg-odo-verified text-white" },
};

export default function VehicleLookup() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(true);

  const filtered = mockVehicles.filter((v) => {
    const matchesSearch =
      !search ||
      v.vin.toLowerCase().includes(search.toLowerCase()) ||
      v.owner.toLowerCase().includes(search.toLowerCase()) ||
      v.city.toLowerCase().includes(search.toLowerCase()) ||
      v.make.toLowerCase().includes(search.toLowerCase()) ||
      v.model.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || v.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex flex-col gap-10 font-sans">
      {/* Search Header */}
      <div className="max-w-3xl">
        <h2 className="text-4xl font-black italic tracking-tighter text-primary uppercase mb-4">Registry Audit</h2>
        <p className="text-sm font-bold text-muted-foreground leading-relaxed uppercase tracking-widest opacity-70">
          Access the secure vehicle ledger. Every entry is cross-referenced with regional service logs and registration databases.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">
          <div className="md:col-span-9 command-module bg-white p-2 flex items-center border-border/60">
            <Search className="h-5 w-5 text-primary ml-6 opacity-30" />
            <input
              type="text"
              placeholder="Enter VIN, Part of Owner Name, or City..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-5 py-4 bg-transparent border-none text-base outline-none font-bold placeholder:opacity-30"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:col-span-3 bg-secondary/40 text-primary font-black uppercase text-xs tracking-widest px-6 py-4 rounded-xl border border-border/40 hover:bg-white transition-all shadow-sm flex items-center justify-center gap-3"
          >
            <Filter className="h-4 w-4" />
            Filters
          </button>
        </div>

        {showFilters && (
          <div className="flex flex-wrap gap-3 animate-in fade-in slide-in-from-top-2 duration-400">
            {["all", "fraud", "suspicious", "clean"].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-5 py-2.5 rounded-lg font-black uppercase text-[10px] tracking-[0.2em] transition-all border ${
                  statusFilter === s
                    ? "bg-primary text-white border-primary shadow-lg shadow-primary/20"
                    : "bg-white text-muted-foreground border-border/60 hover:border-primary/40 shadow-sm"
                }`}
              >
                {s === "all" ? "Whole Registry" : s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Results Container */}
      <div className="flex flex-col gap-8">
        <div className="flex items-end justify-between border-b-2 border-primary/5 pb-6">
          <div className="flex items-center gap-3">
             <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
             <span className="text-[11px] font-black uppercase tracking-[0.3em] text-muted-foreground italic">Found {filtered.length} matching dossiers</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8">
          {filtered.map((v, i) => {
            const sc = statusConfig[v.status as keyof typeof statusConfig];
            return (
              <Link 
                key={v.vin} 
                to={`/report/${v.vin}`}
                className="group command-module bg-white p-0 flex flex-col md:flex-row items-stretch overflow-hidden hover:translate-x-1 duration-300 border-l-[6px]"
                style={{ 
                  borderLeftColor: v.status === 'fraud' ? 'hsl(var(--odo-fraud))' : v.status === 'suspicious' ? 'hsl(var(--odo-warning))' : 'hsl(var(--odo-verified))',
                  animationDelay: `${i * 100}ms`
                }}
              >
                {/* Technical Animated Placeholder */}
                <div className="md:w-64 h-40 md:h-auto">
                   <VehicleScanPlaceholder seed={v.vin} />
                </div>

                <div className="flex-1 p-8 flex flex-col md:flex-row justify-between gap-8">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] mono bg-primary text-white px-3 py-1 rounded shadow-sm italic">{v.vin}</span>
                      <span className="text-[11px] font-black uppercase tracking-widest text-primary opacity-40">{v.city}, {v.state}</span>
                    </div>
                    <div>
                      <h4 className="text-2xl font-black text-foreground italic tracking-tighter group-hover:text-primary transition-colors leading-none uppercase">{v.year} {v.make} {v.model}</h4>
                      <p className="text-xs font-bold text-muted-foreground mt-3 uppercase tracking-widest">Registered to <span className="text-foreground border-b-2 border-primary/10">{v.owner}</span></p>
                    </div>
                  </div>

                  <div className="flex items-center gap-12">
                    <div className="flex flex-col items-center">
                      <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-2 italic">Risk_Factor</span>
                      <span className={`text-4xl font-black italic tracking-tighter leading-none ${v.riskScore >= 80 ? "text-odo-fraud" : v.riskScore >= 40 ? "text-odo-warning" : "text-odo-verified"}`}>
                        {v.riskScore.toString().padStart(2, '0')}%
                      </span>
                    </div>

                    <div className="flex flex-col items-end shrink-0 min-w-[160px]">
                      <span className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] mb-3 px-4 py-2 rounded-xl shadow-lg shadow-black/5 ${sc.className}`}>
                        <sc.icon className="h-3.5 w-3.5" />
                        {sc.label}
                      </span>
                      <span className="text-[9px] font-black text-muted-foreground mono opacity-40 uppercase">LAST SYNC: {v.lastChecked}</span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}

          {filtered.length === 0 && (
            <div className="py-24 flex flex-col items-center justify-center command-module border-dashed bg-secondary/10">
              <Search className="h-16 w-16 text-primary opacity-10 mb-6" />
              <p className="text-xl font-black text-primary uppercase tracking-tighter italic">No matching dossiers</p>
              <p className="text-xs font-bold text-muted-foreground mt-3 uppercase tracking-widest opacity-60">Adjust filters or refine VIN accuracy.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
