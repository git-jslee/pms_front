import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProjectStatistics from '../../components/project/ProjectStatistics';
import moment from 'moment';

const ProjectStatisticsContainer = () => {
  // 코드북 loding 상태 체크
  const { code_tasks } = useSelector(({ codebook }) => ({
    code_tasks: codebook.code_tasks,
  }));
  const { mode } = useSelector(({ common }) => ({
    mode: common.mode,
  }));
  const { taskLists, projectInfo, workLists } = useSelector(({ project }) => ({
    taskLists: project.data.tasks,
    projectInfo: project.data.projectInfo,
    workLists: project.data.works,
  }));
  const [statistic, setStatistic] = useState();
  const [durationDay, setDurationDay] = useState(0);

  useEffect(() => {
    if (!code_tasks || !projectInfo || !taskLists) {
      return;
    }
    const duration = moment().diff(moment(projectInfo.startDate), 'days');
    console.log('duration', duration);

    console.log('projectInfo', projectInfo);
    console.log('taskLists', taskLists);
    // {  id:1,  code: 'w100',  name:'기획 구성', planDay: null, totalTime: null, progress:null }
    // const tasks1 = code_tasks
    //   .filter((v1) => v1.code_service.id === projectInfo.code_service.id)
    //   .map((v2) => {
    //     return {
    //       id: v2.id,
    //       code: v2.code,
    //       name: v2.name,
    //       sort: v2.sort,
    //       planDay: null,
    //       totalTime: null,
    //       progress: null,
    //     };
    //   })
    //   .sort((a, b) => a.sort - b.sort);
    const tasks = taskLists.map((v) => {
      const value = v.attributes;
      return {
        key: v.id,
        id: v.id,
        code: value.code_task.data.attributes.code,
        name: value.code_task.data.attributes.name,
        sort: value.code_task.data.attributes.sort,
        planDay: value.plan_day,
        totalTime: 0,
        progress: 0,
      };
    });
    console.log('==tasks', tasks);
    console.log('==workLists', workLists);

    // total time & progress 계산
    workLists
      .sort(
        (a, b) =>
          new Date(a.attributes.working_day) -
          new Date(b.attributes.working_day),
      )
      .map((v2) => {
        tasks.map((v3, index) => {
          if (v2.attributes.project_task.data.id === v3.id) {
            tasks[index].totalTime =
              tasks[index].totalTime + v2.attributes.working_time;
            tasks[index].progress =
              v2.attributes.code_progress.data.attributes.code;
          }
        });
      });
    const tasksResult = tasks.sort((a, b) => a.sort - b.sort);
    setDurationDay(duration);
    setStatistic(tasksResult);
    console.log('===tasksResult', tasksResult);
  }, [taskLists, workLists]);

  return (
    <>
      {mode === 'VIEW' && statistic ? (
        <ProjectStatistics statistic={statistic} duration={durationDay} />
      ) : (
        <h1>...</h1>
      )}
    </>
  );
};

export default ProjectStatisticsContainer;
