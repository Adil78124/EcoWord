import type { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"button">;

export function PrimaryRoundButton({ className = "", ...props }: Props) {
  return (
    <button
      type="button"
      className={`nature-gradient rounded-full px-8 py-4 font-title-lg text-title-lg text-on-primary shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${className}`}
      {...props}
    />
  );
}
