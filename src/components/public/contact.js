import React from 'react';
import './policies.css'; // Reusing the premium list styles

const PublicContact = () => {
  return (
    <div className="table-container">
      <h1>Contact Us</h1>

      <div style={{ display: 'grid', gap: '20px', marginTop: '30px' }}>

        <div style={{ background: 'rgba(42, 63, 95, 0.3)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(74, 158, 255, 0.2)' }}>
          <h3 style={{ margin: '0 0 15px 0', fontSize: '1.2rem', color: '#4a9eff' }}>Official Channels</h3>
          <ul style={{ margin: 0, display: 'grid', gap: '10px' }}>
            <li><a href="https://www.crazygames.com/game/tank-off">The Game (CrazyGames)</a></li>
            <li><a href="https://discord.gg/wK6HHMD3">Official Discord (#tank-off-classic)</a></li>
          </ul>
        </div>

        <div style={{ background: 'rgba(42, 63, 95, 0.3)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(74, 158, 255, 0.2)' }}>
          <h3 style={{ margin: '0 0 15px 0', fontSize: '1.2rem', color: '#d4af37' }}>Moderation Team</h3>
          <p style={{ marginBottom: '10px' }}>
            <strong>Lead Moderator:</strong> <a href="mailto:martiangamessupport@111george.com">Sasafrass / Jo / jjaquinta</a>
          </p>
          <p><strong>Deputies:</strong></p>
          <ul style={{ margin: 0, paddingLeft: '20px' }}>
            <li><strong>TankOff Classic:</strong> FeurHund 6909 (Discord: <code>FeurHund 6909#8896</code>)</li>
            <li><strong>TankOff 2:</strong> Nightmᥲrᥱ™ (Discord: <code>nightmareto2</code>)</li>
            <li><strong>Kart Wars 2:</strong> Superstar (Discord: <code>taken_boi</code>)</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default PublicContact;
