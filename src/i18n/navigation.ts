/**
 * Locale-aware `<Link>`, `useRouter`, `usePathname`, `redirect`.
 * Always import from here, NOT from `next/link` / `next/navigation`.
 */

import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
