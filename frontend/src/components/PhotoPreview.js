import React, { useRef, useState, useEffect, useCallback } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import axios from "axios";

const frames = {
  none: {
    name: "No Frame",
    draw: () => Promise.resolve(), 
  },
  'grid-3-classic': {
    name: "Classic Frame",
    draw: async (ctx, canvasWidth, canvasHeight) => {
      return new Promise((resolve, reject) => {
        const frameImage = new Image();
        frameImage.crossOrigin = "anonymous";
        frameImage.src = "/img/angryframe.png";
        frameImage.onload = () => {
          try {
            ctx.drawImage(frameImage, 0, 0, canvasWidth, canvasHeight);
            resolve();
          } catch (error) {
            console.error("Error drawing frame:", error);
            reject(error);
          }
        };
        frameImage.onerror = (error) => reject(error);
      });
    }
  },
  'grid-3-floral': {
    name: "Floral Frame",
    draw: async (ctx, canvasWidth, canvasHeight) => {
      return new Promise((resolve, reject) => {
        const frameImage = new Image();
        frameImage.crossOrigin = "anonymous";
        frameImage.src = "/img/frames/grid-3/floral.png";
        frameImage.onload = () => {
          try {
            ctx.drawImage(frameImage, 0, 0, canvasWidth, canvasHeight);
            resolve();
          } catch (error) {
            console.error("Error drawing frame:", error);
            reject(error);
          }
        };
        frameImage.onerror = (error) => reject(error);
      });
    }
  },
  'grid-3-vintage': {
    name: "Vintage Frame",
    draw: async (ctx, canvasWidth, canvasHeight) => {
      return new Promise((resolve, reject) => {
        const frameImage = new Image();
        frameImage.crossOrigin = "anonymous";
        frameImage.src = "/img/frames/grid-3/vintage.png";
        frameImage.onload = () => {
          try {
            ctx.drawImage(frameImage, 0, 0, canvasWidth, canvasHeight);
            resolve();
          } catch (error) {
            console.error("Error drawing frame:", error);
            reject(error);
          }
        };
        frameImage.onerror = (error) => reject(error);
      });
    }
  },
  'grid-3-modern': {
    name: "Modern Frame",
    draw: async (ctx, canvasWidth, canvasHeight) => {
      return new Promise((resolve, reject) => {
        const frameImage = new Image();
        frameImage.crossOrigin = "anonymous";
        frameImage.src = "/img/frames/grid-3/modern.png";
        frameImage.onload = () => {
          try {
            ctx.drawImage(frameImage, 0, 0, canvasWidth, canvasHeight);
            resolve();
          } catch (error) {
            console.error("Error drawing frame:", error);
            reject(error);
          }
        };
        frameImage.onerror = (error) => reject(error);
      });
    }
  },
  'grid-3-cute': {
    name: "Cute Frame",
    draw: async (ctx, canvasWidth, canvasHeight) => {
      return new Promise((resolve, reject) => {
        const frameImage = new Image();
        frameImage.crossOrigin = "anonymous";
        frameImage.src = "/img/frames/grid-3/cute.png";
        frameImage.onload = () => {
          try {
            ctx.drawImage(frameImage, 0, 0, canvasWidth, canvasHeight);
            resolve();
          } catch (error) {
            console.error("Error drawing frame:", error);
            reject(error);
          }
        };
        frameImage.onerror = (error) => reject(error);
      });
    }
  },
  'grid-4-classic': {
    name: "Classic Frame",
    draw: async (ctx, canvasWidth, canvasHeight) => {
      return new Promise((resolve, reject) => {
        const frameImage = new Image();
        frameImage.crossOrigin = "anonymous";
        frameImage.src = "/img/frames/grid-4/classic.png";
        frameImage.onload = () => {
          try {
            ctx.drawImage(frameImage, 0, 0, canvasWidth, canvasHeight);
            resolve();
          } catch (error) {
            console.error("Error drawing frame:", error);
            reject(error);
          }
        };
        frameImage.onerror = (error) => reject(error);
      });
    }
  },
  'grid-4-floral': {
    name: "Floral Frame",
    draw: async (ctx, canvasWidth, canvasHeight) => {
      return new Promise((resolve, reject) => {
        const frameImage = new Image();
        frameImage.crossOrigin = "anonymous";
        frameImage.src = "/img/frames/grid-4/floral.png";
        frameImage.onload = () => {
          try {
            ctx.drawImage(frameImage, 0, 0, canvasWidth, canvasHeight);
            resolve();
          } catch (error) {
            console.error("Error drawing frame:", error);
            reject(error);
          }
        };
        frameImage.onerror = (error) => reject(error);
      });
    }
  },
  'grid-4-vintage': {
    name: "Vintage Frame",
    draw: async (ctx, canvasWidth, canvasHeight) => {
      return new Promise((resolve, reject) => {
        const frameImage = new Image();
        frameImage.crossOrigin = "anonymous";
        frameImage.src = "/img/frames/grid-4/vintage.png";
        frameImage.onload = () => {
          try {
            ctx.drawImage(frameImage, 0, 0, canvasWidth, canvasHeight);
            resolve();
          } catch (error) {
            console.error("Error drawing frame:", error);
            reject(error);
          }
        };
        frameImage.onerror = (error) => reject(error);
      });
    }
  },
  'grid-4-modern': {
    name: "Modern Frame",
    draw: async (ctx, canvasWidth, canvasHeight) => {
      return new Promise((resolve, reject) => {
        const frameImage = new Image();
        frameImage.crossOrigin = "anonymous";
        frameImage.src = "/img/frames/grid-4/modern.png";
        frameImage.onload = () => {
          try {
            ctx.drawImage(frameImage, 0, 0, canvasWidth, canvasHeight);
            resolve();
          } catch (error) {
            console.error("Error drawing frame:", error);
            reject(error);
          }
        };
        frameImage.onerror = (error) => reject(error);
      });
    }
  },
  'grid-4-cute': {
    name: "Cute Frame",
    draw: async (ctx, canvasWidth, canvasHeight) => {
      return new Promise((resolve, reject) => {
        const frameImage = new Image();
        frameImage.crossOrigin = "anonymous";
        frameImage.src = "/img/frames/grid-4/cute.png";
        frameImage.onload = () => {
          try {
            ctx.drawImage(frameImage, 0, 0, canvasWidth, canvasHeight);
            resolve();
          } catch (error) {
            console.error("Error drawing frame:", error);
            reject(error);
          }
        };
        frameImage.onerror = (error) => reject(error);
      });
    }
  },
  '2x2-classic': {
    name: "Classic Frame",
    draw: async (ctx, canvasWidth, canvasHeight) => {
      return new Promise((resolve, reject) => {
        const frameImage = new Image();
        frameImage.crossOrigin = "anonymous";
        frameImage.src = "/img/frames/2x2/classic.png";
        frameImage.onload = () => {
          try {
            ctx.drawImage(frameImage, 0, 0, canvasWidth, canvasHeight);
            resolve();
          } catch (error) {
            console.error("Error drawing frame:", error);
            reject(error);
          }
        };
        frameImage.onerror = (error) => reject(error);
      });
    }
  },
  '2x2-floral': {
    name: "Floral Frame",
    draw: async (ctx, canvasWidth, canvasHeight) => {
      return new Promise((resolve, reject) => {
        const frameImage = new Image();
        frameImage.crossOrigin = "anonymous";
        frameImage.src = "/img/frames/2x2/floral.png";
        frameImage.onload = () => {
          try {
            ctx.drawImage(frameImage, 0, 0, canvasWidth, canvasHeight);
            resolve();
          } catch (error) {
            console.error("Error drawing frame:", error);
            reject(error);
          }
        };
        frameImage.onerror = (error) => reject(error);
      });
    }
  },
  '2x2-vintage': {
    name: "Vintage Frame",
    draw: async (ctx, canvasWidth, canvasHeight) => {
      return new Promise((resolve, reject) => {
        const frameImage = new Image();
        frameImage.crossOrigin = "anonymous";
        frameImage.src = "/img/frames/2x2/vintage.png";
        frameImage.onload = () => {
          try {
            ctx.drawImage(frameImage, 0, 0, canvasWidth, canvasHeight);
            resolve();
          } catch (error) {
            console.error("Error drawing frame:", error);
            reject(error);
          }
        };
        frameImage.onerror = (error) => reject(error);
      });
    }
  },
  '2x2-modern': {
    name: "Modern Frame",
    draw: async (ctx, canvasWidth, canvasHeight) => {
      return new Promise((resolve, reject) => {
        const frameImage = new Image();
        frameImage.crossOrigin = "anonymous";
        frameImage.src = "/img/frames/2x2/modern.png";
        frameImage.onload = () => {
          try {
            ctx.drawImage(frameImage, 0, 0, canvasWidth, canvasHeight);
            resolve();
          } catch (error) {
            console.error("Error drawing frame:", error);
            reject(error);
          }
        };
        frameImage.onerror = (error) => reject(error);
      });
    }
  },
  '2x2-cute': {
    name: "Cute Frame",
    draw: async (ctx, canvasWidth, canvasHeight) => {
      return new Promise((resolve, reject) => {
        const frameImage = new Image();
        frameImage.crossOrigin = "anonymous";
        frameImage.src = "/img/frames/2x2/cute.png";
        frameImage.onload = () => {
          try {
            ctx.drawImage(frameImage, 0, 0, canvasWidth, canvasHeight);
            resolve();
          } catch (error) {
            console.error("Error drawing frame:", error);
            reject(error);
          }
        };
        frameImage.onerror = (error) => reject(error);
      });
    }
  },
  '3x2-classic': {
    name: "Classic Frame",
    draw: async (ctx, canvasWidth, canvasHeight) => {
      return new Promise((resolve, reject) => {
        const frameImage = new Image();
        frameImage.crossOrigin = "anonymous";
        frameImage.src = "/img/frames/3x2/classic.png";
        frameImage.onload = () => {
          try {
            ctx.drawImage(frameImage, 0, 0, canvasWidth, canvasHeight);
            resolve();
          } catch (error) {
            console.error("Error drawing frame:", error);
            reject(error);
          }
        };
        frameImage.onerror = (error) => reject(error);
      });
    }
  },
  '3x2-floral': {
    name: "Floral Frame",
    draw: async (ctx, canvasWidth, canvasHeight) => {
      return new Promise((resolve, reject) => {
        const frameImage = new Image();
        frameImage.crossOrigin = "anonymous";
        frameImage.src = "/img/frames/3x2/floral.png";
        frameImage.onload = () => {
          try {
            ctx.drawImage(frameImage, 0, 0, canvasWidth, canvasHeight);
            resolve();
          } catch (error) {
            console.error("Error drawing frame:", error);
            reject(error);
          }
        };
        frameImage.onerror = (error) => reject(error);
      });
    }
  },
  '3x2-vintage': {
    name: "Vintage Frame",
    draw: async (ctx, canvasWidth, canvasHeight) => {
      return new Promise((resolve, reject) => {
        const frameImage = new Image();
        frameImage.crossOrigin = "anonymous";
        frameImage.src = "/img/frames/3x2/vintage.png";
        frameImage.onload = () => {
          try {
            ctx.drawImage(frameImage, 0, 0, canvasWidth, canvasHeight);
            resolve();
          } catch (error) {
            console.error("Error drawing frame:", error);
            reject(error);
          }
        };
        frameImage.onerror = (error) => reject(error);
      });
    }
  },
  '3x2-modern': {
    name: "Modern Frame",
    draw: async (ctx, canvasWidth, canvasHeight) => {
      return new Promise((resolve, reject) => {
        const frameImage = new Image();
        frameImage.crossOrigin = "anonymous";
        frameImage.src = "/img/frames/3x2/modern.png";
        frameImage.onload = () => {
          try {
            ctx.drawImage(frameImage, 0, 0, canvasWidth, canvasHeight);
            resolve();
          } catch (error) {
            console.error("Error drawing frame:", error);
            reject(error);
          }
        };
        frameImage.onerror = (error) => reject(error);
      });
    }
  },
  '3x2-cute': {
    name: "Cute Frame",
    draw: async (ctx, canvasWidth, canvasHeight) => {
      return new Promise((resolve, reject) => {
        const frameImage = new Image();
        frameImage.crossOrigin = "anonymous";
        frameImage.src = "/img/frames/3x2/cute.png";
        frameImage.onload = () => {
          try {
            ctx.drawImage(frameImage, 0, 0, canvasWidth, canvasHeight);
            resolve();
          } catch (error) {
            console.error("Error drawing frame:", error);
            reject(error);
          }
        };
        frameImage.onerror = (error) => reject(error);
      });
    }
  }
};

