import { FaInstagram, FaThreads, FaTiktok } from 'react-icons/fa6';
import { ThemeToggle } from '@/components/theme-toggle';

function HestMark({ size, style }: { size: number; style?: React.CSSProperties }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1000 1000"
      fill="var(--logo-text)"
      fillRule="evenodd"
      clipRule="evenodd"
      aria-label="Hest"
      role="img"
      style={{ display: 'block', width: `${size}px`, height: 'auto', ...style }}
    >
      <g transform="translate(-60 -3000)">
        <path
          d="m30.07 31.575c1.017.012 1.845-.646 2.508-1.182.679-.551 1.284-1.272 1.751-1.988 2.026-3.109 1.346-8.541 1.373-13.537.014-2.457-.13-4.938.236-7.148.633-3.81 3.598-6.969 7.573-7.432 2.446-.283 4.366.408 6.012 1.326 1.608.896 3.026 1.967 4.544 2.934 1.845 1.068 3.434 2.035 5.159 3.125 1.669 1.055 3.323 2.043 4.497 3.738 1.183 1.709 1.561 3.881 1.561 6.676 0 13.391.025 27.545.095 40.422.028 5.143-3.038 8.316-7.337 9.135-2.612.498-4.917-.41-6.579-1.373-1.852-1.07-3.517-2.174-5.112-3.123-1.687-1.004-3.32-2.047-5.111-3.125-2.679-1.611-4.778-3.383-5.349-7.004-.188-1.192-.142-2.506-.142-3.977 0-2.65-.019-5.383-.143-8.094-.584-.088-1.114.295-1.515.568-2.157 1.463-3.65 3.611-4.022 6.863-.147 1.281.03 2.715 0 4.26-.059 2.938.232 5.84-.237 8.188-.465 2.324-1.629 4.051-3.36 5.35-1.627 1.221-4.182 2.135-6.816 1.703-1.287-.209-2.271-.631-3.219-1.135-.934-.498-1.725-1.15-2.65-1.705-1.799-1.08-3.664-2.08-5.49-3.219-3.562-2.221-7.725-3.871-8.142-9.23-.11-1.412.028-2.828 0-4.26-.199-10.25-.093-20.101-.095-30.197 0-2.94.078-5.785-.047-8.473-.135-2.89.795-4.906 2.177-6.533 1.345-1.58 3.353-2.785 5.774-3.076 2.047-.244 4.189.406 5.49 1.23 3.488 2.211 6.855 4.285 10.319 6.486.683.432 1.422.826 2.082 1.277 2.913 1.99 4.07 4.744 4.071 9.371v6.721c.001 2.155-.102 4.339.144 6.438zm-3.504-.33c-1.428-.908-2.854-1.828-4.26-2.699-2.179-1.523-3.904-3.44-4.307-6.674-.25-2.01-.201-4.541-.096-6.863.072-1.568-.03-3.658-.047-5.254-.006-.617.029-1.52-.709-1.231-2.072.811-3.945 2.932-4.64 5.301-.462 1.578-.253 3.494-.236 5.35.022 2.428-.067 4.916-.095 7.383-.01.922.095 1.846.095 2.793 0 4.906-.089 9.678 0 14.484.085 4.582-.003 9.418.048 14.152.006.576-.144 1.264.236 1.752.873-.002 1.541-.639 2.13-1.137 1.858-1.57 3.066-3.729 3.267-6.863.268-4.207-.611-9.912.615-13.252.895-2.439 2.69-4.27 5.064-5.207 1.214-.48 2.603-.623 4.165-.994-.121-.603-.795-.765-1.23-1.041zm24.471 26.27c.789-.842 1.49-1.875 1.846-3.076.614-2.078.379-5.029.379-7.717-.001-9.385-.046-18.207-.047-27.547-.001-1.768-.098-3.604-.048-5.49.017-.605 0-1.469 0-2.65 0-.652.206-2.453-.331-2.463-.543-.008-1.643.902-2.035 1.232-1.537 1.291-2.79 3.271-3.029 5.68-.239 2.404-.001 5.25 0 8.047 0 2.795.178 5.654 0 8.141-.298 4.162-2.879 6.885-6.201 7.951-1.082.348-2.289.34-3.645.615.07.609.7.656 1.042.994 2.948 1.984 6.286 3.334 7.904 6.627 1.094 2.227.946 5.459.946 8.709 0 .998-.158 2.066.284 2.887 1.17-.208 2.142-1.094 2.935-1.94z"
          transform="matrix(11.716387 0 0 11.579665 176.996028 3106.356281)"
        />
      </g>
    </svg>
  );
}

