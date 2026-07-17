import { Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/20 bg-background/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2 text-sm font-semibold">
          <span className="rounded-full bg-primary/15 p-2 text-primary">
            <Sparkles className="h-4 w-4" />
          </span>
          CareerCanvas AI
        </div>
        <ThemeToggle />
      </div>
    </header>
  );
}
