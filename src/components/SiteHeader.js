import React from 'react';
import { Link } from 'react-router-dom';

const SiteHeader = () => {
  return (
    <div className="header">
      <Link to="/">Home</Link>
      <Link to="/project">Project</Link>
      <Link to="/work">Work</Link>
      <Link to="/customer">Customer</Link>
      {/* <Link to="/login">로그인</Link> */}
    </div>
  );
};

export default SiteHeader;
