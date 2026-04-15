import { describe, it, expect } from 'vitest';
import { parseRecipeDirections } from '../recipe-parser';

describe('parseRecipeDirections', () => {
  it('should parse standard numberless lines as numbered steps', () => {
    const text = `Mix the flour.
Add the eggs.
Bake for 30 mins.`;

    const result = parseRecipeDirections(text);

    expect(result).toEqual([
      { type: 'step', text: 'Mix the flour.', stepNumber: 1 },
      { type: 'step', text: 'Add the eggs.', stepNumber: 2 },
      { type: 'step', text: 'Bake for 30 mins.', stepNumber: 3 }
    ]);
  });

  it('should strip existing manual numbering from standard steps', () => {
    const text = `1. Mix the flour.
2. Add the eggs.
3. Bake for 30 mins.`;

    const result = parseRecipeDirections(text);

    expect(result).toEqual([
      { type: 'step', text: 'Mix the flour.', stepNumber: 1 },
      { type: 'step', text: 'Add the eggs.', stepNumber: 2 },
      { type: 'step', text: 'Bake for 30 mins.', stepNumber: 3 }
    ]);
  });

  it('should parse markdown-like underline headings', () => {
    const text = `For the dough
====
Mix flour and water.

For the sauce
----
Blend tomatoes and garlic.`;

    const result = parseRecipeDirections(text);

    expect(result).toEqual([
      { type: 'heading', text: 'For the dough' },
      { type: 'step', text: 'Mix flour and water.', stepNumber: 1 },
      { type: 'heading', text: 'For the sauce' },
      { type: 'step', text: 'Blend tomatoes and garlic.', stepNumber: 2 }
    ]);
  });

  it('should safely ignore thematic visual dividers that are isolated by newlines', () => {
    const text = `Mix flour and water.

====

Blend tomatoes and garlic.`;

    const result = parseRecipeDirections(text);

    expect(result).toEqual([
      { type: 'step', text: 'Mix flour and water.', stepNumber: 1 },
      { type: 'step', text: 'Blend tomatoes and garlic.', stepNumber: 2 }
    ]);
  });

  it('should correctly handle explicit "Step X" headings as headings and treat children as paragraphs', () => {
    const text = `Step 1
Mix the flour.
Step 2
Add the eggs.`;

    const result = parseRecipeDirections(text);

    expect(result).toEqual([
      { type: 'heading', text: 'Step 1' },
      { type: 'paragraph', text: 'Mix the flour.' },
      { type: 'heading', text: 'Step 2' },
      { type: 'paragraph', text: 'Add the eggs.' }
    ]);
  });

  it('should correctly handle "Tip" or "Note" sections', () => {
    const text = `Mix the flour.
Add the eggs.
Extra tip:
Store in the fridge for 5 days.`;

    const result = parseRecipeDirections(text);

    expect(result).toEqual([
      { type: 'step', text: 'Mix the flour.', stepNumber: 1 },
      { type: 'step', text: 'Add the eggs.', stepNumber: 2 },
      { type: 'heading', text: 'Extra tip:' },
      { type: 'paragraph', text: 'Store in the fridge for 5 days.' }
    ]);
  });
});
