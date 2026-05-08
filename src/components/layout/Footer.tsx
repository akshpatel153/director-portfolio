import { Link } from 'react-router-dom';

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
    <footer className="w-full bg-black text-white border-t-8 border-primary-red">

      {/* Top — Big Director stamp */}
      <div className="border-b-4 border-white/10 px-6 md:px-12 py-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
        {/* Logo mark */}
        <div className="flex items-end gap-2">
          <div className="w-7 h-7 rounded-full bg-primary-red border-2 border-white" />
          <div className="w-7 h-7 bg-primary-blue border-2 border-white" />
          <svg viewBox="0 0 100 100" className="w-7 h-7">
            <polygon points="50,0 0,100 100,100" fill="#FFD700" stroke="white" strokeWidth="12" strokeLinejoin="miter" />
          </svg>
          <span className="font-black text-3xl tracking-tighter uppercase ml-2 leading-none">
            The Director
          </span>
        </div>

        {/* Tagline */}
        <p className="text-white/40 font-bold uppercase tracking-widest text-xs max-w-xs text-left md:text-right">
          Every frame is intentional.<br />Every cut is calculated.
        </p>
      </div>

      {/* Middle — Nav + Social + CTA */}
      <div className="px-6 md:px-12 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 border-b-4 border-white/10">

        {/* Sitemap */}
        <div>
          <h4 className="font-black uppercase tracking-[0.3em] text-primary-yellow text-xs mb-6 border-l-4 border-primary-yellow pl-3">
            Navigate
          </h4>
          <ul className="space-y-3">
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                <Link
                  to={link.path}
                  className="font-bold uppercase tracking-widest text-white/50 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-4 h-[2px] bg-white/20 group-hover:bg-primary-red group-hover:w-6 transition-all duration-200" />
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Social */}
        <div>
          <h4 className="font-black uppercase tracking-[0.3em] text-primary-blue text-xs mb-6 border-l-4 border-primary-blue pl-3">
            Follow
          </h4>
          <ul className="space-y-3">
            {SOCIAL_LINKS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold uppercase tracking-widest text-white/50 hover:text-white text-sm transition-colors duration-200 flex items-center gap-2 group"
                >
                  <span className="w-4 h-[2px] bg-white/20 group-hover:bg-primary-blue group-hover:w-6 transition-all duration-200" />
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA Block */}
        <div className="flex flex-col justify-between gap-6">
          <div>
            <h4 className="font-black uppercase tracking-[0.3em] text-primary-red text-xs mb-4 border-l-4 border-primary-red pl-3">
              Work With Me
            </h4>
            <p className="text-white/40 text-sm font-medium leading-relaxed">
              Have a project in mind? Let's make something that hits hard.
            </p>
          </div>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 bg-primary-red text-white font-black uppercase tracking-widest text-sm px-6 py-4 border-2 border-white shadow-[4px_4px_0px_0px_white] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-150 w-fit"
          >
            Let's Talk
            <span className="text-lg leading-none">→</span>
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-6 md:px-12 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-white/30 text-[11px] font-bold uppercase tracking-[0.2em]">
        <span>© {new Date().getFullYear()} The Director. All rights reserved.</span>
        <div className="flex items-center gap-4">
          <div className="w-3 h-3 rounded-full bg-primary-red" />
          <div className="w-3 h-3 bg-primary-blue" />
          <svg viewBox="0 0 100 100" className="w-3 h-3">
            <polygon points="50,0 0,100 100,100" fill="#FFD700" />
          </svg>
        </div>
        <span>Built Frame by Frame</span>
      </div>

    </footer>
  );
}
