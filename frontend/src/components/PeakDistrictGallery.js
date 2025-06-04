import React, { useState } from 'react';

const PeakDistrictGallery = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const peakDistrictImages = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1596713751631-7732dfb95007",
      title: "Mam Tor Foggy Morning",
      description: "Foggy view from Mam Tor overlooking the beautiful Edale valley in the Peak District",
      location: "Mam Tor, Derbyshire"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1587713714775-fa70364f6445",
      title: "Great Ridge Path",
      description: "The Great Ridge path above Castleton showing the rolling hills and valleys",
      location: "Castleton, Derbyshire"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1594981005649-6ffab8d8a8d1",
      title: "Surprise View Sunset",
      description: "Beautiful sunset from the 'Surprise' view in the Peak District",
      location: "Peak District National Park"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1609674794350-c26bb1e6045d",
      title: "Bamford Edge",
      description: "Bamford Edge overlooking Ladybower Reservoir, a classic Peak District vista",
      location: "Bamford Edge, Derbyshire"
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1465652044861-81e32c824058",
      title: "Forest Hiking Trail",
      description: "Serene forest trail representing the hiking opportunities in the region",
      location: "Peak District Woodlands"
    },
    {
      id: 6,
      url: "https://images.unsplash.com/photo-1634818536775-ed845aea0ec3",
      title: "Kinder Scout Route",
      description: "A peak on the way to Kinder Scout with beautiful grassy fields",
      location: "Kinder Scout, Derbyshire"
    },
    {
      id: 7,
      url: "https://images.pexels.com/photos/12392554/pexels-photo-12392554.jpeg",
      title: "Kinder Scout Stone Formations",
      description: "Distinctive stone formations at Kinder Scout showcasing Peak District geology",
      location: "Kinder Scout, Derbyshire"
    },
    {
      id: 8,
      url: "https://images.unsplash.com/photo-1635188385721-39dffb5174e8",
      title: "Rocky Hillside",
      description: "Rocky hillside with grass and rocks, typical Peak District terrain",
      location: "Peak District Hills"
    },
    {
      id: 9,
      url: "https://images.pexels.com/photos/3635300/pexels-photo-3635300.jpeg",
      title: "Winding Road at Dusk",
      description: "Stunning winding road through Peak District hills at dusk",
      location: "Peak District Roads"
    }
  ];

  return (
    <div className="peak-district-gallery">
      <div className="gallery-header">
        <h2>🏔️ Natural Wonders of Peak District</h2>
        <p>Discover the breathtaking landscapes of your potential new home</p>
      </div>
      
      <div className="image-grid">
        {peakDistrictImages.map((image) => (
          <div 
            key={image.id} 
            className="gallery-item"
            onClick={() => setSelectedImage(image)}
          >
            <img 
              src={`${image.url}?w=300&h=200&fit=crop`} 
              alt={image.title}
              loading="lazy"
            />
            <div className="image-overlay">
              <h4>{image.title}</h4>
              <p>{image.location}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedImage && (
        <div className="image-modal" onClick={() => setSelectedImage(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button 
              className="close-modal"
              onClick={() => setSelectedImage(null)}
            >
              ✕
            </button>
            <img 
              src={`${selectedImage.url}?w=800&h=600&fit=crop`} 
              alt={selectedImage.title}
            />
            <div className="image-info">
              <h3>{selectedImage.title}</h3>
              <p className="location">📍 {selectedImage.location}</p>
              <p className="description">{selectedImage.description}</p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .peak-district-gallery {
          padding: 0;
        }

        .gallery-header {
          text-align: center;
          margin-bottom: 32px;
          padding: 24px;
          background: rgba(137, 180, 250, 0.1);
          border-radius: 12px;
          border: 1px solid rgba(137, 180, 250, 0.3);
        }

        .gallery-header h2 {
          font-size: 24px;
          color: #89b4fa;
          margin-bottom: 8px;
        }

        .gallery-header p {
          color: #a6adc8;
          font-size: 16px;
        }

        .image-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 20px;
          margin-bottom: 32px;
        }

        .gallery-item {
          position: relative;
          border-radius: 12px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.3s ease;
          background: rgba(49, 50, 68, 0.6);
          border: 1px solid rgba(205, 214, 244, 0.1);
        }

        .gallery-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
          border-color: rgba(137, 180, 250, 0.5);
        }

        .gallery-item img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }

        .image-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
          padding: 20px;
          color: white;
        }

        .image-overlay h4 {
          font-size: 16px;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .image-overlay p {
          font-size: 14px;
          opacity: 0.9;
        }

        .image-modal {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 2000;
          animation: modalAppear 0.3s ease-out;
        }

        @keyframes modalAppear {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .modal-content {
          max-width: 90vw;
          max-height: 90vh;
          background: rgba(30, 30, 46, 0.95);
          border-radius: 12px;
          overflow: hidden;
          position: relative;
        }

        .close-modal {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 32px;
          height: 32px;
          border: none;
          background: rgba(0, 0, 0, 0.7);
          color: white;
          font-size: 18px;
          cursor: pointer;
          border-radius: 50%;
          z-index: 2001;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .close-modal:hover {
          background: rgba(243, 139, 168, 0.7);
        }

        .modal-content img {
          width: 100%;
          max-height: 60vh;
          object-fit: cover;
        }

        .image-info {
          padding: 24px;
        }

        .image-info h3 {
          font-size: 20px;
          color: #cdd6f4;
          margin-bottom: 8px;
        }

        .location {
          color: #89b4fa;
          font-size: 14px;
          margin-bottom: 12px;
          font-weight: 500;
        }

        .description {
          color: #a6adc8;
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .image-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          
          .gallery-item img {
            height: 180px;
          }
          
          .modal-content {
            max-width: 95vw;
            max-height: 95vh;
          }
          
          .image-info {
            padding: 16px;
          }
        }
      `}</style>
    </div>
  );
};

export default PeakDistrictGallery;