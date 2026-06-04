import { Link } from 'react-router-dom';
import { playClickSound } from '../../lib/sounds';

const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/about', label: 'About' },
  { path: '/work', label: 'Work' },
  { path: '/photography', label: 'Photography' },
  { path: '/contact', label: 'Contact' },
];

const SOCIAL_LINKS = [
  { label: 'YouTube', href: 'https://www.youtube.com/@HimymBeats/featured' },
  { label: 'Instagram', href: 'https://www.instagram.com/aksh.ae_' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/aksh-patel-cs/' },
];

export function Footer() {
  return (
    <footer className="w-full bg-[#070707] text-white border-t-4 border-black relative overflow-hidden">
      {/* Subtle top accent band */}
      <div className="h-1 bg-gradient-to-r from-primary-red via-primary-blue to-primary-yellow w-full" />

      {/* Top Section — Brand Stamp & Metadata */}
      <div className="border-b border-white/10 px-6 md:px-12 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Geometric Logo */}
        <div className="flex items-center gap-3">
          <div className="flex items-end gap-1">
            <div className="w-6 h-6 rounded-full bg-primary-red border-2 border-white" />
            <div className="w-6 h-6 bg-primary-blue border-2 border-white" />
            <svg viewBox="0 0 100 100" className="w-6 h-6">
              <polygon points="50,0 0,100 100,100" fill="#F0C020" stroke="white" strokeWidth="12" strokeLinejoin="miter" />
            </svg>
          </div>
          <span className="font-black text-2xl tracking-tighter uppercase ml-2 leading-none">
            Directore
          </span>
        </div>

        {/* Studio Specs */}
        <div className="flex flex-wrap gap-8 text-[10px] font-black uppercase tracking-[0.3em] text-white/30">
          <div>
            <span className="block text-[8px] text-white/10 mb-1">Focus</span>
            <span className="text-white/60">Cinematic / Post</span>
          </div>
          <div>
            <span className="block text-[8px] text-white/10 mb-1">Preset</span>
            <span className="text-white/60">4K DCI 23.976fps</span>
          </div>
          <div>
            <span className="block text-[8px] text-white/10 mb-1">Status</span>
            <span className="text-green-400">Online ●</span>
          </div>
        </div>
      </div>

      {/* Middle Section — Navigation, Networks, and Call-to-Action */}
      <div className="px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-3 gap-12 border-b border-white/10">

        {/* Column 1 — Sitemap */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-primary-yellow shrink-0">
              SPEC 01 // ARCHIVE
            </span>
            <div className="h-[1px] flex-grow bg-white/10" />
          </div>
          <ul className="space-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  onClick={playClickSound}
                  className="font-bold uppercase tracking-widest text-white/40 hover:text-white text-xs transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-3 h-[2px] bg-white/10 group-hover:bg-primary-yellow group-hover:w-5 transition-all duration-200" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 2 — Social Networks */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-primary-blue shrink-0">
              SPEC 02 // NETWORK
            </span>
            <div className="h-[1px] flex-grow bg-white/10" />
          </div>
          <ul className="space-y-3">
            {SOCIAL_LINKS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={playClickSound}
                  className="font-bold uppercase tracking-widest text-white/40 hover:text-white text-xs transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-3 h-[2px] bg-white/10 group-hover:bg-primary-blue group-hover:w-5 transition-all duration-200" />
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3 — Briefing Link */}
        <div className="flex flex-col justify-between gap-6 p-6 border border-white/10 bg-white/[0.01]">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[9px] font-black uppercase tracking-[0.4em] text-primary-red shrink-0">
                SPEC 03 // ENGAGE
              </span>
              <div className="h-[1px] flex-grow bg-white/10" />
            </div>
            <p className="text-white/50 text-xs font-bold leading-relaxed uppercase tracking-wider">
              Have a production requirement? Send a transmission and configure parameters.
            </p>
          </div>
          <Link
            to="/contact"
            onClick={playClickSound}
            className="inline-flex items-center gap-3 bg-white text-black font-black uppercase tracking-widest text-xs px-6 py-4 border-2 border-black shadow-[4px_4px_0px_0px_#D02020] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-150 w-fit"
          >
            Send Message
            <span className="text-sm font-black">→</span>
          </Link>
        </div>
      </div>

      {/* Bottom Section — Tech spec console */}
      <div className="px-6 md:px-12 py-6 flex flex-col md:flex-row items-center justify-between gap-4 text-white/30 text-[9px] font-black uppercase tracking-[0.25em]">
        <span>DIRECTORE © {new Date().getFullYear()} // ALL RIGHTS RESERVED</span>
        
        {/* Mini shapes */}
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-primary-red" />
          <div className="w-2.5 h-2.5 bg-primary-blue" />
          <svg viewBox="0 0 100 100" className="w-2.5 h-2.5">
            <polygon points="50,0 0,100 100,100" fill="#F0C020" />
          </svg>
        </div>
        
        <span>SYSTEM // OPERATIONAL // 4K PRODUCTION</span>
      </div>
    </footer>
  );
}
