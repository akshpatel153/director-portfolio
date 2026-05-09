
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

import { Home } from './pages/Home';
import { Work } from './pages/Work';
import { Photography } from './pages/Photography';
import { Contact } from './pages/Contact';

import { About } from './pages/About';

import { StickyOverlay } from './components/ui/StickyOverlay';
import { AudioPlayer } from './components/ui/AudioPlayer';
import { Preloader } from './components/ui/Preloader';
import { ScrollToTop } from './components/ui/ScrollToTop';
import { CustomCursor } from './components/ui/CustomCursor';
import { GlitchTransition } from './components/ui/GlitchTransition';

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

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Router>
      <ScrollToTop />
      <CustomCursor />
      <GlitchTransition />
      {/* Preloader overlay */}
      <AnimatePresence>
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

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
