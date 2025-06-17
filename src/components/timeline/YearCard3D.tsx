
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';

interface YearCard3DProps {
  year: string;
  title: string;
  summary: string;
  index: number;
}

export const YearCard3D = ({ year, title, summary, index }: YearCard3DProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 100, rotateY: 90 }}
      animate={{ opacity: 1, x: 0, rotateY: 0 }}
      exit={{ opacity: 0, x: -100, rotateY: -90 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      className="perspective-1000"
    >
      <Card className="bg-gradient-to-br from-slate-800/90 to-purple-900/90 border-purple-500/30 backdrop-blur-xl p-8 shadow-2xl">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* Year display */}
          <motion.h2 
            className="text-8xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text mb-4"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            {year}
          </motion.h2>

          {/* Animated line separator */}
          <motion.div
            className="h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-6"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            style={{ transformOrigin: "left" }}
          />

          {/* Title */}
          <motion.h3 
            className="text-2xl font-semibold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            {title}
          </motion.h3>

          {/* Summary text */}
          <motion.p 
            className="text-gray-300 text-lg leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            {summary}
          </motion.p>

          {/* Decorative elements */}
          <motion.div
            className="absolute -top-2 -right-2 w-20 h-20 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-xl"
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          />
        </motion.div>
      </Card>
    </motion.div>
  );
};
