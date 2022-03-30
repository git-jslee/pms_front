import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import * as api from '../../lib/api/api';
import { tbl_insert, tbl_update } from '../../modules/common/tbl_crud';
import AddWorkDrawerForm from '../../components/work/AddWorkDrawerForm';
import { set_worker } from '../../modules/work';
import { qs_projectList, qs_projectByCid } from '../../lib/api/query';

const AddWorkDrawerContainer = () => {
  const dispatch = useDispatch();
  // 중복Submit 방지
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [customers, setCustomers] = useState('');
  //   const [customerid, setCustomerid] = useState('');
  const [projectList, setProjectList] = useState('');
  const [progress, setProgress] = useState('');
  const [tasks, setTasks] = useState('');
  const [resetfields, setResetfields] = useState(false);
  const { auth } = useSelector(({ auth }) => ({
    auth: auth.auth,
  }));

  // drowser
  const showDrawer = () => {
    // form.resetFields();
    setVisible(true);
    setResetfields(false);
  };
  const onClose = () => {
    // form.resetFields();
    setVisible(false);
    setResetfields(true);
  };

  // 1. 진행중 프로젝트 고객정보 가져오기
  useEffect(() => {
    const code_status_id = 2;
    const query = qs_projectList(code_status_id);
    api
      .getQueryString('api/projects', query)
      .then((result) => {
        const plist = result.data.data;
        console.log('**result**', plist);
        const get_cus = plist.map((v) => {
          return {
            id: v.attributes.customer.data.id,
            name: v.attributes.customer.data.attributes.name,
          };
        });
        console.log('**1.고객추출**', get_cus);
        // 중복제거
        const filter_cus = get_cus.filter((item, i) => {
          return (
            get_cus.findIndex((item2, j) => {
              return item.id === item2.id;
            }) === i
          );
        });
        console.log('**2.고객추출 - 중복제거**', filter_cus);
        // 고객명 오름차순 정렬
        const sortResponse = filter_cus.sort((a, b) => {
          return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
        });
        console.log('**3.고객 오름차순**', sortResponse);
        setCustomers(sortResponse);
        setProjectList('');
      })
      .catch((error) => {
        console.error('에러발생', error);
      });
    // 컴포턴트 빠져나갈시..뒷정리 하기
    return () => {
      console.log('cleanup');
      //   dispatch(set_init());
    };
  }, []);

  // 2. 고객 선택시
  const customerOnChange = (id) => {
    // const query = `customer.id=${id}&code_status.id=2`;
    const query = qs_projectByCid(id);
    // 고객 ID
    // setCustomerid(id);
    // 해당 고객 정보 가져오기
    api
      .getListQuery('api/projects', query)
      .then((result) => {
        setProjectList(result.data.data);
      })
      .catch((error) => {
        console.error('에러발생', error);
      });
  };

  // 3. 프로젝트 선택시
  const projectOnChange = (id) => {
    console.log('3.프로젝트 선택', id);
    const query = `filters[project][id][$eq]%20=${id}&populate=%2A`;
    // 프로젝트 task 정보 가져오기
    api
      .getListQuery('api/project-tasks', query)
      .then((result) => {
        console.log('***tasks***', result.data.data);
        const sort = result.data.data.sort((a, b) => {
          return (
            a.attributes.code_task.data.attributes.sort -
            b.attributes.code_task.data.attributes.sort
          );
        });
        console.log('***tasks-sort***', sort);
        setTasks(sort);
      })
      .catch((error) => {
        console.error('에러발생', error);
      });
  };

  // 4. task 선택 시..
  const taskOnChange = (id) => {
    // console.log('4.Task 선택', id);
    // 진행상태 데이터 가져오기
    api
      .getList('api/code-progresses')
      .then((result) => {
        setProgress(result.data.data);
      })
      .catch((error) => {
        console.error('에러발생', error);
      });
  };

  // 5. onSubmit
  const onSubmit = async (values) => {
    setBtnDisabled(true);
    const work_data = {
      customer: values.customer,
      project: values.project,
      project_task: values.project_task,
      working_day: moment(values.workingDay),
      working_time: parseInt(values.workingTime),
      code_progress: values.code_progress,
      users_permissions_user: auth.user.id,
      description: values.description,
    };
    const pjt_data = {
      last_workupdate: moment(values.workingDay),
    };
    // 프로젝트 작업등로 시간 업데이트
    const pjtUpdate = await tbl_update(
      'api/projects',
      values.project,
      pjt_data,
    );
    console.log('1.project update 결과', pjtUpdate);

    // 작업등록
    const work_insert = await tbl_insert('api/works', work_data);
    console.log('작업 등록 성공', work_insert);
    setVisible(false);
    setBtnDisabled(false);
    setResetfields(true);
    // 아래 개선필요..화면깜빡임
    dispatch(set_worker({ userInfoId: 0 }));
    dispatch(set_worker({ userInfoId: auth.user.id }));
  };

  return (
    <>
      <AddWorkDrawerForm
        showDrawer={showDrawer}
        customers={customers}
        btnDisabled={btnDisabled}
        customerOnChange={customerOnChange}
        projectList={projectList}
        projectOnChange={projectOnChange}
        tasks={tasks}
        taskOnChange={taskOnChange}
        progress={progress}
        onSubmit={onSubmit}
        onClose={onClose}
        visible={visible}
        resetfields={resetfields}
      />
    </>
  );
};

export default AddWorkDrawerContainer;
