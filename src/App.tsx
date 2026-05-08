
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

import { Home } from './pages/Home';
import { Work } from './pages/Work';
import { Photography } from './pages/Photography';
import { Contact } from './pages/Contact';

import { About } from './pages/About';

function AnimatedRoutes() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/photography" element={<Photography />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </AnimatePresence>
  );
}

import { StickyOverlay } from './components/ui/StickyOverlay';
import { AudioPlayer } from './components/ui/AudioPlayer';


function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-background selection:bg-primary-red selection:text-white relative">
        <Navbar />
        <main className="flex-grow">
          <AnimatedRoutes />
        </main>
        <Footer />
        <StickyOverlay />
        <AudioPlayer />
      </div>
    </Router>
  );
}

export default App;
