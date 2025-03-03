import React from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="paradise-background">
      {/* New Y2K Style Navigation Bar */}
      <div className="y2k-navbar">
        <div className="y2k-navbar-logo">
          <span>✨ PICAPICA</span>
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
          <div className="y2k-subtitle">✨ CAPTURE YOUR MOMENTS ✨</div>
          <h1 className="y2k-title">
            WELCOME TO
            <div className="y2k-highlight">PICAPICA</div>
          </h1>
          
          {/* Sparkle effects */}
          <div className="sparkle sparkle1"></div>
          <div className="sparkle sparkle2"></div>
          <div className="sparkle sparkle3"></div>
          <div className="sparkle sparkle4"></div>
          <div className="sparkle sparkle5"></div>
        </div>

        <div className="paradise-content">
          <div className="paradise-card">
            <div className="card-title">✧ ABOUT ✧</div>
            <div className="card-content">
              Your personal photobooth at home! Take fun photos with filters and create beautiful photo strips.
            </div>
          </div>

          <div className="paradise-card">
            <div className="card-title">✧ FEATURES ✧</div>
            <div className="card-content">
              <ul className="feature-list">
                <li>✨ Multiple photo layouts</li>
                <li>✨ Fun photo filters</li>
                <li>✨ Customizable frames</li>
                <li>✨ Email sharing</li>
              </ul>
            </div>
          </div>

          <div className="paradise-card">
            <div className="card-title">✧ HOW IT WORKS ✧</div>
            <div className="card-content">
              <div className="step">1. Choose your layout</div>
              <div className="step">2. Take your photos</div>
              <div className="step">3. Customize your strip</div>
              <div className="step">4. Download or share!</div>
            </div>
          </div>
        </div>

        <button 
          onClick={() => navigate("/welcome")} 
          className="y2k-button"
        >
          ✧ START NOW ✧
        </button>

        <footer className="paradise-footer">
          made by{" "}
          <a
            href="https://agneswei.com" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            agneswei
          </a>
          <p>© 2025 Agnes Wei. All Rights Reserved.</p>
        </footer>

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

export default Home;