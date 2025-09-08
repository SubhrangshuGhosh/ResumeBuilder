import React, { useState } from 'react';
import '../design/NewResume.css';
import r1Image from '../img/r1.jpg';
import r2Image from '../img/r2.png';
const NewResume = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Details
    name: '',
    email: '',
    phone: '',
    country: '',
    
    // Summary
    summary: '',
    
    // Education
    education: [{
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
    
    // Projects
    projects: [{
      name: '',
      fromDate: '',
      toDate: '',
      details: ''
    }],
    
    // Skills
    skills: [''],
    
    // Certificates
    certificates: [{
      name: '',
      link: ''
    }],
    
    // Save options
    fileName: '',
    selectedTemplate: 'template1'
  });

  // Handle input changes for basic details
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle education type change
  const handleEducationTypeChange = (index, type) => {
    const updatedEducation = [...formData.education];
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
    setFormData({
      ...formData,
      education: updatedEducation
    });
  };

  // Handle education input changes
  const handleEducationChange = (index, field, value) => {
    const updatedEducation = [...formData.education];
    updatedEducation[index] = {
      ...updatedEducation[index],
      [field]: value
    };
    setFormData({
      ...formData,
      education: updatedEducation
    });
  };

  // Add new education entry
  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
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
    });
  };

  // Remove education entry
  const removeEducation = (index) => {
    if (formData.education.length > 1) {
      const updatedEducation = [...formData.education];
      updatedEducation.splice(index, 1);
      setFormData({
        ...formData,
        education: updatedEducation
      });
    }
  };

  // Handle project changes
  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...formData.projects];
    updatedProjects[index] = {
      ...updatedProjects[index],
      [field]: value
    };
    setFormData({
      ...formData,
      projects: updatedProjects
    });
  };

  // Add new project
  const addProject = () => {
    setFormData({
      ...formData,
      projects: [
        ...formData.projects,
        {
          name: '',
          fromDate: '',
          toDate: '',
          details: ''
        }
      ]
    });
  };

  // Remove project
  const removeProject = (index) => {
    if (formData.projects.length > 1) {
      const updatedProjects = [...formData.projects];
      updatedProjects.splice(index, 1);
      setFormData({
        ...formData,
        projects: updatedProjects
      });
    }
  };

  // Handle skill changes
  const handleSkillChange = (index, value) => {
    const updatedSkills = [...formData.skills];
    updatedSkills[index] = value;
    setFormData({
      ...formData,
      skills: updatedSkills
    });
  };

  // Add new skill
  const addSkill = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, '']
    });
  };

  // Remove skill
  const removeSkill = (index) => {
    if (formData.skills.length > 1) {
      const updatedSkills = [...formData.skills];
      updatedSkills.splice(index, 1);
      setFormData({
        ...formData,
        skills: updatedSkills
      });
    }
  };

  // Handle certificate changes
  const handleCertificateChange = (index, field, value) => {
    const updatedCertificates = [...formData.certificates];
    updatedCertificates[index] = {
      ...updatedCertificates[index],
      [field]: value
    };
    setFormData({
      ...formData,
      certificates: updatedCertificates
    });
  };

  // Add new certificate
  const addCertificate = () => {
    setFormData({
      ...formData,
      certificates: [
        ...formData.certificates,
        {
          name: '',
          link: ''
        }
      ]
    });
  };

  // Remove certificate
  const removeCertificate = (index) => {
    if (formData.certificates.length > 1) {
      const updatedCertificates = [...formData.certificates];
      updatedCertificates.splice(index, 1);
      setFormData({
        ...formData,
        certificates: updatedCertificates
      });
    }
  };

  // Handle template selection
  const handleTemplateSelect = (template) => {
    setFormData({
      ...formData,
      selectedTemplate: template
    });
  };

  // Handle save resume
  const handleSaveResume = () => {
    // Save the resume data to localStorage or send to backend
    const resumes = JSON.parse(localStorage.getItem('resumes') || '[]');
    const newResume = {
      id: Date.now(),
      name: formData.fileName || `${formData.name}'s Resume`,
      template: formData.selectedTemplate,
      data: formData,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    resumes.push(newResume);
    localStorage.setItem('resumes', JSON.stringify(resumes));
    
    // Redirect to saved resumes page or show success message
    alert('Resume saved successfully!');
    // You can redirect to saved resumes page here
  };

  // Navigation functions
  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  // Render functions for each step
  const renderBasicDetails = () => (
    <div className="form-step">
      <h2>Basic Details</h2>
      <div className="form-group">
        <label>Full Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter your full name"
          required
        />
      </div>
      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Enter your email"
          required
        />
      </div>
      <div className="form-group">
        <label>Phone Number</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="Enter your phone number"
          required
        />
      </div>
      <div className="form-group">
        <label>Country</label>
        <input
          type="text"
          name="country"
          value={formData.country}
          onChange={handleInputChange}
          placeholder="Enter your country"
          required
        />
      </div>
      <div className="navigation-buttons">
        <button type="button" onClick={nextStep} className="next-btn">
          Next
        </button>
      </div>
    </div>
  );

  const renderSummary = () => (
    <div className="form-step">
      <h2>Professional Summary</h2>
      <div className="form-group">
        <label>Summary (max 500 words)</label>
        <textarea
          name="summary"
          value={formData.summary}
          onChange={handleInputChange}
          placeholder="Write a brief summary about yourself..."
          rows="5"
          maxLength="500"
        />
        <div className="char-count">{formData.summary.length}/500 characters</div>
      </div>
      <div className="navigation-buttons">
        <button type="button" onClick={prevStep} className="prev-btn">
          Previous
        </button>
        <button type="button" onClick={nextStep} className="next-btn">
          Next
        </button>
      </div>
    </div>
  );

  const renderEducation = () => (
    <div className="form-step">
      <h2>Education</h2>
      {formData.education.map((edu, index) => (
        <div key={index} className="education-item">
          <h3>Education #{index + 1}</h3>
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
              required
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

          {formData.education.length > 1 && (
            <button
              type="button"
              onClick={() => removeEducation(index)}
              className="remove-btn"
            >
              Remove
            </button>
          )}
        </div>
      ))}

      <button type="button" onClick={addEducation} className="add-btn">
        + Add Another Education
      </button>

      <div className="navigation-buttons">
        <button type="button" onClick={prevStep} className="prev-btn">
          Previous
        </button>
        <button type="button" onClick={nextStep} className="next-btn">
          Next
        </button>
      </div>
    </div>
  );

  const renderProjects = () => (
    <div className="form-step">
      <h2>Projects</h2>
      {formData.projects.map((project, index) => (
        <div key={index} className="project-item">
          <h3>Project #{index + 1}</h3>
          <div className="form-group">
            <label>Project Name</label>
            <input
              type="text"
              value={project.name}
              onChange={(e) => handleProjectChange(index, 'name', e.target.value)}
              placeholder="Enter project name"
              required
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
            <label>To Date</label>
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
          {formData.projects.length > 1 && (
            <button
              type="button"
              onClick={() => removeProject(index)}
              className="remove-btn"
            >
              Remove
            </button>
          )}
        </div>
      ))}

      <button type="button" onClick={addProject} className="add-btn">
        + Add Another Project
      </button>

      <div className="navigation-buttons">
        <button type="button" onClick={prevStep} className="prev-btn">
          Previous
        </button>
        <button type="button" onClick={nextStep} className="next-btn">
          Next
        </button>
      </div>
    </div>
  );

  const renderSkills = () => (
    <div className="form-step">
      <h2>Skills</h2>
      {formData.skills.map((skill, index) => (
        <div key={index} className="skill-item">
          <div className="form-group">
            <label>Skill #{index + 1}</label>
            <input
              type="text"
              value={skill}
              onChange={(e) => handleSkillChange(index, e.target.value)}
              placeholder="Enter a skill"
              required
            />
          </div>
          {formData.skills.length > 1 && (
            <button
              type="button"
              onClick={() => removeSkill(index)}
              className="remove-btn"
            >
              Remove
            </button>
          )}
        </div>
      ))}

      <button type="button" onClick={addSkill} className="add-btn">
        + Add Another Skill
      </button>

      <div className="navigation-buttons">
        <button type="button" onClick={prevStep} className="prev-btn">
          Previous
        </button>
        <button type="button" onClick={nextStep} className="next-btn">
          Next
        </button>
      </div>
    </div>
  );

  const renderCertificates = () => (
    <div className="form-step">
      <h2>Certificates</h2>
      {formData.certificates.map((certificate, index) => (
        <div key={index} className="certificate-item">
          <h3>Certificate #{index + 1}</h3>
          <div className="form-group">
            <label>Certificate Name</label>
            <input
              type="text"
              value={certificate.name}
              onChange={(e) => handleCertificateChange(index, 'name', e.target.value)}
              placeholder="Enter certificate name"
              required
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
          {formData.certificates.length > 1 && (
            <button
              type="button"
              onClick={() => removeCertificate(index)}
              className="remove-btn"
            >
              Remove
            </button>
          )}
        </div>
      ))}

      <button type="button" onClick={addCertificate} className="add-btn">
        + Add Another Certificate
      </button>

      <div className="navigation-buttons">
        <button type="button" onClick={prevStep} className="prev-btn">
          Previous
        </button>
        <button type="button" onClick={nextStep} className="next-btn">
          Save Resume
        </button>
      </div>
    </div>
  );

  const renderSaveOptions = () => (
  <div className="form-step">
    <h2>Save Your Resume</h2>
    
    <div className="form-group">
      <label>File Name</label>
      <input
        type="text"
        value={formData.fileName}
        onChange={(e) => setFormData({...formData, fileName: e.target.value})}
        placeholder="Enter a name for your resume file"
        required
      />
    </div>
    
    <div className="form-group">
      <label>Select Template</label>
      <div className="templates-container">
        <div 
          className={`template-card ${formData.selectedTemplate === 'template1' ? 'selected' : ''}`}
          onClick={() => handleTemplateSelect('template1')}
        >
          <div className="template-image">
            <img src={r1Image} alt="Template 1 - Professional Design" />
            <div className="template-overlay">
              <span>Template 1</span>
            </div>
          </div>
        </div>
        
        <div 
          className={`template-card ${formData.selectedTemplate === 'template2' ? 'selected' : ''}`}
          onClick={() => handleTemplateSelect('template2')}
        >
          <div className="template-image">
            <img src={r2Image} alt="Template 2 - Modern Design" />
            <div className="template-overlay">
              <span>Template 2</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div className="navigation-buttons">
      <button type="button" onClick={prevStep} className="prev-btn">
        Previous
      </button>
      <button type="button" onClick={handleSaveResume} className="save-btn">
        Save Resume
      </button>
    </div>
  </div>
);

  return (
    <div className="new-resume-container">
      <div className="progress-bar">
        <div className="progress-step" data-active={currentStep >= 1}>
          <span>1</span>
          <p>Basic Details</p>
        </div>
        <div className="progress-step" data-active={currentStep >= 2}>
          <span>2</span>
          <p>Summary</p>
        </div>
        <div className="progress-step" data-active={currentStep >= 3}>
          <span>3</span>
          <p>Education</p>
        </div>
        <div className="progress-step" data-active={currentStep >= 4}>
          <span>4</span>
          <p>Projects</p>
        </div>
        <div className="progress-step" data-active={currentStep >= 5}>
          <span>5</span>
          <p>Skills</p>
        </div>
        <div className="progress-step" data-active={currentStep >= 6}>
          <span>6</span>
          <p>Certificates</p>
        </div>
        <div className="progress-step" data-active={currentStep >= 7}>
          <span>7</span>
          <p>Save</p>
        </div>
      </div>

      <div className="form-content">
        {currentStep === 1 && renderBasicDetails()}
        {currentStep === 2 && renderSummary()}
        {currentStep === 3 && renderEducation()}
        {currentStep === 4 && renderProjects()}
        {currentStep === 5 && renderSkills()}
        {currentStep === 6 && renderCertificates()}
        {currentStep === 7 && renderSaveOptions()}
      </div>
    </div>
  );
};

export default NewResume;