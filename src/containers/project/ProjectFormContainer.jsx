import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCodebook } from '../../modules/codebook';
import ProjectFormView from '../../components/project/ProjectFormView';
import { selectedService } from '../../modules/addPorject';
import {
  apiAddProject,
  apiAddProjectTasks,
  apiCustomerList,
} from '../../lib/api/api';
import { useNavigate } from 'react-router-dom';

const ProjectFormContainer = () => {
  const navigate = useNavigate();
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
    ? code_tasks.filter((v) => v.code_service.id === serviceId)
    : null;

  //웹토큰 가져오기..값 변경시에만 실행되게 설정 변경..
  const { auth } = useSelector(({ auth }) => ({
    jwt: auth.auth,
  }));
  console.log('>>auth>>', auth);

  // code_task 정보 가져오기 & 선택된 서비스ID 에 해당되는 task 만들기
  //   if (serviceId) {
  //     const tasks = code_tasks.filter((v) => v.code_service.id === serviceId);
  //     console.log('>>tasks>>', tasks);
  //     // return <ProjectTaskForm tasks={tasks} />;
  //   }

  // 컴포넌트가 처음 렌더링 될 때 codebook 디스패치
  // codebook container 로 기능 이관 22/01/06
  // useEffect(() => {
  //   dispatch(getCodebook());
  // }, [dispatch]);

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
  console.log('>>>customers>>', customers);

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
  const onSubmit = (values) => {
    console.log('>>>onSubmit>>>', values);
    const auth =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjQxMDA4NzE5LCJleHAiOjE2NDM2MDA3MTl9.axMN2VemKxDxPeZJ_zfvhGm8FmMUVd5MkPe_lED0ocM';
    const datas = [
      {
        customer: values.customer,
        code_type: values.type,
        name: values.project,
        code_service: values.service,
        code_status: values.status,
        price: parseInt(values.price),
        planStartDate: values.startDate,
      },
      {
        headers: {
          Authorization: 'Bearer ' + auth,
        },
      },
    ];
    // axios
    //   .post('http://192.168.20.99:1337/projects', datas, {
    //     headers: {
    //       Authorization: 'Bearer ' + auth,
    //     },
    //   })
    //   .then((result) => {
    //     console.log('등록 성공');
    //   })
    //   .catch((error) => {
    //     console.log(`에러가 발생했습니다.  ${error.message}`);
    //   });
    apiAddProject(datas, values, tasks);
    navigate('/project');
  };

  return (
    <>
      {code_types && customers ? (
        <ProjectFormView
          code_types={code_types}
          code_services={code_services}
          code_statuses={code_statuses}
          code_tasks={code_tasks}
          customers={customers}
          tasks={tasks}
          onChange={onChange}
          onSubmit={onSubmit}
        />
      ) : (
        <h1>로딩중</h1>
      )}
    </>
  );
};

export default ProjectFormContainer;
