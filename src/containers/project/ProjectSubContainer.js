import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as api from '../../lib/api/api';
import moment from 'moment';
import {
  setTitle,
  changeSubMenu,
  changeMode,
  changeDrawer,
} from '../../modules/common';
import {
  getProject,
  getProjectList,
  getWork,
  getProjectWorkList,
  changeProjectStatus,
  changeProjectProgress,
  initProjectStorage,
} from '../../modules/project';
import ProjectSubButton from '../../components/project/ProjectSubButton';
import ProjectAdvancedSearchForm from '../../components/project/ProjectAdvancedSearchForm';
import calWorkTime from '../../modules/project/calWorkTime';
import SubWorkStatistics from '../../components/project/SubWorkStatistics';
import {
  qs_projectCount,
  qs_workList,
  qs_workingTime,
} from '../../lib/api/query';
import { qs_projectList } from '../../lib/api/queryProject';
import startEndDay from '../../modules/common/startEndDay';
import { message, Divider } from 'antd';
import { qs_teamchangehistory } from '../../lib/api/queryCommon';

const ProjectSubContainer = ({ setMode }) => {
  const dispatch = useDispatch();
  // const [qsFilter, setQsFilter] = useState([{}]);

  const [sumFilter, setSumFilter] = useState([{ price: { $ne: 0 } }]);
  // const { wlist } = useSelector(({ project }) => ({
  //   wlist: project.wlist,
  // }));
  // sub button 상태
  const [buttonState, setButtonState] = useState('btn1');

  // title 업데이트
  useEffect(() => {
    dispatch(setTitle('프로젝트 관리'));
    return () => {
      dispatch(setTitle(null));
    };
  }, [dispatch]);

  useEffect(() => {
    return () => {
      dispatch(initProjectStorage());
    };
  }, []);

  const { submenu, renewcnt } = useSelector(({ common, project }) => ({
    submenu: common.submenu,
    renew: project.status.renew,
  }));

  // sub메뉴 버튼 클릭시 동작 구현
  const [subMenu, setSubMenu] = useState('status');

  const handleOnClick = (menu) => {
    console.log('subMenuSelect 버튼 클릭', menu);
    if (menu === 'pjtadd') {
      dispatch(changeDrawer(menu));
      return;
    }
    dispatch(changeSubMenu(menu));
    // setSubMenu(menu);
    // if (menu === 'inputrate') {
    //   const date = startEndDay(
    //     moment().subtract(4, 'months').format('YYYY-MM'),
    //     moment().format('YYYY-MM'),
    //   );
    //   const startDate = date[0];
    //   const endDate = date[1];
    //   calInputRate(startDate, endDate);
    // }
  };

  //카운터(전체, 진행중, 완료, ..)
  //request(`/api/articles?${query}`);
  const [count, setCount] = useState([]);
  const [inputRate, setInputRate] = useState();
  const [teamCh, setTeamCh] = useState();

  useEffect(() => {
    const query = [];
    for (let i = 1; i <= 6; i++) {
      query.push(qs_projectCount(i, sumFilter));
    }
    console.log('**query**', query);
    api
      .getCountProject('api/projects', query)
      .then((result) => {
        console.log('getQueryResult', result);
        const projectCount = result.map((v, index) => {
          return {
            id: index + 1,
            count: v.data.meta.pagination.total,
          };
        });
        setCount(projectCount);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }, []);

  // 프로젝트 리스트 가져오기
  useEffect(() => {
    // const params = 'projects?code_status.id=2';
    // 1-시작전, 2-진행중, 3-보류, 4-완료, 5-대기, 6-검수
    const code_status_id = 2;
    const query = qs_projectList(code_status_id, sumFilter);
    ////
    // dispatch(getProject(query));
    dispatch(getProjectList(query, code_status_id));
    // calTotalWorkTime();
  }, []);

  // 작업통계 정보 가져오기
  // const start = useRef(moment().subtract(7, 'days').format('YYYY-MM-DD'));
  const [start, setStart] = useState(
    moment().subtract(7, 'days').format('YYYY-MM-DD'),
  );
  const [end, setEnd] = useState(moment().format('YYYY-MM-DD'));
  useEffect(() => {
    const query = qs_workList(start, end);
    dispatch(getWork(query));
    // const params = `works?workingDay_gte=${start}&workingDay_lte=${end}`;
    // dispatch(getProjectWorkList(params));
  }, [start, end]);

  const subWorkStatisticsOnSubmit = (e) => {
    console.log('subWorkStatisticsOnSubmit', e);
    const start = moment(e.date[0]).format('YYYY-MM-DD');
    const end = moment(e.date[1]).format('YYYY-MM-DD');
    const query = qs_workList(start, end);
    dispatch(getWork(query));
    // const params = `works?workingDay_gte=${start}&workingDay_lte=${end}`;
    // dispatch(getProjectWorkList(params));

    setStart(start);
    setEnd(end);
  };

  // console.log('start', start);

  // 프로젝트ID 별 카운트
  // [{id:100, name:스케치미디어 홈페이지, worktime:10},{id:101, name:화영 홈페이지, worktime:10}]
  const [worktime, setWorktime] = useState([]);
  // useEffect(() => {
  //   if (!wlist) return;
  //   const result = calWorkTime(wlist);
  //   // console.log('--calworktime--', result);
  //   setWorktime(result);
  // }, [wlist]);

  // 투입률 계산, menu4 클릭
  const calInputRate = async (startDate, endDate) => {
    // const startDate = '2022-01-01';
    // const endDate = '2022-05-02';
    const resultArray = [];
    const returnData = {};
    let start = 0;
    const limit = 50;
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
          console.log(`<----mp result[${i}]`, mp);
          return true;
        }
      });
      return mp;
    };

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
            mp = cal_mp(team, work_week);
            // console.log('======= 2.mp =======', mp);
          }
          returnData[work_week] = {
            ...returnData[work_week],
            [team]: { time: work_time, mp: mp },
          };
        }
      } else {
        let mp = 0;
        // 주차 & 팀 생성
        console.log('======= 1.work_week & team =======', work_week, team);
        // team 인원 계산
        if (team !== 'CG') {
          mp = cal_mp(team, work_week);
          // mp = team_mp_array[team][0].attributes.number;
          // console.log('======= 2.mp =======', mp);
        }
        returnData[work_week] = { [team]: { time: work_time, mp: mp } };
      }
    });
    // 주차별 투입가능 인원 추가 적용
    // { 22-01-3rd:{1:32, 2:20, 3:10, 4:2}, 22-01-4rd:{1:32, 2:20, 3:10, 4:2}, }->
    // { 22-01-3rd:{'DE':{time: 32, mp:3}, 'VE':{time:20, mp:3}, 'RD':{time:10, mp:2}}
    setInputRate(returnData);
    setTeamCh(team_changehistory);
    console.log('********return Data********', returnData);
  };

  const reload = () => {
    console.log('reload 버튼 클릭');
    const code_status_id = 2;
    const query = qs_projectList(code_status_id);
    dispatch(getProject(query));

    //작업통계 초기화
    const start = moment().subtract(7, 'days').format('YYYY-MM-DD');
    const end = moment().format('YYYY-MM-DD');
    setStart(start);
    setEnd(end);
  };

  const subSearchOnSubmit = async (e) => {
    console.log('***on submit***', e);
    if (e.date === undefined) return;
    if (submenu === 'inputrate') {
      const date = startEndDay(
        moment(e.date[0]).format('YYYY-MM'),
        moment(e.date[1]).format('YYYY-MM'),
      );
      const startDate = date[0];
      const endDate = date[1];
      calInputRate(startDate, endDate);
    } else if (submenu === 'menu2') {
      const start = moment(e.date[0]).format('YYYY-MM-DD');
      const end = moment(e.date[1]).format('YYYY-MM-DD');
      const query = qs_workList(start, end);
      dispatch(getWork(query));
      // const params = `works?workingDay_gte=${start}&workingDay_lte=${end}`;
      // dispatch(getProjectWorkList(params));

      setStart(start);
      setEnd(end);
    } else if (submenu === 'status') {
      // const date = startEndDay(
      //   moment(e.date[0]).format('YYYY-MM'),
      //   moment(e.date[1]).format('YYYY-MM'),
      // );
      // const startDate = date[0];
      // const endDate = date[1];
      // calInputRate(startDate, endDate);
      message.success('기능구현중...', 5);
    }
  };

  return (
    <>
      <ProjectSubButton
        handleOnClick={handleOnClick}
        reload={reload}
        submenu={submenu}
        subSearchOnSubmit={subSearchOnSubmit}
        buttonState={buttonState}
      />
      {/* {subMenu === 'menu2' ? (
        <SubWorkStatistics
          worktime={worktime}
          subWorkStatisticsOnSubmit={subWorkStatisticsOnSubmit}
          start={start}
          end={end}
        />
      ) : (
        ''
      )} */}
    </>
  );
};

export default ProjectSubContainer;
