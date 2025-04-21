import React from 'react';

const Footer = () => (
  <footer className="bg-dark text-light text-center py-3 mt-auto">
    <div className="container">
      <p className="mb-0">&copy; {new Date().getFullYear()} Neighborhood Tool Library</p>
    </div>
  </footer>
);

export default Footer;
