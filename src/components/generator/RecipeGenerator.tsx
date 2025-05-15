import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles, Flame, Clock, ChefHat } from 'lucide-react';
import { motion } from 'framer-motion';

interface RecipeGeneratorProps {
  onGenerateRecipe: (
    input: string, 
    mealType: string, 
    preferences: string[]
  ) => Promise<void>;
  isGenerating: boolean;
}

const RecipeGenerator = ({ onGenerateRecipe, isGenerating }: RecipeGeneratorProps) => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  
  const [input, setInput] = useState('');
  const [mealType, setMealType] = useState('any');
  const [preferences, setPreferences] = useState<string[]>([]);
  
  const dietaryOptions = [
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'vegan', label: 'Vegan' },
    { id: 'gluten-free', label: 'Gluten Free' },
    { id: 'dairy-free', label: 'Dairy Free' },
    { id: 'low-carb', label: 'Low Carb' },
    { id: 'keto', label: 'Keto' },
  ];
  
  const togglePreference = (id: string) => {
    if (preferences.includes(id)) {
      setPreferences(preferences.filter(p => p !== id));
    } else {
      setPreferences([...preferences, id]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onGenerateRecipe(input, mealType, preferences);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-primary-500 p-6 text-white">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Sparkles size={24} />
          {t('generator.title')}
        </h1>
        <p className="mt-2 opacity-90">{t('generator.description')}</p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-6">
        <div className="mb-6">
          <label htmlFor="recipeInput" className="block font-medium mb-2">
            {t('generator.inputLabel')}
          </label>
          <input
            type="text"
            id="recipeInput"
            className={`w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring focus:ring-primary-200 focus:ring-opacity-50 text-${isRTL ? 'right' : 'left'}`}
            placeholder={t('generator.inputPlaceholder')}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-6">
          <h2 className="font-medium mb-3">{t('generator.preferenceLabel')}</h2>
          
          <div className="mb-4">
            <label className="block text-sm mb-2">{t('generator.mealTypeLabel')}</label>
            <div className="flex flex-wrap gap-2">
              {['any', 'breakfast', 'lunch', 'dinner', 'snack'].map((type) => (
                <button
                  key={type}
                  type="button"
                  className={`px-3 py-1.5 rounded-full text-sm ${
                    mealType === type 
                      ? 'bg-primary-500 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  onClick={() => setMealType(type)}
                >
                  {t(`recipes.${type === 'any' ? 'allMealTypes' : type}`)}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm mb-2">{t('generator.dietaryLabel')}</label>
            <div className="flex flex-wrap gap-2">
              {dietaryOptions.map((option) => (
                <button
                  key={option.id}
                  type="button"
                  className={`px-3 py-1.5 rounded-full text-sm ${
                    preferences.includes(option.id) 
                      ? 'bg-accent-500 text-white' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                  onClick={() => togglePreference(option.id)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        <motion.button
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full py-3 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium flex items-center justify-center gap-2"
          disabled={isGenerating || !input.trim()}
        >
          {isGenerating ? (
            <>
              <span className="animate-spin rounded-full h-5 w-5 border-t-2 border-r-2 border-white"></span>
              <span>{t('generator.generatingRecipe')}</span>
            </>
          ) : (
            <>
              <Sparkles size={20} />
              <span>{t('generator.generateButton')}</span>
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
};

export default RecipeGenerator;