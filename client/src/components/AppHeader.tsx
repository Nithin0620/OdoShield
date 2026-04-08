import { Search, Bell, LogOut, User } from "lucide-react";
import { useState } from "react";

export function AppHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <header className="h-16 flex items-center justify-between px-8 bg-background/80 border-b border-border/60 backdrop-blur-md sticky top-0 z-30 mr-8 font-sans">
      <div className="flex-1 flex items-center">
        <div className="flex items-center gap-4 bg-secondary/30 border border-border/80 px-5 rounded-lg py-1.5 min-w-[400px]">
          <Search className="h-4 w-4 text-primary opacity-30" />
          <input
            type="text"
            placeholder="Search Registry // [VIN, OWNER_ID, HUB_TAG]..."
            className="flex-1 bg-transparent border-none text-[11px] outline-none text-foreground placeholder:text-muted-foreground/40 font-bold uppercase tracking-widest"
          />
          <div className="h-4 w-[1px] bg-border/80 mx-2" />
          <span className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Global Scan</span>
        </div>
      </div>
      
      <div className="flex items-center gap-8">
        <div className="flex flex-col items-end">
           <span className="text-[9px] font-black text-muted-foreground uppercase leading-none tracking-widest opacity-40">System_Time</span>
           <span className="text-[11px] font-black text-primary italic mt-1.5">2026-04-08 // 22:30:12</span>
        </div>

        <div className="h-8 w-[1px] bg-border/60" />

        <div className="flex items-center gap-6">
          <button className="h-10 w-10 flex items-center justify-center bg-white border border-border/60 rounded-xl hover:border-primary/40 transition-all text-muted-foreground hover:text-primary relative group shadow-sm">
            <Bell className="h-4 w-4" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-accent border border-white" />
          </button>
          
          <button 
            onClick={() => setIsLoggedIn(!isLoggedIn)}
            className={`flex items-center gap-4 px-5 h-10 rounded-xl font-black uppercase text-[10px] tracking-[0.2em] transition-all border ${
              isLoggedIn 
              ? "bg-primary text-white border-primary shadow-lg shadow-primary/10 hover:bg-black" 
              : "bg-white text-primary border-border hover:border-primary/40 shadow-sm"
            }`}
          >
            {isLoggedIn ? (
              <>
                <LogOut className="h-3.5 w-3.5" />
                Logout
              </>
            ) : (
              <>
                <User className="h-3.5 w-3.5" />
                Login
              </>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
