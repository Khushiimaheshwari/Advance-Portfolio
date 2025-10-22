import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { LinkType } from "./types";
import PROFILE from "./profile";

function Navbar(): React.JSX.Element {
  const [open, setOpen] = useState<boolean>(false);

  const links: LinkType[] = [
    { 
      href: "#about", 
      label: "About",
      icon: (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
      )
    },
    { 
      href: "#projects", 
      label: "Projects",
      icon: (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M14,6V4H10V6H8A2,2 0 0,0 6,8V19A2,2 0 0,0 8,21H16A2,2 0 0,0 18,19V8A2,2 0 0,0 16,6H14M12,7A1,1 0 0,1 13,8A1,1 0 0,1 12,9A1,1 0 0,1 11,8A1,1 0 0,1 12,7Z"/>
        </svg>
      )
    },
    { 
      href: "#skills", 
      label: "Skills",
      icon: (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19,3H5C3.9,3 3,3.9 3,5V19C3,20.1 3.9,21 5,21H19C20.1,21 21,20.1 21,19V5C21,3.9 20.1,3 19,3M19,19H5V5H19V19M17,12H7V10.5H17V12M15,16H7V14.5H15V16M17,8H7V6.5H17V8Z"/>
        </svg>
      )
    },
    { 
      href: "#experience", 
      label: "Experience",
      icon: (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10,2H14A2,2 0 0,1 16,4V6H20A2,2 0 0,1 22,8V19A2,2 0 0,1 20,21H4C2.89,21 2,20.1 2,19V8C2,6.89 2.89,6 4,6H8V4C8,2.89 8.89,2 10,2M14,6V4H10V6H14Z"/>
        </svg>
      )
    },
    { 
      href: "#certs", 
      label: "Certifications",
      icon: (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2M21 9V7L15 4L9 7V9C9 14 12 17.5 15 18C18 17.5 21 14 21 9Z"/>
        </svg>
      )
    },
    { 
      href: "#contact", 
      label: "Contact",
      icon: (
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19,4H5A3,3 0 0,0 2,7V17A3,3 0 0,0 5,20H19A3,3 0 0,0 22,17V7A3,3 0 0,0 19,4M19,18H5A1,1 0 0,1 4,17V8.37L11.49,12.65A1,1 0 0,0 12.51,12.65L20,8.37V17A1,1 0 0,1 19,18M5,6H19A1,1 0 0,1 20,7V7.23L12,11.85L4,7.23V7A1,1 0 0,1 5,6Z"/>
        </svg>
      )
    },
  ];

  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 z-50 bg-gray-950/70 backdrop-blur-md border-b border-white/10"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
    >
      {/* Enhanced background glow */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-indigo-900/10 via-purple-900/10 to-indigo-900/10"
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <div className="max-w-7xl mx-auto py-4 flex items-center justify-between relative z-10">
        {/* Enhanced Logo */}
        <motion.a 
          href="#" 
          className="font-bold text-lg tracking-wide bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent relative"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}>
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-indigo-400/20 to-purple-400/20 rounded-lg blur-sm"
            animate={{
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}/>
          <span className="relative z-10 text-white">{PROFILE.name}</span>
        </motion.a>

        {/* Desktop Navigation with Icons and Hover Labels */}
        <div className="hidden md:flex items-center gap-2">
          {links.map((l, index) => (
            <motion.div
              key={l.href}
              className="relative group"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
            >
              <motion.a
                href={l.href}
                onClick={(e) => {
                  e.preventDefault();
                  const section = document.querySelector(l.href);
                  section?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center justify-center w-12 h-12 rounded-xl text-gray-300 hover:text-white transition-all duration-300 relative overflow-hidden group"
                whileHover={{ 
                  scale: 1.1,
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Background hover effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 via-purple-500/20 to-cyan-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                
                {/* Icon glow effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-indigo-400/10 to-purple-400/10 rounded-xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                
                {/* Icon */}
                <motion.div
                  className="relative z-10"
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.3 }}
                >
                  {l.icon}
                </motion.div>
              </motion.a>

              {/* Enhanced Hover Label */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 opacity-0 group-hover:opacity-90 pointer-events-none z-20 transition-all duration-300 group-hover:translate-y-0 translate-y-[-10px] group-hover:scale-100 scale-90">
                {/* Arrow pointing up */}
                <div className="absolute left-1/2 -translate-x-1/2 -top-1.5 w-3 h-3 bg-gradient-to-br from-purple-500 to-indigo-500 rotate-45 z-0" />
                
                {/* Label background with gradient */}
                <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 text-white text-xs font-medium rounded-lg px-3 py-2 z-10 relative shadow-lg shadow-indigo-500/25 whitespace-nowrap">
                  <span className="relative z-10">{l.label}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Mobile Menu Button */}
        <motion.button
          className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}>
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
          <motion.svg 
            width="24" 
            height="24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            viewBox="0 0 24 24"
            className="relative z-10"
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {open ? (
              <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" strokeLinejoin="round" />
            ) : (
              <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round" strokeLinejoin="round" />
            )}
          </motion.svg>
        </motion.button>
      </div>

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="md:hidden relative z-10"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}>
            <motion.div
              className="px-5 pb-4 bg-gray-900/80 backdrop-blur-md border-t border-white/50 shadow-[0_15px_20px_rgba(99,102,241,0.25)]"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              exit={{ y: -20 }}
            >
              <div className="space-y-1">
                {links.map((l, index) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    className="flex items-center gap-3 py-3 px-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/4 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-transparent transition-all duration-300 group"
                    onClick={(e) => {
                      e.preventDefault();
                      setOpen(false);
                      const section = document.querySelector(l.href);
                      section?.scrollIntoView({ behavior: "smooth" });
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 * index }}
                    whileHover={{ x: 5 }}
                  >
                    <motion.div
                      className="text-indigo-400 group-hover:text-indigo-300 transition-colors"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      {l.icon}
                    </motion.div>
                    <span className="font-medium">{l.label}</span>
                    
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Navbar;