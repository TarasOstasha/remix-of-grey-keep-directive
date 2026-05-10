import { Link } from "@tanstack/react-router";
import { Fragment, useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import logoMark from "@/assets/logo200.png";
import { cn } from "@/lib/utils";
// import logoMark from "@/assets/gray_keep_transparent106.webp";

const NAV = [
  { label: "Intel Library", to: "/intel" },
  { label: "Stories", to: "/stories" },
  { label: "Advisory", to: "/advisory" },
  { label: "Labs", to: "/labs" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

const MENU_DURATION_MS = 400;

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduce(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);
  return reduce;
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileMounted, setMobileMounted] = useState(false);
  const [mobileEntered, setMobileEntered] = useState(false);
  const openRef = useRef(mobileOpen);
  openRef.current = mobileOpen;
  const reduceMotion = usePrefersReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      setMobileMounted(true);
      setMobileEntered(false);
      if (reduceMotion) {
        setMobileEntered(true);
        return;
      }
      const id = requestAnimationFrame(() => {
        requestAnimationFrame(() => setMobileEntered(true));
      });
      return () => cancelAnimationFrame(id);
    }
    setMobileEntered(false);
  }, [mobileOpen, reduceMotion]);

  useEffect(() => {
    if (!mobileMounted) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileMounted]);

  useEffect(() => {
    if (!mobileMounted) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileMounted]);

  useEffect(() => {
    if (mobileOpen || !mobileMounted || mobileEntered) return;
    const t = window.setTimeout(() => setMobileMounted(false), MENU_DURATION_MS + 80);
    return () => window.clearTimeout(t);
  }, [mobileOpen, mobileMounted, mobileEntered]);

  const closeMobileMenu = () => setMobileOpen(false);

  const onPanelTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>) => {
    if (e.target !== e.currentTarget) return;
    if (openRef.current) return;
    const prop = reduceMotion ? "opacity" : "transform";
    if (e.propertyName !== prop) return;
    setMobileMounted(false);
  };

  const linkReveal = mobileOpen && mobileEntered;
  const menuVisible = mobileEntered;

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
            className="h-28 w-auto object-contain object-left sm:h-28 md:h-32 lg:h-36 origin-left"
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
          onClick={() => setMobileOpen((o) => !o)}
          className={cn(
            "md:hidden relative h-10 w-10 shrink-0 text-foreground",
            mobileOpen && "invisible pointer-events-none",
          )}
          aria-label="Open menu"
          aria-expanded={mobileOpen}
          aria-controls="mobile-nav-panel"
        >
          <span className="absolute left-1/2 top-1/2 block h-px w-6 -translate-x-1/2 -translate-y-[5px] bg-foreground" />
          <span className="absolute left-1/2 top-1/2 block h-px w-6 -translate-x-1/2 bg-foreground" />
          <span className="absolute left-1/2 top-1/2 block h-px w-4 -translate-x-1/2 translate-y-[5px] bg-foreground" />
        </button>
      </div>

      {mobileMounted && (
        <div className="md:hidden fixed inset-0 z-100 pointer-events-none">
          <div
            id="mobile-nav-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            onTransitionEnd={onPanelTransitionEnd}
            className={cn(
              "pointer-events-auto absolute inset-0 flex min-h-dvh flex-col overflow-hidden bg-black/88 backdrop-blur-xl",
              "ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:ease-out",
              reduceMotion ? "transition-opacity" : "transition-[transform,opacity]",
              reduceMotion
                ? menuVisible
                  ? "opacity-100"
                  : "opacity-0"
                : menuVisible
                  ? "translate-x-0 opacity-100"
                  : "translate-x-5 opacity-0",
            )}
            style={{
              transitionDuration: reduceMotion ? "180ms" : `${MENU_DURATION_MS}ms`,
              paddingTop: "max(1.25rem, env(safe-area-inset-top))",
              paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))",
              paddingLeft: "max(1.5rem, env(safe-area-inset-left))",
              paddingRight: "max(1.5rem, env(safe-area-inset-right))",
            }}
          >
            <div className="relative flex min-h-0 flex-1 flex-col">
              <div className="flex shrink-0 items-center justify-between gap-4 pb-10 pt-2">
                <Link
                  to="/"
                  onClick={closeMobileMenu}
                  className="flex min-w-0 items-center gap-2.5 sm:gap-3 group"
                >
                  <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-gold shadow-[0_0_12px_var(--gold)]" />
                  <img
                    src={logoMark}
                    alt="Gray Keep"
                    className="h-26 w-auto max-w-[min(100%,14rem)] object-contain object-left sm:h-28"
                  />
                </Link>
                <button
                  type="button"
                  onClick={closeMobileMenu}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-foreground/90 transition-colors hover:text-gold"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" strokeWidth={1.25} />
                </button>
              </div>

              <nav className="flex min-h-0 flex-1 flex-col items-start gap-8 overflow-y-auto text-left">
                {NAV.map((item, index) => (
                  <Fragment key={item.label}>
                    <Link
                      to={item.to}
                      onClick={closeMobileMenu}
                      className={cn(
                        "text-left text-xl font-light tracking-[0.02em] text-foreground/75 transition-[opacity,transform] motion-reduce:duration-150 sm:text-2xl",
                        "hover:text-foreground",
                        linkReveal ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
                      )}
                      style={{
                        transitionDuration: reduceMotion ? "150ms" : "260ms",
                        transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                        transitionDelay:
                          reduceMotion || !linkReveal ? "0ms" : `${90 + index * 42}ms`,
                      }}
                    >
                      {item.label}
                    </Link>
                    {item.to === "/contact" && (
                      <Link
                        to="/contact"
                        onClick={closeMobileMenu}
                        className={cn(
                          "btn-pill btn-pill-primary w-fit shrink-0 self-start transition-[opacity,transform] motion-reduce:duration-150",
                          linkReveal ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
                        )}
                        style={{
                          transitionDuration: reduceMotion ? "150ms" : "260ms",
                          transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
                          transitionDelay:
                            reduceMotion || !linkReveal ? "0ms" : `${90 + (index + 1) * 42}ms`,
                        }}
                      >
                        Enter the Keep
                      </Link>
                    )}
                  </Fragment>
                ))}
              </nav>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
