import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Shield, FileText, Wrench, GitCommit, AlertTriangle, Loader2 } from "lucide-react";
import { RadialBarChart, RadialBar, PolarAngleAxis } from "recharts";
import { useVehicleStore } from "../store/vehicleStore";

const iconMap: Record<string, any> = {
  Shield, FileText, Wrench, GitCommit
};

export default function VehicleReport() {
  const { vin } = useParams<{ vin: string }>();
  const { vehicleDetails, fraudProbability, mileageTimeline, dataSources, connections, loading, error, fetchVehicleData } = useVehicleStore();

  useEffect(() => {
    if (vin) {
      fetchVehicleData(vin);
    }
  }, [vin, fetchVehicleData]);

  if (loading) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-primary">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="text-sm font-medium">Scanning Graph Entities...</p>
        </div>
      </div>
    );
  }

  if (error || !vehicleDetails) {
    return (
      <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-xl">
        <p className="font-medium flex items-center gap-2"><AlertTriangle className="h-4 w-4" /> Failed to analyze vehicle</p>
        <p className="text-sm opacity-80 mt-1">{error || "Vehicle not found in graph."}</p>
      </div>
    );
  }

  const riskScore = fraudProbability?.value || vehicleDetails?.riskScore || 0;
  const isHighRisk = riskScore >= 80;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="glass-card p-5 flex items-center justify-between animate-slide-up">
        <div>
          <h1 className="text-lg font-bold text-foreground">
            {vehicleDetails.vin || vin}
            <span className="text-muted-foreground font-normal ml-2">
              · {vehicleDetails.year} {vehicleDetails.make} {vehicleDetails.model} · {vehicleDetails.city}, {vehicleDetails.state}
            </span>
          </h1>
        </div>
        {isHighRisk && (
          <span className="bg-odo-fraud-bg text-destructive font-semibold text-xs px-4 py-1.5 rounded-full border border-odo-fraud-border glow-fraud">
            FRAUD SUSPECTED
          </span>
        )}
      </div>

      {/* Fraud Score Gauge */}
      <div className="flex justify-center animate-slide-up-delay-1">
        <div className={`glass-card p-8 max-w-sm w-full text-center ${isHighRisk ? 'glow-fraud' : 'glow-verified'}`}>
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
              data={[{ value: riskScore }]}
            >
              <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
              <RadialBar
                dataKey="value"
                cornerRadius={8}
                fill={isHighRisk ? "#ef4444" : "#22c55e"}
                background={{ fill: "hsl(230 20% 15%)" }}
                angleAxisId={0}
              />
            </RadialBarChart>
          </div>
          <p className={`text-5xl font-black -mt-20 ${isHighRisk ? 'text-destructive animate-pulse-glow' : 'text-odo-verified'}`}>
            {riskScore}%
          </p>
          <p className="text-sm text-muted-foreground mt-5">
            {isHighRisk ? "High Risk — Mileage rollback pattern detected" : "Low Risk — Verification checks passed"}
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
          {mileageTimeline?.length > 0 ? (
            <div className="relative pl-6 space-y-6">
              <div className="absolute left-[9px] top-1 bottom-1 w-px bg-border" />
              {mileageTimeline.map((t: any, i: number) => (
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
          ) : (
            <div className="text-sm text-muted-foreground">No mileage records found in graph.</div>
          )}
          
          {isHighRisk && (
            <div className="mt-5 bg-odo-fraud-bg border border-odo-fraud-border rounded-lg p-4 text-sm text-destructive flex items-start gap-3 glow-fraud">
              <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
              <span>Inconsistent mileage sequences detected matching a major rollback pattern. Impossible under normal conditions.</span>
            </div>
          )}
        </div>

        {/* Data Source Verification + Graph Connections */}
        <div className="space-y-4">
          <div className="glass-card-hover p-6 animate-slide-up-delay-2">
            <h2 className="text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-4">
              Data Source Verification
            </h2>
            <div className="space-y-3">
              {dataSources?.length > 0 ? dataSources.map((s: any) => {
                const Icon = iconMap[s.icon] || Shield;
                return (
                  <div key={s.name} className="flex items-center gap-3 group">
                    <div className={`h-8 w-8 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      s.ok ? "bg-odo-verified-bg" : "bg-odo-fraud-bg"
                    }`}>
                      <Icon className={`h-4 w-4 ${s.ok ? "text-odo-verified" : "text-destructive"}`} />
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
                );
              }) : (
                <div className="text-xs text-muted-foreground text-center">No data sources connected</div>
              )}
            </div>
          </div>

          <div className="glass-card-hover p-6 animate-slide-up-delay-3">
            <h2 className="text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-4">
              Graph Connections
            </h2>
            <div className="space-y-3 text-sm">
              {connections?.length > 0 ? connections.map((conn: any, i: number) => (
                <div key={i} className={`flex justify-between items-center py-2 ${i < connections.length - 1 ? 'border-b border-border/50' : ''}`}>
                  <span className="text-muted-foreground">{conn.type}</span>
                  <span className="text-foreground">
                    {conn.label} {conn.risk && <span className="text-destructive text-xs ml-1">· {conn.risk}</span>}
                  </span>
                </div>
              )) : (
                <div className="text-xs text-muted-foreground text-center py-2">No connected entities discovered in graph</div>
              )}

              {isHighRisk && (
                <p className="text-xs text-muted-foreground bg-odo-warning-bg border border-odo-warning-border rounded-lg p-3">
                  ⚠ Discovered connection to flagged entities in local cluster. Extracted via multi-hop traversal.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
