export interface HouseholdSettings {
  planReviewEnabled: boolean;
  planReviewDay: number; // 0-6 (Sun-Sat)
  planReviewTime: string; // HH:mm format
  assignmentNotificationMode: 'everyone' | 'assignee-only' | 'none';
}

export interface Account {
  id: string;
  name: string;
  ownerId: string;
  inviteCode: string;
  isEncryptionEnabled?: boolean; // Optional: Only true if PIN-based encryption is set up
  settings?: HouseholdSettings;
  publicProfileEnabled?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type RecipeType = 'food' | 'drink';

export interface RecipeIngredient {
  name: string;
  quantity: number; // e.g., 1, 2.5, 200
  unit: string;     // e.g., "cup", "g", "oz", "whole"
}

export interface Recipe {
  id: string;
  accountId: string;
  name: string;
  type: RecipeType;
  description?: string;
  
  // Time & Yield
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings?: number;
  
  // Content
  ingredients: RecipeIngredient[];
  directions: string; // Rich text or multiline string
  
  // Metadata
  sourceUrl?: string; // If imported from web
  imageUrl?: string; // Optional image URL
  
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}
