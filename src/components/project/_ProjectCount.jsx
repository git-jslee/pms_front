import React from 'react';
import './projectCount.css';

const ProjectCount = ({ count }) => {
  return (
    <>
      {/* <div>
        <span>[완료: {count[3].data}건] .. </span>
        <span>[진행중: {count[1].data}건] .. </span>
        <span>[보류: {count[2].data}건] .. </span>
        <span>[시작전: {count[0].data}건] .. </span>
      </div> */}
      <ul className="serviceStats stats6 clearfix">
        <li>
          <p className="tit">완료</p>
          <p className="num">
            <b>{count[3].data}</b>건
          </p>
        </li>
        <li>
          <p className="tit">진행중</p>
          <p className="num">
            <b>{count[1].data}</b>건
          </p>
        </li>
        <li>
          <p className="tit">보류</p>
          <p className="num">
            <b>{count[2].data}</b>건
          </p>
        </li>
        <li>
          <p className="tit">시작전</p>
          <p className="num">
            <b>{count[0].data}</b>건
          </p>
        </li>
      </ul>
    </>
  );
};

export default ProjectCount;