const layoutConfigs = {
  '2x2': {
    padding: 40,
    spacing: 30,
    imgWidth: 300,
    imgHeight: 400,
    getCanvasDimensions: function() {
      return {
        width: this.imgWidth * 2 + this.spacing + this.padding * 2,
        height: 50 + this.imgHeight * 2 + this.spacing + this.padding * 2 + 50
      };
    },
    getPhotoPosition: function(index) {
      return {
        x: this.padding + (index % 2) * (this.imgWidth + this.spacing),
        y: 50 + this.padding + Math.floor(index / 2) * (this.imgHeight + this.spacing)
      };
    }
  },
  '3x2': {
    padding: 40,
    spacing: 20,
    imgWidth: 350,
    imgHeight: 300,
    getCanvasDimensions: function() {
      return {
        width: this.imgWidth * 2 + this.spacing + this.padding * 2,
        height: 50 + this.imgHeight * 3 + this.spacing * 2 + this.padding * 2 + 50
      };
    },
    getPhotoPosition: function(index) {
      const column = index % 2;
      const row = Math.floor(index / 2);
      return {
        x: this.padding + column * (this.imgWidth + this.spacing),
        y: 50 + this.padding + row * (this.imgHeight + this.spacing)
      };
    }
  },
  '3-grid': {
    padding: 40,
    spacing: 20,
    imgWidth: 400,
    imgHeight: 300,
    getCanvasDimensions: function() {
      return {
        width: this.imgWidth + this.padding * 2,
        height: this.imgHeight * 3 + this.spacing * 2 + this.padding * 2 + 80
      };
    },
    getPhotoPosition: function(index) {
      return {
        x: this.padding,
        y: this.padding + index * (this.imgHeight + this.spacing)
      };
    }
  },
  '4-grid': {
    padding: 40,
    spacing: 5,
    imgWidth: 400,
    imgHeight: 300,
    getCanvasDimensions: function() {
      return {
        width: this.imgWidth + this.padding * 2,
        height: 20 + this.imgHeight * 4 + this.spacing * 3 + this.padding * 2 + 10
      };
    },
    getPhotoPosition: function(index) {
      return {
        x: this.padding,
        y: 20 + this.padding + index * (this.imgHeight + this.spacing)
      };
    }
  }
};

