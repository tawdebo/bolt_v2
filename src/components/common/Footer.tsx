import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import { ChefHat } from 'lucide-react';

const Footer = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-600 text-white py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-2 mb-4 md:mb-0">
            <ChefHat size={24} />
            <span className={`text-xl font-bold font-${isRTL ? 'cairo' : 'inter'}`}>
              {t('common.appName')}
            </span>
          </div>
          
          <div className={`text-sm text-center md:text-${isRTL ? 'left' : 'right'} font-${isRTL ? 'cairo' : 'inter'}`}>
            &copy; {currentYear} {t('common.appName')}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;