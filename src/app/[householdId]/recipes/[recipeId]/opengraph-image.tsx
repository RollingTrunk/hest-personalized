/* eslint-disable no-restricted-syntax -- OG images use Satori renderer which doesn't support CSS variables */
import { ImageResponse } from 'next/og';
import { db } from '@/lib/firebase-admin';
import { logger } from '@/lib/logger';
import { Recipe } from '@/lib/types';

export const runtime = 'nodejs';
export const alt = 'Recipe shared on Hest';
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default async function Image({
  params,
}: {
  params: Promise<{ householdId: string; recipeId: string }>;
}) {
  const { householdId, recipeId } = await params;


  let title = 'Recipe Not Found';
  let description = 'This recipe is unavailable or does not exist.';
  let type = '';
  let metaInfo = '';

  try {
    const recipeSnapshot = await db
      .collection('recipes')
      .doc(recipeId)
      .get();

    if (recipeSnapshot.exists) {
      const recipe = recipeSnapshot.data() as Recipe;
      if (recipe.accountId === householdId) {
        title = recipe.name;
        description = recipe.description || `A delicious recipe shared on Hest.`;
        type = recipe.type ? recipe.type.toUpperCase() : 'RECIPE';
        
        const totalTime = recipe.prepTimeMinutes + recipe.cookTimeMinutes;
        const stats = [];
        if (recipe.prepTimeMinutes) stats.push(`Prep: ${recipe.prepTimeMinutes}m`);
        if (recipe.cookTimeMinutes) stats.push(`Cook: ${recipe.cookTimeMinutes}m`);
        if (totalTime) stats.push(`Total: ${totalTime}m`);
        if (recipe.servings) stats.push(`Serves: ${recipe.servings}`);
        
        metaInfo = stats.join('  •  ');
        logger.info('OG image generated', { recipeId, recipeName: recipe.name }, 'og');
      } else {
        logger.warn('OG image: recipe/household mismatch', { householdId, recipeId });
      }
    } else {
      logger.warn('OG image: recipe not found', { recipeId });
    }
  } catch {
    logger.warn('OG image: fetch failed, using fallback', { householdId, recipeId });
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#1a110e',
          color: '#ffffff',
          padding: '80px',
          justifyContent: 'space-between',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 32,
              fontWeight: 800,
              letterSpacing: '0.1em',
              color: '#d4a373',
              marginBottom: 24,
            }}
          >
            {type}
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              lineHeight: 1.1,
              marginBottom: 40,
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,
              overflow: 'hidden',
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 36,
              color: '#a39b98',
              lineHeight: 1.4,
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              overflow: 'hidden',
            }}
          >
            {description}
          </div>
        </div>
        
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'end',
            borderTop: '2px solid #3d2f2b',
            paddingTop: 40,
          }}
        >
          <div style={{ fontSize: 32, color: '#f5ebe6', display: 'flex' }}>
            {metaInfo}
          </div>
          <div
            style={{
              fontSize: 40,
              fontWeight: 800,
              letterSpacing: '-0.05em',
              color: '#ffffff',
              display: 'flex',
            }}
          >
            HEST
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
