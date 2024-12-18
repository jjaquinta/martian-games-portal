import React, { useContext } from 'react';
import { createBrowserRouter, RouterProvider, Navigate, Outlet, useLocation } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/footer';
import Navigator from './components/navigator';
import { UserProvider, UserContext } from './components/UserContext';
import Dashboard from './components/Dashboard';
import PublicLogin from './components/public/login';
import PublicLogout from './components/public/logout';
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
import Policies from './components/public/policies';
import ModConduct from './components/public/ModConduct';
import Contact from './components/public/contact';
import PublicYouTube from './components/public/youtube';
import BetaNews from './components/beta/news';
import BetaMap from './components/beta/map';
import AdminPlayers from'./components/admin/players';
import AdminReports from'./components/admin/reports';
import AdminLogins from'./components/admin/logins';
import AdminInvestigate from'./components/admin/investigate';
import AdminCases from'./components/admin/cases';
import AdminAnalysis from'./components/admin/analysis';
import YouTube from './components/public/loginYoutube'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const ProtectedRoute = ({ children }) => {
  const { userData } = useContext(UserContext);
  if (!userData) {
    return <Navigate to="/portal/public/login" replace />;
  }
  return children;
};

const Layout = ({ children }) => {
  const { userData } = useContext(UserContext);
  const location = useLocation();

  // Check if the current route is a protected route


  const isProtectedRoute = (location.pathname.startsWith('/portal/me') || 
  location.pathname.startsWith('/portal/game') ||
  location.pathname.startsWith('/portal/beta') ||
  location.pathname.startsWith('/portal/admin')||
  location.pathname.startsWith('/portal/public'))  &&
  location.pathname !== '/portal/public/login';
                         

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <Container fluid className="flex-grow-1" >
        <Row className="h-100">
          {userData && isProtectedRoute && (
            <Col md={3} lg={2} className="bg-light sidebar">
              <Navigator />
            </Col>
          )}
          <Col md={userData && isProtectedRoute ? 9 : 12} lg={userData && isProtectedRoute ? 10 : 12}>
            <main className="p-3">
              {children}
            </main>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/portal",
    element: <Layout><Outlet /></Layout>,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "public/login", element: <PublicLogin /> },
      { path: "logout", element: <PublicLogout /> },
      { path: "public/policies", element: <Policies /> },
      { path: "public/mod-conduct", element: <ModConduct /> },
      { path: "public/contact", element: <Contact /> },
      { path: "public/youtube", element: <PublicYouTube/> },
      { path: "public/loginYoutube", element: <YouTube/> },
      { 
        path: "me",
        element: <ProtectedRoute><Outlet /></ProtectedRoute>,
        children: [
          { path: "stats", element: <MeStats /> },
          { path: "password", element: <MePassword /> },
          { path: "history/nicknames", element: <MeHistoryNicknames /> },
          { path: "history/xp", element: <MeHistoryXP /> },
          { path: "history/rank", element: <MeHistoryRank /> },
          { path: "reports", element: <MeReports /> },
          { path: "actions", element: <MeActions /> },
          { path: "cases", element: <MeCases /> },
        ]
      },
      {
        path: "game",
        element: <ProtectedRoute><Outlet /></ProtectedRoute>,
        children: [
          { path: "leaderboard", element: <GameLeaderboard /> },
          { path: "lookup", element: <GameLookup /> },
          { path: "lobbychat", element: <GameLobbyChat /> },
        ]
      },
      {
        path: "beta",
        element: <ProtectedRoute><Outlet /></ProtectedRoute>,
        children: [
          { path: "news", element: <BetaNews/> },
          { path: "map", element: <BetaMap/> }
        ]
      }, {
        path: "admin",
        element: <ProtectedRoute><Outlet /></ProtectedRoute>,
        children: [
          { path: "players", element: <AdminPlayers/> },
          { path: "reports", element: <AdminReports/> },
          { path: "logins", element: <AdminLogins/> },
          { path: "cases", element: <AdminCases/> },
          { path: "investigate", element: <AdminInvestigate/> },
          { path: "analysis", element: <AdminAnalysis/> }
        
        ]
      }
    ]
  }
], {
  basename: "/"
});

function App() {
  return (
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
