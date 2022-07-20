import React, { useState, useEffect } from 'react';
import moment from 'moment';
import styled from 'styled-components';
// import 'moment-timezone';
import { useDispatch, useSelector } from 'react-redux';
import * as api from '../../lib/api/api';
import { tbl_insert, tbl_update } from '../../modules/common/tbl_crud';
import AddWorkDrawerForm from '../../components/work/AddWorkDrawerForm';
import { set_worker } from '../../modules/work';
import {
  qs_projectList,
  qs_projectByCid,
  qs_customerByUsed,
  qs_maintenanceByCid,
} from '../../lib/api/query';
import {
  qs_projectByAddWork,
  qs_projectNameByCid,
  qs_worksByTaskId,
} from '../../lib/api/queryProject';
import customerSortDuplicate from '../../modules/common/customerSortDuplicate';
import { Button, message } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import fetchAllList from '../../lib/api/fetchAllList';

const Base = styled.div`
  width: 100%;
`;

const ButtonBlock = styled.div`
  //
`;

const AddWorkDrawerContainer = () => {
  const dispatch = useDispatch();
  // 중복Submit 방지
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [addMode, setAddMode] = useState('project');
  const [customerId, setCustomerId] = useState(null);
  const [customers, setCustomers] = useState();
  const [progress, setProgress] = useState();
  const [revEnable, setRevEnable] = useState(false);
  // const [progressId, setProgressId] = useState();
  const [step, setStep] = useState({ step1: null, step2: null, step3: null });
  const [taskname, setTaskname] = useState();
  //
  const [dropdownLists, setDropdownLists] = useState({
    customers: null,
  });
  //
  // const [resetfields, setResetfields] = useState(false);
  const [resetForm, setResetForm] = useState({ step: 'step-0' });
  const { auth } = useSelector(({ auth }) => ({
    auth: auth.auth,
  }));

  // drowser
  const onClickAddWork = () => {
    // form.resetFields();
    setVisible(true);
    // setResetfields(false);
  };

  // **** 작업등록 - 프로젝트 ****
  // 0. 진행중 프로젝트 고객정보 가져오기
  useEffect(() => {
    const code_status_id = 2;
    const query = qs_projectList(code_status_id);
    const request = customerSortDuplicate('api/projects', query)
      .then((result) => {
        setDropdownLists({ ...dropdownLists, customers: result });
        setCustomers(result);
        // setProjectList('');
      })
      .catch((e) => {
        console.error(e);
      });
    const progress = api
      .getList('api/code-progresses')
      .then((result) => {
        // setProgress(result.data.data);
        setProgress(result.data.data);
      })
      .catch((error) => {
        console.error('에러발생', error);
      });

    // 컴포턴트 빠져나갈시..뒷정리 하기
    return () => {
      // console.log('cleanup');
      //   dispatch(set_init());
    };
  }, []);

  // 1. 고객 선택시
  const customerOnChange = async (cid) => {
    console.log('***editmode ***', addMode);
    if (addMode === 'project') {
      // 코드 개선작업
      const projects = await api.getQueryString(
        'api/projects',
        qs_projectNameByCid(cid),
      );
      console.log('project>>', projects.data.data);
      setStep({ ...step, step1: projects.data.data, step2: null, step3: null });

      // <-- 기존방식
      const query = qs_projectByCid(cid);
      api
        .getListQuery('api/projects', query)
        .then((result) => {
          setDropdownLists({
            ...dropdownLists,
            items1: result.data.data,
            items2: null,
            items3: null,
          });
        })
        .catch((error) => {
          console.error('에러발생', error);
        });
      // 기존방식 -->
    } else if (addMode === 'maintenance') {
      const query = qs_maintenanceByCid(cid);
      const request = await api.getQueryString('api/maintenances', query);
      setDropdownLists({
        ...dropdownLists,
        items1: request.data.data,
        items2: null,
        items3: null,
      });
    }
    setCustomerId(cid);
    setRevEnable(false);
    // setResetForm({ step: 'step-1', parms: cid });
    setResetForm({ step: 'step-1' });
    // setResetfields(true);
  };

  // 2. 프로젝트 선택시
  const projectOnChange = async (pid) => {
    if (addMode === 'project') {
      // 프로젝트 task 정보 가져오기
      const request = await api.getQueryString(
        `api/projects/${pid}`,
        qs_projectByAddWork(),
      );
      const projectTasks = request.data.data.attributes.project_tasks.data;
      // console.log('**test', request);
      const sortTasks = projectTasks.sort((a, b) => {
        return (
          a.attributes.code_task.data.attributes.sort -
          b.attributes.code_task.data.attributes.sort
        );
      });

      setStep({ ...step, step2: sortTasks, step3: null });
      setRevEnable(false);
      // setResetForm({ step: 'step-2', parms: pid });
      setResetForm({ step: 'step-2' });
      // console.log('**test', sortTasks);

      //기존방식
      // const query = `filters[project][id][$eq]%20=${pid}&populate=%2A`;
      // api
      //   .getListQuery('api/project-tasks', query)
      //   .then((result) => {
      //     // console.log('***tasks***', result.data.data);
      //     const sort1 = result.data.data.sort((a, b) => {
      //       return (
      //         a.attributes.code_task.data.attributes.sort -
      //         b.attributes.code_task.data.attributes.sort
      //       );
      //     });
      //     // console.log('***tasks-sort***', sort);
      //     setDropdownLists({ ...dropdownLists, items2: sort1 });
      //   })
      //   .catch((error) => {
      //     console.error('에러발생', error);
      //   });
    } else if (addMode === 'maintenance') {
      const query = 'populate=%2A';
      const request = await api.getQueryString('api/code-ma-supports', query);
      setDropdownLists({ ...dropdownLists, suLists: request.data.data });
    }
  };

  // 3. task 선택 시..
  const taskOnChange = async (taskid) => {
    // let _progressid;
    if (addMode === 'project') {
      console.log('4.Task 선택', taskid);

      // project-task id 에 해당하는 전체 works 가져오기
      // work total 시간 계산
      const request = await fetchAllList({
        path: 'api/works',
        qs: qs_worksByTaskId,
        id: taskid,
      });
      console.log(`<<<<< ${'api/works'} >>>>>>`, request);
      let _total_time = 0;
      const caltotaltime =
        request.length > 0
          ? request.map((v) => {
              _total_time += v.attributes.working_time;
            })
          : 0;
      console.log(`<<<<< totaltime >>>>>>`, _total_time);

      // task 선택시 progress 값을 비교하여 높은 수치만 전달..
      const selectedTask = step.step2.filter((f) => f.id === taskid)[0]
        .attributes;
      console.log('task 선택 - selected task', selectedTask);
      const code_progress = selectedTask.code_progress.data;
      console.log(
        `task선택 , code_progress : ${code_progress}, revision ${selectedTask.revision}`,
      );

      // 10% -> id 2
      const _progressid = code_progress !== null ? code_progress.id : 2;
      // progressid 값이 7(100%)일경우 revEnable -> true
      setRevEnable(false);
      if (_progressid === 7) setRevEnable(true);
      // progress id 미만 값 필터
      const filter_progress = progress.filter((f) => f.id >= _progressid);
      const _revision = selectedTask.revision ? selectedTask.revision : 0;
      // 마지막 작업 등록 일
      const _last_workupdate = selectedTask.last_workupdate
        ? moment(selectedTask.last_workupdate).format('YYYY-MM-DD').toString()
        : '';
      const _taskname = selectedTask.cus_task
        ? selectedTask.cus_task
        : selectedTask.code_task.data.attributes.name;
      setTaskname(`${taskid}-${_taskname}`); // project_change 업데이트용..
      setResetForm({
        step: 'step-3',
        progress: _progressid,
        revision: _revision,
        last_workupdate: _last_workupdate,
        total_time: _total_time,
      });
      setStep({ ...step, step3: filter_progress });
      console.log('step3...', step);
    }
  };

  // 4. onSubmit
  const onSubmit = async (values) => {
    console.log('onsubmit value', values);
    const _working_day = moment(values.workingDay)
      .format('YYYY-MM-DD')
      .toString();
    try {
      if (addMode === 'project') {
        setBtnDisabled(true);
        // 1. 22-05-04 작업테이블 user 팀 정보 가져오기
        const query = `filters[users][id][$eq]=${auth.user.id}&fields[0]=name`;
        const requestTeam = await api.getQueryString(
          'api/code-pj-teams',
          query,
        );

        // 2. work table insert
        const work_data = {
          customer: values.customer,
          project: values.project,
          project_task: values.project_task,
          working_day: _working_day,
          working_time: parseInt(values.workingTime),
          code_progress: values.code_progress,
          users_permissions_user: auth.user.id,
          revision: values.revision,
          code_pj_team: requestTeam.data.data[0].id,
          description: values.description,
        };
        const work_insert = await tbl_insert('api/works', work_data);
        console.log('1.work insert 결과', work_insert);

        // 3. 프로젝트 작업등록 시간 업데이트
        // last_workupdate 시 기존 date 값과 비교 기능 추가 필요
        const pjt_data = {
          last_workupdate: _working_day,
        };
        const pjtUpdate = await tbl_update(
          'api/projects',
          values.project,
          pjt_data,
        );
        console.log('2.project update 결과', pjtUpdate);

        // 4. project task - 작업시간, revision update
        // 작업시작일 추가필요..startdate..
        const task_data = {
          code_progress: values.code_progress,
          // startdate:'',
          last_workupdate: _working_day,
          revision: values.revision,
          total_time:
            parseInt(values.total_time) + parseInt(values.workingTime),
        };
        const taskUpdate = await tbl_update(
          'api/project-tasks',
          values.project_task,
          task_data,
        );
        console.log('3.task update 결과', taskUpdate);

        // 5. project_change insert (revision && task 100% )
        // 100%일때 최초 1회만 update
        if (values.code_progress === 7 && resetForm.progress !== 7) {
          //
          const insert_data = {
            project: values.project,
            type: 'state_100',
            change: `${taskname}_Rev-${values.revision}`,
            users_permissions_user: auth.user.id,
            date: _working_day,
          };
          const insert = await tbl_insert('api/project-changes', insert_data);
        }

        // 작업등록
        message.success('작업등록 성공', 3);
        // console.log('2. 작업 등록 data', work_data);
        // console.log('2. 작업 등록 성공', work_insert);
        setRevEnable(false);
        setBtnDisabled(false);
        setResetForm({ step: 'step-0' });
        setVisible(false);
        // setResetfields(true);
        // 아래 개선필요..화면깜빡임
        dispatch(set_worker({ userInfoId: 0 }));
        dispatch(set_worker({ userInfoId: auth.user.id }));
      } else if (addMode === 'maintenance') {
        console.log('***onsubimt - 유지보수***', values);
        setBtnDisabled(true);
        const insert_data = {
          customer: values.customer,
          maintenance: values.maintenance,
          title: values.title,
          code_ma_support: values.code_ma_support,
          working_day: _working_day,
          working_time: parseInt(values.workingTime),
          users_permissions_user: auth.user.id,
          description: values.description,
        };

        const insert = await tbl_insert('api/maintenance-works', insert_data);
        console.log('1. 유지보수 작업 등록 성공', insert);
        message.success('유지보수 등록 성공', 3);

        // 초기화
        setResetForm({ step: 'step-0' });
        setStep({ step1: null, step2: null, step3: null });
        setBtnDisabled(false);
        setVisible(false);
        // setResetfields(true);
      }
    } catch (error) {
      console.error(error);
      message.error('관리자에게 문의 바랍니다.', 5);
    }
  };

  const onClickAddMode = async (value) => {
    setAddMode(value.target.value);
    setCustomerId(null);
    // setResetfields(true);
    if (value.target.value === 'project') {
      const code_status_id = 2;
      const query = qs_projectList(code_status_id);
      const request = await customerSortDuplicate('api/projects', query);
      setDropdownLists({
        customers: request,
      });
    } else if (value.target.value === 'maintenance') {
      //
      const arg = {
        used: {
          $eq: true,
        },
      };
      const query = qs_customerByUsed(arg);
      const request = await customerSortDuplicate('api/maintenances', query);
      setDropdownLists({
        customers: request,
      });
    }
  };

  const handleRevision = () => {
    // revison +1, 진행상태 변경 100-> 10~100
    console.log('resetform', resetForm);
    setRevEnable(false);
    setResetForm({
      ...resetForm,
      progress: 2,
      revision: resetForm.revision + 1,
    });
    setStep({ ...step, step3: progress });
    console.log('step3...', step);
  };

  const onClose = () => {
    setRevEnable(false);
    setResetForm({ step: 'step-0' });
    setStep({ step1: null, step2: null, step3: null });
    setAddMode('project');
    setCustomerId(null);
    setBtnDisabled(false);
    setVisible(false);
  };

  return (
    <Base>
      <ButtonBlock>
        <Button onClick={onClickAddWork} icon={<PlusOutlined />}>
          작업등록
        </Button>
      </ButtonBlock>
      <AddWorkDrawerForm
        // onClickAddWork={onClickAddWork}
        addMode={addMode}
        btnDisabled={btnDisabled}
        customerId={customerId}
        onSubmit={onSubmit}
        onClose={onClose}
        onClickAddMode={onClickAddMode}
        visible={visible}
        // resetfields={resetfields}
        // setResetfields={setResetfields}
        dropdownLists={dropdownLists}
        customerOnChange={customerOnChange}
        projectOnChange={projectOnChange}
        taskOnChange={taskOnChange}
        customers={customers}
        step={step}
        // initialValues={initialValues}
        resetForm={resetForm}
        revEnable={revEnable}
        handleRevision={handleRevision}
      />
    </Base>
  );
};

export default AddWorkDrawerContainer;
