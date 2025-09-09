import { motion } from 'framer-motion';
import './Hero.css';
import heroImage from '../assets/hero-img.svg';

const heroVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100,
    },
  },
};

export default function Hero() {
  return (
    <motion.section
      id="hero"
      className="hero"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={heroVariants}
    >
      <div className="hero__container">
        <div className="hero__grid">
          <div className="hero__content">
            <motion.h1 className="hero__title" variants={itemVariants}>
              Never Lose Your Belongings Again
            </motion.h1>

            <motion.p className="hero__description" variants={itemVariants}>
              Attach a QR code to your items and make it easy for others to
              return them safely.
            </motion.p>

            <motion.a
              href="#cta"
              className="hero__button"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.a>
          </div>

          {/* Image - Right Side */}
          <motion.div className="hero__image-container" variants={itemVariants}>
            <img
              src={heroImage}
              alt="Three friends smiling and making peace signs while using HappyFindr app to scan QR codes on their belongings"
              className="hero__image"
            />
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
