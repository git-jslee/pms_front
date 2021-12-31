import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectedService } from '../../modules/addPorject';
import ProjectTaskForm from '../../components/project/ProjectTaskForm';

const ProjectTaskFormContainer = () => {
  //   const dispatch = useDispatch();
  // 프로젝트 추가 페이지에서 선택된 서비스ID 정보 가져오기(ex. 1,2,3,..)
  const { serviceId } = useSelector(({ addProject }) => ({
    serviceId: addProject.serviceId,
  }));
  console.log('>>>serviceId>>>', serviceId);

  // code_task 정보 가져오기 & 선택된 서비스ID 에 해당되는 task 만들기
  const { code_tasks } = useSelector(({ codebook }) => ({
    code_tasks: codebook.code_tasks,
  }));

  if (serviceId) {
    const tasks = code_tasks.filter((v) => v.code_service.id === serviceId);
    console.log('>>tasks>>', tasks);
    return <ProjectTaskForm tasks={tasks} />;
  }

  return (
    <>
      <h1>서비스타입선택중..</h1>
    </>
  );
};

export default ProjectTaskFormContainer;
