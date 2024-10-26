import React from 'react';
import { Container } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="bg-dark text-light py-3 mt-auto">
      <Container>
        <p className="text-center mb-0">&copy; 2023 Your App Name. All rights reserved.</p>
      </Container>
    </footer>
  );
}

export default Footer;
