import React, { useState, useEffect } from 'react';
import '../design/SearchBar.css';

const SearchBar = ({ onSearchResults, onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [allResumes, setAllResumes] = useState([]);

  // Load all resumes from localStorage
  useEffect(() => {
    const savedResumes = JSON.parse(localStorage.getItem('resumes') || '[]');
    setAllResumes(savedResumes);
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim() === '') {
      setSearchResults([]);
      if (onSearchResults) onSearchResults([]);
      return;
    }

    // Filter resumes by name (case insensitive)
    const filteredResumes = allResumes.filter(resume =>
      resume.name.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(filteredResumes);
    if (onSearchResults) onSearchResults(filteredResumes);
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    if (onSearchResults) onSearchResults([]);
  };

  // Handle resume click
  const handleResumeClick = (resume) => {
    // You can implement what happens when a resume is clicked
    console.log('Resume clicked:', resume);
    // For example, you might want to open the resume in edit mode
  };

  return (
    <div className="search-bar-overlay">
      <div className="search-bar-container">
        <div className="search-header">
          <h2>Search Resumes</h2>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>
        
        <div className="search-input-container">
          <div className="search-input-wrapper">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none" className="search-icon">
              <path d="M17 17L21 21" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19C15.4183 19 19 15.4183 19 11Z" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            <input
              type="text"
              placeholder="Search by resume name..."
              value={searchQuery}
              onChange={handleSearchChange}
              autoFocus
              className="search-input"
            />
            {searchQuery && (
              <button className="clear-btn" onClick={clearSearch}>
                ×
              </button>
            )}
          </div>
        </div>

        {searchResults.length > 0 && (
          <div className="search-results">
            <h3>Found {searchResults.length} resume(s)</h3>
            <div className="results-list">
              {searchResults.map((resume) => (
                <div
                  key={resume.id}
                  className="result-item"
                  onClick={() => handleResumeClick(resume)}
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
          </div>
        )}

        {searchQuery && searchResults.length === 0 && (
          <div className="no-results">
            <p>No resumes found matching "{searchQuery}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;