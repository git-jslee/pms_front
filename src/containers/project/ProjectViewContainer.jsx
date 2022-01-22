import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { apiProject, apiProjectTaskId, apiWorkId } from '../../lib/api/api';
import { getProject, projectValues } from '../../modules/projectForm';
import { getCodebook } from '../../modules/codebook';
import ProjectForm from '../../components/project/ProjectForm';
import project, { getProjectId, getProjectWork } from '../../modules/project';
import {
  projectInitValues,
  tasksInitValues,
} from '../../components/project/ProjectInitValues';
import calPidWorktimeAndProgress from '../../modules/calPidWorktimeAndProgress';
import { Spin } from 'antd';

const ProjectViewContainer = () => {
  const { id } = useParams();
  // const [projectInfo, setProjectInfo] = useState('');
  // const [projectTaskInfo, setProjectTaskInfo] = useState('');
  // const [workInfo, setWorkInfo] = useState('');
  // const [calTime, setCalTime] = useState();
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
    status: codebook.status,
    error: codebook.error,
  }));

  // 코드북 수정
  // 코드북 가져오기
  const { code_book } = useSelector(({ codebook }) => ({
    code_book: {
      type: codebook.code_types,
      service: codebook.code_services,
      status: codebook.code_statuses,
      task: codebook.code_tasks,
    },
  }));
  console.log('code_book', code_book);

  // 편집모드 & 로딩 정보 가져오기
  const { editdisabled, loading1, loading2, loading3 } = useSelector(
    ({ projectForm, project, loading }) => ({
      editdisabled: projectForm.editdisabled,
      loading1: loading['project/GET_PROJECTLIST'],
      loading2: loading['project/GET_PROJECTID'],
      loading3: loading['project/GET_PROJECTWORK'],
    }),
  );
  console.log('loading', loading1, loading2, loading3);

  // 프로젝트 정보 가져오기
  const { projectInfo, pidTaskList, pidWorktime } = useSelector(
    ({ project }) => ({
      projectInfo: project.data.projectInfo,
      pidTaskList: project.data.tasks,
      pidWorktime: project.data.works,
    }),
  );

  console.log(']]]] editmode ]]]]', editdisabled);

  // 컴포넌트가 처음 렌더링 될 때 codebook 디스패치
  useEffect(() => {
    dispatch(getCodebook());
  }, [dispatch]);

  // 프로젝트 ID 정보 가져오기
  useEffect(() => {
    // apiProject(id)
    //   .then((result) => {
    //     console.log('>>projectview성공>>', result.data);
    //     setProjectInfo(result.data);
    //   })
    //   .catch((error) => {
    //     console.error('에러발생', error);
    //   });
    dispatch(getProjectId(id));
  }, [dispatch]);

  // 프로젝트별 task & work 정보 가져오기
  useEffect(() => {
    dispatch(getProjectWork(id));
  }, [dispatch]);

  return (
    <>
      {projectInfo && pidTaskList && pidWorktime && code_types ? (
        <ProjectForm
          projectInfo={projectInfo}
          pidTaskList={pidTaskList}
          formInitValues={projectInitValues(projectInfo, pidTaskList)}
          code_types={code_types}
          code_services={code_services}
          code_statuses={code_statuses}
          code_tasks={code_tasks}
          editdisabled={editdisabled}
          calPidWorktimeAndProgress={calPidWorktimeAndProgress(
            id,
            pidTaskList,
            pidWorktime,
          )}
        />
      ) : (
        // <h1>프로젝트폼..</h1>
        <Spin tip="Loading..." />
      )}
    </>
  );
};

export default ProjectViewContainer;
