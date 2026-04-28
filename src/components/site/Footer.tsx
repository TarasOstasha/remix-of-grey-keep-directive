export function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      {/* Big closing statement, Anthropic-style */}
      <div className="container-keep py-24 md:py-32">
        <p className="display text-5xl md:text-8xl lg:text-9xl text-foreground leading-[0.95]">
          The Keep Stands
        </p>
      </div>

      <div className="border-t border-border">
        <div className="container-keep py-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_10px_var(--gold)]" />
            <span className="display text-base tracking-tight">Gray Keep</span>
            <span className="text-sm text-muted-foreground hidden md:inline">
              The Keep Stands
            </span>
          </div>

          <div className="flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Contact
            </a>
            <span className="hidden md:inline">
              © 2026 Gray Keep. All rights reserved.
            </span>
          </div>
        </div>
        <div className="container-keep pb-8 md:hidden">
          <p className="text-xs text-muted-foreground">
            © 2026 Gray Keep. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
