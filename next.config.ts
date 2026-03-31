import type { NextConfig } from "next";
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig: NextConfig = {
  /* config options here */
};

export default withSentryConfig(nextConfig, {
  // Sentry organization and project slugs
  org: "rolling-trunk",
  project: "hest-personalized",

  // Suppress noisy source map upload logs during build
  silent: !process.env.CI,

  // Upload a larger set of source maps for prettier stack traces
  widenClientFileUpload: true,

  // Don't expose source maps to users, but still upload them to Sentry
  sourcemaps: {
    deleteSourcemapsAfterUpload: true,
  },
});
