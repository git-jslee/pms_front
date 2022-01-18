import { ListConsumer } from 'antd/lib/list';
import React from 'react';

const calPidWorktimeAndProgress = (id, pidTaskList, pidWorktime) => {
  let calTaskObj = {};
  const calWorktime = pidTaskList.map((list) => {
    let totalTime = 0;
    let progress = '';
    pidWorktime
      .filter((v1) => v1.project_task.code_task === list.code_task.id)
      .map((v2) => {
        totalTime = totalTime + v2.workingTime;
        if (!progress) {
          progress = [v2.workingDay, v2.code_progress.code];
        } else if (progress[0] < v2.workingDay) {
          console.log('progress 업데이트', progress[0], v2.workingDay);
          progress = [v2.workingDay, v2.code_progress.code];
        }
      });
    // const taskCalValue = {
    //   [list.code_task.code]: [list.planTime, totalTime, progress[1]],
    // };
    // const assignObject = Object.assign(calTaskObj, taskCalValue);
    return {
      id: list.code_task.id,
      code: list.code_task.code,
      name: list.code_task.name,
      planDay: list.planTime,
      totalTime: totalTime,
      progress: progress[1] || 0,
    };
  });
  return calWorktime;
};

export default calPidWorktimeAndProgress;
