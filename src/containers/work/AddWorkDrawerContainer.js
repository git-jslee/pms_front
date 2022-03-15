import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import * as api from '../../lib/api/api';
import { tbl_insert, tbl_update } from '../../modules/common/tbl_crud';
import AddWorkDrawerForm from '../../components/work/AddWorkDrawerForm';
import { set_worker } from '../../modules/work';

const AddWorkDrawerContainer = () => {
  const dispatch = useDispatch();
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
    const query = 'code_status.id=2';
    api
      .getListQuery('projects', query)
      .then((result) => {
        const get_cus = result.data.map((v) => {
          return { id: v.customer.id, name: v.customer.name };
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
        console.log('**2.고객추출**', filter_cus);
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
    const query = `customer.id=${id}&code_status.id=2`;
    // 고객 ID
    // setCustomerid(id);
    // 해당 고객 정보 가져오기
    api
      .getListQuery('projects', query)
      .then((result) => {
        setProjectList(result.data);
      })
      .catch((error) => {
        console.error('에러발생', error);
      });
  };

  // 3. 프로젝트 선택시
  const projectOnChange = (id) => {
    console.log('3.프로젝트 선택', id);
    const query = `project.id=${id}`;
    // 프로젝트 task 정보 가져오기
    api
      .getListQuery('project-tasks', query)
      .then((result) => {
        console.log('***tasks***', result.data);
        const sort = result.data.sort((a, b) => {
          return a.code_task.sort - b.code_task.sort;
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
      .getList('code-progresses')
      .then((result) => {
        setProgress(result.data);
      })
      .catch((error) => {
        console.error('에러발생', error);
      });
  };

  // 5. onSubmit
  const onSubmit = async (values) => {
    const work_data = {
      customer: values.customer,
      project: values.project,
      project_task: values.project_task,
      workingDay: moment(values.workingDay.format('YYYY-MM-DD')),
      workingTime: parseInt(values.workingTime),
      code_progress: values.code_progress,
      users_permissions_user: auth.user.id,
      description: values.description,
    };
    const pjt_data = {
      lastUpdate: moment(values.workingDay.format('YYYY-MM-DD')),
    };
    // 프로젝트 작업등로 시간 업데이트
    const pjtUpdate = await tbl_update('projects', values.project, pjt_data);
    console.log('1.project update 결과', pjtUpdate);

    // 작업등록
    const work_insert = await tbl_insert('works', work_data);
    console.log('작업 등록 성공', work_insert);
    setVisible(false);
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
