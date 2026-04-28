import { type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  size?: "default" | "narrow" | "wide";
};

const sizeClass = {
  default: "max-w-5xl",
  narrow: "max-w-3xl",
  wide: "max-w-6xl",
};

export function Container({
  children,
  className = "",
  size = "default",
}: Props) {
  return (
    <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${sizeClass[size]} ${className}`}>
      {children}
    </div>
  );
}
