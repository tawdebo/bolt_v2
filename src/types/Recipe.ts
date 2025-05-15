export interface Recipe {
  id: string;
  title: string;
  titleAr?: string;
  description: string;
  descriptionAr?: string;
  imageUrl: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  cuisineType: string;
  ingredients: Ingredient[];
  instructions: string[];
  instructionsAr?: string[];
  isFavorite?: boolean;
}

export interface Ingredient {
  id: string;
  name: string;
  nameAr?: string;
  quantity: number;
  unit: string;
}

export interface MealPlan {
  id: string;
  date: string;
  breakfast?: Recipe | null;
  lunch?: Recipe | null;
  dinner?: Recipe | null;
  totalCalories: number;
}