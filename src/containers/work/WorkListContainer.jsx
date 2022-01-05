import React, { useState, useEffect } from 'react';
import { apiWorkList } from '../../lib/api/api';
import WorkListTable from '../../components/work/WorkListTable';

const WorkListContainer = () => {
  const [workList, setWorkList] = useState('');
  // 컴포넌트 렌더링 시 작업 리스트 정보 가져옴
  useEffect(() => {
    apiWorkList()
      .then((result) => {
        setWorkList(result.data);
      })
      .catch((error) => {
        console.error('에러발생', error);
      });
  }, []);

  return (
    <>{workList ? <WorkListTable lists={workList} /> : <div>로딩중</div>}</>
  );
};

export default WorkListContainer;
