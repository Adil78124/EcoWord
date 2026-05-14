import type { ComponentPropsWithoutRef } from "react";

type Props = ComponentPropsWithoutRef<"button">;

export function GlassRoundButton({ className = "", ...props }: Props) {
  return (
    <button
      type="button"
      className={`glass rounded-full border border-emerald-800/25 px-8 py-4 font-title-lg text-title-lg text-emerald-900 transition-all duration-300 hover:bg-emerald-50 ${className}`}
      {...props}
    />
  );
}
