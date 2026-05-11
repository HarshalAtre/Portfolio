import React from 'react';
import { motion } from 'framer-motion';

function ScrollReveal({ children, delay = 0, amount = 0.2 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 36, filter: 'blur(8px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.65, ease: 'easeOut', delay }}
    >
      {children}
    </motion.div>
  );
}

export default ScrollReveal;
