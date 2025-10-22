import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ScrollToTop: React.FC = () => {
  const [show, setShow] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const maxHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrolled / maxHeight) * 100;
      
      setShow(scrolled > 600);
      setScrollProgress(progress);
    };
    
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed bottom-6 right-6 z-50 group"
          initial={{ scale: 0, opacity: 0, rotate: -180 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0, opacity: 0, rotate: 180 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
        >
          {/* Outer glow ring */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-cyan-500/30 blur-lg"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0.8, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Progress ring */}
          <svg
            className="absolute inset-0 w-full h-full -rotate-90"
            width="64"
            height="64"
            viewBox="0 0 64 64"
          >
            {/* Background circle */}
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="2"
            />
            {/* Progress circle */}
            <motion.circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="3"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 28}`}
              strokeDashoffset={`${2 * Math.PI * 28 * (1 - scrollProgress / 100)}`}
              transition={{ duration: 0.1 }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>

          <div className="relative group">
            {/* Main button */}
            <motion.button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="relative w-16 h-16 rounded-full bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-600 text-white shadow-xl overflow-hidden"
              whileHover={{
                scale: 1.1,
                boxShadow: "0 20px 40px rgba(99,102,241,0.4)"
              }}
              whileTap={{ scale: 0.95 }}
              aria-label="Scroll to top"
            >
              {/* Animated background shimmer */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  repeatDelay: 1,
                }}
              />

              {/* Inner glow effect */}
              <motion.div
                className="absolute inset-1 rounded-full bg-gradient-to-br from-indigo-400/30 to-purple-400/30 blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />

              {/* Icon container */}
              <div className="relative z-10 flex items-center justify-center w-full h-full">
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <svg 
                    width="24" 
                    height="24" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                    className="drop-shadow-sm"
                  >
                    <motion.path 
                      d="M12 4l-7 7h4v9h6v-9h4z"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  </svg>
                </motion.div>
              </div>
            </motion.button>

            {/* Hover tooltip */}
            <motion.div
              className="absolute -top-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300"
              initial={{ y: 10 }}
              animate={{ y: 0 }}>
              {/* Tooltip arrow */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-gray-800 rotate-45" />
              
              {/* Tooltip content */}
              <div className="bg-gray-800 text-white text-xs font-medium rounded-lg px-3 py-2 whitespace-nowrap shadow-lg">
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-lg"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <span className="relative z-10 flex items-center gap-2">
                  <motion.div
                    animate={{ y: [-1, -3, -1] }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}>
                    ↑
                  </motion.div>
                  Back to top
                </span>
              </div>
            </motion.div>
          </div>

          {/* Floating particles effect */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-60"
              style={{
                left: `${30 + i * 10}%`,
                top: `${20 + i * 15}%`,
              }}
              animate={{
                y: [-20, -40, -20],
                opacity: [0.6, 0, 0.6],
                scale: [1, 0.5, 1],
              }}
              transition={{
                duration: 2 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;