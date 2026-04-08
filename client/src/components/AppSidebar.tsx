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
    <aside className="w-60 shrink-0 border-r border-border flex flex-col bg-sidebar">
      {/* Logo */}
      <div className="h-16 flex items-center gap-2.5 px-5 border-b border-border">
        <div className="h-8 w-8 rounded-lg bg-primary/20 flex items-center justify-center glow-primary">
          <Shield className="h-4.5 w-4.5 text-primary" />
        </div>
        <span className="text-base font-bold tracking-tight text-foreground">
          OdoShield
        </span>
        <Zap className="h-3 w-3 text-primary animate-pulse-glow ml-auto" />
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-3 space-y-1">
        {navItems.map((item, i) => {
          const active = isActive(item.url);
          return (
            <Link
              key={item.title}
              to={item.url}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-300 group ${
                active
                  ? "bg-primary/15 text-primary font-medium shadow-[inset_0_0_20px_-8px_hsl(var(--primary)/0.2)]"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <item.icon className={`h-4 w-4 transition-transform duration-300 group-hover:scale-110 ${active ? "text-primary" : ""}`} />
              <span>{item.title}</span>
              {active && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary animate-pulse-glow" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User */}
      <div className="border-t border-border p-4 flex items-center gap-3">
        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-xs font-bold shadow-lg">
          PM
        </div>
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground truncate">Priya M.</p>
          <p className="text-xs text-muted-foreground">Analyst</p>
        </div>
      </div>
    </aside>
  );
}
