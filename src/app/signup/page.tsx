"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { AuthShell } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { getCurrentUser, signUpUser } from "@/lib/auth";

export default function SignupPage() {
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
    const name = String(formData.get("name") ?? "").trim();
    const email = String(formData.get("email") ?? "").trim();
    const password = String(formData.get("password") ?? "");
    const confirmPassword = String(formData.get("confirmPassword") ?? "");

    if (!name || !email || !password) {
      setError("Name, email, and password are required.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const result = signUpUser({ name, email, password });

    if (!result.success) {
      setError(result.message);
      setLoading(false);
      return;
    }

    router.replace("/dashboard");
  };

  return (
    <AuthShell>
      <h1 className="text-2xl font-semibold">Create your account</h1>
      <p className="mt-1 text-sm text-muted-foreground">Start building your career dashboard.</p>

      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="name">
            Full Name
          </label>
          <input
            id="name"
            name="name"
            className="w-full rounded-xl border border-white/20 bg-background/65 px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-primary/40"
            placeholder="Jane Doe"
            autoComplete="name"
          />
        </div>

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
            placeholder="At least 6 characters"
            autoComplete="new-password"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            className="w-full rounded-xl border border-white/20 bg-background/65 px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-primary/40"
            placeholder="Confirm password"
            autoComplete="new-password"
          />
        </div>

        {error && <p className="text-sm text-red-500">{error}</p>}

        <Button className="h-10 w-full rounded-xl" type="submit" disabled={loading}>
          {loading ? "Creating account..." : "Signup"}
        </Button>
      </form>

      <p className="mt-5 text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link className="text-primary hover:underline" href="/login">
          Login
        </Link>
      </p>
    </AuthShell>
  );
}
