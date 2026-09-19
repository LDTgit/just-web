import './App.css';
import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/layout/Header.js';
import Footer from './components/layout/Footer.js';
import HeroSection from './components/sections/HeroSection.js';
import Services from './components/sections/Services.js';
import TeamSection from './components/sections/TeamSection.js';
import MapSection from './components/sections/MapSection.js';
import PrivacyPolicy from './components/sections/PrivacyPolicy.js';
import CookieBanner from './components/sections/CookieBanner.js';
import CookiePolicy from './components/sections/CookiePolicy.js';

import ScrollToTop from './components/utils/ScrollToTop.js';

function HomePage() {
  return (
    <main className="main-content" id="home">
      <HeroSection />

      <section id='services'>
        <Services />
      </section>

      <div className="team-section" id="team">
        <TeamSection />
      </div>

      <section className="contact-section" id="contact">
        <div className="contact-container">
          <div className="contact-header">
          </div>
          <div className="contact-grid">
            <MapSection />
          </div>
        </div>
      </section>
    </main>
  );
}

function App() {
  return (
    <Router
          future ={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}>
      <ScrollToTop />
      <div className="app-layout">
        <Header />
        <Routes>
          <Route path="/" element={
            <HomePage />
          } />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/cookie-policy" element={<CookiePolicy />} />
        </Routes>
        <Footer />

        <CookieBanner />
      </div>
    </Router>
  );
}

export default App;
