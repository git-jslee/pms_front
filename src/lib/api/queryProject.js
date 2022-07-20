import qs from 'qs';
import moment from 'moment';

// 프로젝트 리스트
// 프로젝트 > count 에서 상태정보 클릭시..시작전, 진행, 보류...

export const qs_projectList = (stateId, qsFilter) =>
  qs.stringify(
    {
      filters: {
        $and: [
          {
            code_status: {
              id: {
                $eq: stateId, //1-시작전, 2-진행중, 3-보류, 4-완료
              },
            },
          },
          ...qsFilter,
        ],
      },
      sort: ['id:desc'],
      // fields: ['name'],
      populate: {
        customer: {
          fields: ['name'],
        },
        code_status: {
          fields: ['name'],
        },
        code_service: {
          fields: ['name'],
        },
        scode_team: {
          fields: ['name'],
        },
        project_tasks: {
          fields: [
            'manpower',
            'plan_day',
            'cus_task',
            'total_time',
            'startdate',
            'last_workupdate',
            'revision',
          ],
          populate: {
            code_progress: {
              fields: ['code'],
            },
            code_task: {
              fields: ['code', 'name', 'sort', 'used'],
            },
          },
        },
      },
      pagination: {
        // page: 1,
        // pageSize: 10,
        start: 0,
        limit: 100,
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

// 작업 >  작업등록(프로젝트) - 프로젝트 정보 가져오기
export const qs_projectByAddWork = () =>
  qs.stringify(
    {
      fields: ['name'],
      populate: {
        project_tasks: {
          fields: [
            'manpower',
            'plan_day',
            'cus_task',
            'revision',
            'startdate',
            'last_workupdate',
          ],
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

// <-- work
// 작업 > user 별 작업리스트
export const qs_workListByUid = (uid, start, end) =>
  qs.stringify(
    {
      filters: {
        $and: [
          {
            users_permissions_user: {
              id: {
                $eq: uid,
              },
            },
          },
          {
            deleted: {
              $eq: false,
            },
          },
        ],
      },
      // 작업등록일 기준 정렬
      sort: ['working_day:desc'],
      // fields: ['name'],
      populate: {
        fields: ['working_day', 'working_time'],
        project: {
          // populate: '*',
          populate: ['code_service'],
          fields: ['name'],
        },
        project_task: {
          populate: ['code_task'],
          fields: ['plan_day', 'cus_task'],
        },
        customer: {
          fields: ['name'],
        },
        users_permissions_user: {
          fields: ['username'],
        },
        code_progress: {
          fields: ['code'],
        },
      },
      pagination: {
        start: 0,
        limit: 50,
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

// 프로젝트
// Project id 별...project-tasks
export const qs_project = () =>
  qs.stringify(
    {
      populate: {
        // fields: ['plan_day'],
        customer: {
          fields: ['name'],
        },
        code_service: {
          fields: ['name', 'code'],
        },
        code_status: {
          fields: ['name'],
        },
        project_tasks: {
          fields: [
            'manpower',
            'plan_day',
            'cus_task',
            'total_time',
            'startdate',
            'last_workupdate',
            'revision',
          ],
          // populate: '*',
          populate: {
            code_progress: {
              fields: ['code'],
            },
            code_task: {
              fields: ['code', 'name', 'sort', 'used'],
            },
          },
        },
        scode_team: {
          fields: ['name'],
        },
        project_costs: {
          // fields: ['name'],
        },
        // project_changes: {
        //   fields: ['type', 'change', 'date', 'description'],
        // },
      },
      pagination: {
        start: 0,
        limit: 50,
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

// 프로젝트 상세 조회 - Project id works
// 프로젝트 관리 > 상세조회
export const qs_workallByPid = (start, limit, pid) =>
  qs.stringify(
    {
      filters: {
        project: {
          id: {
            $eq: pid,
          },
        },
        deleted: {
          $eq: false,
        },
      },
      sort: ['working_day:desc'],
      // fields: ['name'],
      populate: {
        fields: ['working_day', 'working_time', 'description'],
        project: {
          fields: ['name'],
        },
        project_task: {
          populate: ['code_task'],
          fields: ['plan_day', 'cus_task'],
        },
        code_progress: {
          fields: ['code'],
        },
        users_permissions_user: {
          fields: ['username'],
        },
      },
      pagination: {
        start: start,
        limit: limit,
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

// 프로젝트 상세 조회 -
// 프로젝트 관리 > 상세조회 > 프로젝트 별 project_change 전체 리스트
export const qs_changeallByPid = (start, limit, pid) =>
  qs.stringify(
    {
      filters: {
        project: {
          id: {
            $eq: pid,
          },
        },
      },
      sort: ['id:asc'],
      fields: ['type', 'change', 'date', 'description', 'createdAt'],
      populate: {
        users_permissions_user: {
          fields: ['username'],
        },
      },
      pagination: {
        start: start,
        limit: limit,
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

// 작업 등록시 total 작업시간 update
// project-taks id 에 해당하는 works 테이블 전체 가져오기
export const qs_worksByTaskId = (start, limit, tid) =>
  qs.stringify(
    {
      filters: {
        project_task: {
          id: {
            $eq: tid,
          },
        },
      },
      fields: ['working_day', 'working_time', 'revision'],
      populate: {
        users_permissions_user: {
          fields: ['username'],
        },
      },
      pagination: {
        start: start,
        limit: limit,
      },
    },
    {
      encodeValuesOnly: true,
    },
  );
