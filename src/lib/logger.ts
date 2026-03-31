import * as Sentry from "@sentry/nextjs";

/**
 * Metadata context for logging.
 */
export interface LogContext {
  [key: string]: unknown;
}

/**
 * Centralized logger wrapping Sentry for consistent server + client error
 * tracking, breadcrumbs, and event capture.
 */
export const logger = {
  /**
   * Capture an error in Sentry with optional metadata.
   */
  error: (error: unknown, context?: LogContext) => {
    if (process.env.NODE_ENV === "development") {
      console.error("[Error]", error, context);
    }

    Sentry.captureException(error, {
      extra: context,
    });
  },

  /**
   * Log an informational breadcrumb that attaches to the next error event.
   */
  info: (message: string, context?: LogContext, category = "app") => {
    if (process.env.NODE_ENV === "development") {
      console.log(`[Info] ${message}`, context);
    }

    Sentry.addBreadcrumb({
      category,
      message,
      data: context,
      level: "info",
    });
  },

  /**
   * Log a warning breadcrumb.
   */
  warn: (message: string, context?: LogContext) => {
    if (process.env.NODE_ENV === "development") {
      console.warn(`[Warn] ${message}`, context);
    }

    Sentry.addBreadcrumb({
      category: "app",
      message,
      data: context,
      level: "warning",
    });
  },
};
