import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as api from '../../lib/api/api';
import WorkListTable from '../../components/work/WorkListTable';
import MainWorkListTable from '../../components/work/MainWorkListTable';
import { qs_mainWorkListByUid, qs_workListByUid } from '../../lib/api/query';

const WorkListContainer = () => {
  const [workList, setWorkList] = useState([]);
  const [mainWorkList, setMainWorkList] = useState([]);
  const { selectedUserId } = useSelector(({ work }) => ({
    selectedUserId: work.selectedUserId,
  }));
  const { code_tasks } = useSelector(({ codebook }) => ({
    code_tasks: codebook.code_tasks,
  }));
  // console.log('code_tasks: ', code_tasks);

  // const allWorkList = async (query_project, query_main) => {
  //   const project = await api.getQueryString('api/works', query_project);
  //   const maintenance = await

  // };

  // 컴포넌트 렌더링 시 작업 리스트 정보 가져옴
  useEffect(() => {
    setWorkList([]);
    const query_project = qs_workListByUid(selectedUserId);
    const query_main = qs_mainWorkListByUid(selectedUserId);

    //프로젝트 & 유지보수 작업 리스트
    api
      .getQueryString('api/works', query_project)
      .then((result) => {
        console.log('****11111*****', result.data.data);
        setWorkList(result.data.data);
      })
      .catch((error) => {
        console.error('에러발생', error);
      });

    // 유지보수 작업 리스트
    api
      .getQueryString('api/maintenance-works', query_main)
      .then((result) => {
        setMainWorkList(result.data.data);
        console.log('****2. array****', result.data.data);
      })
      .catch((error) => {
        console.error('에러발생', error);
      });

    // setWorkList([work_project, work_main]);
  }, [selectedUserId]);
  console.log('=====worklist=======', workList);
  console.log('=====Man worklist=======', mainWorkList);
  const newList = [...workList, ...mainWorkList];

  return (
    <>
      {workList && mainWorkList && code_tasks && selectedUserId ? (
        <WorkListTable lists={newList} code_tasks={code_tasks.data} />
      ) : (
        <div>로딩중</div>
      )}
    </>
  );
};

export default WorkListContainer;
