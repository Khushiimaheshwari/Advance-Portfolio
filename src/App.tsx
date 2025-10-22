import React, { useMemo, useState, Suspense, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Clock, Users, Shield, Search, MessageSquare, Link2, RefreshCcw, Bug } from "lucide-react";
import { TypeAnimation } from "react-type-animation";
import Tilt from "react-parallax-tilt";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Sphere, MeshDistortMaterial } from "@react-three/drei";
import "./index.css";
import './App.css'
import type { Project } from './components/types';
import Navbar from './components/navbar';
import PROFILE from './components/profile';
import SectionHeader from './components/sectionHeader';
import PROJECTS from './components/project';
import Badge from "./components/badge";
import EXPERIENCE, { type ExperienceType } from './components/experience';
import CERTS, { type CertType } from './components/cert';
import Modal from './components/model';
import ScrollToTop from './components/scrollToTop';
import ContactModal from "./components/ContactModal";

/* ------------------------------ 3D Elements ------------------------------- */
function HeroSphere(): React.JSX.Element {
  return (
    <>
      <Stars radius={80} depth={40} count={2500} factor={4} fade />
      <ambientLight intensity={0.7} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <Sphere args={[1.8, 64, 64]} position={[0, 0, 0]}>
        <MeshDistortMaterial
          distort={0.35}
          speed={1.2}
          color="#60A5FA"
          metalness={0.1}
          roughness={0.2}
          transparent
          opacity={0.9}
        />
      </Sphere>
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1.2} />
    </>
  );
}

// Technical Skills Data
const TECHNICAL_SKILLS = [
  { name: "HTML", level: 95, color: "from-orange-500 to-red-500" },
  { name: "Tailwind CSS", level: 90, color: "from-sky-300 to-indigo-600" },
  { name: "Javascript", level: 88, color: "from-yellow-500 to-orange-500" },
  { name: "Typescript", level: 78, color: "from-stone-300 to-lime-400" },
  { name: "React.js", level: 92, color: "from-blue-500 to-cyan-500" },
  { name: "Next.js", level: 75, color: "from-gray-400 to-gray-700" },
  { name: "Node.js", level: 85, color: "from-green-400 to-emerald-600" },
  { name: "Express.js", level: 85, color: "from-purple-400 to-violet-200" },
  { name: "SQL", level: 90, color: "from-indigo-500 to-purple-500" },
  { name: "MongoDB", level: 88, color: "from-teal-300 to-emerald-600" },
  { name: "Flask", level: 75, color: "from-gray-400 to-gray-700" },
  { name: "AI", level: 70, color: "from-purple-500 to-pink-500" },
  { name: "Java", level: 92, color: "from-rose-300 to-pink-700" },
  { name: "Python", level: 87, color: "from-amber-50 to-amber-600" },
];

// Soft Skills Data - matching your image layout
const SOFT_SKILLS = [
  { 
    name: "Time Management", 
    icon: Clock,
    color: "from-green-400 to-emerald-500",
    iconColor: "text-green-400"
  },
  { 
    name: "Team Work", 
    icon: Users,
    color: "from-blue-400 to-indigo-500",
    iconColor: "text-blue-400"
  },
  { 
    name: "Leadership", 
    icon: Shield,
    color: "from-pink-400 to-rose-500",
    iconColor: "text-pink-400"
  },
  { 
    name: "Problem-Solving", 
    icon: Search,
    color: "from-indigo-400 to-purple-500",
    iconColor: "text-indigo-400"
  },
  { 
    name: "Communication", 
    icon: MessageSquare,
    color: "from-indigo-400 to-purple-500",
    iconColor: "text-indigo-400"
  },
  { 
    name: "Critical Thinking", 
    icon: Link2,
    color: "from-pink-400 to-rose-500",
    iconColor: "text-pink-400"
  },
  { 
    name: "Adaptability", 
    icon: RefreshCcw,
    color: "from-blue-400 to-indigo-500",
    iconColor: "text-blue-400"
  },
  { 
    name: "Debugging", 
    icon: Bug,
    color: "from-green-400 to-emerald-500",
    iconColor: "text-green-400"
  },
];


