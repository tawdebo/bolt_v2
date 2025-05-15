import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../context/LanguageContext';
import { mockRecipes } from '../data/mockRecipes';
import { Recipe } from '../types/Recipe';
import RecipeCard from '../components/recipe/RecipeCard';
import { motion } from 'framer-motion';
import { Search, ChefHat, ArrowRight } from 'lucide-react';

const HomePage = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const navigate = useNavigate();
  
  const [searchInput, setSearchInput] = useState('');
  
  const featuredRecipes = mockRecipes.slice(0, 3);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      navigate(`/recipes?search=${encodeURIComponent(searchInput)}`);
    }
  };
  
  const handleRecipeClick = (recipeId: string) => {
    navigate(`/recipes/${recipeId}`);
  };
  
  const handleFavoriteToggle = (recipeId: string) => {
    // In a real app, this would update state or call an API
    console.log(`Toggle favorite for recipe ${recipeId}`);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative bg-primary-500 text-white rounded-lg overflow-hidden mb-10">
        <div className="absolute inset-0 opacity-20">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" preserveAspectRatio="none" className="w-full h-full">
            <path fill="#ffffff" fillOpacity="1" d="M0,64L48,96C96,128,192,192,288,202.7C384,213,480,171,576,149.3C672,128,768,128,864,149.3C960,171,1056,213,1152,218.7C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
          </svg>
        </div>
        
        <div className="relative z-10 py-12 px-6 md:px-10 max-w-4xl mx-auto">
          <div className="flex items-center justify-center mb-6">
            <ChefHat size={36} className="text-accent-300" />
          </div>
          
          <h1 className={`text-3xl md:text-4xl font-bold text-center mb-4 font-${isRTL ? 'cairo' : 'inter'}`}>
            {t('home.welcome')}
          </h1>
          
          <form onSubmit={handleSearch} className="max-w-xl mx-auto mt-8">
            <div className="relative">
              <input
                type="text"
                className={`w-full py-3 px-4 rounded-full text-gray-800 placeholder-gray-500 pr-12 border-2 border-white focus:border-accent-300 focus:outline-none font-${isRTL ? 'cairo' : 'inter'} text-${isRTL ? 'right' : 'left'}`}
                placeholder={t('home.searchPlaceholder')}
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
              <button
                type="submit"
                className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-600 hover:text-primary-500"
              >
                <Search size={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
      
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{t('home.featuredRecipes')}</h2>
          <button
            onClick={() => navigate('/recipes')}
            className="flex items-center gap-1 text-primary-500 hover:text-primary-600"
          >
            <span>{t('common.viewAll')}</span>
            <ArrowRight size={16} className={isRTL ? 'rotate-180' : ''} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredRecipes.map(recipe => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              onClick={() => handleRecipeClick(recipe.id)}
              onFavoriteToggle={() => handleFavoriteToggle(recipe.id)}
            />
          ))}
        </div>
      </section>
      
      <section className="bg-background-200 rounded-lg p-6 mb-12">
        <h2 className="text-2xl font-bold mb-4">{t('home.quickMealIdeas')}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['breakfast', 'lunch', 'dinner', 'snack'].map((mealType) => (
            <motion.div
              key={mealType}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white rounded-lg shadow-sm overflow-hidden cursor-pointer"
              onClick={() => navigate(`/recipes?mealType=${mealType}`)}
            >
              <div className="p-4 text-center">
                <h3 className="font-medium">{t(`recipes.${mealType}`)}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </motion.div>
  );
};

export default HomePage;