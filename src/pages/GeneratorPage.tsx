import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import RecipeGenerator from '../components/generator/RecipeGenerator';
import RecipeDetail from '../components/recipe/RecipeDetail';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

// Mock generated recipe
const mockGeneratedRecipe = {
  id: 'generated-1',
  title: 'Pasta with Tomato Sauce',
  titleAr: 'باستا بصلصة الطماطم',
  description: 'A simple and delicious pasta dish with fresh tomato sauce.',
  descriptionAr: 'طبق باستا بسيط ولذيذ مع صلصة الطماطم الطازجة.',
  imageUrl: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  calories: 450,
  protein: 12,
  carbs: 65,
  fat: 15,
  prepTimeMinutes: 10,
  cookTimeMinutes: 20,
  servings: 2,
  mealType: 'dinner',
  cuisineType: 'Italian',
  ingredients: [
    {
      id: 'g-1',
      name: 'Pasta',
      nameAr: 'معكرونة',
      quantity: 200,
      unit: 'g'
    },
    {
      id: 'g-2',
      name: 'Tomatoes',
      nameAr: 'طماطم',
      quantity: 4,
      unit: 'medium'
    },
    {
      id: 'g-3',
      name: 'Garlic',
      nameAr: 'ثوم',
      quantity: 2,
      unit: 'clove'
    },
    {
      id: 'g-4',
      name: 'Olive oil',
      nameAr: 'زيت زيتون',
      quantity: 2,
      unit: 'tbsp'
    },
    {
      id: 'g-5',
      name: 'Basil',
      nameAr: 'ريحان',
      quantity: 1,
      unit: 'handful'
    },
    {
      id: 'g-6',
      name: 'Salt',
      nameAr: 'ملح',
      quantity: 1,
      unit: 'tsp'
    },
    {
      id: 'g-7',
      name: 'Black pepper',
      nameAr: 'فلفل أسود',
      quantity: 0.5,
      unit: 'tsp'
    }
  ],
  instructions: [
    'Bring a large pot of salted water to a boil.',
    'Add pasta and cook according to package instructions until al dente.',
    'Meanwhile, dice the tomatoes and mince the garlic.',
    'Heat olive oil in a large pan over medium heat.',
    'Add garlic and sauté until fragrant, about 30 seconds.',
    'Add tomatoes and cook for 10 minutes until they break down.',
    'Season with salt and pepper.',
    'Drain pasta and add to the sauce, tossing to coat.',
    'Tear basil leaves and sprinkle over the pasta.',
    'Serve immediately.'
  ],
  instructionsAr: [
    'أحضر قدرًا كبيرًا من الماء المملح واتركه حتى يغلي.',
    'أضف المعكرونة واطبخها وفقًا للتعليمات الموجودة على العبوة حتى تصبح طرية.',
    'في هذه الأثناء، قطّع الطماطم وافرم الثوم.',
    'سخّن زيت الزيتون في مقلاة كبيرة على نار متوسطة.',
    'أضف الثوم واقله حتى تفوح رائحته، حوالي 30 ثانية.',
    'أضف الطماطم واطبخها لمدة 10 دقائق حتى تتفكك.',
    'تبّل بالملح والفلفل.',
    'صفّي المعكرونة وأضفها إلى الصلصة، مع التقليب لتغطيتها.',
    'قطّع أوراق الريحان وانثرها فوق المعكرونة.',
    'قدّم الطبق فورًا.'
  ],
  isFavorite: false
};

const GeneratorPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedRecipe, setGeneratedRecipe] = useState<typeof mockGeneratedRecipe | null>(null);
  
  const handleGenerateRecipe = async (input: string, mealType: string, preferences: string[]) => {
    // In a real app, this would call an API
    setIsGenerating(true);
    
    // Simulate API delay
    setTimeout(() => {
      setGeneratedRecipe(mockGeneratedRecipe);
      setIsGenerating(false);
    }, 2000);
  };
  
  const handleFavoriteToggle = () => {
    if (generatedRecipe) {
      setGeneratedRecipe({
        ...generatedRecipe,
        isFavorite: !generatedRecipe.isFavorite
      });
    }
  };
  
  const handleAddToMealPlan = () => {
    if (generatedRecipe) {
      navigate('/meal-planner', { state: { selectedRecipe: generatedRecipe.id } });
    }
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <RecipeGenerator 
            onGenerateRecipe={handleGenerateRecipe}
            isGenerating={isGenerating}
          />
        </div>
        
        <div>
          {isGenerating ? (
            <div className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center justify-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-500 mb-4"></div>
              <p className="text-lg">{t('generator.generatingRecipe')}</p>
            </div>
          ) : generatedRecipe ? (
            <RecipeDetail
              recipe={generatedRecipe}
              onFavoriteToggle={handleFavoriteToggle}
              onAddToMealPlan={handleAddToMealPlan}
            />
          ) : (
            <div className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center justify-center min-h-[400px] text-center">
              <img 
                src="https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="cooking"
                className="w-48 h-48 object-cover rounded-full mb-6 opacity-60"
              />
              <h2 className="text-xl font-medium mb-2">{t('generator.startPrompt')}</h2>
              <p className="text-gray-500 max-w-md">
                {t('generator.description')}
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default GeneratorPage;