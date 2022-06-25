import qs from 'qs';
import moment from 'moment';

// 작업 >  작업등록(프로젝트) - 프로젝트 정보 가져오기
export const qs_projectByAddWork = () =>
  qs.stringify(
    {
      fields: ['name'],
      populate: {
        project_tasks: {
          fields: ['plan_day', 'cus_task', 'revision', 'last_workupdate'],
          populate: {
            code_task: {
              fields: ['code', 'name', 'sort'],
            },
            code_progress: {
              fields: ['code', 'sort'],
            },
          },
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

// 작업등록 Step2 - 고객사ID & 진행중
export const qs_projectNameByCid = (cid) =>
  qs.stringify({
    filters: {
      $and: [
        {
          customer: {
            id: {
              $eq: cid,
            },
          },
        },
        {
          code_status: {
            id: {
              $eq: 2, //1-시작전, 2-진행중, 3-보류, 4-완료
            },
          },
        },
      ],
    },
    fields: ['name'],
  });

// 작업 >  작업등록(프로젝트) - task 정보 가져오기
