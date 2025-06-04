import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

const App = () => {
  // System state - simplified for fast loading
  const [systemInitialized, setSystemInitialized] = useState(true);
  const [currentTheme, setCurrentTheme] = useState('terminal');
  const [networkConnected, setNetworkConnected] = useState(true);
  const [securityLevel, setSecurityLevel] = useState('ROOT');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeWindows, setActiveWindows] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [terminalAccess, setTerminalAccess] = useState(true);
  const [currentDirectory, setCurrentDirectory] = useState('/home/user');
  const [commandHistory, setCommandHistory] = useState([]);

  // Terminal color schemes
  const terminalThemes = {
    terminal: {
      name: 'DARK TERMINAL',
      primary: '#00ff00',
      secondary: '#ffff00', 
      accent: '#00ffff',
      background: '#000000',
      windowBg: 'rgba(0, 0, 0, 0.95)',
      textColor: '#00ff00',
      promptColor: '#00ff00',
      dirColor: '#0088ff'
    },
    matrix: {
      name: 'MATRIX GREEN',
      primary: '#00ff41',
      secondary: '#008f11',
      accent: '#00aa00',
      background: '#000000',
      windowBg: 'rgba(0, 0, 0, 0.98)',
      textColor: '#00ff41',
      promptColor: '#00ff41',
      dirColor: '#008f11'
    },
    amber: {
      name: 'AMBER TERMINAL',
      primary: '#ffb000',
      secondary: '#ff8000',
      accent: '#ffdd00',
      background: '#000000',
      windowBg: 'rgba(0, 0, 0, 0.95)',
      textColor: '#ffb000',
      promptColor: '#ffb000',
      dirColor: '#ff8000'
    }
  };

  // Time update
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Terminal Applications - organized like a real Linux system
  const terminalApplications = [
    // System & Network Tools
    { id: 'network', name: 'Network Tools', icon: '🌐', category: 'system', path: '/usr/bin/network-tools' },
    { id: 'jobs', name: 'Job Search', icon: '💼', category: 'applications', path: '/usr/bin/job-hunter' },
    { id: 'finance', name: 'Finance Manager', icon: '💰', category: 'applications', path: '/usr/bin/finance-mgr' },
    { id: 'tasks', name: 'Task Manager', icon: '📋', category: 'applications', path: '/usr/bin/task-mgr' },
    { id: 'learning', name: 'Learning Hub', icon: '📚', category: 'applications', path: '/usr/bin/learning-hub' },
    { id: 'workspace', name: 'Remote Workspace', icon: '🏢', category: 'applications', path: '/usr/bin/workspace' },
    { id: 'career', name: 'Career Tools', icon: '📊', category: 'applications', path: '/usr/bin/career-tools' },
    { id: 'relocation', name: 'Relocation Planner', icon: '🏠', category: 'applications', path: '/usr/bin/relocation' },
    { id: 'terminal', name: 'Terminal', icon: '⚡', category: 'system', path: '/bin/bash' },
    { id: 'files', name: 'File Manager', icon: '📁', category: 'system', path: '/usr/bin/file-manager' },
    { id: 'system', name: 'System Monitor', icon: '📊', category: 'system', path: '/usr/bin/htop' },
    { id: 'settings', name: 'Settings', icon: '⚙️', category: 'system', path: '/usr/bin/settings' }
  ];

  const openTerminalWindow = (appId, appName, appPath) => {
    const windowId = `term_${appId}_${Date.now()}`;
    
    if (!activeWindows.find(w => w.id === windowId)) {
      const newWindow = {
        id: windowId,
        title: `${appName} - ${appPath}`,
        app: appId,
        appName: appName,
        appPath: appPath,
        minimized: false,
        position: { 
          x: Math.max(50, 50 + (activeWindows.length * 40)), 
          y: Math.max(50, 50 + (activeWindows.length * 40)) 
        },
        zIndex: 1000 + activeWindows.length,
        size: { width: 1200, height: 800 }
      };
      
      setActiveWindows(prev => [...prev, newWindow]);
      
      // Add to command history
      setCommandHistory(prev => [...prev, {
        command: `${appPath}`,
        timestamp: new Date().toLocaleTimeString(),
        output: `Starting ${appName}...`
      }]);
    }
  };

  const closeWindow = (windowId) => {
    setActiveWindows(windows => windows.filter(w => w.id !== windowId));
  };

  const minimizeWindow = (windowId) => {
    setActiveWindows(activeWindows.map(w => 
      w.id === windowId ? { ...w, minimized: !w.minimized } : w
    ));
  };

  // TERMINAL-STYLE CONTENT COMPONENTS
  const NetworkTools = () => (
    <div className="terminal-content">
      <div className="terminal-header">
        <span className="terminal-prompt">user@thrive-remote:~$ ./network-tools --scan</span>
      </div>
      
      <div className="terminal-section">
        <div className="section-title">📡 NETWORK DIAGNOSTICS</div>
        <div className="link-grid">
          <a href="https://speedtest.net/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">⚡</span>
            <span className="link-text">Speedtest.net - Internet Speed Test</span>
          </a>
          <a href="https://downdetector.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🔍</span>
            <span className="link-text">DownDetector - Service Status Monitor</span>
          </a>
          <a href="https://whatismyipaddress.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🌐</span>
            <span className="link-text">IP Address Lookup & Location</span>
          </a>
          <a href="https://mxtoolbox.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🛠️</span>
            <span className="link-text">MX Toolbox - DNS & Email Tools</span>
          </a>
          <a href="https://pingdom.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">📊</span>
            <span className="link-text">Pingdom - Website Monitoring</span>
          </a>
          <a href="https://gtmetrix.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">📈</span>
            <span className="link-text">GTmetrix - Performance Analysis</span>
          </a>
        </div>
      </div>

      <div className="terminal-section">
        <div className="section-title">🗺️ NAVIGATION & MAPS</div>
        <div className="link-grid">
          <a href="https://makemydrivefun.com" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🚗</span>
            <span className="link-text">Make My Drive Fun - Route Optimizer</span>
          </a>
          <a href="https://waze.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🗺️</span>
            <span className="link-text">Waze - Community Navigation</span>
          </a>
          <a href="https://maps.google.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">📍</span>
            <span className="link-text">Google Maps - Universal Navigation</span>
          </a>
          <a href="https://gasbuddy.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">⛽</span>
            <span className="link-text">GasBuddy - Fuel Price Tracker</span>
          </a>
        </div>
      </div>

      <div className="terminal-section">
        <div className="section-title">💻 DEVELOPER TOOLS</div>
        <div className="link-grid">
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🐙</span>
            <span className="link-text">GitHub - Code Repository Platform</span>
          </a>
          <a href="https://stackoverflow.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">💬</span>
            <span className="link-text">Stack Overflow - Developer Q&A</span>
          </a>
          <a href="https://codepen.io/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">✏️</span>
            <span className="link-text">CodePen - Frontend Playground</span>
          </a>
          <a href="https://replit.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🖥️</span>
            <span className="link-text">Replit - Online IDE</span>
          </a>
        </div>
      </div>
    </div>
  );

  const JobSearch = () => (
    <div className="terminal-content">
      <div className="terminal-header">
        <span className="terminal-prompt">user@thrive-remote:~$ ./job-hunter --remote --ai-powered</span>
      </div>
      
      <div className="terminal-section">
        <div className="section-title">🤖 AI-POWERED JOB APPLICATIONS</div>
        <div className="link-grid">
          <a href="https://aiapply.co/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🤖</span>
            <span className="link-text">AI Apply - Automated Job Applications</span>
          </a>
          <a href="https://sonara.ai/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🎯</span>
            <span className="link-text">Sonara - AI Job Hunter</span>
          </a>
          <a href="https://teal.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">💼</span>
            <span className="link-text">Teal - Career Growth Platform</span>
          </a>
          <a href="https://huntr.co/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">📋</span>
            <span className="link-text">Huntr - Job Application Tracker</span>
          </a>
        </div>
      </div>

      <div className="terminal-section">
        <div className="section-title">🏠 REMOTE JOB PORTALS</div>
        <div className="link-grid">
          <a href="https://remote.co/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🏠</span>
            <span className="link-text">Remote.co - Premium Remote Jobs</span>
          </a>
          <a href="https://weworkremotely.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">💻</span>
            <span className="link-text">We Work Remotely - Top Portal</span>
          </a>
          <a href="https://remotive.io/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">📧</span>
            <span className="link-text">Remotive - Weekly Job Newsletter</span>
          </a>
          <a href="https://angel.co/jobs" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">👼</span>
            <span className="link-text">AngelList - Startup Jobs</span>
          </a>
          <a href="https://nomadjobs.io/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">✈️</span>
            <span className="link-text">Nomad Jobs - Location Independent</span>
          </a>
          <a href="https://justremote.co/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🎯</span>
            <span className="link-text">JustRemote - Remote-First Companies</span>
          </a>
        </div>
      </div>

      <div className="terminal-section">
        <div className="section-title">💼 FREELANCE PLATFORMS</div>
        <div className="link-grid">
          <a href="https://upwork.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">⬆️</span>
            <span className="link-text">Upwork - Global Freelance Platform</span>
          </a>
          <a href="https://fiverr.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🎯</span>
            <span className="link-text">Fiverr - Gig Economy Leader</span>
          </a>
          <a href="https://freelancer.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">💰</span>
            <span className="link-text">Freelancer - Project Marketplace</span>
          </a>
          <a href="https://toptal.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🏆</span>
            <span className="link-text">Toptal - Elite Developers Network</span>
          </a>
        </div>
      </div>

      <div className="terminal-section">
        <div className="section-title">🔍 MAJOR JOB SEARCH ENGINES</div>
        <div className="link-grid">
          <a href="https://indeed.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🔍</span>
            <span className="link-text">Indeed - World's #1 Job Site</span>
          </a>
          <a href="https://linkedin.com/jobs/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">💼</span>
            <span className="link-text">LinkedIn Jobs - Professional Network</span>
          </a>
          <a href="https://glassdoor.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🏢</span>
            <span className="link-text">Glassdoor - Company Reviews & Salaries</span>
          </a>
          <a href="https://dice.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🎲</span>
            <span className="link-text">Dice - Tech Jobs Specialist</span>
          </a>
        </div>
      </div>
    </div>
  );

  const FinanceManager = () => (
    <div className="terminal-content">
      <div className="terminal-header">
        <span className="terminal-prompt">user@thrive-remote:~$ ./finance-mgr --optimize-wealth</span>
      </div>
      
      <div className="terminal-section">
        <div className="section-title">💰 PERSONAL FINANCE MANAGEMENT</div>
        <div className="link-grid">
          <a href="https://mint.intuit.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🌱</span>
            <span className="link-text">Mint - Free Budget Tracker by Intuit</span>
          </a>
          <a href="https://youneedabudget.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">📊</span>
            <span className="link-text">YNAB - You Need A Budget</span>
          </a>
          <a href="https://personalcapital.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">💎</span>
            <span className="link-text">Personal Capital - Wealth Management</span>
          </a>
          <a href="https://pocketguard.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🛡️</span>
            <span className="link-text">PocketGuard - Spending Tracker</span>
          </a>
        </div>
      </div>

      <div className="terminal-section">
        <div className="section-title">📈 INVESTMENT PLATFORMS</div>
        <div className="link-grid">
          <a href="https://robinhood.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🏹</span>
            <span className="link-text">Robinhood - Commission-Free Trading</span>
          </a>
          <a href="https://schwab.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🏦</span>
            <span className="link-text">Charles Schwab - Full-Service Broker</span>
          </a>
          <a href="https://fidelity.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">💼</span>
            <span className="link-text">Fidelity - Investment Management</span>
          </a>
          <a href="https://vanguard.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">📊</span>
            <span className="link-text">Vanguard - Low-Cost Index Funds</span>
          </a>
        </div>
      </div>

      <div className="terminal-section">
        <div className="section-title">🏦 BANKING & SAVINGS</div>
        <div className="link-grid">
          <a href="https://ally.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🤝</span>
            <span className="link-text">Ally Bank - High-Yield Savings</span>
          </a>
          <a href="https://marcus.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🏛️</span>
            <span className="link-text">Marcus by Goldman Sachs</span>
          </a>
          <a href="https://chime.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🔔</span>
            <span className="link-text">Chime - Mobile-First Banking</span>
          </a>
          <a href="https://creditkarma.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">📊</span>
            <span className="link-text">Credit Karma - Free Credit Scores</span>
          </a>
        </div>
      </div>
    </div>
  );

  const TaskManager = () => (
    <div className="terminal-content">
      <div className="terminal-header">
        <span className="terminal-prompt">user@thrive-remote:~$ ./task-mgr --productivity-mode</span>
      </div>
      
      <div className="terminal-section">
        <div className="section-title">📋 PROJECT MANAGEMENT TOOLS</div>
        <div className="link-grid">
          <a href="https://asana.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🎯</span>
            <span className="link-text">Asana - Team Project Management</span>
          </a>
          <a href="https://trello.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">📋</span>
            <span className="link-text">Trello - Kanban Board System</span>
          </a>
          <a href="https://notion.so/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">📝</span>
            <span className="link-text">Notion - All-in-One Workspace</span>
          </a>
          <a href="https://monday.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">📅</span>
            <span className="link-text">Monday.com - Work OS Platform</span>
          </a>
        </div>
      </div>

      <div className="terminal-section">
        <div className="section-title">⏰ TIME TRACKING & FOCUS</div>
        <div className="link-grid">
          <a href="https://toggl.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">⏱️</span>
            <span className="link-text">Toggl - Time Tracking Tool</span>
          </a>
          <a href="https://rescuetime.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🚑</span>
            <span className="link-text">RescueTime - Automatic Time Tracking</span>
          </a>
          <a href="https://forest.app/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🌲</span>
            <span className="link-text">Forest - Focus & Productivity</span>
          </a>
          <a href="https://freedom.to/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🕊️</span>
            <span className="link-text">Freedom - Website & App Blocker</span>
          </a>
        </div>
      </div>

      <div className="terminal-section">
        <div className="section-title">📝 NOTE TAKING & DOCUMENTATION</div>
        <div className="link-grid">
          <a href="https://obsidian.md/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">💎</span>
            <span className="link-text">Obsidian - Connected Note Taking</span>
          </a>
          <a href="https://evernote.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🐘</span>
            <span className="link-text">Evernote - Digital Note Taking</span>
          </a>
          <a href="https://roamresearch.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🕸️</span>
            <span className="link-text">Roam Research - Networked Thought</span>
          </a>
          <a href="https://logseq.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">📓</span>
            <span className="link-text">Logseq - Privacy-First Notes</span>
          </a>
        </div>
      </div>
    </div>
  );

  const LearningHub = () => (
    <div className="terminal-content">
      <div className="terminal-header">
        <span className="terminal-prompt">user@thrive-remote:~$ ./learning-hub --skill-development</span>
      </div>
      
      <div className="terminal-section">
        <div className="section-title">🎓 ONLINE COURSE PLATFORMS</div>
        <div className="link-grid">
          <a href="https://coursera.org/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🎓</span>
            <span className="link-text">Coursera - University Courses</span>
          </a>
          <a href="https://udemy.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">📚</span>
            <span className="link-text">Udemy - Practical Skills Training</span>
          </a>
          <a href="https://edx.org/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🏛️</span>
            <span className="link-text">edX - Harvard & MIT Courses</span>
          </a>
          <a href="https://pluralsight.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🔧</span>
            <span className="link-text">Pluralsight - Tech Skills Platform</span>
          </a>
        </div>
      </div>

      <div className="terminal-section">
        <div className="section-title">💻 PROGRAMMING & DEVELOPMENT</div>
        <div className="link-grid">
          <a href="https://freecodecamp.org/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🔥</span>
            <span className="link-text">FreeCodeCamp - Learn to Code Free</span>
          </a>
          <a href="https://codecademy.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">💻</span>
            <span className="link-text">Codecademy - Interactive Coding</span>
          </a>
          <a href="https://leetcode.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🧩</span>
            <span className="link-text">LeetCode - Coding Interview Prep</span>
          </a>
          <a href="https://theodinproject.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">⚡</span>
            <span className="link-text">The Odin Project - Full Stack Path</span>
          </a>
        </div>
      </div>

      <div className="terminal-section">
        <div className="section-title">🎨 DESIGN & CREATIVE SKILLS</div>
        <div className="link-grid">
          <a href="https://figma.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🎯</span>
            <span className="link-text">Figma - Collaborative Design Tool</span>
          </a>
          <a href="https://canva.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🎨</span>
            <span className="link-text">Canva - Easy Graphic Design</span>
          </a>
          <a href="https://dribbble.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🏀</span>
            <span className="link-text">Dribbble - Design Inspiration</span>
          </a>
          <a href="https://unsplash.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">📸</span>
            <span className="link-text">Unsplash - Free Stock Photos</span>
          </a>
        </div>
      </div>
    </div>
  );

  const RemoteWorkspace = () => (
    <div className="terminal-content">
      <div className="terminal-header">
        <span className="terminal-prompt">user@thrive-remote:~$ ./workspace --remote-collaboration</span>
      </div>
      
      <div className="terminal-section">
        <div className="section-title">🏢 VIRTUAL COWORKING SPACES</div>
        <div className="link-grid">
          <a href="https://flow.club/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🌊</span>
            <span className="link-text">Flow Club - Virtual Coworking</span>
          </a>
          <a href="https://focusmate.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">👥</span>
            <span className="link-text">Focusmate - Body Doubling Sessions</span>
          </a>
          <a href="https://caveday.org/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🗻</span>
            <span className="link-text">Cave Day - Deep Work Sessions</span>
          </a>
          <a href="https://nomadlist.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🏝️</span>
            <span className="link-text">Nomad List - Digital Nomad Community</span>
          </a>
        </div>
      </div>

      <div className="terminal-section">
        <div className="section-title">💬 COMMUNICATION & COLLABORATION</div>
        <div className="link-grid">
          <a href="https://slack.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">💬</span>
            <span className="link-text">Slack - Team Messaging Platform</span>
          </a>
          <a href="https://discord.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🎮</span>
            <span className="link-text">Discord - Voice & Text Chat</span>
          </a>
          <a href="https://zoom.us/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">📹</span>
            <span className="link-text">Zoom - Video Conferencing</span>
          </a>
          <a href="https://teams.microsoft.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">👥</span>
            <span className="link-text">Microsoft Teams - Collaboration Hub</span>
          </a>
        </div>
      </div>

      <div className="terminal-section">
        <div className="section-title">🗂️ FILE STORAGE & SHARING</div>
        <div className="link-grid">
          <a href="https://drive.google.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">💾</span>
            <span className="link-text">Google Drive - Cloud Storage</span>
          </a>
          <a href="https://dropbox.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">📦</span>
            <span className="link-text">Dropbox - File Synchronization</span>
          </a>
          <a href="https://onedrive.live.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">☁️</span>
            <span className="link-text">OneDrive - Microsoft Cloud</span>
          </a>
          <a href="https://wetransfer.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">📨</span>
            <span className="link-text">WeTransfer - Large File Transfer</span>
          </a>
        </div>
      </div>
    </div>
  );

  const CareerTools = () => (
    <div className="terminal-content">
      <div className="terminal-header">
        <span className="terminal-prompt">user@thrive-remote:~$ ./career-tools --optimize-trajectory</span>
      </div>
      
      <div className="terminal-section">
        <div className="section-title">📄 RESUME & CV BUILDERS</div>
        <div className="link-grid">
          <a href="https://resume.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">📝</span>
            <span className="link-text">Resume.com - Professional Resume Builder</span>
          </a>
          <a href="https://canva.com/resumes/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🎨</span>
            <span className="link-text">Canva Resume - Design Templates</span>
          </a>
          <a href="https://zety.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">⚡</span>
            <span className="link-text">Zety - Resume & Cover Letter Builder</span>
          </a>
          <a href="https://novoresume.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">⭐</span>
            <span className="link-text">NovoResume - Modern Resume Builder</span>
          </a>
        </div>
      </div>

      <div className="terminal-section">
        <div className="section-title">🎯 INTERVIEW PREPARATION</div>
        <div className="link-grid">
          <a href="https://pramp.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🤝</span>
            <span className="link-text">Pramp - Peer Mock Interviews</span>
          </a>
          <a href="https://interviewing.io/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">💻</span>
            <span className="link-text">Interviewing.io - Technical Interviews</span>
          </a>
          <a href="https://interviewcake.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🍰</span>
            <span className="link-text">Interview Cake - Coding Interview Prep</span>
          </a>
          <a href="https://biginterview.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🎥</span>
            <span className="link-text">Big Interview - Video Practice</span>
          </a>
        </div>
      </div>

      <div className="terminal-section">
        <div className="section-title">💼 PROFESSIONAL NETWORKING</div>
        <div className="link-grid">
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">💼</span>
            <span className="link-text">LinkedIn - Professional Network</span>
          </a>
          <a href="https://meetup.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">👥</span>
            <span className="link-text">Meetup - Local Professional Groups</span>
          </a>
          <a href="https://eventbrite.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🎫</span>
            <span className="link-text">Eventbrite - Career Events</span>
          </a>
          <a href="https://levels.fyi/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">📊</span>
            <span className="link-text">Levels.fyi - Tech Compensation Data</span>
          </a>
        </div>
      </div>
    </div>
  );

  const RelocationPlanner = () => (
    <div className="terminal-content">
      <div className="terminal-header">
        <span className="terminal-prompt">user@thrive-remote:~$ ./relocation --arizona-to-uk</span>
      </div>
      
      <div className="terminal-section">
        <div className="section-title">🏡 UK PROPERTY SEARCH</div>
        <div className="link-grid">
          <a href="https://rightmove.co.uk/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🏠</span>
            <span className="link-text">Rightmove - UK's #1 Property Portal</span>
          </a>
          <a href="https://zoopla.co.uk/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🔍</span>
            <span className="link-text">Zoopla - Property Search & Values</span>
          </a>
          <a href="https://onthemarket.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">📍</span>
            <span className="link-text">OnTheMarket - Property Listings</span>
          </a>
          <a href="https://spareroom.co.uk/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🛏️</span>
            <span className="link-text">SpareRoom - Flatshare & Rentals</span>
          </a>
        </div>
      </div>

      <div className="terminal-section">
        <div className="section-title">🇬🇧 UK IMMIGRATION & VISA</div>
        <div className="link-grid">
          <a href="https://gov.uk/browse/visas-immigration" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🏛️</span>
            <span className="link-text">Gov.UK - Official Visa Information</span>
          </a>
          <a href="https://gov.uk/skilled-worker-visa" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">💼</span>
            <span className="link-text">Skilled Worker Visa Guide</span>
          </a>
          <a href="https://gov.uk/global-talent-visa" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🌟</span>
            <span className="link-text">Global Talent Visa</span>
          </a>
          <a href="https://britishcouncil.org/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🇬🇧</span>
            <span className="link-text">British Council - Education & Culture</span>
          </a>
        </div>
      </div>

      <div className="terminal-section">
        <div className="section-title">💰 COST OF LIVING COMPARISON</div>
        <div className="link-grid">
          <a href="https://numbeo.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">📊</span>
            <span className="link-text">Numbeo - Cost of Living Database</span>
          </a>
          <a href="https://expatistan.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🌍</span>
            <span className="link-text">Expatistan - City Cost Comparison</span>
          </a>
          <a href="https://xe.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">💱</span>
            <span className="link-text">XE Currency - Exchange Rates</span>
          </a>
          <a href="https://wise.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">💸</span>
            <span className="link-text">Wise - International Money Transfer</span>
          </a>
        </div>
      </div>

      <div className="terminal-section">
        <div className="section-title">📦 INTERNATIONAL MOVING</div>
        <div className="link-grid">
          <a href="https://sirelo.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">📦</span>
            <span className="link-text">Sirelo - Moving Company Quotes</span>
          </a>
          <a href="https://movehub.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🏠</span>
            <span className="link-text">MoveHub - Relocation Resources</span>
          </a>
          <a href="https://internationalmovers.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">🌍</span>
            <span className="link-text">International Movers Network</span>
          </a>
          <a href="https://shipito.com/" target="_blank" rel="noopener noreferrer" className="terminal-link">
            <span className="link-icon">📮</span>
            <span className="link-text">Shipito - Package Forwarding</span>
          </a>
        </div>
      </div>
    </div>
  );

  const renderWindowContent = (app) => {
    switch (app) {
      case 'network': return <NetworkTools />;
      case 'jobs': return <JobSearch />;
      case 'finance': return <FinanceManager />;
      case 'tasks': return <TaskManager />;
      case 'learning': return <LearningHub />;
      case 'workspace': return <RemoteWorkspace />;
      case 'career': return <CareerTools />;
      case 'relocation': return <RelocationPlanner />;
      default: return (
        <div className="terminal-content">
          <div className="terminal-header">
            <span className="terminal-prompt">user@thrive-remote:~$ {app} --help</span>
          </div>
          <div className="terminal-output">
            <p>Application not yet implemented.</p>
            <p>Available commands: network, jobs, finance, tasks, learning, workspace, career, relocation</p>
          </div>
        </div>
      );
    }
  };

  const currentThemeData = terminalThemes[currentTheme];

  return (
    <div 
      className="terminal-os"
      style={{
        backgroundColor: currentThemeData.background,
        color: currentThemeData.textColor,
        '--primary-color': currentThemeData.primary,
        '--secondary-color': currentThemeData.secondary,
        '--accent-color': currentThemeData.accent,
        '--prompt-color': currentThemeData.promptColor,
        '--dir-color': currentThemeData.dirColor
      }}
    >
      {/* Terminal Header Bar */}
      <div className="terminal-header-bar">
        <div className="terminal-title">
          <span className="terminal-user">user@thrive-remote</span>
          <span className="terminal-separator">:</span>
          <span className="terminal-path">{currentDirectory}</span>
          <span className="terminal-prompt-symbol">$</span>
        </div>
        <div className="terminal-info">
          <span className="system-info">
            ThriveRemoteOS v2.0 | {networkConnected ? 'ONLINE' : 'OFFLINE'} | {securityLevel}
          </span>
          <span className="terminal-time">{currentTime.toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Main Terminal Interface */}
      <div className="terminal-desktop">
        {/* Application Grid */}
        <div className="application-grid">
          {terminalApplications.map((app, index) => (
            <div
              key={app.id}
              className="terminal-app"
              onClick={() => openTerminalWindow(app.id, app.name, app.path)}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="app-icon">{app.icon}</div>
              <div className="app-name">{app.name}</div>
              <div className="app-path">{app.path}</div>
            </div>
          ))}
        </div>

        {/* Active Terminal Windows */}
        {activeWindows.map(window => (
          <div
            key={window.id}
            className={`terminal-window ${window.minimized ? 'minimized' : ''}`}
            style={{
              left: window.position.x,
              top: window.position.y,
              zIndex: window.zIndex,
              width: window.size.width,
              height: window.size.height
            }}
          >
            <div className="window-titlebar">
              <div className="window-title">
                <span className="window-icon">⚡</span>
                <span>{window.title}</span>
              </div>
              <div className="window-controls">
                <button 
                  className="window-control minimize"
                  onClick={() => minimizeWindow(window.id)}
                >
                  _
                </button>
                <button 
                  className="window-control close"
                  onClick={() => closeWindow(window.id)}
                >
                  ✕
                </button>
              </div>
            </div>
            {!window.minimized && (
              <div className="window-content">
                {renderWindowContent(window.app)}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Status Bar */}
      <div className="terminal-status-bar">
        <div className="status-left">
          <span className="status-indicator">●</span>
          <span>System: ONLINE</span>
          <span className="separator">|</span>
          <span>Load: 0.42</span>
          <span className="separator">|</span>
          <span>Uptime: 2d 14h</span>
        </div>
        <div className="status-center">
          {activeWindows.map(window => (
            <div
              key={window.id}
              className={`taskbar-item ${window.minimized ? 'minimized' : ''}`}
              onClick={() => minimizeWindow(window.id)}
            >
              {window.appName}
            </div>
          ))}
        </div>
        <div className="status-right">
          <span>{currentTime.toLocaleDateString()}</span>
          <span className="separator">|</span>
          <span>{currentTime.toLocaleTimeString()}</span>
        </div>
      </div>
    </div>
  );
};

export default App;