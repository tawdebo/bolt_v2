import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { User, Globe, History, Heart, LogIn, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';

const ProfilePage = () => {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguage();
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  const handleLogin = () => {
    // In a real app, this would trigger authentication
    setIsLoggedIn(true);
  };
  
  const handleLogout = () => {
    // In a real app, this would end the session
    setIsLoggedIn(false);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-primary-500 p-6 text-white">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
                <User size={32} className="text-primary-500" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{t('profile.title')}</h1>
                {isLoggedIn ? (
                  <p>user@example.com</p>
                ) : (
                  <p>{t('profile.notLoggedIn')}</p>
                )}
              </div>
            </div>
          </div>
          
          <div className="p-6">
            {!isLoggedIn ? (
              <div className="mb-8">
                <button
                  onClick={handleLogin}
                  className="w-full py-3 rounded-lg bg-primary-500 hover:bg-primary-600 text-white font-medium flex items-center justify-center gap-2"
                >
                  <LogIn size={20} />
                  <span>{t('profile.signIn')}</span>
                </button>
              </div>
            ) : (
              <div className="mb-8">
                <button
                  onClick={handleLogout}
                  className="w-full py-3 rounded-lg border border-gray-300 hover:bg-gray-50 font-medium flex items-center justify-center gap-2"
                >
                  <LogOut size={20} />
                  <span>{t('profile.signOut')}</span>
                </button>
              </div>
            )}
            
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
                  <Globe size={20} className="text-primary-500" />
                  {t('profile.language')}
                </h2>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    className={`py-3 rounded-lg text-center ${
                      language === 'en' 
                        ? 'bg-primary-100 text-primary-700 border border-primary-300' 
                        : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => setLanguage('en')}
                  >
                    {t('profile.english')}
                  </button>
                  <button
                    className={`py-3 rounded-lg text-center ${
                      language === 'ar' 
                        ? 'bg-primary-100 text-primary-700 border border-primary-300' 
                        : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                    onClick={() => setLanguage('ar')}
                  >
                    {t('profile.arabic')}
                  </button>
                </div>
              </div>
              
              <div className="pt-4 border-t">
                <button
                  className="flex items-center gap-3 w-full py-3 px-4 rounded-lg hover:bg-background-100"
                  onClick={() => window.location.href = '/favorites'}
                >
                  <Heart size={20} className="text-accent-500" />
                  <span>{t('profile.favorites')}</span>
                  <span className="ml-auto bg-gray-100 px-2 py-0.5 rounded-full text-sm">
                    {isLoggedIn ? '2' : '0'}
                  </span>
                </button>
                
                <button
                  className="flex items-center gap-3 w-full py-3 px-4 rounded-lg hover:bg-background-100"
                  onClick={() => isLoggedIn ? window.location.href = '/history' : undefined}
                >
                  <History size={20} className="text-primary-500" />
                  <span>{t('profile.history')}</span>
                  <span className="ml-auto bg-gray-100 px-2 py-0.5 rounded-full text-sm">
                    {isLoggedIn ? '5' : '0'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;