import React from 'react';

const Footer = () => {
  return (
    <footer className="py-3 px-2" style={{
      background: "linear-gradient(240deg, #2E265D, #2B6751)",
      color: "#fff",
      position: "fixed",
      bottom: 0,
      right: 0,
      textAlign: "right",
      margin: 0,
      padding: "0.75rem 1rem"
    }}>
      <p className="mb-0">Copyright © 2023 The University of Haripur. All rights reserved.</p>
    </footer>
  );
};

export default Footer;