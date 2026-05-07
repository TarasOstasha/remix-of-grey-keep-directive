import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
 import logoMark from "@/assets/gray_keep_transparent.png";
// import logoMark from "@/assets/gray_keep_transparent106.webp";


const NAV = [
  { label: "Intel Library", to: "/intel" },
  { label: "Stories", to: "/stories" },
  { label: "Advisory", to: "/advisory" },
  { label: "Labs", to: "/labs" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-background/85 backdrop-blur-md border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="container-keep flex h-28 items-center justify-between md:h-32">
        <Link to="/" className="flex items-center gap-2 md:gap-3 group">
          <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-gold shadow-[0_0_12px_var(--gold)]" />

          <img
            src={logoMark}
            alt="Gray Keep"
            className="h-24 w-auto object-contain object-left sm:h-28 md:h-32 lg:h-36 scale-[1.6] origin-left"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-9">
          {NAV.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link to="/contact" className="btn-pill btn-pill-primary">
            Enter the Keep
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="md:hidden text-foreground"
          aria-label="Toggle menu"
        >
          <span className="block h-px w-6 bg-foreground mb-1.5" />
          <span className="block h-px w-6 bg-foreground mb-1.5" />
          <span className="block h-px w-4 bg-foreground" />
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur">
          <div className="container-keep py-6 flex flex-col gap-4">
            {NAV.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                onClick={() => setOpen(false)}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="btn-pill btn-pill-primary mt-2 w-fit"
            >
              Enter the Keep
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
