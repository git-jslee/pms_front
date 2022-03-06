import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectList, getProject } from '../../modules/project';
import moment from 'moment';
// import { getProjectList } from '../../modules/projectList';
import ProjectListTable from '../../components/project/ProjectListTable';
import { apiCustomerList } from '../../lib/api/api';
import * as api from '../../lib/api/api';
import { startLoading, finishLoading } from '../../modules/loading';

const ProjectListContainer = () => {
  const dispatch = useDispatch();
  const [projectList, setProjectList] = useState();
  const { lists, error, loading } = useSelector(({ project, loading }) => ({
    lists: project.list,
    error: project.error,
    loading: loading['project/GET_PROJECT'],
  }));
  console.log('loading', loading);
  console.log('list', lists);

  const { startMonth, endMonth } = useSelector(({ common }) => ({
    startMonth: common.month[0],
    endMonth: common.month[1],
  }));

  // const [tableData, setTableData] = useState(null);

  // 컴포넌트가 처음 렌더링 될 때 프로젝트 전체 리스트 정보 가져옴
  // 페이지 이동 후 재 접속시.. 프로젝트 리스트 다시 가져옴...코드 수정 필요..
  useEffect(() => {
    const params = 'projects?code_status.id=2';
    dispatch(getProject(params));
  }, []);

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

  let tableData = [];
  if (lists) {
    const tableList = lists.map((list, index) => {
      const duration = moment().diff(moment(list.startDate), 'days');
      const array = {
        key: list.id,
        no: index + 1,
        type: list.code_type.name,
        customer: list.customer.name,
        name: list.name,
        service: list.code_service.name,
        status: list.code_status.name,
        startdate: list.startDate,
        duration: duration,
        action: 'View',
      };
      return array;
    });
    tableData = tableList;
  }

  console.log('tableList', tableData);

  return (
    <>
      <ProjectListTable tableData={tableData} loading={loading} />
    </>
  );
};

export default ProjectListContainer;
