import { useState, useEffect } from "react";
import { Download, ChevronDown, ChevronUp, BadgeCheck, ShieldCheck, Sparkles, Loader } from "lucide-react";
import { getVehicleConnections } from "@/api/client";

interface CertificateData {
  vin: string;
  make: string;
  model: string;
  trustScore: number;
  verificationStatus: string;
  certificateId: string;
  currentMileage: number;
  lastVerified: string;
  nextVerified: string;
  resaleWithout: number;
  resaleWith: number;
  percentageIncrease: number;
}

export default function Certificate() {
  const [howOpen, setHowOpen] = useState(false);
  const [certData, setCertData] = useState<CertificateData>({
    vin: "MH02XY3344",
    make: "Honda",
    model: "City",
    trustScore: 97,
    verificationStatus: "TRUSTED VEHICLE",
    certificateId: "ODOSH-2024-TVC-00812",
    currentMileage: 34200,
    lastVerified: "Jan 2024",
    nextVerified: "Jul 2024",
    resaleWithout: 620000,
    resaleWith: 680000,
    percentageIncrease: 8,
  });
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    // Load certificate data from backend
    const loadData = async () => {
      try {
        setLoading(true);
        // In a real scenario, this would fetch trust data from TigerGraph
        const response = await getVehicleConnections(certData.vin);
        console.log("Certificate data loaded:", response);
        setLoading(false);
      } catch (error) {
        console.error("Error loading certificate data:", error);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleDownloadCertificate = async () => {
    try {
      setDownloading(true);
      // Create certificate content
      const certificateContent = `
╔══════════════════════════════════════════════════════════════╗
║           ODOSHIELD VEHICLE TRUST CERTIFICATE               ║
║              Powered by TigerGraph                           ║
╚══════════════════════════════════════════════════════════════╝

VEHICLE INFORMATION:
────────────────────────────────────────────────────────────────
VIN:                      ${certData.vin}
Vehicle:                  ${certData.make} ${certData.model}

TRUST ASSESSMENT:
────────────────────────────────────────────────────────────────
OdoShield Trust Score:    ${certData.trustScore}/100
Verification Status:      ${certData.verificationStatus}
Certificate ID:           ${certData.certificateId}
Certificate Type:         VERIFIED OWNER

VERIFIED MILEAGE DATA:
────────────────────────────────────────────────────────────────
Current Verified Mileage: ${certData.currentMileage.toLocaleString()} km
Last Verification Date:   ${certData.lastVerified}
Next Verification Due:    ${certData.nextVerified}

RESALE VALUE IMPACT:
────────────────────────────────────────────────────────────────
Without OdoShield Cert:   ₹${(certData.resaleWithout / 100000).toFixed(1)}L
With OdoShield Cert:      ₹${(certData.resaleWith / 100000).toFixed(1)}L
Value Increase:           +${certData.percentageIncrease}%

DATA SOURCES VERIFIED:
────────────────────────────────────────────────────────────────
✓ RTO Records
✓ Insurance Claims
✓ Service Center Logs
✓ Blockchain Records
✓ TigerGraph Analysis

VERIFICATION METHOD:
────────────────────────────────────────────────────────────────
Advanced graph-based anomaly detection using TigerGraph's
native community detection and relationship analysis algorithms.
Multi-source data cross-verification ensures integrity.

Generated: ${new Date().toLocaleString()}
Valid Until: ${new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toLocaleDateString()}

This certificate is secured by OdoShield and TigerGraph verification.
For questions, contact support@odoshield.in
────────────────────────────────────────────────────────────────
`;

      // Create blob and download
      const blob = new Blob([certificateContent], { type: "text/plain" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `OdoShield-Certificate-${certData.vin}-${new Date().toISOString().split('T')[0]}.txt`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setTimeout(() => setDownloading(false), 1500);
    } catch (error) {
      console.error("Error downloading certificate:", error);
      setDownloading(false);
    }
  };

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* LEFT - Trust Status */}
      <div className="glass-card p-7 glow-verified animate-slide-up">
        <h2 className="text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-5">
          Vehicle Trust Status
        </h2>

        <div className="flex items-center gap-2 mb-5">
          <span className="text-lg font-bold text-foreground">{certData.vin}</span>
          <span className="text-sm text-muted-foreground">· {certData.make} {certData.model}</span>
        </div>

        <div className="flex gap-2 mb-6">
          <span className="inline-flex items-center gap-1.5 bg-odo-verified-bg text-odo-verified font-semibold text-xs px-3 py-2 rounded-full border border-odo-verified-border shadow-[0_0_12px_hsl(142_64%_45%/0.2)]">
            <ShieldCheck className="h-3.5 w-3.5" />
            TRUSTED VEHICLE
          </span>
          <span className="inline-flex items-center gap-1.5 bg-odo-verified-bg text-odo-verified font-semibold text-xs px-3 py-2 rounded-full border border-odo-verified-border">
            <BadgeCheck className="h-3.5 w-3.5" />
            VERIFIED OWNER
          </span>
        </div>

        <div className="space-y-4 mb-7">
          <div className="flex justify-between text-sm py-2 border-b border-border/50">
            <span className="text-muted-foreground">OdoShield Trust Score</span>
            <span className="font-bold text-odo-verified text-lg">{certData.trustScore}/100</span>
          </div>
          <div className="flex justify-between text-sm py-2 border-b border-border/50">
            <span className="text-muted-foreground">Current Verified Mileage</span>
            <span className="font-semibold text-foreground">{certData.currentMileage.toLocaleString()} km</span>
          </div>
          <div className="flex justify-between text-sm py-2">
            <span className="text-muted-foreground">Certificate ID</span>
            <span className="font-mono text-xs text-primary">{certData.certificateId}</span>
          </div>
        </div>

        <button
          onClick={handleDownloadCertificate}
          disabled={downloading || loading}
          className="inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-medium px-5 py-2.5 rounded-xl hover:scale-105 hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {downloading ? (
            <>
              <Loader className="h-4 w-4 animate-spin" />
              Downloading...
            </>
          ) : (
            <>
              <Download className="h-4 w-4" />
              Download Certificate
            </>
          )}
        </button>
      </div>

      {/* RIGHT - Verification Progress */}
      <div className="space-y-4">
        <div className="glass-card-hover p-6 animate-slide-up-delay-1">
          <h2 className="text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-4">
            Next Verification Due
          </h2>
          <div className="h-3 rounded-full bg-secondary overflow-hidden neo-inset mb-3">
            <div className="h-full rounded-full bg-primary transition-all duration-1000 ease-out" style={{ width: "70%" }} />
          </div>
          <p className="text-xs text-muted-foreground">
            Last verified: {certData.lastVerified} · Next due: {certData.nextVerified}
          </p>
        </div>

        <div className="glass-card-hover p-6 animate-slide-up-delay-2">
          <h2 className="text-xs font-semibold tracking-wide uppercase text-muted-foreground mb-4">
            Resale Value Impact
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between text-sm py-2 border-b border-border/50">
              <span className="text-muted-foreground">Without certificate</span>
              <span className="text-foreground font-medium">₹{(certData.resaleWithout / 100000).toFixed(1)}L estimated</span>
            </div>
            <div className="flex justify-between text-sm py-2">
              <span className="text-muted-foreground">With OdoShield cert</span>
              <div className="text-right">
                <span className="text-odo-verified font-bold">₹{(certData.resaleWith / 100000).toFixed(1)}L</span>
                <span className="ml-2 text-xs bg-odo-verified-bg text-odo-verified px-2 py-0.5 rounded-full border border-odo-verified-border">+{certData.percentageIncrease}%</span>
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
                <span className="h-5 w-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">1</span>
                Vehicle data is aggregated from RTO records, insurance claims, service center logs, and blockchain-verified sources using <strong>TigerGraph</strong>.
              </p>
              <p className="flex items-start gap-2">
                <span className="h-5 w-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">2</span>
                Our <strong>graph-based anomaly detection engine</strong> analyzes relationship patterns across the vehicle's entire network to identify inconsistencies.
              </p>
              <p className="flex items-start gap-2">
                <span className="h-5 w-5 rounded-full bg-primary/20 text-primary text-xs flex items-center justify-center shrink-0 mt-0.5 font-bold">3</span>
                Vehicles passing all TigerGraph checks receive an OdoShield Trust Certificate, increasing buyer confidence and proven resale value by 5-12%.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
