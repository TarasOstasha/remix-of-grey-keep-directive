import { Link } from "@tanstack/react-router";
import logoMark from "@/assets/logo200.webp";

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
        <div className="container-keep py-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-3 group shrink-0">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_10px_var(--gold)]" />
              <img
                src={logoMark}
                alt="Gray Keep"
                width={200}
                height={80}
                className="h-12 w-auto object-contain object-left md:h-14"
              />
            </Link>
            {/* <span className="text-sm text-muted-foreground hidden md:inline">
              The Keep Stands
            </span> */}
          </div>

          <div className="flex flex-wrap items-center gap-x-10 gap-y-3 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy
            </a>
            <Link to="/contact" className="hover:text-foreground transition-colors">
              Contact
            </Link>
            <span className="hidden md:inline md:ml-2">
              Gray Keep · Est. 2026 · The Keep Stands.
            </span>
          </div>
        </div>
        <div className="container-keep pb-8 md:hidden">
          <p className="text-xs text-muted-foreground">Gray Keep · Est. 2026 · The Keep Stands.</p>
        </div>
      </div>
    </footer>
  );
}
