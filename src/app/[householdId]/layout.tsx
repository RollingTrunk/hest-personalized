import Image from 'next/image';
import { FaInstagram, FaThreads, FaTiktok } from 'react-icons/fa6';
import { ThemeToggle } from '@/components/theme-toggle';

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
              width={475}
              height={542}
              style={{ display: 'block', width: '28px', height: 'auto' }}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="7 4 301 71"
              fill="var(--logo-text)"
              aria-label="HEST"
              role="img"
              style={{
                height: '0.9rem',
                width: 'auto',
                marginTop: '8px',
              }}
            >
              <path d="M20.17 4.98L20.17 33.59L64.75 33.59L64.75 4.98L77.44 4.98L77.44 75L64.75 75L64.75 46.39L20.17 46.39L20.17 75L7.47 75L7.47 4.98L20.17 4.98ZM149.85 33.59L149.85 46.39L109.77 46.39L109.77 33.59L149.85 33.59ZM155.57 62.30L155.57 75L109.77 75Q107.13 75 104.00 74.07Q100.88 73.14 98.22 71.02Q95.56 68.90 93.77 65.50Q91.99 62.11 91.99 57.18L91.99 57.18L91.99 11.38Q91.99 10.06 92.48 8.89Q92.97 7.71 93.82 6.84Q94.68 5.96 95.85 5.47Q97.02 4.98 98.39 4.98L98.39 4.98L155.57 4.98L155.57 17.68L104.69 17.68L104.69 57.18Q104.69 59.67 106.01 60.99Q107.32 62.30 109.86 62.30L109.86 62.30L155.57 62.30ZM234.86 54.39L234.86 54.39Q234.86 58.15 233.91 61.16Q232.96 64.16 231.40 66.46Q229.83 68.75 227.73 70.36Q225.63 71.97 223.39 73.00Q221.14 74.02 218.82 74.51Q216.50 75 214.45 75L214.45 75L165.48 75L165.48 62.30L214.45 62.30Q218.12 62.30 220.14 60.16Q222.17 58.01 222.17 54.39L222.17 54.39Q222.17 52.64 221.63 51.17Q221.09 49.71 220.09 48.63Q219.09 47.56 217.65 46.97Q216.21 46.39 214.45 46.39L214.45 46.39L185.25 46.39Q182.18 46.39 178.61 45.29Q175.05 44.19 172.00 41.75Q168.95 39.31 166.92 35.35Q164.89 31.40 164.89 25.68L164.89 25.68Q164.89 19.97 166.92 16.04Q168.95 12.11 172.00 9.64Q175.05 7.18 178.61 6.08Q182.18 4.98 185.25 4.98L185.25 4.98L228.47 4.98L228.47 17.68L185.25 17.68Q181.64 17.68 179.61 19.87Q177.59 22.07 177.59 25.68L177.59 25.68Q177.59 29.35 179.61 31.47Q181.64 33.59 185.25 33.59L185.25 33.59L214.45 33.59L214.55 33.59Q216.60 33.64 218.90 34.16Q221.19 34.67 223.46 35.74Q225.73 36.82 227.78 38.45Q229.83 40.09 231.42 42.38Q233.01 44.68 233.94 47.66Q234.86 50.63 234.86 54.39ZM307.96 4.98L307.96 17.68L279.98 17.68L279.98 75L267.29 75L267.29 17.68L239.26 17.68L239.26 4.98L307.96 4.98Z"/>
            </svg>
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
            width={475}
            height={542}
            style={{ display: 'block', width: '48px', height: 'auto', margin: '0 auto 16px' }}
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
