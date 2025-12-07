import React from 'react';
import { Container } from 'react-bootstrap';
import { FaGithub, FaTwitter, FaDiscord } from 'react-icons/fa';

function Footer() {
  const footerStyle = {
    background: 'rgba(15, 23, 41, 0.95)',
    backdropFilter: 'blur(16px)',
    borderTop: '1px solid rgba(212, 175, 55, 0.2)',
    boxShadow: '0 -4px 24px rgba(0, 0, 0, 0.4), 0 -2px 8px rgba(0, 0, 0, 0.3)',
    padding: '28px 0',
    marginTop: 'auto',
  };

  const contentStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
  };

  const socialLinksStyle = {
    display: 'flex',
    gap: '24px',
    marginBottom: '8px',
  };

  const iconStyle = {
    color: '#c0c8d4',
    fontSize: '1.5rem',
    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
    cursor: 'pointer',
  };

  const textStyle = {
    fontFamily: "'Lato', sans-serif",
    fontSize: '0.92rem',
    color: '#e8edf5',
    margin: 0,
    letterSpacing: '0.02em',
  };

  const handleIconHover = (e, color) => {
    e.target.style.color = color;
    e.target.style.transform = 'translateY(-4px) scale(1.15)';
    e.target.style.filter = `drop-shadow(0 4px 12px ${color})`;
  };

  const handleIconLeave = (e) => {
    e.target.style.color = '#c0c8d4';
    e.target.style.transform = 'translateY(0) scale(1)';
    e.target.style.filter = 'none';
  };

  return (
    <footer style={footerStyle}>
      <Container>
        <div style={contentStyle}>
          <div style={socialLinksStyle}>
            <FaGithub
              style={iconStyle}
              onMouseEnter={(e) => handleIconHover(e, '#d4af37')}
              onMouseLeave={handleIconLeave}
            />
            <FaTwitter
              style={iconStyle}
              onMouseEnter={(e) => handleIconHover(e, '#4a9eff')}
              onMouseLeave={handleIconLeave}
            />
            <FaDiscord
              style={iconStyle}
              onMouseEnter={(e) => handleIconHover(e, '#d4af37')}
              onMouseLeave={handleIconLeave}
            />
          </div>
          <p style={textStyle}>
            &copy; 2025 Martian Games. All rights reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
