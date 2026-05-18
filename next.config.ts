import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // App Store Connect, app metadata, press kits and legal communication tend
  // to link to bare `/privacy` and `/terms`. Surface those under English so
  // a reviewer who clicks the link from App Store Connect lands on readable
  // text immediately, without depending on browser locale negotiation.
  async redirects() {
    return [
      { source: "/privacy", destination: "/en/privacy", permanent: false },
      { source: "/terms",   destination: "/en/terms",   permanent: false },
      { source: "/support", destination: "/en/support", permanent: false },
    ];
  },
};

export default withNextIntl(nextConfig);
