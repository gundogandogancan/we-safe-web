/**
 * Tiny className joiner. No dependency, no runtime cost beyond a join.
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}
