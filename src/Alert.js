// src/Alert.js
import React from 'react';
import './Alert.css';

const Alert = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="alert-container">
      <div className="alert-content">
        <span className="alert-message">{message}</span>
        <button className="alert-close" onClick={onClose}>X</button>
      </div>
    </div>
  );
};

export default Alert;
