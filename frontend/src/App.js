import React, { useState, useEffect } from 'react';
import './App.css';
import PeakDistrictGallery from './components/PeakDistrictGallery';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

const App = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [activeWindows, setActiveWindows] = useState([]);
  const [showApplications, setShowApplications] = useState(false);
  const [showFileManager, setShowFileManager] = useState(false);
  const [showQuickPanel, setShowQuickPanel] = useState(false);
  const [minimizedWindows, setMinimizedWindows] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [tipAmount, setTipAmount] = useState(0);
  const [billAmount, setBillAmount] = useState(0);
  const [tipPercentage, setTipPercentage] = useState(18);
  const [jobAlerts, setJobAlerts] = useState([]);

  // Time update
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Simulate job alerts
  useEffect(() => {
    const alerts = [
      { id: 1, title: 'Server Position - Phoenix', company: 'Urban Bistro', pay: '$15/hr + tips', type: 'waitress' },
      { id: 2, title: 'Remote Developer - AI Startup', company: 'TechFlow', pay: '$75k-85k', type: 'remote' },
      { id: 3, title: 'Bartender - Weekend', company: 'Rooftop Lounge', pay: '$12/hr + tips', type: 'waitress' },
      { id: 4, title: 'Virtual Assistant - Remote', company: 'Digital Solutions', pay: '$18/hr', type: 'remote' }
    ];
    setJobAlerts(alerts);
  }, []);

  // News ticker data
  const [newsItems, setNewsItems] = useState([
    "🚀 ThriveRemoteOS: Your Complete Remote Work Platform",
    "💼 AI-Powered Job Applications - Apply to 100+ Jobs Daily", 
    "🏔️ Peak District Relocation Guide - Phoenix to UK Migration Tools",
    "🧮 Professional Waitress Toolkit - Tips Calculator & Training Resources",
    "🤖 AI Assistant Hub - ChatGPT, Claude, Perplexity AI Integration",
    "🚗 Make My Drive Fun - Ultimate Route Planning with Attractions",
    "🏠 Live Property Search - Peak District Homes & Cost Comparisons",
    "📊 Real-time Job Market Data - Premium Remote Opportunities",
    "🎵 Integrated Music Player - Focus Tracks for Productivity"
  ]);
  const [currentNewsIndex, setCurrentNewsIndex] = useState(0);

  // News ticker rotation
  useEffect(() => {
    const newsTimer = setInterval(() => {
      setCurrentNewsIndex(prev => (prev + 1) % newsItems.length);
    }, 4000); // Change every 4 seconds
    return () => clearInterval(newsTimer);
  }, [newsItems.length]);

  // Calculate tip amount
  useEffect(() => {
    setTipAmount((billAmount * tipPercentage) / 100);
  }, [billAmount, tipPercentage]);
  const desktopApplications = [
    { id: 'jobs', name: 'Job Hunter', icon: '💼', category: 'productivity', description: 'AI-powered job search & applications' },
    { id: 'ai-tools', name: 'AI Assistant Hub', icon: '🤖', category: 'productivity', description: 'AI-powered productivity tools' },
    { id: 'finance', name: 'Finance Manager', icon: '💰', category: 'productivity', description: 'Personal finance & investment tools' },
    { id: 'tasks', name: 'Task Planner', icon: '📋', category: 'productivity', description: 'Project management & productivity' },
    { id: 'learning', name: 'Learning Hub', icon: '📚', category: 'education', description: 'Online courses & skill development' },
    { id: 'workspace', name: 'Remote Workspace', icon: '🏢', category: 'productivity', description: 'Coworking & virtual office tools' },
    { id: 'career', name: 'Career Tools', icon: '📊', category: 'productivity', description: 'Resume builders & interview prep' },
    { id: 'relocation', name: 'Relocation Helper', icon: '🏠', category: 'utility', description: 'Arizona→UK migration tools' },
    { id: 'service-jobs', name: 'Service Jobs Hub', icon: '🍽️', category: 'productivity', description: 'Waitress, restaurant & hospitality jobs' },
    { id: 'waitress-tools', name: 'Waitress Toolkit', icon: '🧮', category: 'productivity', description: 'Tips calculator, shift tracker, supplies' },
    { id: 'music', name: 'Music Player', icon: '🎵', category: 'entertainment', description: 'Web-based music streaming' },
    { id: 'quick-links', name: 'Quick Links', icon: '🔗', category: 'utility', description: 'Fast access to essential sites' },
    { id: 'network', name: 'Network Tools', icon: '🌐', category: 'system', description: 'Network analysis & diagnostics' },
    { id: 'terminal', name: 'Terminal', icon: '⚡', category: 'system', description: 'Command line interface' },
    { id: 'browser', name: 'Web Browser', icon: '🌍', category: 'internet', description: 'Internet browsing' },
    { id: 'settings', name: 'System Settings', icon: '⚙️', category: 'system', description: 'System configuration' },
    { id: 'files', name: 'File Manager', icon: '📁', category: 'system', description: 'Browse files and folders' }
  ];

  // Enhanced File Manager folders
  const fileManagerFolders = [
    { name: 'Remote Jobs', icon: '💼', color: '#3498db', items: 62, onClick: () => openApplication('jobs', 'Job Hunter') },
    { name: 'AI Tools', icon: '🤖', color: '#9b59b6', items: 24, onClick: () => openApplication('ai-tools', 'AI Assistant Hub') },
    { name: 'Finance', icon: '💰', color: '#e67e22', items: 38, onClick: () => openApplication('finance', 'Finance Manager') },
    { name: 'Learning', icon: '📚', color: '#9b59b6', items: 76, onClick: () => openApplication('learning', 'Learning Hub') },
    { name: 'Projects', icon: '📋', color: '#2ecc71', items: 43, onClick: () => openApplication('tasks', 'Task Planner') },
    { name: 'Career', icon: '📊', color: '#e74c3c', items: 54, onClick: () => openApplication('career', 'Career Tools') },
    { name: 'Service Work', icon: '🍽️', color: '#f39c12', items: 48, onClick: () => openApplication('service-jobs', 'Service Jobs Hub') },
    { name: 'Waitress Tools', icon: '🧮', color: '#1abc9c', items: 15, onClick: () => openApplication('waitress-tools', 'Waitress Toolkit') },
    { name: 'Music', icon: '🎵', color: '#8e44ad', items: 145, onClick: () => openApplication('music', 'Music Player') },
    { name: 'Quick Links', icon: '🔗', color: '#34495e', items: 89, onClick: () => openApplication('quick-links', 'Quick Links') },
    { name: 'Network', icon: '🌐', color: '#1abc9c', items: 28, onClick: () => openApplication('network', 'Network Tools') },
    { name: 'Relocation', icon: '🏠', color: '#2ecc71', items: 35, onClick: () => openApplication('relocation', 'Relocation Helper') },
    { name: 'Documents', icon: '📄', color: '#34495e', items: 127, onClick: () => openApplication('files', 'File Manager') }
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
      const baseX = Math.max(120, (window.innerWidth / 2) - 200); // Center horizontally, avoid left widgets
      const baseY = Math.max(120, 120); // Below warning and news ticker, avoid widgets
      
      const newWindow = {
        id: appId,
        title: appName,
        app: appId,
        minimized: false,
        maximized: false,
        position: { 
          x: baseX + (activeWindows.length * 20), 
          y: baseY + (activeWindows.length * 20) 
        },
        zIndex: 1000 + activeWindows.length,
        size: { width: 400, height: 300 }
      };
      
      setActiveWindows(prev => [...prev, newWindow]);
    }
    setShowApplications(false);
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
        position: w.maximized ? { x: 30, y: 60 } : { x: 0, y: 40 },
        size: w.maximized ? { width: 400, height: 300 } : { width: window.innerWidth, height: window.innerHeight - 90 }
      } : w
    ));
  };

  // Enhanced window management with scalability and selection
  const [dragging, setDragging] = useState(null);
  const [resizing, setResizing] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

  const bringToFront = (windowId) => {
    const maxZ = Math.max(...activeWindows.map(w => w.zIndex), 1000);
    setActiveWindows(prev => prev.map(w => 
      w.id === windowId ? { ...w, zIndex: maxZ + 1 } : w
    ));
  };

  const handleWindowClick = (e, windowId) => {
    e.stopPropagation();
    bringToFront(windowId);
  };

  const handleMouseDown = (e, windowId) => {
    e.preventDefault();
    e.stopPropagation();
    const window = activeWindows.find(w => w.id === windowId);
    if (window && !window.maximized) {
      bringToFront(windowId);
      setDragging(windowId);
      setDragOffset({
        x: e.clientX - window.position.x,
        y: e.clientY - window.position.y
      });
    }
  };

  const handleResizeStart = (e, windowId) => {
    e.preventDefault();
    e.stopPropagation();
    bringToFront(windowId);
    setResizing(windowId);
  };

  const handleMouseMove = React.useCallback((e) => {
    if (dragging) {
      e.preventDefault();
      const newX = Math.max(0, Math.min(e.clientX - dragOffset.x, window.innerWidth - 200));
      const newY = Math.max(90, Math.min(e.clientY - dragOffset.y, window.innerHeight - 100));
      
      setActiveWindows(prev => prev.map(w => 
        w.id === dragging ? {
          ...w,
          position: { x: newX, y: newY }
        } : w
      ));
    }
    
    if (resizing) {
      e.preventDefault();
      const window = activeWindows.find(w => w.id === resizing);
      if (window) {
        const newWidth = Math.max(250, e.clientX - window.position.x);
        const newHeight = Math.max(150, e.clientY - window.position.y);
        
        setActiveWindows(prev => prev.map(w => 
          w.id === resizing ? {
            ...w,
            size: { width: newWidth, height: newHeight }
          } : w
        ));
      }
    }
  }, [dragging, resizing, dragOffset]);

  const handleMouseUp = React.useCallback(() => {
    setDragging(null);
    setResizing(null);
  }, []);

  useEffect(() => {
    if (dragging || resizing) {
      document.addEventListener('mousemove', handleMouseMove, { passive: false });
      document.addEventListener('mouseup', handleMouseUp, { passive: true });
      document.body.style.userSelect = 'none';
      document.body.style.cursor = dragging ? 'move' : 'se-resize';
    } else {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    }
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [dragging, resizing, handleMouseMove, handleMouseUp]);

  // ENHANCED CONTENT COMPONENTS

  const JobHunter = () => (
    <div className="application-content">
      <div className="content-header">
        <h2>🤖 AI-Powered Job Applications</h2>
        <div className="quick-actions">
          <button className="action-btn" onClick={() => window.open('https://aiapply.co/', '_blank')}>
            🚀 Start AI Apply
          </button>
          <button className="action-btn" onClick={() => window.open('https://remote.co/', '_blank')}>
            🏠 Browse Remote Jobs
          </button>
        </div>
      </div>
      <div className="link-section">
        <div className="link-grid">
          <a href="https://aiapply.co/" target="_blank" rel="noopener noreferrer" className="app-link featured">
            <div className="link-icon">🤖</div>
            <div className="link-details">
              <div className="link-title">AI Apply ⭐ FEATURED</div>
              <div className="link-desc">Automated AI job applications - Apply to 100+ jobs daily</div>
            </div>
          </a>
          <a href="https://sonara.ai/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🎯</div>
            <div className="link-details">
              <div className="link-title">Sonara AI</div>
              <div className="link-desc">AI job hunter that applies for you</div>
            </div>
          </a>
          <a href="https://teal.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">💼</div>
            <div className="link-details">
              <div className="link-title">Teal</div>
              <div className="link-desc">Career growth platform with AI insights</div>
            </div>
          </a>
          <a href="https://huntr.co/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">📋</div>
            <div className="link-details">
              <div className="link-title">Huntr</div>
              <div className="link-desc">Job application tracker and CRM</div>
            </div>
          </a>
          <a href="https://kickresume.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🚀</div>
            <div className="link-details">
              <div className="link-title">Kickresume</div>
              <div className="link-desc">AI resume builder with templates</div>
            </div>
          </a>
          <a href="https://jobscan.co/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🔍</div>
            <div className="link-details">
              <div className="link-title">Jobscan</div>
              <div className="link-desc">Resume ATS optimization tool</div>
            </div>
          </a>
        </div>
      </div>

      <div className="content-header">
        <h2>🏠 Premium Remote Job Portals</h2>
      </div>
      <div className="link-section">
        <div className="link-grid">
          <a href="https://remote.co/" target="_blank" rel="noopener noreferrer" className="app-link featured">
            <div className="link-icon">🏠</div>
            <div className="link-details">
              <div className="link-title">Remote.co ⭐ TOP RATED</div>
              <div className="link-desc">Premium remote jobs - 100% verified remote work</div>
            </div>
          </a>
          <a href="https://weworkremotely.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">💻</div>
            <div className="link-details">
              <div className="link-title">We Work Remotely</div>
              <div className="link-desc">World's largest remote job board</div>
            </div>
          </a>
          <a href="https://remotive.io/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">📧</div>
            <div className="link-details">
              <div className="link-title">Remotive</div>
              <div className="link-desc">Weekly remote job newsletter + job board</div>
            </div>
          </a>
          <a href="https://angel.co/jobs" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">👼</div>
            <div className="link-details">
              <div className="link-title">AngelList</div>
              <div className="link-desc">Startup jobs with equity opportunities</div>
            </div>
          </a>
          <a href="https://nomadjobs.io/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">✈️</div>
            <div className="link-details">
              <div className="link-title">Nomad Jobs</div>
              <div className="link-desc">Location-independent remote work</div>
            </div>
          </a>
          <a href="https://flexjobs.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🔍</div>
            <div className="link-details">
              <div className="link-title">FlexJobs</div>
              <div className="link-desc">Premium vetted remote and flexible jobs</div>
            </div>
          </a>
          <a href="https://indeed.com/q-remote-jobs.html" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🌍</div>
            <div className="link-details">
              <div className="link-title">Indeed Remote</div>
              <div className="link-desc">Global job search with remote filters</div>
            </div>
          </a>
          <a href="https://www.glassdoor.com/Jobs/remote-jobs-SRCH_IL.0,6_IS11047_KO7,16.htm" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🏢</div>
            <div className="link-details">
              <div className="link-title">Glassdoor Remote</div>
              <div className="link-desc">Remote jobs with company insights and reviews</div>
            </div>
          </a>
          <a href="https://remoteok.io/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">📱</div>
            <div className="link-details">
              <div className="link-title">RemoteOK</div>
              <div className="link-desc">Tech remote jobs board with real-time updates</div>
            </div>
          </a>
        </div>
      </div>

      <div className="content-header">
        <h2>💼 Freelance & Gig Platforms</h2>
      </div>
      <div className="link-section">
        <div className="link-grid">
          <a href="https://upwork.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">⬆️</div>
            <div className="link-details">
              <div className="link-title">Upwork</div>
              <div className="link-desc">Global freelance platform - all skills</div>
            </div>
          </a>
          <a href="https://fiverr.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🎯</div>
            <div className="link-details">
              <div className="link-title">Fiverr</div>
              <div className="link-desc">Gig economy leader - services marketplace</div>
            </div>
          </a>
          <a href="https://freelancer.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">💰</div>
            <div className="link-details">
              <div className="link-title">Freelancer</div>
              <div className="link-desc">Project marketplace with contests</div>
            </div>
          </a>
          <a href="https://toptal.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🏆</div>
            <div className="link-details">
              <div className="link-title">Toptal</div>
              <div className="link-desc">Elite developers network - top 3%</div>
            </div>
          </a>
        </div>
      </div>

      <div className="job-alerts-section">
        <h3>🔔 Live Job Alerts</h3>
        <div className="alerts-grid">
          {jobAlerts.slice(0, 4).map(alert => (
            <div key={alert.id} className={`job-alert ${alert.type}`}>
              <div className="alert-title">{alert.title}</div>
              <div className="alert-company">{alert.company}</div>
              <div className="alert-pay">{alert.pay}</div>
              <button className="apply-btn">Quick Apply</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const AIToolsHub = () => (
    <div className="application-content">
      <div className="content-header">
        <h2>🤖 AI Assistant Hub</h2>
        <div className="quick-actions">
          <button className="action-btn" onClick={() => window.open('https://chat.openai.com/', '_blank')}>
            🧠 Open ChatGPT
          </button>
          <button className="action-btn" onClick={() => window.open('https://claude.ai/', '_blank')}>
            🤖 Open Claude
          </button>
        </div>
      </div>
      
      <div className="link-section">
        <div className="link-grid">
          <a href="https://chat.openai.com/" target="_blank" rel="noopener noreferrer" className="app-link featured">
            <div className="link-icon">🧠</div>
            <div className="link-details">
              <div className="link-title">ChatGPT ⭐ ESSENTIAL</div>
              <div className="link-desc">AI chatbot for writing, coding, and analysis</div>
            </div>
          </a>
          <a href="https://claude.ai/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🤖</div>
            <div className="link-details">
              <div className="link-title">Claude AI</div>
              <div className="link-desc">Anthropic's AI assistant for complex tasks</div>
            </div>
          </a>
          <a href="https://bard.google.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🎭</div>
            <div className="link-details">
              <div className="link-title">Google Bard</div>
              <div className="link-desc">Google's conversational AI service</div>
            </div>
          </a>
          <a href="https://www.perplexity.ai/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🔍</div>
            <div className="link-details">
              <div className="link-title">Perplexity AI</div>
              <div className="link-desc">AI-powered search and research tool</div>
            </div>
          </a>
          <a href="https://copilot.microsoft.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">👥</div>
            <div className="link-details">
              <div className="link-title">Microsoft Copilot</div>
              <div className="link-desc">AI assistant integrated with Microsoft tools</div>
            </div>
          </a>
          <a href="https://gamma.app/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">📊</div>
            <div className="link-details">
              <div className="link-title">Gamma</div>
              <div className="link-desc">AI-powered presentation maker</div>
            </div>
          </a>
          <a href="https://jasper.ai/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">✍️</div>
            <div className="link-details">
              <div className="link-title">Jasper AI</div>
              <div className="link-desc">AI writing assistant for marketing content</div>
            </div>
          </a>
          <a href="https://grammarly.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">📝</div>
            <div className="link-details">
              <div className="link-title">Grammarly</div>
              <div className="link-desc">AI-powered writing and grammar assistant</div>
            </div>
          </a>
          <a href="https://notion.so/product/ai" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">📋</div>
            <div className="link-details">
              <div className="link-title">Notion AI</div>
              <div className="link-desc">AI-enhanced workspace and note-taking</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );

  const WaitressToolkit = () => (
    <div className="application-content">
      <div className="content-header">
        <h2>🧮 Waitress Professional Toolkit</h2>
      </div>
      
      {/* Tip Calculator */}
      <div className="tool-section">
        <h3>💰 Smart Tip Calculator</h3>
        <div className="tip-calculator">
          <div className="calc-row">
            <label>Bill Amount ($):</label>
            <input 
              type="number" 
              value={billAmount} 
              onChange={(e) => setBillAmount(parseFloat(e.target.value) || 0)}
              placeholder="0.00"
            />
          </div>
          <div className="calc-row">
            <label>Tip Percentage (%):</label>
            <input 
              type="number" 
              value={tipPercentage} 
              onChange={(e) => setTipPercentage(parseFloat(e.target.value) || 0)}
              placeholder="18"
            />
          </div>
          <div className="calc-result">
            <div className="result-item">
              <span>Tip Amount: </span>
              <strong>${tipAmount.toFixed(2)}</strong>
            </div>
            <div className="result-item">
              <span>Total: </span>
              <strong>${(billAmount + tipAmount).toFixed(2)}</strong>
            </div>
          </div>
          <div className="tip-presets">
            <button onClick={() => setTipPercentage(15)} className="preset-btn">15%</button>
            <button onClick={() => setTipPercentage(18)} className="preset-btn">18%</button>
            <button onClick={() => setTipPercentage(20)} className="preset-btn">20%</button>
            <button onClick={() => setTipPercentage(22)} className="preset-btn">22%</button>
          </div>
        </div>
      </div>

      <div className="content-header">
        <h3>🍽️ Restaurant Job Resources</h3>
      </div>
      <div className="link-section">
        <div className="link-grid">
          <a href="https://restaurant.jobs/" target="_blank" rel="noopener noreferrer" className="app-link featured">
            <div className="link-icon">🍽️</div>
            <div className="link-details">
              <div className="link-title">Restaurant Jobs ⭐ SPECIALIZED</div>
              <div className="link-desc">Dedicated restaurant job board - servers, hosts, kitchen</div>
            </div>
          </a>
          <a href="https://culinaryagents.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">👨‍🍳</div>
            <div className="link-details">
              <div className="link-title">Culinary Agents</div>
              <div className="link-desc">Professional culinary & restaurant job network</div>
            </div>
          </a>
          <a href="https://poachedjobs.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🥚</div>
            <div className="link-details">
              <div className="link-title">Poached Jobs</div>
              <div className="link-desc">Hospitality job platform with instant applications</div>
            </div>
          </a>
          <a href="https://harri.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">⭐</div>
            <div className="link-details">
              <div className="link-title">Harri</div>
              <div className="link-desc">Hospitality hiring platform & career network</div>
            </div>
          </a>
        </div>
      </div>

      <div className="content-header">
        <h3>📚 Professional Training & Certification</h3>
      </div>
      <div className="link-section">
        <div className="link-grid">
          <a href="https://servsafe.com/" target="_blank" rel="noopener noreferrer" className="app-link featured">
            <div className="link-icon">🛡️</div>
            <div className="link-details">
              <div className="link-title">ServSafe ⭐ REQUIRED</div>
              <div className="link-desc">Food safety certification - essential for restaurants</div>
            </div>
          </a>
          <a href="https://gettips.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🍷</div>
            <div className="link-details">
              <div className="link-title">TIPS Certification</div>
              <div className="link-desc">Alcohol service training & certification</div>
            </div>
          </a>
          <a href="https://restaurant.org/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🏛️</div>
            <div className="link-details">
              <div className="link-title">National Restaurant Assoc</div>
              <div className="link-desc">Industry training resources & standards</div>
            </div>
          </a>
          <a href="https://coursera.org/courses?query=hospitality" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🎓</div>
            <div className="link-details">
              <div className="link-title">Hospitality Courses</div>
              <div className="link-desc">Online training programs & certifications</div>
            </div>
          </a>
        </div>
      </div>

      <div className="content-header">
        <h3>🛍️ Restaurant Supplies & Uniforms</h3>
      </div>
      <div className="link-section">
        <div className="link-grid">
          <a href="https://chefwear.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">👔</div>
            <div className="link-details">
              <div className="link-title">Chefwear</div>
              <div className="link-desc">Professional chef and server uniforms</div>
            </div>
          </a>
          <a href="https://uniformadvantage.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">👗</div>
            <div className="link-details">
              <div className="link-title">Uniform Advantage</div>
              <div className="link-desc">Restaurant and hospitality uniforms</div>
            </div>
          </a>
          <a href="https://shoestation.com/restaurant-shoes" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">👟</div>
            <div className="link-details">
              <div className="link-title">Non-Slip Shoes</div>
              <div className="link-desc">Professional restaurant footwear</div>
            </div>
          </a>
          <a href="https://amazon.com/s?k=waiter+supplies" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🛒</div>
            <div className="link-details">
              <div className="link-title">Server Supplies</div>
              <div className="link-desc">Wine keys, order pads, aprons, accessories</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );

  const NetworkTools = () => (
    <div className="application-content">
      <div className="content-header">
        <h2>🗺️ Journey Planning & Navigation</h2>
        <div className="quick-actions">
          <button className="action-btn" onClick={() => window.open('https://makemydrivefun.com', '_blank')}>
            🚗 Plan Fun Drive
          </button>
          <button className="action-btn" onClick={() => window.open('https://maps.google.com/', '_blank')}>
            🗺️ Google Maps
          </button>
        </div>
      </div>
      
      <div className="link-section">
        <div className="link-grid">
          <a href="https://maps.google.com/" target="_blank" rel="noopener noreferrer" className="app-link featured">
            <div className="link-icon">🗺️</div>
            <div className="link-details">
              <div className="link-title">Google Maps ⭐ ESSENTIAL</div>
              <div className="link-desc">World's most comprehensive mapping and navigation</div>
            </div>
          </a>
          <a href="https://makemydrivefun.com" target="_blank" rel="noopener noreferrer" className="app-link featured">
            <div className="link-icon">🚗</div>
            <div className="link-details">
              <div className="link-title">Make My Drive Fun ⭐ FEATURED</div>
              <div className="link-desc">Ultimate route optimizer & trip planner with attractions</div>
            </div>
          </a>
          <a href="https://waze.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🚧</div>
            <div className="link-details">
              <div className="link-title">Waze</div>
              <div className="link-desc">Community-driven navigation with real-time traffic</div>
            </div>
          </a>
          <a href="https://maps.apple.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🍎</div>
            <div className="link-details">
              <div className="link-title">Apple Maps</div>
              <div className="link-desc">Apple's mapping service with detailed transit info</div>
            </div>
          </a>
          <a href="https://www.mapquest.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🧭</div>
            <div className="link-details">
              <div className="link-title">MapQuest</div>
              <div className="link-desc">Turn-by-turn directions and route planning</div>
            </div>
          </a>
          <a href="https://here.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">📍</div>
            <div className="link-details">
              <div className="link-title">HERE Maps</div>
              <div className="link-desc">Professional mapping with offline capabilities</div>
            </div>
          </a>
        </div>
      </div>

      <div className="content-header">
        <h2>✈️ Travel Planning & Booking</h2>
      </div>
      <div className="link-section">
        <div className="link-grid">
          <a href="https://www.kayak.com/" target="_blank" rel="noopener noreferrer" className="app-link featured">
            <div className="link-icon">✈️</div>
            <div className="link-details">
              <div className="link-title">Kayak ⭐ TRAVEL SEARCH</div>
              <div className="link-desc">Compare flights, hotels, and car rentals</div>
            </div>
          </a>
          <a href="https://www.expedia.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🏨</div>
            <div className="link-details">
              <div className="link-title">Expedia</div>
              <div className="link-desc">Complete travel booking platform</div>
            </div>
          </a>
          <a href="https://www.skyscanner.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🔍</div>
            <div className="link-details">
              <div className="link-title">Skyscanner</div>
              <div className="link-desc">Flight comparison and booking engine</div>
            </div>
          </a>
          <a href="https://www.booking.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🏠</div>
            <div className="link-details">
              <div className="link-title">Booking.com</div>
              <div className="link-desc">Global accommodation booking platform</div>
            </div>
          </a>
          <a href="https://www.airbnb.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🏡</div>
            <div className="link-details">
              <div className="link-title">Airbnb</div>
              <div className="link-desc">Unique stays and travel experiences</div>
            </div>
          </a>
          <a href="https://www.tripadvisor.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">⭐</div>
            <div className="link-details">
              <div className="link-title">TripAdvisor</div>
              <div className="link-desc">Travel reviews and recommendations</div>
            </div>
          </a>
        </div>
      </div>

      <div className="content-header">
        <h2>⛽ Road Trip Essentials</h2>
      </div>
      <div className="link-section">
        <div className="link-grid">
          <a href="https://gasbuddy.com/" target="_blank" rel="noopener noreferrer" className="app-link featured">
            <div className="link-icon">⛽</div>
            <div className="link-details">
              <div className="link-title">GasBuddy ⭐ ESSENTIAL</div>
              <div className="link-desc">Find cheapest gas prices on your route</div>
            </div>
          </a>
          <a href="https://www.roadtrippers.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🛣️</div>
            <div className="link-details">
              <div className="link-title">Roadtrippers</div>
              <div className="link-desc">Discover amazing places along your route</div>
            </div>
          </a>
          <a href="https://www.aaa.com/triptik/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🗺️</div>
            <div className="link-details">
              <div className="link-title">AAA TripTik</div>
              <div className="link-desc">Professional trip planning with roadside assistance</div>
            </div>
          </a>
          <a href="https://www.yelp.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🍴</div>
            <div className="link-details">
              <div className="link-title">Yelp</div>
              <div className="link-desc">Find restaurants and services along your route</div>
            </div>
          </a>
        </div>
      </div>

      <div className="content-header">
        <h2>📡 Network & Connectivity Tools</h2>
      </div>
      <div className="link-section">
        <div className="link-grid">
          <a href="https://speedtest.net/" target="_blank" rel="noopener noreferrer" className="app-link featured">
            <div className="link-icon">⚡</div>
            <div className="link-details">
              <div className="link-title">Speedtest.net ⭐ ESSENTIAL</div>
              <div className="link-desc">Test internet speed & network performance</div>
            </div>
          </a>
          <a href="https://downdetector.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🔍</div>
            <div className="link-details">
              <div className="link-title">DownDetector</div>
              <div className="link-desc">Real-time service outage monitoring</div>
            </div>
          </a>
          <a href="https://whatismyipaddress.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🌐</div>
            <div className="link-details">
              <div className="link-title">IP Address Lookup</div>
              <div className="link-desc">Check your IP, location & security info</div>
            </div>
          </a>
          <a href="https://mxtoolbox.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🛠️</div>
            <div className="link-details">
              <div className="link-title">MX Toolbox</div>
              <div className="link-desc">DNS, email & network diagnostic tools</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );

  const RelocationHelper = () => (
    <div className="application-content">
      <div className="content-header">
        <h2>🏡 Phoenix to Peak District Relocation</h2>
        <div className="quick-actions">
          <button className="action-btn" onClick={() => window.open('https://makemydrivefun.com', '_blank')}>
            🚗 Plan Your Journey
          </button>
          <button className="action-btn" onClick={() => window.open('https://gov.uk/browse/visas-immigration', '_blank')}>
            📄 UK Visa Info
          </button>
        </div>
      </div>

      {/* Peak District Gallery */}
      <PeakDistrictGallery />

      <div className="content-header">
        <h2>🏠 Property Search in Peak District</h2>
      </div>
      <div className="link-section">
        <div className="property-grid">
          <div className="property-card featured">
            <img src="https://images.unsplash.com/photo-1596713751631-7732dfb95007?w=400&h=250&fit=crop" alt="Peak District Property" />
            <div className="property-details">
              <h3>2 Bedroom Cottage in Bakewell</h3>
              <p className="price">£450,000</p>
              <p className="location">📍 Bakewell, Derbyshire</p>
              <p className="description">Charming stone cottage with stunning Peak District views, period features, and private garden.</p>
              <div className="property-features">
                <span>🛏️ 2 beds</span>
                <span>🚿 1 bath</span>
                <span>🌿 Garden</span>
                <span>🚗 Parking</span>
              </div>
            </div>
          </div>
          
          <div className="property-card">
            <img src="https://images.unsplash.com/photo-1587713714775-fa70364f6445?w=400&h=250&fit=crop" alt="Hope Valley Property" />
            <div className="property-details">
              <h3>3 Bedroom House in Hope Valley</h3>
              <p className="price">£325,000</p>
              <p className="location">📍 Hope, Derbyshire</p>
              <p className="description">Modern family home in the heart of Peak District with excellent transport links.</p>
              <div className="property-features">
                <span>🛏️ 3 beds</span>
                <span>🚿 2 baths</span>
                <span>🚗 Garage</span>
                <span>🚌 Transport</span>
              </div>
            </div>
          </div>
          
          <div className="property-card">
            <img src="https://images.unsplash.com/photo-1594981005649-6ffab8d8a8d1?w=400&h=250&fit=crop" alt="Hathersage Farmhouse" />
            <div className="property-details">
              <h3>4 Bedroom Farmhouse</h3>
              <p className="price">£650,000</p>
              <p className="location">📍 Hathersage, Peak District</p>
              <p className="description">Converted farmhouse with extensive grounds and panoramic Peak District views.</p>
              <div className="property-features">
                <span>🛏️ 4 beds</span>
                <span>🚿 3 baths</span>
                <span>🌿 Large Garden</span>
                <span>🏚️ Outbuildings</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="content-header">
        <h2>💰 Cost Comparison: Phoenix vs Peak District</h2>
      </div>
      <div className="comparison-section">
        <div className="comparison-grid">
          <div className="comparison-card phoenix">
            <h3>🌵 Phoenix, Arizona</h3>
            <div className="cost-item">
              <span>🏠 Average Home Price:</span>
              <span>$550,000</span>
            </div>
            <div className="cost-item">
              <span>🛒 Living Costs:</span>
              <span>High</span>
            </div>
            <div className="cost-item">
              <span>🚗 Transport:</span>
              <span>Car Required</span>
            </div>
            <div className="cost-item">
              <span>🏥 Healthcare:</span>
              <span>Private Insurance</span>
            </div>
            <div className="cost-item">
              <span>🌤️ Weather:</span>
              <span>300+ sunny days</span>
            </div>
          </div>
          
          <div className="comparison-card peak-district">
            <h3>🏔️ Peak District, UK</h3>
            <div className="cost-item">
              <span>🏠 Average Home Price:</span>
              <span>£475,000 (+15%)</span>
            </div>
            <div className="cost-item">
              <span>🛒 Living Costs:</span>
              <span>Lower (-20%)</span>
            </div>
            <div className="cost-item">
              <span>🚌 Transport:</span>
              <span>Excellent Public</span>
            </div>
            <div className="cost-item">
              <span>🏥 Healthcare:</span>
              <span>Free NHS</span>
            </div>
            <div className="cost-item">
              <span>🌤️ Weather:</span>
              <span>120 sunny days</span>
            </div>
          </div>
        </div>
      </div>

      <div className="content-header">
        <h2>📋 Moving Checklist</h2>
      </div>
      <div className="checklist-section">
        <div className="checklist-grid">
          <div className="checklist-category">
            <h4>📄 Documentation (6 months ahead)</h4>
            <ul>
              <li>Apply for UK visa</li>
              <li>Get official document translations</li>
              <li>Register with HMRC for tax</li>
              <li>Obtain international driving permit</li>
            </ul>
          </div>
          
          <div className="checklist-category">
            <h4>📦 Logistics (2 months ahead)</h4>
            <ul>
              <li>Book international shipping</li>
              <li>Research pet import requirements</li>
              <li>Plan for climate differences</li>
              <li>Arrange temporary accommodation</li>
            </ul>
          </div>
          
          <div className="checklist-category">
            <h4>🏠 Integration (Upon arrival)</h4>
            <ul>
              <li>Register with GP and dentist</li>
              <li>Join local community groups</li>
              <li>Explore Peak District trails</li>
              <li>Register with local council</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="content-header">
        <h2>🔗 Essential Resources</h2>
      </div>
      <div className="link-section">
        <div className="link-grid">
          <a href="https://gov.uk/browse/visas-immigration" target="_blank" rel="noopener noreferrer" className="app-link featured">
            <div className="link-icon">🇬🇧</div>
            <div className="link-details">
              <div className="link-title">UK Government Visa Portal ⭐ OFFICIAL</div>
              <div className="link-desc">Official UK visa application and requirements</div>
            </div>
          </a>
          
          <a href="https://rightmove.co.uk/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🏠</div>
            <div className="link-details">
              <div className="link-title">Rightmove</div>
              <div className="link-desc">UK's largest property search website</div>
            </div>
          </a>
          
          <a href="https://zoopla.co.uk/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🔍</div>
            <div className="link-details">
              <div className="link-title">Zoopla</div>
              <div className="link-desc">Property prices and area information</div>
            </div>
          </a>
          
          <a href="https://peakdistrict.gov.uk/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🏔️</div>
            <div className="link-details">
              <div className="link-title">Peak District National Park</div>
              <div className="link-desc">Official Peak District information and guides</div>
            </div>
          </a>
          
          <a href="https://makemydrivefun.com" target="_blank" rel="noopener noreferrer" className="app-link featured">
            <div className="link-icon">🚗</div>
            <div className="link-details">
              <div className="link-title">Make My Drive Fun ⭐ ROUTE PLANNER</div>
              <div className="link-desc">Plan your journey with attractions and stops</div>
            </div>
          </a>
          
          <a href="https://nhs.uk/service-search" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🏥</div>
            <div className="link-details">
              <div className="link-title">NHS Service Finder</div>
              <div className="link-desc">Find local healthcare services</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );

  const QuickLinksHub = () => (
    <div className="application-content">
      <div className="content-header">
        <h2>🔗 Quick Access Hub</h2>
        <div className="quick-actions">
          <button className="action-btn" onClick={() => window.open('https://aiapply.co/', '_blank')}>
            🤖 AI Apply
          </button>
          <button className="action-btn" onClick={() => window.open('https://makemydrivefun.com', '_blank')}>
            🚗 Drive Fun
          </button>
        </div>
      </div>
      
      <div className="link-section">
        <div className="link-grid">
          <a href="https://aiapply.co/" target="_blank" rel="noopener noreferrer" className="app-link featured">
            <div className="link-icon">🤖</div>
            <div className="link-details">
              <div className="link-title">AI Apply ⭐ ESSENTIAL</div>
              <div className="link-desc">Automated job applications with AI</div>
            </div>
          </a>
          <a href="https://makemydrivefun.com" target="_blank" rel="noopener noreferrer" className="app-link featured">
            <div className="link-icon">🚗</div>
            <div className="link-details">
              <div className="link-title">Make My Drive Fun ⭐ FEATURED</div>
              <div className="link-desc">Ultimate route planning with attractions</div>
            </div>
          </a>
          <a href="https://remote.co/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🏠</div>
            <div className="link-details">
              <div className="link-title">Remote.co</div>
              <div className="link-desc">Premium remote job listings</div>
            </div>
          </a>
          <a href="https://restaurant.jobs/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🍽️</div>
            <div className="link-details">
              <div className="link-title">Restaurant Jobs</div>
              <div className="link-desc">Specialized restaurant job board</div>
            </div>
          </a>
          <a href="https://chat.openai.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🧠</div>
            <div className="link-details">
              <div className="link-title">ChatGPT</div>
              <div className="link-desc">AI assistant for productivity</div>
            </div>
          </a>
          <a href="https://claude.ai/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🤖</div>
            <div className="link-details">
              <div className="link-title">Claude AI</div>
              <div className="link-desc">Advanced AI for complex tasks</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );

  const renderApplicationContent = (appId) => {
    switch (appId) {
      case 'jobs': return <JobHunter />;
      case 'ai-tools': return <AIToolsHub />;
      case 'waitress-tools': return <WaitressToolkit />;
      case 'network': return <NetworkTools />;
      case 'relocation': return <RelocationHelper />;
      case 'quick-links': return <QuickLinksHub />;
      case 'finance': return (
        <div className="application-content">
          <div className="content-header">
            <h2>💰 Finance Manager</h2>
          </div>
          <div className="link-section">
            <div className="link-grid">
              <a href="https://mint.intuit.com/" target="_blank" rel="noopener noreferrer" className="app-link">
                <div className="link-icon">💸</div>
                <div className="link-details">
                  <div className="link-title">Mint</div>
                  <div className="link-desc">Personal finance management</div>
                </div>
              </a>
              <a href="https://www.personalcapital.com/" target="_blank" rel="noopener noreferrer" className="app-link">
                <div className="link-icon">📊</div>
                <div className="link-details">
                  <div className="link-title">Personal Capital</div>
                  <div className="link-desc">Investment tracking and planning</div>
                </div>
              </a>
            </div>
          </div>
        </div>
      );
      case 'music': return (
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
                    <div className="link-desc">Music streaming platform</div>
                  </div>
                </a>
                <a href="https://music.apple.com/" target="_blank" rel="noopener noreferrer" className="app-link">
                  <div className="link-icon">🍎</div>
                  <div className="link-details">
                    <div className="link-title">Apple Music</div>
                    <div className="link-desc">Apple's music service</div>
                  </div>
                </a>
                <a href="https://music.youtube.com/" target="_blank" rel="noopener noreferrer" className="app-link">
                  <div className="link-icon">📺</div>
                  <div className="link-details">
                    <div className="link-title">YouTube Music</div>
                    <div className="link-desc">Google's music platform</div>
                  </div>
                </a>
                <a href="https://soundcloud.com/" target="_blank" rel="noopener noreferrer" className="app-link">
                  <div className="link-icon">☁️</div>
                  <div className="link-details">
                    <div className="link-title">SoundCloud</div>
                    <div className="link-desc">Independent music platform</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      );
      case 'terminal': return (
        <div className="application-content">
          <div className="content-header">
            <h2>⚡ Terminal</h2>
          </div>
          <div style={{ backgroundColor: '#1e1e2e', padding: '20px', borderRadius: '8px', fontFamily: 'monospace' }}>
            <p style={{ color: '#94e2d5' }}>$ Welcome to ThriveRemote Terminal</p>
            <p style={{ color: '#a6adc8' }}>Type 'help' for available commands</p>
            <div style={{ color: '#89b4fa' }}>$ █</div>
          </div>
        </div>
      );
      default:
        return (
          <div className="application-content">
            <div className="content-header">
              <h2>🚀 {desktopApplications.find(app => app.id === appId)?.name || 'Application'}</h2>
            </div>
            <p>This application is in development. Content will be available soon!</p>
            <div className="link-section">
              <div className="link-grid">
                <a href="https://makemydrivefun.com" target="_blank" rel="noopener noreferrer" className="app-link">
                  <div className="link-icon">🚗</div>
                  <div className="link-details">
                    <div className="link-title">Make My Drive Fun</div>
                    <div className="link-desc">Route optimization and travel planning</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        );
    }
  };

  const FileManager = React.memo(() => (
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
      <div className="file-manager-content-scroll">
        <div className="file-manager-content">
          <div className="folder-grid">
            {fileManagerFolders.map((folder, index) => (
              <div key={index} className="folder-item" onClick={folder.onClick}>
                <div className="folder-icon" style={{ backgroundColor: folder.color }}>
                  <span>{folder.icon}</span>
                </div>
                <div className="folder-name">{folder.name}</div>
                <div className="folder-info">{folder.items} items</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="file-manager-footer">
        <div className="status-info">
          {fileManagerFolders.length} folders • {fileManagerFolders.reduce((sum, folder) => sum + folder.items, 0)} total items
        </div>
      </div>
    </div>
  ));

  // Quick Access Panel Component (Optimized to prevent excessive re-renders)
  const QuickAccessPanel = React.memo(() => {
    const [panelTipAmount, setPanelTipAmount] = useState(0);
    const [panelBillAmount, setPanelBillAmount] = useState(0);

    // Memoized calculation to prevent unnecessary re-renders
    const handleBillChange = React.useCallback((e) => {
      const amount = parseFloat(e.target.value) || 0;
      setPanelBillAmount(amount);
      setPanelTipAmount(amount * 0.18);
    }, []);

    return (
      <div className="quick-access-panel">
        <div className="panel-header">
          <h3>⚡ Quick Access</h3>
          <button className="panel-close" onClick={() => setShowQuickPanel(false)}>×</button>
        </div>
        <div className="quick-buttons">
          <button className="quick-btn" onClick={() => window.open('https://aiapply.co/', '_blank')}>
            🤖 AI Apply
          </button>
          <button className="quick-btn" onClick={() => window.open('https://makemydrivefun.com', '_blank')}>
            🚗 Drive Fun
          </button>
          <button className="quick-btn" onClick={() => window.open('https://remote.co/', '_blank')}>
            🏠 Remote Jobs
          </button>
          <button className="quick-btn" onClick={() => window.open('https://restaurant.jobs/', '_blank')}>
            🍽️ Server Jobs
          </button>
        </div>
        <div className="mini-tip-calc">
          <h4>💰 Quick Tip Calc</h4>
          <input 
            type="number" 
            placeholder="Bill amount"
            value={panelBillAmount || ''}
            onChange={handleBillChange}
          />
          <div className="tip-result">
            18% Tip: ${panelTipAmount.toFixed(2)}
          </div>
        </div>
      </div>
    );
  });

  // Applications Menu Component with Enhanced Scrolling
  const ApplicationsMenu = React.memo(() => {
    const categorizedApps = desktopApplications.reduce((acc, app) => {
      if (!acc[app.category]) {
        acc[app.category] = [];
      }
      acc[app.category].push(app);
      return acc;
    }, {});

    return (
      <div className="applications-menu">
        <div className="menu-header">
          <h3>📱 Applications</h3>
          <button className="menu-close" onClick={() => setShowApplications(false)}>×</button>
        </div>
        <div className="menu-categories-scroll">
          <div className="menu-categories">
            {Object.entries(categorizedApps).map(([category, apps]) => (
              <div key={category} className="category-section">
                <h4>{category.charAt(0).toUpperCase() + category.slice(1)}</h4>
                <div className="app-grid">
                  {apps.map(app => (
                    <div 
                      key={app.id} 
                      className="menu-app"
                      onClick={() => openApplication(app.id, app.name)}
                    >
                      <div className="app-icon">{app.icon}</div>
                      <div className="app-name">{app.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  });

  return (
    <div className="kde-desktop">
      {/* Desktop Background */}
      <div className="desktop-background"></div>

      {/* News Ticker */}
      <div className="news-ticker">
        <div className="ticker-content">
          <span className="ticker-icon">📰</span>
          <span className="ticker-text">{newsItems[currentNewsIndex]}</span>
        </div>
      </div>

      {/* Refresh Warning Button */}
      <div className="refresh-warning">
        <button className="refresh-btn" onClick={() => window.location.reload()}>
          ⚠️ Warning: Refresh me - Click Here - If windows get stuck
        </button>
      </div>

      {/* Desktop Widgets */}
      <div className="clock-widget desktop-widget">
        <div className="time-display">{currentTime.toLocaleTimeString()}</div>
        <div className="date-display">{currentTime.toLocaleDateString()}</div>
      </div>

      <div className="weather-widget desktop-widget">
        <div className="weather-icon">⛅</div>
        <div className="temperature">72°F</div>
        <div className="weather-desc">Partly Cloudy</div>
      </div>

      {/* All Desktop Shortcuts - Left Aligned */}
      <div className="primary-desktop-shortcuts">
        <div className="desktop-shortcut" onClick={() => openApplication('jobs', 'Job Hunter')}>
          <div className="shortcut-icon">💼</div>
          <div className="shortcut-label">Job Hunter</div>
        </div>
        <div className="desktop-shortcut" onClick={() => openApplication('ai-tools', 'AI Assistant Hub')}>
          <div className="shortcut-icon">🤖</div>
          <div className="shortcut-label">AI Tools</div>
        </div>
        <div className="desktop-shortcut" onClick={() => openApplication('relocation', 'Relocation Helper')}>
          <div className="shortcut-icon">🏠</div>
          <div className="shortcut-label">Peak District</div>
        </div>
        <div className="desktop-shortcut" onClick={() => openApplication('waitress-tools', 'Waitress Toolkit')}>
          <div className="shortcut-icon">🧮</div>
          <div className="shortcut-label">Waitress Tools</div>
        </div>
        <div className="desktop-shortcut" onClick={() => openApplication('music', 'Music Player')}>
          <div className="shortcut-icon">🎵</div>
          <div className="shortcut-label">Music Player</div>
        </div>
        <div className="desktop-shortcut" onClick={() => window.open('https://makemydrivefun.com', '_blank')}>
          <div className="shortcut-icon">🚗</div>
          <div className="shortcut-label">Drive Fun</div>
        </div>
      </div>

      {/* Windows */}
      {activeWindows.map(window => (
        <div
          key={window.id}
          className={`kde-window ${window.maximized ? 'maximized' : ''} ${window.minimized ? 'minimized' : ''}`}
          style={{
            left: window.position.x,
            top: window.position.y,
            width: window.size.width,
            height: window.size.height,
            zIndex: window.zIndex
          }}
          onClick={(e) => handleWindowClick(e, window.id)}
        >
          <div className="window-titlebar" onMouseDown={(e) => handleMouseDown(e, window.id)}>
            <div className="window-title">
              <span className="window-icon">{desktopApplications.find(app => app.id === window.app)?.icon || '📄'}</span>
              <span className="title-text">{window.title}</span>
            </div>
            <div className="window-controls">
              <button className="window-control minimize" onClick={() => minimizeWindow(window.id)}>−</button>
              <button className="window-control maximize" onClick={() => maximizeWindow(window.id)}>□</button>
              <button className="window-control close" onClick={() => closeWindow(window.id)}>×</button>
            </div>
          </div>
          <div className="window-content">
            {window.id === 'files' ? <FileManager /> : renderApplicationContent(window.app)}
          </div>
          <div className="window-resize-handle" onMouseDown={(e) => handleResizeStart(e, window.id)}></div>
        </div>
      ))}

      {/* Applications Menu */}
      {showApplications && <ApplicationsMenu />}

      {/* Taskbar */}
      <div className="kde-taskbar">
        <div className="taskbar-left">
          <button className="app-launcher" onClick={() => setShowApplications(!showApplications)}>
            <span className="launcher-icon">⚡</span>
          </button>
          <button className="taskbar-app" onClick={() => openApplication('files', 'File Manager')}>📁</button>
          <button className="taskbar-app" onClick={() => openApplication('terminal', 'Terminal')}>⚡</button>
          <button className="taskbar-app" onClick={() => openApplication('jobs', 'Job Hunter')}>💼</button>
          <button className="taskbar-app" onClick={() => openApplication('ai-tools', 'AI Tools')}>🤖</button>
        </div>

        <div className="taskbar-center">
          {activeWindows.filter(w => !w.minimized).map(window => (
            <div key={window.id} className={`taskbar-window ${!window.minimized ? 'active' : ''}`}>
              <span className="window-icon">{desktopApplications.find(app => app.id === window.app)?.icon || '📄'}</span>
              <span className="window-title-short">{window.title}</span>
            </div>
          ))}
          {minimizedWindows.map(windowId => {
            const window = activeWindows.find(w => w.id === windowId);
            return window ? (
              <div 
                key={windowId} 
                className="taskbar-window minimized"
                onClick={() => minimizeWindow(windowId)}
              >
                <span className="window-icon">{desktopApplications.find(app => app.id === window.app)?.icon || '📄'}</span>
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