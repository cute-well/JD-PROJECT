"use client";

import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="mx-auto mt-16 max-w-xl rounded-2xl border border-red-500/30 bg-card/70 p-8 text-center shadow-xl backdrop-blur-xl">
      <AlertTriangle className="mx-auto mb-3 h-8 w-8 text-red-500" />
      <h2 className="text-xl font-semibold">Something went wrong</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Please retry. If this persists, refresh the page to recover.
      </p>
      <Button className="mt-6" onClick={reset}>
        Try again
      </Button>
    </div>
  );
}
