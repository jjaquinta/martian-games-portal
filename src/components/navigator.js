import React from 'react';
import NavItem from './navitem';

const Navigator = () => {
  const navItems = [
    { id: 'me/history/games', name: 'Games' },
    { id: 'me/history/nicknames', name: 'Nicknames' },
    { id: 'me/history/xp', name: 'XP' },
    { id: 'me/history/rank', name: 'Rank' },
  ];
  const navItemsPub = [
    { id: 'public/login', name: 'Login' },
    { id: 'public/logout', name: 'Logout' },
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
          {navItemsPub.map(item => (
            <NavItem key={item.id} navID={item.id} navName={item.name} />
          ))}</ul>
        </li>
        <li>Me<ul>
          {navItemsMe.map(item => (
            <NavItem key={item.id} navID={item.id} navName={item.name} />
          ))}</ul>
        </li>
        <li>Game<ul>
          {navItemsGame.map(item => (
            <NavItem key={item.id} navID={item.id} navName={item.name} />
          ))}</ul>
        </li>
        <li>Admin<ul>
          {navItemsAdmin.map(item => (
            <NavItem key={item.id} navID={item.id} navName={item.name} />
          ))}</ul>
        </li>
        <li>Beta<ul>
          {navItemsBeta.map(item => (
            <NavItem key={item.id} navID={item.id} navName={item.name} />
          ))}</ul>
        </li>
      </ul>
    </aside>
  );
};

export default Navigator;