export default function HouseholdLayout({
  children,
}: {
  children: React.ReactNode;
  params: Promise<{ householdId: string }>;
}) {
  return (
    <>
      {/* Header */}
      <header style={{
        borderBottom: '1px solid var(--border)',
        padding: '16px 0',
      }}>
        <div style={{
          maxWidth: '680px',
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <HestMark size={28} />
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main */}
      <main style={{
        flex: 1,
        maxWidth: '680px',
        width: '100%',
        margin: '0 auto',
        padding: '0 24px',
      }}>
        {children}
      </main>

      {/* Footer — Substack-style bottom CTA + socials */}
      <footer style={{
        borderTop: '1px solid var(--border)',
        marginTop: '64px',
      }}>
        {/* Download CTA */}
        <div style={{
          maxWidth: '680px',
          margin: '0 auto',
          padding: '48px 24px',
          textAlign: 'center',
        }}>
          <HestMark size={48} style={{ margin: '0 auto 16px' }} />
          <h3 style={{
            fontSize: '1.25rem',
            fontWeight: 700,
            marginBottom: '8px',
          }}>
            Plan meals, share recipes.
          </h3>
          <p style={{
            color: 'var(--muted)',
            fontSize: '0.9375rem',
            marginBottom: '24px',
            maxWidth: '360px',
            marginLeft: 'auto',
            marginRight: 'auto',
          }}>
            Download Hest to manage your household recipes, meal plans, and more.
          </p>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            flexWrap: 'wrap',
          }}>
            <a
              href="https://apps.apple.com/app/apple-store/id6759582460?pt=128418226&ct=hest-personalized-page&mt=8"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'var(--foreground)',
                color: 'var(--background)',
                fontWeight: 600,
                fontSize: '0.9375rem',
                padding: '12px 28px',
                borderRadius: '999px',
                transition: 'opacity 0.15s',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              Download for iOS
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.rollingtrunk.hest"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                background: 'var(--foreground)',
                color: 'var(--background)',
                fontWeight: 600,
                fontSize: '0.9375rem',
                padding: '12px 28px',
                borderRadius: '999px',
                transition: 'opacity 0.15s',
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M6 18c0 .55.45 1 1 1h1v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h2v3.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5V19h1c.55 0 1-.45 1-1V8H6v10zM3.5 8C2.67 8 2 8.67 2 9.5v7c0 .83.67 1.5 1.5 1.5S5 17.33 5 16.5v-7C5 8.67 4.33 8 3.5 8zm17 0c-.83 0-1.5.67-1.5 1.5v7c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5zm-4.97-5.84l1.3-1.3c.2-.2.2-.51 0-.71-.2-.2-.51-.2-.71 0l-1.48 1.48C13.85 1.23 12.95 1 12 1c-.96 0-1.86.23-2.66.63L7.85.15c-.2-.2-.51-.2-.71 0-.2.2-.2.51 0 .71l1.31 1.31C6.97 3.26 6 5.01 6 7h12c0-1.99-.97-3.75-2.47-4.84zM10 5H9V4h1v1zm5 0h-1V4h1v1z"/>
              </svg>
              Download for Android
            </a>
          </div>

          {/* Social links */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            marginTop: '28px',
          }}>
            {/* Instagram */}
            <a
              href="https://instagram.com/hestpage"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              style={{ color: 'var(--muted)', transition: 'color 0.15s' }}
            >
              <FaInstagram size={22} />
            </a>

            {/* Threads */}
            <a
              href="https://threads.net/@hestpage"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Threads"
              style={{ color: 'var(--muted)', transition: 'color 0.15s' }}
            >
              <FaThreads size={22} />
            </a>

            {/* TikTok */}
            <a
              href="https://tiktok.com/@hestpage"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              style={{ color: 'var(--muted)', transition: 'color 0.15s' }}
            >
              <FaTiktok size={20} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div style={{
          borderTop: '1px solid var(--border-light)',
          padding: '20px 24px',
          textAlign: 'center',
        }}>
          <p style={{
            color: 'var(--muted)',
            fontSize: '0.8125rem',
          }}>
            © 2026 Hest. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
