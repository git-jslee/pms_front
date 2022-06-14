import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dayjs } from 'dayjs';
import ProjectAddForm from '../../components/project/ProjectAddForm';
import { tbl_insert } from '../../modules/common/tbl_crud';
import * as api from '../../lib/api/api';
import apiQueryAll from '../../lib/api/apiQueryAll';
import { qs_customer_all, qs_tasksBySid } from '../../lib/api/query';
import { storeValueIsStoreObject } from '@apollo/client/cache/inmemory/helpers';

const ProjectAddContainer = ({ mode, setMode }) => {
  // 중복submit 방지 기능
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [codebook, setCodebook] = useState();
  const [customers, setCustomers] = useState();
  const [tasks, setTasks] = useState();
  const [cusTasksId, setCusTaskId] = useState();
  const [teams, setTeams] = useState();

  const apiPjtCodebook = async () => {
    setLoading(true);
    try {
      // 전체 고객사 정보 가져오기
      const res_customer = await apiQueryAll('api/customers', qs_customer_all);

      // 프로젝트 코드북 가져오기
      const res_code = await api.pjtCodebook();
      //   console.log('>>>>', res_code);

      // custom code_task ID 정보만 가져오기 , custom:6
      // 서비스에 해당하는 task 추가시 가져온 ID 에 1:1 매칭
      const res_cus_tasks = await api.getQueryString(
        'api/code-tasks',
        qs_tasksBySid(6),
      );
      const filter_cus_task = res_cus_tasks.data.data.map((cus) => cus.id);

      // team 정보 가져오기
      const res_teams = await api.getQueryString(
        'api/scode-teams',
        'populate=%2A',
      );
      const sort_teams = res_teams.data.data.sort((a, b) => {
        return a.attributes.sort - b.attributes.sort;
      });
      //   console.log('>>>>', sort_teams);

      // 고객사 한글 이름 기준 정렬
      const sort_customer = res_customer.sort((a, b) => {
        return a.attributes.name < b.attributes.name
          ? -1
          : a.attributes.name > b.attributes.name
          ? 1
          : 0;
      });
      // 로딩 완료
      setCustomers(sort_customer);
      setCodebook(res_code);
      setTeams(sort_teams);
      setCusTaskId(filter_cus_task);
      setLoading(false);
    } catch (error) {
      console.error('>>error>>', error);
    }
  };

  useEffect(() => {
    apiPjtCodebook();
  }, []);

  const handleOnClose = () => {
    setMode('view');
    setBtnDisabled(false);
  };

  const handleOnChange = async (e) => {
    //
    try {
      const query = qs_tasksBySid(e);
      const request = await api.getQueryString('api/code-tasks', query);
      const sort_req = request.data.data.sort((a, b) => {
        return a.attributes.sort - b.attributes.sort;
      });
      //   console.log('******', sort_req);
      setTasks(sort_req);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (values) => {
    try {
      console.log('>>>>>>onSubmit>>>>>>>', values);
      setBtnDisabled(true);
      // 프로젝트 등록
      const pjt_insert = await tbl_insert('api/projects', values);
      // console.log('>>>>> 1. project_insert 성공', insert);

      //프로젝트 task 등록
      // project task 값 추출 - 키에서 '__' 포함 키 배열로 변경
      const projectId = pjt_insert.data.data.id;
      for (let k in values) {
        // project task
        if (k.indexOf('__') === 0) {
          const v = values[k];
          const taskid = k.replace('__', '');
          const plan_day = v;
          let code_task;
          let cus_task;
          if (taskid.indexOf('_c_') >= 0) {
            const split_task = taskid.split('_c_');
            code_task = split_task[0];
            cus_task = split_task[1];
          } else {
            code_task = taskid;
          }

          //   newTasks.push([taskid, v]);
          const task_data = {
            project: projectId,
            code_task: parseInt(code_task),
            plan_day: plan_day,
            cus_task: cus_task,
          };
          //   console.log('>>>>>>taskArr>>>>>>>', task_data);
          const task_insert = await tbl_insert('api/project-tasks', task_data);
          console.log(
            `>>>> 2. task-${task_insert.data.data.id} : `,
            task_insert.data,
          );
        }
      }
    } catch (error) {
      console.error(error);
    }

    //
    setBtnDisabled(false);
    setMode('view');
  };

  //   console.log('*******', teams);

  return (
    <>
      <ProjectAddForm
        loading={loading}
        btnDisabled={btnDisabled}
        customers={customers}
        codebook={codebook}
        tasks={tasks}
        teams={teams}
        cusTasksId={cusTasksId}
        handleOnClose={handleOnClose}
        handleOnChange={handleOnChange}
        onSubmit={onSubmit}
      />
    </>
  );
};

export default ProjectAddContainer;
