import './Features.css';
import { LiaQrcodeSolid } from 'react-icons/lia';
import { HiOutlinePaperClip, HiOutlineBell } from 'react-icons/hi2';
import { MdOutlineMarkEmailRead } from 'react-icons/md';
import { motion } from 'framer-motion';

const cardVariants = {
  offscreen: {
    opacity: 0,
    y: 50,
  },
  onscreen: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      bounce: 0.3,
      duration: 0.8,
    },
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

export default function Features() {
  return (
    <section id="features" className="features">
      <div className="features__container">
        <h2 className="features__title">How HappyFindr Works</h2>

        <motion.div
          className="features__grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
        >
          {/* Card 1: Generate QR */}
          <motion.div className="features__card" variants={cardVariants}>
            <div className="features__icon-container">
              <LiaQrcodeSolid className="features__icon features__icon--primary" />
            </div>
            <h3 className="features__card-title">Generate QR</h3>
            <p className="features__card-desc">
              Create a unique QR code for each of your items.
            </p>
          </motion.div>

          <motion.div className="features__card" variants={cardVariants}>
            <div className="features__icon-container features__icon-container--composite">
              <HiOutlineBell className="features__icon features__icon--accent" />
              <HiOutlinePaperClip className="features__icon features__icon--primary" />
            </div>
            <h3 className="features__card-title">Attach & Get Notified</h3>
            <p className="features__card-desc">
              Securely attach your QR tag. Anyone who finds your item can scan
              it to alert you instantly.
            </p>
          </motion.div>

          <motion.div className="features__card" variants={cardVariants}>
            <div className="features__icon-container">
              <MdOutlineMarkEmailRead className="features__icon features__icon--primary" />
            </div>
            <h3 className="features__card-title">Secure Contact</h3>
            <p className="features__card-desc">
              Anyone who finds your item can contact you safely.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
