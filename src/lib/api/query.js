import qs from 'qs';
import moment from 'moment';

// 프로젝트 카운트
export const qs_projectCount = (codeid) =>
  qs.stringify(
    {
      filters: {
        code_status: {
          id: {
            $eq: codeid, //1-시작전, 2-진행중, 3-보류, 4-완료, 5-대기
          },
        },
      },
      fields: ['name'],
      // populate: ['categories'],
      populate: {
        code_status: {
          fields: ['name'],
        },
      },
      pagination: {
        // page: 1,
        // pageSize: 10,
        start: 0,
        limit: 1,
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

// 프로젝트 리스트
export const qs_projectList = (params) =>
  qs.stringify(
    {
      filters: {
        code_status: {
          id: {
            $eq: params, //1-시작전, 2-진행중, 3-보류, 4-완료
          },
        },
      },
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
        project_tasks: {
          fields: ['plan_day'],
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

// 프로젝트 작업 리스트
export const qs_workList = (start, end) =>
  qs.stringify(
    {
      filters: {
        $and: [
          {
            working_day: {
              $gte: start,
            },
          },
          {
            working_day: {
              $lte: end,
            },
          },
        ],
      },
      // fields: ['name'],
      populate: {
        fields: ['working_day', 'working_time'],
        project: {
          // populate: '*',
          fields: ['name'],
        },
        project_task: {
          fields: ['plan_day'],
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

// 프로젝트 작업 리스트 - 진행중 작업 전체
export const qs_workListAll = (status, start, limit) =>
  qs.stringify(
    {
      filters: {
        $and: [
          {
            project: {
              code_status: {
                id: {
                  $eq: status, //1-시작전, 2-진행중, 3-보류, 4-완료
                },
              },
            },
          },
        ],
      },
      fields: ['working_day', 'working_time'],
      populate: {
        project: {
          // populate: '*',
          fields: ['name'],
        },
        //   project_task: {
        //     fields: ['plan_day'],
        //   },
        //   customer: {
        //     fields: ['name'],
        //   },
        //   users_permissions_user: {
        //     fields: ['username'],
        //   },
        //   code_progress: {
        //     fields: ['code'],
        //   },
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

// Projwct id quf...project-tasks
export const qs_projectTaskByPid = (pid) =>
  qs.stringify(
    {
      filters: {
        project: {
          id: {
            $eq: pid,
          },
        },
      },
      // fields: ['name'],
      populate: {
        fields: ['plan_day'],
        project: {
          fields: ['name'],
        },
        code_task: {
          fields: ['code', 'name', 'sort'],
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

// 프로젝트 정보 - 고객사ID & 진행중
export const qs_projectByCid = (cid) =>
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
  });

// Project id works
export const qs_workByPid = (pid) =>
  qs.stringify(
    {
      filters: {
        project: {
          id: {
            $eq: pid,
          },
        },
      },
      // fields: ['name'],
      populate: {
        fields: ['working_day', 'working_time', 'description'],
        project: {
          fields: ['name'],
        },
        project_task: {
          fields: ['plan_day'],
        },
        code_progress: {
          fields: ['code'],
        },
        users_permissions_user: {
          fields: ['username'],
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

// user 별 작업리스트
export const qs_workListByUid = (uid) =>
  qs.stringify(
    {
      filters: {
        users_permissions_user: {
          id: {
            $eq: uid,
          },
        },
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
          fields: ['plan_day'],
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
        limit: 30,
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

// sales
// sales 날짜별 쿼리
export const qs_salesByDate = (start, end) =>
  qs.stringify(
    {
      filters: {
        $and: [
          {
            deleted: {
              $eq: false,
            },
          },
          {
            sales_recdate: {
              $gte: start,
            },
          },
          {
            sales_recdate: {
              $lte: end,
            },
          },
        ],
      },
      sort: ['sales_recdate:asc'],
      populate: {
        fields: ['name', 'sales_recdate', 'count', 'confirmed', 'description'],
        customer: {
          fields: ['name'],
        },
        scode_division: {
          fields: ['name'],
        },
        scode_item: {
          fields: ['name'],
        },
        scode_team: {
          fields: ['name'],
        },
        scode_probability: {
          fields: ['name'],
        },
        sales_histories: {
          fields: [
            'sales',
            'sales_profit',
            'sales_margin',
            'sales_recdate',
            'paymentdate',
            'confirmed',
            'description',
          ],
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

//sales 항목 조회
export const qs_salesBySid = (sid) =>
  qs.stringify(
    {
      filters: {
        id: {
          $eq: sid,
        },
      },
      // fields: ['name'],
      populate: {
        // fields: ['working_day', 'working_time', 'description'],
        customer: {
          fields: ['name'],
        },
        scode_division: {
          fields: ['name'],
        },
        scode_item: {
          fields: ['name'],
        },
        scode_team: {
          fields: ['name'],
        },
        scode_probability: {
          fields: ['name'],
        },
        sales_histories: {
          populate: '*',
          fields: [
            'sales',
            'sales_profit',
            'sales_margin',
            'sales_recdate',
            'paymentdate',
            'confirmed',
            'description',
          ],
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

// sales 조건별.. 쿼리
export const qs_salesAdvanced = (arg) =>
  qs.stringify(
    {
      // filters: filters,
      filters: {
        $and: arg,
      },
      sort: ['sales_recdate:asc'],
      populate: {
        fields: ['name', 'sales_recdate', 'count', 'confirmed', 'description'],
        customer: {
          fields: ['name'],
        },
        scode_division: {
          fields: ['name'],
        },
        scode_item: {
          fields: ['name'],
        },
        scode_team: {
          fields: ['name'],
        },
        scode_probability: {
          fields: ['name'],
        },
        sales_histories: {
          fields: [
            'sales',
            'sales_profit',
            'sales_margin',
            'sales_recdate',
            'paymentdate',
            'confirmed',
          ],
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

// sales 월별 통계용 쿼리
export const qs_salesStatistics = (start, end) =>
  qs.stringify(
    {
      filters: {
        $and: [
          {
            deleted: {
              $eq: false,
            },
          },
          {
            sales_recdate: {
              $gte: start,
            },
          },
          {
            sales_recdate: {
              $lte: end,
            },
          },
        ],
      },
      populate: {
        fields: ['name', 'sales_recdate', 'count', 'confirmed'],
        scode_probability: {
          fields: ['name'],
        },
        sales_histories: {
          fields: ['sales', 'sales_profit', 'confirmed'],
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

// 유지보수&프로젝트 - 사용중 고객사 정보 가져오기
export const qs_customerByUsed = (arg) =>
  qs.stringify(
    {
      filters: arg,
      fields: ['id'],
      populate: {
        customer: {
          fields: ['name'],
        },
      },
      pagination: {
        start: 0,
        limit: 100,
      },
    },
    {
      encodeValuesOnly: true,
    },
  );

// 유지보수 - 고객사 ID 에 해당하는 정보
export const qs_maintenanceByCid = (cid) =>
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
          used: true,
        },
      ],
    },
    fields: ['title', 'contracted'],
    // populate: {
    //   scode_item: {
    //     fields: ['name'],
    //   },
    //   scode_team: {
    //     fields: ['name'],
    //   },
    // },
  });

// 유지보수 - 상세 정보
export const qs_maintenanceByid = (mid) =>
  qs.stringify({
    filters: {
      $and: [
        {
          id: {
            $eq: mid,
          },
        },
      ],
    },
    fields: ['title', 'contracted', 'description'],
    populate: {
      customer: {
        fields: ['name'],
      },
      scode_item: {
        fields: ['name'],
      },
      scode_team: {
        fields: ['name'],
      },
    },
  });

// 유지보수 - 매입/매출 정보(기간내)
export const qs_mainHistoryByMid = (mid) =>
  qs.stringify({
    filters: {
      $and: [
        {
          maintenance: {
            id: {
              $eq: mid,
            },
          },
        },
        {
          warranty_from: {
            $lte: moment().format('YYYY-MM-DD'),
          },
        },
        {
          warranty_to: {
            $gte: moment().format('YYYY-MM-DD'),
          },
        },
      ],
    },
    fields: [
      'warranty_from',
      'warranty_to',
      'payment_date',
      'cost',
      'cost_m',
      'memo',
    ],
    populate: {
      code_ma_inex: {
        fields: ['code', 'name'],
      },
      code_ma_item: {
        fields: ['name'],
      },
      code_ma_term: {
        fields: ['name'],
      },
    },
  });

// 유지보수 - 매입/매출 정보(전체)
export const qs_mainHistoryAllByMid = (mid) =>
  qs.stringify({
    filters: {
      $and: [
        {
          maintenance: {
            id: {
              $eq: mid,
            },
          },
        },
      ],
    },
    fields: [
      'warranty_from',
      'warranty_to',
      'payment_date',
      'cost',
      'cost_m',
      'memo',
    ],
    populate: {
      code_ma_inex: {
        fields: ['code', 'name'],
      },
      code_ma_item: {
        fields: ['name'],
      },
      code_ma_term: {
        fields: ['name'],
      },
    },
  });

// user 별 유지보수 작업리스트
export const qs_mainWorkListByUid = (uid) =>
  qs.stringify(
    {
      filters: {
        users_permissions_user: {
          id: {
            $eq: uid,
          },
        },
      },
      // 작업등록일 기준 정렬
      sort: ['working_day:desc'],
      // fields: ['name'],
      populate: {
        fields: ['working_day', 'working_time', 'title'],
        customer: {
          fields: ['name'],
        },
        maintenance: {
          fields: ['title'],
        },
        code_ma_support: {
          fields: ['name'],
        },
        users_permissions_user: {
          fields: ['username'],
        },
      },
      pagination: {
        start: 0,
        limit: 30,
      },
    },
    {
      encodeValuesOnly: true,
    },
  );
