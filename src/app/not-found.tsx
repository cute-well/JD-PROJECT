import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto mt-16 max-w-xl rounded-2xl border border-white/20 bg-card/70 p-8 text-center shadow-xl backdrop-blur-xl">
      <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">404</p>
      <h2 className="mt-2 text-2xl font-semibold">Page not found</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        The page you are looking for does not exist in this workspace.
      </p>
      <Link
        href="/"
        className="mt-6 inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
      >
        Back to dashboard
      </Link>
    </div>
  );
}
