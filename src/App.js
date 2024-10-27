import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// services
import Header from './components/header';
import Footer from './components/footer';
import Navigator from './components/navigator';
import Client from './components/client';
// components
import PublicLogin from './components/public/login';
import PublicLogout from './components/public/logout';
import PublicPolicies from './components/public/policies';
import PublicAdminCoc from './components/public/admincoc';
import PublicContact from './components/public/contact';
import PublicYouTube from './components/public/youtube';
import MeStats from './components/me/stats';
import MePassword from './components/me/password';
import MeHistoryNicknames from './components/me/history/nicknames';
import MeHistoryXP from './components/me/history/xp';
import MeHistoryRank from './components/me/history/rank';
import MeReports from './components/me/reports';
import MeActions from './components/me/actions';
import MeCases from './components/me/cases';
import GameLeaderboard from './components/game/leaderboard';
import GameLookup from './components/game/lookup';
import GameLobbyChat from './components/game/lobbychat';
import AdminInvestigate from './components/admin/investigate';
import BetaNews from './components/beta/news';

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
          <Routes>
              {/* Define routes for the different paths */}
              <Route path="/public/login" element={<PublicLogin />} />
              <Route path="/public/logout" element={<PublicLogout />} />
              <Route path="/public/policies" element={<PublicPolicies />} />
              <Route path="/public/admincoc" element={<PublicAdminCoc />} />
              <Route path="/public/contact" element={<PublicContact />} />
              <Route path="/public/youtube" element={<PublicYouTube />} />
              <Route path="/me/stats" element={<MeStats />} />
              <Route path="/me/password" element={<MePassword />} />
              <Route path="/me/history/nicknames" element={<MeHistoryNicknames />} />
              <Route path="/me/history/xp" element={<MeHistoryXP />} />
              <Route path="/me/history/rank" element={<MeHistoryRank />} />
              <Route path="/me/reports" element={<MeReports />} />
              <Route path="/me/actions" element={<MeActions />} />
              <Route path="/me/cases" element={<MeCases />} />
              <Route path="/game/leaderboard" element={<GameLeaderboard />} />
              <Route path="/game/lookup" element={<GameLookup />} />
              <Route path="/game/lobbychat" element={<GameLobbyChat />} />
              <Route path="/admin/investigate" element={<AdminInvestigate />} />
              <Route path="/beta/news" element={<BetaNews />} />
              {/* Add more routes as needed */}
              <Route path="/" element={<Client />} />
          </Routes>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </Router>
  );
}

export default App;
