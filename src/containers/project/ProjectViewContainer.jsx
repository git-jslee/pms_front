import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { apiProject, apiProjectTaskId, apiWorkId } from '../../lib/api/api';
import { getProject, projectValues } from '../../modules/projectForm';
import { getCodebook } from '../../modules/codebook';
import ProjectForm from '../../components/project/ProjectForm';
import { getProjectId, getProjectWork } from '../../modules/project';
import {
  projectInitValues,
  tasksInitValues,
} from '../../components/project/ProjectInitValues';
import calPidWorktimeAndProgress from '../../modules/calPidWorktimeAndProgress';
import { Spin } from 'antd';
import ProjectInfoTable from '../../components/project/ProjectInfoTable';
import ProjectUpdateForm from '../../components/project/ProjectUpdateForm';
import moment from 'moment';
// import tbl_update from '../../modules/tbl_update';
import { changeMode } from '../../modules/common';
import ProjectWorkList from '../../components/project/ProjectWorkList';
import { ListConsumer } from 'antd/lib/list';
import { tbl_update } from '../../modules/common/tbl_crud';
import { weekOfMonth } from '../../modules/common/weekOfMonth';

const ProjectViewContainer = () => {
  const { id } = useParams();
  // const { auth } = useSelector(({ auth }) => ({
  //   auth: auth.auth,
  // }));

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

  const { mode } = useSelector(({ common }) => ({
    mode: common.mode,
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
  const { projectInfo, pidTaskList, works } = useSelector(({ project }) => ({
    projectInfo: project.data.projectInfo,
    pidTaskList: project.data.tasks,
    works: project.data.works,
  }));
  const [workList, setWorkList] = useState();

  // 컴포넌트가 처음 렌더링 될 때 codebook 디스패치
  useEffect(() => {
    dispatch(getCodebook());
  }, [dispatch]);

  // 프로젝트 ID 정보 가져오기
  useEffect(() => {
    dispatch(getProjectId(id));
  }, [dispatch]);

  // 프로젝트별 task & work 정보 가져오기
  useEffect(() => {
    dispatch(getProjectWork(id));
  }, [dispatch]);

  // work list
  useEffect(() => {
    if (!works) return;
    const result = works
      .map((list, index) => {
        return {
          key: list.id,
          no: index + 1,
          task: list.project_task.code_task,
          workingDay: list.workingDay,
          workingTime: list.workingTime,
          progress: list.code_progress.code,
          worker: list.users_permissions_user.username,
          description: list.description,
        };
      })
      .sort((a, b) => new Date(b.workingDay) - new Date(a.workingDay));
    console.log('+++++result', result);
    setWorkList(result);
  }, [works]);

  // 주별 작업 그래프
  useEffect(() => {
    if (!workList) return;
    //
    const testdata = workList.map((v) => {
      // [{22-02-1:{progress:90, task:6, time:5},{22-02-2},{22-02-3}]
      const week = weekOfMonth(v.workingDay);
      console.log('+++workOfMonth+++', week);
    });
  }, [workList]);

  //onSubmit -> Update
  const onSubmit = async (values) => {
    console.log('1.onsubmit', values);
    // const jwt = auth.jwt;
    const _startDate = values.startDate ? moment(values.startDate) : null;
    const _endDate = values.endDate ? moment(values.endDate) : null;

    const update_data = {
      code_status: values.status,
      planStartDate: moment(values.planStartDate.format('YYYY-MM-DD')),
      planEndDate: moment(values.planEndDate.format('YYYY-MM-DD')),
      startDate: _startDate,
      endDate: _endDate,
      price: values.price,
      remark: values.description,
      // description: values.description,
    };
    const result = await tbl_update('projects', id, update_data);
    console.log('2.update 결과', result);

    dispatch(getProjectId(id));
    dispatch(changeMode({ mode: 'VIEW' }));
  };

  //UpdateForm
  const updateForm = () => {
    if (mode === 'VIEW') return;
    const _startDate = projectInfo.startDate
      ? moment(projectInfo.startDate)
      : null;
    const _endDate = projectInfo.endDate ? moment(projectInfo.endDate) : null;
    console.log('_endDate', _endDate);
    const initialValues = {
      status: projectInfo.code_status.id,
      planStartDate: moment(projectInfo.planStartDate),
      planEndDate: moment(projectInfo.planEndDate),
      startDate: _startDate,
      endDate: _endDate,
      price: projectInfo.price,
      description: projectInfo.remark,
    };
    return (
      <>
        <ProjectUpdateForm
          code_statuses={code_statuses}
          initialValues={initialValues}
          onSubmit={onSubmit}
        />
      </>
    );
  };

  console.log('workList', workList);

  return (
    <>
      {!loading2 && projectInfo ? (
        <>
          <ProjectInfoTable
            projectInfo={projectInfo}
            updateForm={updateForm()}
          />
          <ProjectWorkList tableData={workList} />
        </>
      ) : (
        <Spin tip="Loading..." />
      )}
    </>
  );
};

export default ProjectViewContainer;
