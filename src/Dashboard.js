import React, { useState } from 'react';
import './Dashboard.css'; 
import { useNavigate } from 'react-router-dom';
import ModalTestimonials from './ModalTestimonials';
import ModalCaseStudy from './ModalCaseStudy';
import ModalLeadership from './ModalLeadership';
import Alert from './Alert';

function Dashboard() {
  const [isTestimonialModalOpen, setTestimonialModalOpen] = useState(false);
  const [isCaseStudyModalOpen, setCaseStudyModalOpen] = useState(false);
  const [isLeadershipModalOpen, setLeadershipModalOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const navigate = useNavigate();

  const handleUploadClick = (type) => {
    if (type === 'testimonial') {
      setTestimonialModalOpen(true);
    } else if (type === 'caseStudy') {
      setCaseStudyModalOpen(true);
    } else if (type === 'leadership') {
      setLeadershipModalOpen(true);
    }
  };

  const handleViewClick = (type) => {
    if (type === 'caseStudy') {
      navigate('/all-case-studies');
    } else if (type === 'testimonial') {
      navigate('/all-testimonials');
    } else if (type === 'leadership') {
      navigate('/all-leaderships');
    }
  };

  const handleCloseModal = (type) => {
    if (type === 'testimonial') {
      setTestimonialModalOpen(false);
    } else if (type === 'caseStudy') {
      setCaseStudyModalOpen(false);
    } else if (type === 'leadership') {
      setLeadershipModalOpen(false);
    }
  };

  const handleSubmit = async (data, type) => {
    let url;
    if (type === 'testimonial') {
      url = 'http://localhost:7000/setTestimonials';
    } else if (type === 'caseStudy') {
      url = 'http://localhost:7000/setCaseStudy';
    } else if (type === 'leadership') {
      url = 'http://localhost:7000/setLeadership';
    }

    try {
      const formData = new FormData();
      formData.append('mediaContent', data.image);
      if (type === 'testimonial') {
        formData.append('date', data.date);
        formData.append('name', data.name);
        formData.append('ratings', data.ratings);
        formData.append('details', data.details);
      } else if (type === 'caseStudy') {
        formData.append('date', data.date);
        formData.append('category', data.category);
        formData.append('sub_category', data.sub_category);
        formData.append('details', data.details);
      } else if (type === 'leadership') {
        formData.append('name', data.name);
        formData.append('designation', data.designation);
      }

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        setAlertMessage(`${type.charAt(0).toUpperCase() + type.slice(1)} uploaded successfully`);
      } else {
        setAlertMessage(`Error: ${result.message}`);
      }
    } catch (error) {
      console.error(`Error uploading ${type}:`, error);
      setAlertMessage(`An error occurred while uploading the ${type}.`);
    }

    if (type === 'testimonial') {
      setTestimonialModalOpen(false);
    } else if (type === 'caseStudy') {
      setCaseStudyModalOpen(false);
    } else if (type === 'leadership') {
      setLeadershipModalOpen(false);
    }
  };

  const closeAlert = () => {
    setAlertMessage('');
  };

  return (
    <div className="dashboard-container">
      <h2>Precocious Strategies Website Dashboard</h2>
      <table className="dashboard-table">
        <thead>
          <tr>
            <th>Option</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Upload Testimonials</td>
            <td><button onClick={() => handleUploadClick('testimonial')}>Upload</button></td>
          </tr>
          <tr>
            <td>Upload Case Studies</td>
            <td><button onClick={() => handleUploadClick('caseStudy')}>Upload</button></td>
          </tr>
          <tr>
            <td>Upload Leaderships</td>
            <td><button onClick={() => handleUploadClick('leadership')}>Upload</button></td>
          </tr>
          <tr>
            <td>Show All Case Studies</td>
            <td><button onClick={() => handleViewClick('caseStudy')}>View</button></td>
          </tr>
          <tr>
            <td>Show All Testimonials</td>
            <td><button onClick={() => handleViewClick('testimonial')}>View</button></td>
          </tr>
          <tr>
            <td>Show All Leaderships</td>
            <td><button onClick={() => handleViewClick('leadership')}>View</button></td>
          </tr>
        </tbody>
      </table>
      {alertMessage && <Alert message={alertMessage} onClose={closeAlert} />}
      {isTestimonialModalOpen && (
        <ModalTestimonials onClose={() => handleCloseModal('testimonial')} onSubmit={(data) => handleSubmit(data, 'testimonial')} />
      )}
      {isCaseStudyModalOpen && (
        <ModalCaseStudy onClose={() => handleCloseModal('caseStudy')} onSubmit={(data) => handleSubmit(data, 'caseStudy')} />
      )}
      {isLeadershipModalOpen && (
        <ModalLeadership onClose={() => handleCloseModal('leadership')} onSubmit={(data) => handleSubmit(data, 'leadership')} />
      )}
    </div>
  );
}

export default Dashboard;
