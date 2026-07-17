"use client";

import { Activity, BriefcaseBusiness, ChartNoAxesCombined, FileCheck2, LogOut, Plus, UserCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { getCurrentUser, signOut } from "@/lib/auth";
import type { AuthSession } from "@/types";

function GlassCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border border-white/20 bg-card/70 p-5 shadow-xl backdrop-blur-xl ${className}`}>
      {children}
    </section>
  );
}

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<AuthSession | null>(null);

  useEffect(() => {
    const session = getCurrentUser();
    if (!session) {
      router.replace("/login");
      return;
    }

    setUser(session);
  }, [router]);

  const stats = useMemo(
    () => [
      { label: "Applications", value: "18", note: "+3 this week", icon: BriefcaseBusiness },
      { label: "Interviews", value: "6", note: "2 upcoming", icon: Activity },
      { label: "ATS Avg Score", value: "84%", note: "+6 points", icon: ChartNoAxesCombined },
    ],
    [],
  );

  const handleSignOut = () => {
    signOut();
    router.replace("/login");
  };

  if (!user) {
    return null;
  }

  return (
    <div className="space-y-6">
      <GlassCard>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm uppercase tracking-widest text-muted-foreground">Welcome back</p>
            <h1 className="text-2xl font-semibold">{user.name}</h1>
            <p className="text-sm text-muted-foreground">Here is your career momentum at a glance.</p>
          </div>
          <Button variant="outline" className="rounded-xl" onClick={handleSignOut}>
            <LogOut className="mr-2 h-4 w-4" /> Logout
          </Button>
        </div>
      </GlassCard>

      <div className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <GlassCard key={stat.label}>
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <stat.icon className="h-4 w-4 text-primary" />
            </div>
            <p className="mt-2 text-3xl font-semibold">{stat.value}</p>
            <p className="text-sm text-emerald-500">{stat.note}</p>
          </GlassCard>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <GlassCard className="xl:col-span-2">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="rounded-xl border border-white/20 bg-background/55 p-3">Updated backend engineer resume for ATS optimization.</li>
            <li className="rounded-xl border border-white/20 bg-background/55 p-3">Added 2 projects to portfolio and shared profile link.</li>
            <li className="rounded-xl border border-white/20 bg-background/55 p-3">Completed mock interview challenge with 92% score.</li>
          </ul>
        </GlassCard>

        <GlassCard>
          <h2 className="text-lg font-semibold">Profile Card</h2>
          <div className="mt-4 flex items-center gap-3">
            <div className="rounded-full border border-white/30 bg-background/60 p-3">
              <UserCircle2 className="h-8 w-8 text-primary" />
            </div>
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">Profile strength: Strong foundation, add 1 certification to improve.</p>
        </GlassCard>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <GlassCard>
          <h3 className="text-sm font-medium text-muted-foreground">Resume Completion Card</h3>
          <p className="mt-2 text-2xl font-semibold">86%</p>
          <div className="mt-3 h-2 rounded-full bg-white/20">
            <div className="h-2 w-[86%] rounded-full bg-primary" />
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="text-sm font-medium text-muted-foreground">Portfolio Completion Card</h3>
          <p className="mt-2 text-2xl font-semibold">74%</p>
          <div className="mt-3 h-2 rounded-full bg-white/20">
            <div className="h-2 w-[74%] rounded-full bg-cyan-500" />
          </div>
        </GlassCard>

        <GlassCard>
          <h3 className="text-sm font-medium text-muted-foreground">ATS Score Card</h3>
          <p className="mt-2 text-2xl font-semibold">84 / 100</p>
          <p className="mt-2 text-sm text-muted-foreground">Top keyword match: React, TypeScript, CI/CD</p>
        </GlassCard>

        <GlassCard>
          <h3 className="text-sm font-medium text-muted-foreground">Quick Actions</h3>
          <div className="mt-3 space-y-2">
            <button type="button" className="flex w-full items-center gap-2 rounded-lg border border-white/20 bg-background/60 px-3 py-2 text-left text-sm hover:bg-primary/10">
              <FileCheck2 className="h-4 w-4 text-primary" /> Review Resume
            </button>
            <button type="button" className="flex w-full items-center gap-2 rounded-lg border border-white/20 bg-background/60 px-3 py-2 text-left text-sm hover:bg-primary/10">
              <Plus className="h-4 w-4 text-primary" /> Add Project
            </button>
            <button type="button" className="flex w-full items-center gap-2 rounded-lg border border-white/20 bg-background/60 px-3 py-2 text-left text-sm hover:bg-primary/10">
              <BriefcaseBusiness className="h-4 w-4 text-primary" /> Track Application
            </button>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
