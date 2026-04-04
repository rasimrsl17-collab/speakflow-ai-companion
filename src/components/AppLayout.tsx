import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  Mic,
  BarChart3,
  BookOpen,
  Menu,
  Flame,
  Bell,
  Settings,
  HelpCircle,
  MessageSquare,
  LogOut,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const desktopLinks = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/practice", label: "Practice" },
  { to: "/progress", label: "Progress" },
  { to: "/vocabulary", label: "Library" },
];

const mobileTabs = [
  { to: "/dashboard", label: "Home", icon: LayoutDashboard },
  { to: "/practice", label: "Practice", icon: Mic, prominent: true },
  { to: "/progress", label: "Progress", icon: BarChart3 },
  { to: "/vocabulary", label: "Library", icon: BookOpen },
];

const DesktopNav = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="hidden md:flex fixed top-0 w-full z-50 backdrop-blur-xl bg-[hsl(var(--surface)/0.8)] border-b border-border/30 h-16 items-center px-6">
      {/* Left — Logo */}
      <button onClick={() => navigate("/dashboard")} className="text-xl font-bold gradient-text mr-8">
        SpeakFlow AI
      </button>

      {/* Center — Links */}
      <div className="flex items-center gap-1 flex-1 justify-center">
        {desktopLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `relative px-4 py-2 text-sm font-medium transition-colors ${
                isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-primary rounded-full animate-scale-in" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>

      {/* Right — Streak, Bell, Avatar */}
      <div className="flex items-center gap-3">
        {/* Streak pill */}
        <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-400 text-xs font-bold">
          <Flame className="w-3.5 h-3.5" />
          {user?.streak ?? 0}
        </div>

        {/* Bell */}
        <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
        </button>

        {/* Avatar dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-sm font-bold text-primary hover:bg-primary/30 transition-colors">
              {user?.name?.charAt(0) ?? "U"}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 glass border-border/50">
            <DropdownMenuLabel className="font-normal">
              <p className="text-sm font-semibold">{user?.name}</p>
              <p className="text-xs text-muted-foreground">{user?.email}</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate("/settings")} className="cursor-pointer">
              <Settings className="w-4 h-4 mr-2" /> Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <HelpCircle className="w-4 h-4 mr-2" /> Help & FAQ
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <MessageSquare className="w-4 h-4 mr-2" /> Send Feedback
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => { logout(); navigate("/"); }} className="cursor-pointer text-destructive focus:text-destructive">
              <LogOut className="w-4 h-4 mr-2" /> Log Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

const MobileTopBar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex md:hidden fixed top-0 w-full z-50 backdrop-blur-xl bg-[hsl(var(--surface)/0.8)] border-b border-border/30 h-14 items-center px-4 justify-between">
      <button onClick={() => navigate("/dashboard")} className="text-lg font-bold gradient-text">
        SpeakFlow AI
      </button>
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 text-orange-400 text-[11px] font-bold">
          <Flame className="w-3 h-3" />
          {user?.streak ?? 0}
        </div>
        <button className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
          {user?.name?.charAt(0) ?? "U"}
        </button>
      </div>
    </div>
  );
};

const MobileBottomSheet = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] md:hidden" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="absolute bottom-0 left-0 right-0 glass rounded-t-3xl p-6 animate-slide-in-bottom"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1 bg-muted-foreground/30 rounded-full mx-auto mb-6" />
        <div className="space-y-1">
          <button onClick={() => { navigate("/settings"); onClose(); }} className="flex items-center gap-3 w-full px-4 py-3 text-sm text-foreground hover:bg-muted/50 rounded-xl transition-colors">
            <Settings className="w-5 h-5 text-muted-foreground" /> Settings
          </button>
          <button className="flex items-center gap-3 w-full px-4 py-3 text-sm text-foreground hover:bg-muted/50 rounded-xl transition-colors">
            <HelpCircle className="w-5 h-5 text-muted-foreground" /> Help & FAQ
          </button>
          <button className="flex items-center gap-3 w-full px-4 py-3 text-sm text-foreground hover:bg-muted/50 rounded-xl transition-colors">
            <MessageSquare className="w-5 h-5 text-muted-foreground" /> Send Feedback
          </button>
        </div>
        <div className="border-t border-border/30 mt-3 pt-3">
          <button onClick={() => { logout(); navigate("/"); onClose(); }} className="flex items-center gap-3 w-full px-4 py-3 text-sm text-destructive hover:bg-muted/50 rounded-xl transition-colors">
            <LogOut className="w-5 h-5" /> Log Out
          </button>
        </div>
        <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

const MobileBottomTabs = () => {
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <>
      <div className="flex md:hidden fixed bottom-0 left-0 right-0 z-50 backdrop-blur-xl bg-[hsl(var(--surface)/0.9)] border-t border-border/30 pb-[env(safe-area-inset-bottom)]">
        <div className="flex w-full justify-around items-end pt-2 pb-1">
          {mobileTabs.map((tab) => (
            <NavLink
              key={tab.to}
              to={tab.to}
              className={({ isActive }) =>
                `flex flex-col items-center gap-0.5 px-3 py-1 text-[10px] font-medium transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`
              }
            >
              {({ isActive }) =>
                tab.prominent ? (
                  <>
                    <div className={`w-12 h-12 -mt-4 rounded-full flex items-center justify-center ${isActive ? "bg-primary" : "bg-primary/20"} transition-colors`}>
                      <tab.icon className={`w-6 h-6 ${isActive ? "text-primary-foreground" : "text-primary"}`} />
                    </div>
                    <span>{tab.label}</span>
                  </>
                ) : (
                  <>
                    <tab.icon className="w-5 h-5" />
                    <span>{tab.label}</span>
                  </>
                )
              }
            </NavLink>
          ))}
          <button
            onClick={() => setSheetOpen(true)}
            className="flex flex-col items-center gap-0.5 px-3 py-1 text-[10px] font-medium text-muted-foreground"
          >
            <Menu className="w-5 h-5" />
            <span>More</span>
          </button>
        </div>
      </div>
      <MobileBottomSheet open={sheetOpen} onClose={() => setSheetOpen(false)} />
    </>
  );
};

const AppLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-background">
    <DesktopNav />
    <MobileTopBar />
    <main className="pt-14 md:pt-16 pb-20 md:pb-0">{children}</main>
    <MobileBottomTabs />
  </div>
);

export default AppLayout;
