import { db } from '@/lib/firebase-admin';
import { Recipe } from '@/lib/types';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{
    householdId: string;
    recipeId: string;
  }>;
}

export async function generateMetadata(
  { params }: Props,
  _parent: ResolvingMetadata
): Promise<Metadata> {
  const { householdId, recipeId } = await params;
  
  const recipeDoc = await db.collection('recipes').doc(recipeId).get();
  
  if (!recipeDoc.exists) {
    return { title: 'Recipe Not Found - Hest' };
  }
  
  const recipe = recipeDoc.data() as Recipe;
  
  if (recipe.accountId !== householdId) {
    return { title: 'Recipe Not Found - Hest' };
  }
  
  return {
    title: `${recipe.name} - Hest`,
    description: recipe.description || `A delicious ${recipe.type} recipe shared on Hest.`,
    openGraph: {
      images: recipe.imageUrl ? [recipe.imageUrl] : [],
      type: 'article',
    },
  };
}

export default async function RecipeDetailPage({ params }: Props) {
  const { householdId, recipeId } = await params;
  
  const recipeSnapshot = await db
    .collection('recipes')
    .doc(recipeId)
    .get();

  if (!recipeSnapshot.exists) {
    notFound();
  }

  const recipe = recipeSnapshot.data() as Recipe;

  if (recipe.accountId !== householdId) {
    notFound();
  }

  const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Recipe',
    name: recipe.name,
    description: recipe.description || `A delicious ${recipe.type} recipe.`,
    image: recipe.imageUrl ? [recipe.imageUrl] : undefined,
    prepTime: `PT${recipe.prepTimeMinutes}M`,
    cookTime: `PT${recipe.cookTimeMinutes}M`,
    totalTime: `PT${totalTime}M`,
    recipeYield: recipe.servings ? `${recipe.servings} servings` : undefined,
    recipeIngredient: recipe.ingredients.map(i => `${i.quantity} ${i.unit} ${i.name}`),
    recipeInstructions: recipe.directions.split('\n').filter(d => d.trim()).map(step => ({
      '@type': 'HowToStep',
      text: step.trim()
    })),
  };

  return (
    <article style={{ paddingTop: '48px', paddingBottom: '48px' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Title */}
      <h1 style={{
        fontSize: '2rem',
        fontWeight: 800,
        lineHeight: 1.2,
        marginBottom: '12px',
      }}>
        {recipe.name}
      </h1>

      {/* Description */}
      {recipe.description && (
        <p style={{
          fontSize: '1.125rem',
          color: 'var(--muted)',
          lineHeight: 1.6,
          marginBottom: '24px',
        }}>
          {recipe.description}
        </p>
      )}

      {/* Meta bar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        fontSize: '0.875rem',
        color: 'var(--muted)',
        paddingBottom: '24px',
        borderBottom: '1px solid var(--border)',
        marginBottom: '32px',
      }}>
        <div>
          <span style={{ fontWeight: 600, color: 'var(--foreground)' }}>Prep</span>{' '}
          {recipe.prepTimeMinutes} min
        </div>
        <div>
          <span style={{ fontWeight: 600, color: 'var(--foreground)' }}>Cook</span>{' '}
          {recipe.cookTimeMinutes} min
        </div>
        <div>
          <span style={{ fontWeight: 600, color: 'var(--foreground)' }}>Total</span>{' '}
          {totalTime} min
        </div>
        {recipe.servings && (
          <div>
            <span style={{ fontWeight: 600, color: 'var(--foreground)' }}>Servings</span>{' '}
            {recipe.servings}
          </div>
        )}
      </div>

      {/* Image */}
      {recipe.imageUrl && (
        <div style={{
          borderRadius: '8px',
          overflow: 'hidden',
          marginBottom: '40px',
          background: 'var(--surface)',
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={recipe.imageUrl}
            alt={recipe.name}
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              maxHeight: '420px',
              objectFit: 'cover',
            }}
          />
        </div>
      )}

      {/* Ingredients */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: 700,
          marginBottom: '16px',
        }}>
          Ingredients
        </h2>
        <ul style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
        }}>
          {recipe.ingredients.map((ingredient, idx) => (
            <li
              key={idx}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'baseline',
                padding: '10px 0',
                borderBottom: '1px solid var(--border-light)',
                fontSize: '0.9375rem',
              }}
            >
              <span style={{ fontWeight: 500 }}>{ingredient.name}</span>
              <span style={{
                color: 'var(--muted)',
                fontSize: '0.875rem',
                marginLeft: '16px',
                flexShrink: 0,
                fontVariantNumeric: 'tabular-nums',
              }}>
                {ingredient.quantity} {ingredient.unit}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Directions */}
      <section style={{ marginBottom: '40px' }}>
        <h2 style={{
          fontSize: '1.25rem',
          fontWeight: 700,
          marginBottom: '20px',
        }}>
          Directions
        </h2>
        <ol style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          counterReset: 'step',
        }}>
          {recipe.directions.split('\n').filter(d => d.trim()).map((step, idx) => (
            <li
              key={idx}
              style={{
                display: 'flex',
                gap: '16px',
                marginBottom: '24px',
                alignItems: 'flex-start',
              }}
            >
              <span style={{
                flexShrink: 0,
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                background: 'var(--accent-subtle)',
                color: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 700,
                fontSize: '0.8125rem',
                marginTop: '1px',
              }}>
                {idx + 1}
              </span>
              <p style={{
                fontSize: '0.9375rem',
                lineHeight: 1.7,
                margin: 0,
                paddingTop: '3px',
              }}>
                {step.trim().replace(/^\d+\.\s*/, '')}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Source */}
      {recipe.sourceUrl && (
        <div style={{
          paddingTop: '24px',
          borderTop: '1px solid var(--border-light)',
        }}>
          <a
            href={recipe.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: 'var(--accent)',
              fontWeight: 500,
              fontSize: '0.875rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            View original source
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        </div>
      )}
    </article>
  );
}
