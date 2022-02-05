import React from 'react';
import { useSelector } from 'react-redux';
import ProjectStatistics from '../../components/project/ProjectStatistics';

const ProjectStatisticsContainer = () => {
  const { mode } = useSelector(({ common }) => ({
    mode: common.mode,
  }));

  return <>{mode === 'VIEW' ? <ProjectStatistics /> : <h1>...</h1>}</>;
};

export default ProjectStatisticsContainer;
