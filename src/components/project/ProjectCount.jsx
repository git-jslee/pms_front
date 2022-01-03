import React from 'react';

const ProjectCount = ({ count }) => {
  return (
    <>
      <div>
        <span>[완료: {count[3].data}건] .. </span>
        <span>[진행중: {count[1].data}건] .. </span>
        <span>[보류: {count[2].data}건] .. </span>
        <span>[시작전: {count[0].data}건] .. </span>
      </div>
    </>
  );
};

export default ProjectCount;
