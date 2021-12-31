import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCodebook } from '../../modules/codebook';
import ProjectForm from '../../components/project/ProjectForm';
import { selectedService } from '../../modules/addPorject';

const ProjectFormContainer = () => {
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
    status: codebook.stagus,
    error: codebook.error,
  }));

  // 프로젝트 추가 페이지에서 선택된 서비스ID 정보 가져오기(ex. 1,2,3,..)
  const { serviceId } = useSelector(({ addProject }) => ({
    serviceId: addProject.serviceId,
  }));
  const tasks = serviceId
    ? code_tasks.filter((v) => v.code_service.id === serviceId)
    : null;

  // code_task 정보 가져오기 & 선택된 서비스ID 에 해당되는 task 만들기
  //   if (serviceId) {
  //     const tasks = code_tasks.filter((v) => v.code_service.id === serviceId);
  //     console.log('>>tasks>>', tasks);
  //     // return <ProjectTaskForm tasks={tasks} />;
  //   }

  // 컴포넌트가 처음 렌더링 될 때 codebook 디스패치
  useEffect(() => {
    dispatch(getCodebook());
  }, [dispatch]);

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

  return (
    <>
      {code_types ? (
        <ProjectForm
          code_types={code_types}
          code_services={code_services}
          code_statuses={code_statuses}
          code_tasks={code_tasks}
          tasks={tasks}
          onChange={onChange}
        />
      ) : (
        <h1>로딩중</h1>
      )}
    </>
  );
};

export default ProjectFormContainer;
