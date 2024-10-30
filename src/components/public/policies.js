import React, { useState } from 'react';
import './policies.css'; // Import the CSS file for styles
import xpAudio from '../audio/xp.mp3';



const Policies = () => {
  const [input1, setInput1] = useState(225000000);
  const [input2, setInput2] = useState(25000000);
  const [results, setResults] = useState({
    xp1: 0,
    level1: 0,
    days1: 0,
    xp2: 0,
    level2: 0,
    days2: 0,
    xp3: 0,
    level3: 0,
    days3: 0,
    xpLoss: 0,
    xpLossPercent: 0,
  });

  // Create a reference for the audio element
  const audioRef = React.useRef(new Audio(xpAudio));

  // The XP calculation function, adapted for React
  const calcDaysToXP = (days) => {
    const a = 1e-15;
    const b = 4e-6;
    const c = 3.7942 - days;
    const discriminant = b * b - 4 * a * c;

    if (discriminant < 0) return 0;
    if (discriminant === 0) return Math.floor(-b / (2 * a));
    
    const x1 = (-b + Math.sqrt(discriminant)) / (2 * a);
    const x2 = (-b - Math.sqrt(discriminant)) / (2 * a);
    return Math.floor(Math.max(x1, x2));
  };

  // Function to handle the calculation when the user clicks "Calculate"
  const calculate = () => {
    const xp1 = input1 < 2000 ? (input1 * 50) ** 2 : input1;
    const level1 = input1 < 2000 ? input1 : Math.sqrt(xp1) / 50;
    const xp2 = input2 < 2000 ? (input2 * 50) ** 2 : input2;
    const level2 = input2 < 2000 ? input2 : Math.sqrt(xp2) / 50;

    const days1 = 1e-15 * xp1 ** 2 + 4e-6 * xp1 + 3.7942;
    const days2 = 1e-15 * xp2 ** 2 + 4e-6 * xp2 + 3.7942;
    const days3 = days1 + days2;
    const xp3 = calcDaysToXP(days3);
    const level3 = Math.sqrt(xp3) / 50;
    const xpLoss = xp1 + xp2 - xp3;
    const xpLossPercent = (xpLoss / Math.min(xp1, xp2)) * 100;

    setResults({
      xp1: Math.round(xp1).toLocaleString(),
      level1: Math.round(level1),
      days1: Math.round(days1),
      xp2: Math.round(xp2).toLocaleString(),
      level2: Math.round(level2),
      days2: Math.round(days2),
      xp3: Math.round(xp3).toLocaleString(),
      level3: Math.round(level3),
      days3: Math.round(days3),
      xpLoss: `${Math.round(xpLoss).toLocaleString()} xp, ${Math.round(xpLossPercent)}%`,
    });

    // Play the audio after a delay of 0.5 seconds
    setTimeout(() => {
      audioRef.current.play();
    }, 500);
  };

  // Handle input changes safely
  const handleInput1Change = (e) => {
    const value = e.target.value;
    if (value === '' || /^[0-9]*$/.test(value)) {
      setInput1(value === '' ? 0 : parseInt(value) || 0);
    }
  };

  const handleInput2Change = (e) => {
    const value = e.target.value;
    if (value === '' || /^[0-9]*$/.test(value)) {
      setInput2(value === '' ? 0 : parseInt(value) || 0);
    }
  };

  return (
    <div className="table-container"> {/* Apply glassmorphism effect here */}
      <h1>Policies</h1>
      <p>
        For clarity and transparency, a number of policies used for moderation will be listed on this page. Most have been discussed on the
        <a href="/index.jsp#links"> discord channel</a>, and are formed with comments and guidance from the community.
        If you have any questions, or would like to suggest new policies or changes, please participate on the discord channel.
      </p>

      <h2>Contents</h2>
      <ul>
        <li><a href="#policy1">Account Restoration</a></li>
        <li><a href="#policySharing">Account Sharing</a></li>
        <li><a href="#policy2">Account Merging</a></li>
        <li><a href="#badlang">Bad Language</a></li>
        <li><a href="#policy3">PC Version</a></li>
        <li><a href="#policyNews">News Posting</a></li>
      </ul>

      <div style={{ height: '10px' }}></div>

      <h2 id="policy1"><a href="#policy1">Account Restoration</a></h2>
      <p>
        People are banned, from time to time, for community damaging behavior on Tank-Off.
        However, people can learn from their mistakes, and sometimes should be given a second chance.
        If you have a banned account, acknowledge and are remorseful for your past behavior,
        you can apply to be reinstated. The process is as follows:
      </p>
      <ol>
        <li>Inform the moderator (sasafrass/jjaquinta) on discord that you wish to be considered for reinstatement.</li>
        <li>The moderator will collect information from you, such as why you were banned and who can vouch for your good behavior.</li>
        <li>The moderator will find someone to be your "sponsor", who will support your case for account restoration.</li>
        <li>The proposal to restore your account will be posted on the discord channel, and people will have one week to discuss it and give their opinions in public or private.</li>
        <li>The moderator will review all the opinions and make a decision. This may be to unban you, keep you banned, or unban you with a penalty.</li>
      </ol>
      <p>
        The questions the moderator will ask will be along these lines:
      </p>
      <ul>
        <li>Can you remember about when your account was banned?</li>
        <li>What do you think you did wrong that led to your account being banned?</li>
        <li>How is your behavior different now?</li>
        <li>What were the nicknames you used before you were banned?</li>
        <li>Who did you usually play with before you were banned?</li>
        <li>What other accounts have you used since you were banned?</li>
        <li>Who have you usually played with those other accounts?</li>
      </ul>
      <p>
        Remember that holding your account is a privilege, not a right.
        You do not pay for this game, and the moderator is not paid to do this.
        The moderator has the final say. Make it easy for the moderator.
      </p>

      <div style={{ height: '10px' }}></div>

      <h2 id="policySharing"><a href="#policySharing">Account Sharing</a></h2>
      <p>
        Account sharing is not allowed.
        You cannot "give" your account to another player.
        You cannot "loan" your account to another player.
        You cannot "exchange" your account to another player.
        Do not give your login or password to any other player.
        Make sure your password is secure so other people cannot easily guess it.
        Do not try to break into other accounts by guessing their password.
      </p>
      <p>
        An account represents the skill and experience of <i>one single player</i>.
        If more than one person have contributed XPs to an account, then that
        account is shared.
        It is not fair to all the other players of the game, who compete as individuals
        for places on the leaderboards, if multiple people can contribute to the ranking
        of one account.
        It is not fair to all the other players of the game if you are playing an account
        that is a higher level than you have personally earned through your skill.
      </p>
      <p>
        If an account is found that is being played by more than one person, it will be
        suspended, and all of the accounts used by any of the people using that shared
        account will be suspended.
        You can appeal to the moderator to have your account restored.
        The moderator will determine the degree of sharing, and there may be an XP reduction
        to remove XPs on that account that were earned by people other than the account owner.
      </p>
      <p>
        If you know of a shared account, or see account credentials being shared, please inform
        the moderator.
        If you have any questions about this policy, ask the moderator.
      </p>

      <div style={{ height: '10px' }}></div>

      <h2 id="policy2"><a href="#policy2">Account Merging</a></h2>
      <p>
        The merge policy has been discussed and approved for the TankOff Classic community.
        It doesn't apply to other communities.
        If other communities desire to have account merging, please start a conversation on
        the topic in the discord channel to get community consensus on it.
      </p>

      <h3 id="Merge">Merge Calculator</h3>
      <p>
        This is an experimental Merge Account calculator. You can enter the XP or level of each of the accounts
        you want to merge. Hit calculate.
      </p>

      <table>
        <tbody>
          <tr>
            <th>Account</th>
            <th>Input</th>
            <th>XP</th>
            <th>Level</th>
            <th>Days</th>
            <th>Loss</th>
          </tr>
          <tr>
            <th align="right">Main:</th>
            <td>
              <input
                type="text"
                value={input1}
                onChange={handleInput1Change} // Use the updated handler
                onKeyPress={(e) => {
                  // Allow only numeric input
                  if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab') {
                    e.preventDefault();
                  }
                }}
              />
            </td>
            <td align="right"><span>{results.xp1}</span></td>
            <td align="right"><span>{results.level1}</span></td>
            <td align="right"><span>{results.days1}</span></td>
          </tr>
          <tr>
            <th align="right">Alt:</th>
            <td>
              <input
                type="text"
                value={input2}
                onChange={handleInput2Change} // Use the updated handler
                onKeyPress={(e) => {
                  // Allow only numeric input
                  if (!/[0-9]/.test(e.key) && e.key !== 'Backspace' && e.key !== 'Tab') {
                    e.preventDefault();
                  }
                }}
              />
            </td>
            <td align="right"><span>{results.xp2}</span></td>
            <td align="right"><span>{results.level2}</span></td>
            <td align="right"><span>{results.days2}</span></td>
          </tr>
          <tr>
            <th align="right">Combined:</th>
            <td></td>
            <td align="right"><span>{results.xp3}</span></td>
            <td align="right"><span>{results.level3}</span></td>
            <td align="right"><span>{results.days3}</span></td>
            <td><span>{results.xpLoss}</span></td>
          </tr>
          <tr>
            <th></th>
            <td>
              <button onClick={calculate}>Calculate</button>
            </td>
          </tr>
        </tbody>
      </table>

      <div style={{ height: '10px' }}></div>

      <h2 id="badlang"><a href="#badlang">Bad Language</a></h2>
      <p>
        We want a happy community where everyone feels welcome and has fun playing the games.
        Treating other players with respect means not using abusive language.
        In fairness, the gameplay is confrontational and players will be set against each other.
        We expect everyone to engage in fair play, but understand that when conflict is high,
        tempers can be broken.
      </p>
      <p>
        So what is important is for people to be aware of their audience. If you use a term which
        someone clearly finds offensive, and they indicate so, you should stop. Apologizing would
        also be good. If you miss your cues and get a BE_POLITE nickname warning from the
        moderator, take it in good faith, and adjust your behavior.
      </p>
      <p>
        If your attitude is "I can say anything I want", you will need to adjust it. Free expression
        does not mean you can purposely offend other people. If your attitude is "I can't say
        anything to anyone anywhere for fear of offending them", that is also wrong. You are free
        to express yourself up until the point that someone objects. Then you will be expected to
        change.
      </p>

      <div style={{ height: '10px' }}></div>

      <h2 id="policy3"><a href="#policy3">PC Version</a></h2>
      <p>
        The PC version of the game has some problems and people can easily cheat in it.
        I think the game creator doesn't want many people playing it this way.
        So, it's best to just play the online version of the game for now.
        Enjoy!
      </p>

      <div style={{ height: '10px' }}></div>

      <h2 id="policyNews"><a href="#policyNews">News Posting</a></h2>
      <p>
        If you are interested in being a News correspondent, please contact sasafrass on Discord
        or at jo@111george.com.
        The main content of a news item should be in a YouTube video, or similar hosted service.
        What we ask you to submit is a descriptive title, and a one-line description. If approved
        this will be posted, with the link, in the News tab, and on the portal site.
        Submissions may be in any language, as the community is worldwide.
      </p>

      <h3>News Items We Would Like to See</h3>
      <ul>
        <li>Personal views on updates and trends on the leaderboard.</li>
        <li>Interviews with players.</li>
        <li>Tips and tricks on how to play the game.</li>
        <li>Discussions or opinion pieces on the rules, gameplay, and what is good player behavior.</li>
        <li>Personal experiences on playing the game.</li>
        <li>Game playback videos with detailed commentary and music.</li>
      </ul>

      <h3>News Items We Would Not Like to See</h3>
      <ul>
        <li>Content not related to the game.</li>
        <li>Raw game captures with no commentary or explanation.</li>
        <li>Negative comments about specific players.</li>
        <li>Inappropriate content at odds with the community guidelines.</li>
      </ul>
    </div>
  );
};

export default Policies;