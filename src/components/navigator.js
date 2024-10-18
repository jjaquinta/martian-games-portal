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
  const navItemsMe = [
    { id: 'me/stats', name: 'Stats' },
    { id: 'me/password', name: 'Password' },
    { id: 'me/history/nicknames', name: 'Nicknames' },
    { id: 'me/history/xp', name: 'XP' },
    { id: 'me/history/rank', name: 'Rank' },
    { id: 'me/reports', name: 'Reports' },
    { id: 'me/actions', name: 'Actions' },
    { id: 'me/cases', name: 'Cases' },
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
      <ul>
        <li>Public<ul>
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
          <li>Me<ul>
            {navItemsMe.map(item => (
              <NavItem key={item.id} navID={item.id} navName={item.name} />
            ))}</ul>
          </li>
        )}
        {userData?.player && (
          <li>Game<ul>
            {navItemsGame.map(item => (
              <NavItem key={item.id} navID={item.id} navName={item.name} />
            ))}</ul>
          </li>
        )}
        {userData?.user?.deputy && (
          <li>Admin<ul>
            {navItemsAdmin.map(item => (
              <NavItem key={item.id} navID={item.id} navName={item.name} />
            ))}</ul>
          </li>
        )}
        {userData?.user?.beta && (
          <li>Beta<ul>
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
