import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { apiWorkList } from '../../lib/api/api';
import WorkListTable from '../../components/work/WorkListTable';

const WorkListContainer = () => {
  const [workList, setWorkList] = useState('');
  const { selectedUserId } = useSelector(({ work }) => ({
    selectedUserId: work.selectedUserId,
  }));
  const { code_tasks } = useSelector(({ codebook }) => ({
    code_tasks: codebook.code_tasks,
  }));
  console.log('code_tasks: ', code_tasks);
  // 컴포넌트 렌더링 시 작업 리스트 정보 가져옴
  useEffect(() => {
    apiWorkList(selectedUserId)
      .then((result) => {
        setWorkList(result.data);
      })
      .catch((error) => {
        console.error('에러발생', error);
      });
  }, [selectedUserId]);

  return (
    <>
      {workList && selectedUserId ? (
        <WorkListTable lists={workList} />
      ) : (
        <div>로딩중</div>
      )}
    </>
  );
};

export default WorkListContainer;
