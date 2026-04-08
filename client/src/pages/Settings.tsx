import { useState } from "react";
import { Bell, Shield, Database, User, Save, Check, AlertCircle } from "lucide-react";

export default function Settings() {
  const [riskThreshold, setRiskThreshold] = useState(75);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [dailyDigest, setDailyDigest] = useState(true);
  const [autoFlag, setAutoFlag] = useState(true);
  const [saved, setSaved] = useState(false);
  const [name, setName] = useState("Priya Mehta");
  const [email, setEmail] = useState("priya.m@odoshield.in");
  const [dbConnected, setDbConnected] = useState(true);

  const handleSave = async () => {
    try {
      setSaved(true);
      // Simulate API call to save settings
      const settings = {
        riskThreshold,
        emailAlerts,
        smsAlerts,
        dailyDigest,
        autoFlag,
        name,
        email,
      };
      console.log("Settings saved:", settings);

      // Show success message for 2 seconds
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error("Error saving settings:", error);
      setSaved(false);
    }
  };

  const handleTestDatabase = async () => {
    try {
      // Test TigerGraph connection
      const response = await fetch("http://localhost:3000/api/health");
      const isConnected = response.ok;
      setDbConnected(isConnected);
    } catch {
      setDbConnected(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      {/* Profile */}
      <div className="glass-card p-6 animate-slide-up">
        <div className="flex items-center gap-3 mb-5">
          <User className="h-4 w-4 text-primary" />
          <h2 className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">Profile</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Role</label>
            <input
              type="text"
              defaultValue="Risk Analyst"
              disabled
              className="w-full px-3 py-2 bg-secondary/50 border border-border rounded-lg text-sm text-muted-foreground cursor-not-allowed"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Organization</label>
            <input
              type="text"
              defaultValue="HDFC ERGO"
              disabled
              className="w-full px-3 py-2 bg-secondary/50 border border-border rounded-lg text-sm text-muted-foreground cursor-not-allowed"
            />
          </div>
        </div>
      </div>

      {/* Alert Settings */}
      <div className="glass-card p-6 animate-slide-up-delay-1">
        <div className="flex items-center gap-3 mb-5">
          <Bell className="h-4 w-4 text-primary" />
          <h2 className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">Alert Preferences</h2>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm text-foreground">Email Alerts</p>
              <p className="text-xs text-muted-foreground">Receive fraud alerts via email</p>
            </div>
            <button
              onClick={() => setEmailAlerts(!emailAlerts)}
              className={`relative inline-flex h-5 w-10 items-center rounded-full transition-all duration-300 ${
                emailAlerts ? "bg-primary" : "bg-secondary"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-foreground transition-transform duration-300 ${
                  emailAlerts ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between py-2 border-t border-border/50">
            <div>
              <p className="text-sm text-foreground">SMS Alerts</p>
              <p className="text-xs text-muted-foreground">Critical fraud alerts via SMS</p>
            </div>
            <button
              onClick={() => setSmsAlerts(!smsAlerts)}
              className={`relative inline-flex h-5 w-10 items-center rounded-full transition-all duration-300 ${
                smsAlerts ? "bg-primary" : "bg-secondary"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-foreground transition-transform duration-300 ${
                  smsAlerts ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
          <div className="flex items-center justify-between py-2 border-t border-border/50">
            <div>
              <p className="text-sm text-foreground">Daily Digest</p>
              <p className="text-xs text-muted-foreground">Summary of daily fraud activity</p>
            </div>
            <button
              onClick={() => setDailyDigest(!dailyDigest)}
              className={`relative inline-flex h-5 w-10 items-center rounded-full transition-all duration-300 ${
                dailyDigest ? "bg-primary" : "bg-secondary"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-foreground transition-transform duration-300 ${
                  dailyDigest ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Detection Settings */}
      <div className="glass-card p-6 animate-slide-up-delay-2">
        <div className="flex items-center gap-3 mb-5">
          <Shield className="h-4 w-4 text-primary" />
          <h2 className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">Detection Settings</h2>
        </div>
        <div className="space-y-5">
          <div>
            <div className="flex justify-between mb-2">
              <p className="text-sm text-foreground">Risk Score Threshold</p>
              <span className="text-sm font-bold text-primary">{riskThreshold}</span>
            </div>
            <input
              type="range"
              min={30}
              max={95}
              value={riskThreshold}
              onChange={(e) => setRiskThreshold(Number(e.target.value))}
              className="w-full accent-primary cursor-pointer"
            />
            <p className="text-xs text-muted-foreground mt-1">
              Vehicles scoring above {riskThreshold} will be auto-flagged for review
            </p>
          </div>
          <div className="flex items-center justify-between py-2 border-t border-border/50">
            <div>
              <p className="text-sm text-foreground">Auto-flag suspicious vehicles</p>
              <p className="text-xs text-muted-foreground">Automatically flag when mileage rollback detected</p>
            </div>
            <button
              onClick={() => setAutoFlag(!autoFlag)}
              className={`relative inline-flex h-5 w-10 items-center rounded-full transition-all duration-300 ${
                autoFlag ? "bg-primary" : "bg-secondary"
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-foreground transition-transform duration-300 ${
                  autoFlag ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Database Connection */}
      <div className="glass-card p-6 animate-slide-up-delay-3">
        <div className="flex items-center gap-3 mb-5">
          <Database className="h-4 w-4 text-primary" />
          <h2 className="text-xs font-semibold tracking-wide uppercase text-muted-foreground">Database Connection</h2>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between text-sm py-2 border-b border-border/50">
            <span className="text-muted-foreground">Graph Database</span>
            <span className="text-foreground font-medium">TigerGraph Cloud</span>
          </div>
          <div className="flex justify-between text-sm py-2 border-b border-border/50">
            <span className="text-muted-foreground">Graph Name</span>
            <span className="font-mono text-xs text-primary">OdoShield_FraudGraph</span>
          </div>
          <div className="flex justify-between text-sm py-2 border-b border-border/50">
            <span className="text-muted-foreground">Status</span>
            <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${
              dbConnected ? "text-odo-verified" : "text-destructive"
            }`}>
              <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${
                dbConnected ? "bg-odo-verified" : "bg-destructive"
              }`} />
              {dbConnected ? "Connected" : "Disconnected"}
            </span>
          </div>
          <div className="flex justify-between text-sm py-2">
            <span className="text-muted-foreground">Last Sync</span>
            <span className="text-foreground text-xs">2024-03-16 09:42 IST</span>
          </div>
        </div>
        <button
          onClick={handleTestDatabase}
          className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-secondary hover:bg-secondary/80 text-foreground transition-all duration-300"
        >
          <AlertCircle className="h-4 w-4" />
          Test Connection
        </button>
      </div>

      {/* Save Button */}
      <button
        onClick={handleSave}
        className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
          saved
            ? "bg-odo-verified text-white shadow-[0_0_15px_hsl(142_64%_45%/0.3)]"
            : "bg-primary text-primary-foreground hover:scale-105 hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)]"
        }`}
      >
        {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
        {saved ? "Settings Saved!" : "Save Changes"}
      </button>
    </div>
  );
}
