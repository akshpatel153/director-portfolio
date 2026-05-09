import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/Button';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { path: '/', label: 'Home', hoverColor: 'hover:text-primary-red', lineColor: 'bg-primary-red', mobileAccent: 'border-primary-red' },
  { path: '/work', label: 'Work', hoverColor: 'hover:text-primary-blue', lineColor: 'bg-primary-blue', mobileAccent: 'border-primary-blue' },
  { path: '/about', label: 'About', hoverColor: 'hover:text-white', lineColor: 'bg-white', mobileAccent: 'border-white' },
  { path: '/photography', label: 'Photography', hoverColor: 'hover:text-primary-yellow', lineColor: 'bg-primary-yellow', mobileAccent: 'border-primary-yellow' },
  { path: '/contact', label: 'Contact', hoverColor: 'hover:text-primary-red', lineColor: 'bg-primary-red', mobileAccent: 'border-primary-red' },
];

export function Navbar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);


  return (
    <>
      <nav className="w-full bg-background border-b-4 border-black py-4 px-6 md:px-12 flex justify-between items-center sticky top-0 z-50">
        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          {/* Geometric Logo */}
          <div className="flex items-end gap-1">
            <div className="w-6 h-6 rounded-full bg-primary-red border-2 border-black" />
            <div className="w-6 h-6 bg-primary-blue border-2 border-black" />
            <svg viewBox="0 0 100 100" className="w-6 h-6">
              <polygon points="50,0 0,100 100,100" className="fill-primary-yellow stroke-black" strokeWidth="12" strokeLinejoin="miter" />
            </svg>
          </div>
          <span className="font-black text-2xl tracking-tighter uppercase ml-2">Directore</span>
        </Link>

        {/* Desktop nav links */}
        <div className="hidden md:flex items-center gap-8 font-bold uppercase tracking-widest text-sm">
          {NAV_LINKS.filter(l => l.path !== '/contact').map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative py-2 transition-colors ${link.hoverColor}`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="navbar-underline"
                    className={`absolute bottom-0 left-0 w-full h-1 ${link.lineColor}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        <Link to="/contact" className="hidden md:block">
          <Button variant="primary">
            Hire Me
          </Button>
        </Link>

        {/* Mobile hamburger / close */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 border-2 border-black bg-white shadow-[2px_2px_0px_0px_black] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none relative"
        >
          <motion.div
            animate={isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -4 }}
            className="w-5 h-[2px] bg-black absolute"
          />
          <motion.div
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className="w-5 h-[2px] bg-black absolute"
          />
          <motion.div
            animate={isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 4 }}
            className="w-5 h-[2px] bg-black absolute"
          />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[72px] z-40 bg-black/80 backdrop-blur-md flex flex-col md:hidden"
          >
            <div className="flex flex-col py-8 px-6 gap-2 flex-grow">
              {NAV_LINKS.map((link, i) => {
                const isActive = location.pathname === link.path;
                return (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`block py-4 px-4 font-black text-3xl uppercase tracking-tighter text-white border-l-4 ${
                        isActive ? link.mobileAccent : 'border-transparent'
                      } hover:border-white transition-all`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom bar */}
            <div className="px-6 pb-8 flex items-center gap-2">
              <div className="w-4 h-4 rounded-full bg-primary-red" />
              <div className="w-4 h-4 bg-primary-blue" />
              <svg viewBox="0 0 100 100" className="w-4 h-4">
                <polygon points="50,0 0,100 100,100" fill="#F0C020" />
              </svg>
              <span className="text-white/30 font-bold uppercase tracking-[0.3em] text-[9px] ml-2">Directore</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
