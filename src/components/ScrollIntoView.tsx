"use client";

/**
 * ScrollIntoView — on mount, instantly scrolls the viewport to the element
 * with the given id. Used when a user navigates directly to a section URL
 * (e.g. /tr/sos) so the page opens at the correct position.
 */

import { useEffect } from "react";

export default function ScrollIntoView({ target }: { target: string }) {
  useEffect(() => {
    const el = document.getElementById(target);
    if (!el) return;
    el.scrollIntoView({ behavior: "instant" as ScrollBehavior, block: "start" });
  }, [target]);

  return null;
}
