import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ open, onClose }) => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    emailjs
      .send(
        "service_xpkf4ie", 
        "template_kfuwzi7", 
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        "pJwYNPJuwz3iTjoBE" 
      )
      .then(() => {
        setSuccess(true);
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => {
          setSuccess(false);
          onClose();
        }, 2000);
      })
      .catch((err: unknown) => {
        console.error(err);
        setError("Failed to send message. Please try again.");
      })
      .finally(() => setLoading(false));
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-center justify-center p-4"
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
            className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/10 to-cyan-900/10"
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
            className="relative max-w-xl w-full bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 border border-white/20 rounded-3xl p-8 shadow-2xl overflow-hidden"
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
                background: `conic-gradient(from 0deg, transparent, rgba(99,102,241,0.3), transparent, rgba(6,182,212,0.2), transparent)`,
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
              className="absolute inset-4 rounded-2xl bg-gradient-to-br from-indigo-500/5 via-cyan-500/5 to-transparent opacity-60"
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
              {/* Enhanced header */}
              <div className="flex items-start justify-between gap-4 mb-8">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <motion.h3 
                    className="text-2xl font-bold bg-gradient-to-r from-white via-indigo-200 to-cyan-200 bg-clip-text text-transparent"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    Let's Connect
                  </motion.h3>
                  <motion.div
                    className="w-16 h-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-full mt-2"
                    initial={{ width: 0 }}
                    animate={{ width: 64 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                  />
                  <p className="text-gray-400 text-sm mt-2">Send me a message and I'll get back to you</p>
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

              {/* Success/Error Messages */}
              <AnimatePresence>
                {success && (
                  <motion.div
                    className="mb-6 p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/20"
                    initial={{ opacity: 0, y: -20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center gap-3">
                      <motion.div
                        className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <svg width="12" height="12" fill="white" viewBox="0 0 24 24">
                          <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                        </svg>
                      </motion.div>
                      <span className="text-green-400 font-medium">Message sent successfully!</span>
                    </div>
                  </motion.div>
                )}

                {error && (
                  <motion.div
                    className="mb-6 p-4 rounded-xl bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/20"
                    initial={{ opacity: 0, y: -20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                        <svg width="12" height="12" fill="white" viewBox="0 0 24 24">
                          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                      </div>
                      <span className="text-red-400 font-medium">{error}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Enhanced form */}
              <motion.form
                onSubmit={handleSubmit}
                className="space-y-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                {/* Name field */}
                <motion.div
                  className="relative group"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.label 
                    className="absolute -top-2 left-3 bg-gray-800 px-2 text-xs text-indigo-300 font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    Your Name
                  </motion.label>
                  <motion.input
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-indigo-400/50 focus:bg-white/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    required
                    whileFocus={{ scale: 1.02 }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/20 via-transparent to-cyan-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"
                  />
                </motion.div>

                {/* Email field */}
                <motion.div
                  className="relative group"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <motion.label 
                    className="absolute -top-2 left-3 bg-gray-800 px-2 text-xs text-indigo-300 font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    Email Address
                  </motion.label>
                  <motion.input
                    type="email"
                    name="email"
                    placeholder="your.email@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-indigo-400/50 focus:bg-white/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                    required
                    whileFocus={{ scale: 1.02 }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/20 via-transparent to-cyan-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"
                  />
                </motion.div>

                {/* Message field */}
                <motion.div
                  className="relative group"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.label 
                    className="absolute -top-2 left-3 bg-gray-800 px-2 text-xs text-indigo-300 font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                  >
                    Your Message
                  </motion.label>
                  <motion.textarea
                    name="message"
                    placeholder="Tell me about your project, ideas, or just say hello..."
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:border-indigo-400/50 focus:bg-white/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none"
                    required
                    whileFocus={{ scale: 1.02 }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/20 via-transparent to-cyan-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"
                  />
                </motion.div>

                {/* Enhanced submit button */}
                <motion.button
                  type="submit"
                  disabled={loading || success}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-600 hover:from-indigo-500 hover:via-purple-500 hover:to-cyan-500 disabled:from-gray-600 disabled:via-gray-600 disabled:to-gray-600 text-white font-semibold shadow-lg shadow-indigo-600/25 transition-all duration-300 group relative overflow-hidden"
                  whileHover={{ 
                    scale: loading || success ? 1 : 1.02,
                    boxShadow: loading || success ? undefined : "0 8px 30px rgba(99,102,241,0.4)"
                  }}
                  whileTap={{ scale: loading || success ? 1 : 0.98 }}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{
                      x: loading ? ["-100%", "100%"] : ["100%", "100%"],
                    }}
                    transition={{
                      duration: loading ? 1.5 : 0,
                      repeat: loading ? Infinity : 0,
                      ease: "easeInOut",
                    }}
                  />
                  
                  <div className="flex items-center justify-center gap-2 relative z-10">
                    <AnimatePresence mode="wait">
                      {loading ? (
                        <motion.div
                          key="loading"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-center gap-2"
                        >
                          <motion.div
                            className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          <span>Sending...</span>
                        </motion.div>
                      ) : success ? (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-center gap-2"
                        >
                          <motion.svg
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/>
                          </motion.svg>
                          <span>Sent Successfully!</span>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="send"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="flex items-center gap-2"
                        >
                          <motion.svg
                            width="16"
                            height="16"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                            whileHover={{ x: 2 }}
                          >
                            <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" strokeLinecap="round" strokeLinejoin="round"/>
                          </motion.svg>
                          <span>Send Message</span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.button>
              </motion.form>

              {/* Contact info footer */}
              <motion.div
                className="mt-8 pt-6 border-t border-white/10 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
              >
                <p className="text-gray-400 text-sm">
                  Or reach out directly at{" "}
                  <motion.a
                    href="mailto:khushimaheshwari35official@gmail.com"
                    className="text-indigo-400 hover:text-indigo-300 transition-colors"
                    whileHover={{ scale: 1.05 }}
                  >
                    khushimaheshwari35official@gmail.com
                  </motion.a>
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;