import { BarChart3, BriefcaseBusiness, House, UserRoundSearch } from "lucide-react";

const navItems = [
  { icon: House, label: "Overview" },
  { icon: UserRoundSearch, label: "Career Coach" },
  { icon: BriefcaseBusiness, label: "Roadmaps" },
  { icon: BarChart3, label: "Insights" },
];

export function Sidebar() {
  return (
    <aside className="hidden w-72 shrink-0 border-r border-white/20 bg-background/40 p-4 backdrop-blur-xl lg:block">
      <div className="rounded-2xl border border-white/20 bg-card/70 p-3 shadow-sm">
        <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Workspace
        </p>
        <nav className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm transition hover:bg-primary/10"
            >
              <item.icon className="h-4 w-4 text-primary" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
}
