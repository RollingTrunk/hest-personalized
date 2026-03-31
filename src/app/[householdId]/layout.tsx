import Image from 'next/image';
import { Audiowide } from 'next/font/google';
import { FaInstagram, FaThreads, FaTiktok } from 'react-icons/fa6';
import { ThemeToggle } from '@/components/theme-toggle';

const audiowide = Audiowide({
  weight: '400',
  subsets: ['latin'],
});

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
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Image
              src="/hest-scheme-adaptive.png"
              alt="Hest"
              width={28}
              height={28}
              style={{ display: 'block' }}
            />
            <span 
              className={audiowide.className}
              style={{
                fontSize: '1.25rem', // Slightly larger to match the icon presence
                letterSpacing: '-0.02em',
                lineHeight: 1,
                marginTop: '8px', // Visual nudge down to perfectly optical-center alongside the 28px icon
                color: 'var(--logo-text)',
              }}
            >
              HEST
            </span>
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
          <Image
            src="/hest-scheme-adaptive.png"
            alt="Hest"
            width={48}
            height={48}
            style={{ display: 'block', margin: '0 auto 16px' }}
          />
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
          <a
            href="https://apps.apple.com/us/app/hest-household-manager/id6759582460"
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
            © {new Date().getFullYear()} Hest. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
