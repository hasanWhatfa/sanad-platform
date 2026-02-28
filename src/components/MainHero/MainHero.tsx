import React from 'react';
import { motion } from 'framer-motion';
import { FiArrowLeft } from 'react-icons/fi'; // Using a left arrow for Arabic "Start Now"
import './MainHero.css';

// Framer Motion animation variants for staggered effect
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2, // Animates children one by one
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
    },
  },
};

const MainHero: React.FC = () => {
  return (
    <motion.section
      className="hero-section"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Animated background shapes */}
      <motion.div className="shape shape-1" animate={{ y: [0, -15, 0], scale: [1, 1.05, 1] }} transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}></motion.div>
      <motion.div className="shape shape-2" animate={{ y: [0, 20, 0], x: [0, -10, 0] }} transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 3 }}></motion.div>
      <motion.div className="shape shape-3" animate={{ y: [0, -10, 0], x: [0, 15, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1 }}></motion.div>

      <div className="hero-container">
        <motion.h1 className="hero-title" variants={itemVariants}>
          منصة سند <span className="highlight-text">للدعم النفسي</span>
        </motion.h1>
        <motion.p className="hero-subtitle" variants={itemVariants}>
          خطوتك الأولى نحو نفسٍ مطمئنة تبدأ من هنا. دعم آمن وموثوق بانتظارك.
        </motion.p>
        <motion.div variants={itemVariants}>
          <motion.button
            className="hero-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ابدأ رحلتك الآن
            <FiArrowLeft className="button-icon" />
          </motion.button>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default MainHero;