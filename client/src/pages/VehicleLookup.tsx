import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, ChevronDown, AlertTriangle, ShieldCheck, Clock, Loader2 } from "lucide-react";
import { useVehicleStore } from "../store/vehicleStore";

const statusConfig: Record<string, any> = {
  fraud: { label: "Fraud Suspected", icon: AlertTriangle, className: "bg-odo-fraud-bg text-destructive border-odo-fraud-border" },
  suspicious: { label: "Suspicious", icon: Clock, className: "bg-odo-warning-bg text-odo-warning border-odo-warning-border" },
  clean: { label: "Clean", icon: ShieldCheck, className: "bg-odo-verified-bg text-odo-verified border-odo-verified-border" },
};

export default function VehicleLookup() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const { searchResults, loading, error, searchVehicles } = useVehicleStore();

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    searchVehicles(debouncedSearch);
  }, [debouncedSearch, searchVehicles]);

  const filtered = searchResults.filter((v: any) => {
    const matchesStatus = statusFilter === "all" || v.status === statusFilter;
    return matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <div className="glass-card p-5 animate-slide-up">
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by VIN, owner name, city, or registration..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-secondary border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all duration-300"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
              showFilters ? "bg-primary/15 text-primary" : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            <Filter className="h-4 w-4" />
            Filters
            <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${showFilters ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* Filter Panel */}
        <div className={`overflow-hidden transition-all duration-300 ${showFilters ? "max-h-20 mt-4" : "max-h-0"}`}>
          <div className="flex gap-2">
            {["all", "fraud", "suspicious", "clean"].map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 border ${
                  statusFilter === s
                    ? "bg-primary/15 text-primary border-primary/30"
                    : "bg-secondary text-muted-foreground border-border hover:text-foreground"
                }`}
              >
                {s === "all" ? "All Vehicles" : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error ? (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-xl">
          <p className="font-medium flex items-center gap-2"><AlertTriangle className="h-4 w-4" /> Error searching vehicles</p>
          <p className="text-sm opacity-80 mt-1">{error}</p>
        </div>
      ) : (
        <>
          {/* Results Count */}
          <div className="flex items-center justify-between animate-slide-up-delay-1">
            <p className="text-xs text-muted-foreground">
              Showing <span className="text-foreground font-medium">{filtered.length}</span> {debouncedSearch ? <span>results for "{debouncedSearch}"</span> : "vehicles"}
            </p>
          </div>

          {/* Results Table */}
          <div className="glass-card overflow-hidden animate-slide-up-delay-2 relative min-h-[200px]">
            {loading && (
              <div className="absolute inset-0 bg-background/50 z-10 flex items-center justify-center backdrop-blur-[2px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            )}
            
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left font-medium text-xs text-muted-foreground uppercase tracking-wide px-5 py-3">VIN / Registration</th>
                  <th className="text-left font-medium text-xs text-muted-foreground uppercase tracking-wide px-5 py-3">Owner</th>
                  <th className="text-left font-medium text-xs text-muted-foreground uppercase tracking-wide px-5 py-3">Vehicle</th>
                  <th className="text-left font-medium text-xs text-muted-foreground uppercase tracking-wide px-5 py-3">Location</th>
                  <th className="text-left font-medium text-xs text-muted-foreground uppercase tracking-wide px-5 py-3">Risk Score</th>
                  <th className="text-left font-medium text-xs text-muted-foreground uppercase tracking-wide px-5 py-3">Status</th>
                  <th className="text-right font-medium text-xs text-muted-foreground uppercase tracking-wide px-5 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {filtered.map((v: any) => {
                  const sc = statusConfig[v.status] || statusConfig.clean;
                  const Icon = sc.icon;
                  return (
                    <tr key={v.vin} className="group hover:bg-secondary/30 transition-colors duration-300">
                      <td className="px-5 py-3.5 font-mono text-xs text-foreground">{v.vin}</td>
                      <td className="px-5 py-3.5 text-foreground">{v.owner}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{v.year} {v.make} {v.model}</td>
                      <td className="px-5 py-3.5 text-muted-foreground">{v.city}, {v.state}</td>
                      <td className="px-5 py-3.5">
                        <span className={`font-bold ${v.riskScore >= 80 ? "text-destructive" : v.riskScore >= 40 ? "text-odo-warning" : "text-odo-verified"}`}>
                          {v.riskScore}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${sc.className}`}>
                          <Icon className="h-3 w-3" />
                          {sc.label}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <Link
                          to={`/report/${v.vin}`}
                          className="text-primary text-xs font-medium hover:underline transition-all duration-300"
                        >
                          View Report →
                        </Link>
                      </td>
                    </tr>
                  );
                })}
                {!loading && filtered.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-5 py-12 text-center text-muted-foreground text-sm">
                      {debouncedSearch ? "No vehicles found matching your search criteria." : "Search to scan for vehicles."}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}
