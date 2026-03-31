"use client";

import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function HouseholdError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error, {
      extra: { digest: error.digest, boundary: "household" },
    });
  }, [error]);

  return (
    <div style={{
      padding: '80px 0',
      textAlign: 'center',
    }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '12px' }}>
        Something went wrong
      </h2>
      <p style={{
        color: 'var(--muted)',
        marginBottom: '24px',
        fontSize: '0.9375rem',
      }}>
        An unexpected error occurred. Please try again.
      </p>
      <button
        onClick={reset}
        style={{
          background: 'var(--foreground)',
          color: 'var(--background)',
          border: 'none',
          padding: '10px 24px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 600,
          fontSize: '0.9375rem',
        }}
      >
        Try again
      </button>
    </div>
  );
}
