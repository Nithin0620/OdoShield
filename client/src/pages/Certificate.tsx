import { useState, useEffect } from "react";
import { Download, ChevronDown, ChevronUp, BadgeCheck, ShieldCheck, Sparkles, Loader2, AlertTriangle } from "lucide-react";
import { useCertificateStore } from "../store/certificateStore";

export default function Certificate() {
  const [howOpen, setHowOpen] = useState(false);
  const { status, verification, fetchCertificateData, loading, error } = useCertificateStore();

  useEffect(() => {
    // For demo purposes, we fetch a default vehicle certificate
    fetchCertificateData("MH02XY3344");
  }, [fetchCertificateData]);

  if (loading) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-primary">
          <Loader2 className="h-8 w-8 animate-spin" />
          <p className="text-sm font-medium">Validating Graph Integrity...</p>
        </div>
      </div>
    );
  }

  if (error || !status) {
    return (
      <div className="bg-destructive/10 border border-destructive/20 text-destructive p-4 rounded-xl">
        <p className="font-medium flex items-center gap-2"><AlertTriangle className="h-4 w-4" /> Certification Failed</p>
        <p className="text-sm opacity-80 mt-1">{error || "Vehicle trust verification could not be completed."}</p>
      </div>
    );
  }

  const isTrusted = status?.score >= 90;

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* LEFT - Trust Status */}
      <div className={`glass-card p-7 animate-slide-up ${isTrusted ? 'glow-verified' : 'glow-fraud'}`}>
        <h2 className="text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-5">
          Vehicle Trust Status
        </h2>

        <div className="flex items-center gap-2 mb-5">
          <span className="text-lg font-bold text-foreground">{status.vin || "MH02XY3344"}</span>
          <span className="text-sm text-muted-foreground">· {status.details || "2020 Honda City"}</span>
        </div>

        <div className="flex gap-2 mb-6">
          <span className={`inline-flex items-center gap-1.5 font-semibold text-xs px-3 py-2 rounded-full border shadow-sm ${
            isTrusted 
              ? "bg-odo-verified-bg text-odo-verified border-odo-verified-border"
              : "bg-odo-warning-bg text-odo-warning border-odo-warning-border"
          }`}>
            <ShieldCheck className="h-3.5 w-3.5" />
            {isTrusted ? "TRUSTED VEHICLE" : "VERIFICATION PENDING"}
          </span>
          {status.verifiedOwner && (
            <span className="inline-flex items-center gap-1.5 bg-odo-verified-bg text-odo-verified font-semibold text-xs px-3 py-2 rounded-full border border-odo-verified-border">
              <BadgeCheck className="h-3.5 w-3.5" />
              VERIFIED OWNER
            </span>
          )}
        </div>

        <div className="space-y-4 mb-7">
          <div className="flex justify-between text-sm py-2 border-b border-border/50">
            <span className="text-muted-foreground">OdoShield Trust Score</span>
            <span className={`font-bold text-lg ${isTrusted ? "text-odo-verified" : "text-odo-warning"}`}>
              {status.score || 0}/100
            </span>
          </div>
          <div className="flex justify-between text-sm py-2 border-b border-border/50">
            <span className="text-muted-foreground">Current Verified Mileage</span>
            <span className="font-semibold text-foreground">{status.mileage || "0 km"}</span>
          </div>
          <div className="flex justify-between text-sm py-2">
            <span className="text-muted-foreground">Certificate ID</span>
            <span className="font-mono text-xs text-primary">{status.certId || "PENDING"}</span>
          </div>
        </div>

        <button disabled={!isTrusted} className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-medium px-5 py-2.5 rounded-xl hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 hover:shadow-[0_0_20px_hsl(250_85%_65%/0.3)] transition-all duration-300">
          <Download className="h-4 w-4" />
          Download Certificate
        </button>
      </div>

      {/* RIGHT - Verification Progress */}
      <div className="space-y-4">
        <div className="glass-card-hover p-6 animate-slide-up-delay-1">
          <h2 className="text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-4">
            Next Verification Due
          </h2>
          <div className="h-3 rounded-full bg-secondary overflow-hidden neo-inset mb-3">
            <div className="h-full rounded-full bg-primary transition-all duration-1000 ease-out" style={{ width: `${verification?.progressPct || 0}%` }} />
          </div>
          <p className="text-xs text-muted-foreground">
            Last verified: {verification?.lastVerified || "N/A"} · Next due: {verification?.nextDue || "N/A"}
          </p>
        </div>

        <div className="glass-card-hover p-6 animate-slide-up-delay-2">
          <h2 className="text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-4">
            Resale Value Impact
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between text-sm py-2 border-b border-border/50">
              <span className="text-muted-foreground">Without certificate</span>
              <span className="text-foreground font-medium">{status.resaleWithout || "₹0"} estimated</span>
            </div>
            <div className="flex justify-between text-sm py-2">
              <span className="text-muted-foreground">With OdoShield cert</span>
              <div className="text-right">
                <span className="text-odo-verified font-bold">{status.resaleWith || "₹0"}</span>
                {status.resaleBoostPct && (
                  <span className="ml-2 text-xs bg-odo-verified-bg text-odo-verified px-2 py-0.5 rounded-full border border-odo-verified-border">+{status.resaleBoostPct}%</span>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="glass-card animate-slide-up-delay-3">
          <button
            onClick={() => setHowOpen(!howOpen)}
            className="w-full flex items-center justify-between p-5 text-sm font-medium text-foreground hover:bg-secondary/30 transition-all duration-300 rounded-xl"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-primary" />
              How it works
            </span>
            {howOpen ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
          </button>
          <div
            className={`overflow-hidden transition-all duration-500 ease-out ${howOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"}`}
          >
            <div className="px-5 pb-5 text-sm text-muted-foreground space-y-3">
              <p className="flex items-start gap-2">
                <span className="h-5 w-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
                Vehicle data is aggregated from RTO records, insurance claims, service center logs, and blockchain-verified sources.
              </p>
              <p className="flex items-start gap-2">
                <span className="h-5 w-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
                Our graph-based anomaly detection engine identifies inconsistencies in mileage patterns across multiple data points.
              </p>
              <p className="flex items-start gap-2">
                <span className="h-5 w-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
                Vehicles that pass all checks receive an OdoShield Trust Certificate, increasing buyer confidence and resale value.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
