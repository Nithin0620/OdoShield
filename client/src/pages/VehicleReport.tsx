import { Shield, FileText, Wrench, GitCommit, AlertTriangle } from "lucide-react";
import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";

/**
 * TODO [TigerGraph Integration]:
 * Replace all mock data below with TigerGraph GSQL queries:
 *
 * 1. Vehicle header info → GET /query/{graph_name}/vehicle_details?vin={vin}
 *    Returns Vehicle vertex attributes (make, model, year, city, state, riskScore).
 *
 * 2. `gaugeData` (fraud score) → GET /query/{graph_name}/fraud_probability?vin={vin}
 *    Runs the anomaly detection algorithm and returns a 0-100 probability score.
 *
 * 3. `timeline` → GET /query/{graph_name}/mileage_timeline?vin={vin}
 *    Returns ordered MileageRecord edges/vertices with source and verification status.
 *
 * 4. `sources` → GET /query/{graph_name}/data_sources?vin={vin}
 *    Returns DataSource vertices connected to this vehicle with verification status.
 *
 * 5. Graph Connections → GET /query/{graph_name}/vehicle_connections?vin={vin}
 *    Traverses Owner→Vehicle→ServiceCenter→Insurance edges to find related entities.
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
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-5 flex items-center justify-between animate-slide-up">
        <div>
          <h1 className="text-lg font-bold text-foreground">
            MH12AB1234
            <span className="text-muted-foreground font-normal ml-2">
              · 2019 Maruti Swift · DZire VXI · Pune, MH
            </span>
          </h1>
        </div>
        <span className="bg-odo-fraud-bg text-destructive font-semibold text-xs px-4 py-1.5 rounded-full border border-odo-fraud-border glow-fraud">
          FRAUD SUSPECTED
        </span>
      </div>

      {/* Fraud Score Gauge */}
      <div className="flex justify-center animate-slide-up-delay-1">
        <div className="glass-card p-8 max-w-sm w-full text-center glow-fraud">
          <p className="text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-4">
            Fraud Probability Score
          </p>
          <div className="flex justify-center">
            <RadialBarChart
              width={220}
              height={220}
              cx={110}
              cy={110}
              innerRadius={75}
              outerRadius={95}
              startAngle={180}
              endAngle={0}
              barSize={14}
              data={gaugeData}
            >
              <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
              <RadialBar
                dataKey="value"
                cornerRadius={8}
                fill="#ef4444"
                background={{ fill: "hsl(230 20% 15%)" }}
                angleAxisId={0}
              />
            </RadialBarChart>
          </div>
          <p className="text-5xl font-black text-destructive -mt-20 animate-pulse-glow">85%</p>
          <p className="text-sm text-muted-foreground mt-5">
            High Risk — Mileage rollback pattern detected
          </p>
        </div>
      </div>

      {/* Two Column */}
      <div className="grid grid-cols-2 gap-6">
        {/* Mileage Timeline */}
        <div className="glass-card p-6 animate-slide-up-delay-2">
          <h2 className="text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-5">
            Mileage Timeline
          </h2>
          <div className="relative pl-6 space-y-6">
            <div className="absolute left-[9px] top-1 bottom-1 w-px bg-border" />
            {timeline.map((t, i) => (
              <div key={i} className="relative group">
                <div
                  className={`absolute -left-6 top-0.5 h-4 w-4 rounded-full border-2 transition-all duration-300 group-hover:scale-125 ${
                    t.status === "anomaly"
                      ? "bg-destructive border-odo-fraud-border shadow-[0_0_10px_hsl(0_72%_55%/0.5)]"
                      : "bg-odo-verified border-odo-verified-border shadow-[0_0_8px_hsl(142_64%_45%/0.3)]"
                  }`}
                />
                <div className="flex items-baseline gap-3">
                  <span className="text-sm font-bold text-foreground">{t.year}</span>
                  <span className="text-sm text-foreground/80">{t.km}</span>
                </div>
                <p className={`text-xs mt-0.5 ${t.status === "anomaly" ? "text-destructive font-medium" : "text-muted-foreground"}`}>
                  {t.status === "anomaly" ? "⚠ ANOMALY" : "✓ Verified"} — {t.source}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-5 bg-odo-fraud-bg border border-odo-fraud-border rounded-lg p-4 text-sm text-destructive flex items-start gap-3 glow-fraud">
            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>Mileage decreased by 41,000 km between 2023–2024. Impossible under normal conditions.</span>
          </div>
        </div>

        {/* Data Source Verification + Graph Connections */}
        <div className="space-y-4">
          <div className="glass-card-hover p-6 animate-slide-up-delay-2">
            <h2 className="text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-4">
              Data Source Verification
            </h2>
            <div className="space-y-3">
              {sources.map((s) => (
                <div key={s.name} className="flex items-center gap-3 group">
                  <div className={`h-8 w-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                    s.ok ? "bg-odo-verified-bg" : "bg-odo-fraud-bg"
                  }`}>
                    <s.icon className={`h-4 w-4 ${s.ok ? "text-odo-verified" : "text-destructive"}`} />
                  </div>
                  <span className="flex-1 text-sm text-foreground">{s.name}</span>
                  <span
                    className={`text-xs font-medium px-2.5 py-1 rounded-full transition-all duration-300 ${
                      s.ok
                        ? "bg-odo-verified-bg text-odo-verified border border-odo-verified-border"
                        : "bg-odo-fraud-bg text-destructive border border-odo-fraud-border"
                    }`}
                  >
                    {s.ok ? "✓" : "✗"} {s.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card-hover p-6 animate-slide-up-delay-3">
            <h2 className="text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-4">
              Graph Connections
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center py-2 border-b border-border/50">
                <span className="text-muted-foreground">Owner</span>
                <span className="text-foreground">Rajesh Kumar · <span className="text-destructive text-xs">3 vehicles in fraud cluster</span></span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-border/50">
                <span className="text-muted-foreground">Service Center</span>
                <span className="text-foreground">AutoFix Hub · <span className="text-destructive text-xs">Risk Score 94</span></span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-muted-foreground">Insurance</span>
                <span className="text-foreground">Policy #MH-2023-44821</span>
              </div>
              <p className="text-xs text-muted-foreground bg-odo-warning-bg border border-odo-warning-border rounded-lg p-3">
                ⚠ Claim filed 2 days after last service
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
