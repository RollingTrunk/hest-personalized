import { db } from '@/lib/firebase-admin';
import { logger } from '@/lib/logger';
import { Account, Recipe } from '@/lib/types';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface PageProps {
  params: Promise<{
    householdId: string;
  }>;
}

export default async function RecipeIndexPage({ params }: PageProps) {
  const { householdId } = await params;
  
  logger.info('Recipe index page viewed', { householdId }, 'page.view');

  let accountDoc;
  try {
    accountDoc = await db.collection('accounts').doc(householdId).get();
  } catch (error) {
    logger.error(error, { message: 'Failed to fetch account for recipe index', householdId });
    notFound();
  }
  
  if (!accountDoc.exists) {
    logger.warn('Household not found for recipe index', { householdId });
    notFound();
  }
  
  const accountData = accountDoc.data() as Account;
  
  if (!accountData.publicProfileEnabled) {
    logger.info('Public profile disabled, blocking recipe index', { householdId }, 'access');
    return (
      <div style={{
        padding: '80px 0',
        textAlign: 'center',
      }}>
        <p style={{
          fontSize: '1.0625rem',
          color: 'var(--muted)',
        }}>
          This profile is not public.
        </p>
      </div>
    );
  }
  
  let recipes: Recipe[] = [];
  try {
    const recipesSnapshot = await db.collection('recipes').where('accountId', '==', householdId).get();
    recipes = recipesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Recipe));
  } catch (error) {
    logger.error(error, { message: 'Failed to fetch recipes', householdId });
    notFound();
  }
  
  return (
    <div style={{ paddingTop: '48px', paddingBottom: '48px' }}>
      {/* Profile header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{
          fontSize: '1.75rem',
          fontWeight: 700,
          marginBottom: '6px',
        }}>
          {accountData.name}&apos;s Recipes
        </h1>
        <p style={{
          color: 'var(--muted)',
          fontSize: '0.9375rem',
        }}>
          A collection of {recipes.length} recipe{recipes.length !== 1 ? 's' : ''} shared by {accountData.name}.
        </p>
      </div>

      {/* Divider */}
      <div style={{ height: '1px', background: 'var(--border)', marginBottom: '8px' }} />
      
      {/* Recipe list */}
      {recipes.length === 0 ? (
        <div style={{
          padding: '48px 0',
          textAlign: 'center',
          color: 'var(--muted)',
        }}>
          <p>No recipes have been shared yet.</p>
        </div>
      ) : (
        <div>
          {recipes.map((recipe) => (
            <Link
              href={`/${householdId}/recipes/${recipe.id}`}
              key={recipe.id}
              className="recipe-item"
              style={{
                display: 'flex',
                gap: '20px',
                padding: '24px 0',
                textDecoration: 'none',
                color: 'inherit',
                alignItems: 'flex-start',
              }}
            >
              {/* Text content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <h2 style={{
                  fontSize: '1.1875rem',
                  fontWeight: 700,
                  lineHeight: 1.3,
                  marginBottom: '6px',
                }}>
                  {recipe.name}
                </h2>
                {recipe.description && (
                  <p style={{
                    color: 'var(--muted)',
                    fontSize: '0.9375rem',
                    lineHeight: 1.5,
                    overflow: 'hidden',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    marginBottom: '8px',
                  }}>
                    {recipe.description}
                  </p>
                )}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  color: 'var(--muted)',
                  fontSize: '0.8125rem',
                }}>
                  <span>{recipe.prepTimeMinutes + recipe.cookTimeMinutes} min</span>
                  {recipe.servings && (
                    <>
                      <span style={{ opacity: 0.4 }}>·</span>
                      <span>{recipe.servings} servings</span>
                    </>
                  )}
                  <span style={{ opacity: 0.4 }}>·</span>
                  <span style={{ textTransform: 'capitalize' }}>{recipe.type}</span>
                </div>
              </div>

              {/* Thumbnail */}
              {recipe.imageUrl && (
                <div style={{
                  flexShrink: 0,
                  width: '120px',
                  height: '80px',
                  borderRadius: '6px',
                  overflow: 'hidden',
                  background: 'var(--surface)',
                }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={recipe.imageUrl}
                    alt={recipe.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </div>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
