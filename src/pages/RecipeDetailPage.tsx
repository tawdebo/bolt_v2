import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { mockRecipes } from '../data/mockRecipes';
import { Recipe } from '../types/Recipe';
import RecipeDetail from '../components/recipe/RecipeDetail';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const RecipeDetailPage = () => {
  const { t } = useTranslation();
  const { recipeId } = useParams();
  const navigate = useNavigate();
  
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, this would be an API call
    const foundRecipe = mockRecipes.find(r => r.id === recipeId);
    setRecipe(foundRecipe || null);
    setLoading(false);
  }, [recipeId]);
  
  const handleFavoriteToggle = () => {
    if (recipe) {
      // In a real app, this would update state or call an API
      setRecipe({
        ...recipe,
        isFavorite: !recipe.isFavorite
      });
    }
  };
  
  const handleAddToMealPlan = () => {
    // In a real app, this would open a meal planner selector
    if (recipe) {
      navigate('/meal-planner', { state: { selectedRecipe: recipe.id } });
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-primary-500"></div>
      </div>
    );
  }
  
  if (!recipe) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">{t('common.notFound')}</h1>
        <p className="mb-6">{t('recipes.recipeNotFound')}</p>
        <button
          onClick={() => navigate('/recipes')}
          className="px-4 py-2 bg-primary-500 text-white rounded-md hover:bg-primary-600"
        >
          {t('common.backToRecipes')}
        </button>
      </div>
    );
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 text-gray-600 hover:text-primary-500"
        >
          <ArrowLeft size={18} />
          <span>{t('common.back')}</span>
        </button>
      </div>
      
      <RecipeDetail
        recipe={recipe}
        onFavoriteToggle={handleFavoriteToggle}
        onAddToMealPlan={handleAddToMealPlan}
      />
    </motion.div>
  );
};

export default RecipeDetailPage;