import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../common/Navbar';
import Footer from '../common/Footer';
import { useLanguage } from '../../context/LanguageContext';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const { isRTL } = useLanguage();
  
  return (
    <div className={`min-h-screen flex flex-col bg-background-100 font-${isRTL ? 'cairo' : 'inter'}`}>
      <Navbar />
      <motion.main 
        className="flex-grow container mx-auto px-4 py-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.main>
      <Footer />
    </div>
  );
};

export default MainLayout;