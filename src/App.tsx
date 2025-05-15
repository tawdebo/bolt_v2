import { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider } from './context/AuthContext';
import MainLayout from './components/layouts/MainLayout';

// Pages
import HomePage from './pages/HomePage';
import RecipesPage from './pages/RecipesPage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import MealPlannerPage from './pages/MealPlannerPage';
import GeneratorPage from './pages/GeneratorPage';
import FavoritesPage from './pages/FavoritesPage';
import ProfilePage from './pages/ProfilePage';

function App() {
  const location = useLocation();
  
  return (
    <AuthProvider>
      <LanguageProvider>
        <MainLayout>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/" element={<HomePage />} />
              <Route path="/recipes" element={<RecipesPage />} />
              <Route path="/recipes/:recipeId" element={<RecipeDetailPage />} />
              <Route path="/meal-planner" element={<MealPlannerPage />} />
              <Route path="/generator" element={<GeneratorPage />} />
              <Route path="/favorites" element={<FavoritesPage />} />
              <Route path="/profile" element={<ProfilePage />} />
            </Routes>
          </AnimatePresence>
        </MainLayout>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;