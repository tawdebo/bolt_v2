import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import { Recipe } from '../../types/Recipe';
import { Clock, Flame, Heart } from 'lucide-react';

interface RecipeCardProps {
  recipe: Recipe;
  onClick?: () => void;
  onFavoriteToggle?: () => void;
}

const RecipeCard = ({ recipe, onClick, onFavoriteToggle }: RecipeCardProps) => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isArabic = language === 'ar';

  return (
    <motion.div 
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      <div className="relative h-48 cursor-pointer" onClick={onClick}>
        <img 
          src={recipe.imageUrl} 
          alt={isArabic && recipe.titleAr ? recipe.titleAr : recipe.title} 
          className="w-full h-full object-cover"
        />
        <button 
          className="absolute top-2 right-2 p-2 bg-white bg-opacity-80 rounded-full hover:bg-opacity-100 transition-all"
          onClick={(e) => {
            e.stopPropagation();
            if (onFavoriteToggle) onFavoriteToggle();
          }}
          aria-label={recipe.isFavorite ? t('recipes.removeFromFavorites') : t('recipes.addToFavorites')}
        >
          <Heart size={20} className={recipe.isFavorite ? 'fill-accent-500 text-accent-500' : 'text-gray-500'} />
        </button>
      </div>
      
      <div className="p-4 cursor-pointer" onClick={onClick}>
        <h3 className="text-lg font-semibold mb-2">
          {isArabic && recipe.titleAr ? recipe.titleAr : recipe.title}
        </h3>
        
        <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
          <div className="flex items-center gap-1">
            <Clock size={16} />
            <span>{recipe.prepTimeMinutes + recipe.cookTimeMinutes} min</span>
          </div>
          <div className="flex items-center gap-1">
            <Flame size={16} className="text-accent-500" />
            <span>{recipe.calories} {t('recipes.calories')}</span>
          </div>
        </div>
        
        <p className="text-sm text-gray-500 line-clamp-2">
          {isArabic && recipe.descriptionAr ? recipe.descriptionAr : recipe.description}
        </p>
      </div>
    </motion.div>
  );
};

export default RecipeCard;