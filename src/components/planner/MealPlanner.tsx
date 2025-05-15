import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import { MealPlan, Recipe } from '../../types/Recipe';
import { CalendarClock, Plus, Download, Share2, Printer } from 'lucide-react';
import { motion } from 'framer-motion';

interface MealPlannerProps {
  weeklyPlan: MealPlan[];
  recipes: Recipe[];
  onAddRecipe: (date: string, mealType: 'breakfast' | 'lunch' | 'dinner', recipeId: string) => void;
}

const MealPlanner = ({ weeklyPlan, recipes, onAddRecipe }: MealPlannerProps) => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const isArabic = language === 'ar';
  
  const [selectedDay, setSelectedDay] = useState(weeklyPlan[0]?.date || '');
  const [showRecipeSelector, setShowRecipeSelector] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState<'breakfast' | 'lunch' | 'dinner'>('breakfast');
  
  const handleAddRecipe = (mealType: 'breakfast' | 'lunch' | 'dinner') => {
    setSelectedMealType(mealType);
    setShowRecipeSelector(true);
  };
  
  const handleSelectRecipe = (recipeId: string) => {
    onAddRecipe(selectedDay, selectedMealType, recipeId);
    setShowRecipeSelector(false);
  };
  
  const getDayMeals = (date: string) => {
    return weeklyPlan.find(day => day.date === date) || {
      id: '',
      date,
      breakfast: null,
      lunch: null,
      dinner: null,
      totalCalories: 0
    };
  };
  
  const totalWeeklyCalories = weeklyPlan.reduce((total, day) => total + day.totalCalories, 0);
  
  const dayNames = [
    t('mealPlanner.monday'),
    t('mealPlanner.tuesday'),
    t('mealPlanner.wednesday'),
    t('mealPlanner.thursday'),
    t('mealPlanner.friday'),
    t('mealPlanner.saturday'),
    t('mealPlanner.sunday')
  ];
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-wrap justify-between items-center mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <CalendarClock size={24} className="text-primary-500" />
          {t('mealPlanner.title')}
        </h1>
        
        <div className="flex gap-2 mt-4 sm:mt-0">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50"
          >
            <Download size={16} />
            <span className="hidden sm:inline">{t('mealPlanner.exportPlan')}</span>
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50"
          >
            <Share2 size={16} />
            <span className="hidden sm:inline">{t('mealPlanner.sharePlan')}</span>
          </motion.button>
          
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-1 px-3 py-1.5 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-50"
          >
            <Printer size={16} />
            <span className="hidden sm:inline">{t('mealPlanner.printPlan')}</span>
          </motion.button>
        </div>
      </div>
      
      <div className="flex overflow-x-auto pb-4 mb-4 gap-2">
        {weeklyPlan.map((day, index) => (
          <button
            key={day.date}
            className={`flex-shrink-0 px-4 py-2 rounded-md font-medium ${
              selectedDay === day.date 
                ? 'bg-primary-500 text-white' 
                : 'bg-background-100 hover:bg-background-200'
            }`}
            onClick={() => setSelectedDay(day.date)}
          >
            {dayNames[index]}
          </button>
        ))}
      </div>
      
      {selectedDay && (
        <div className="space-y-6">
          {['breakfast', 'lunch', 'dinner'].map((mealType) => {
            const typedMealType = mealType as 'breakfast' | 'lunch' | 'dinner';
            const dayPlan = getDayMeals(selectedDay);
            const meal = dayPlan[typedMealType];
            
            return (
              <div key={mealType} className="border rounded-lg overflow-hidden">
                <div className="bg-background-100 px-4 py-2 font-medium">
                  {t(`mealPlanner.${mealType}`)}
                </div>
                
                {meal ? (
                  <div className="p-4 flex items-center gap-4">
                    <img 
                      src={meal.imageUrl} 
                      alt={isArabic && meal.titleAr ? meal.titleAr : meal.title} 
                      className="w-16 h-16 object-cover rounded-md"
                    />
                    <div>
                      <h3 className="font-medium">
                        {isArabic && meal.titleAr ? meal.titleAr : meal.title}
                      </h3>
                      <p className="text-sm text-gray-500">{meal.calories} {t('recipes.calories')}</p>
                    </div>
                  </div>
                ) : (
                  <div className="p-8 flex justify-center">
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      className="flex items-center gap-2 px-4 py-2 rounded-md border border-dashed border-gray-300 text-gray-500 hover:border-primary-500 hover:text-primary-500"
                      onClick={() => handleAddRecipe(typedMealType)}
                    >
                      <Plus size={18} />
                      <span>{t('mealPlanner.addRecipe')}</span>
                    </motion.button>
                  </div>
                )}
              </div>
            );
          })}
          
          <div className="pt-4 border-t">
            <div className="flex justify-between items-center">
              <span className="font-medium">{t('mealPlanner.totalCalories')}</span>
              <span className="text-xl font-bold">{getDayMeals(selectedDay).totalCalories} kcal</span>
            </div>
          </div>
        </div>
      )}
      
      {showRecipeSelector && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b sticky top-0 bg-white z-10">
              <h2 className="text-lg font-medium">{t('mealPlanner.addRecipe')}</h2>
              <button 
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={() => setShowRecipeSelector(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {recipes.map(recipe => (
                <div 
                  key={recipe.id}
                  className="border rounded-lg overflow-hidden hover:border-primary-500 cursor-pointer"
                  onClick={() => handleSelectRecipe(recipe.id)}
                >
                  <div className="h-32 overflow-hidden">
                    <img 
                      src={recipe.imageUrl} 
                      alt={isArabic && recipe.titleAr ? recipe.titleAr : recipe.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3">
                    <h3 className="font-medium truncate">
                      {isArabic && recipe.titleAr ? recipe.titleAr : recipe.title}
                    </h3>
                    <p className="text-sm text-gray-500">{recipe.calories} kcal</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MealPlanner;