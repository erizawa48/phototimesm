import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

const PhotoBooth = ({ setCapturedImages }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { count: photoCount = 4, layout = 'grid' } = location.state || {};
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImages, setImages] = useState([]);
  const [filter, setFilter] = useState("none");
  const [countdown, setCountdown] = useState(null);
  const [capturing, setCapturing] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [selectedOverlay, setSelectedOverlay] = useState(null);
  const [showOverlays, setShowOverlays] = useState(true);
  
  useEffect(() => {
    let mounted = true;
    
    const initCamera = async () => {
      try {
        if (!videoRef.current) return;
        
        if (videoRef.current.srcObject) {
          setCameraReady(true);
          return;
        }

        const constraints = {
          video: {
            facingMode: "user",
            width: { ideal: 1920 },
            height: { ideal: 1080 },
            frameRate: { ideal: 30 }
          }
        };

        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        
        if (!mounted) {
          stream.getTracks().forEach(track => track.stop());
          return;
        }

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.style.transform = "scaleX(-1)";
          videoRef.current.style.objectFit = "cover";
          
          await new Promise((resolve) => {
            videoRef.current.onloadedmetadata = () => {
              resolve();
            };
          });

          if (mounted && videoRef.current) {
            await videoRef.current.play();
            setCameraReady(true);
          }
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
        if (mounted) {
          setCameraReady(false);
        }
      }
    };

    initCamera();

    return () => {
      mounted = false;
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop());
      }
    };
  }, []);
  
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && !videoRef.current?.srcObject) {
        startCamera();
      }
    };
  document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);
  
  const startCamera = async () => {
    try {
      if (videoRef.current?.srcObject) return;
  
      const constraints = {
        video: {
          facingMode: "user",
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          frameRate: { ideal: 30 }
        }
      };
  
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.style.transform = "scaleX(-1)";
        videoRef.current.style.objectFit = "cover";
        
        await new Promise((resolve) => {
          videoRef.current.onloadedmetadata = resolve;
        });
        
        await videoRef.current.play();
        setCameraReady(true);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      setCameraReady(false);
    }
  };
  
  const startCountdown = () => {
    if (capturing || !cameraReady) return;
    setCapturing(true);
  
    let photosTaken = 0;
    const newCapturedImages = [];
  
    const captureSequence = async () => {
      if (photosTaken >= photoCount) {
        setCountdown(null);
        setCapturing(false);
  
        try {
          setCapturedImages([...newCapturedImages]);
          setImages([...newCapturedImages]);
  
          setTimeout(() => {
            navigate("/preview", { 
              state: { photoCount, layout }
            });
          }, 200);
        } catch (error) {
          console.error("Error navigating to preview:", error);
        }
        return;
      }
  
      let timeLeft = 3;
      setCountdown(timeLeft);
  
      const timer = setInterval(() => {
        timeLeft -= 1;
        setCountdown(timeLeft);
  
        if (timeLeft === 0) {
          clearInterval(timer);
          const imageUrl = capturePhoto();
          if (imageUrl) {
            newCapturedImages.push(imageUrl);
            setImages((prevImages) => [...prevImages, imageUrl]);
          }
          photosTaken += 1;
          setTimeout(captureSequence, 1000);
        }
      }, 1000);
    };
  
    captureSequence();
  };
  // Update the camera container and video/overlay structure
<div className="camera-container" style={{ position: 'relative', width: '100%', height: '100%' }}>
  <video 
    ref={videoRef} 
    autoPlay 
    playsInline 
    muted
    className="video-feed" 
    style={{ 
      filter,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      borderRadius: "20px",
      boxShadow: "0 8px 0 #2a5caa, 0 10px 20px rgba(0, 0, 0, 0.2)"
    }} 
  />
  {showOverlays && selectedOverlay && (
    <img
      src={selectedOverlay}
      alt="Idol Overlay"
      style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '300px', // Half of container width
        height: '450px',
        pointerEvents: 'none',
        objectFit: 'contain'
      }}
    />
  )}
  <canvas ref={canvasRef} className="hidden" />
</div>

