// src/ModalCaseStudy.js
import React, { useState } from 'react';
import './ModalT.css';

const ModalCaseStudy = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    image: null,
    date: '',
    category: '',
    sub_category: '',
    details: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Upload Case Study</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="text"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="sub_category">Sub Category</label>
            <input
              type="text"
              id="sub_category"
              name="sub_category"
              value={formData.sub_category}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="details">Details</label>
            <textarea
              id="details"
              name="details"
              value={formData.details}
              onChange={handleChange}
            />
          </div>
          <button type="submit">Submit</button>
          <button type="button" onClick={onClose}>
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalCaseStudy;
