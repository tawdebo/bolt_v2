import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import { Recipe } from '../../types/Recipe';
import { Clock, Flame, Heart, User, Plus, PieChart, Copy } from 'lucide-react';
import { motion } from 'framer-motion';

interface RecipeDetailProps {
  recipe: Recipe;
  onFavoriteToggle: () => void;
  onAddToMealPlan: () => void;
}

const RecipeDetail = ({ recipe, onFavoriteToggle, onAddToMealPlan }: RecipeDetailProps) => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  const title = isArabic && recipe.titleAr ? recipe.titleAr : recipe.title;
  const instructions = isArabic && recipe.instructionsAr ? recipe.instructionsAr : recipe.instructions;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-64 md:h-80">
        <img 
          src={recipe.imageUrl} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
          <div className="p-6 w-full">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">{title}</h1>
            <div className="flex flex-wrap gap-4 text-white">
              <div className="flex items-center gap-1">
                <Clock size={18} />
                <span>{recipe.prepTimeMinutes + recipe.cookTimeMinutes} min</span>
              </div>
              <div className="flex items-center gap-1">
                <Flame size={18} />
                <span>{recipe.calories} {t('recipes.calories')}</span>
              </div>
              <div className="flex items-center gap-1">
                <User size={18} />
                <span>{recipe.servings} {t('recipes.servings')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex flex-wrap gap-4 mb-6">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-4 py-2 rounded-md border ${
              recipe.isFavorite 
                ? 'bg-accent-100 border-accent-500 text-accent-500' 
                : 'border-gray-300 hover:bg-gray-50'
            }`}
            onClick={onFavoriteToggle}
          >
            <Heart size={18} className={recipe.isFavorite ? 'fill-accent-500' : ''} />
            <span>
              {recipe.isFavorite 
                ? t('recipes.removeFromFavorites') 
                : t('recipes.addToFavorites')}
            </span>
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-md border border-primary-500 text-primary-500 hover:bg-primary-50"
            onClick={onAddToMealPlan}
          >
            <Plus size={18} />
            <span>{t('recipes.addToMealPlan')}</span>
          </motion.button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h2 className="text-xl font-semibold mb-4">{t('recipes.ingredients')}</h2>
            <ul className="space-y-3">
              {recipe.ingredients.map((ingredient) => (
                <li key={ingredient.id} className="flex items-start gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary-500 mt-2"></div>
                  <span>
                    {ingredient.quantity} {ingredient.unit} {isArabic && ingredient.nameAr ? ingredient.nameAr : ingredient.name}
                  </span>
                </li>
              ))}
            </ul>
            
            <div className="mt-6 p-4 bg-background-200 rounded-lg">
              <h3 className="font-semibold mb-3">{t('recipes.nutrition')}</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>{t('recipes.calories')}</span>
                  <span className="font-medium">{recipe.calories} kcal</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('recipes.protein')}</span>
                  <span className="font-medium">{recipe.protein}g</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('recipes.carbs')}</span>
                  <span className="font-medium">{recipe.carbs}g</span>
                </div>
                <div className="flex justify-between">
                  <span>{t('recipes.fat')}</span>
                  <span className="font-medium">{recipe.fat}g</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold mb-4">{t('recipes.instructions')}</h2>
            <ol className="space-y-4">
              {instructions.map((step, index) => (
                <li key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-500 text-white flex items-center justify-center font-medium">
                    {index + 1}
                  </div>
                  <p className="pt-1">{step}</p>
                </li>
              ))}
            </ol>
            
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="mt-8 w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-primary-500 text-white font-medium hover:bg-primary-600 transition-colors"
            >
              <PieChart size={20} />
              <span>{t('recipes.startCooking')}</span>
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;