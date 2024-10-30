import React, { useContext } from 'react';
import { UserContext } from './UserContext';
import NavItem from './navitem';

const Navigator = () => {
  const { userData } = useContext(UserContext); // Access the user data from context
  const navItemsPub = [
    { id: 'public/policies', name: 'Policies' },
    { id: 'public/admincoc', name: 'Mod Conduct' },
    { id: 'public/contact', name: 'Contact' },
    { id: 'public/youtube', name: 'YouTube' },
  ];
  const navItemsGame = [
    { id: 'game/leaderboard', name: 'Leaderboard' },
    { id: 'game/lookup', name: 'Lookup' },
    { id: 'game/lobbychat', name: 'Lobby Chat' },
  ];
  const navItemsAdmin = [
    { id: 'admin/investigate', name: 'Investigate' },
  ];
  const navItemsBeta = [
    { id: 'beta/news', name: 'News' },
  ];

  return (
    <aside style={{ width: '10%' }}>
      <ul style={{ paddingLeft: '15px' }}>
        <li>Public<ul style={{ paddingLeft: '15px' }}>
          {!userData?.player && (
            <NavItem key='public/login' navID='public/login' navName='Login' />
          )}
          {userData?.player && (
            <NavItem key='public/logout' navID='public/logout' navName='Logout' />
          )}
          {navItemsPub.map(item => (
            <NavItem key={item.id} navID={item.id} navName={item.name} />
          ))}</ul>
        </li>
        {userData?.player && (
          <li>Me<ul style={{ paddingLeft: '15px' }}>
             <NavItem key='me/stats' navID='me/stats' navName='Stats' />
             <NavItem key='me/password' navID='me/password' navName='Password' />
             <li>History<ul style={{ paddingLeft: '15px' }}>
             <NavItem key='me/history/nicknames' navID='me/history/nicknames' navName='Nicknames' />
             <NavItem key='me/history/xp' navID='me/history/xp' navName='XP' />
             <NavItem key='me/history/rank' navID='me/history/rank' navName='Rank' />
             </ul></li>
             <NavItem key='me/reports' navID='me/reports' navName='Reports' />
             <NavItem key='me/actions' navID='me/actions' navName='Actions' />
             <NavItem key='me/cases' navID='me/cases' navName='Cases' />
             </ul>
          </li>
        )}
        {userData?.player && (
          <li>Game<ul style={{ paddingLeft: '15px' }}>
            {navItemsGame.map(item => (
              <NavItem key={item.id} navID={item.id} navName={item.name} />
            ))}</ul>
          </li>
        )}
        {userData?.user?.deputy && (
          <li>Admin<ul style={{ paddingLeft: '15px' }}>
            {navItemsAdmin.map(item => (
              <NavItem key={item.id} navID={item.id} navName={item.name} />
            ))}</ul>
          </li>
        )}
        {userData?.user?.beta && (
          <li>Beta<ul style={{ paddingLeft: '15px' }}>
            {navItemsBeta.map(item => (
              <NavItem key={item.id} navID={item.id} navName={item.name} />
            ))}</ul>
          </li>
        )}
      </ul>
    </aside>
  );
};

export default Navigator;
