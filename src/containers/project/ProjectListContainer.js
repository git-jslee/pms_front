import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectList, getProject } from '../../modules/project';
import moment from 'moment';
// import { getProjectList } from '../../modules/projectList';
import ProjectListTable from '../../components/project/ProjectListTable';
import { apiCustomerList } from '../../lib/api/api';
import * as api from '../../lib/api/api';
import { startLoading, finishLoading } from '../../modules/loading';
import calWorkTime from '../../modules/project/calWorkTime';
import { weekOfMonth } from '../../modules/common/weekOfMonth';
import { qs_projectList, qs_workListAll } from '../../lib/api/query';

const ProjectListContainer = () => {
  const dispatch = useDispatch();
  // const [projectList, setProjectList] = useState();
  const { lists, error, loading } = useSelector(({ project, loading }) => ({
    lists: project.list,
    error: project.error,
    loading: loading['project/GET_PROJECT'],
  }));
  console.log('loading', loading);
  console.log('list', lists);
  const { wlist } = useSelector(({ project }) => ({
    wlist: project.wlist,
  }));
  const [totalWorkTime, setTotalWorktime] = useState([]);

  // const { startMonth, endMonth } = useSelector(({ common }) => ({
  //   startMonth: common.month[0],
  //   endMonth: common.month[1],
  // }));

  // const [tableData, setTableData] = useState(null);

  // 컴포넌트가 처음 렌더링 될 때 프로젝트 전체 리스트 정보 가져옴
  // 페이지 이동 후 재 접속시.. 프로젝트 리스트 다시 가져옴...코드 수정 필요..
  useEffect(() => {
    // const params = 'projects?code_status.id=2';
    const code_status_id = 2;
    const query = qs_projectList(code_status_id);
    dispatch(getProject(query));

    ////
    calTotalWorkTime();
  }, []);

  const calTotalWorkTime = async () => {
    const result = [];
    const statusId = 2;
    let start = 0;
    const limit = 50;
    const query = qs_workListAll(statusId, start, limit);
    const request = await api.getQueryString('api/works', query);
    result.push(...request.data.data);
    // console.log('-----request-----', request.data);
    const total = request.data.meta.pagination.total;
    for (start = start + limit; start <= total; start += limit) {
      const query = qs_workListAll(statusId, start, limit);
      const request = await api.getQueryString('api/works', query);
      result.push(...request.data.data);
      // console.log('-----request-----', start, '--', request.data);
    }
    console.log('-----result------', result);
    const worktime = calWorkTime(result);
    console.log('--calworktime--', worktime);
    setTotalWorktime(worktime);
  };

  // 작업통계 기능 projectSubContainer 통합필요..
  const [worktime, setWorktime] = useState([]);
  useEffect(() => {
    if (!wlist) return;
    const result = calWorkTime(wlist);
    console.log('--calworktime--', result);
    setWorktime(result);
  }, [wlist]);

  // useEffect(() => {
  //   if (error) {
  //     console.log('프로젝트 리스트 가져오기 오류');
  //     console.log(error);
  //   }
  //   // if (status) {
  //   //   console.log('프로젝트 리스트 가져오기 성공');
  //   //   console.log(status);
  //   // }
  // }, [error]);

  // const tableData = [];
  // if (!list) {
  //   return;
  // }

  // useEffect(() => {
  //   if (lists) {
  //     const tableList = lists.map((list, index) => {
  //       const duration = moment().diff(moment(list.startDate), 'days');
  //       const array = {
  //         key: list.id,
  //         no: index + 1,
  //         type: list.code_type.name,
  //         customer: list.customer.name,
  //         name: list.name,
  //         service: list.code_service.name,
  //         status: list.code_status.name,
  //         startdate: list.startDate,
  //         duration: duration,
  //         action: 'View',
  //       };
  //       // tableData.push(array);
  //       return array;
  //     });
  //     setTableData(tableList);
  //   }
  // }, [lists]);

  // let tableData = [];
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    if (lists) {
      console.log('**list**', lists);
      const tableList = lists.map((list, index) => {
        const elapsed = moment().diff(
          moment(list.attributes.startdate),
          'days',
        );
        const elapsed_last = moment().diff(
          moment(list.attributes.last_workupdate),
          'days',
        );
        const _totalworktime = totalWorkTime.filter((v) => v.id === list.id)[0];
        // console.log('**worktime**', index, _totalworktime);
        const array = {
          key: list.id,
          no: index + 1,
          customer: list.attributes.customer.data.attributes.name,
          name: list.attributes.name,
          service: list.attributes.code_service.data.attributes.name,
          status: list.attributes.code_status.data.attributes.name,
          startdate: list.attributes.startdate,
          lastUpdate: list.attributes.last_workupdate,
          elapsed: elapsed,
          elapsed_last: elapsed_last,
          totalday:
            _totalworktime !== undefined
              ? Math.round(_totalworktime.worktime / 8)
              : '',
          action: 'View',
        };
        return array;
      });
      setTableData(tableList);
    }
  }, [lists, totalWorkTime]);

  console.log('tableList', tableData);

  return (
    <>
      <ProjectListTable tableData={tableData} loading={loading} />
    </>
  );
};

export default ProjectListContainer;