const getAvailableFrames = (layout, photoCount) => {
  const framePrefix = layout === 'grid' 
    ? `grid-${photoCount}`
    : layout;

  return Object.entries(frames)
    .filter(([key]) => key === 'none' || key.startsWith(framePrefix))
    .map(([key, value]) => ({
      id: key,
      name: value.name || 'No Frame'
    }));
};

const PhotoPreview = ({ capturedImages = [] }) => {
  const location = useLocation();
  const { photoCount = 4, layout = 'grid' } = location.state || {};
  const navigate = useNavigate();
  const stripCanvasRef = useRef(null);
  const [stripColor, setStripColor] = useState("white");
  const [selectedFrame, setSelectedFrame] = useState("none");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");

  const availableFrames = getAvailableFrames(layout, photoCount);

  const getLayoutConfig = () => {
    if (layout === '3x2') return layoutConfigs['3x2'];
    if (layout === '2x2') return layoutConfigs['2x2'];
    if (photoCount === 3) return layoutConfigs['3-grid'];
    return layoutConfigs['4-grid'];
  };

  const generatePhotoStrip = useCallback(async () => {
    const canvas = stripCanvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      console.error("Could not get canvas context");
      return;
    }

    const config = getLayoutConfig();
    const { width: canvasWidth, height: canvasHeight } = config.getCanvasDimensions();
    
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    ctx.fillStyle = stripColor;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Check if we have images to draw
    if (!capturedImages || capturedImages.length === 0) {
      console.warn("No captured images to display");
      return;
    }

    const loadImage = (image, index) => {
      return new Promise((resolve) => {
        if (!image) {
          console.warn(`Image at index ${index} is undefined`);
          resolve();
          return;
        }

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = image;
        
        img.onload = () => {
          const { x, y } = config.getPhotoPosition(index);
          
          const imageRatio = img.width / img.height;
          const targetRatio = config.imgWidth / config.imgHeight;

          let sourceWidth = img.width;
          let sourceHeight = img.height;
          let sourceX = 0;
          let sourceY = 0;

          if (imageRatio > targetRatio) {
            sourceWidth = sourceHeight * targetRatio;
            sourceX = (img.width - sourceWidth) / 2;
          } else {
            sourceHeight = sourceWidth / targetRatio;
            sourceY = (img.height - sourceHeight) / 2;
          }

          ctx.drawImage(
            img,
            sourceX, sourceY, sourceWidth, sourceHeight,
            x, y, config.imgWidth, config.imgHeight
          );
          
          resolve();
        };
        
        img.onerror = () => {
          console.error(`Failed to load image at index ${index}`);
          resolve();
        };
      });
    };

    try {
      // Only process the available images
      const imagesToProcess = capturedImages.slice(0, photoCount);
      await Promise.all(imagesToProcess.map((image, index) => loadImage(image, index)));

      if (selectedFrame !== 'none' && frames[selectedFrame]) {
        await frames[selectedFrame].draw(ctx, canvasWidth, canvasHeight);
      }

      const now = new Date();
      const timestamp = now.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
      }) + '  ' + 
      now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });

      ctx.fillStyle = "#000000";
      ctx.font = "16px Arial";
      ctx.textAlign = "center";
      ctx.fillText("Phototimesm  " + timestamp, canvasWidth / 2, canvasHeight - config.padding / 2);

      ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
      ctx.font = "12px Arial";
      ctx.textAlign = "right";
      ctx.fillText("© 2025 AW", canvasWidth - config.padding, canvasHeight - config.padding / 4);
    } catch (error) {
      console.error("Error generating photo strip:", error);
    }
  }, [capturedImages, stripColor, selectedFrame, photoCount, layout]);

  useEffect(() => {
    // Only generate the photo strip if we have enough images
    if (capturedImages && capturedImages.length > 0) {
      generatePhotoStrip();
    }
  }, [capturedImages, stripColor, selectedFrame, generatePhotoStrip]);

  const downloadPhotoStrip = () => {
    const canvas = stripCanvasRef.current;
    if (!canvas) return;

    // Create a new high-resolution canvas
    const hiResCanvas = document.createElement('canvas');
    const config = getLayoutConfig();
    const { width, height } = config.getCanvasDimensions();
    
    // Triple the dimensions for higher resolution
    hiResCanvas.width = width * 3;
    hiResCanvas.height = height * 3;
    
    const hiResCtx = hiResCanvas.getContext('2d');
    if (!hiResCtx) {
      console.error("Could not get high-res canvas context");
      return;
    }
    
    // Enable image smoothing for better quality
    hiResCtx.imageSmoothingEnabled = true;
    hiResCtx.imageSmoothingQuality = 'high';
    
    // Scale the context to triple size
    hiResCtx.scale(3, 3);
    
    // Draw background
    hiResCtx.fillStyle = stripColor;
    hiResCtx.fillRect(0, 0, width, height);

    // Check if we have images to draw
    if (!capturedImages || capturedImages.length === 0) {
      console.warn("No captured images to download");
      return;
    }

    const loadImage = (image, index) => {
      return new Promise((resolve) => {
        if (!image) {
          console.warn(`Image at index ${index} is undefined`);
          resolve();
          return;
        }

        const img = new Image();
        img.crossOrigin = "anonymous";
        img.src = image;
        
        img.onload = () => {
          const { x, y } = config.getPhotoPosition(index);
          
          const imageRatio = img.width / img.height;
          const targetRatio = config.imgWidth / config.imgHeight;

          let sourceWidth = img.width;
          let sourceHeight = img.height;
          let sourceX = 0;
          let sourceY = 0;

          if (imageRatio > targetRatio) {
            sourceWidth = sourceHeight * targetRatio;
            sourceX = (img.width - sourceWidth) / 2;
          } else {
            sourceHeight = sourceWidth / targetRatio;
            sourceY = (img.height - sourceHeight) / 2;
          }

          hiResCtx.drawImage(
            img,
            sourceX, sourceY, sourceWidth, sourceHeight,
            x, y, config.imgWidth, config.imgHeight
          );
          
          resolve();
        };
        
        img.onerror = () => {
          console.error(`Failed to load image at index ${index} for download`);
          resolve();
        };
      });
    };

    // Only process the available images
    const imagesToProcess = capturedImages.slice(0, photoCount);
    
    // Draw all images and frame
    Promise.all([
      ...imagesToProcess.map((image, index) => loadImage(image, index)),
      selectedFrame !== 'none' && frames[selectedFrame] 
        ? frames[selectedFrame].draw(hiResCtx, width, height) 
        : Promise.resolve()
    ]).then(() => {
      // Add timestamp and watermark with adjusted font sizes
      const now = new Date();
      const timestamp = now.toLocaleDateString('en-US', {
        month: '2-digit',
        day: '2-digit',
        year: 'numeric'
      }) + '  ' + 
      now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });

      hiResCtx.fillStyle = "#000000";
      hiResCtx.font = "16px Arial";
      hiResCtx.textAlign = "center";
      hiResCtx.fillText("Phototimesm  " + timestamp, width / 2, height - config.padding / 2);

      hiResCtx.fillStyle = "rgba(0, 0, 0, 0.5)";
      hiResCtx.font = "12px Arial";
      hiResCtx.textAlign = "right";
      hiResCtx.fillText("© 2025 AW", width - config.padding, height - config.padding / 4);

      // Create download link with high-quality PNG
      const link = document.createElement("a");
      link.download = "photostrip.png";
      link.href = hiResCanvas.toDataURL("image/png", 1.0);
      link.click();
    }).catch(error => {
      console.error("Error creating downloadable photo strip:", error);
    });
  };

  const sendPhotoStripToEmail = async () => {
    if (!email) {
      setStatus("Please enter a valid email address.");
      return;
    }
  
    try {
      setStatus("Sending email...");
  
      if (!stripCanvasRef.current) {
        setStatus("Error: Canvas not ready");
        return;
      }
  
      const imageData = stripCanvasRef.current.toDataURL("image/jpeg", 0.7);
      const backendURL = process.env.REACT_APP_BACKEND_URL;

      const response = await axios.post(`${backendURL}/send-photo-strip`, {
        recipientEmail: email,
        imageData: imageData
      }, {
        headers: {
          'Content-Type': 'application/json'
        },
        maxContentLength: Infinity,
        maxBodyLength: Infinity
      });
      
      if (response.data.message === "Photo strip sent successfully!") {
        setStatus("Photo Strip sent successfully!");
        setEmail("");
      } else {
        setStatus("Failed to send Photo Strip.");
      }
    } catch (error) {
      console.error("Error details:", error.response || error);
      setStatus(`Error: ${error.response?.data?.message || error.message}`);
    }
  };

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
          <div className="y2k-subtitle">✨ CUSTOMIZE YOUR STRIP ✨</div>
          <h1 className="y2k-title">
            PHOTO
            <div className="y2k-highlight">PREVIEW</div>
          </h1>
          
          <div className="sparkle sparkle1"></div>
          <div className="sparkle sparkle2"></div>
          <div className="sparkle sparkle3"></div>
          <div className="sparkle sparkle4"></div>
          <div className="sparkle sparkle5"></div>
        </div>

        <canvas 
          ref={stripCanvasRef} 
          className="photo-strip" 
          data-layout={layout} 
          data-count={photoCount}
          style={{ 
            boxShadow: "0 8px 0 #2a5caa, 0 10px 20px rgba(0, 0, 0, 0.2)",
            borderRadius: "15px",
            border: "3px solid #ff6ec7",
            margin: "30px auto"
          }}
        />
        
        {/*<div className="paradise-card" style={{ maxWidth: "800px", margin: "20px auto", width: "100%" }}>
          <div className="card-title">✧ CUSTOMIZE YOUR STRIP ✧</div>
          <div className="card-content">
            {photoCount} Photos {layout === '2x2' ? '- 2x2 Grid' : layout === '3x2' ? '- 3x2 Grid' : '- Grid'}
          </div>
        </div>*/}

        <div className="control-section">
        <div className="paradise-card" style={{ maxWidth: "800px", margin: "20px auto", width: "100%" }}>
            <div className="card-title">✧ FRAME COLOR ✧</div>
            <div className="color-options">
              <button 
                onClick={() => setStripColor("white")} 
                className="count-button"
                style={stripColor === "white" ? {background: "linear-gradient(135deg, #ff6ec7, #7873f5)", color: "white"} : {}}
              >
                White
              </button>
              <button 
                onClick={() => setStripColor("black")} 
                className="count-button"
                style={stripColor === "black" ? {background: "linear-gradient(135deg, #ff6ec7, #7873f5)", color: "white"} : {}}
              >
                Black
              </button>
              <button 
                onClick={() => setStripColor("#f6d5da")} 
                className="count-button"
                style={stripColor === "#f6d5da" ? {background: "linear-gradient(135deg, #ff6ec7, #7873f5)", color: "white"} : {}}
              >
                Pink
              </button>
              <button 
                onClick={() => setStripColor("#dde6d5")} 
                className="count-button"
                style={stripColor === "#dde6d5" ? {background: "linear-gradient(135deg, #ff6ec7, #7873f5)", color: "white"} : {}}
              >
                Green
              </button>
              <button 
                onClick={() => setStripColor("#adc3e5")} 
                className="count-button"
                style={stripColor === "#adc3e5" ? {background: "linear-gradient(135deg, #ff6ec7, #7873f5)", color: "white"} : {}}
              >
                Blue
              </button>
              <button 
                onClick={() => setStripColor("#FFF2CC")} 
                className="count-button"
                style={stripColor === "#FFF2CC" ? {background: "linear-gradient(135deg, #ff6ec7, #7873f5)", color: "white"} : {}}
              >
                Yellow
              </button>
              <button 
                onClick={() => setStripColor("#dbcfff")} 
                className="count-button"
                style={stripColor === "#dbcfff" ? {background: "linear-gradient(135deg, #ff6ec7, #7873f5)", color: "white"} : {}}
              >
                Purple
              </button>
            </div>
          </div>

          <div className="paradise-card" style={{ maxWidth: "800px", margin: "20px auto", width: "100%" }}>
            <div className="card-title">✧ FRAME OPTIONS ✧</div>
            <div className="frame-options">
              {availableFrames.map(frame => (
                <button
                  key={frame.id}
                  onClick={() => setSelectedFrame(frame.id)}
                  className="count-button"
                  style={selectedFrame === frame.id ? {background: "linear-gradient(135deg, #ff6ec7, #7873f5)", color: "white"} : {}}
                >
                  {frame.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="control-section">
          <div className="action-buttons">
            <button onClick={downloadPhotoStrip} className="y2k-button">✧ Download Photo Strip ✧</button>
            <button onClick={() => navigate("/photobooth")} className="y2k-button" style={{background: "linear-gradient(135deg, #7873f5, #4db1ff)"}}>✧ Take New Photos ✧</button>
          </div>

          {/*<div className="paradise-card" style={{ maxWidth: "600px", margin: "20px auto" }}>
            <div className="card-title">✧ SHARE BY EMAIL ✧</div>
            <div className="email-section">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  fontFamily: "'Quicksand', sans-serif",
                  borderRadius: "25px",
                  border: "2px solid #ff6ec7",
                  padding: "12px 20px",
                  fontSize: "16px",
                  width: "100%",
                  marginBottom: "15px",
                  boxShadow: "3px 3px 0 #2a5caa"
                }}
              />
              <button 
                onClick={sendPhotoStripToEmail}
                className="count-button"
                style={{
                  background: "linear-gradient(135deg, #ff6ec7, #7873f5)",
                  color: "white",
                  fontWeight: "bold",
                  padding: "12px 25px"
                }}
              >
                ✧ Send to Email ✧
              </button>
              <p className="status-message" style={{fontFamily: "'Quicksand', sans-serif", color: "#ff6ec7"}}>{status}</p>
            </div>
          </div>*/}
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

export default PhotoPreview;