/* --------------------------------- App ---------------------------------- */
export default function App(): React.JSX.Element {
  const [modalProject, setModalProject] = useState<Project | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [openContactModal, setOpenContactModal] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const year = useMemo<number>(() => new Date().getFullYear(), []);
  
  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    let frame: number;

    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        setMousePosition({
          x: (e.clientX / window.innerWidth) * 2 - 1,
          y: (e.clientY / window.innerHeight) * 2 - 1,
        });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);


  return (
    <div className="bg-gray-950 text-gray-100 antialiased relative overflow-hidden">
      {/* Animated cursor follower */}
      <motion.div
        className="fixed top-0 left-0 w-6 h-6 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x * 100,
          y: mousePosition.y * 100,
        }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
      />
      
      {/* Floating geometric shapes */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-32 h-32 opacity-[0.03]"
            style={{
              left: `${10 + i * 15}%`,
              top: `${10 + (i % 3) * 30}%`,
            }}
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <div className={`w-full h-full ${i % 2 === 0 ? 'bg-gradient-to-r from-blue-500 to-purple-500' : 'bg-gradient-to-r from-cyan-400 to-indigo-500'} ${i % 3 === 0 ? 'rounded-full' : i % 3 === 1 ? 'rounded-lg rotate-45' : 'clip-path-triangle'}`} />
          </motion.div>
        ))}
      </div>

      <Navbar />

      {/* HERO */}
      <header id="hero" className="relative min-h-screen overflow-hidden">
        {/* Enhanced background with multiple layers */}
        <motion.div 
          className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900 via-slate-900 to-black"
          style={{ y: backgroundY }}
        />
        
        {/* Additional gradient overlays */}
        <div className="absolute inset-0 -z-19 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
        <div className="absolute inset-0 -z-18 bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-cyan-900/10 via-transparent to-transparent" />
        
        {/* Animated grid pattern */}
        <motion.div
          className="absolute inset-0 -z-17 opacity-[0.03]"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            backgroundImage: `url("data:image/svg+xml,%3csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3e%3cdefs%3e%3cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3e%3cpath d='m 60 0 l 0 60 l -60 0 z' fill='none' stroke='%23ffffff' stroke-width='1'/%3e%3c/pattern%3e%3c/defs%3e%3crect width='100%25' height='100%25' fill='url(%23grid)' /%3e%3c/svg%3e")`,
          }}
        />
        
        <div className="absolute inset-0 -z-10 opacity-60">
          <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
            <Suspense fallback={null}>
              <HeroSphere />
            </Suspense>
          </Canvas>
        </div>

        <div className="max-w-full h-screen px-16 grid lg:grid-cols-2 gap-10 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, type: "spring", stiffness: 100 }}
            className="text-center lg:text-left"
            style={{ y: textY }}
          >
            <motion.h1 
              className="text-4xl md:text-6xl font-extrabold leading-tight relative"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Glowing text effect */}
              <motion.span
                className="absolute inset-0 bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 blur-sm"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                Hi, I&apos;m {PROFILE.name}
              </motion.span>
              Hi, I&apos;m{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-400 via-indigo-400 to-purple-400 relative z-10">
                {PROFILE.name}
              </span>
            </motion.h1>
            
            <motion.div 
              className="mt-4 text-xl md:text-2xl text-indigo-200 relative"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}>
              <TypeAnimation
                sequence={PROFILE.roles}
                speed={45}
                repeat={Infinity}
                cursor={false} 
              />
              {/* Typing cursor glow effect */}
              <motion.span
                className="inline-block w-1 h-[1.1em] bg-gradient-to-b from-indigo-400 to-purple-400 ml-1 align-middle"
                animate={{
                  opacity: [0, 1, 0],
                  scaleY: [1, 1.2, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
            
            <motion.p 
              className="mt-12 text-gray-300 max-w-xl mx-auto lg:mx-0 relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <motion.span
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-lg"
                animate={{
                  x: ["-100%", "100%"],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              A detail-oriented developer with strategic vision, leading teams to
              build scalable web solutions and dynamic experiences. Curious,
              collaborative, and driven by continuous learning and practical
              industry insight.
            </motion.p>
            
            <div className="mt-8 flex flex-wrap items-center gap-4 justify-center lg:justify-start">
              <motion.a
                href="/KhushiMaheshwari_Resume.pdf"
                download
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0, duration: 0.5, type: "spring", stiffness: 200 }}
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0px 0px 30px rgba(59,130,246,0.8)",
                  y: -5,
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 mt-6 inline-block rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-semibold shadow-lg transition duration-300 relative overflow-hidden group"
              >
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
                <span className="relative z-10">Download Resume</span>
              </motion.a>
            </div>
          </motion.div>

          {/* Enhanced Quick stats with more animations */}
          <div className="hidden lg:block">
            <motion.div
              initial={{ opacity: 0, x: 50, rotateY: -15 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              transition={{ delay: 0, duration: 1, type: "spring", stiffness: 100 }}
              className=" grid sm:grid-cols-2 gap-4 perspective-1000 text-center">
              {[
                { k: "LeetCode Stats", v: "Solved 200+ problems", color: "from-cyan-500 to-blue-500" },
                { k: "Open Source", v: "15+ public GitHub repos", color: "from-purple-500 to-indigo-500" },
                { k: "Competitive Coding", v: "Global Rank: 586,081", color: "from-green-500 to-teal-500" },
                { k: "DSA Practice", v: "LeetCode, HackerRank, GFG", color: "from-orange-500 to-red-500" },
              ].map((s, i) => (
                <motion.div
                  key={s.k}
                  initial={{ opacity: 0, y: 20, rotateX: -10 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ delay: 0 + i * 0.1, duration: 0.8, type: "spring" }}
                  whileHover={{
                    rotateY: 5,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                  }}
                  className="rounded-2xl p-5 bg-white/5 border border-white/10 backdrop-blur relative overflow-hidden group"
                >
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${s.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />
                  <motion.div
                    className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                    animate={{
                      x: ["-100%", "100%"],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.5,
                    }}
                  />
                  <p className="text-sm text-gray-300 relative z-10">{s.k}</p>
                  <motion.p 
                    className="text-xl font-semibold mt-1 relative z-10"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {s.v}
                  </motion.p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </header>

      {/* ABOUT */}
      <section id="about" className="max-w-7xl mx-auto px-6 py-20 relative">
        {/* Section background effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-950/10 to-transparent rounded-3xl" />
        
        <SectionHeader kicker="About" title="Who I Am" center />
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
          className="max-w-3xl mx-auto text-center text-gray-300 relative z-10"
        >
          <motion.span
            className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/5 to-transparent rounded-lg"
            animate={{
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          I&apos;m a Developer with a detail-oriented approach and a strategic
          vision, experienced in leading teams and building dynamic web
          solutions through participation in hackathons and real-world projects.
          Committed to crafting scalable applications and continuously evolving
          as a developer through learning and innovation. I also bring hands-on
          internship experience enabling me to apply practical industry insight
          to fast-paced, collaborative environments.
        </motion.p>
      </section>

      {/* PROJECTS */}
      <section
        id="projects"
        className="bg-white/5 border-y border-white/10 py-20 relative overflow-hidden"
      >
        {/* Enhanced background patterns */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0%,transparent_70%)]" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeader kicker="Work" title="Selected Projects" center />
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {PROJECTS.map((p: Project, index: number) => (
              <Tilt
                key={p.title}
                tiltMaxAngleX={15}
                tiltMaxAngleY={15}
                glareEnable
                glareMaxOpacity={0.3}
                className="w-full"
              >
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{
                    y: -10,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  onClick={() => {
                    setModalProject(p);
                    setOpenModal(true);
                  }}
                  className="h-full cursor-pointer rounded-2xl p-6 bg-gray-900/70 border border-white/10 backdrop-blur hover:border-indigo-400/40 transition-all duration-500 relative overflow-hidden group"
                >
                  {/* Hover effect overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  
                  {/* Animated border */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl"
                    style={{
                      background: `conic-gradient(from ${index * 60}deg, transparent, rgba(99,102,241,0.3), transparent)`,
                      padding: '1px',
                      opacity: 0,
                    }}
                    whileHover={{ opacity: 1 }}
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  
                  <div className="relative z-10">
                    <motion.h3 
                      className="text-lg font-semibold"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}>
                      {p.title}
                    </motion.h3>
                    <p className="mt-2 text-sm text-gray-300 line-clamp-3">
                      {p.desc}
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {p.stack.map((s: string, i: number) => (
                        <motion.div
                          key={s}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: i * 0.05, type: "spring", stiffness: 200 }}>
                          <Badge>{s}</Badge>
                        </motion.div>
                      ))}
                    </div>
                    <motion.div 
                      className="mt-5 text-xs text-indigo-300 opacity-80"
                      animate={{
                        opacity: [0.6, 1, 0.6],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}>
                      Click to view details
                    </motion.div>
                  </div>
                </motion.div>
              </Tilt>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-20 relative overflow-hidden">
      {/* Background effects */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(99,102,241,0.06)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_50%,rgba(168,85,247,0.05)_0%,transparent_50%)]" />
        
        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(14)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-indigo-400 rounded-full opacity-30"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 4) * 20}%`,
              }}
              animate={{
                y: [-15, 15, -15],
                opacity: [0.2, 0.5, 0.2],
              }}
              transition={{
                duration: 3 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <SectionHeader kicker="Expertise" title="Skills & Abilities" center />

          {/* Technical Skills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <motion.h3 
              className="text-2xl font-semibold text-center mb-10 bg-gradient-to-r from-indigo-200 to-purple-200 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Technical Skills
            </motion.h3>
            
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {TECHNICAL_SKILLS.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.08,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    scale: 1.02,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  className="group"
                >
                  <div className="flex justify-between items-center mb-2">
                    <motion.span 
                      className="font-medium text-gray-200"
                      whileHover={{ scale: 1.05, color: "#a5f3fc" }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {skill.name}
                    </motion.span>
                    <motion.span 
                      className="text-sm text-indigo-300"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ delay: index * 0.08 + 0.3 }}
                    >
                      {skill.level}%
                    </motion.span>
                  </div>
                  
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden relative">
                    {/* Animated glow effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                      animate={{
                        x: ["-100%", "200%"],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.2,
                      }}
                    />
                    
                    <motion.div
                      className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 1.2, 
                        delay: index * 0.08 + 0.2,
                        ease: "easeOut"
                      }}
                    >
                      {/* Pulsing end dot */}
                      <motion.div
                        className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.7, 1, 0.7],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                          delay: index * 0.1,
                        }}
                      />
                    </motion.div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="h-[1px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent max-w-4xl mx-auto mb-16"
          />

          {/* Soft Skills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h3 
              className="text-2xl font-semibold text-center mb-10 bg-gradient-to-r from-indigo-200 to-purple-200 bg-clip-text text-transparent"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Soft Skills
            </motion.h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {SOFT_SKILLS.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, scale: 0.8, rotateY: -20 }}
                  whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.5, 
                    delay: index * 0.05,
                    type: "spring",
                    stiffness: 150
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -5,
                    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                    transition: { type: "spring", stiffness: 400 }
                  }}
                  className="rounded-xl p-5 bg-gray-900/60 border border-white/10 backdrop-blur relative overflow-hidden group cursor-pointer"
                >
                  {/* Hover gradient overlay */}
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                  />
                  
                  {/* Animated border on hover */}
                  <motion.div
                    className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100"
                    style={{
                      background: `conic-gradient(from ${index * 30}deg, transparent, rgba(99,102,241,0.3), transparent)`,
                      padding: '1px',
                    }}
                    animate={{
                      rotate: 360,
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />
                  
                  {/* Corner accent */}
                  <motion.div
                    className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-br ${skill.color} opacity-10 rounded-bl-full`}
                    whileHover={{ scale: 1.2 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                  
                  <div className="relative z-10 flex flex-col items-center text-center">
                    <motion.div
                      className="text-4xl mb-3"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                       <skill.icon className="w-10 h-10" />
                    </motion.div>
                    
                    <motion.h4 
                      className="font-medium text-gray-100"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {skill.name}
                    </motion.h4>
                    
                    {/* Animated underline */}
                    <motion.div
                      className={`mt-2 h-[2px] bg-gradient-to-r ${skill.color} rounded-full`}
                      initial={{ width: 0 }}
                      whileInView={{ width: "50%" }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 + 0.3, duration: 0.6 }}
                    />
                  </div>
                  
                  {/* Floating particle effect on hover */}
                  <motion.div
                    className={`absolute bottom-2 right-2 w-2 h-2 rounded-full ${skill.iconColor} opacity-0 group-hover:opacity-60`}
                    animate={{
                      y: [0, -20, 0],
                      opacity: [0, 0.6, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: index * 0.1,
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section
        id="experience"
        className="bg-white/5 border-y border-white/10 py-20 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(99,102,241,0.02)_25%,rgba(99,102,241,0.02)_50%,transparent_50%,transparent_75%,rgba(99,102,241,0.02)_75%)] bg-[length:40px_40px]" />
        
        <div className="max-w-5xl mx-auto px-6 relative z-10">
          <SectionHeader
            kicker="Journey"
            title="Internships & Experience"
            center
          />
          <div className="relative pl-6 md:pl-10">
            {/* Enhanced timeline line with glow effect */}
            <motion.div 
              className="absolute left-2 md:left-4 top-0 bottom-0 w-[2px] bg-gradient-to-b from-indigo-500 via-purple-500 to-indigo-500"
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              style={{ transformOrigin: "top" }}
            />
            <div className="absolute left-2 md:left-4 top-0 bottom-0 w-[2px] bg-indigo-500/30 blur-sm" />
            
            <div className="space-y-8">
              {EXPERIENCE.map((e: ExperienceType, idx: number) => (
                <motion.div
                  key={e.org + idx}
                  initial={{ opacity: 0, x: -50, scale: 0.9 }}
                  whileInView={{ opacity: 1, x: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ 
                    duration: 0.6,
                    delay: idx * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  whileHover={{ 
                    x: 5,
                    transition: { type: "spring", stiffness: 300 }
                  }}
                  className="relative group"
                >
                  {/* Enhanced timeline dot with pulse effect */}
                  <motion.div 
                    className="absolute -left-1 md:-left-[6px] top-1.5 h-3 w-3 rounded-full bg-indigo-500 border-2 border-gray-900 z-10"
                    whileHover={{ scale: 1.5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  />
                  <motion.div
                    className="absolute -left-1 md:-left-[6px] top-1.5 h-3 w-3 rounded-full bg-indigo-500/30"
                    animate={{
                      scale: [1, 1.8, 1],
                      opacity: [0.3, 0, 0.3],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeOut",
                      delay: idx * 0.3,
                    }}
                  />
                  
                  <motion.div 
                    className="rounded-2xl p-5 bg-gray-900/80 border border-white/10 backdrop-blur relative overflow-hidden group-hover:border-indigo-400/40 transition-all duration-500"
                    whileHover={{ 
                      boxShadow: "0 20px 40px rgba(99,102,241,0.1)",
                    }}
                  >
                    {/* Hover effect overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    />
                    
                    <div className="flex flex-wrap items-center justify-between gap-3 relative z-10">
                      <motion.h3 
                        className="font-semibold"
                        whileHover={{ scale: 1.02 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {e.role} ·{" "}
                        <span className="text-indigo-300">{e.org}</span>
                      </motion.h3>
                      <motion.span 
                        className="text-xs bg-white/10 px-2 py-1 rounded-full border border-white/10"
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.15)" }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        {e.period}
                      </motion.span>
                    </div>
                    <ul className="mt-3 list-disc ml-5 text-sm text-gray-300 space-y-1 relative z-10">
                      {e.bullets.map((b: string, i: number) => (
                        <motion.li 
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ 
                            delay: 0.1 + i * 0.05,
                            duration: 0.4,
                            type: "spring",
                            stiffness: 200
                          }}
                          whileHover={{ x: 5, color: "#c7d2fe" }}
                        >
                          {b}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section id="certs" className="max-w-7xl mx-auto px-6 py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-emerald-950/5 to-transparent rounded-3xl" />
        
        <SectionHeader kicker="Proof" title="Certifications" center />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto relative z-10">
          {CERTS.map((c: CertType, index: number) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 30, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.6,
                delay: index * 0.05,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{
                scale: 1.03,
                y: -5,
                boxShadow: "0 15px 30px rgba(0,0,0,0.2)",
                transition: { type: "spring", stiffness: 300 }
              }}
              className="rounded-2xl p-6 bg-white/5 border border-white/10 backdrop-blur relative overflow-hidden group"
            >
              {/* Certification badge glow effect */}
              <motion.div
                className="absolute top-4 right-4 w-3 h-3 rounded-full bg-emerald-400"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.2,
                }}
              />
              
              {/* Hover effect overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              
              {/* Animated border effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100"
                style={{
                  background: `conic-gradient(from ${index * 45}deg, transparent, rgba(52,211,153,0.2), transparent)`,
                  padding: '1px',
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
              
              <div className="relative z-10">
                <motion.h3 
                  className="font-semibold"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {c.name}
                </motion.h3>
                <motion.p 
                  className="text-sm text-indigo-300 mt-1"
                  whileHover={{ color: "#a5f3fc" }}
                  transition={{ duration: 0.2 }}
                >
                  {c.org}
                </motion.p>
                {c.year !== "—" && (
                  <motion.p 
                    className="text-xs text-gray-400 mt-2"
                    initial={{ opacity: 0.7 }}
                    whileHover={{ opacity: 1 }}
                  >
                    Year: {c.year}
                  </motion.p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        className="bg-white/5 border-y border-white/10 py-20 relative overflow-hidden"
      >
        {/* Enhanced background with animated elements */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(99,102,241,0.08)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(168,85,247,0.06)_0%,transparent_50%)]" />
        
        {/* Floating contact icons */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full opacity-20"
              style={{
                left: `${15 + i * 20}%`,
                top: `${20 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.2, 0.6, 0.2],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
        
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <SectionHeader kicker="Say hello" title="Let's Work Together" center />
          <motion.p 
            className="text-gray-300 max-w-2xl mx-auto relative"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent rounded-lg"
              animate={{
                x: ["-100%", "100%"],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            Have a role, project, or idea? I'd love to hear from you.
          </motion.p>
          
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <motion.button
              onClick={() => setOpenContactModal(true)}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, type: "spring", stiffness: 200 }}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(99,102,241,0.4)",
                y: -3,
              }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 rounded-xl px-5 py-3 bg-indigo-600 hover:bg-indigo-500 transition shadow-lg shadow-indigo-600/25">
              <motion.svg 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="currentColor"
                whileHover={{ rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}>
                <path d="M4 4h16v16H4z" />
                <path d="M22 6L12 13 2 6" />
              </motion.svg>
              <span>{PROFILE.email}</span>
            </motion.button>

            <motion.a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1, type: "spring", stiffness: 200 }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.15)",
                y: -3,
              }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 rounded-xl px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/10 transition-all duration-300 relative overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              <motion.svg 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="currentColor"
                whileHover={{ scale: 1.1, rotate: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <path d="M4 4h4v16H4zM9 9h4v11H9zM14 9h4v11h-4z" />
              </motion.svg>
              <span className="relative z-10">LinkedIn</span>
            </motion.a>
            
            <motion.a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2, type: "spring", stiffness: 200 }}
              whileHover={{
                scale: 1.05,
                backgroundColor: "rgba(255,255,255,0.15)",
                y: -3,
              }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 rounded-xl px-5 py-3 bg-white/10 hover:bg-white/20 border border-white/10 transition-all duration-300 relative overflow-hidden group"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-gray-500/10 via-transparent to-gray-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              />
              <motion.svg 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="currentColor"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <path d="M12,.5a12,12,0,0,0-3.79,23.4c.6.11.82-.26.82-.58s0-1,0-2c-3.34.73-4-1.61-4-1.61A3.13,3.13,0,0,0,3.64,18c-1.09-.75.08-.74.08-.74a2.46,2.46,0,0,1,1.79,1.2A2.5,2.5,0,0,0,9,19.5a2.49,2.49,0,0,1,.75-1.56c-2.66-.3-5.46-1.33-5.46-5.91A4.63,4.63,0,0,1,5,8.33a4.3,4.3,0,0,1,.12-3.17S6.64,4.94,9,6.59a12.09,12.09,0,0,1,6,0c2.33-1.65,3.84-1.43,3.84-1.43a4.3,4.3,0,0,1,.12,3.17,4.63,4.63,0,0,1,1.24,3.58c0,4.59-2.8,5.6-5.47,5.9A2.79,2.79,0,0,1,15,19.5c0,1.27,0,2.29,0,2.6s.22.69.82.57A12,12,0,0,0,12,.5Z" />
              </motion.svg>
              <span className="relative z-10">GitHub</span>
            </motion.a>
          </div>
        </div>
      </section>

      <motion.footer 
        className="text-center text-sm text-gray-400 py-8 relative"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-950/20 to-transparent"
          animate={{
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <span className="relative z-10">
          © {year} {PROFILE.name}. Built with React, Typescript, Tailwind, Framer Motion &
          Three.js.
        </span>
      </motion.footer>

      <AnimatePresence>
        {openModal && (
          <Modal
            open={openModal}
            onClose={() => setOpenModal(false)}
            project={modalProject ?? undefined}
          />
        )}

        {openContactModal && (
          <ContactModal open={openContactModal} onClose={() => setOpenContactModal(false)} />
        )}
      </AnimatePresence>
      <ScrollToTop />
    </div>
  );
}