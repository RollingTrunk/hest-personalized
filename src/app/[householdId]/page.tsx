import { logger } from '@/lib/logger';
import { getAccount } from '@/lib/data';
import Link from 'next/link';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{
    householdId: string;
  }>;
}

export default async function HouseholdPage({ params }: Props) {
  const { householdId } = await params;
  
  logger.info('Household page viewed', { householdId }, 'page.view');

  let account;
  try {
    account = await getAccount(householdId);
  } catch (error) {
    logger.error(error, { message: 'Failed to fetch account', householdId });
    notFound();
  }
  
  if (!account.exists || !account.data) {
    logger.warn('Household not found', { householdId });
    notFound();
  }
  
  const accountData = account.data;
  
  return (
    <div style={{
      padding: '80px 0',
      textAlign: 'center',
    }}>
      <div style={{
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        background: 'var(--accent-subtle)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '0 auto 20px',
        fontSize: '1.5rem',
        fontWeight: 700,
        color: 'var(--accent)',
      }}>
        {accountData.name.charAt(0).toUpperCase()}
      </div>
      <h1 style={{
        fontSize: '1.5rem',
        fontWeight: 700,
        marginBottom: '8px',
      }}>
        {accountData.name}
      </h1>
      
      {accountData.publicProfileEnabled && (
        <div style={{ marginTop: '24px' }}>
          <Link
            href={`/${householdId}/recipes`}
            style={{
              display: 'inline-block',
              color: 'var(--accent)',
              fontWeight: 600,
              fontSize: '0.9375rem',
            }}
          >
            View Recipes →
          </Link>
        </div>
      )}
    </div>
  );
}
