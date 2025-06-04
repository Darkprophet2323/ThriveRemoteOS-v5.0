import React, { useState, useEffect } from 'react';
import './App.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

const App = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeWindows, setActiveWindows] = useState([]);
  const [showApplications, setShowApplications] = useState(false);
  const [showFileManager, setShowFileManager] = useState(false);
  const [minimizedWindows, setMinimizedWindows] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  // Time update
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Desktop Applications with additional music and service apps
  const desktopApplications = [
    { id: 'jobs', name: 'Job Hunter', icon: '💼', category: 'productivity', description: 'AI-powered job search & applications' },
    { id: 'finance', name: 'Finance Manager', icon: '💰', category: 'productivity', description: 'Personal finance & investment tools' },
    { id: 'tasks', name: 'Task Planner', icon: '📋', category: 'productivity', description: 'Project management & productivity' },
    { id: 'learning', name: 'Learning Hub', icon: '📚', category: 'education', description: 'Online courses & skill development' },
    { id: 'workspace', name: 'Remote Workspace', icon: '🏢', category: 'productivity', description: 'Coworking & virtual office tools' },
    { id: 'career', name: 'Career Tools', icon: '📊', category: 'productivity', description: 'Resume builders & interview prep' },
    { id: 'relocation', name: 'Relocation Helper', icon: '🏠', category: 'utility', description: 'Arizona→UK migration tools' },
    { id: 'service-jobs', name: 'Service Jobs Hub', icon: '🍽️', category: 'productivity', description: 'Waitress, restaurant & hospitality jobs' },
    { id: 'music', name: 'Music Player', icon: '🎵', category: 'entertainment', description: 'Web-based music streaming' },
    { id: 'network', name: 'Network Tools', icon: '🌐', category: 'system', description: 'Network analysis & diagnostics' },
    { id: 'terminal', name: 'Terminal', icon: '⚡', category: 'system', description: 'Command line interface' },
    { id: 'browser', name: 'Web Browser', icon: '🌍', category: 'internet', description: 'Internet browsing' },
    { id: 'settings', name: 'System Settings', icon: '⚙️', category: 'system', description: 'System configuration' },
    { id: 'files', name: 'File Manager', icon: '📁', category: 'system', description: 'Browse files and folders' }
  ];

  // File Manager folders with additional categories
  const fileManagerFolders = [
    { name: 'Remote Jobs', icon: '💼', color: '#3498db', items: 42 },
    { name: 'Finance', icon: '💰', color: '#e67e22', items: 28 },
    { name: 'Learning', icon: '📚', color: '#9b59b6', items: 56 },
    { name: 'Projects', icon: '📋', color: '#2ecc71', items: 23 },
    { name: 'Career', icon: '📊', color: '#e74c3c', items: 34 },
    { name: 'Service Work', icon: '🍽️', color: '#f39c12', items: 38 },
    { name: 'Music', icon: '🎵', color: '#8e44ad', items: 125 },
    { name: 'Network', icon: '🌐', color: '#1abc9c', items: 18 },
    { name: 'Documents', icon: '📄', color: '#34495e', items: 67 },
    { name: 'Pictures', icon: '🖼️', color: '#f39c12', items: 203 },
    { name: 'Downloads', icon: '⬇️', color: '#95a5a6', items: 89 },
    { name: 'Desktop', icon: '🖥️', color: '#8e44ad', items: 12 }
  ];

  // Music tracks for the web player
  const musicTracks = [
    { id: 1, title: 'Focus Flow', artist: 'Productivity Beats', url: 'https://www.soundjay.com/misc/sounds/tape-echo.mp3', genre: 'Ambient' },
    { id: 2, title: 'Deep Work', artist: 'Study Music', url: 'https://www.soundjay.com/misc/sounds/tape-echo.mp3', genre: 'Lo-Fi' },
    { id: 3, title: 'Coding Vibes', artist: 'Developer Tracks', url: 'https://www.soundjay.com/misc/sounds/tape-echo.mp3', genre: 'Electronic' },
    { id: 4, title: 'Remote Morning', artist: 'Work From Home', url: 'https://www.soundjay.com/misc/sounds/tape-echo.mp3', genre: 'Chill' },
    { id: 5, title: 'Productivity Boost', artist: 'Focus Music', url: 'https://www.soundjay.com/misc/sounds/tape-echo.mp3', genre: 'Instrumental' }
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

  // ENHANCED CONTENT COMPONENTS WITH MORE LINKS

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
              <div className="link-desc">Automated Job Applications with AI</div>
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
          <a href="https://kickresume.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🚀</div>
            <div className="link-details">
              <div className="link-title">Kickresume</div>
              <div className="link-desc">AI Resume Builder</div>
            </div>
          </a>
          <a href="https://jobscan.co/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🔍</div>
            <div className="link-details">
              <div className="link-title">Jobscan</div>
              <div className="link-desc">Resume ATS Optimization</div>
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
          <a href="https://remotework.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🌍</div>
            <div className="link-details">
              <div className="link-title">RemoteWork.com</div>
              <div className="link-desc">Global Remote Opportunities</div>
            </div>
          </a>
          <a href="https://flexjobs.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🕐</div>
            <div className="link-details">
              <div className="link-title">FlexJobs</div>
              <div className="link-desc">Flexible & Remote Work</div>
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
          <a href="https://guru.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🧙</div>
            <div className="link-details">
              <div className="link-title">Guru</div>
              <div className="link-desc">Professional Services</div>
            </div>
          </a>
          <a href="https://99designs.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🎨</div>
            <div className="link-details">
              <div className="link-title">99designs</div>
              <div className="link-desc">Design Competitions</div>
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
          <a href="https://monster.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">👹</div>
            <div className="link-details">
              <div className="link-title">Monster</div>
              <div className="link-desc">Career Resources</div>
            </div>
          </a>
          <a href="https://ziprecruiter.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">📫</div>
            <div className="link-details">
              <div className="link-title">ZipRecruiter</div>
              <div className="link-desc">One-Click Apply</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );

  const ServiceJobsHub = () => (
    <div className="application-content">
      <div className="content-header">
        <h2>🍽️ Restaurant & Waitress Jobs</h2>
      </div>
      <div className="link-section">
        <div className="link-grid">
          <a href="https://restaurant.jobs/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🍽️</div>
            <div className="link-details">
              <div className="link-title">Restaurant Jobs</div>
              <div className="link-desc">Dedicated Restaurant Job Board</div>
            </div>
          </a>
          <a href="https://culinaryagents.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">👨‍🍳</div>
            <div className="link-details">
              <div className="link-title">Culinary Agents</div>
              <div className="link-desc">Culinary & Restaurant Jobs</div>
            </div>
          </a>
          <a href="https://opentable.com/careers" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">📅</div>
            <div className="link-details">
              <div className="link-title">OpenTable Careers</div>
              <div className="link-desc">Restaurant Technology Jobs</div>
            </div>
          </a>
          <a href="https://poachedjobs.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🥚</div>
            <div className="link-details">
              <div className="link-title">Poached Jobs</div>
              <div className="link-desc">Hospitality Job Platform</div>
            </div>
          </a>
          <a href="https://harri.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">⭐</div>
            <div className="link-details">
              <div className="link-title">Harri</div>
              <div className="link-desc">Hospitality Hiring Platform</div>
            </div>
          </a>
          <a href="https://craigslist.org/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">📄</div>
            <div className="link-details">
              <div className="link-title">Craigslist</div>
              <div className="link-desc">Local Restaurant Job Listings</div>
            </div>
          </a>
        </div>
      </div>

      <div className="content-header">
        <h2>🏨 Hospitality Job Platforms</h2>
      </div>
      <div className="link-section">
        <div className="link-grid">
          <a href="https://hospitalityonline.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🏨</div>
            <div className="link-details">
              <div className="link-title">Hospitality Online</div>
              <div className="link-desc">Hotel & Restaurant Jobs</div>
            </div>
          </a>
          <a href="https://hcareers.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🎯</div>
            <div className="link-details">
              <div className="link-title">HCareers</div>
              <div className="link-desc">Hospitality Career Network</div>
            </div>
          </a>
          <a href="https://starbucks.com/careers/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">☕</div>
            <div className="link-details">
              <div className="link-title">Starbucks Careers</div>
              <div className="link-desc">Coffee Shop Opportunities</div>
            </div>
          </a>
          <a href="https://mcdonalds.com/careers" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🍟</div>
            <div className="link-details">
              <div className="link-title">McDonald's Careers</div>
              <div className="link-desc">Fast Food Service Jobs</div>
            </div>
          </a>
          <a href="https://jobs.chipotle.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🌯</div>
            <div className="link-details">
              <div className="link-title">Chipotle Jobs</div>
              <div className="link-desc">Fast Casual Restaurant Jobs</div>
            </div>
          </a>
          <a href="https://careers.subway.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🥪</div>
            <div className="link-details">
              <div className="link-title">Subway Careers</div>
              <div className="link-desc">Sandwich Artist Positions</div>
            </div>
          </a>
        </div>
      </div>

      <div className="content-header">
        <h2>💡 Waitress Training & Tips</h2>
      </div>
      <div className="link-section">
        <div className="link-grid">
          <a href="https://servsafe.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🛡️</div>
            <div className="link-details">
              <div className="link-title">ServSafe</div>
              <div className="link-desc">Food Safety Certification</div>
            </div>
          </a>
          <a href="https://restaurant.org/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🏛️</div>
            <div className="link-details">
              <div className="link-title">National Restaurant Assoc</div>
              <div className="link-desc">Industry Training Resources</div>
            </div>
          </a>
          <a href="https://tipout.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">💰</div>
            <div className="link-details">
              <div className="link-title">TipOut</div>
              <div className="link-desc">Tip Tracking & Management</div>
            </div>
          </a>
          <a href="https://coursera.org/courses?query=hospitality" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🎓</div>
            <div className="link-details">
              <div className="link-title">Hospitality Courses</div>
              <div className="link-desc">Online Training Programs</div>
            </div>
          </a>
        </div>
      </div>

      <div className="content-header">
        <h2>📱 Service Industry Apps</h2>
      </div>
      <div className="link-section">
        <div className="link-grid">
          <a href="https://getbirkieapp.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">📱</div>
            <div className="link-details">
              <div className="link-title">Birkie</div>
              <div className="link-desc">Server Shift Management</div>
            </div>
          </a>
          <a href="https://joinpocketco.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">💼</div>
            <div className="link-details">
              <div className="link-title">Pocket</div>
              <div className="link-desc">Restaurant Staff Communication</div>
            </div>
          </a>
          <a href="https://schedulely.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">📅</div>
            <div className="link-details">
              <div className="link-title">Schedulely</div>
              <div className="link-desc">Shift Scheduling</div>
            </div>
          </a>
          <a href="https://wheniwork.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">⏰</div>
            <div className="link-details">
              <div className="link-title">When I Work</div>
              <div className="link-desc">Employee Scheduling</div>
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
          <a href="https://pingdom.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">📊</div>
            <div className="link-details">
              <div className="link-title">Pingdom</div>
              <div className="link-desc">Website Monitoring</div>
            </div>
          </a>
          <a href="https://gtmetrix.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">📈</div>
            <div className="link-details">
              <div className="link-title">GTmetrix</div>
              <div className="link-desc">Performance Analysis</div>
            </div>
          </a>
        </div>
      </div>

      <div className="content-header">
        <h2>🗺️ Navigation & Travel</h2>
      </div>
      <div className="link-section">
        <div className="link-grid">
          <a href="https://makemydrivefun.com" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🚗</div>
            <div className="link-details">
              <div className="link-title">Make My Drive Fun</div>
              <div className="link-desc">Route Optimizer & Trip Planner</div>
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
          <a href="https://roadtrippers.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🛣️</div>
            <div className="link-details">
              <div className="link-title">Roadtrippers</div>
              <div className="link-desc">Trip Planning Tool</div>
            </div>
          </a>
          <a href="https://yelp.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">⭐</div>
            <div className="link-details">
              <div className="link-title">Yelp</div>
              <div className="link-desc">Local Business Finder</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );

  const MusicPlayer = () => (
    <div className="application-content">
      <div className="content-header">
        <h2>🎵 Web Music Player</h2>
      </div>
      
      <div className="music-player-interface">
        <div className="now-playing">
          <div className="track-info">
            <div className="track-title">{currentTrack ? currentTrack.title : 'No track selected'}</div>
            <div className="track-artist">{currentTrack ? currentTrack.artist : 'Select a track to play'}</div>
          </div>
          <div className="player-controls">
            <button className="control-btn" onClick={() => setIsPlaying(!isPlaying)}>
              {isPlaying ? '⏸️' : '▶️'}
            </button>
            <button className="control-btn">⏮️</button>
            <button className="control-btn">⏭️</button>
            <button className="control-btn">🔀</button>
          </div>
        </div>
        
        <div className="music-sources">
          <h3>🎧 Music Streaming Services</h3>
          <div className="link-grid">
            <a href="https://spotify.com/" target="_blank" rel="noopener noreferrer" className="app-link">
              <div className="link-icon">🎵</div>
              <div className="link-details">
                <div className="link-title">Spotify</div>
                <div className="link-desc">Music Streaming Platform</div>
              </div>
            </a>
            <a href="https://music.apple.com/" target="_blank" rel="noopener noreferrer" className="app-link">
              <div className="link-icon">🍎</div>
              <div className="link-details">
                <div className="link-title">Apple Music</div>
                <div className="link-desc">Apple's Music Service</div>
              </div>
            </a>
            <a href="https://music.youtube.com/" target="_blank" rel="noopener noreferrer" className="app-link">
              <div className="link-icon">📺</div>
              <div className="link-details">
                <div className="link-title">YouTube Music</div>
                <div className="link-desc">Google's Music Platform</div>
              </div>
            </a>
            <a href="https://soundcloud.com/" target="_blank" rel="noopener noreferrer" className="app-link">
              <div className="link-icon">☁️</div>
              <div className="link-details">
                <div className="link-title">SoundCloud</div>
                <div className="link-desc">Independent Music Platform</div>
              </div>
            </a>
            <a href="https://bandcamp.com/" target="_blank" rel="noopener noreferrer" className="app-link">
              <div className="link-icon">🎪</div>
              <div className="link-details">
                <div className="link-title">Bandcamp</div>
                <div className="link-desc">Independent Artist Platform</div>
              </div>
            </a>
            <a href="https://tidal.com/" target="_blank" rel="noopener noreferrer" className="app-link">
              <div className="link-icon">🌊</div>
              <div className="link-details">
                <div className="link-title">Tidal</div>
                <div className="link-desc">High-Quality Music Streaming</div>
              </div>
            </a>
          </div>
        </div>

        <div className="playlist-section">
          <h3>🎧 Productivity Playlists</h3>
          <div className="track-list">
            {musicTracks.map(track => (
              <div 
                key={track.id} 
                className={`track-item ${currentTrack?.id === track.id ? 'active' : ''}`}
                onClick={() => setCurrentTrack(track)}
              >
                <div className="track-number">{track.id}</div>
                <div className="track-details">
                  <div className="track-name">{track.title}</div>
                  <div className="track-artist">{track.artist}</div>
                </div>
                <div className="track-genre">{track.genre}</div>
                <div className="play-button">▶️</div>
              </div>
            ))}
          </div>
        </div>

        <div className="music-tools">
          <h3>🎛️ Music Tools & Resources</h3>
          <div className="link-grid">
            <a href="https://lofi.cafe/" target="_blank" rel="noopener noreferrer" className="app-link">
              <div className="link-icon">☕</div>
              <div className="link-details">
                <div className="link-title">Lofi Cafe</div>
                <div className="link-desc">Lo-Fi Study Music</div>
              </div>
            </a>
            <a href="https://noisli.com/" target="_blank" rel="noopener noreferrer" className="app-link">
              <div className="link-icon">🌧️</div>
              <div className="link-details">
                <div className="link-title">Noisli</div>
                <div className="link-desc">Background Noise Generator</div>
              </div>
            </a>
            <a href="https://brain.fm/" target="_blank" rel="noopener noreferrer" className="app-link">
              <div className="link-icon">🧠</div>
              <div className="link-details">
                <div className="link-title">Brain.fm</div>
                <div className="link-desc">Focus Music Science</div>
              </div>
            </a>
            <a href="https://mynoise.net/" target="_blank" rel="noopener noreferrer" className="app-link">
              <div className="link-icon">🔊</div>
              <div className="link-details">
                <div className="link-title">MyNoise</div>
                <div className="link-desc">Custom Noise Generator</div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );

  // Additional comprehensive content for other applications...
  const renderApplicationContent = (appId) => {
    switch (appId) {
      case 'jobs': return <JobHunter />;
      case 'service-jobs': return <ServiceJobsHub />;
      case 'network': return <NetworkTools />;
      case 'music': return <MusicPlayer />;
      case 'finance': return (
        <div className="application-content">
          <div className="content-header"><h2>💰 Personal Finance Management</h2></div>
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
              <a href="https://everydollar.com/" target="_blank" rel="noopener noreferrer" className="app-link">
                <div className="link-icon">💵</div>
                <div className="link-details">
                  <div className="link-title">EveryDollar</div>
                  <div className="link-desc">Zero-Based Budget</div>
                </div>
              </a>
              <a href="https://goodbudget.com/" target="_blank" rel="noopener noreferrer" className="app-link">
                <div className="link-icon">📱</div>
                <div className="link-details">
                  <div className="link-title">Goodbudget</div>
                  <div className="link-desc">Envelope Method</div>
                </div>
              </a>
            </div>
          </div>
          <div className="content-header"><h2>📈 Investment Platforms</h2></div>
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
        </div>
      );
      // Add more cases for other applications...
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
            <div key={index} className="folder-item" onClick={() => {
              if (folder.name === 'Service Work') {
                openApplication('service-jobs', 'Service Jobs Hub');
              } else if (folder.name === 'Music') {
                openApplication('music', 'Music Player');
              } else {
                openApplication(folder.name.toLowerCase().replace(' ', '-'), folder.name);
              }
            }}>
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
              <h4>Entertainment</h4>
              <div className="app-grid">
                {desktopApplications.filter(app => app.category === 'entertainment').map(app => (
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
              <h4>Education</h4>
              <div className="app-grid">
                {desktopApplications.filter(app => app.category === 'education').map(app => (
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
              <h4>Utilities</h4>
              <div className="app-grid">
                {desktopApplications.filter(app => app.category === 'utility').map(app => (
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
              <h4>Internet</h4>
              <div className="app-grid">
                {desktopApplications.filter(app => app.category === 'internet').map(app => (
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
          <button className="taskbar-app" onClick={() => openApplication('music', 'Music Player')}>
            <span>🎵</span>
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