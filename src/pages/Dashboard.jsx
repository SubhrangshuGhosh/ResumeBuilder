import React, { useState, useEffect } from 'react';
import '../design/Dashboard.css';
import NewResume from '../pages/NewResume';
import EditResume from '../pages/EditResume';
import SavedResume from '../pages/SavedResume';

const Dashboard = () => {
  const [activeContent, setActiveContent] = useState('newResume');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [allResumes, setAllResumes] = useState([]);

  // Load all resumes from localStorage
  useEffect(() => {
    const savedResumes = JSON.parse(localStorage.getItem('resumes') || '[]');
    setAllResumes(savedResumes);
  }, []);

  // Detect screen size changes
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      
      // Auto-collapse sidebar on mobile
      if (mobile) {
        setIsSidebarCollapsed(true);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNavItemClick = (content) => {
    setActiveContent(content);
    if (isMobile) {
      setIsMobileMenuOpen(false);
      // On mobile, ensure sidebar stays visible with icons only
      setIsSidebarCollapsed(true);
    }
    // Clear search when navigating
    setSearchQuery('');
    setShowSearchResults(false);
  };

  const handleLogout = () => {
    window.location.reload();
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    // Filter resumes by name (case insensitive)
    const filteredResumes = allResumes.filter(resume =>
      resume.name.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(filteredResumes);
    setShowSearchResults(true);
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowSearchResults(false);
  };

  // Handle search input focus
  const handleSearchFocus = () => {
    if (searchQuery) {
      setShowSearchResults(true);
    }
  };

  // Handle resume click from search results
  const handleSearchResultClick = (resume) => {
    // Switch to saved resumes and show the selected resume
    setActiveContent('savedResume');
    setSearchQuery('');
    setShowSearchResults(false);
    
  };

  const renderContent = () => {
    switch(activeContent) {
      case 'newResume':
        return <NewResume />;
      case 'editResume':
        return <EditResume />;
      case 'savedResume':
        return <SavedResume />;
      default:
        return <NewResume />;
    }
  };

  return (
    <div className="dashboard-container">
      {/* Top Navigation Bar */}
      <nav className="top-nav">
        <div className="nav-left">
          <h1 className="logo">ResumeBuilder</h1>
        </div>
        
        <div className="nav-center">
          <div className="search-bar">
            {/* Search SVG */}
            <span className="search-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                <path d="M17 17L21 21" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </span>
            <input 
              type="text" 
              placeholder="Search resumes..." 
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={handleSearchFocus}
            />
            {searchQuery && (
              <button className="clear-search-btn" onClick={clearSearch}>
                ×
              </button>
            )}
          </div>

          {/* Search Results Dropdown */}
          {showSearchResults && (
            <div className="search-results-dropdown">
              {searchResults.length > 0 ? (
                <>
                  <div className="search-results-header">
                    <span>Found {searchResults.length} resume(s)</span>
                  </div>
                  <div className="search-results-list">
                    {searchResults.map((resume) => (
                      <div
                        key={resume.id}
                        className="search-result-item"
                        onClick={() => handleSearchResultClick(resume)}
                      >
                        <div className="result-name">{resume.name}</div>
                        <div className="result-details">
                          <span className="template-badge">{resume.data?.selectedTemplate || 'template1'}</span>
                          <span className="result-date">
                            {new Date(resume.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="no-results">
                  <span>No resumes found matching "{searchQuery}"</span>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="nav-right">
          {/* Notification SVG */}
          <div className="icon-button notification">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
              <path d="M22 5.5C22 7.433 20.433 9 18.5 9C16.567 9 15 7.433 15 5.5C15 3.567 16.567 2 18.5 2C20.433 2 22 3.567 22 5.5Z" stroke="#ffffff" strokeWidth="1.5"></path>
              <path d="M21.9506 11C21.9833 11.3289 22 11.6625 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C12.3375 2 12.6711 2.01672 13 2.04938" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round"></path>
              <path d="M8 10H12" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M8 15H16" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            <span className="badge">3</span>
          </div>
          
          {/* Account SVG */}
          <div className="icon-button account">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
              <path d="M15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12C13.6569 12 15 10.6569 15 9Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M17 17C17 14.2386 14.7614 12 12 12C9.23858 12 7 14.2386 7 17" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
          </div>
          
          {/* Hamburger menu for mobile - Updated SVG */}
          <div 
            className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              // Close icon (grid view)
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                <path d="M17.25 3V10.5M21 6.75L13.5 6.75" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M13.6903 19.4567C13.5 18.9973 13.5 18.4149 13.5 17.25C13.5 16.0851 13.5 15.5027 13.6903 15.0433C13.944 14.4307 14.4307 13.944 15.0433 13.6903C15.5027 13.5 16.0851 13.5 17.25 13.5C18.4149 13.5 18.9973 13.5 19.4567 13.6903C20.0693 13.944 20.556 14.4307 20.8097 15.0433C21 15.5027 21 16.0851 21 17.25C21 18.4149 21 18.9973 20.8097 19.4567C20.556 20.0693 20.0693 20.556 19.4567 20.8097C18.9973 21 18.4149 21 17.25 21C16.0851 21 15.5027 21 15.0433 20.8097C14.4307 20.556 13.944 20.0693 13.6903 19.4567Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M3.1903 19.4567C3 18.9973 3 18.4149 3 17.25C3 16.0851 3 15.5027 3.1903 15.0433C3.44404 14.4307 3.93072 13.944 4.54329 13.6903C5.00272 13.5 5.58515 13.5 6.75 13.5C7.91485 13.5 8.49728 13.5 8.95671 13.6903C9.56928 13.944 10.056 14.4307 10.3097 15.0433C10.5 15.5027 10.5 16.0851 10.5 17.25C10.5 18.4149 10.5 18.9973 10.3097 19.4567C10.056 20.0693 9.56928 20.556 8.95671 20.8097C8.49728 21 7.91485 21 6.75 21C5.58515 21 5.00272 21 4.54329 20.8097C3.93072 20.556 3.44404 20.0693 3.1903 19.4567Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M3.1903 8.95671C3 8.49728 3 7.91485 3 6.75C3 5.58515 3 5.00272 3.1903 4.54329C3.44404 3.93072 3.93072 3.44404 4.54329 3.1903C5.00272 3 5.58515 3 6.75 3C7.91485 3 8.49728 3 8.95671 3.1903C9.56928 3.44404 10.056 3.93072 10.3097 4.54329C10.5 5.00272 10.5 5.58515 10.5 6.75C10.5 7.91485 10.5 8.49728 10.3097 8.95671C10.056 9.56928 9.56928 10.056 8.95671 10.3097C8.49728 10.5 7.91485 10.5 6.75 10.5C5.58515 10.5 5.00272 10.5 4.54329 10.3097C3.93072 10.056 3.44404 9.56928 3.1903 8.95671Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            ) : (
              // Hamburger icon (grid view)
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                <path d="M10.5 8.75V6.75C10.5 5.10626 10.5 4.28439 10.046 3.73121C9.96291 3.62995 9.87005 3.53709 9.76879 3.45398C9.21561 3 8.39374 3 6.75 3C5.10626 3 4.28439 3 3.73121 3.45398C3.62995 3.53709 3.53709 3.62995 3.45398 3.73121C3 4.28439 3 5.10626 3 6.75V8.75C3 10.3937 3 11.2156 3.45398 11.7688C3.53709 11.8701 3.62995 11.9629 3.73121 12.046C4.28439 12.5 5.10626 12.5 6.75 12.5C8.39374 12.5 9.21561 12.5 9.76879 12.046C9.87005 11.9629 9.96291 11.8701 10.046 11.7688C10.5 11.2156 10.5 10.3937 10.5 8.75Z" stroke="#ffffff" strokeWidth="1.5" strokeLinejoin="round"></path>
                <path d="M7.75 15.5H5.75C5.05222 15.5 4.70333 15.5 4.41943 15.5861C3.78023 15.78 3.28002 16.2802 3.08612 16.9194C3 17.2033 3 17.5522 3 18.25C3 18.9478 3 19.2967 3.08612 19.5806C3.28002 20.2198 3.78023 20.72 4.41943 20.9139C4.70333 21 5.05222 21 5.75 21H7.75C8.44778 21 8.79667 21 9.08057 20.9139C9.71977 20.72 10.22 20.2198 10.4139 19.5806C10.5 19.2967 10.5 18.9478 10.5 18.25C10.5 17.5522 10.5 17.2033 10.4139 16.9194C10.22 16.2802 9.71977 15.78 9.08057 15.5861C8.79667 15.5 8.44778 15.5 7.75 15.5Z" stroke="#ffffff" strokeWidth="1.5" strokeLinejoin="round"></path>
                <path d="M21 17.25V15.25C21 13.6063 21 12.7844 20.546 12.2312C20.4629 12.1299 20.3701 12.0371 20.2688 11.954C19.7156 11.5 18.8937 11.5 17.25 11.5C15.6063 11.5 14.7844 11.5 14.2312 11.954C14.1299 12.0371 14.0371 12.1299 13.954 12.2312C13.5 12.7844 13.5 13.6063 13.5 15.25V17.25C13.5 18.8937 13.5 19.7156 13.954 20.2688C14.0371 20.3701 14.1299 20.4629 14.2312 20.546C14.7844 21 15.6063 21 17.25 21C18.8937 21 19.7156 21 20.2688 20.546C20.3701 20.4629 20.4629 20.3701 20.546 20.2688C21 19.7156 21 18.8937 21 17.25Z" stroke="#ffffff" strokeWidth="1.5" strokeLinejoin="round"></path>
                <path d="M18.25 3H16.25C15.5522 3 15.2033 3 14.9194 3.08612C14.2802 3.28002 13.78 3.78023 13.5861 4.41943C13.5 4.70333 13.5 5.05222 13.5 5.75C13.5 6.44778 13.5 6.79667 13.5861 7.08057C13.78 7.71977 14.2802 8.21998 14.9194 8.41388C15.2033 8.5 15.5522 8.5 16.25 8.5H18.25C18.9478 8.5 19.2967 8.5 19.5806 8.41388C20.2198 8.21998 20.72 7.71977 20.9139 7.08057C21 6.79667 21 6.44778 21 5.75C21 5.05222 21 4.70333 20.9139 4.41943C20.72 3.78023 20.2198 3.28002 19.5806 3.08612C19.2967 3 18.9478 3 18.25 3Z" stroke="#ffffff" strokeWidth="1.5" strokeLinejoin="round"></path>
              </svg>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile menu dropdown */}
      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <div className="mobile-search">
            <input type="text" placeholder="Search resumes..." />
          </div>
          <div className="mobile-menu-items">
            <div className="mobile-notification">
              Notifications <span className="badge">3</span>
            </div>
            <div className="mobile-account">My Account</div>
          </div>
        </div>
      )}

      <div className="dashboard-content">
        {/* Side Navigation Bar - Always visible on mobile with icons only */}
        <aside className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''} ${isMobile ? 'mobile-visible' : ''}`}>
          <nav className="sidebar-nav">
            <ul>
              <li 
                className={activeContent === 'newResume' ? 'active' : ''}
                onClick={() => handleNavItemClick('newResume')}
              >
                {/* New Resume SVG */}
                <span className="nav-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                    <path d="M20.4999 14V10C20.4999 6.22876 20.4999 4.34315 19.3284 3.17157C18.1568 2 16.2712 2 12.4999 2H11.5C7.72883 2 5.84323 2 4.67166 3.17156C3.50008 4.34312 3.50007 6.22872 3.50004 9.99993L3.5 13.9999C3.49997 17.7712 3.49995 19.6568 4.67153 20.8284C5.8431 22 7.72873 22 11.5 22H12.4999C16.2712 22 18.1568 22 19.3284 20.8284C20.4999 19.6569 20.4999 17.2712 20.4999 14Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M8 7H16M8 12H16M8 17L12 17" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </span>
                <span className="nav-text">New Resume</span>
              </li>
              <li 
                className={activeContent === 'editResume' ? 'active' : ''}
                onClick={() => handleNavItemClick('editResume')}
              >
                {/* Edit Resume SVG */}
                <span className="nav-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                    <path d="M15.5 2V5M6.5 2V5M11 2V5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M19 12V10.5C19 7.20017 19 5.55025 17.9749 4.52512C16.9497 3.5 15.2998 3.5 12 3.5H10C6.70017 3.5 5.05025 3.5 4.02513 4.52513C3 5.55025 3 7.20017 3 10.5V15C3 18.2998 3 19.9497 4.02513 20.9749C5.05025 22 6.70017 22 10 22H11" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M7 15H11M7 11H15" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M15.7367 21.6527L14 22L14.3473 20.2633C14.4179 19.9106 14.5913 19.5866 14.8456 19.3323L18.9111 15.2668C19.2668 14.9111 19.8437 14.9111 20.1995 15.2668L20.7332 15.8005C21.0889 16.1563 21.0889 16.7332 20.7332 17.0889L16.6677 21.1544C16.4134 21.4087 16.0894 21.5821 15.7367 21.6527Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </span>
                <span className="nav-text">Edit Resume</span>
              </li>
              <li 
                className={activeContent === 'savedResume' ? 'active' : ''}
                onClick={() => handleNavItemClick('savedResume')}
              >
                {/* Saved Resume SVG */}
                <span className="nav-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                    <path d="M2.50003 13.5V6.5H21.5V13.5C21.5 17.2712 21.5 19.1569 20.3285 20.3284C19.1569 21.5 17.2713 21.5 13.5 21.5H10.5C6.72879 21.5 4.84318 21.5 3.6716 20.3284C2.50003 19.1569 2.50003 17.2712 2.50003 13.5Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M2.50003 6.5L3.10003 5.7C4.27774 4.12972 4.86659 3.34458 5.71118 2.92229C6.55576 2.5 7.53718 2.5 9.50003 2.5H14.5C16.4629 2.5 17.4443 2.5 18.2889 2.92229C19.1335 3.34458 19.7223 4.12972 20.9 5.7L21.5 6.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M15 14.5C15 14.5 12.7906 17.5 12 17.5C11.2095 17.5 9.00003 14.5 9.00003 14.5M12 17L12 10.5" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </span>
                <span className="nav-text">Saved Resume</span>
              </li>
            </ul>
            
            <div className="logout-section">
              <button className="logout-btn" onClick={handleLogout}>
                {/* Logout SVG */}
                <span className="nav-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                    <path d="M3.00006 7.63576C4.6208 4.29965 8.04185 2 12 2C17.5229 2 22 6.47715 22 12C22 17.5228 17.5229 22 12 22C8.04185 22 4.6208 19.7004 3.00006 16.3642" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M11 8C11 8 15 10.946 15 12C15 13.0541 11 16 11 16M14.5 12H2" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </span>
                <span className="nav-text">Logout</span>
              </button>
            </div>
          </nav>
          
          {/* Collapse/Expand button - hidden on mobile */}
          <button 
            className="sidebar-toggle"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            style={{ display: isMobile ? 'none' : 'flex' }}
          >
            {isSidebarCollapsed ? '>' : '<'}
          </button>
        </aside>

        {/* Main Content Area */}
        <main className="main-content">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;