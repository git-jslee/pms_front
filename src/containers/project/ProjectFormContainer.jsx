import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import 'moment-timezone';
import { getCodebook } from '../../modules/codebook';
import ProjectFormView from '../../components/project/ProjectFormView';
import { selectedService } from '../../modules/addPorject';
import {
  apiAddProject,
  apiAddProjectTasks,
  apiCustomerList,
} from '../../lib/api/api';
import { useNavigate } from 'react-router-dom';
import { tbl_insert } from '../../modules/common/tbl_crud';

const ProjectFormContainer = () => {
  const navigate = useNavigate();
  // 중복Submit 방지
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [customers, setCustomers] = useState('');
  const dispatch = useDispatch();
  const {
    code_types,
    code_services,
    code_statuses,
    code_tasks,
    status,
    error,
  } = useSelector(({ codebook }) => ({
    code_types: codebook.code_types,
    code_services: codebook.code_services,
    code_statuses: codebook.code_statuses,
    code_tasks: codebook.code_tasks,
    status: codebook.status,
    error: codebook.error,
  }));

  // 프로젝트 추가 페이지에서 선택된 서비스ID 정보 가져오기(ex. 1,2,3,..)
  const { serviceId } = useSelector(({ addProject }) => ({
    serviceId: addProject.serviceId,
  }));
  const tasks = serviceId
    ? code_tasks.data
        .filter(
          (v) =>
            v.attributes.code_service.data.id === serviceId &&
            v.attributes.used === true,
        )
        .sort((a, b) => a.sort - b.sort)
    : null;

  // 컴포넌트 렌더링시 고객 정보 가져오기..redux 사용안함
  useEffect(() => {
    apiCustomerList()
      .then((result) => {
        setCustomers(result.data);
      })
      .catch((error) => {
        console.error('에러발생', error);
      });
  }, []);
  // console.log('>>>customers>>', customers);

  //   컴포넌트가 처음 렌더링 될 때 serviceType 디스패치
  useEffect(() => {
    dispatch(selectedService({ serviceId: null }));
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      console.log('코드북 가져오기 오류');
      console.log(error);
    }
    if (status) {
      console.log('코드북 가져오기 성공');
      console.log(status);
    }
  }, [error, status]);

  // 서비스 onSelect 일때..서비스 ID 디스패치 기능 추가
  const onChange = (e) => {
    const serviceId = e;
    dispatch(
      selectedService({
        serviceId: serviceId,
      }),
    );
  };

  // 프로젝트 등록 기능 구현//redux 사용 안함
  const onSubmit = async (values) => {
    setBtnDisabled(true);
    // const jwt = auth.jwt;
    // console.log('onSubmit-values', values);
    const startDate = values.startDate || '';
    const endDate = values.endDate || '';
    const project_data = {
      customer: values.customer,
      code_type: values.type,
      name: values.project,
      code_service: values.service,
      code_status: values.status,
      plan_startdate: moment(values.planDate[0]).tz('Asia/Seoul'),
      plan_enddate: moment(values.planDate[1]).tz('Asia/Seoul'),
      startdate: moment(startDate).tz('Asia/Seoul'),
      enddate: moment(endDate).tz('Asia/Seoul'),
      price: parseInt(values.price),
      description: values.description,
    };

    // apiAddProject(datas, values, tasks); -> 22/1/8일 수정
    console.log('onSubmit-values', values);
    console.log('******onSubmit-project_data', project_data);
    const result = await tbl_insert('api/projects', project_data);

    // project-task data insert
    console.log('1. project', result.data);
    tasks.map(async (task, index) => {
      const task_data = {
        project: result.data.data.id,
        code_task: task.id,
        plan_day: values[task.attributes.code],
      };

      const result2 = await tbl_insert('api/project-tasks', task_data);
      // console.log('>>task_data>>', task_data);
      // console.log('>>task>>', task);
      // console.log('>>planTime>>', values);
      console.log(`2. task-${index} : `, result2.data);
    });

    // console.log('2. tasks', test2);
    setBtnDisabled(false);
    navigate('/project');
  };
  console.log({
    customers: customers,
    code_types: code_types,
    code_tasks: code_tasks,
    tasks: tasks,
  });

  return (
    <>
      {customers && code_types ? (
        <ProjectFormView
          code_types={code_types.data}
          code_services={code_services.data}
          code_statuses={code_statuses.data}
          code_tasks={code_tasks.data}
          customers={customers.data}
          tasks={tasks}
          onChange={onChange}
          onSubmit={onSubmit}
          btnDisabled={btnDisabled}
        />
      ) : (
        <h1>로그인 하세요</h1>
      )}
    </>
  );
};

export default ProjectFormContainer;
