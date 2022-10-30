import qs from 'qs';
import moment from 'moment';

// 팀별 인원 현황
// 프로젝트 > subcontainer > 투입률 계산.

export const qs_teamchangehistory = () =>
  qs.stringify(
    {
      filters: {
        used: {
          $eq: true,
        },
      },
      sort: ['sort:asc'],
      fields: ['name', 'abbr'],
      populate: {
        team_change_histories: {
          sort: ['change_date:desc'],
          fields: ['change_date', 'number', 'weeknumber'],
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

// 작업 > 사업부 & 사용자 리스트
export const qs_team_worker_list = () =>
  qs.stringify(
    {
      filters: {
        used: {
          $eq: true,
        },
      },
      sort: ['sort:asc'],
      fields: ['name', 'abbr'],
      populate: {
        users: {
          sort: ['username:asc'],
          fields: ['username', 'email', 'blocked', 'level'],
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

// user team 정보 가져오기
export const qs_teamByUserid = () =>
  qs.stringify(
    {
      fields: ['username', 'email'],
      populate: {
        code_pj_team: {
          fields: ['name', 'abbr'],
        },
      },
    },
    {
      encodeValuesOnly: true,
    },
  );
