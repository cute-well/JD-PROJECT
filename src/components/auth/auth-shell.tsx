import type { PropsWithChildren } from "react";

export function AuthShell({ children }: PropsWithChildren) {
  return (
    <div className="w-full max-w-md rounded-3xl border border-white/25 bg-card/70 p-6 shadow-2xl backdrop-blur-2xl sm:p-8">
      {children}
    </div>
  );
}
