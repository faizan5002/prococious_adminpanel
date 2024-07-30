import React, { useEffect, useState } from 'react';
import './AllTestimonials.css';

const AllTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    // Fetch all testimonials from the server
    fetch('http://localhost:7000/getTestimonials')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched data:', data); // Debugging: log the fetched data
        if (data.success && Array.isArray(data.testimonials)) {
          // Map over testimonials and extract required fields
          const processedTestimonials = data.testimonials.map(testimonial => ({
            date: new Date(testimonial.date).toLocaleDateString(),
            name: testimonial.name,
            ratings: testimonial.ratings,
            details: testimonial.details
          }));
          setTestimonials(processedTestimonials);
        } else {
          console.error('Unexpected response format:', data);
        }
      })
      .catch(error => console.error('Error fetching testimonials:', error));
  }, []);

  return (
    <div className="all-testimonials-container">
      <h2>All Testimonials</h2>
      <table className="all-testimonials-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Name</th>
            <th>Ratings</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {testimonials.map((testimonial, index) => (
            <tr key={index}>
              <td>{testimonial.date}</td>
              <td>{testimonial.name}</td>
              <td>{testimonial.ratings}</td>
              <td>{testimonial.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllTestimonials;
