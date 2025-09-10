import React from 'react';
import '../design/Notification.css';

const Notification = () => {
  return (
    <div className="notification-page">
      <div className="notification-container">
        <div className="notification-header">
          <h2>Notifications</h2>
        </div>
        <div className="notification-content">
          <div className="no-notification-box">
            <div className="notification-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" color="#6b7280" fill="none">
                <path d="M22 5.5C22 7.433 20.433 9 18.5 9C16.567 9 15 7.433 15 5.5C15 3.567 16.567 2 18.5 2C20.433 2 22 3.567 22 5.5Z" stroke="currentColor" strokeWidth="1.5"></path>
                <path d="M21.9506 11C21.9833 11.3289 22 11.6625 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C12.3375 2 12.6711 2.01672 13 2.04938" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"></path>
                <path d="M8 10H12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M8 15H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              </svg>
            </div>
            <h3>No New Notifications Available</h3>
            <p>You're all caught up! Check back later for updates.</p>
          </div>
          
          <div className="premium-section">
            <h4>Unlock Premium Features</h4>
            <p>Get notified about resume tips, job opportunities, and more with our premium plan.</p>
            <button className="upgrade-btn">Upgrade to Premium</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;