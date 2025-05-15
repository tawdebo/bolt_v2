import { useTranslation } from 'react-i18next';
import RecipeCard from './RecipeCard';
import { Recipe } from '../../types/Recipe';

interface RecipeGridProps {
  recipes: Recipe[];
  onRecipeClick: (recipeId: string) => void;
  onFavoriteToggle: (recipeId: string) => void;
}

const RecipeGrid = ({ recipes, onRecipeClick, onFavoriteToggle }: RecipeGridProps) => {
  const { t } = useTranslation();
  
  if (recipes.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">{t('recipes.noRecipesFound')}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {recipes.map(recipe => (
        <RecipeCard 
          key={recipe.id} 
          recipe={recipe}
          onClick={() => onRecipeClick(recipe.id)}
          onFavoriteToggle={() => onFavoriteToggle(recipe.id)}
        />
      ))}
    </div>
  );
};

export default RecipeGrid;