import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProjectList } from '../../modules/project';
// import { getProjectList } from '../../modules/projectList';
import ProjectListTable from '../../components/project/ProjectListTable';
import { apiCustomerList } from '../../lib/api/api';

const ProjectListContainer = () => {
  const dispatch = useDispatch();
  const { list, error, loading } = useSelector(({ project, loading }) => ({
    list: project.data.list,
    error: project.error,
    loading: loading['project/GET_PROJECTLIST'],
  }));
  console.log('loading', loading);

  // 컴포넌트가 처음 렌더링 될 때 프로젝트 전체 리스트 정보 가져옴
  // 페이지 이동 후 재 접속시.. 프로젝트 리스트 다시 가져옴...코드 수정 필요..
  useEffect(() => {
    dispatch(getProjectList());
    // getProjectList();
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

  return (
    <>
      {loading === false ? (
        <ProjectListTable lists={list} loading={loading} />
      ) : (
        <div>로딩중</div>
      )}
    </>
  );
};

export default ProjectListContainer;
