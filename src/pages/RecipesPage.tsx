import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { mockRecipes } from '../data/mockRecipes';
import RecipeGrid from '../components/recipe/RecipeGrid';
import { Recipe } from '../types/Recipe';
import { Search, Filter, X } from 'lucide-react';

const RecipesPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [searchInput, setSearchInput] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(mockRecipes);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [selectedMealType, setSelectedMealType] = useState<string>('');
  const [selectedCuisine, setSelectedCuisine] = useState<string>('');
  const [calorieRange, setCalorieRange] = useState<[number, number]>([0, 1000]);
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    const mealTypeParam = params.get('mealType');
    
    if (searchParam) setSearchInput(searchParam);
    if (mealTypeParam) setSelectedMealType(mealTypeParam);
    
    applyFilters();
  }, [location.search]);
  
  const applyFilters = () => {
    let results = [...mockRecipes];
    
    // Apply search filter
    if (searchInput) {
      const searchLower = searchInput.toLowerCase();
      results = results.filter(recipe => 
        recipe.title.toLowerCase().includes(searchLower) || 
        recipe.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply meal type filter
    if (selectedMealType) {
      results = results.filter(recipe => recipe.mealType === selectedMealType);
    }
    
    // Apply cuisine filter
    if (selectedCuisine) {
      results = results.filter(recipe => recipe.cuisineType === selectedCuisine);
    }
    
    // Apply calorie range filter
    results = results.filter(recipe => 
      recipe.calories >= calorieRange[0] && recipe.calories <= calorieRange[1]
    );
    
    setFilteredRecipes(results);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
    
    const params = new URLSearchParams(location.search);
    if (searchInput) {
      params.set('search', searchInput);
    } else {
      params.delete('search');
    }
    
    navigate({ search: params.toString() });
  };
  
  const handleMealTypeChange = (mealType: string) => {
    setSelectedMealType(mealType === selectedMealType ? '' : mealType);
  };
  
  const handleCuisineChange = (cuisine: string) => {
    setSelectedCuisine(cuisine === selectedCuisine ? '' : cuisine);
  };
  
  const handleRecipeClick = (recipeId: string) => {
    navigate(`/recipes/${recipeId}`);
  };
  
  const handleFavoriteToggle = (recipeId: string) => {
    // In a real app, this would update state or call an API
    console.log(`Toggle favorite for recipe ${recipeId}`);
  };
  
  const clearFilters = () => {
    setSearchInput('');
    setSelectedMealType('');
    setSelectedCuisine('');
    setCalorieRange([0, 1000]);
    
    navigate('/recipes');
  };
  
  const cuisines = ['Mediterranean', 'Asian', 'Italian', 'Mexican', 'Indian', 'International'];
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{t('recipes.allRecipes')}</h1>
        <button
          className="flex items-center gap-1 px-3 py-1.5 rounded-md bg-background-200 hover:bg-background-300"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter size={18} />
          <span>{t('recipes.filters')}</span>
        </button>
      </div>
      
      <div className="mb-6">
        <form onSubmit={handleSearch} className="relative">
          <input
            type="text"
            className="w-full py-2.5 px-4 pe-10 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50"
            placeholder={t('recipes.searchRecipes')}
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <button
            type="submit"
            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500"
          >
            <Search size={18} />
          </button>
        </form>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {showFilters && (
          <div className="lg:col-span-1 bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-medium">{t('recipes.filters')}</h2>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={clearFilters}
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">{t('recipes.mealType')}</h3>
                <div className="space-y-2">
                  {['breakfast', 'lunch', 'dinner', 'snack'].map(mealType => (
                    <button
                      key={mealType}
                      className={`block w-full text-left px-3 py-2 rounded-md ${
                        selectedMealType === mealType 
                          ? 'bg-primary-100 text-primary-700' 
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => handleMealTypeChange(mealType)}
                    >
                      {t(`recipes.${mealType}`)}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">{t('recipes.cuisineType')}</h3>
                <div className="space-y-2">
                  {cuisines.map(cuisine => (
                    <button
                      key={cuisine}
                      className={`block w-full text-left px-3 py-2 rounded-md ${
                        selectedCuisine === cuisine 
                          ? 'bg-primary-100 text-primary-700' 
                          : 'hover:bg-gray-100'
                      }`}
                      onClick={() => handleCuisineChange(cuisine)}
                    >
                      {cuisine}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">{t('recipes.calorieRange')}</h3>
                <div className="px-2">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="50"
                    value={calorieRange[1]}
                    onChange={(e) => setCalorieRange([calorieRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>{calorieRange[0]}</span>
                    <span>{calorieRange[1]} kcal</span>
                  </div>
                </div>
              </div>
              
              <button
                className="w-full py-2 mt-4 bg-primary-500 hover:bg-primary-600 text-white rounded-md"
                onClick={applyFilters}
              >
                {t('common.apply')}
              </button>
            </div>
          </div>
        )}
        
        <div className={`${showFilters ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
          <RecipeGrid 
            recipes={filteredRecipes}
            onRecipeClick={handleRecipeClick}
            onFavoriteToggle={handleFavoriteToggle}
          />
        </div>
      </div>
    </div>
  );
};

export default RecipesPage;