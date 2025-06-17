
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import { ArrowLeft, ArrowRight, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { YearCard3D } from '@/components/timeline/YearCard3D';
import { TimelineModel } from '@/components/timeline/TimelineModel';
import { timelineData } from '@/data/moroccoTimeline';

const Timeline = () => {
  const [currentYear, setCurrentYear] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    if (isAutoPlay) {
      intervalRef.current = setInterval(() => {
        setCurrentYear(prev => prev < timelineData.length - 1 ? prev + 1 : 0);
      }, 4000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isAutoPlay]);

  const handleNext = () => {
    setCurrentYear(prev => prev < timelineData.length - 1 ? prev + 1 : prev);
  };

  const handlePrev = () => {
    setCurrentYear(prev => prev > 0 ? prev - 1 : prev);
  };

  const handleStartTimeline = () => {
    setIsStarted(true);
  };

  if (!isStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center z-10"
        >
          <motion.h1 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="text-6xl font-bold text-white mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent"
          >
            Morocco Chronoscape
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl text-gray-300 mb-8"
          >
            Journey through 25 years of Moroccan history in immersive 3D
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <Button 
              onClick={handleStartTimeline}
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Play className="mr-2 h-6 w-6" />
              Start Timeline
            </Button>
          </motion.div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid grid-cols-8 grid-rows-8 h-full w-full">
          {Array.from({ length: 64 }).map((_, i) => (
            <motion.div
              key={i}
              className="border border-purple-500/20"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0] }}
              transition={{ duration: 3, delay: i * 0.1, repeat: Infinity }}
            />
          ))}
        </div>
      </div>

      {/* Main timeline container */}
      <div className="relative z-10 h-screen flex">
        {/* Left side - 3D Scene */}
        <div className="w-1/2 h-full relative">
          <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-10, -10, -5]} intensity={0.5} color="#8B5CF6" />
            
            <Float speed={2} rotationIntensity={0.1} floatIntensity={0.2}>
              <TimelineModel 
                year={timelineData[currentYear].year}
                modelType={timelineData[currentYear].modelType}
              />
            </Float>
            
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
          
          {/* Year overlay */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
            <motion.div
              key={currentYear}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-6xl font-bold text-white bg-black/20 backdrop-blur-sm rounded-lg px-6 py-3"
            >
              {timelineData[currentYear].year}
            </motion.div>
          </div>
        </div>

        {/* Right side - Timeline content */}
        <div className="w-1/2 h-full flex flex-col justify-center px-8">
          <AnimatePresence mode="wait">
            <YearCard3D
              key={currentYear}
              year={timelineData[currentYear].year}
              title={timelineData[currentYear].title}
              summary={timelineData[currentYear].summary}
              index={currentYear}
            />
          </AnimatePresence>

          {/* Progress indicator */}
          <motion.div 
            className="mt-8 w-full bg-gray-700 rounded-full h-2"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div 
              className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentYear + 1) / timelineData.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>

          {/* Navigation controls */}
          <div className="flex justify-between items-center mt-8">
            <Button
              onClick={handlePrev}
              disabled={currentYear === 0}
              variant="outline"
              size="lg"
              className="border-purple-500 text-purple-300 hover:bg-purple-500/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>

            <div className="flex items-center gap-4">
              <Button
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                variant={isAutoPlay ? "default" : "outline"}
                className={isAutoPlay ? "bg-purple-600" : "border-purple-500 text-purple-300"}
              >
                <Play className="h-4 w-4 mr-2" />
                {isAutoPlay ? "Pause" : "Auto Play"}
              </Button>
              
              <span className="text-gray-400 text-sm">
                {currentYear + 1} / {timelineData.length}
              </span>
            </div>

            <Button
              onClick={handleNext}
              disabled={currentYear === timelineData.length - 1}
              variant="outline"
              size="lg"
              className="border-purple-500 text-purple-300 hover:bg-purple-500/10"
            >
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Year indicators at bottom */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {timelineData.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentYear(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentYear 
                ? 'bg-purple-500 scale-125' 
                : 'bg-gray-600 hover:bg-gray-500'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        ))}
      </div>
    </div>
  );
};

export default Timeline;
