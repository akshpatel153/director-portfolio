
import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="w-full bg-[#121212] text-white py-16 px-6 md:px-12 border-t-8 border-primary-red">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-6 rounded-full bg-primary-red border-2 border-white" />
            <div className="w-6 h-6 bg-primary-blue border-2 border-white" />
            <svg viewBox="0 0 100 100" className="w-6 h-6">
              <polygon points="50,0 0,100 100,100" className="fill-primary-yellow stroke-white" strokeWidth="12" strokeLinejoin="miter" />
            </svg>
            <span className="font-black text-2xl tracking-tighter uppercase ml-2">Construct</span>
          </div>
          <p className="text-gray-400 font-medium max-w-sm">
            Form follows function. We build brutalist, constructivist web experiences that make a bold statement.
          </p>
        </div>
        
        <div>
          <h4 className="font-bold uppercase tracking-widest text-primary-yellow mb-4">Sitemap</h4>
          <ul className="space-y-2 text-gray-400 font-medium">
            <li><Link to="/" className="hover:text-white transition-colors">Home</Link></li>
            <li><Link to="/about" className="hover:text-white transition-colors">About</Link></li>
            <li><Link to="/work" className="hover:text-white transition-colors">Work</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 className="font-bold uppercase tracking-widest text-primary-blue mb-4">Social</h4>
          <ul className="space-y-2 text-gray-400 font-medium">
            <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Dribbble</a></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm font-bold uppercase tracking-wider">
        © {new Date().getFullYear()} Construct Design System. All rights reserved.
      </div>
    </footer>
  );
}
