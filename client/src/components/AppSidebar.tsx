import { useLocation, Link } from "react-router-dom";
import {
  Shield,
  LayoutDashboard,
  Search,
  FileText,
  Network,
  BadgeCheck,
  Settings,
  Zap,
} from "lucide-react";

const navItems = [
  { title: "Dashboard", url: "/", icon: LayoutDashboard },
  { title: "Vehicle Lookup", url: "/lookup", icon: Search },
  { title: "Risk Reports", url: "/report/MH12AB1234", icon: FileText },
  { title: "Fraud Rings", url: "/fraud-rings", icon: Network },
  { title: "Trust Certificates", url: "/certificate", icon: BadgeCheck },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const location = useLocation();

  const isActive = (url: string) => {
    if (url === "/") return location.pathname === "/";
    return location.pathname.startsWith(url);
  };

  return (
    <aside className="w-64 shrink-0 flex flex-col bg-sidebar border-r border-sidebar-border relative z-40 font-sans">
      {/* Console Header */}
      <div className="p-8 border-b border-sidebar-border bg-white relative overflow-hidden">
        <div className="absolute inset-0 road-bg opacity-[0.02] -rotate-1" />
        <div className="flex items-center gap-4 relative z-10">
          <div className="h-10 w-10 flex items-center justify-center bg-primary text-primary-foreground rounded-xl shadow-lg shadow-primary/20 rotate-3 transition-transform hover:rotate-0">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tight uppercase text-primary leading-none">OdoShield</h1>
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-odo-verified animate-pulse" />
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">Network Online</span>
            </div>
          </div>
        </div>
      </div>

      {/* Rack Nav */}
      <nav className="flex-1 p-6 space-y-3">
        {navItems.map((item, i) => {
          const active = isActive(item.url);
          return (
            <Link
              key={item.title}
              to={item.url}
              className={`group flex items-center justify-between px-5 py-3.5 rounded-xl transition-all duration-300 relative ${
                active
                  ? "bg-primary text-primary-foreground shadow-xl shadow-primary/10 scale-[1.02] border border-primary"
                  : "bg-transparent text-muted-foreground hover:bg-white hover:text-foreground hover:shadow-sm border border-transparent"
              }`}
            >
              <div className="flex items-center gap-4">
                <item.icon className={`h-4 w-4 transition-colors ${active ? "text-primary-foreground" : "text-primary/40 group-hover:text-primary"}`} />
                <span className="text-sm font-black uppercase tracking-tight leading-none">{item.title}</span>
              </div>
              {active && (
                <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Telemetry Block */}
      <div className="p-8 border-t border-sidebar-border bg-secondary/20 relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1 road-bg opacity-[0.05]" />
        <div className="space-y-5 relative z-10">
          <div className="flex justify-between items-end">
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none">Global Scan Rate</span>
            <span className="text-[10px] font-black text-primary italic leading-none">12.4 Hz</span>
          </div>
          <div className="h-1.5 bg-secondary rounded-full overflow-hidden border border-border/40">
             <div className="h-full bg-primary/30 animate-shimmer" style={{ width: '65%' }} />
          </div>
          
          <div className="flex items-center gap-4 mt-8 p-4 bg-white rounded-2xl shadow-sm border border-border/40 group cursor-pointer hover:border-primary/20 transition-all">
            <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center text-[11px] font-black text-primary border border-border relative group-hover:bg-primary group-hover:text-white transition-all transform group-hover:rotate-3 shadow-sm">
              OP
            </div>
            <div className="flex-1 min-w-0">
               <p className="text-xs font-black text-foreground truncate">Operator Priya</p>
               <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">Level 4 Clearance</p>
            </div>
            <Zap className="h-3 w-3 text-accent animate-pulse" />
          </div>
        </div>
      </div>
    </aside>
  );
}
