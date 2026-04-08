import { Search, Bell, Sparkles } from "lucide-react";

export function AppHeader() {
  return (
    <header className="h-16 border-b border-border flex items-center justify-between px-6 bg-card/40 backdrop-blur-xl shrink-0">
      <div className="relative group">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors duration-300 group-focus-within:text-primary" />
        <input
          type="text"
          placeholder="Search VIN, Registration, Owner ID…"
          className="w-96 h-10 pl-10 pr-4 text-sm rounded-xl border border-border bg-secondary/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50 placeholder:text-muted-foreground transition-all duration-300"
        />
      </div>
      <div className="flex items-center gap-3">
        <button className="relative p-2 rounded-xl hover:bg-secondary transition-all duration-300 group">
          <Sparkles className="h-4 w-4 text-primary animate-pulse-glow" />
        </button>
        <button className="relative p-2 rounded-xl hover:bg-secondary transition-all duration-300 group">
          <Bell className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-destructive animate-pulse-glow" />
        </button>
        <div className="h-9 w-9 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-primary-foreground text-xs font-bold shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300">
          PM
        </div>
      </div>
    </header>
  );
}
