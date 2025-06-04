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

  // Calculate tip amount
  useEffect(() => {
    setTipAmount((billAmount * tipPercentage) / 100);
  }, [billAmount, tipPercentage]);

  // Enhanced Desktop Applications with more categories
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
          <a href="https://justremote.co/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🎯</div>
            <div className="link-details">
              <div className="link-title">JustRemote</div>
              <div className="link-desc">Remote-first companies only</div>
            </div>
          </a>
          <a href="https://remotework.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🌍</div>
            <div className="link-details">
              <div className="link-title">RemoteWork.com</div>
              <div className="link-desc">Global remote opportunities</div>
            </div>
          </a>
          <a href="https://flexjobs.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🕐</div>
            <div className="link-details">
              <div className="link-title">FlexJobs</div>
              <div className="link-desc">Flexible & remote work (screened jobs)</div>
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
          <a href="https://guru.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🧙</div>
            <div className="link-details">
              <div className="link-title">Guru</div>
              <div className="link-desc">Professional services marketplace</div>
            </div>
          </a>
          <a href="https://99designs.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🎨</div>
            <div className="link-details">
              <div className="link-title">99designs</div>
              <div className="link-desc">Design competitions & creative work</div>
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
          <a href="https://www.jasper.ai/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">✍️</div>
            <div className="link-details">
              <div className="link-title">Jasper AI</div>
              <div className="link-desc">AI content creator for marketing</div>
            </div>
          </a>
          <a href="https://www.copy.ai/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">📝</div>
            <div className="link-details">
              <div className="link-title">Copy.ai</div>
              <div className="link-desc">AI copywriting assistant</div>
            </div>
          </a>
          <a href="https://runwayml.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🎬</div>
            <div className="link-details">
              <div className="link-title">Runway ML</div>
              <div className="link-desc">AI video and image generation</div>
            </div>
          </a>
          <a href="https://midjourney.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🎨</div>
            <div className="link-details">
              <div className="link-title">Midjourney</div>
              <div className="link-desc">AI image generation tool</div>
            </div>
          </a>
          <a href="https://www.notion.so/product/ai" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">📋</div>
            <div className="link-details">
              <div className="link-title">Notion AI</div>
              <div className="link-desc">AI-powered workspace assistant</div>
            </div>
          </a>
          <a href="https://www.grammarly.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">📖</div>
            <div className="link-details">
              <div className="link-title">Grammarly</div>
              <div className="link-desc">AI writing assistant and grammar checker</div>
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
        <h3>🏨 Major Restaurant Chains</h3>
      </div>
      <div className="link-section">
        <div className="link-grid">
          <a href="https://starbucks.com/careers/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">☕</div>
            <div className="link-details">
              <div className="link-title">Starbucks Careers</div>
              <div className="link-desc">Coffee shop opportunities + benefits</div>
            </div>
          </a>
          <a href="https://mcdonalds.com/careers" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🍟</div>
            <div className="link-details">
              <div className="link-title">McDonald's Careers</div>
              <div className="link-desc">Fast food service jobs + advancement</div>
            </div>
          </a>
          <a href="https://jobs.chipotle.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🌯</div>
            <div className="link-details">
              <div className="link-title">Chipotle Jobs</div>
              <div className="link-desc">Fast casual restaurant opportunities</div>
            </div>
          </a>
          <a href="https://careers.subway.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🥪</div>
            <div className="link-details">
              <div className="link-title">Subway Careers</div>
              <div className="link-desc">Sandwich artist positions</div>
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
        <h3>🛍️ Restaurant Uniforms & Supplies</h3>
      </div>
      <div className="link-section">
        <div className="link-grid">
          <a href="https://www.chefwear.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">👕</div>
            <div className="link-details">
              <div className="link-title">ChefWear</div>
              <div className="link-desc">Professional restaurant uniforms & apparel</div>
            </div>
          </a>
          <a href="https://www.happychef.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">👨‍🍳</div>
            <div className="link-details">
              <div className="link-title">Happy Chef Uniforms</div>
              <div className="link-desc">Complete line of chef & server uniforms</div>
            </div>
          </a>
          <a href="https://www.shoesforcrews.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">👟</div>
            <div className="link-details">
              <div className="link-title">Shoes for Crews</div>
              <div className="link-desc">Non-slip restaurant shoes & safety footwear</div>
            </div>
          </a>
          <a href="https://www.amazon.com/s?k=server+apron" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🛒</div>
            <div className="link-details">
              <div className="link-title">Server Supplies</div>
              <div className="link-desc">Aprons, order pads, pens & server tools</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );

  const NetworkTools = () => (
    <div className="application-content">
      <div className="content-header">
        <h2>🗺️ Travel & Navigation Tools</h2>
        <div className="quick-actions">
          <button className="action-btn" onClick={() => window.open('https://makemydrivefun.com', '_blank')}>
            🚗 Plan Fun Drive
          </button>
          <button className="action-btn" onClick={() => window.open('https://speedtest.net/', '_blank')}>
            ⚡ Test Speed
          </button>
        </div>
      </div>
      
      <div className="link-section">
        <div className="link-grid">
          <a href="https://makemydrivefun.com" target="_blank" rel="noopener noreferrer" className="app-link featured">
            <div className="link-icon">🚗</div>
            <div className="link-details">
              <div className="link-title">Make My Drive Fun ⭐ FEATURED</div>
              <div className="link-desc">Ultimate route optimizer & trip planner with attractions</div>
            </div>
          </a>
          <a href="https://waze.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🗺️</div>
            <div className="link-details">
              <div className="link-title">Waze</div>
              <div className="link-desc">Community-driven navigation with real-time traffic</div>
            </div>
          </a>
          <a href="https://maps.google.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">📍</div>
            <div className="link-details">
              <div className="link-title">Google Maps</div>
              <div className="link-desc">Universal navigation & business discovery</div>
            </div>
          </a>
          <a href="https://gasbuddy.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">⛽</div>
            <div className="link-details">
              <div className="link-title">GasBuddy</div>
              <div className="link-desc">Find cheapest gas prices on your route</div>
            </div>
          </a>
          <a href="https://roadtrippers.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🛣️</div>
            <div className="link-details">
              <div className="link-title">Roadtrippers</div>
              <div className="link-desc">Discover amazing places along your route</div>
            </div>
          </a>
          <a href="https://yelp.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">⭐</div>
            <div className="link-details">
              <div className="link-title">Yelp</div>
              <div className="link-desc">Find local restaurants & businesses</div>
            </div>
          </a>
        </div>
      </div>

      <div className="content-header">
        <h2>📡 Network Diagnostics & Tools</h2>
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
          <a href="https://pingdom.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">📊</div>
            <div className="link-details">
              <div className="link-title">Pingdom</div>
              <div className="link-desc">Website monitoring & performance testing</div>
            </div>
          </a>
          <a href="https://gtmetrix.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">📈</div>
            <div className="link-details">
              <div className="link-title">GTmetrix</div>
              <div className="link-desc">Website speed & performance analysis</div>
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
          <button className="action-btn" onClick={() => window.open('https://remote.co/', '_blank')}>
            🏠 Remote Jobs
          </button>
        </div>
      </div>
      
      <div className="link-section">
        <h3>⚡ Most Used Links</h3>
        <div className="link-grid">
          <a href="https://aiapply.co/" target="_blank" rel="noopener noreferrer" className="app-link featured">
            <div className="link-icon">🤖</div>
            <div className="link-details">
              <div className="link-title">AI Apply</div>
              <div className="link-desc">Automated job applications</div>
            </div>
          </a>
          <a href="https://makemydrivefun.com" target="_blank" rel="noopener noreferrer" className="app-link featured">
            <div className="link-icon">🚗</div>
            <div className="link-details">
              <div className="link-title">Make My Drive Fun</div>
              <div className="link-desc">Route planning & attractions</div>
            </div>
          </a>
          <a href="https://remote.co/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🏠</div>
            <div className="link-details">
              <div className="link-title">Remote.co</div>
              <div className="link-desc">Premium remote jobs</div>
            </div>
          </a>
          <a href="https://restaurant.jobs/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🍽️</div>
            <div className="link-details">
              <div className="link-title">Restaurant Jobs</div>
              <div className="link-desc">Waitress & server positions</div>
            </div>
          </a>
          <a href="https://chat.openai.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🧠</div>
            <div className="link-details">
              <div className="link-title">ChatGPT</div>
              <div className="link-desc">AI assistant for everything</div>
            </div>
          </a>
          <a href="https://speedtest.net/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">⚡</div>
            <div className="link-details">
              <div className="link-title">Speedtest</div>
              <div className="link-desc">Internet speed test</div>
            </div>
          </a>
        </div>
      </div>

      <div className="link-section">
        <h3>📱 Essential Apps & Tools</h3>
        <div className="link-grid">
          <a href="https://spotify.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">🎵</div>
            <div className="link-details">
              <div className="link-title">Spotify</div>
              <div className="link-desc">Music streaming</div>
            </div>
          </a>
          <a href="https://gmail.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">📧</div>
            <div className="link-details">
              <div className="link-title">Gmail</div>
              <div className="link-desc">Email management</div>
            </div>
          </a>
          <a href="https://calendar.google.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">📅</div>
            <div className="link-details">
              <div className="link-title">Google Calendar</div>
              <div className="link-desc">Schedule management</div>
            </div>
          </a>
          <a href="https://drive.google.com/" target="_blank" rel="noopener noreferrer" className="app-link">
            <div className="link-icon">💾</div>
            <div className="link-details">
              <div className="link-title">Google Drive</div>
              <div className="link-desc">Cloud storage</div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );

  // Rest of the application content components...
  const renderApplicationContent = (appId) => {
    switch (appId) {
      case 'jobs': return <JobHunter />;
      case 'ai-tools': return <AIToolsHub />;
      case 'waitress-tools': return <WaitressToolkit />;
      case 'network': return <NetworkTools />;
      case 'quick-links': return <QuickLinksHub />;
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
      <div className="file-manager-footer">
        <div className="status-info">
          {fileManagerFolders.length} folders • {fileManagerFolders.reduce((sum, folder) => sum + folder.items, 0)} total items
        </div>
      </div>
    </div>
  );

  // Quick Access Panel Component
  const QuickAccessPanel = () => (
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
          placeholder="Bill $" 
          value={billAmount} 
          onChange={(e) => setBillAmount(parseFloat(e.target.value) || 0)}
        />
        <div className="tip-result">Tip (18%): ${((billAmount * 18) / 100).toFixed(2)}</div>
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

      {/* Quick Access Panel */}
      {showQuickPanel && <QuickAccessPanel />}

      {/* Desktop Shortcuts */}
      <div className="desktop-shortcuts">
        <div className="desktop-shortcut" onClick={() => window.open('https://aiapply.co/', '_blank')}>
          <div className="shortcut-icon">🤖</div>
          <div className="shortcut-label">AI Apply</div>
        </div>
        <div className="desktop-shortcut" onClick={() => window.open('https://makemydrivefun.com', '_blank')}>
          <div className="shortcut-icon">🚗</div>
          <div className="shortcut-label">Drive Fun</div>
        </div>
        <div className="desktop-shortcut" onClick={() => window.open('https://remote.co/', '_blank')}>
          <div className="shortcut-icon">🏠</div>
          <div className="shortcut-label">Remote Jobs</div>
        </div>
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

      {/* Enhanced Taskbar */}
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
          <button className="taskbar-app" onClick={() => openApplication('jobs', 'Job Hunter')}>
            <span>💼</span>
          </button>
          <button className="taskbar-app" onClick={() => openApplication('waitress-tools', 'Waitress Toolkit')}>
            <span>🧮</span>
          </button>
          <button className="taskbar-app" onClick={() => openApplication('music', 'Music Player')}>
            <span>🎵</span>
          </button>
          <button className="taskbar-app quick-access-btn" onClick={() => setShowQuickPanel(!showQuickPanel)}>
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