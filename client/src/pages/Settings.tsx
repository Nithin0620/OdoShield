import { useState, useEffect } from "react";
import { Bell, Shield, Database, User, Save, Check, Loader2, AlertTriangle } from "lucide-react";
import { useSettingsStore } from "../store/settingsStore";

export default function Settings() {
  const { health, loading, error, checkHealth, updatePreferences } = useSettingsStore();
  
  const [riskThreshold, setRiskThreshold] = useState(75);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(false);
  const [dailyDigest, setDailyDigest] = useState(true);
  const [autoFlag, setAutoFlag] = useState(true);
  
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    checkHealth();
  }, [checkHealth]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updatePreferences("user-1", {
        riskThreshold, emailAlerts, smsAlerts, dailyDigest, autoFlag
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
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
              defaultValue="Priya Mehta"
              className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Role</label>
            <input
              type="text"
              defaultValue="Risk Analyst"
              disabled
              className="w-full px-3 py-2 bg-secondary/50 border border-border rounded-lg text-sm text-muted-foreground"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Email</label>
            <input
              type="email"
              defaultValue="priya.m@odoshield.in"
              className="w-full px-3 py-2 bg-secondary border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">Organization</label>
            <input
              type="text"
              defaultValue="HDFC ERGO"
              disabled
              className="w-full px-3 py-2 bg-secondary/50 border border-border rounded-lg text-sm text-muted-foreground"
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
              className={`w-10 h-5 rounded-full transition-all duration-300 ${emailAlerts ? "bg-primary" : "bg-secondary"}`}
            >
              <div className={`h-4 w-4 rounded-full bg-foreground transition-transform duration-300 ${emailAlerts ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
          </div>
          <div className="flex items-center justify-between py-2 border-t border-border/50">
            <div>
              <p className="text-sm text-foreground">SMS Alerts</p>
              <p className="text-xs text-muted-foreground">Critical fraud alerts via SMS</p>
            </div>
            <button
              onClick={() => setSmsAlerts(!smsAlerts)}
              className={`w-10 h-5 rounded-full transition-all duration-300 ${smsAlerts ? "bg-primary" : "bg-secondary"}`}
            >
              <div className={`h-4 w-4 rounded-full bg-foreground transition-transform duration-300 ${smsAlerts ? "translate-x-5" : "translate-x-0.5"}`} />
            </button>
          </div>
          <div className="flex items-center justify-between py-2 border-t border-border/50">
            <div>
              <p className="text-sm text-foreground">Daily Digest</p>
              <p className="text-xs text-muted-foreground">Summary of daily fraud activity</p>
            </div>
            <button
              onClick={() => setDailyDigest(!dailyDigest)}
              className={`w-10 h-5 rounded-full transition-all duration-300 ${dailyDigest ? "bg-primary" : "bg-secondary"}`}
            >
              <div className={`h-4 w-4 rounded-full bg-foreground transition-transform duration-300 ${dailyDigest ? "translate-x-5" : "translate-x-0.5"}`} />
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
              className="w-full accent-primary"
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
              className={`w-10 h-5 rounded-full transition-all duration-300 ${autoFlag ? "bg-primary" : "bg-secondary"}`}
            >
              <div className={`h-4 w-4 rounded-full bg-foreground transition-transform duration-300 ${autoFlag ? "translate-x-5" : "translate-x-0.5"}`} />
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
        {loading ? (
           <div className="flex justify-center items-center py-4"><Loader2 className="w-5 h-5 text-primary animate-spin" /></div>
        ) : error || !health ? (
           <div className="flex items-center gap-2 text-destructive text-sm"><AlertTriangle className="h-4 w-4" /> Node Unreachable</div>
        ) : (
          <div className="space-y-3">
            <div className="flex justify-between text-sm py-2 border-b border-border/50">
              <span className="text-muted-foreground">Graph Database</span>
              <span className="text-foreground font-medium">TigerGraph Engine</span>
            </div>
            <div className="flex justify-between text-sm py-2 border-b border-border/50">
              <span className="text-muted-foreground">Graph Name</span>
              <span className="font-mono text-xs text-primary">Live Connection</span>
            </div>
            <div className="flex justify-between text-sm py-2 border-b border-border/50">
              <span className="text-muted-foreground">Status</span>
              <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${health.status === 'up' ? 'text-odo-verified' : 'text-destructive'}`}>
                <span className={`h-1.5 w-1.5 rounded-full animate-pulse-glow ${health.status === 'up' ? 'bg-odo-verified' : 'bg-destructive'}`} />
                {health.status === 'up' ? 'Connected' : 'Disconnected'}
              </span>
            </div>
            <div className="flex justify-between text-sm py-2">
              <span className="text-muted-foreground">Node Details</span>
              <span className="text-foreground text-xs">{health.message || 'Running'}</span>
            </div>
          </div>
        )}
      </div>

      {/* Save */}
      <button
        onClick={handleSave}
        disabled={saving}
        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
          saved
            ? "bg-odo-verified text-white"
            : "bg-primary text-primary-foreground hover:scale-105 hover:shadow-[0_0_20px_hsl(var(--primary)/0.3)] disabled:opacity-50"
        }`}
      >
        {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
        {saved ? "Settings Saved!" : saving ? "Saving..." : "Save Changes"}
      </button>
    </div>
  );
}
