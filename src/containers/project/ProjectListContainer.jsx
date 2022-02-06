import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectList } from '../../modules/project';
import moment from 'moment';
// import { getProjectList } from '../../modules/projectList';
import ProjectListTable from '../../components/project/ProjectListTable';
import { apiCustomerList } from '../../lib/api/api';
import * as api from '../../lib/api/api';
import { startLoading, finishLoading } from '../../modules/loading';

const ProjectListContainer = () => {
  const dispatch = useDispatch();
  const [projectList, setProjectList] = useState();
  const { list, error, loading } = useSelector(({ project, loading }) => ({
    list: project.data.list,
    error: project.error,
    loading: loading['project/GET_PROJECTLIST'],
  }));
  console.log('loading', loading);

  const { startMonth, endMonth } = useSelector(({ common }) => ({
    startMonth: common.month[0],
    endMonth: common.month[1],
  }));

  // 컴포넌트가 처음 렌더링 될 때 프로젝트 전체 리스트 정보 가져옴
  // 페이지 이동 후 재 접속시.. 프로젝트 리스트 다시 가져옴...코드 수정 필요..
  useEffect(() => {
    const start = moment(startMonth).startOf('month').format('YYYY-MM-DD');
    const end = moment(endMonth).endOf('month').format('YYYY-MM-DD');
    console.log('month', start, end);
    const query = async () => {
      if (!startMonth || !endMonth) return;
      dispatch(startLoading('project/GET_PROJECTLIST')); //loading true
      try {
        const response = await api.getProjectListByMonth(start, end);
        console.log('==response', response.data);
        setProjectList(response.data);
        dispatch(finishLoading('project/GET_PROJECTLIST')); // loading false
      } catch (error) {
        console.error('error', error);
        dispatch(startLoading('project/GET_PROJECTLIST')); // loading true
        throw error;
      }
    };
    query();

    // dispatch(getProjectList());
    // getProjectList();
  }, [startMonth, endMonth]);

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

  return (
    <>
      {loading === false ? (
        <ProjectListTable lists={projectList} loading={loading} />
      ) : (
        <div>로딩중</div>
      )}
    </>
  );
};

export default ProjectListContainer;
