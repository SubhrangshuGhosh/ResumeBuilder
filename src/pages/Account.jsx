import React from 'react';
import '../design/Account.css';

const Account = () => {
  return (
    <div className="account-page">
      <div className="account-container">
        <div className="account-header">
          <h2>My Account</h2>
        </div>
        
        <div className="account-content">
          <div className="account-info-section">
            <h3>Personal Information</h3>
            
            <div className="info-card">
              <div className="info-item">
                <span className="info-label">Full Name:</span>
                <span className="info-value">John Doe</span>
              </div>
              
              <div className="info-item">
                <span className="info-label">Email:</span>
                <span className="info-value">john.doe@example.com</span>
              </div>
              
              <div className="info-item">
                <span className="info-label">Member Since:</span>
                <span className="info-value">January 15, 2023</span>
              </div>
              
              <div className="info-item">
                <span className="info-label">Resumes Created:</span>
                <span className="info-value">8</span>
              </div>
            </div>
          </div>
          
          <div className="account-plan-section">
            <h3>Subscription Plan</h3>
            
            <div className="plan-card">
              <div className="plan-header">
                <h4>Free Plan</h4>
                <span className="plan-badge">Current</span>
              </div>
              
              <div className="plan-features">
                <div className="feature-item">
                  <span className="feature-icon">✓</span>
                  <span>Up to 3 resumes</span>
                </div>
                <div className="feature-item">
                  <span className="feature-icon">✓</span>
                  <span>Basic templates</span>
                </div>
                <div className="feature-item disabled">
                  <span className="feature-icon">✗</span>
                  <span>Premium templates</span>
                </div>
                <div className="feature-item disabled">
                  <span className="feature-icon">✗</span>
                  <span>PDF download without watermark</span>
                </div>
                <div className="feature-item disabled">
                  <span className="feature-icon">✗</span>
                  <span>Priority support</span>
                </div>
              </div>
              
              <button className="upgrade-plan-btn">Upgrade to Premium</button>
            </div>
          </div>
          
          <div className="account-actions-section">
            <h3>Account Actions</h3>
            
            <div className="action-cards">
              <div className="action-card">
                <div className="action-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                    <path d="M15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12C13.6569 12 15 10.6569 15 9Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                    <path d="M17 17C17 14.2386 14.7614 12 12 12C9.23858 12 7 14.2386 7 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                  </svg>
                </div>
                <h4>Edit Profile</h4>
                <p>Update your personal information</p>
                <button className="action-btn">Edit</button>
              </div>
              
              <div className="action-card">
                <div className="action-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" color="#ffffff" fill="none">
                    <path d="M16 10L16 6C16 4.11438 16 3.17157 15.4142 2.58579C14.8284 2 13.8856 2 12 2L11 2C9.11438 2 8.17157 2 7.58579 2.58579C7 3.17157 7 4.11438 7 6L7 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                    <path d="M9 16C9 17.6569 10.3431 19 12 19C13.6569 19 15 17.6569 15 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                    <path d="M21 11.2C21 9.38879 21 8.4832 20.564 7.76593C20.1805 7.13137 19.5659 6.6487 18.8385 6.30996C18.0114 5.75 16.8275 5.75 14.7824 5.75L9.21761 5.75C7.17252 5.75 5.98816 5.75 5.16105 6.30996C4.43377 6.64855 3.81947 7.13137 3.43595 7.76593C3 8.4832 3 9.38879 3 11.2L3 14.8C3 16.6112 3 17.5168 3.43595 18.2341C3.81947 18.8686 4.43377 19.3513 5.16105 19.69C5.98816 20.25 7.17252 20.25 9.21761 20.25L14.7824 20.25C16.8275 20.25 18.0114 20.25 18.8385 19.69C19.5659 19.3513 20.1805 18.8686 20.564 18.2341C21 17.5168 21 16.6112 21 14.8L21 11.2Z" stroke="currentColor" strokeWidth="1.5"></path>
                  </svg>
                </div>
                <h4>Change Password</h4>
                <p>Update your account password</p>
                <button className="action-btn">Change</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;