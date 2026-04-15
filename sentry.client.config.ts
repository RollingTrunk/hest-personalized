import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Performance Monitoring — sample 10% of browser transactions
  tracesSampleRate: 0.1,

  // Session Replay — capture 100% of sessions with errors (loaded lazily below)
  replaysOnErrorSampleRate: 1.0,

  // Replay is lazy-loaded after page load — keep integrations empty at init
  integrations: [],

  debug: false,

  // Deprioritize Sentry network traffic so it doesn't compete
  // with critical resources during initial page load on iOS Safari
  transportOptions: {
    fetchOptions: {
      keepalive: true,
      priority: "low",
    },
  },
});

// Lazy-load Replay only after the page is interactive.
// This defers ~100KB of JS parsing from the critical path.
if (typeof window !== "undefined") {
  window.addEventListener("load", async () => {
    const replay = await Sentry.lazyLoadIntegration("replayIntegration");
    Sentry.addIntegration(replay());
  });
}
