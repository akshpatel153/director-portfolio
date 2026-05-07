import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/Button';
import { motion } from 'framer-motion';

const NAV_LINKS = [
  { path: '/', label: 'Home', hoverColor: 'hover:text-primary-red', lineColor: 'bg-primary-red' },
  { path: '/work', label: 'Work', hoverColor: 'hover:text-primary-blue', lineColor: 'bg-primary-blue' },
  { path: '/about', label: 'About', hoverColor: 'hover:text-white', lineColor: 'bg-white' },
  { path: '/photography', label: 'Photography', hoverColor: 'hover:text-primary-yellow', lineColor: 'bg-primary-yellow' }
];

export function Navbar() {
  const location = useLocation();

  return (
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
        <span className="font-black text-2xl tracking-tighter uppercase ml-2">Construct</span>
      </Link>
      
      <div className="hidden md:flex items-center gap-8 font-bold uppercase tracking-widest text-sm">
        {NAV_LINKS.map((link) => {
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

      {/* Mobile Menu Button placeholder */}
      <button className="md:hidden flex flex-col gap-1.5 p-2 border-2 border-black bg-white shadow-[2px_2px_0px_0px_black] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none">
        <div className="w-6 h-1 bg-black" />
        <div className="w-6 h-1 bg-black" />
        <div className="w-6 h-1 bg-black" />
      </button>
    </nav>
  );
}
