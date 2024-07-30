import React, { useEffect, useState } from 'react';
import './AllCaseStudies.css';

const AllCaseStudies = () => {
  const [caseStudies, setCaseStudies] = useState([]);

  useEffect(() => {
    // Fetch all case studies from the server
    fetch('http://localhost:7000/getCaseStudy')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data); // Debugging: log the fetched data
        if (data.caseStudies && Array.isArray(data.caseStudies)) {
          setCaseStudies(data.caseStudies);
        } else {
          console.error('Unexpected response format:', data);
        }
      })
      .catch(error => console.error('Error fetching case studies:', error));
  }, []);

  return (
    <div className="all-case-studies-container">
      <h2>All Case Studies</h2>
      <table className="all-case-studies-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Sub Category</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(caseStudies) && caseStudies.map((study, index) => (
            <tr key={index}>
              <td>{new Date(study.date).toLocaleDateString()}</td>
              <td>{study.category}</td>
              <td>{study.sub_category}</td>
              <td>{study.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllCaseStudies;
