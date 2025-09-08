import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import '../design/SavedResume.css';

const SavedResume = () => {
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load saved resumes from localStorage with validation
  useEffect(() => {
    try {
      const savedResumes = JSON.parse(localStorage.getItem('resumes') || '[]');
      
      // Validate and clean up resume data
      const validatedResumes = savedResumes.map(resume => ({
        id: resume.id || Date.now(),
        name: resume.name || 'Untitled Resume',
        createdAt: resume.createdAt || new Date().toISOString(),
        updatedAt: resume.updatedAt || new Date().toISOString(),
        data: {
          // Basic details with defaults
          name: resume.data?.name || '',
          email: resume.data?.email || '',
          phone: resume.data?.phone || '',
          country: resume.data?.country || '',
          summary: resume.data?.summary || '',
          
          // Education with defaults
          education: resume.data?.education || [{
            type: 'school',
            institution: '',
            board: '',
            percentage: '',
            degree: '',
            course: '',
            cgpa: '',
            fromYear: '',
            toYear: '',
            pursuing: false
          }],
          
          // Projects with defaults
          projects: resume.data?.projects || [{
            name: '',
            fromDate: '',
            toDate: '',
            details: ''
          }],
          
          // Skills with defaults
          skills: resume.data?.skills || [''],
          
          // Certificates with defaults
          certificates: resume.data?.certificates || [{
            name: '',
            link: ''
          }],
          
          // Template selection with default
          selectedTemplate: resume.data?.selectedTemplate || 'template1',
          fileName: resume.data?.fileName || ''
        }
      }));
      
      setResumes(validatedResumes);
    } catch (error) {
      console.error('Error loading resumes:', error);
      setResumes([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Function to format month and year
  // Function to format month and year
const formatMonthYear = (year) => {
  if (!year) return '';
  try {
    const date = new Date(parseInt(year), 0, 1);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long'
    });
  } catch (error) {
    return year; // Return the raw value if parsing fails
  }
};

  // Function to download resume as PDF
 // Function to download resume as PDF
const downloadAsPDF = (resume) => {
  if (!resume.data) {
    alert('Error: Resume data is corrupted');
    return;
  }

  const template = resume.data.selectedTemplate || 'template1';
  
  if (template === 'template1') {
    generateTemplate1PDF(resume);
  } else if (template === 'template2') {
    generateTemplate2PDF(resume); // Use the new Template 2 generator
  }
};

  // Generate PDF for Template 1 with proper formatting

  // Generate PDF for Template 1 with single page optimization
const generateTemplate1PDF = (resume) => {
  try {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    let yPosition = margin;
    const lineHeight = 5;
    const sectionSpacing = 8;
    
    // Calculate available height
    const maxY = pageHeight - margin;
    
    // Function to check if we need to adjust content
    const checkSpace = (neededHeight) => {
      return (yPosition + neededHeight) < maxY;
    };
    
    // Function to adjust font size if needed
    const adjustFontSize = (baseSize, text, maxWidth) => {
      doc.setFontSize(baseSize);
      let textWidth = doc.getTextWidth(text);
      if (textWidth > maxWidth) {
        const ratio = maxWidth / textWidth;
        const newSize = Math.floor(baseSize * ratio * 0.9);
        doc.setFontSize(Math.max(8, newSize));
      }
    };
    
    // Name (Center, Bold, Size 16 - reduced from 20)
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    const name = resume.data.name || 'Your Name';
    const nameWidth = doc.getTextWidth(name);
    doc.text(name, (pageWidth - nameWidth) / 2, yPosition);
    yPosition += 10;
    
    // Email and Phone (Center, Size 12 - reduced from 16)
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    const email = resume.data.email || '';
    const phone = resume.data.phone || '';
    const contactInfo = `${email} ${email && phone ? '|' : ''} ${phone}`.trim();
    
    if (contactInfo) {
      const contactWidth = doc.getTextWidth(contactInfo);
      doc.text(contactInfo, (pageWidth - contactWidth) / 2, yPosition);
      yPosition += 8;
    }
    
    // Country (Center, Size 12)
    const country = resume.data.country || '';
    if (country) {
      const countryWidth = doc.getTextWidth(country);
      doc.text(country, (pageWidth - countryWidth) / 2, yPosition);
      yPosition += 8;
    }
    
    yPosition += 5;
    
    // Horizontal Line
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 10;
    
    // Summary Section (Smaller font)
    const summary = resume.data.summary || '';
    if (summary && checkSpace(30)) {
      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.text('SUMMARY', margin, yPosition);
      yPosition += 6;
      
      doc.setFont(undefined, 'normal');
      const summaryLines = doc.splitTextToSize(summary, pageWidth - 2 * margin);
      const summaryHeight = summaryLines.length * lineHeight;
      
      if (checkSpace(summaryHeight)) {
        doc.text(summaryLines, margin, yPosition);
        yPosition += summaryHeight + 5;
        
        // UNDERLINE AFTER SUMMARY SECTION
        if (checkSpace(5)) {
          doc.line(margin, yPosition, pageWidth - margin, yPosition);
          yPosition += sectionSpacing;
        }
      }
    }
    
    // Education Section (Compact layout)
    const education = resume.data.education || [];
    if (education.length > 0 && checkSpace(40)) {
      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.text('EDUCATION', margin, yPosition);
      yPosition += 6;
      
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      
      education.forEach((edu, index) => {
        if (!edu || !checkSpace(20)) return;
        
        // Institution Name (Left)
        doc.setFont(undefined, 'bold');
        const institutionText = edu.institution || 'Unknown Institution';
        adjustFontSize(10, institutionText, pageWidth / 3);
        doc.text(institutionText, margin, yPosition);
        
        // Score (Center)
        let scoreText = '';
        if (edu.type === 'school' && edu.percentage) {
          scoreText = `${edu.percentage}%`;
        } else if (edu.type === 'college' && edu.cgpa) {
          scoreText = `CGPA: ${edu.cgpa}`;
        }
        
        if (scoreText) {
          doc.setFont(undefined, 'normal');
          const scoreWidth = doc.getTextWidth(scoreText);
          doc.text(scoreText, (pageWidth - scoreWidth) / 2, yPosition);
        }
        
        // Date Range (Right)
        let dateText = '';
        if (edu.fromYear) {
          if (edu.pursuing) {
            dateText = `${formatMonthYear(edu.fromYear)} - Present`;
          } else if (edu.toYear) {
            dateText = `${formatMonthYear(edu.fromYear)} - ${formatMonthYear(edu.toYear)}`;
          } else {
            dateText = `${formatMonthYear(edu.fromYear)}`;
          }
        }
        
        if (dateText) {
          doc.setFont(undefined, 'normal');
          const dateWidth = doc.getTextWidth(dateText);
          doc.text(dateText, pageWidth - margin - dateWidth, yPosition);
        }
        
        yPosition += 5;
        
        // Additional details in smaller font
        doc.setFontSize(9);
        if (edu.type === 'school' && edu.board) {
          if (checkSpace(4)) {
            doc.text(`Board: ${edu.board}`, margin, yPosition);
            yPosition += 4;
          }
        } else if (edu.type === 'college') {
          if (edu.degree && checkSpace(4)) {
            doc.text(`Degree: ${edu.degree}`, margin, yPosition);
            yPosition += 4;
          }
          if (edu.course && checkSpace(4)) {
            doc.text(`Course: ${edu.course}`, margin, yPosition);
            yPosition += 4;
          }
        }
        
        yPosition += 4;
        doc.setFontSize(10);
      });
      
      if (checkSpace(5)) {
        // Underline after education
        doc.line(margin, yPosition, pageWidth - margin, yPosition);
        yPosition += sectionSpacing;
      }
    }
    
    // Projects Section (Compact layout)
    const projects = resume.data.projects || [];
    if (projects.length > 0 && checkSpace(30)) {
      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.text('PROJECTS', margin, yPosition);
      yPosition += 6;
      
      doc.setFontSize(10);
      
      projects.forEach((project, index) => {
        if (!project || !checkSpace(15)) return;
        
        // Project Name (Left, Bold)
        doc.setFont(undefined, 'bold');
        const projectName = project.name || 'Untitled Project';
        adjustFontSize(10, projectName, pageWidth / 2);
        doc.text(projectName, margin, yPosition);
        
        // Project Dates (Right)
        let dateText = '';
        if (project.fromDate) {
          try {
            const fromDate = new Date(project.fromDate);
            const toDate = project.toDate ? new Date(project.toDate) : null;
            
            dateText = `${fromDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`;
            if (toDate) {
              dateText += ` - ${toDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`;
            } else {
              dateText += ' - Present';
            }
          } catch (error) {
            dateText = `${project.fromDate} ${project.toDate ? `- ${project.toDate}` : '- Present'}`;
          }
        }
        
        if (dateText) {
          doc.setFont(undefined, 'normal');
          const dateWidth = doc.getTextWidth(dateText);
          doc.text(dateText, pageWidth - margin - dateWidth, yPosition);
        }
        
        yPosition += 4;
        
        // Project Details (Smaller font, truncated if needed)
        doc.setFont(undefined, 'normal');
        if (project.details && checkSpace(12)) {
          const maxDetailsHeight = maxY - yPosition - 10;
          const detailsLines = doc.splitTextToSize(project.details, pageWidth - 2 * margin);
          const detailsHeight = detailsLines.length * lineHeight;
          
          if (detailsHeight <= maxDetailsHeight) {
            doc.text(detailsLines, margin, yPosition);
            yPosition += detailsHeight;
          } else {
            // Truncate details if they don't fit
            const maxLines = Math.floor(maxDetailsHeight / lineHeight);
            const truncatedLines = detailsLines.slice(0, maxLines);
            doc.text(truncatedLines, margin, yPosition);
            doc.text('...', margin, yPosition + (maxLines * lineHeight));
            yPosition += (maxLines * lineHeight) + 5;
          }
        }
        
        yPosition += 4;
      });
      
      if (checkSpace(5)) {
        // Underline after projects
        doc.line(margin, yPosition, pageWidth - margin, yPosition);
        yPosition += sectionSpacing;
      }
    }
    
    // Skills Section (Single line)
    const skills = resume.data.skills || [];
    const filteredSkills = skills.filter(skill => skill && skill.trim() !== '');
    
    if (filteredSkills.length > 0 && checkSpace(15)) {
      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.text('SKILLS', margin, yPosition);
      yPosition += 6;
      
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      
      // Create inline skills list
      let skillsText = filteredSkills.join(' • ');
      adjustFontSize(10, skillsText, pageWidth - 2 * margin);
      const skillsLines = doc.splitTextToSize(skillsText, pageWidth - 2 * margin);
      
      if (checkSpace(skillsLines.length * lineHeight)) {
        doc.text(skillsLines, margin, yPosition);
        yPosition += skillsLines.length * lineHeight + sectionSpacing;
        
        if (checkSpace(5)) {
          // Underline after skills
          doc.line(margin, yPosition, pageWidth - margin, yPosition);
          yPosition += sectionSpacing;
        }
      }
    }
    
    // Certificates Section (Compact with invisible clickable links)
    const certificates = resume.data.certificates || [];
    const filteredCerts = certificates.filter(cert => cert && cert.name && cert.name.trim() !== '');
    
    if (filteredCerts.length > 0 && checkSpace(20)) {
      doc.setFontSize(11);
      doc.setFont(undefined, 'bold');
      doc.text('CERTIFICATIONS', margin, yPosition);
      yPosition += 6;
      
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      
      filteredCerts.forEach((cert, index) => {
        if (!checkSpace(8)) return;
        
        // Certificate name with invisible clickable link if available
        if (cert.link) {
          // Add clickable link but keep text black and normal appearance
          doc.textWithLink(cert.name, margin, yPosition, { url: cert.link });
        } else {
          // Regular text if no link
          doc.text(cert.name, margin, yPosition);
        }
        
        yPosition += 8;
      });
      
      if (checkSpace(5)) {
        // Underline after certificates
        doc.line(margin, yPosition, pageWidth - margin, yPosition);
        yPosition += sectionSpacing;
      }
    }
    
    // Add page number if we have space
    if (checkSpace(10)) {
      doc.setFontSize(9);
      doc.setFont(undefined, 'italic');
      doc.text('Resume generated by ResumeBuilder', margin, maxY - 5);
    }
    
    // Save the PDF
    const fileName = `${resume.name.replace(/\s+/g, '_')}.pdf`;
    doc.save(fileName);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Error generating PDF. Please try again.');
  }
};

// Generate PDF for Template 2 with two-column layout
const generateTemplate2PDF = (resume) => {
  try {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const margin = 15;
    const verticalLinePosition = pageWidth * 0.35; // 35% for left column
    let yPosition = margin;
    
    // Name (Center, Bold)
    doc.setFontSize(16);
    doc.setFont(undefined, 'bold');
    const name = resume.data.name || 'Your Name';
    const nameWidth = doc.getTextWidth(name);
    doc.text(name, (pageWidth - nameWidth) / 2, yPosition);
    yPosition += 10;
    
    // Email and Phone (Center)
    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');
    const email = resume.data.email || '';
    const phone = resume.data.phone || '';
    const contactInfo = `${email} ${email && phone ? '|' : ''} ${phone}`.trim();
    
    if (contactInfo) {
      const contactWidth = doc.getTextWidth(contactInfo);
      doc.text(contactInfo, (pageWidth - contactWidth) / 2, yPosition);
      yPosition += 8;
    }
    
    // Country (Center)
    const country = resume.data.country || '';
    if (country) {
      const countryWidth = doc.getTextWidth(country);
      doc.text(country, (pageWidth - countryWidth) / 2, yPosition);
      yPosition += 8;
    }
    
    yPosition += 5;
    
    // Horizontal Line
    doc.line(margin, yPosition, pageWidth - margin, yPosition);
    yPosition += 15;
    
    // Vertical Line (35% from left)
    doc.line(verticalLinePosition, yPosition, verticalLinePosition, pageHeight - margin);
    
    // Left Column (35%) - Education and Skills
    const leftColumnWidth = verticalLinePosition - margin - 10;
    let leftY = yPosition;
    
    // Education in Left Column
    const education = resume.data.education || [];
    if (education.length > 0) {
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.text('EDUCATION', margin, leftY);
      leftY += 8;
      
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      
      education.forEach((edu, index) => {
        if (!edu) return;
        
        // Institution Name
        doc.setFont(undefined, 'bold');
        const institutionText = edu.institution || 'Unknown Institution';
        const institutionLines = doc.splitTextToSize(institutionText, leftColumnWidth);
        doc.text(institutionLines, margin, leftY);
        leftY += institutionLines.length * 5 + 2;
        
        // Education Details
        doc.setFont(undefined, 'normal');
        if (edu.type === 'school') {
          if (edu.board) {
            doc.text(`Board: ${edu.board}`, margin, leftY);
            leftY += 5;
          }
          if (edu.percentage) {
            doc.text(`Percentage: ${edu.percentage}%`, margin, leftY);
            leftY += 5;
          }
        } else {
          if (edu.degree) {
            doc.text(`Degree: ${edu.degree}`, margin, leftY);
            leftY += 5;
          }
          if (edu.course) {
            doc.text(`Course: ${edu.course}`, margin, leftY);
            leftY += 5;
          }
          if (edu.cgpa) {
            doc.text(`CGPA: ${edu.cgpa}`, margin, leftY);
            leftY += 5;
          }
        }
        
        // Dates
        let dateText = '';
        if (edu.fromYear) {
          if (edu.pursuing) {
            dateText = `${formatMonthYear(edu.fromYear)} - Present`;
          } else if (edu.toYear) {
            dateText = `${formatMonthYear(edu.fromYear)} - ${formatMonthYear(edu.toYear)}`;
          } else {
            dateText = `${formatMonthYear(edu.fromYear)}`;
          }
        }
        
        if (dateText) {
          doc.text(dateText, margin, leftY);
          leftY += 5;
        }
        
        // Underline after each education entry
        if (index < education.length - 1) {
          doc.line(margin, leftY, verticalLinePosition - 10, leftY);
          leftY += 8;
        }
      });
      
      leftY += 10;
    }
    
    // Skills in Left Column
    const skills = resume.data.skills || [];
    const filteredSkills = skills.filter(skill => skill && skill.trim() !== '');
    
    if (filteredSkills.length > 0) {
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.text('SKILLS', margin, leftY);
      leftY += 8;
      
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      
      filteredSkills.forEach((skill, index) => {
        if (skill.trim()) {
          doc.text(`• ${skill}`, margin, leftY);
          leftY += 5;
        }
      });
    }
    
    // Right Column (65%) - Summary, Projects, Certificates
    const rightColumnStart = verticalLinePosition + 10;
    const rightColumnWidth = pageWidth - rightColumnStart - margin;
    let rightY = yPosition;
    
    // Summary in Right Column
    const summary = resume.data.summary || '';
    if (summary) {
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.text('SUMMARY', rightColumnStart, rightY);
      rightY += 8;
      
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      const summaryLines = doc.splitTextToSize(summary, rightColumnWidth);
      doc.text(summaryLines, rightColumnStart, rightY);
      rightY += summaryLines.length * 5 + 15;
    }
    
    // Projects in Right Column
    const projects = resume.data.projects || [];
    if (projects.length > 0) {
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.text('PROJECTS', rightColumnStart, rightY);
      rightY += 8;
      
      doc.setFontSize(10);
      
      projects.forEach((project, index) => {
        if (!project) return;
        
        // Project Name (Bold)
        doc.setFont(undefined, 'bold');
        const projectName = project.name || 'Untitled Project';
        doc.text(projectName, rightColumnStart, rightY);
        rightY += 6;
        
        // Project Dates
        doc.setFont(undefined, 'normal');
        let dateText = '';
        if (project.fromDate) {
          try {
            const fromDate = new Date(project.fromDate);
            const toDate = project.toDate ? new Date(project.toDate) : null;
            
            dateText = `${fromDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`;
            if (toDate) {
              dateText += ` - ${toDate.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`;
            } else {
              dateText += ' - Present';
            }
          } catch (error) {
            dateText = `${project.fromDate} ${project.toDate ? `- ${project.toDate}` : '- Present'}`;
          }
        }
        
        if (dateText) {
          doc.text(dateText, rightColumnStart, rightY);
          rightY += 5;
        }
        
        // Project Details
        if (project.details) {
          const detailsLines = doc.splitTextToSize(project.details, rightColumnWidth);
          doc.text(detailsLines, rightColumnStart, rightY);
          rightY += detailsLines.length * 5;
        }
        
        rightY += 8;
      });
    }
    
    // Certificates in Right Column
    const certificates = resume.data.certificates || [];
    const filteredCerts = certificates.filter(cert => cert && cert.name && cert.name.trim() !== '');
    
    if (filteredCerts.length > 0) {
      doc.setFontSize(12);
      doc.setFont(undefined, 'bold');
      doc.text('CERTIFICATIONS', rightColumnStart, rightY);
      rightY += 8;
      
      doc.setFontSize(10);
      doc.setFont(undefined, 'normal');
      
      filteredCerts.forEach((cert, index) => {
        if (cert.link) {
          // Clickable link (invisible)
          doc.textWithLink(cert.name, rightColumnStart, rightY, { url: cert.link });
        } else {
          doc.text(cert.name, rightColumnStart, rightY);
        }
        rightY += 6;
      });
    }
    
    // Save the PDF
    const fileName = `${resume.name.replace(/\s+/g, '_')}_template2.pdf`;
    doc.save(fileName);
  } catch (error) {
    console.error('Error generating Template 2 PDF:', error);
    alert('Error generating PDF. Please try again.');
  }
};


  // Function to delete a resume
  const deleteResume = (id) => {
    if (window.confirm('Are you sure you want to delete this resume?')) {
      const updatedResumes = resumes.filter(resume => resume.id !== id);
      setResumes(updatedResumes);
      localStorage.setItem('resumes', JSON.stringify(updatedResumes));
      setSelectedResume(null);
    }
  };

  // Function to view resume details
  const viewResumeDetails = (resume) => {
    setSelectedResume(resume);
  };

  if (loading) {
    return <div className="loading">Loading resumes...</div>;
  }

  return (
    <div className="saved-resume-container">
      <h2>Your Saved Resumes</h2>
      
      {resumes.length === 0 ? (
        <div className="empty-state">
          <p>You haven't saved any resumes yet.</p>
          <p>Create a new resume to get started!</p>
        </div>
      ) : (
        <div className="resumes-content">
          <div className="resumes-list">
            <h3>All Resumes ({resumes.length})</h3>
            <div className="resume-cards">
              {resumes.map((resume) => (
                <div key={resume.id} className="resume-card">
                  <div className="resume-card-header">
                    <h4>{resume.name}</h4>
                    <span className="template-badge">
                      {resume.data?.selectedTemplate || 'template1'}
                    </span>
                  </div>
                  <div className="resume-card-body">
                    <p className="resume-date">
                      Created: {new Date(resume.createdAt).toLocaleDateString()}
                    </p>
                    <p className="resume-date">
                      Updated: {new Date(resume.updatedAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="resume-card-actions">
                    <button 
                      onClick={() => viewResumeDetails(resume)}
                      className="view-btn"
                    >
                      View Details
                    </button>
                    <button 
                      onClick={() => downloadAsPDF(resume)}
                      className="download-btn"
                    >
                      Download PDF
                    </button>
                    <button 
                      onClick={() => deleteResume(resume.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedResume && (
            <div className="resume-details">
              <div className="details-header">
                <h3>{selectedResume.name}</h3>
                <button 
                  onClick={() => setSelectedResume(null)}
                  className="close-btn"
                >
                  ×
                </button>
              </div>
              
              <div className="details-content">
                <div className="detail-section">
                  <h4>Basic Information</h4>
                  <p><strong>Name:</strong> {selectedResume.data?.name || 'Not provided'}</p>
                  <p><strong>Email:</strong> {selectedResume.data?.email || 'Not provided'}</p>
                  <p><strong>Phone:</strong> {selectedResume.data?.phone || 'Not provided'}</p>
                  <p><strong>Country:</strong> {selectedResume.data?.country || 'Not provided'}</p>
                </div>

                {selectedResume.data?.summary && (
                  <div className="detail-section">
                    <h4>Summary</h4>
                    <p>{selectedResume.data.summary}</p>
                  </div>
                )}

                {selectedResume.data?.education && selectedResume.data.education.length > 0 && (
                  <div className="detail-section">
                    <h4>Education</h4>
                    {selectedResume.data.education.map((edu, index) => (
                      edu && (
                        <div key={index} className="education-item">
                          <h5>{edu.type === 'school' ? 'School' : 'College'} #{index + 1}</h5>
                          <p><strong>Institution:</strong> {edu.institution || 'Not provided'}</p>
                          {edu.type === 'school' ? (
                            <>
                              <p><strong>Board:</strong> {edu.board || 'Not provided'}</p>
                              <p><strong>Percentage:</strong> {edu.percentage || 'Not provided'}%</p>
                            </>
                          ) : (
                            <>
                              <p><strong>Degree:</strong> {edu.degree || 'Not provided'}</p>
                              <p><strong>Course:</strong> {edu.course || 'Not provided'}</p>
                              <p><strong>CGPA:</strong> {edu.cgpa || 'Not provided'}</p>
                            </>
                          )}
                          <p><strong>From:</strong> {formatMonthYear(edu.fromYear) || 'Not provided'}</p>
                          <p><strong>To:</strong> {edu.pursuing ? 'Present' : formatMonthYear(edu.toYear) || 'Not provided'}</p>
                        </div>
                      )
                    ))}
                  </div>
                )}

                {selectedResume.data?.projects && selectedResume.data.projects.length > 0 && (
                  <div className="detail-section">
                    <h4>Projects</h4>
                    {selectedResume.data.projects.map((project, index) => (
                      project && (
                        <div key={index} className="project-item">
                          <h5>{project.name || 'Untitled Project'}</h5>
                          <p><strong>Duration:</strong> {project.fromDate || 'Not provided'} to {project.toDate || 'Present'}</p>
                          {project.details && <p><strong>Details:</strong> {project.details}</p>}
                        </div>
                      )
                    ))}
                  </div>
                )}

                {selectedResume.data?.skills && selectedResume.data.skills.length > 0 && (
                  <div className="detail-section">
                    <h4>Skills</h4>
                    <div className="skills-list">
                      {selectedResume.data.skills.map((skill, index) => (
                        skill && skill.trim() && <span key={index} className="skill-tag">{skill}</span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedResume.data?.certificates && selectedResume.data.certificates.length > 0 && (
                  <div className="detail-section">
                    <h4>Certificates</h4>
                    {selectedResume.data.certificates.map((cert, index) => (
                      cert && cert.name && (
                        <div key={index} className="certificate-item">
                          <p><strong>{cert.name}</strong></p>
                          {cert.link && <p><a href={cert.link} target="_blank" rel="noopener noreferrer">{cert.link}</a></p>}
                        </div>
                      )
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SavedResume;