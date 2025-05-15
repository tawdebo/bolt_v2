import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { mockRecipes } from '../data/mockRecipes';
import RecipeGrid from '../components/recipe/RecipeGrid';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const FavoritesPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  // Filter recipes marked as favorites
  const favoriteRecipes = mockRecipes.filter(recipe => recipe.isFavorite);
  
  const handleRecipeClick = (recipeId: string) => {
    navigate(`/recipes/${recipeId}`);
  };
  
  const handleFavoriteToggle = (recipeId: string) => {
    // In a real app, this would update state or call an API
    console.log(`Remove from favorites: ${recipeId}`);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-2 mb-6">
        <Heart size={24} className="text-accent-500 fill-accent-500" />
        <h1 className="text-2xl font-bold">{t('navigation.favorites')}</h1>
      </div>
      
      {favoriteRecipes.length > 0 ? (
        <RecipeGrid
          recipes={favoriteRecipes}
          onRecipeClick={handleRecipeClick}
          onFavoriteToggle={handleFavoriteToggle}
        />
      ) : (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-background-100 mb-4">
            <Heart size={32} className="text-gray-400" />
          </div>
          <h2 className="text-xl font-medium mb-2">{t('favorites.noFavorites')}</h2>
          <p className="text-gray-500 mb-6">{t('favorites.browseRecipes')}</p>
          <button
            onClick={() => navigate('/recipes')}
            className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
          >
            {t('favorites.exploreRecipes')}
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default FavoritesPage;