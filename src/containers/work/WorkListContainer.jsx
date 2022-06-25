import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as api from '../../lib/api/api';
import WorkListTable from '../../components/work/WorkListTable';
import MainWorkListTable from '../../components/work/MainWorkListTable';
import {
  qs_mainWorkListByUid,
  qs_workListByUid,
  qs_workById,
} from '../../lib/api/query';
import moment from 'moment';
import WorkDrawerContainer from './WorkDrawerContainer';
import { message } from 'antd';

const WorkListContainer = () => {
  const [workList, setWorkList] = useState([]);
  const [mainWorkList, setMainWorkList] = useState([]);
  const [visible, setVisible] = useState(false);
  const [initialValues, setInitialValues] = useState({});
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

  // Action 버튼 클릭
  const drawerOnClick = async (e) => {
    console.log('***버튼클릭***', e);
    const query = qs_workById(e.key);
    const request = await api.getQueryString('api/works', query);
    console.log('***request***', request.data.data);
    const workinfo = request.data.data[0].attributes;
    const value = {
      type: '프로젝트',
      customer: workinfo.customer.data.attributes.name,
      id: request.data.data[0].id,
      pid: workinfo.project.data.id,
      title: workinfo.project.data.attributes.name,
      service_type:
        workinfo.project.data.attributes.code_service.data.attributes.name,
      task: workinfo.project_task.data.attributes.code_task.data.attributes
        .name,
      user: workinfo.users_permissions_user.data.attributes.username,
      userId: workinfo.users_permissions_user.data.id,
      working_day: moment(workinfo.working_day),
      working_day_str: workinfo.working_day,
      working_time: workinfo.working_time,
      code_progress: workinfo.code_progress.data.id,
      revision: workinfo.revision ? workinfo.revision : 0,
      progress: workinfo.code_progress.data.attributes.code,
      description: workinfo.description,
    };

    setInitialValues(value);
    setVisible(true);
  };

  // Drawer On Close
  const drawerOnClose = (e) => {
    // editmode 일때 닫기 기능 비활성화
    console.log('***닫기***', e);
    if (e) {
      setVisible(false);
    } else {
      message.error(
        `작업 수정 중...SUBMIT(수정) or Calcle(취소) 후 다시 시도하세요`,
        3,
      );
    }
  };

  return (
    <>
      {workList && mainWorkList && code_tasks && selectedUserId ? (
        <WorkListTable
          lists={newList}
          code_tasks={code_tasks.data}
          drawerOnClick={drawerOnClick}
        />
      ) : (
        <div>로딩중</div>
      )}
      {visible ? (
        <WorkDrawerContainer
          visible={visible}
          setVisible={setVisible}
          drawerOnClose={drawerOnClose}
          initialValues={initialValues}
        />
      ) : (
        ''
      )}
    </>
  );
};

export default WorkListContainer;
