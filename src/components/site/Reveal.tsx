import { useEffect, useRef, useState, type ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className = "",
  immediate = false,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Above-the-fold content: visible on first paint without waiting for JS. */
  immediate?: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(immediate);

  useEffect(() => {
    if (immediate) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setVisible(true);
            obs.disconnect();
            break;
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [immediate]);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
    >
      {children}
    </div>
  );
}
