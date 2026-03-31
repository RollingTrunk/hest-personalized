"use client";

/* eslint-disable no-restricted-syntax -- standalone HTML without CSS variable access */
import { logger } from "@/lib/logger";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error(error, { message: "Unhandled client error", digest: error.digest });
  }, [error]);

  return (
    <html>
      <body>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            fontFamily: "system-ui, sans-serif",
            padding: "24px",
            textAlign: "center",
          }}
        >
          <h2 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "12px" }}>
            Something went wrong
          </h2>
          <p style={{ color: "#666", marginBottom: "24px" }}>
            An unexpected error occurred. Please try again.
          </p>
          <button
            onClick={reset}
            style={{
              background: "#111",
              color: "#fff",
              border: "none",
              padding: "10px 24px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "0.9375rem",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
