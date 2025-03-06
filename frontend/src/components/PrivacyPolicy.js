import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="paradise-background">
      {/* Y2K Style Navigation Bar */}
      <div className="y2k-navbar">
        <div className="y2k-navbar-logo">
          <span>✨ PHOTOTIMESM</span>
        </div>
        <div className="y2k-navbar-links">
          <Link to="/">Home</Link>
          <Link to="/welcome">Booth</Link>
          <Link to="/privacy-policy">Privacy</Link>
          <Link to="/contact" className="y2k-navbar-contact">Contact</Link>
        </div>
      </div>

      <div className="paradise-container">
        <div className="paradise-header">
          <div className="y2k-subtitle">✨ YOUR DATA MATTERS ✨</div>
          <h1 className="y2k-title">
            PRIVACY
            <div className="y2k-highlight">POLICY</div>
          </h1>
          
          {/* Sparkle effects */}
          <div className="sparkle sparkle1"></div>
          <div className="sparkle sparkle2"></div>
          <div className="sparkle sparkle3"></div>
          <div className="sparkle sparkle4"></div>
          <div className="sparkle sparkle5"></div>
        </div>

        <div className="paradise-card" style={{ maxWidth: "800px", margin: "20px auto" }}>
          <div className="card-title">✧ OUR COMMITMENT ✧</div>
          <div className="card-content">
            <p>At Phototimesm, your privacy is a top priority. We do not track, collect, or store any personal data.
            All photos taken are processed locally on your device and are not uploaded or saved to any external server.</p>
            <p>We respect your privacy and are committed to protecting it. No cookies or trackers are used on this site.</p>
          </div>
        </div>

        <div className="floating-elements">
          <div className="floating-element heart1">❤️</div>
          <div className="floating-element star1">⭐</div>
          <div className="floating-element heart2">💖</div>
          <div className="floating-element star2">✨</div>
          <div className="floating-element cloud1">☁️</div>
          <div className="floating-element star3">⭐</div>
          <div className="floating-element heart3">💕</div>
          <div className="floating-element cloud2">☁️</div>
          <div className="floating-element ribbon1">🎀</div>
          <div className="floating-element ribbon2">🎀</div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;