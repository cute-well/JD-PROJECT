export function Footer() {
  return (
    <footer className="border-t border-white/20 bg-background/50 py-4 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 text-xs text-muted-foreground sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} CareerCanvas AI</p>
        <p>Built for modern career design.</p>
      </div>
    </footer>
  );
}
