import { logger } from '@/lib/logger';
import { getAccount, getRecipe } from '@/lib/data';
import { parseRecipeDirections } from '@/lib/recipe-parser';
import { Metadata, ResolvingMetadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';

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
  
  try {
    const result = await getRecipe(recipeId);
    
    if (!result.exists || !result.data) {
      return { title: 'Recipe Not Found - Hest' };
    }
    
    const recipe = result.data;
    
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
  } catch (error) {
    logger.error(error, { message: 'Failed to generate metadata for recipe', householdId, recipeId });
    return { title: 'Recipe Not Found - Hest' };
  }
}

export default async function RecipeDetailPage({ params }: Props) {
  const { householdId, recipeId } = await params;
  
  logger.info('Recipe detail page viewed', { householdId, recipeId }, 'page.view');

  let recipeResult;
  try {
    recipeResult = await getRecipe(recipeId);
  } catch (error) {
    logger.error(error, { message: 'Failed to fetch recipe', householdId, recipeId });
    notFound();
  }

  if (!recipeResult.exists || !recipeResult.data) {
    logger.warn('Recipe not found', { householdId, recipeId });
    notFound();
  }

  const recipe = recipeResult.data;

  if (recipe.accountId !== householdId) {
    logger.warn('Recipe does not belong to household', { householdId, recipeId, actualAccountId: recipe.accountId });
    notFound();
  }

  let publicProfileEnabled = false;
  try {
    const account = await getAccount(householdId);
    publicProfileEnabled = account.exists && account.data?.publicProfileEnabled === true;
  } catch (error) {
    logger.error(error, { message: 'Failed to fetch account for recipe detail', householdId });
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
    recipeInstructions: parseRecipeDirections(recipe.directions)
      .filter(block => block.type === 'step')
      .map(step => ({
        '@type': 'HowToStep',
        text: step.text.trim()
      })),
  };

  return (
    <article className="py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Back button if public profile is enabled */}
      {publicProfileEnabled && (
        <div className="mb-6">
          <Link
            href={`/${householdId}/recipes`}
            className="inline-flex items-center gap-1.5 text-[var(--muted)] no-underline text-[0.9375rem] font-medium"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            All Recipes
          </Link>
        </div>
      )}

      {/* Title */}
      <h1 className="text-3xl font-extrabold leading-[1.2] mb-3">
        {recipe.name}
      </h1>

      {/* Description */}
      {recipe.description && (
        <p className="text-lg text-[var(--muted)] leading-relaxed mb-6">
          {recipe.description}
        </p>
      )}

      {/* Meta bar */}
      <div className="flex flex-wrap gap-5 text-sm text-[var(--muted)] pb-6 border-b border-[var(--border)] mb-8">
        <div>
          <span className="font-semibold text-[var(--foreground)]">Prep</span>{' '}
          {recipe.prepTimeMinutes} min
        </div>
        <div>
          <span className="font-semibold text-[var(--foreground)]">Cook</span>{' '}
          {recipe.cookTimeMinutes} min
        </div>
        <div>
          <span className="font-semibold text-[var(--foreground)]">Total</span>{' '}
          {totalTime} min
        </div>
        {recipe.servings && (
          <div>
            <span className="font-semibold text-[var(--foreground)]">Servings</span>{' '}
            {recipe.servings}
          </div>
        )}
      </div>

      {/* Image */}
      {recipe.imageUrl && (
        <div className="rounded-lg overflow-hidden mb-10 bg-[var(--surface)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={recipe.imageUrl}
            alt={recipe.name}
            className="w-full h-auto block max-h-[420px] object-cover"
          />
        </div>
      )}

      {/* Ingredients */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-4">
          Ingredients
        </h2>
        <ul className="list-none p-0 m-0">
          {recipe.ingredients.map((ingredient, idx) => (
            <li
              key={idx}
              className="flex justify-between items-baseline py-2.5 border-b border-[var(--border-light)] text-[0.9375rem]"
            >
              <span className="font-medium">{ingredient.name}</span>
              <span className="text-[var(--muted)] text-sm ml-4 shrink-0 tabular-nums">
                {ingredient.quantity} {ingredient.unit}
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Directions */}
      <section className="mb-10">
        <h2 className="text-xl font-bold mb-5">
          Directions
        </h2>
        <div className="flex flex-col">
          {parseRecipeDirections(recipe.directions).map((block, idx) => {
            if (block.type === 'heading') {
              return (
                <h3 
                  key={idx}
                  className={`text-lg font-bold mb-3 text-[var(--foreground)] ${idx === 0 ? 'mt-0' : 'mt-5'}`}
                >
                  {block.text}
                </h3>
              );
            }
            if (block.type === 'paragraph') {
              return (
                <p 
                  key={idx}
                  className="text-[0.9375rem] leading-[1.7] m-0 mb-4"
                >
                  {block.text}
                </p>
              );
            }
            return (
              <div
                key={idx}
                className="flex gap-4 mb-6 items-start"
              >
                <span className="shrink-0 w-7 h-7 rounded-full bg-[var(--accent-subtle)] text-[var(--accent)] flex items-center justify-center font-bold text-[0.8125rem] mt-[1px]">
                  {block.stepNumber}
                </span>
                <p className="text-[0.9375rem] leading-[1.7] m-0 pt-[3px]">
                  {block.text}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Source */}
      {recipe.sourceUrl && (
        <div className="pt-6 border-t border-[var(--border-light)]">
          <a
            href={recipe.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent)] font-medium text-sm inline-flex items-center gap-1"
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
