import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';

const LanguageSwitcher = () => {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'ar' : 'en';
    setLanguage(newLanguage);
  };

  return (
    <button 
      onClick={toggleLanguage}
      className="flex items-center justify-center px-3 py-1 text-sm font-medium rounded-md bg-primary-100 text-primary-600 hover:bg-primary-200 transition-colors duration-200"
      aria-label={language === 'en' ? 'Switch to Arabic' : 'Switch to English'}
    >
      {language === 'en' ? 'العربية' : 'English'}
    </button>
  );
};

export default LanguageSwitcher;