import React, { useState } from 'react';
import './About.css';
import toolImage1 from '../assets/tool1.png';
import toolImage2 from '../assets/tool2.png';
import toolImage3 from '../assets/tool3.png';

const images = [
  { src: toolImage1, alt: 'Tool Library 1' },
  { src: toolImage2, alt: 'Tool Library 2' },
  { src: toolImage3, alt: 'Tool Library 3' },
];

const About = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="aboutus-container">
      <div className="aboutus-text-section">
        <h2 className="aboutus-title">About Our Tool Library</h2>
        <p className="aboutus-text">
          The Neighborhood Tool Library is a community-driven platform where neighbors can share and borrow tools. 
          Whether it's gardening, repairing, or DIY projects — we believe in reducing waste, saving money, and building trust through shared resources.
        </p>
      </div>
      <div className="aboutus-carousel">
        <div className="carousel">
          <button className="carousel-btn prev" onClick={goToPrevious}>&#10094;</button>
          <img
            src={images[currentIndex].src}
            alt={images[currentIndex].alt}
            className="aboutus-image"
          />
          <button className="carousel-btn next" onClick={goToNext}>&#10095;</button>
        </div>
        <div className="carousel-dots">
          {images.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => setCurrentIndex(index)}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default About;
