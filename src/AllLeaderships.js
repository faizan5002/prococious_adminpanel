import React, { useEffect, useState } from 'react';
import './AllLeaderships.css';

const AllLeaderships = () => {
  const [leaderships, setLeaderships] = useState([]);

  useEffect(() => {
    // Fetch all leadership entries from the server
    fetch('http://localhost:7000/getLeadership')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data); // Debugging: log the fetched data
        if (data.success && Array.isArray(data.leaderships)) {
          // Map over caseStudies and extract required fields
          const processedLeaderships = data.leaderships.map(leadership => ({
            name: leadership.name,
            designation: leadership.designation
          }));
          setLeaderships(processedLeaderships);
        } else {
          console.error('Unexpected response format:', data);
        }
      })
      .catch(error => console.error('Error fetching leaderships:', error));
  }, []);

  return (
    <div className="all-leaderships-container">
      <h2>All Leaderships</h2>
      <table className="all-leaderships-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Designation</th>
          </tr>
        </thead>
        <tbody>
          {leaderships.map((leadership, index) => (
            <tr key={index}>
              <td>{leadership.name}</td>
              <td>{leadership.designation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllLeaderships;
