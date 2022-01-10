import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { apiProject, apiProjectTaskId } from '../../lib/api/api';
import { getProject, projectValues } from '../../modules/projectForm';
import { getCodebook } from '../../modules/codebook';
import ProjectForm from '../../components/project/ProjectForm';
import {
  projectInitValues,
  tasksInitValues,
} from '../../components/project/ProjectInitValues';

const ProjectViewContainer = () => {
  const { id } = useParams();
  const [projectInfo, setProjectInfo] = useState('');
  const [projectTaskInfo, setProjectTaskInfo] = useState('');
  const dispatch = useDispatch();
  // 코드북 가져오기
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

  // 편집모드 정보 가져오기
  const { editdisabled } = useSelector(({ project }) => ({
    editdisabled: project.editdisabled,
  }));
  console.log(']]]] editmode ]]]]', editdisabled);

  // 컴포넌트가 처음 렌더링 될 때 codebook 디스패치
  useEffect(() => {
    dispatch(getCodebook());
  }, [dispatch]);

  // 프로젝트 view 정보 가져오기
  useEffect(() => {
    apiProject(id)
      .then((result) => {
        console.log('>>projectview성공>>', result.data);
        setProjectInfo(result.data);
      })
      .catch((error) => {
        console.error('에러발생', error);
      });
  }, []);

  // 프로젝트별 task 정보 가져오기
  useEffect(() => {
    apiProjectTaskId(id)
      .then((result) => {
        console.log('>>projectTaskview성공>>', result.data);
        setProjectTaskInfo(result.data);
      })
      .catch((error) => {
        console.error('에러발생', error);
      });
  }, []);

  // 프로젝트 view 정보 디스패치
  // 수정 필요...api 호출 2번 하는 문제..
  useEffect(() => {
    dispatch(getProject(projectInfo));
  }, [dispatch]);

  // 디스패치 성공/실패 코드 추가 필요

  //from initialValues 리딕스..
  //   useEffect(() => {
  //     dispatch(projectValues(projectInitValues(projectInfo)));
  //   }, [projectInfo]);
  if (projectInfo !== '' || projectTaskInfo !== '') {
    console.log('>>>>projectInfo>>>', projectInfo);
    console.log('>>>>projectTaskInfo>>>', projectTaskInfo);
    console.log(
      '>>>>projectInitValues',
      projectInitValues(projectInfo, projectTaskInfo),
    );
    // console.log('>>>>projectTaskInitValues', tasksInitValues(projectTaskInfo));
  }

  return (
    <>
      {projectInfo === '' || projectTaskInfo === '' ? (
        <h1>정보가져오는중</h1>
      ) : (
        // <h1>프로젝트폼..</h1>
        <ProjectForm
          projectInfo={projectInfo}
          projectTaskInfo={projectTaskInfo}
          formInitValues={projectInitValues(projectInfo, projectTaskInfo)}
          code_types={code_types}
          code_services={code_services}
          code_statuses={code_statuses}
          code_tasks={code_tasks}
          editdisabled={editdisabled}
        />
      )}
    </>
  );
};

export default ProjectViewContainer;
