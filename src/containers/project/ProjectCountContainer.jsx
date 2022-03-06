import React, { useState, useEffect } from 'react';
// import { getProjectCount } from '../../modules/projectCount';
import { apiProjectCount } from '../../lib/api/api';
// import ProjectCount from '../../components/project/ProjectCount';

const ProjectCountContainer = () => {
  const [count, setCount] = useState('');
  // 컴포넌트 렌더링시 프로젝트 카운트 가져오기..redux 사용안함
  useEffect(() => {
    apiProjectCount()
      .then((result) => {
        setCount(result);
        console.log('프로젝트 카운트 조회 성공');
      })
      .catch((error) => {
        console.log('프로젝트 카운트 조회 실패', error);
      });
  }, []);
  console.log('>>count>>', count);
  return <>{count ? <h1>...</h1> : <h1>카운트 로딩중</h1>}</>;
};

export default ProjectCountContainer;
