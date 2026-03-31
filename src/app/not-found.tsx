import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      fontFamily: 'system-ui, sans-serif',
      padding: '24px',
      textAlign: 'center',
    }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '12px' }}>
        Page not found
      </h2>
      <p style={{ color: 'var(--muted)', marginBottom: '24px' }}>
        The page you&apos;re looking for doesn&apos;t exist or has been removed.
      </p>
      <Link
        href="/"
        style={{
          color: 'var(--accent, #111)',
          fontWeight: 600,
          fontSize: '0.9375rem',
        }}
      >
        Go home
      </Link>
    </div>
  );
}
