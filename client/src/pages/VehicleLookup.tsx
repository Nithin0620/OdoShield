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

const statusConfig = {
  fraud: { label: "Fraud Suspected", icon: AlertTriangle, className: "bg-odo-fraud-bg text-destructive border-odo-fraud-border" },
  suspicious: { label: "Suspicious", icon: Clock, className: "bg-odo-warning-bg text-odo-warning border-odo-warning-border" },
  clean: { label: "Clean", icon: ShieldCheck, className: "bg-odo-verified-bg text-odo-verified border-odo-verified-border" },
};

export default function VehicleLookup() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  /**
   * TODO [TigerGraph Integration]:
   * Replace this client-side filter with a server-side GSQL query.
   * Use interpreted query or installed query for full-text search across vertices.
   */
  const filtered = mockVehicles.filter((v) => {
    const matchesSearch =
      !search ||
      v.vin.toLowerCase().includes(search.toLowerCase()) ||
      v.owner.toLowerCase().includes(search.toLowerCase()) ||
      v.city.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || v.status === statusFilter;
    return matchesSearch && matchesStatus;
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

      {/* Results Count */}
      <div className="flex items-center justify-between animate-slide-up-delay-1">
        <p className="text-xs text-muted-foreground">
          Showing <span className="text-foreground font-medium">{filtered.length}</span> of {mockVehicles.length} vehicles
        </p>
      </div>

      {/* Results Table */}
      <div className="glass-card overflow-hidden animate-slide-up-delay-2">
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
            {filtered.map((v) => {
              const sc = statusConfig[v.status as keyof typeof statusConfig];
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
                      <sc.icon className="h-3 w-3" />
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
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-muted-foreground text-sm">
                  No vehicles found matching your search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
