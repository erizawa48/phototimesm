import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Welcome = () => {
  const navigate = useNavigate();
  const [photoOption, setPhotoOption] = useState({ count: 4, layout: 'grid' });

  const handleStart = () => {
    navigate("/photobooth", { state: photoOption });
  };

  return (
    <div className="paradise-background">
      {/* Y2K Style Navigation Bar */}
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
          <div className="y2k-subtitle">✨ CHOOSE YOUR STYLE ✨</div>
          <h1 className="y2k-title">
            LET'S GET
            <div className="y2k-highlight">STARTED!</div>
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
            <div className="card-title">✧ INSTRUCTIONS ✧</div>
            <div className="card-content">
              <p>You have <strong>3 seconds</strong> for each shot – no retakes!</p>
              <p>Choose your photo layout below:</p>
            </div>
          </div>
        </div>

        <div className="photo-count-selection">
          <button 
            className={`count-button ${photoOption.count === 3 && photoOption.layout === 'grid' ? 'selected' : ''}`}
            onClick={() => setPhotoOption({ count: 3, layout: 'grid' })}
          >
            ✧ 3 Photos Grid ✧
          </button>
          <button 
            className={`count-button ${photoOption.count === 4 && photoOption.layout === 'grid' ? 'selected' : ''}`}
            onClick={() => setPhotoOption({ count: 4, layout: 'grid' })}
          >
            ✧ 4 Photos Grid ✧
          </button>
          <button 
            className={`count-button ${photoOption.count === 4 && photoOption.layout === '2x2' ? 'selected' : ''}`}
            onClick={() => setPhotoOption({ count: 4, layout: '2x2' })}
          >
            ✧ 4 Photos (2x2) ✧
          </button>
          <button 
            className={`count-button ${photoOption.count === 6 && photoOption.layout === '3x2' ? 'selected' : ''}`}
            onClick={() => setPhotoOption({ count: 6, layout: '3x2' })}
          >
            ✧ 6 Photos (3x2) ✧
          </button>
        </div>

        <div className="paradise-card" style={{ maxWidth: "600px", margin: "20px auto" }}>
          <div className="card-content">
            After the session, download your digital copy and share the fun!
          </div>
        </div>

        <button onClick={handleStart} className="y2k-button">
          ✧ START PHOTOBOOTH ✧
        </button>

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

export default Welcome;