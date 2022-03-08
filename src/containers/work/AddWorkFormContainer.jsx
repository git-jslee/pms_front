import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AddWorkForm from '../../components/work/AddWorkForm';
import moment from 'moment';
import {
  apiCustomerList,
  apiCustomer_ProjectList,
  apiProjectTaskId,
  apiCodeProgress,
  apiAddWork,
} from '../../lib/api/api';
import tbl_update from '../../modules/tbl_update';
import projectlist from '../../modules/projectList';
import { setCustomer, setProject, setTask, set_init } from '../../modules/work';
import { useNavigate } from 'react-router-dom';

const AddWorkFormContainer = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState('');
  const [projectList, setProjectList] = useState('');
  const [tasks, setTasks] = useState('');
  const [progress, setProgress] = useState('');
  const dispatch = useDispatch();
  const { auth } = useSelector(({ auth }) => ({
    auth: auth.auth,
  }));
  const { formDisabled } = useSelector(({ work }) => ({
    formDisabled: work.formDisabled,
  }));

  // 1. 컴포넌트 렌더링시 고객 정보 가져오기..redux 사용안함
  useEffect(() => {
    apiCustomerList()
      .then((result) => {
        setCustomers(result.data);
        setProjectList('');
      })
      .catch((error) => {
        console.error('에러발생', error);
      });
    // 컴포턴트 빠져나갈시..뒷정리 하기
    return () => {
      console.log('cleanup');
      dispatch(set_init());
    };
  }, []);

  // 2. Form 에서 고객 선택시
  const customerOnChange = (id) => {
    // console.log('2.고객 선택', id);

    // 고객정보 디스패치
    dispatch(setCustomer({ customerId: id }));

    //고객에 해당되는 진행중 프로젝트 데이터 가져오기
    apiCustomer_ProjectList(id)
      .then((result) => {
        setProjectList(result.data);
        // dispatch(setProject({ projectId: 999 }));
      })
      .catch((error) => {
        console.error('에러발생', error);
      });
  };

  // 3. Form 에서 프로젝트 선택시
  const projectOnChange = (id) => {
    console.log('3.프로젝트 선택', id);

    // 프로젝트 정보 디스패치
    // dispatch(setTask({ taskId: 888 }));
    dispatch(setProject({ projectId: 999 }));

    // 프로젝트(서비스)에 해당하는 task 데이터 가져오기
    apiProjectTaskId(id)
      .then((result) => {
        // console.log('3.1 task 정보', result.data);
        setTasks(result.data);
        dispatch(setTask({ taskId: 888 }));
      })
      .catch((error) => {
        console.error('에러발생', error);
      });
  };

  // 4. 프로젝트 선태 후 Task 선택 시
  const taskOnChange = (id) => {
    // console.log('4.Task 선택', id);
    // 진행상태 데이터 가져오기
    apiCodeProgress()
      .then((result) => {
        // console.log('4-1. progress 정보', result.data);
        setProgress(result.data);
      })
      .catch((error) => {
        console.error('에러발생', error);
      });
  };

  // onSubmit
  const onSubmit = async (values) => {
    // console.log('submit', values);
    const jwt = auth.jwt;
    const datas = [
      {
        customer: values.customer,
        project: values.project,
        project_task: values.project_task,
        workingDay: moment(values.workingDay.format('YYYY-MM-DD')),
        workingTime: parseInt(values.workingTime),
        code_progress: values.code_progress,
        // user_info: values.user_info,
        users_permissions_user: auth.user.id,
        description: values.description,
      },
      {
        headers: {
          Authorization: 'Bearer ' + jwt,
        },
      },
    ];
    const pjtUpdate = await tbl_update('projects', values.project, [
      {
        lastUpdate: moment(values.workingDay.format('YYYY-MM-DD')),
      },
      {
        headers: {
          Authorization: 'Bearer ' + jwt,
        },
      },
    ]);
    console.log('1.project update 결과', pjtUpdate);
    // 작업등록
    apiAddWork(datas)
      .then((result) => {
        console.log('작업 등록 성공', result);
        navigate('/work');
      })
      .catch((error) => {
        console.error('에러발생', error);
      });
  };

  return (
    <div>
      <h1>AddWorkFormContainer</h1>
      {customers && auth ? (
        <AddWorkForm
          customers={customers}
          // userinfo={auth.user.user_info}
          projectList={projectList}
          customerOnChange={customerOnChange}
          projectOnChange={projectOnChange}
          taskOnChange={taskOnChange}
          tasks={tasks}
          progress={progress}
          formDisabled={formDisabled}
          onSubmit={onSubmit}
        />
      ) : (
        <h1>로딩중</h1>
      )}
    </div>
  );
};

export default AddWorkFormContainer;
