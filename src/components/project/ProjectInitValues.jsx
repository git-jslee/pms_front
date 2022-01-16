import React from 'react';
import moment from 'moment';

export const projectInitValues = (projectInfo, pidTaskList) => {
  console.log('pidTaskList', pidTaskList);
  if (projectInfo === undefined || pidTaskList === undefined) return {};
  let obj = {};
  const tasksmap = pidTaskList.map((value) => {
    obj[value.code_task.code] = value.planTime;
  });
  return {
    type: projectInfo.code_type.id,
    customer: projectInfo.customer.id,
    project: projectInfo.name,
    service: projectInfo.code_service.id,
    status: projectInfo.code_status.id,
    planDate: [
      moment(projectInfo.planStartDate),
      moment(projectInfo.planEndDate),
    ],
    startDate: moment(projectInfo.startDate),
    endDate: moment(projectInfo.endDate),
    ...obj,
  };
};
