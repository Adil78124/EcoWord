import type { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"button">;

export function GlassRoundButton({ className = "", ...props }: Props) {
  return (
    <button
      type="button"
      className={`glass rounded-full border border-secondary/20 px-8 py-4 font-title-lg text-title-lg text-secondary transition-all duration-300 hover:bg-secondary/10 ${className}`}
      {...props}
    />
  );
}
