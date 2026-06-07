import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Project } from "./types";
import Badge from "./badge";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  project?: Project;
}

const Modal: React.FC<ModalProps> = ({ open, onClose, project }) => {
  if (!open || !project) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          {/* Enhanced backdrop with blur and gradient */}
          <motion.div
            className="absolute inset-0 bg-black/70 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          
          {/* Animated gradient background */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/10 to-transparent"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="relative max-w-2xl w-full bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 border border-white/20 rounded-3xl p-8 shadow-2xl overflow-hidden"
            initial={{ scale: 0.8, y: 50, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.8, y: 50, opacity: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 25 
            }}
            onClick={(e) => e.stopPropagation()}
            style={{ willChange: 'transform' }}
          >
            {/* Animated border glow */}
            <motion.div
              className="absolute inset-0 rounded-3xl"
              style={{
                background: `conic-gradient(from 0deg, transparent, rgba(99,102,241,0.3), transparent, rgba(168,85,247,0.2), transparent)`,
                padding: '2px',
                opacity: 0.6,
              }}
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            {/* Inner glow effect */}
            <motion.div
              className="absolute inset-4 rounded-2xl bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-transparent opacity-60"
              animate={{
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            <div className="relative z-10">
              {/* Header with enhanced styling */}
              <div className="flex items-start justify-between gap-4 mb-6">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <motion.h3 
                    className="text-2xl font-bold bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {project.title}
                  </motion.h3>
                  <motion.div
                    className="w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mt-2"
                    initial={{ width: 0 }}
                    animate={{ width: 48 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  />
                </motion.div>
                
                {/* Enhanced close button */}
                <motion.button
                  onClick={onClose}
                  className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                  whileHover={{ 
                    scale: 1.1,
                    boxShadow: "0 0 20px rgba(255,255,255,0.1)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Close"
                  initial={{ rotate: -180, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.svg 
                    width="20" 
                    height="20" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    className="text-gray-400 group-hover:text-white transition-colors"
                    whileHover={{ rotate: 90 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
                  </motion.svg>
                </motion.button>
              </div>

              {/* Enhanced tech stack */}
              <motion.div
                className="mb-6"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <motion.h4 
                  className="text-sm font-medium text-indigo-300 mb-3 flex items-center gap-2"
                  initial={{ x: -10 }}
                  animate={{ x: 0 }}
                >
                  <motion.div
                    className="w-2 h-2 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400"
                    animate={{
                      scale: [1, 1.2, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  Tech Stack
                </motion.h4>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((s, index) => (
                    <motion.div
                      key={s}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ 
                        delay: 0.4 + index * 0.05,
                        type: "spring",
                        stiffness: 200 
                      }}
                      whileHover={{ 
                        scale: 1.05,
                        y: -2,
                        boxShadow: "0 4px 20px rgba(99,102,241,0.3)"
                      }}
                    >
                      <Badge>{s}</Badge>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Enhanced project details */}
              {project.details && project.details.length > 0 && (
                <motion.div
                  className="mb-6"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.h4 
                    className="text-sm font-medium text-purple-300 mb-3 flex items-center gap-2"
                    initial={{ x: -10 }}
                    animate={{ x: 0 }}
                  >
                    <motion.div
                      className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-400"
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5,
                      }}
                    />
                    Key Features
                  </motion.h4>
                  <div className="space-y-2">
                    {project.details.map((detail, i) => (
                      <motion.div
                        key={i}
                        className="flex items-start gap-3 group"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.5 + i * 0.05 }}
                        whileHover={{ x: 5 }}
                      >
                        <motion.div
                          className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-indigo-400 to-purple-400 mt-2 flex-shrink-0"
                          whileHover={{ scale: 1.3 }}
                        />
                        <p className="text-sm text-gray-300 group-hover:text-gray-200 transition-colors leading-relaxed">
                          {detail}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Enhanced action buttons */}
              {(project.links?.code || project.links?.demo) && (
                <motion.div
                  className="flex gap-4 pt-4"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  {project.links?.code && (
                    <motion.a
                      href={project.links.code}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-medium transition-all duration-300 group relative overflow-hidden"
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 8px 30px rgba(255,255,255,0.1)"
                      }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ x: -20 }}
                      animate={{ x: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                        animate={{
                          x: ["-100%", "100%"],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                      <motion.svg
                        width="18"
                        height="18"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        className="group-hover:text-indigo-300 transition-colors relative z-10"
                        whileHover={{ rotate: 5 }}
                      >
                        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.341-3.369-1.341-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"/>
                      </motion.svg>
                      <span className="relative z-10">View Code</span>
                    </motion.a>
                  )}
                  
                  {project.links?.demo && (
                    <motion.a
                      href={project.links.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:via-purple-500 hover:to-indigo-500 text-white font-medium shadow-lg shadow-indigo-600/25 transition-all duration-300 group relative overflow-hidden"
                      whileHover={{ 
                        scale: 1.02,
                        boxShadow: "0 8px 30px rgba(99,102,241,0.4)"
                      }}
                      whileTap={{ scale: 0.98 }}
                      initial={{ x: 20 }}
                      animate={{ x: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                        animate={{
                          x: ["-100%", "100%"],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: 1,
                        }}
                      />
                      <motion.svg
                        width="18"
                        height="18"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        className="relative z-10"
                        whileHover={{ scale: 1.1 }}
                      >
                        <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" strokeLinecap="round" strokeLinejoin="round"/>
                      </motion.svg>
                      <span className="relative z-10">Live Demo</span>
                    </motion.a>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};


export default Modal;
