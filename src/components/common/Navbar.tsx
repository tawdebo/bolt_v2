import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../context/LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import { ChefHat, Menu, X, Search, CalendarCheck, Sparkles, Heart, User } from 'lucide-react';

const Navbar = () => {
  const { t } = useTranslation();
  const { isRTL } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const navItems = [
    { path: '/', label: t('navigation.home'), icon: <ChefHat size={20} /> },
    { path: '/recipes', label: t('navigation.recipes'), icon: <Search size={20} /> },
    { path: '/meal-planner', label: t('navigation.mealPlanner'), icon: <CalendarCheck size={20} /> },
    { path: '/generator', label: t('navigation.generator'), icon: <Sparkles size={20} /> },
    { path: '/favorites', label: t('navigation.favorites'), icon: <Heart size={20} /> },
    { path: '/profile', label: t('navigation.profile'), icon: <User size={20} /> },
  ];

  return (
    <nav className="bg-primary-500 text-white shadow-md">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <NavLink to="/" className="flex items-center gap-2 font-bold text-xl">
            <ChefHat size={28} />
            <span className={`font-${isRTL ? 'cairo' : 'inter'}`}>{t('common.appName')}</span>
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center gap-1 hover:text-primary-100 transition-colors ${
                    isActive ? 'text-accent-300' : ''
                  } font-${isRTL ? 'cairo' : 'inter'}`
                }
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
            <LanguageSwitcher />
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => 
                  `flex items-center gap-2 py-2 px-4 hover:bg-primary-600 rounded-md transition-colors ${
                    isActive ? 'bg-primary-600' : ''
                  } font-${isRTL ? 'cairo' : 'inter'}`
                }
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            ))}
            <div className="py-2 px-4">
              <LanguageSwitcher />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;