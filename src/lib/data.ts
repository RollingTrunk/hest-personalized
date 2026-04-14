import { db } from './firebase-admin';
import { cacheLife, cacheTag } from 'next/cache';
import { Account, Recipe } from './types';

// --- Cached data access layer ---
// Uses Next.js 16 'use cache' directive for in-memory LRU caching.
// Returns plain serializable objects (not Firestore class instances).

export interface AccountResult {
  exists: boolean;
  data: Account | null;
}

export interface RecipeResult {
  exists: boolean;
  data: Recipe | null;
}

/**
 * Recursively converts Firestore Timestamp instances to ISO date strings
 * so the data is fully serializable for the 'use cache' boundary.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function sanitizeValue(value: any): any {
  if (value == null) return value;

  // Firestore Timestamp — has toDate() method
  if (typeof value === 'object' && typeof value.toDate === 'function') {
    return value.toDate().toISOString();
  }

  if (Array.isArray(value)) {
    return value.map(sanitizeValue);
  }

  if (typeof value === 'object') {
    const result: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) {
      result[k] = sanitizeValue(v);
    }
    return result;
  }

  return value;
}

function sanitizeFirestoreData<T>(data: Record<string, unknown>): T {
  return sanitizeValue(data) as T;
}

export async function getAccount(householdId: string): Promise<AccountResult> {
  'use cache';
  cacheLife('minutes');
  cacheTag(`account-${householdId}`);

  const doc = await db.collection('accounts').doc(householdId).get();

  if (!doc.exists) {
    return { exists: false, data: null };
  }

  return {
    exists: true,
    data: sanitizeFirestoreData<Account>({ id: doc.id, ...doc.data()! }),
  };
}

export async function getRecipe(recipeId: string): Promise<RecipeResult> {
  'use cache';
  cacheLife('minutes');
  cacheTag(`recipe-${recipeId}`);

  const doc = await db.collection('recipes').doc(recipeId).get();

  if (!doc.exists) {
    return { exists: false, data: null };
  }

  return {
    exists: true,
    data: sanitizeFirestoreData<Recipe>({ id: doc.id, ...doc.data()! }),
  };
}

export async function getHouseholdRecipes(householdId: string): Promise<Recipe[]> {
  'use cache';
  cacheLife('minutes');
  cacheTag(`recipes-${householdId}`);

  const snapshot = await db.collection('recipes').where('accountId', '==', householdId).get();
  return snapshot.docs.map((doc) => sanitizeFirestoreData<Recipe>({ id: doc.id, ...doc.data() }));
}
