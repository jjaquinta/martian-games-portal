import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import Footer from './components/footer';
import Navigator from './components/navigator';
import Client from './components/client';

function App() {
  return (
    <Router>
      {/* Header */}
      <Header />

      {/* Main content area */}
      <div style={{ display: 'flex', width: '100%' }}>
        {/* Navigator (Side Bar) */}
        <Navigator />

        {/* Client (Main Content) */}
        <div style={{ flex: 1 }}>
          <Client />
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </Router>
  );
}

export default App;