// Update the capturePhoto function
const capturePhoto = () => {
  const video = videoRef.current;
  const canvas = canvasRef.current;

  if (video && canvas) {
    const context = canvas.getContext("2d");
    
    // Match camera container dimensions
    canvas.width = 600;
    canvas.height = 450;

    // Draw video
    context.save();
    context.filter = filter !== 'none' ? filter : 'none';
    context.translate(canvas.width, 0);
    context.scale(-1, 1);
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    context.restore();

    // Draw overlay
    if (showOverlays && selectedOverlay) {
      const overlayImg = new Image();
      overlayImg.src = selectedOverlay;
      
      context.drawImage(
        overlayImg,
        0, // Start from middle (600/2)
        0,   // Top
        600, // Half width
        450  // Full height
      );
    }

    return canvas.toDataURL("image/png");
  }
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
          <div className="y2k-subtitle">✨ STRIKE A POSE ✨</div>
          {/*<h1 className="y2k-title">
            PHOTO
            <div className="y2k-highlight">BOOTH</div>
          </h1>*/}
          
          {/* Sparkle effects
          <div className="sparkle sparkle1"></div>
          <div className="sparkle sparkle2"></div>
          <div className="sparkle sparkle3"></div>
          <div className="sparkle sparkle4"></div>
          <div className="sparkle sparkle5"></div>*/}
        </div>
  
        {/*{countdown !== null && <h2 className="countdown animate">{countdown}</h2>}*/}
        
        
        <div className="photo-container">
          <div className="camera-container">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted
              className="video-feed" 
              style={{ filter, borderRadius: "20px", boxShadow: "0 8px 0 #2a5caa, 0 10px 20px rgba(0, 0, 0, 0.2)" }} 
            />
            {showOverlays && selectedOverlay && (
              <img
                src={selectedOverlay}
                alt="Idol Overlay"
                style={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  height: '100%',
                  pointerEvents: 'none',
                  objectFit: 'contain'
                }}
              />
            )}
            <canvas ref={canvasRef} className="hidden" />
          </div>
  
          <div className="preview-side">
          {countdown !== null && <h2 className="countdown animate">{countdown}</h2>}
            {capturedImages.map((image, index) => (
              <img 
                key={index} 
                src={image} 
                alt={`Captured ${index + 1}`} 
                className="side-preview" 
                style={{ borderRadius: "10px", boxShadow: "3px 3px 0 #ff6ec7" }}
              />
            ))}
          </div>
        </div>
        
        {/* Add this overlay selection section before the filters section */}
        <div className="paradise-card" style={{ maxWidth: "800px", margin: "20px auto", width: "100%" }}>
            <div className="card-title">✧ CHOOSE AN IDOL ✧</div>
            <div className="card-content">
              <button 
                onClick={() => setShowOverlays(!showOverlays)} 
                className="count-button"
                style={{ marginBottom: "10px" }}
              >
                {showOverlays ? "Disable Overlays" : "Enable Overlays"}
              </button>
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fill, minmax(80px, 1fr))", 
                gap: "10px",
                marginTop: "10px" 
              }}>
                <img 
                  src="/overlays/idol1.png" 
                  alt="Idol 1"
                  onClick={() => setSelectedOverlay("/overlays/idol1.png")}
                  style={{ 
                    width: "80px", 
                    height: "80px", 
                    cursor: "pointer",
                    border: selectedOverlay === "/overlays/idol1.png" ? "3px solid #ff6ec7" : "none",
                    borderRadius: "10px"
                  }}
                />
                {/* Add more idol overlays as needed */}
              </div>
            </div>
          </div>
          
        <div className="paradise-card" style={{ maxWidth: "800px", margin: "20px auto", width: "100%" }}>
          <div className="card-title">✧ CHOOSE A FILTER ✧</div>
          <div className="card-content">
            Select a filter before starting capture!
          </div>
        </div>
        
        <div className="filters">
          <button 
            onClick={() => setFilter("none")} 
            disabled={capturing}
            className="count-button"
            style={filter === "none" ? {background: "linear-gradient(135deg, #ff6ec7, #7873f5)", color: "white"} : {}}
          >
            ✧ No Filter ✧
          </button>
          <button 
            onClick={() => setFilter("grayscale(100%)")} 
            disabled={capturing}
            className="count-button"
            style={filter === "grayscale(100%)" ? {background: "linear-gradient(135deg, #ff6ec7, #7873f5)", color: "white"} : {}}
          >
            ✧ Grayscale ✧
          </button>
          <button 
            onClick={() => setFilter("sepia(100%)")} 
            disabled={capturing}
            className="count-button"
            style={filter === "sepia(100%)" ? {background: "linear-gradient(135deg, #ff6ec7, #7873f5)", color: "white"} : {}}
          >
            ✧ Sepia ✧
          </button>
          <button 
            onClick={() => setFilter("grayscale(100%) contrast(120%) brightness(110%) sepia(30%) hue-rotate(10deg) blur(0.4px)")} 
            disabled={capturing}
            className="count-button"
            style={filter === "grayscale(100%) contrast(120%) brightness(110%) sepia(30%) hue-rotate(10deg) blur(0.4px)" ? {background: "linear-gradient(135deg, #ff6ec7, #7873f5)", color: "white"} : {}}
          >
            ✧ Vintage ✧
          </button>
          <button 
            onClick={() => setFilter("brightness(130%) contrast(105%) saturate(80%) blur(0.3px)")} 
            disabled={capturing}
            className="count-button"
            style={filter === "brightness(130%) contrast(105%) saturate(80%) blur(0.3px)" ? {background: "linear-gradient(135deg, #ff6ec7, #7873f5)", color: "white"} : {}}
          >
            ✧ Soft ✧
          </button>
        </div>
  
        <div className="controls">
          <button 
            onClick={startCountdown} 
            disabled={capturing || !cameraReady}
            className="y2k-button"
          >
            {!cameraReady ? "✧ Camera initializing... ✧" : capturing ? "✧ Capturing... ✧" : `✧ Start Capture (${photoCount} photos) ✧`}
          </button>
        </div>
  
        {/*<div className="floating-elements">
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
        </div>*/}
      </div>
    </div>
  );
};

export default PhotoBooth;