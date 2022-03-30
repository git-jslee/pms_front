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
import { qs_projectTaskByPid, qs_workByPid } from '../../lib/api/query';

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
  // 중복Submit 방지
  const [btnDisabled, setBtnDisabled] = useState(false);

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
    const query = [];
    query.push(qs_projectTaskByPid(id));
    query.push(qs_workByPid(id));
    dispatch(getProjectWork(query));
  }, [dispatch]);

  // work list
  useEffect(() => {
    if (!works) return;
    const result = works
      .map((list, index) => {
        return {
          key: list.id,
          no: index + 1,
          task: list.attributes.project_task.data.id,
          workingDay: list.attributes.working_day,
          workingTime: list.attributes.working_time,
          progress: list.attributes.code_progress.data.attributes.code,
          worker:
            list.attributes.users_permissions_user.data.attributes.username,
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
    setBtnDisabled(true);
    console.log('1--.onsubmit', values);
    // const jwt = auth.jwt;
    const _startDate = values.startDate ? moment(values.startDate) : null;
    const _endDate = values.endDate ? moment(values.endDate) : null;

    const update_data = {
      code_status: values.status,
      plan_startdate: moment(values.planStartDate.format('YYYY-MM-DD')),
      plan_enddate: moment(values.planEndDate.format('YYYY-MM-DD')),
      startdate: _startDate,
      enddate: _endDate,
      price: values.price,
      description: values.description,
      // description: values.description,
    };
    const result = await tbl_update('api/projects', id, update_data);
    console.log('2.update 결과', result);

    dispatch(getProjectId(id));
    dispatch(changeMode({ mode: 'VIEW' }));
    setBtnDisabled(false);
  };

  //UpdateForm
  const updateForm = () => {
    if (mode === 'VIEW') return;
    console.log('**projectInfo**', projectInfo);
    const pjt_info = projectInfo.attributes;
    const _startDate = pjt_info.startdate ? moment(pjt_info.startdate) : null;
    const _endDate = pjt_info.enddate ? moment(pjt_info.enddate) : null;
    console.log({ startdate: _startDate, enddate: _endDate });
    const initialValues = {
      status: pjt_info.code_status.data.id,
      planStartDate: moment(pjt_info.plan_startdate),
      planEndDate: moment(pjt_info.plan_enddate),
      startDate: _startDate,
      endDate: _endDate,
      price: pjt_info.price,
      description: pjt_info.description,
    };
    return (
      <>
        <ProjectUpdateForm
          code_statuses={code_statuses.data}
          initialValues={initialValues}
          onSubmit={onSubmit}
          btnDisabled={btnDisabled}
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
