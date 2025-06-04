import React, { useState, useEffect } from 'react';
import './App.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

const App = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeWindows, setActiveWindows] = useState([]);
  const [showApplications, setShowApplications] = useState(false);
  const [showFileManager, setShowFileManager] = useState(false);
  const [minimizedWindows, setMinimizedWindows] = useState([]);
  const [desktopWidgets, setDesktopWidgets] = useState([
    { id: 'clock', type: 'clock', position: { x: 50, y: 50 } },
    { id: 'weather', type: 'weather', position: { x: 200, y: 50 } }
  ]);

  // Time update
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Desktop Applications organized like a real file system
  const desktopApplications = [
    { id: 'jobs', name: 'Job Hunter', icon: '💼', category: 'productivity', description: 'AI-powered job search & applications', folder: 'Applications' },
    { id: 'finance', name: 'Finance Manager', icon: '💰', category: 'productivity', description: 'Personal finance & investment tools', folder: 'Applications' },
    { id: 'tasks', name: 'Task Planner', icon: '📋', category: 'productivity', description: 'Project management & productivity', folder: 'Applications' },
    { id: 'learning', name: 'Learning Hub', icon: '📚', category: 'education', description: 'Online courses & skill development', folder: 'Applications' },
    { id: 'workspace', name: 'Remote Workspace', icon: '🏢', category: 'productivity', description: 'Coworking & virtual office tools', folder: 'Applications' },
    { id: 'career', name: 'Career Tools', icon: '📊', category: 'productivity', description: 'Resume builders & interview prep', folder: 'Applications' },
    { id: 'relocation', name: 'Relocation Helper', icon: '🏠', category: 'utility', description: 'Arizona→UK migration tools', folder: 'Applications' },
    { id: 'network', name: 'Network Tools', icon: '🌐', category: 'system', description: 'Network analysis & diagnostics', folder: 'System' },
    { id: 'terminal', name: 'Terminal', icon: '⚡', category: 'system', description: 'Command line interface', folder: 'System' },
    { id: 'browser', name: 'Web Browser', icon: '🌍', category: 'internet', description: 'Internet browsing', folder: 'Internet' },
    { id: 'settings', name: 'System Settings', icon: '⚙️', category: 'system', description: 'System configuration', folder: 'System' },
    { id: 'files', name: 'File Manager', icon: '📁', category: 'system', description: 'Browse files and folders', folder: 'System' }
  ];

  // File Manager folders (mimicking the KDE file manager structure)
  const fileManagerFolders = [
    { name: 'Remote Jobs', icon: '💼', color: '#3498db', items: 24 },
    { name: 'Finance', icon: '💰', color: '#e67e22', items: 18 },
    { name: 'Learning', icon: '📚', color: '#9b59b6', items: 32 },
    { name: 'Projects', icon: '📋', color: '#2ecc71', items: 15 },
    { name: 'Career', icon: '📊', color: '#e74c3c', items: 22 },
    { name: 'Network', icon: '🌐', color: '#1abc9c', items: 12 },
    { name: 'Documents', icon: '📄', color: '#34495e', items: 45 },
    { name: 'Pictures', icon: '🖼️', color: '#f39c12', items: 128 },
    { name: 'Downloads', icon: '⬇️', color: '#95a5a6', items: 67 },
    { name: 'Desktop', icon: '🖥️', color: '#8e44ad', items: 8 },
    { name: 'Videos', icon: '🎬', color: '#e91e63', items: 23 },
    { name: 'Music', icon: '🎵', color: '#ff5722', items: 156 }
  ];

  const openApplication = (appId, appName) => {
    if (!activeWindows.find(w => w.id === appId)) {
      const newWindow = {
        id: appId,
        title: appName,
        app: appId,
        minimized: false,
        maximized: false,
        position: { 
          x: Math.max(100, 100 + (activeWindows.length * 40)), 
          y: Math.max(80, 80 + (activeWindows.length * 40)) 
        },
        zIndex: 1000 + activeWindows.length,
        size: { width: 1000, height: 700 }
      };
      
      setActiveWindows(prev => [...prev, newWindow]);
    }
  };

  const closeWindow = (windowId) => {
    setActiveWindows(windows => windows.filter(w => w.id !== windowId));
    setMinimizedWindows(minimized => minimized.filter(id => id !== windowId));
  };

  const minimizeWindow = (windowId) => {
    const window = activeWindows.find(w => w.id === windowId);
    if (window) {
      if (window.minimized) {
        setActiveWindows(prev => prev.map(w => 
          w.id === windowId ? { ...w, minimized: false } : w
        ));
        setMinimizedWindows(prev => prev.filter(id => id !== windowId));
      } else {
        setActiveWindows(prev => prev.map(w => 
          w.id === windowId ? { ...w, minimized: true } : w
        ));
        setMinimizedWindows(prev => [...prev, windowId]);
      }
    }
  };

  const maximizeWindow = (windowId) => {
    setActiveWindows(prev => prev.map(w => 
      w.id === windowId ? { 
        ...w, 
        maximized: !w.maximized,
        position: w.maximized ? { x: 100, y: 80 } : { x: 0, y: 0 },
        size: w.maximized ? { width: 1000, height: 700 } : { width: window.innerWidth, height: window.innerHeight - 50 }
      } : w
    ));
  };

  // CONTENT COMPONENTS WITH ORGANIZED LINKS

  const JobHunter = () => (
    <div className="application-content">
      <div className="content-header">
        <h2>🤖 AI-Powered Job Applications</h2>
      </div>
      <div className="link-section">
        <div className="link-grid">
          <a href="https://aiapply.co/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🤖</div>
            <div className="link-details">
              <div className="link-title">AI Apply</div>
              <div className="link-desc">Automated Job Applications</div>
            </div>
          </a>
          <a href="https://sonara.ai/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🎯</div>
            <div className="link-details">
              <div className="link-title">Sonara AI</div>
              <div className="link-desc">AI Job Hunter Platform</div>
            </div>
          </a>
          <a href="https://teal.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">💼</div>
            <div className="link-details">
              <div className="link-title">Teal</div>
              <div className="link-desc">Career Growth Platform</div>
            </div>
          </a>
          <a href="https://huntr.co/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">📋</div>
            <div className="link-details">
              <div className="link-title">Huntr</div>
              <div className="link-desc">Job Application Tracker</div>
            </div>
          </a>
        </div>
      </div>

      <div className="content-header">
        <h2>🏠 Remote Job Portals</h2>
      </div>
      <div className="link-section">
        <div className="link-grid">
          <a href="https://remote.co/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🏠</div>
            <div className="link-details">
              <div className="link-title">Remote.co</div>
              <div className="link-desc">Premium Remote Jobs</div>
            </div>
          </a>
          <a href="https://weworkremotely.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">💻</div>
            <div className="link-details">
              <div className="link-title">We Work Remotely</div>
              <div className="link-desc">Top Remote Job Portal</div>
            </div>
          </a>
          <a href="https://remotive.io/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">📧</div>
            <div className="link-details">
              <div className="link-title">Remotive</div>
              <div className="link-desc">Weekly Job Newsletter</div>
            </div>
          </a>
          <a href="https://angel.co/jobs" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">👼</div>
            <div className="link-details">
              <div className="link-title">AngelList</div>
              <div className="link-desc">Startup Jobs</div>
            </div>
          </a>
          <a href="https://nomadjobs.io/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">✈️</div>
            <div className="link-details">
              <div className="link-title">Nomad Jobs</div>
              <div className="link-desc">Location Independent</div>
            </div>
          </a>
          <a href="https://justremote.co/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🎯</div>
            <div className="link-details">
              <div className="link-title">JustRemote</div>
              <div className="link-desc">Remote-First Companies</div>
            </div>
          </a>
        </div>
      </div>

      <div className="content-header">
        <h2>💼 Freelance Platforms</h2>
      </div>
      <div className="link-section">
        <div className="link-grid">
          <a href="https://upwork.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">⬆️</div>
            <div className="link-details">
              <div className="link-title">Upwork</div>
              <div className="link-desc">Global Freelance Platform</div>
            </div>
          </a>
          <a href="https://fiverr.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🎯</div>
            <div className="link-details">
              <div className="link-title">Fiverr</div>
              <div className="link-desc">Gig Economy Leader</div>
            </div>
          </a>
          <a href="https://freelancer.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">💰</div>
            <div className="link-details">
              <div className="link-title">Freelancer</div>
              <div className="link-desc">Project Marketplace</div>
            </div>
          </a>
          <a href="https://toptal.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🏆</div>
            <div className="link-details">
              <div className="link-title">Toptal</div>
              <div className="link-desc">Elite Developers Network</div>
            </div>
          </a>
        </div>
      </div>

      <div className="content-header">
        <h2>🔍 Major Job Search Engines</h2>
      </div>
      <div className="link-section">
        <div className="link-grid">
          <a href="https://indeed.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🔍</div>
            <div className="link-details">
              <div className="link-title">Indeed</div>
              <div className="link-desc">World's #1 Job Site</div>
            </div>
          </a>
          <a href="https://linkedin.com/jobs/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">💼</div>
            <div className="link-details">
              <div className="link-title">LinkedIn Jobs</div>
              <div className="link-desc">Professional Network</div>
            </div>
          </a>
          <a href="https://glassdoor.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🏢</div>
            <div className="link-details">
              <div className="link-title">Glassdoor</div>
              <div className="link-desc">Company Reviews & Salaries</div>
            </div>
          </a>
          <a href="https://dice.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🎲</div>
            <div className="link-details">
              <div className="link-title">Dice</div>
              <div className="link-desc">Tech Jobs Specialist</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );

  const FinanceManager = () => (
    <div className="application-content">
      <div className="content-header">
        <h2>💰 Personal Finance Management</h2>
      </div>
      <div className="link-section">
        <div className="link-grid">
          <a href="https://mint.intuit.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🌱</div>
            <div className="link-details">
              <div className="link-title">Mint</div>
              <div className="link-desc">Free Budget Tracker by Intuit</div>
            </div>
          </a>
          <a href="https://youneedabudget.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">📊</div>
            <div className="link-details">
              <div className="link-title">YNAB</div>
              <div className="link-desc">You Need A Budget</div>
            </div>
          </a>
          <a href="https://personalcapital.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">💎</div>
            <div className="link-details">
              <div className="link-title">Personal Capital</div>
              <div className="link-desc">Wealth Management</div>
            </div>
          </a>
          <a href="https://pocketguard.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🛡️</div>
            <div className="link-details">
              <div className="link-title">PocketGuard</div>
              <div className="link-desc">Spending Tracker</div>
            </div>
          </a>
        </div>
      </div>

      <div className="content-header">
        <h2>📈 Investment Platforms</h2>
      </div>
      <div className="link-section">
        <div className="link-grid">
          <a href="https://robinhood.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🏹</div>
            <div className="link-details">
              <div className="link-title">Robinhood</div>
              <div className="link-desc">Commission-Free Trading</div>
            </div>
          </a>
          <a href="https://schwab.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🏦</div>
            <div className="link-details">
              <div className="link-title">Charles Schwab</div>
              <div className="link-desc">Full-Service Broker</div>
            </div>
          </a>
          <a href="https://fidelity.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">💼</div>
            <div className="link-details">
              <div className="link-title">Fidelity</div>
              <div className="link-desc">Investment Management</div>
            </div>
          </a>
          <a href="https://vanguard.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">📊</div>
            <div className="link-details">
              <div className="link-title">Vanguard</div>
              <div className="link-desc">Low-Cost Index Funds</div>
            </div>
          </a>
        </div>
      </div>

      <div className="content-header">
        <h2>🏦 Banking & Credit</h2>
      </div>
      <div className="link-section">
        <div className="link-grid">
          <a href="https://ally.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🤝</div>
            <div className="link-details">
              <div className="link-title">Ally Bank</div>
              <div className="link-desc">High-Yield Savings</div>
            </div>
          </a>
          <a href="https://marcus.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🏛️</div>
            <div className="link-details">
              <div className="link-title">Marcus</div>
              <div className="link-desc">by Goldman Sachs</div>
            </div>
          </a>
          <a href="https://chime.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🔔</div>
            <div className="link-details">
              <div className="link-title">Chime</div>
              <div className="link-desc">Mobile-First Banking</div>
            </div>
          </a>
          <a href="https://creditkarma.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">📊</div>
            <div className="link-details">
              <div className="link-title">Credit Karma</div>
              <div className="link-desc">Free Credit Scores</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );

  const NetworkTools = () => (
    <div className="application-content">
      <div className="content-header">
        <h2>📡 Network Diagnostics</h2>
      </div>
      <div className="link-section">
        <div className="link-grid">
          <a href="https://speedtest.net/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">⚡</div>
            <div className="link-details">
              <div className="link-title">Speedtest.net</div>
              <div className="link-desc">Internet Speed Test</div>
            </div>
          </a>
          <a href="https://downdetector.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🔍</div>
            <div className="link-details">
              <div className="link-title">DownDetector</div>
              <div className="link-desc">Service Status Monitor</div>
            </div>
          </a>
          <a href="https://whatismyipaddress.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🌐</div>
            <div className="link-details">
              <div className="link-title">IP Address Lookup</div>
              <div className="link-desc">Location & Security Info</div>
            </div>
          </a>
          <a href="https://mxtoolbox.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🛠️</div>
            <div className="link-details">
              <div className="link-title">MX Toolbox</div>
              <div className="link-desc">DNS & Email Tools</div>
            </div>
          </a>
        </div>
      </div>

      <div className="content-header">
        <h2>🗺️ Navigation & Maps</h2>
      </div>
      <div className="link-section">
        <div className="link-grid">
          <a href="https://makemydrivefun.com" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🚗</div>
            <div className="link-details">
              <div className="link-title">Make My Drive Fun</div>
              <div className="link-desc">Route Optimizer</div>
            </div>
          </a>
          <a href="https://waze.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🗺️</div>
            <div className="link-details">
              <div className="link-title">Waze</div>
              <div className="link-desc">Community Navigation</div>
            </div>
          </a>
          <a href="https://maps.google.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">📍</div>
            <div className="link-details">
              <div className="link-title">Google Maps</div>
              <div className="link-desc">Universal Navigation</div>
            </div>
          </a>
          <a href="https://gasbuddy.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">⛽</div>
            <div className="link-details">
              <div className="link-title">GasBuddy</div>
              <div className="link-desc">Fuel Price Tracker</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );

  // Additional content components for other apps would go here...
  // For brevity, I'm including placeholders that can be expanded

  const renderApplicationContent = (appId) => {
    switch (appId) {
      case 'jobs': return <JobHunter />;
      case 'finance': return <FinanceManager />;
      case 'network': return <NetworkTools />;
      case 'tasks': return (
        <div className="application-content">
          <div className="content-header"><h2>📋 Task Management Tools</h2></div>
          <div className="link-section">
            <div className="link-grid">
              <a href="https://asana.com/" target="_blank" rel="noopener noreferrer" className="app-link">
                <div className="link-icon">🎯</div>
                <div className="link-details">
                  <div className="link-title">Asana</div>
                  <div className="link-desc">Team Project Management</div>
                </div>
              </a>
              <a href="https://trello.com/" target="_blank" rel="noopener noreferrer" className="app-link">
                <div className="link-icon">📋</div>
                <div className="link-details">
                  <div className="link-title">Trello</div>
                  <div className="link-desc">Kanban Board System</div>
                </div>
              </a>
              <a href="https://notion.so/" target="_blank" rel="noopener noreferrer" className="app-link">
                <div className="link-icon">📝</div>
                <div className="link-details">
                  <div className="link-title">Notion</div>
                  <div className="link-desc">All-in-One Workspace</div>
                </div>
              </a>
              <a href="https://monday.com/" target="_blank" rel="noopener noreferrer" className="app-link">
                <div className="link-icon">📅</div>
                <div className="link-details">
                  <div className="link-title">Monday.com</div>
                  <div className="link-desc">Work OS Platform</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      );
      case 'learning': return (
        <div className="application-content">
          <div className="content-header"><h2>🎓 Online Learning Platforms</h2></div>
          <div className="link-section">
            <div className="link-grid">
              <a href="https://coursera.org/" target="_blank" rel="noopener noreferrer" className="app-link">
                <div className="link-icon">🎓</div>
                <div className="link-details">
                  <div className="link-title">Coursera</div>
                  <div className="link-desc">University Courses</div>
                </div>
              </a>
              <a href="https://udemy.com/" target="_blank" rel="noopener noreferrer" className="app-link">
                <div className="link-icon">📚</div>
                <div className="link-details">
                  <div className="link-title">Udemy</div>
                  <div className="link-desc">Practical Skills Training</div>
                </div>
              </a>
              <a href="https://freecodecamp.org/" target="_blank" rel="noopener noreferrer" className="app-link">
                <div className="link-icon">🔥</div>
                <div className="link-details">
                  <div className="link-title">FreeCodeCamp</div>
                  <div className="link-desc">Learn to Code Free</div>
                </div>
              </a>
              <a href="https://pluralsight.com/" target="_blank" rel="noopener noreferrer" className="app-link">
                <div className="link-icon">🔧</div>
                <div className="link-details">
                  <div className="link-title">Pluralsight</div>
                  <div className="link-desc">Tech Skills Platform</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      );
      default:
        return (
          <div className="application-content">
            <div className="content-header">
              <h2>Application Loading...</h2>
            </div>
            <p>Content for this application is being prepared.</p>
          </div>
        );
    }
  };

  const FileManager = () => (
    <div className="file-manager">
      <div className="file-manager-header">
        <div className="path-bar">
          <span className="path-segment">Home</span>
          <span className="path-separator">—</span>
          <span className="path-segment">ThriveRemote</span>
        </div>
        <div className="view-controls">
          <button className="view-btn active">Grid</button>
          <button className="view-btn">List</button>
        </div>
      </div>
      <div className="file-manager-content">
        <div className="folder-grid">
          {fileManagerFolders.map((folder, index) => (
            <div key={index} className="folder-item" onClick={() => openApplication(folder.name.toLowerCase().replace(' ', ''), folder.name)}>
              <div className="folder-icon" style={{ backgroundColor: folder.color }}>
                <span>{folder.icon}</span>
              </div>
              <div className="folder-name">{folder.name}</div>
              <div className="folder-info">{folder.items} items</div>
            </div>
          ))}
        </div>
      </div>
      <div className="file-manager-footer">
        <div className="status-info">
          {fileManagerFolders.length} folders • {fileManagerFolders.reduce((sum, folder) => sum + folder.items, 0)} total items
        </div>
      </div>
    </div>
  );

  return (
    <div className="kde-desktop">
      {/* Desktop Background */}
      <div className="desktop-background"></div>

      {/* Desktop Widgets */}
      <div className="desktop-widget clock-widget">
        <div className="time-display">{currentTime.toLocaleTimeString()}</div>
        <div className="date-display">{currentTime.toLocaleDateString()}</div>
      </div>

      <div className="desktop-widget weather-widget">
        <div className="weather-icon">☁️</div>
        <div className="temperature">72°F</div>
        <div className="weather-desc">Partly Cloudy</div>
      </div>

      {/* Application Windows */}
      {activeWindows.map(window => (
        <div
          key={window.id}
          className={`kde-window ${window.minimized ? 'minimized' : ''} ${window.maximized ? 'maximized' : ''}`}
          style={{
            left: window.position.x,
            top: window.position.y,
            zIndex: window.zIndex,
            width: window.size.width,
            height: window.size.height,
            display: window.minimized ? 'none' : 'block'
          }}
        >
          <div className="window-titlebar">
            <div className="window-title">
              <span className="window-icon">
                {desktopApplications.find(app => app.id === window.app)?.icon || '📄'}
              </span>
              <span className="title-text">{window.title}</span>
            </div>
            <div className="window-controls">
              <button className="window-control minimize" onClick={() => minimizeWindow(window.id)}>
                <span>−</span>
              </button>
              <button className="window-control maximize" onClick={() => maximizeWindow(window.id)}>
                <span>{window.maximized ? '❐' : '□'}</span>
              </button>
              <button className="window-control close" onClick={() => closeWindow(window.id)}>
                <span>×</span>
              </button>
            </div>
          </div>
          <div className="window-content">
            {window.id === 'files' ? <FileManager /> : renderApplicationContent(window.app)}
          </div>
        </div>
      ))}

      {/* File Manager Window */}
      {showFileManager && (
        <div className="kde-window file-manager-window" style={{ left: 200, top: 100, zIndex: 1001 }}>
          <div className="window-titlebar">
            <div className="window-title">
              <span className="window-icon">📁</span>
              <span className="title-text">ThriveRemote — Dolphin</span>
            </div>
            <div className="window-controls">
              <button className="window-control close" onClick={() => setShowFileManager(false)}>
                <span>×</span>
              </button>
            </div>
          </div>
          <div className="window-content">
            <FileManager />
          </div>
        </div>
      )}

      {/* Applications Menu */}
      {showApplications && (
        <div className="applications-menu">
          <div className="menu-header">
            <h3>Applications</h3>
            <button className="menu-close" onClick={() => setShowApplications(false)}>×</button>
          </div>
          <div className="menu-categories">
            <div className="category-section">
              <h4>Productivity</h4>
              <div className="app-grid">
                {desktopApplications.filter(app => app.category === 'productivity').map(app => (
                  <div key={app.id} className="menu-app" onClick={() => {
                    openApplication(app.id, app.name);
                    setShowApplications(false);
                  }}>
                    <div className="app-icon">{app.icon}</div>
                    <div className="app-name">{app.name}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="category-section">
              <h4>System</h4>
              <div className="app-grid">
                {desktopApplications.filter(app => app.category === 'system').map(app => (
                  <div key={app.id} className="menu-app" onClick={() => {
                    if (app.id === 'files') {
                      setShowFileManager(true);
                    } else {
                      openApplication(app.id, app.name);
                    }
                    setShowApplications(false);
                  }}>
                    <div className="app-icon">{app.icon}</div>
                    <div className="app-name">{app.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Taskbar */}
      <div className="kde-taskbar">
        <div className="taskbar-left">
          <button className="app-launcher" onClick={() => setShowApplications(!showApplications)}>
            <span className="launcher-icon">⚫</span>
          </button>
          <button className="taskbar-app" onClick={() => setShowFileManager(true)}>
            <span>📁</span>
          </button>
          <button className="taskbar-app" onClick={() => openApplication('browser', 'Web Browser')}>
            <span>🌍</span>
          </button>
          <button className="taskbar-app" onClick={() => openApplication('terminal', 'Terminal')}>
            <span>⚡</span>
          </button>
        </div>
        
        <div className="taskbar-center">
          {activeWindows.filter(w => !w.minimized).map(window => (
            <div key={window.id} className="taskbar-window active">
              <span>{desktopApplications.find(app => app.id === window.app)?.icon || '📄'}</span>
              <span className="window-title-short">{window.title}</span>
            </div>
          ))}
          {minimizedWindows.map(windowId => {
            const window = activeWindows.find(w => w.id === windowId);
            return window ? (
              <div key={windowId} className="taskbar-window minimized" onClick={() => minimizeWindow(windowId)}>
                <span>{desktopApplications.find(app => app.id === window.app)?.icon || '📄'}</span>
                <span className="window-title-short">{window.title}</span>
              </div>
            ) : null;
          })}
        </div>

        <div className="taskbar-right">
          <div className="system-tray">
            <span className="tray-icon">🔊</span>
            <span className="tray-icon">📶</span>
            <span className="tray-icon">🔋</span>
          </div>
          <div className="clock-tray">
            <div className="tray-time">{currentTime.toLocaleTimeString()}</div>
            <div className="tray-date">{currentTime.toLocaleDateString()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;