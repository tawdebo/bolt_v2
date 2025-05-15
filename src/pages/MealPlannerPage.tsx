import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { mockRecipes } from '../data/mockRecipes';
import { MealPlan } from '../types/Recipe';
import MealPlanner from '../components/planner/MealPlanner';
import { motion } from 'framer-motion';

// Helper to get current week dates
const getCurrentWeekDates = () => {
  const today = new Date();
  const currentDay = today.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const diff = currentDay === 0 ? 6 : currentDay - 1; // Adjust to start from Monday
  
  const monday = new Date(today);
  monday.setDate(today.getDate() - diff);
  
  const weekDates: string[] = [];
  for (let i = 0; i < 7; i++) {
    const day = new Date(monday);
    day.setDate(monday.getDate() + i);
    weekDates.push(day.toISOString().split('T')[0]);
  }
  
  return weekDates;
};

const MealPlannerPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  
  const [weeklyPlan, setWeeklyPlan] = useState<MealPlan[]>([]);
  
  useEffect(() => {
    // Initialize empty weekly plan
    const weekDates = getCurrentWeekDates();
    const initialPlan = weekDates.map(date => ({
      id: date,
      date,
      breakfast: null,
      lunch: null,
      dinner: null,
      totalCalories: 0
    }));
    
    setWeeklyPlan(initialPlan);
    
    // Check if we've navigated here with a selected recipe
    if (location.state?.selectedRecipe) {
      const recipeId = location.state.selectedRecipe;
      const recipe = mockRecipes.find(r => r.id === recipeId);
      
      if (recipe) {
        // Add the recipe to today's lunch by default
        const today = new Date().toISOString().split('T')[0];
        handleAddRecipe(today, 'lunch', recipeId);
      }
    }
  }, []);
  
  const handleAddRecipe = (date: string, mealType: 'breakfast' | 'lunch' | 'dinner', recipeId: string) => {
    const recipe = mockRecipes.find(r => r.id === recipeId);
    if (!recipe) return;
    
    setWeeklyPlan(prevPlan => {
      return prevPlan.map(day => {
        if (day.date === date) {
          // Calculate new total calories
          const prevMealCalories = day[mealType]?.calories || 0;
          const newTotalCalories = day.totalCalories - prevMealCalories + recipe.calories;
          
          return {
            ...day,
            [mealType]: recipe,
            totalCalories: newTotalCalories
          };
        }
        return day;
      });
    });
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <MealPlanner 
        weeklyPlan={weeklyPlan} 
        recipes={mockRecipes}
        onAddRecipe={handleAddRecipe}
      />
    </motion.div>
  );
};

export default MealPlannerPage;