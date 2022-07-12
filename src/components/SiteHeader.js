import React from 'react';
import { Link } from 'react-router-dom';

const SiteHeader = () => {
  return (
    <div className="header">
      <Link to="/">Home</Link>
      <Link to="/sales">매출현황</Link>
      <Link to="/project">프로젝트</Link>
      <Link to="/maintenance">유지보수</Link>
      <Link to="/work">작업</Link>
      <Link to="/customer">고객</Link>
      {/* <Link to="/login">로그인</Link> */}
      <Link to="/">|-TEST--></Link>
      <Link to="/scrape">지원사업</Link>
      <Link to="/webgl">WEB3D</Link>
      <Link to="/powerbi">PowerBI</Link>
    </div>
  );
};

export default SiteHeader;
