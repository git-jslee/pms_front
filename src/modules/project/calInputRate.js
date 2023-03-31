import * as api from '../../lib/api/api';
import { qs_workingTime } from '../../lib/api/query';
import { qs_teamchangehistory } from '../../lib/api/queryCommon';
import moment from 'moment';

const calInputRate = async (startDate, endDate) => {
  // 투입률 계산, menu4 클릭
  console.log('-----------', startDate, endDate)

  const resultArray = [];
  const returnData = {};
  let start = 0;
  const limit = 100;
  const query = qs_workingTime(startDate, endDate, start, limit);
  const request = await api.getQueryString('api/works', query);
  resultArray.push(...request.data.data);
  const totalCount = request.data.meta.pagination.total;

  for (start = start + limit; start <= totalCount; start += limit) {
    const newQuery = qs_workingTime(startDate, endDate, start, limit);
    const newRequest = await api.getQueryString('api/works', newQuery);
    resultArray.push(...newRequest.data.data);
  }

  // 부서별 작업인원 <-------
  const req_changehistory = await api.getQueryString(
    'api/code-pj-teams',
    qs_teamchangehistory(),
  );
  const team_changehistory = req_changehistory.data.data;
  const team_changehistory_de = team_changehistory.filter(
    (v) => v.attributes.abbr === 'DE',
  )[0].attributes.team_change_histories.data;
  const team_changehistory_ve = team_changehistory.filter(
    (v) => v.attributes.abbr === 'VE',
  )[0].attributes.team_change_histories.data;
  const team_changehistory_rd = team_changehistory.filter(
    (v) => v.attributes.abbr === 'RD',
  )[0].attributes.team_change_histories.data;
  const team_mp_array = {
    DE: team_changehistory_de,
    VE: team_changehistory_ve,
    RD: team_changehistory_rd,
  };
  console.log('>>>>req_teamchangehistory', team_mp_array);
  // <---- 부서별 작업인원

  //  <-----  팀 & 주차에 해댕하는 mp 값 계산
  const cal_mp = (team, work_week) => {
    // const result = team_mp_array[team][0].attributes.number;
    const new_arr = team_mp_array[team];
    let mp = new_arr[0];
    const current_workweek_split = work_week.split('-');
    const current_workweek = parseInt(current_workweek_split[1]);
    // console.log(
    //   `team -> ${team}, work_week -> ${work_week}, current_workweek -> ${current_workweek}`,
    // );
    new_arr.some((v, i) => {
      const new_workweek = new_arr[i].attributes.weeknumber;
      // 주차 비교
      // console.log(`team result[${i}]`, new_workweek);
      if (current_workweek >= new_workweek) {
        mp = new_arr[i].attributes.number;
        // console.log(`<----mp result[${i}]`, mp);
        return true;
      }
    });
    return mp;
  };
  //mp 계산 수정(23.02.09)
  const cal_manpower = (team, working_day) => {
    const new_arr = team_mp_array[team];
    let manpower;
    for (let i=0; i <= new_arr.length; i++) {
      const team_arr = new_arr[i].attributes.change_date;
      const isAfter = moment(working_day).isAfter(team_arr) || moment(working_day).isSame(team_arr)
      // console.log(`>>>----${i}---->>>>`);
      // console.log('>>>working_day>>>>', working_day);
      // console.log('>>>team_arr>>>>', team_arr);
      if (isAfter) {
        manpower = new_arr[i].attributes.number;
        return manpower};
      }
  }

  // 팀 & 주차에 해댕하는 mp 값 계산 ---->

  console.log('********resultArray********', resultArray);
  const newArray = resultArray.map((list) => {
    // const work_week = moment(list.attributes.working_day).format('GG-wo');
    const work_week = moment(list.attributes.working_day).format('GG-WW');
    const work_time = list.attributes.working_time;

    // const team = list.attributes.code_pj_team.data.id;
    const team = list.attributes.code_pj_team.data.attributes.abbr;
    // console.log('****week****', work_week);
    //{ 22-01-3rd:{1:32, 2:20, 3:10, 4:2}, 22-01-4rd:{1:32, 2:20, 3:10, 4:2}, }

    if (Object.keys(returnData).includes(work_week)) {
      let mp = 0;
      let manpower;
      // console.log('======= return Data =======', returnData[work_week]);
      // console.log('======= return Data =======', returnData[work_week][team]);
      if (returnData[work_week][team] !== undefined) {
        // team 에 해당하는 키 있을때
        returnData[work_week] = {
          ...returnData[work_week],
          [team]: {
            ...returnData[work_week][team],
            time: returnData[work_week][team]['time'] + work_time,
            // mp: returnData[work_week][team]['mp'],
          },
        };
      } else {
        // team 에 해당하는 키 없을때
        // console.log('22&&&&&', work_time);
        // team 인원 계산
        if (team !== 'CG') {
          // mp = team_mp_array[team][0].attributes.number;
          // mp = cal_mp(team, work_week);
          // console.log('======= 2.mp =======', mp);
          manpower = cal_manpower(team,list.attributes.working_day);
        }
        returnData[work_week] = {
          ...returnData[work_week],
          [team]: { time: work_time, manpower: manpower },
        };
      }
    } else {
      let mp = 0;
      let manpower;
      // 주차 & 팀 생성
      //   console.log('======= 1.work_week & team =======', work_week, team);
      // team 인원 계산
      if (team !== 'CG') {
        // mp = cal_mp(team, work_week);
        manpower = cal_manpower(team,list.attributes.working_day);
        // mp = team_mp_array[team][0].attributes.number;
        // console.log('======= 2.mp =======', mp);
      }
      returnData[work_week] = { [team]: { time: work_time, manpower: manpower } };
    }
  });
  // 주차별 투입가능 인원 추가 적용
  // { 22-01-3rd:{1:32, 2:20, 3:10, 4:2}, 22-01-4rd:{1:32, 2:20, 3:10, 4:2}, }->
  // { 22-01-3rd:{'DE':{time: 32, mp:3}, 'VE':{time:20, mp:3}, 'RD':{time:10, mp:2}}
  // setInputRate(returnData);
  // setTeamCh(team_changehistory);
  console.log('********return Data********', returnData);
  console.log('********teamHistory********', team_changehistory);
  return { inputRate: returnData, teamHistory: team_changehistory };
};
export default calInputRate;
