"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { getCurrentUser, signInUser } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (getCurrentUser()) {
      router.replace("/dashboard");
    }
  }, [router]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "").trim();

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    const result = signInUser({ email, password });

    if (!result.success) {
      setError(result.message);
      setLoading(false);
      return;
    }

    router.replace("/dashboard");
  };

  return (
    <AuthShell>
      <h1 className="text-2xl font-semibold">Welcome back</h1>
      <p className="mt-1 text-sm text-muted-foreground">Login to continue to your dashboard.</p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full rounded-xl border border-white/20 bg-background/65 px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-primary/40"
            placeholder="you@example.com"
            autoComplete="email"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="w-full rounded-xl border border-white/20 bg-background/65 px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-primary/40"
            placeholder="Enter password"
            autoComplete="current-password"
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button className="h-10 w-full rounded-xl" type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Login"}
        </Button>
      </form>

      <div className="mt-5 space-y-2 text-sm text-muted-foreground">
        <p>
          New here?{" "}
          <Link className="text-primary hover:underline" href="/signup">
            Create an account
          </Link>
        </p>
        <p>
          Forgot your password?{" "}
          <Link className="text-primary hover:underline" href="/forgot-password">
            Reset it
          </Link>
        </p>
      </div>
    </AuthShell>
  );
}
