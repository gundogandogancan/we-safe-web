/**
 * Locale middleware.
 *
 * On first visit with no cookie: reads Accept-Language, picks the best
 * supported match, falls back to `defaultLocale` (tr). On later visits,
 * honors the NEXT_LOCALE cookie set by the language switcher.
 */

import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // run on every path except Next.js internals, API routes, static assets,
  // and files with extensions (images, fonts, etc.)
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
