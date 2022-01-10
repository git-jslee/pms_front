import React from 'react';
import moment from 'moment';

export const projectInitValues = (projectInfo, projectTaskInfo) => {
  if (projectInfo === '' || projectTaskInfo === '') return {};
  let obj = {};
  const tasksmap = projectTaskInfo.map((value) => {
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
