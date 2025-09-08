import React, { useState, useEffect } from 'react';
import '../design/EditResume.css';

const EditResume = () => {
  const [resumes, setResumes] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [editingResume, setEditingResume] = useState(null);
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

  // Function to start editing a resume
  const startEditing = (resume) => {
    setEditingResume(JSON.parse(JSON.stringify(resume))); // Deep copy
    setSelectedResume(null);
  };

  // Function to cancel editing
  const cancelEditing = () => {
    setEditingResume(null);
  };

  // Function to handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingResume({
      ...editingResume,
      data: {
        ...editingResume.data,
        [name]: value
      }
    });
  };

  // Function to handle education changes
  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...editingResume.data.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value
    };
    
    setEditingResume({
      ...editingResume,
      data: {
        ...editingResume.data,
        education: updatedEducation
      }
    });
  };

  // Function to handle education type change
  const handleEducationTypeChange = (index, type) => {
    const updatedEducation = [...editingResume.data.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      type,
      // Reset fields when changing type
      board: type === 'school' ? updatedEducation[index].board : '',
      percentage: type === 'school' ? updatedEducation[index].percentage : '',
      degree: type === 'college' ? updatedEducation[index].degree : '',
      course: type === 'college' ? updatedEducation[index].course : '',
      cgpa: type === 'college' ? updatedEducation[index].cgpa : ''
    };
    
    setEditingResume({
      ...editingResume,
      data: {
        ...editingResume.data,
        education: updatedEducation
      }
    });
  };

  // Add new education entry
  const addEducation = () => {
    setEditingResume({
      ...editingResume,
      data: {
        ...editingResume.data,
        education: [
          ...editingResume.data.education,
          {
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
          }
        ]
      }
    });
  };

  // Remove education entry
  const removeEducation = (index) => {
    if (editingResume.data.education.length > 1) {
      const updatedEducation = [...editingResume.data.education];
      updatedEducation.splice(index, 1);
      
      setEditingResume({
        ...editingResume,
        data: {
          ...editingResume.data,
          education: updatedEducation
        }
      });
    }
  };

  // Function to handle project changes
  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...editingResume.data.projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value
    };
    
    setEditingResume({
      ...editingResume,
      data: {
        ...editingResume.data,
        projects: updatedProjects
      }
    });
  };

  // Add new project
  const addProject = () => {
    setEditingResume({
      ...editingResume,
      data: {
        ...editingResume.data,
        projects: [
          ...editingResume.data.projects,
          {
            name: '',
            fromDate: '',
            toDate: '',
            details: ''
          }
        ]
      }
    });
  };

  // Remove project
  const removeProject = (index) => {
    if (editingResume.data.projects.length > 1) {
      const updatedProjects = [...editingResume.data.projects];
      updatedProjects.splice(index, 1);
      
      setEditingResume({
        ...editingResume,
        data: {
          ...editingResume.data,
          projects: updatedProjects
        }
      });
    }
  };

  // Function to handle skill changes
  const handleSkillChange = (index, value) => {
    const updatedSkills = [...editingResume.data.skills];
    updatedSkills[index] = value;
    
    setEditingResume({
      ...editingResume,
      data: {
        ...editingResume.data,
        skills: updatedSkills
      }
    });
  };

  // Add new skill
  const addSkill = () => {
    setEditingResume({
      ...editingResume,
      data: {
        ...editingResume.data,
        skills: [...editingResume.data.skills, '']
      }
    });
  };

  // Remove skill
  const removeSkill = (index) => {
    if (editingResume.data.skills.length > 1) {
      const updatedSkills = [...editingResume.data.skills];
      updatedSkills.splice(index, 1);
      
      setEditingResume({
        ...editingResume,
        data: {
          ...editingResume.data,
          skills: updatedSkills
        }
      });
    }
  };

  // Function to handle certificate changes
  const handleCertificateChange = (index, field, value) => {
    const updatedCertificates = [...editingResume.data.certificates];
    updatedCertificates[index] = {
      ...updatedCertificates[index],
      [field]: value
    };
    
    setEditingResume({
      ...editingResume,
      data: {
        ...editingResume.data,
        certificates: updatedCertificates
      }
    });
  };

  // Add new certificate
  const addCertificate = () => {
    setEditingResume({
      ...editingResume,
      data: {
        ...editingResume.data,
        certificates: [
          ...editingResume.data.certificates,
          {
            name: '',
            link: ''
          }
        ]
      }
    });
  };

  // Remove certificate
  const removeCertificate = (index) => {
    if (editingResume.data.certificates.length > 1) {
      const updatedCertificates = [...editingResume.data.certificates];
      updatedCertificates.splice(index, 1);
      
      setEditingResume({
        ...editingResume,
        data: {
          ...editingResume.data,
          certificates: updatedCertificates
        }
      });
    }
  };

  // Function to save edited resume
  const saveResume = () => {
    try {
      const updatedResumes = resumes.map(resume => 
        resume.id === editingResume.id 
          ? {...editingResume, updatedAt: new Date().toISOString()}
          : resume
      );
      
      setResumes(updatedResumes);
      localStorage.setItem('resumes', JSON.stringify(updatedResumes));
      setEditingResume(null);
      alert('Resume updated successfully!');
    } catch (error) {
      console.error('Error saving resume:', error);
      alert('Error saving resume. Please try again.');
    }
  };

  // Function to view resume details
  const viewResumeDetails = (resume) => {
    setSelectedResume(resume);
    setEditingResume(null);
  };

  if (loading) {
    return <div className="loading">Loading resumes...</div>;
  }

  // Render editing form
  if (editingResume) {
    return (
      <div className="edit-resume-container">
        <div className="edit-header">
          <h2>Editing: {editingResume.name}</h2>
          <div className="edit-actions">
            <button onClick={cancelEditing} className="cancel-btn">
              Cancel
            </button>
            <button onClick={saveResume} className="save-btn">
              Save Changes
            </button>
          </div>
        </div>

        <div className="edit-form">
          {/* Basic Details Section */}
          <div className="form-section">
            <h3>Basic Details</h3>
            <div className="form-group">
              <label>Resume Name</label>
              <input
                type="text"
                value={editingResume.name}
                onChange={(e) => setEditingResume({...editingResume, name: e.target.value})}
                placeholder="Enter resume name"
              />
            </div>
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                value={editingResume.data.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={editingResume.data.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
              />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={editingResume.data.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
              />
            </div>
            <div className="form-group">
              <label>Country</label>
              <input
                type="text"
                name="country"
                value={editingResume.data.country}
                onChange={handleInputChange}
                placeholder="Enter your country"
              />
            </div>
          </div>

          {/* Summary Section */}
          <div className="form-section">
            <h3>Professional Summary</h3>
            <div className="form-group">
              <label>Summary (max 500 characters)</label>
              <textarea
                name="summary"
                value={editingResume.data.summary}
                onChange={handleInputChange}
                placeholder="Write a brief summary about yourself..."
                rows="4"
                maxLength="500"
              />
              <div className="char-count">{editingResume.data.summary.length}/500 characters</div>
            </div>
          </div>

          {/* Education Section */}
          <div className="form-section">
            <h3>Education</h3>
            {editingResume.data.education.map((edu, index) => (
              <div key={index} className="education-item">
                <h4>Education #{index + 1}</h4>
                <div className="form-group">
                  <label>Education Type</label>
                  <select
                    value={edu.type}
                    onChange={(e) => handleEducationTypeChange(index, e.target.value)}
                  >
                    <option value="school">School</option>
                    <option value="college">College</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>{edu.type === 'school' ? 'School Name' : 'College Name'}</label>
                  <input
                    type="text"
                    value={edu.institution}
                    onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                    placeholder={edu.type === 'school' ? 'Enter school name' : 'Enter college name'}
                  />
                </div>

                {edu.type === 'school' ? (
                  <>
                    <div className="form-group">
                      <label>Board Name</label>
                      <input
                        type="text"
                        value={edu.board}
                        onChange={(e) => handleEducationChange(index, 'board', e.target.value)}
                        placeholder="Enter board name"
                      />
                    </div>
                    <div className="form-group">
                      <label>Percentage</label>
                      <input
                        type="number"
                        value={edu.percentage}
                        onChange={(e) => handleEducationChange(index, 'percentage', e.target.value)}
                        placeholder="Enter percentage"
                        step="0.01"
                        min="0"
                        max="100"
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="form-group">
                      <label>Degree</label>
                      <input
                        type="text"
                        value={edu.degree}
                        onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                        placeholder="Enter degree"
                      />
                    </div>
                    <div className="form-group">
                      <label>Course</label>
                      <input
                        type="text"
                        value={edu.course}
                        onChange={(e) => handleEducationChange(index, 'course', e.target.value)}
                        placeholder="Enter course name"
                      />
                    </div>
                    <div className="form-group">
                      <label>CGPA</label>
                      <input
                        type="number"
                        value={edu.cgpa}
                        onChange={(e) => handleEducationChange(index, 'cgpa', e.target.value)}
                        placeholder="Enter CGPA"
                        step="0.01"
                        min="0"
                        max="10"
                      />
                    </div>
                  </>
                )}

                <div className="form-group">
                  <label>From Year</label>
                  <input
                    type="number"
                    value={edu.fromYear}
                    onChange={(e) => handleEducationChange(index, 'fromYear', e.target.value)}
                    placeholder="YYYY"
                    min="1900"
                    max="2099"
                  />
                </div>

                <div className="form-group">
                  <label>
                    <input
                      type="checkbox"
                      checked={edu.pursuing}
                      onChange={(e) => handleEducationChange(index, 'pursuing', e.target.checked)}
                    />
                    Currently pursuing
                  </label>
                </div>

                {!edu.pursuing && (
                  <div className="form-group">
                    <label>To Year</label>
                    <input
                      type="number"
                      value={edu.toYear}
                      onChange={(e) => handleEducationChange(index, 'toYear', e.target.value)}
                      placeholder="YYYY"
                      min="1900"
                      max="2099"
                    />
                  </div>
                )}

                {editingResume.data.education.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeEducation(index)}
                    className="remove-btn"
                  >
                    Remove Education
                  </button>
                )}
              </div>
            ))}

            <button type="button" onClick={addEducation} className="add-btn">
              + Add Another Education
            </button>
          </div>

          {/* Projects Section */}
          <div className="form-section">
            <h3>Projects</h3>
            {editingResume.data.projects.map((project, index) => (
              <div key={index} className="project-item">
                <h4>Project #{index + 1}</h4>
                <div className="form-group">
                  <label>Project Name</label>
                  <input
                    type="text"
                    value={project.name}
                    onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
                    placeholder="Enter project name"
                  />
                </div>
                <div className="form-group">
                  <label>From Date</label>
                  <input
                    type="month"
                    value={project.fromDate}
                    onChange={(e) => handleProjectChange(index, 'fromDate', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>To Date (leave empty if ongoing)</label>
                  <input
                    type="month"
                    value={project.toDate}
                    onChange={(e) => handleProjectChange(index, 'toDate', e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Project Details</label>
                  <textarea
                    value={project.details}
                    onChange={(e) => handleProjectChange(index, 'details', e.target.value)}
                    placeholder="Describe your project..."
                    rows="3"
                  />
                </div>
                {editingResume.data.projects.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeProject(index)}
                    className="remove-btn"
                  >
                    Remove Project
                  </button>
                )}
              </div>
            ))}

            <button type="button" onClick={addProject} className="add-btn">
              + Add Another Project
            </button>
          </div>

          {/* Skills Section */}
          <div className="form-section">
            <h3>Skills</h3>
            {editingResume.data.skills.map((skill, index) => (
              <div key={index} className="skill-item">
                <div className="form-group">
                  <label>Skill #{index + 1}</label>
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => handleSkillChange(index, e.target.value)}
                    placeholder="Enter a skill"
                  />
                </div>
                {editingResume.data.skills.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSkill(index)}
                    className="remove-btn"
                  >
                    Remove Skill
                  </button>
                )}
              </div>
            ))}

            <button type="button" onClick={addSkill} className="add-btn">
              + Add Another Skill
            </button>
          </div>

          {/* Certificates Section */}
          <div className="form-section">
            <h3>Certificates</h3>
            {editingResume.data.certificates.map((certificate, index) => (
              <div key={index} className="certificate-item">
                <h4>Certificate #{index + 1}</h4>
                <div className="form-group">
                  <label>Certificate Name</label>
                  <input
                    type="text"
                    value={certificate.name}
                    onChange={(e) => handleCertificateChange(index, 'name', e.target.value)}
                    placeholder="Enter certificate name"
                  />
                </div>
                <div className="form-group">
                  <label>Certificate Link (optional)</label>
                  <input
                    type="url"
                    value={certificate.link}
                    onChange={(e) => handleCertificateChange(index, 'link', e.target.value)}
                    placeholder="https://example.com/certificate"
                  />
                </div>
                {editingResume.data.certificates.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeCertificate(index)}
                    className="remove-btn"
                  >
                    Remove Certificate
                  </button>
                )}
              </div>
            ))}

            <button type="button" onClick={addCertificate} className="add-btn">
              + Add Another Certificate
            </button>
          </div>

          {/* Template Selection */}
          <div className="form-section">
            <h3>Template Selection</h3>
            <div className="form-group">
              <label>Select Template</label>
              <select
                name="selectedTemplate"
                value={editingResume.data.selectedTemplate}
                onChange={handleInputChange}
              >
                <option value="template1">Template 1</option>
                <option value="template2">Template 2</option>
              </select>
            </div>
          </div>

          <div className="form-actions">
            <button onClick={cancelEditing} className="cancel-btn">
              Cancel
            </button>
            <button onClick={saveResume} className="save-btn">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-resume-container">
      <h2>Edit Your Resumes</h2>
      
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
                      onClick={() => startEditing(resume)}
                      className="edit-btn"
                    >
                      Edit
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
                          <p><strong>From:</strong> {edu.fromYear || 'Not provided'}</p>
                          <p><strong>To:</strong> {edu.pursuing ? 'Present' : edu.toYear || 'Not provided'}</p>
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

export default EditResume;