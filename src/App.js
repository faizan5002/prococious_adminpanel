import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import AllCaseStudies from './AllCaseStudies';
import AllTestimonials from './AllTestimonials';
import AllLeaderships from './AllLeaderships';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/all-case-studies" element={<AllCaseStudies />} />
        <Route path="/all-testimonials" element={<AllTestimonials />} />
        <Route path="/all-leaderships" element={<AllLeaderships />} />
      </Routes>
    </Router>
  );
}

export default App;
