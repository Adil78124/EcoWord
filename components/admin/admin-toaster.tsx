"use client";

import { Toaster } from "sonner";

/** Sonner без next-themes — для админки достаточно фиксированной темы. */
export function AdminToaster() {
  return (
    <Toaster
      theme="light"
      position="top-right"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast: "cn-toast",
        },
      }}
    />
  );
}
