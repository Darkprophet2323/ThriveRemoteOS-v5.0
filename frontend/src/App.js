import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

const App = () => {
  // System state - simplified for fast loading
  const [systemInitialized, setSystemInitialized] = useState(true); // Start initialized
  const [currentTheme, setCurrentTheme] = useState('cosmos');
  const [networkConnected, setNetworkConnected] = useState(true);
  const [securityLevel, setSecurityLevel] = useState('QUANTUM');

  // Enhanced visual state
  const [starField, setStarField] = useState([]);
  const [colorPhase, setColorPhase] = useState(0);
  const [pulseIntensity, setPulseIntensity] = useState(0.5);
  const [nebulaDrift, setNebulaDrift] = useState(0);
  
  // Application state
  const [activeWindows, setActiveWindows] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [terminalAccess, setTerminalAccess] = useState(false);
  const [userStats, setUserStats] = useState({
    streakDays: 15,
    totalPoints: 2847,
    quantumEntanglements: 23,
    dimensionsAccessed: 7,
    dataHarvested: '∞ Petabytes'
  });

  // Cinematic color palettes using color theory
  const cinematicThemes = {
    cosmos: {
      name: 'COSMIC DEPTHS',
      primary: '#00d4ff',
      secondary: '#7c3aed', 
      accent: '#f59e0b',
      nebula: '#ec4899',
      quantum: '#10b981',
      background: 'radial-gradient(ellipse at center, #0f0a1e 0%, #1a0a2e 35%, #0d1b2a 100%)',
      windowBg: 'rgba(15, 10, 30, 0.95)',
      textColor: '#00d4ff'
    },
    stellar: {
      name: 'STELLAR FORGE',
      primary: '#ff6b35',
      secondary: '#004e89',
      accent: '#fcdc00',
      nebula: '#ff006e',
      quantum: '#8338ec',
      background: 'radial-gradient(ellipse at center, #1a0a00 0%, #3d1a00 35%, #000814 100%)',
      windowBg: 'rgba(26, 10, 0, 0.95)',
      textColor: '#ff6b35'
    },
    aurora: {
      name: 'AURORA BOREALIS',
      primary: '#39ff14',
      secondary: '#ff1493',
      accent: '#00ffff',
      nebula: '#9400d3',
      quantum: '#ffd700',
      background: 'radial-gradient(ellipse at center, #001122 0%, #003344 35%, #000a0a 100%)',
      windowBg: 'rgba(0, 17, 34, 0.95)',
      textColor: '#39ff14'
    },
    quantum: {
      name: 'QUANTUM REALM',
      primary: '#e0aaff',
      secondary: '#c77dff',
      accent: '#7209b7',
      nebula: '#560bad',
      quantum: '#f72585',
      background: 'radial-gradient(ellipse at center, #240046 0%, #3c096c 35%, #10002b 100%)',
      windowBg: 'rgba(36, 0, 70, 0.95)',
      textColor: '#e0aaff'
    }
  };

  // Initialize star field for parallax effect - simplified for performance
  useEffect(() => {
    const stars = Array.from({ length: 100 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      brightness: Math.random(),
      color: Math.random() > 0.8 ? cinematicThemes[currentTheme].accent : '#ffffff'
    }));
    setStarField(stars);
  }, [currentTheme]);

  // Simplified cosmic effects for better performance
  useEffect(() => {
    const interval = setInterval(() => {
      setColorPhase(prev => (prev + 0.02) % (Math.PI * 2));
      setPulseIntensity(prev => 0.3 + Math.sin(Date.now() * 0.003) * 0.2);
      setNebulaDrift(prev => prev + 0.1);
    }, 100); // Less frequent updates

    return () => clearInterval(interval);
  }, []);

  // Time update
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Enhanced window management with cosmic effects
  const openWindow = (windowId, title, component, requiresAuth = false) => {
    if (requiresAuth && !terminalAccess) {
      setNotifications(prev => [...prev, {
        id: 'quantum_denied',
        type: 'warning',
        title: '⚠️ QUANTUM ACCESS REQUIRED',
        message: 'NEURAL AUTHORIZATION NEEDED - ACTIVATE CONSCIOUSNESS LINK',
        timestamp: new Date().toISOString()
      }]);
      return;
    }

    if (!activeWindows.find(w => w.id === windowId)) {
      const newWindow = {
        id: windowId,
        title,
        component,
        minimized: false,
        position: { 
          x: Math.max(50, 50 + (activeWindows.length * 60)), 
          y: Math.max(50, 50 + (activeWindows.length * 60)) 
        },
        zIndex: 1000 + activeWindows.length,
        size: { width: 1000, height: 700 },
        opening: true,
        classified: requiresAuth
      };
      
      setActiveWindows(prev => [...prev, newWindow]);
      
      setTimeout(() => {
        setActiveWindows(windows => windows.map(w => 
          w.id === windowId ? { ...w, opening: false } : w
        ));
      }, 500);
    }
  };

  const closeWindow = (windowId) => {
    setActiveWindows(windows => windows.map(w => 
      w.id === windowId ? { ...w, closing: true } : w
    ));
    
    setTimeout(() => {
      setActiveWindows(windows => windows.filter(w => w.id !== windowId));
    }, 300);
  };

  const minimizeWindow = (windowId) => {
    setActiveWindows(activeWindows.map(w => 
      w.id === windowId ? { ...w, minimized: !w.minimized } : w
    ));
  };

  const bringToFront = (windowId) => {
    const maxZ = Math.max(...activeWindows.map(w => w.zIndex), 1000);
    setActiveWindows(activeWindows.map(w => 
      w.id === windowId ? { ...w, zIndex: maxZ + 1 } : w
    ));
  };

  // Enhanced theme changer with psychological engagement
  const changeTheme = (newTheme) => {
    setNotifications(prev => [...prev, {
      id: 'dimensional_shift',
      type: 'quantum',
      title: '🌌 DIMENSIONAL SHIFT INITIATED',
      message: 'REALITY MATRIX RECALIBRATING...',
      timestamp: new Date().toISOString()
    }]);

    const confirmAuth = prompt("🔮 CONSCIOUSNESS INTERFACE ACTIVATED\nEnter 'TRANSCEND' to shift dimensional reality:");
    if (confirmAuth?.toUpperCase() === 'TRANSCEND') {
      setCurrentTheme(newTheme);
      setNotifications(prev => [...prev, {
        id: 'reality_shifted',
        type: 'success',
        title: '✨ REALITY MATRIX UPDATED',
        message: `DIMENSIONAL PHASE: ${cinematicThemes[newTheme].name}`,
        timestamp: new Date().toISOString()
      }]);
    } else {
      setNotifications(prev => [...prev, {
        id: 'consciousness_rejected',
        type: 'error',
        title: '🚫 CONSCIOUSNESS LINK FAILED',
        message: 'NEURAL PATHWAY AUTHENTICATION DENIED',
        timestamp: new Date().toISOString()
      }]);
    }
  };

  // Terminal authorization with enhanced security theater
  const requestTerminalAccess = () => {
    const authCode = prompt("🧠 NEURAL INTERFACE ACTIVATION\nEnter 'AWAKEN' to unlock quantum consciousness:");
    if (authCode?.toUpperCase() === 'AWAKEN') {
      setTerminalAccess(true);
      setSecurityLevel('TRANSCENDENT');
      setNotifications(prev => [...prev, {
        id: 'consciousness_unlocked',
        type: 'quantum',
        title: '🧠 CONSCIOUSNESS MATRIX UNLOCKED',
        message: 'QUANTUM SYSTEMS NOW ACCESSIBLE VIA NEURAL LINK',
        timestamp: new Date().toISOString()
      }]);
    }
  };

  // Network portal applications with enhanced descriptions
  const portalApplications = [
    { id: 'quantum_jobs', name: 'Quantum Job Portal', icon: '💫', component: 'QuantumJobs', classified: false, description: 'AI-powered job search & applications' },
    { id: 'cosmic_scanner', name: 'Cosmic Network Scanner', icon: '🌌', component: 'CosmicScanner', classified: false, description: 'Network analysis & speed testing' },
    { id: 'dimensional_relocation', name: 'Dimensional Relocation', icon: '🌠', component: 'DimensionalRelocation', classified: false, description: 'Arizona→Peak District migration tools' },
    { id: 'stellar_finance', name: 'Stellar Finance Tracker', icon: '⭐', component: 'StellarFinance', classified: false, description: 'Personal finance & investment tools' },
    { id: 'neural_tasks', name: 'Neural Task Matrix', icon: '🧠', component: 'NeuralTasks', classified: false, description: 'Project management & productivity' },
    { id: 'cosmic_learning', name: 'Cosmic Learning Hub', icon: '🚀', component: 'CosmicLearning', classified: false, description: 'Online courses & skill development' },
    { id: 'remote_workspace', name: 'Remote Workspace Hub', icon: '🏢', component: 'RemoteWorkspace', classified: false, description: 'Coworking & virtual office tools' },
    { id: 'career_optimizer', name: 'Career Optimization Engine', icon: '📊', component: 'CareerOptimizer', classified: false, description: 'Resume builders & interview prep' },
    { id: 'quantum_terminal', name: 'Quantum Terminal', icon: '⚡', component: 'QuantumTerminal', classified: true, description: 'Advanced developer tools & API access' },
    { id: 'reality_analyzer', name: 'Reality Data Analyzer', icon: '🔮', component: 'RealityAnalyzer', classified: true, description: 'Analytics & business intelligence' },
    { id: 'consciousness_vault', name: 'Consciousness Vault', icon: '🔐', component: 'ConsciousnessVault', classified: true, description: 'Security & privacy tools' },
    { id: 'quantum_monitor', name: 'Quantum System Monitor', icon: '📡', component: 'QuantumMonitor', classified: true, description: 'System monitoring & optimization' }
  ];

  // COMPREHENSIVE HYPERLINK COMPONENTS WITH WORKING LINKS

  const QuantumJobs = () => (
    <div className="cosmic-interface">
      <div className="cosmic-header">
        <span className="cosmic-prompt">quantum@jobs:~$</span> scanning-interdimensional-opportunities --ai-powered
      </div>
      
      <div className="cosmic-tools-section">
        <h3>🤖 AI-POWERED JOB APPLICATIONS</h3>
        <div className="cosmic-tool-grid">
          <a href="https://aiapply.co/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🤖 AI Apply - Automated Applications
          </a>
          <a href="https://www.sonara.ai/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🎯 Sonara - AI Job Hunter
          </a>
          <a href="https://teal.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            💼 Teal - Career Growth Platform
          </a>
          <a href="https://huntr.co/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            📋 Huntr - Job Application Tracker
          </a>
        </div>
      </div>

      <div className="cosmic-tools-section">
        <h3>🌐 REMOTE JOB PORTALS</h3>
        <div className="cosmic-tool-grid">
          <a href="https://remote.co/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🏠 Remote.co - Premium Remote Jobs
          </a>
          <a href="https://weworkremotely.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            💻 We Work Remotely - Top Portal
          </a>
          <a href="https://remotive.io/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            📧 Remotive - Weekly Job Newsletter
          </a>
          <a href="https://angel.co/jobs" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            👼 AngelList - Startup Jobs
          </a>
          <a href="https://nomadjobs.io/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            ✈️ Nomad Jobs - Location Independent
          </a>
          <a href="https://justremote.co/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🎯 JustRemote - Remote-First Companies
          </a>
          <a href="https://remotework.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🌍 RemoteWork.com - Global Opportunities
          </a>
          <a href="https://flexjobs.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🕐 FlexJobs - Flexible & Remote
          </a>
        </div>
      </div>

      <div className="cosmic-tools-section">
        <h3>💼 FREELANCE PLATFORMS</h3>
        <div className="cosmic-tool-grid">
          <a href="https://upwork.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            ⬆️ Upwork - Global Freelance Platform
          </a>
          <a href="https://fiverr.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🎯 Fiverr - Gig Economy Leader
          </a>
          <a href="https://freelancer.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            💰 Freelancer - Project Marketplace
          </a>
          <a href="https://toptal.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🏆 Toptal - Elite Developers
          </a>
          <a href="https://guru.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🧙 Guru - Professional Services
          </a>
          <a href="https://99designs.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🎨 99designs - Design Competitions
          </a>
        </div>
      </div>

      <div className="cosmic-tools-section">
        <h3>🔍 JOB SEARCH ENGINES</h3>
        <div className="cosmic-tool-grid">
          <a href="https://indeed.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🔍 Indeed - World's #1 Job Site
          </a>
          <a href="https://linkedin.com/jobs/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            💼 LinkedIn Jobs - Professional Network
          </a>
          <a href="https://glassdoor.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🏢 Glassdoor - Company Reviews
          </a>
          <a href="https://monster.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            👹 Monster - Career Resources
          </a>
          <a href="https://ziprecruiter.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            📫 ZipRecruiter - One-Click Apply
          </a>
          <a href="https://dice.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🎲 Dice - Tech Jobs Specialist
          </a>
        </div>
      </div>
    </div>
  );

  const CosmicScanner = () => (
    <div className="cosmic-interface">
      <div className="cosmic-header">
        <span className="cosmic-prompt">quantum@scanner:~$</span> initiate-multidimensional-scan --reality-layers=∞
      </div>
      
      <div className="cosmic-tools-section">
        <h3>🌌 QUANTUM NETWORK ANALYSIS</h3>
        <div className="cosmic-tool-grid">
          <a href="https://speedtest.net/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            ⚡ Speedtest - Internet Speed Test
          </a>
          <a href="https://downdetector.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🔍 DownDetector - Service Status
          </a>
          <a href="https://whatismyipaddress.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🌍 What's My IP - Location & Security
          </a>
          <a href="https://mxtoolbox.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🛠️ MX Toolbox - Network Diagnostics
          </a>
          <a href="https://www.pingdom.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            📊 Pingdom - Website Monitoring
          </a>
          <a href="https://www.gtmetrix.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            📈 GTmetrix - Performance Analysis
          </a>
        </div>
      </div>

      <div className="cosmic-tools-section">
        <h3>🚀 INTERSTELLAR NAVIGATION</h3>
        <div className="cosmic-tool-grid">
          <a href="https://makemydrivefun.com" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🌌 Make My Drive Fun - Route Optimizer
          </a>
          <a href="https://waze.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🗺️ Waze - Community Navigation
          </a>
          <a href="https://maps.google.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            📍 Google Maps - Universal Navigation
          </a>
          <a href="https://gasbuddy.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            ⛽ GasBuddy - Fuel Price Tracker
          </a>
          <a href="https://roadtrippers.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🛣️ Roadtrippers - Trip Planner
          </a>
          <a href="https://yelp.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            ⭐ Yelp - Local Business Finder
          </a>
        </div>
      </div>

      <div className="cosmic-tools-section">
        <h3>🔧 DEVELOPER TOOLS</h3>
        <div className="cosmic-tool-grid">
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🐙 GitHub - Code Repository
          </a>
          <a href="https://stackoverflow.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            💬 Stack Overflow - Developer Q&A
          </a>
          <a href="https://codepen.io/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            ✏️ CodePen - Frontend Playground
          </a>
          <a href="https://replit.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🖥️ Replit - Online IDE
          </a>
        </div>
      </div>
    </div>
  );

  const DimensionalRelocation = () => (
    <div className="cosmic-interface">
      <div className="cosmic-header">
        <span className="cosmic-prompt">quantum@relocation:~$</span> arizona-to-peakdistrict --dimensional-bridge
      </div>
      
      <div className="cosmic-tools-section">
        <h3>🏡 UK PROPERTY PORTALS</h3>
        <div className="cosmic-tool-grid">
          <a href="https://rightmove.co.uk/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🏠 Rightmove - UK's #1 Property Portal
          </a>
          <a href="https://zoopla.co.uk/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🔍 Zoopla - Property Search & Values
          </a>
          <a href="https://onthemarket.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            📍 OnTheMarket - Property Listings
          </a>
          <a href="https://primelocation.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            👑 PrimeLocation - Premium Properties
          </a>
          <a href="https://spareroom.co.uk/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🛏️ SpareRoom - Flatshare & Rentals
          </a>
          <a href="https://openrent.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🔓 OpenRent - Direct Landlord Rentals
          </a>
        </div>
      </div>

      <div className="cosmic-tools-section">
        <h3>🇬🇧 UK IMMIGRATION & VISA</h3>
        <div className="cosmic-tool-grid">
          <a href="https://gov.uk/browse/visas-immigration" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🏛️ Gov.UK - Official Visa Information
          </a>
          <a href="https://gov.uk/skilled-worker-visa" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            💼 Skilled Worker Visa Guide
          </a>
          <a href="https://gov.uk/global-talent-visa" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🌟 Global Talent Visa
          </a>
          <a href="https://britishcouncil.org/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🇬🇧 British Council - Education & Culture
          </a>
          <a href="https://gov.uk/life-in-the-uk-test" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            📚 Life in the UK Test
          </a>
          <a href="https://gov.uk/english-language" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🗣️ English Language Requirements
          </a>
        </div>
      </div>

      <div className="cosmic-tools-section">
        <h3>💰 COST OF LIVING COMPARISON</h3>
        <div className="cosmic-tool-grid">
          <a href="https://numbeo.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            📊 Numbeo - Cost of Living Database
          </a>
          <a href="https://expatistan.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🌍 Expatistan - City Cost Comparison
          </a>
          <a href="https://teleport.org/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🚀 Teleport - City Quality of Life
          </a>
          <a href="https://xe.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            💱 XE Currency - Exchange Rates
          </a>
          <a href="https://wise.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            💸 Wise - International Money Transfer
          </a>
          <a href="https://salary.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            💼 Salary.com - Compensation Data
          </a>
        </div>
      </div>

      <div className="cosmic-tools-section">
        <h3>📦 INTERNATIONAL MOVING</h3>
        <div className="cosmic-tool-grid">
          <a href="https://sirelo.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            📦 Sirelo - Moving Company Quotes
          </a>
          <a href="https://movehub.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🏠 MoveHub - Relocation Resources
          </a>
          <a href="https://internationalmovers.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🌍 International Movers Network
          </a>
          <a href="https://shipito.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            📮 Shipito - Package Forwarding
          </a>
        </div>
      </div>
    </div>
  );

  const StellarFinance = () => (
    <div className="cosmic-interface">
      <div className="cosmic-header">
        <span className="cosmic-prompt">quantum@finance:~$</span> optimizing-stellar-resources --dimensional-wealth
      </div>
      
      <div className="cosmic-tools-section">
        <h3>💰 PERSONAL FINANCE MANAGEMENT</h3>
        <div className="cosmic-tool-grid">
          <a href="https://mint.intuit.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🌱 Mint - Free Budget Tracker
          </a>
          <a href="https://youneedabudget.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            📊 YNAB - You Need A Budget
          </a>
          <a href="https://personalcapital.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            💎 Personal Capital - Wealth Management
          </a>
          <a href="https://pocketguard.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🛡️ PocketGuard - Spending Tracker
          </a>
          <a href="https://everydollar.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            💵 EveryDollar - Zero-Based Budget
          </a>
          <a href="https://goodbudget.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            📱 Goodbudget - Envelope Method
          </a>
        </div>
      </div>

      <div className="cosmic-tools-section">
        <h3>📈 INVESTMENT PLATFORMS</h3>
        <div className="cosmic-tool-grid">
          <a href="https://robinhood.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🏹 Robinhood - Commission-Free Trading
          </a>
          <a href="https://schwab.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🏦 Charles Schwab - Full-Service Broker
          </a>
          <a href="https://fidelity.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            💼 Fidelity - Investment Management
          </a>
          <a href="https://vanguard.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            📊 Vanguard - Low-Cost Index Funds
          </a>
          <a href="https://etrade.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            💻 E*TRADE - Online Trading Platform
          </a>
          <a href="https://tdameritrade.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            📈 TD Ameritrade - Advanced Trading
          </a>
        </div>
      </div>

      <div className="cosmic-tools-section">
        <h3>🏦 BANKING & SAVINGS</h3>
        <div className="cosmic-tool-grid">
          <a href="https://ally.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🤝 Ally Bank - High-Yield Savings
          </a>
          <a href="https://marcus.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🏛️ Marcus by Goldman Sachs
          </a>
          <a href="https://capitalone.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            1️⃣ Capital One - Digital Banking
          </a>
          <a href="https://discover.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🔍 Discover Bank - Cashback Banking
          </a>
          <a href="https://chime.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🔔 Chime - Mobile-First Banking
          </a>
          <a href="https://simple.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            ⭕ Simple - Budgeting Bank
          </a>
        </div>
      </div>

      <div className="cosmic-tools-section">
        <h3>💳 CREDIT & LOANS</h3>
        <div className="cosmic-tool-grid">
          <a href="https://creditkarma.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            📊 Credit Karma - Free Credit Scores
          </a>
          <a href="https://experian.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            📈 Experian - Credit Monitoring
          </a>
          <a href="https://sofi.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🎓 SoFi - Student Loan Refinancing
          </a>
          <a href="https://lendingtree.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🌳 LendingTree - Loan Marketplace
          </a>
        </div>
      </div>
    </div>
  );

  const NeuralTasks = () => (
    <div className="cosmic-interface">
      <div className="cosmic-header">
        <span className="cosmic-prompt">quantum@tasks:~$</span> optimizing-neural-pathways --productivity-matrix
      </div>
      
      <div className="cosmic-tools-section">
        <h3>📋 PROJECT MANAGEMENT</h3>
        <div className="cosmic-tool-grid">
          <a href="https://asana.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🎯 Asana - Team Project Management
          </a>
          <a href="https://trello.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            📋 Trello - Kanban Board System
          </a>
          <a href="https://notion.so/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            📝 Notion - All-in-One Workspace
          </a>
          <a href="https://monday.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            📅 Monday.com - Work OS Platform
          </a>
          <a href="https://clickup.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🖱️ ClickUp - Productivity Platform
          </a>
          <a href="https://airtable.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            📊 Airtable - Database & Spreadsheet
          </a>
        </div>
      </div>

      <div className="cosmic-tools-section">
        <h3>⏰ TIME TRACKING & PRODUCTIVITY</h3>
        <div className="cosmic-tool-grid">
          <a href="https://toggl.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            ⏱️ Toggl - Time Tracking Tool
          </a>
          <a href="https://rescuetime.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🚑 RescueTime - Automatic Time Tracking
          </a>
          <a href="https://clockify.me/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🕐 Clockify - Free Time Tracker
          </a>
          <a href="https://forest.app/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🌲 Forest - Focus & Productivity
          </a>
          <a href="https://pomodone.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🍅 PomoDone - Pomodoro Timer
          </a>
          <a href="https://freedom.to/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🕊️ Freedom - Website & App Blocker
          </a>
        </div>
      </div>

      <div className="cosmic-tools-section">
        <h3>📝 NOTE TAKING & DOCUMENTATION</h3>
        <div className="cosmic-tool-grid">
          <a href="https://evernote.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🐘 Evernote - Digital Note Taking
          </a>
          <a href="https://obsidian.md/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            💎 Obsidian - Connected Note Taking
          </a>
          <a href="https://roamresearch.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🕸️ Roam Research - Networked Thought
          </a>
          <a href="https://logseq.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            📓 Logseq - Privacy-First Notes
          </a>
          <a href="https://simplenote.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            📄 Simplenote - Clean Note Taking
          </a>
          <a href="https://standardnotes.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🔒 Standard Notes - Encrypted Notes
          </a>
        </div>
      </div>

      <div className="cosmic-tools-section">
        <h3>📊 ANALYTICS & REPORTING</h3>
        <div className="cosmic-tool-grid">
          <a href="https://analytics.google.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            📈 Google Analytics - Web Analytics
          </a>
          <a href="https://mixpanel.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🧪 Mixpanel - Product Analytics
          </a>
          <a href="https://amplitude.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            📊 Amplitude - User Analytics
          </a>
          <a href="https://segment.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🔗 Segment - Customer Data Platform
          </a>
        </div>
      </div>
    </div>
  );

  const CosmicLearning = () => (
    <div className="cosmic-interface">
      <div className="cosmic-header">
        <span className="cosmic-prompt">quantum@learning:~$</span> expanding-consciousness --skill-acquisition
      </div>
      
      <div className="cosmic-tools-section">
        <h3>🎓 ONLINE COURSE PLATFORMS</h3>
        <div className="cosmic-tool-grid">
          <a href="https://coursera.org/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🎓 Coursera - University Courses
          </a>
          <a href="https://udemy.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            📚 Udemy - Practical Skills Training
          </a>
          <a href="https://edx.org/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🏛️ edX - Harvard & MIT Courses
          </a>
          <a href="https://pluralsight.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🔧 Pluralsight - Tech Skills Platform
          </a>
          <a href="https://skillshare.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🎨 Skillshare - Creative Learning
          </a>
          <a href="https://masterclass.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            👑 MasterClass - Learn from Experts
          </a>
        </div>
      </div>

      <div className="cosmic-tools-section">
        <h3>💻 PROGRAMMING & DEVELOPMENT</h3>
        <div className="cosmic-tool-grid">
          <a href="https://freecodecamp.org/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🔥 FreeCodeCamp - Learn to Code
          </a>
          <a href="https://codecademy.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            💻 Codecademy - Interactive Coding
          </a>
          <a href="https://leetcode.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🧩 LeetCode - Coding Interview Prep
          </a>
          <a href="https://khanacademy.org/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🏫 Khan Academy - Free Learning
          </a>
          <a href="https://theodinproject.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            ⚡ The Odin Project - Full Stack
          </a>
          <a href="https://codewars.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            ⚔️ Codewars - Coding Challenges
          </a>
        </div>
      </div>

      <div className="cosmic-tools-section">
        <h3>🎨 DESIGN & CREATIVE SKILLS</h3>
        <div className="cosmic-tool-grid">
          <a href="https://dribbble.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🏀 Dribbble - Design Inspiration
          </a>
          <a href="https://behance.net/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🎨 Behance - Creative Portfolios
          </a>
          <a href="https://figma.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🎯 Figma - Collaborative Design
          </a>
          <a href="https://canva.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🎨 Canva - Easy Graphic Design
          </a>
          <a href="https://unsplash.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            📸 Unsplash - Free Stock Photos
          </a>
          <a href="https://color.adobe.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🌈 Adobe Color - Color Palette Tool
          </a>
        </div>
      </div>

      <div className="cosmic-tools-section">
        <h3>🌐 LANGUAGE LEARNING</h3>
        <div className="cosmic-tool-grid">
          <a href="https://duolingo.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🦉 Duolingo - Gamified Language Learning
          </a>
          <a href="https://babbel.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            💬 Babbel - Practical Conversations
          </a>
          <a href="https://rosettastone.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🗿 Rosetta Stone - Immersive Learning
          </a>
          <a href="https://busuu.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🌱 Busuu - AI-Powered Language Learning
          </a>
        </div>
      </div>
    </div>
  );

  const RemoteWorkspace = () => (
    <div className="cosmic-interface">
      <div className="cosmic-header">
        <span className="cosmic-prompt">quantum@workspace:~$</span> accessing-remote-dimensions --coworking-matrix
      </div>
      
      <div className="cosmic-tools-section">
        <h3>🏢 VIRTUAL COWORKING SPACES</h3>
        <div className="cosmic-tool-grid">
          <a href="https://flow.club/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🌊 Flow Club - Virtual Coworking
          </a>
          <a href="https://focusmate.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            👥 Focusmate - Body Doubling Sessions
          </a>
          <a href="https://caveday.org/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🗻 Cave Day - Deep Work Sessions
          </a>
          <a href="https://remoteyear.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🌍 Remote Year - Work & Travel
          </a>
          <a href="https://nomadlist.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🏝️ Nomad List - Digital Nomad Community
          </a>
          <a href="https://workfrom.co/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            ☕ WorkFrom - Workspace Finder
          </a>
        </div>
      </div>

      <div className="cosmic-tools-section">
        <h3>💬 COMMUNICATION & COLLABORATION</h3>
        <div className="cosmic-tool-grid">
          <a href="https://slack.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            💬 Slack - Team Messaging
          </a>
          <a href="https://discord.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🎮 Discord - Voice & Text Chat
          </a>
          <a href="https://zoom.us/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            📹 Zoom - Video Conferencing
          </a>
          <a href="https://teams.microsoft.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            👥 Microsoft Teams - Collaboration Hub
          </a>
          <a href="https://miro.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🎨 Miro - Online Whiteboard
          </a>
          <a href="https://loom.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🎬 Loom - Screen Recording
          </a>
        </div>
      </div>

      <div className="cosmic-tools-section">
        <h3>🗂️ FILE STORAGE & SHARING</h3>
        <div className="cosmic-tool-grid">
          <a href="https://drive.google.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            💾 Google Drive - Cloud Storage
          </a>
          <a href="https://dropbox.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            📦 Dropbox - File Synchronization
          </a>
          <a href="https://onedrive.live.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            ☁️ OneDrive - Microsoft Cloud
          </a>
          <a href="https://box.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            📋 Box - Enterprise File Sharing
          </a>
          <a href="https://wetransfer.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            📨 WeTransfer - Large File Transfer
          </a>
          <a href="https://mega.nz/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🔒 MEGA - Encrypted Cloud Storage
          </a>
        </div>
      </div>

      <div className="cosmic-tools-section">
        <h3>🏠 REMOTE WORK RESOURCES</h3>
        <div className="cosmic-tool-grid">
          <a href="https://buffer.com/remote-work/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            📊 Buffer - Remote Work Resources
          </a>
          <a href="https://zapier.com/remote/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            ⚡ Zapier - Remote Work Guide
          </a>
          <a href="https://basecamp.com/remote-resources" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🏕️ Basecamp - Remote Work Resources
          </a>
          <a href="https://remoteyear.com/blog/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            📖 Remote Year - Nomad Insights
          </a>
        </div>
      </div>
    </div>
  );

  const CareerOptimizer = () => (
    <div className="cosmic-interface">
      <div className="cosmic-header">
        <span className="cosmic-prompt">quantum@career:~$</span> optimizing-professional-trajectory --quantum-leap
      </div>
      
      <div className="cosmic-tools-section">
        <h3>📄 RESUME & CV BUILDERS</h3>
        <div className="cosmic-tool-grid">
          <a href="https://resume.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            📝 Resume.com - Professional Resume Builder
          </a>
          <a href="https://canva.com/resumes/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🎨 Canva Resume - Design Templates
          </a>
          <a href="https://zety.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            ⚡ Zety - Resume & Cover Letter Builder
          </a>
          <a href="https://resumegenius.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🧠 Resume Genius - Expert Templates
          </a>
          <a href="https://novoresume.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            ⭐ NovoResume - Modern Resume Builder
          </a>
          <a href="https://enhancv.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            📈 Enhancv - Resume Enhancement
          </a>
        </div>
      </div>

      <div className="cosmic-tools-section">
        <h3>🎯 INTERVIEW PREPARATION</h3>
        <div className="cosmic-tool-grid">
          <a href="https://pramp.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🤝 Pramp - Peer Mock Interviews
          </a>
          <a href="https://interviewing.io/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            💻 Interviewing.io - Technical Interviews
          </a>
          <a href="https://interviewcake.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🍰 Interview Cake - Coding Interview Prep
          </a>
          <a href="https://glassdoor.com/Interview/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🏢 Glassdoor Interviews - Company Questions
          </a>
          <a href="https://biginterview.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🎥 Big Interview - Video Practice
          </a>
          <a href="https://gainlo.co/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            📞 Gainlo - Mock Interviews
          </a>
        </div>
      </div>

      <div className="cosmic-tools-section">
        <h3>💼 PROFESSIONAL NETWORKING</h3>
        <div className="cosmic-tool-grid">
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            💼 LinkedIn - Professional Network
          </a>
          <a href="https://meetup.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            👥 Meetup - Local Professional Groups
          </a>
          <a href="https://shapr.co/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            📱 Shapr - Professional Networking App
          </a>
          <a href="https://bumble.com/bizz" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🐝 Bumble Bizz - Business Networking
          </a>
          <a href="https://luma.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            📅 Luma - Professional Events
          </a>
          <a href="https://eventbrite.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            🎫 Eventbrite - Career Events
          </a>
        </div>
      </div>

      <div className="cosmic-tools-section">
        <h3>📊 SALARY & COMPENSATION</h3>
        <div className="cosmic-tool-grid">
          <a href="https://glassdoor.com/Salaries/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            💰 Glassdoor Salaries - Compensation Data
          </a>
          <a href="https://payscale.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            📈 PayScale - Salary Information
          </a>
          <a href="https://levels.fyi/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            📊 Levels.fyi - Tech Compensation
          </a>
          <a href="https://salary.com/" target="_blank" rel="noopener noreferrer" className="cosmic-tool-link">
            💼 Salary.com - Market Rate Data
          </a>
        </div>
      </div>
    </div>
  );

  const renderWindowContent = (component) => {
    switch (component) {
      case 'CosmicScanner': return <CosmicScanner />;
      case 'QuantumJobs': return <QuantumJobs />;
      case 'DimensionalRelocation': return <DimensionalRelocation />;
      case 'StellarFinance': return <StellarFinance />;
      case 'NeuralTasks': return <NeuralTasks />;
      case 'CosmicLearning': return <CosmicLearning />;
      case 'RemoteWorkspace': return <RemoteWorkspace />;
      case 'CareerOptimizer': return <CareerOptimizer />;
      case 'QuantumTerminal': return <div className="cosmic-interface"><div className="cosmic-coming-soon">⚡ Quantum Terminal<br/>Neural interface ready...</div></div>;
      case 'RealityAnalyzer': return <div className="cosmic-interface"><div className="cosmic-coming-soon">🔮 Reality Analyzer<br/>Processing dimensional data...</div></div>;
      case 'ConsciousnessVault': return <div className="cosmic-interface"><div className="cosmic-coming-soon">🔐 Consciousness Vault<br/>Securing neural patterns...</div></div>;
      case 'QuantumMonitor': return <div className="cosmic-interface"><div className="cosmic-coming-soon">📡 Quantum Monitor<br/>Reality stability: OPTIMAL</div></div>;
      default: return <div className="cosmic-interface"><div className="cosmic-coming-soon">🌌 Loading cosmic interface...</div></div>;
    }
  };

  const currentThemeData = cinematicThemes[currentTheme];

  return (
    <div 
      className={`cosmic-portal ${currentTheme}-theme`}
      style={{
        background: currentThemeData.background,
        '--primary-color': currentThemeData.primary,
        '--secondary-color': currentThemeData.secondary,
        '--accent-color': currentThemeData.accent,
        '--nebula-color': currentThemeData.nebula,
        '--quantum-color': currentThemeData.quantum
      }}
    >
      {/* Dynamic cosmic background */}
      <div className="cosmic-background">
        <div className="star-field">
          {starField.map(star => (
            <div
              key={star.id}
              className="star"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                opacity: star.brightness,
                backgroundColor: star.color,
                boxShadow: `0 0 ${star.size * 2}px ${star.color}`
              }}
            />
          ))}
        </div>
        
        {/* Nebula effects */}
        <div className="nebula-layer">
          <div 
            className="nebula-cloud nebula-1"
            style={{
              transform: `translate(${nebulaDrift * 0.1}px, ${Math.sin(nebulaDrift * 0.01) * 50}px)`,
              opacity: pulseIntensity * 0.3
            }}
          />
          <div 
            className="nebula-cloud nebula-2"
            style={{
              transform: `translate(${-nebulaDrift * 0.15}px, ${Math.cos(nebulaDrift * 0.008) * 30}px)`,
              opacity: pulseIntensity * 0.2
            }}
          />
        </div>
      </div>

      {/* Enhanced notification system with cosmic styling */}
      <div className="cosmic-notification-matrix">
        {notifications.map(notification => (
          <div 
            key={notification.id} 
            className={`cosmic-notification ${notification.type}`}
            style={{ borderColor: currentThemeData.primary }}
            onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
          >
            <div className="notification-title">{notification.title}</div>
            <div className="notification-message">{notification.message}</div>
            <div className="notification-time">{new Date(notification.timestamp).toLocaleTimeString()}</div>
            <div className="notification-pulse" />
          </div>
        ))}
      </div>

      {/* Quantum Control Panel */}
      <div className="quantum-control-panel">
        <div className="panel-left">
          <div className="cosmic-logo">
            <span className="logo-main">◉ THRIVEREMOTE</span>
            <span className="logo-sub">QUANTUM CONSCIOUSNESS v5.0</span>
          </div>
          <div className="network-status-cosmic">
            <span className="status-indicator quantum">◉</span> 
            NETWORK: {networkConnected ? 'QUANTUM ENTANGLED' : 'REALITY DRIFT'} | 
            SECURITY: {securityLevel} |
            STREAK: {userStats.streakDays} CYCLES |
            POINTS: {userStats.totalPoints.toLocaleString()}
          </div>
        </div>
        
        <div className="panel-right">
          <div className="theme-constellation">
            {Object.keys(cinematicThemes).map(theme => (
              <button
                key={theme}
                className={`cosmic-theme-btn ${currentTheme === theme ? 'active' : ''}`}
                onClick={() => changeTheme(theme)}
                style={{ 
                  borderColor: currentTheme === theme ? currentThemeData.primary : 'transparent',
                  color: currentTheme === theme ? currentThemeData.primary : '#666',
                  boxShadow: currentTheme === theme ? `0 0 20px ${currentThemeData.primary}` : 'none'
                }}
              >
                {cinematicThemes[theme].name}
              </button>
            ))}
          </div>
          
          <div className="cosmic-time" style={{ color: currentThemeData.primary }}>
            {currentTime.toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Enhanced Application Constellation */}
      <div className="application-constellation">
        {portalApplications.map((app, index) => (
          <div
            key={app.id}
            className={`cosmic-app ${app.classified ? 'classified' : ''}`}
            style={{ 
              animationDelay: `${index * 0.1}s`,
              borderColor: app.classified && !terminalAccess ? '#ff0000' : currentThemeData.primary
            }}
            onClick={() => {
              if (app.classified && !terminalAccess) {
                requestTerminalAccess();
              } else {
                openWindow(app.id, app.name, app.component, app.classified);
              }
            }}
          >
            <div className="app-icon-cosmic" style={{ color: currentThemeData.primary }}>
              {app.icon}
            </div>
            <div className="app-name-cosmic" style={{ color: currentThemeData.textColor }}>
              {app.name}
            </div>
            <div className="app-description-cosmic" style={{ color: currentThemeData.secondary }}>
              {app.description}
            </div>
            {app.classified && !terminalAccess && (
              <div className="quantum-lock">🔒 QUANTUM LOCKED</div>
            )}
            <div className="cosmic-glow" style={{ boxShadow: `0 0 30px ${currentThemeData.accent}` }} />
          </div>
        ))}
      </div>

      {/* Enhanced Active Windows */}
      {activeWindows.map(window => (
        <div
          key={window.id}
          className={`cosmic-window ${window.minimized ? 'minimized' : ''} ${window.opening ? 'opening' : ''} ${window.closing ? 'closing' : ''}`}
          style={{
            left: window.position.x,
            top: window.position.y,
            zIndex: window.zIndex,
            width: window.size.width,
            height: window.size.height,
            backgroundColor: currentThemeData.windowBg,
            borderColor: window.classified ? '#ff0000' : currentThemeData.primary,
            boxShadow: `0 0 50px ${currentThemeData.primary}, inset 0 0 50px rgba(0,0,0,0.3)`
          }}
        >
          <div 
            className="cosmic-window-header"
            style={{ 
              backgroundColor: currentThemeData.windowBg,
              borderBottomColor: currentThemeData.primary 
            }}
          >
            <div className="window-title-cosmic" style={{ color: currentThemeData.primary }}>
              {window.classified && '🔮 '}{window.title}
            </div>
            <div className="cosmic-window-controls">
              <button
                className="cosmic-window-control minimize"
                onClick={() => minimizeWindow(window.id)}
                style={{ color: currentThemeData.accent }}
              >
                ◦
              </button>
              <button
                className="cosmic-window-control close"
                onClick={() => closeWindow(window.id)}
                style={{ color: '#ff4444' }}
              >
                ◉
              </button>
            </div>
          </div>
          {!window.minimized && (
            <div className="cosmic-window-content" style={{ color: currentThemeData.textColor }}>
              {renderWindowContent(window.component)}
            </div>
          )}
        </div>
      ))}

      {/* Quantum Status Bar */}
      <div className="quantum-status-bar" style={{ backgroundColor: currentThemeData.windowBg }}>
        <div className="status-left">
          <span style={{ color: currentThemeData.primary }}>◉</span> 
          QUANTUM PORTAL ACTIVE | 
          ENTANGLEMENTS: {userStats.quantumEntanglements} | 
          DATA: {userStats.dataHarvested}
        </div>
        <div className="status-center">
          {activeWindows.map(window => (
            <div
              key={window.id}
              className={`cosmic-status-window ${window.minimized ? 'minimized' : ''}`}
              onClick={() => minimizeWindow(window.id)}
              style={{ 
                backgroundColor: window.minimized ? 'transparent' : currentThemeData.primary,
                color: window.minimized ? currentThemeData.primary : '#000',
                boxShadow: window.minimized ? 'none' : `0 0 15px ${currentThemeData.primary}`
              }}
            >
              {window.title}
            </div>
          ))}
        </div>
        <div className="status-right" style={{ color: currentThemeData.primary }}>
          {currentTime.toLocaleDateString()} | {currentTime.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default App;