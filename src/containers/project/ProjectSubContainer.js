import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as api from '../../lib/api/api';
import moment from 'moment';
import { setTitle } from '../../modules/common';
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
import ProjectCountForm from '../../components/project/ProjectCountForm';
import ProjectCountForm2 from '../../components/project/ProjectCountForm2';
import ProjectCountForm1 from '../../components/project/ProjectCountForm1';
import calWorkTime from '../../modules/project/calWorkTime';
import SubWorkStatistics from '../../components/project/SubWorkStatistics';
import ProjectInputRate from '../../components/project/ProjectInputRate';
import {
  qs_projectCount,
  qs_workList,
  qs_workingTime,
} from '../../lib/api/query';
import { qs_projectList } from '../../lib/api/queryProject';
import startEndDay from '../../modules/common/startEndDay';
import { message, Divider } from 'antd';

const ProjectSubContainer = ({ setMode }) => {
  const dispatch = useDispatch();
  // const [qsFilter, setQsFilter] = useState([{}]);
  const [filter1, setFilter1] = useState([{ price: { $ne: 0 } }]);
  const [filter2, setFilter2] = useState([{}]);
  const [sumFilter, setSumFilter] = useState([{ price: { $ne: 0 } }]);
  // const { wlist } = useSelector(({ project }) => ({
  //   wlist: project.wlist,
  // }));
  // sub button 상태
  const [buttonState, setButtonState] = useState('btn1');

  // 프로젝트 리스트, 진행률 정보 가져오기..
  const [progressCount, setProgressCount] = useState({
    _10: 0,
    _25: 0,
    _50: 0,
    _75: 0,
    _90: 0,
  });
  const { lists, getState, backlog } = useSelector(({ project }) => ({
    lists: project.data ? project.data[2] : null,
    getState: project.getdata,
    backlog: project.backlog,
  }));

  useEffect(() => {
    if (!lists) return;
    let _10 = 0;
    let _25 = 0;
    let _50 = 0;
    let _75 = 0;
    let _90 = 0;
    lists.map((v) => {
      const progress = v.progressRate;
      if (progress === 10) {
        _10 += 1;
      } else if (progress === 25) {
        _25 += 1;
      } else if (progress === 50) {
        _50 += 1;
      } else if (progress === 75) {
        _75 += 1;
      } else if (progress === 90) {
        _90 += 1;
      }
    });
    setProgressCount({ _10, _25, _50, _75, _90 });
    // console.log('>>>>>>>>>>>>progressCount', progressCount);
  }, [lists]);

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

  // sub메뉴 버튼 클릭시 동작 구현
  const [subMenu, setSubMenu] = useState('menu1');

  const handleOnClick = (menu) => {
    console.log('subMenuSelect 버튼 클릭', menu);
    if (menu === 'add') {
      setMode(menu);
      return;
    }
    //
    setSubMenu(menu);
    if (menu === 'menu4') {
      const date = startEndDay(
        moment().subtract(4, 'months').format('YYYY-MM'),
        moment().format('YYYY-MM'),
      );
      const startDate = date[0];
      const endDate = date[1];
      calInputRate(startDate, endDate);
    }
  };

  //카운터(전체, 진행중, 완료, ..)
  //request(`/api/articles?${query}`);
  const [count, setCount] = useState([]);
  const [inputRate, setInputRate] = useState();

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
  }, [sumFilter]);

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
  }, [sumFilter]);

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

  // qs filter 설정
  const [selectedBt, setSelectedBt] = useState(['bt1', 'bt0', 'bt0']);
  const qs_filter = (value) => {
    const code_status_id = 2;
    const query = qs_projectList(code_status_id, sumFilter);
    if (value === '매출-전체') {
      if (selectedBt[0] === 'bt0') return;
      setSelectedBt(['bt0', selectedBt[1], selectedBt[2]]);
      setFilter1([{}]);
      setSumFilter([...filter2]);
      // setQsFilter([{}]);
      // 리덕스 프로젝트 초기화..
      dispatch(initProjectStorage());
      dispatch(getProjectList(query, code_status_id));
    } else if (value === '매출') {
      if (selectedBt[0] === 'bt1') return;
      const filter = [{ price: { $ne: 0 } }];
      setSelectedBt(['bt1', selectedBt[1], 'bt0']);
      setFilter1(filter);
      setSumFilter([...filter2, ...filter]);
      // setQsFilter(filter);
      // 리덕스 프로젝트 초기화..
      dispatch(initProjectStorage());
      dispatch(getProjectList(query, code_status_id));
    } else if (value === '비매출') {
      if (selectedBt[0] === 'bt2') return;
      const filter = [{ price: { $eq: 0 } }];
      setSelectedBt(['bt2', selectedBt[1], 'bt0']);
      setFilter1(filter);
      setSumFilter([...filter2, ...filter]);
      // setQsFilter(filter);
      // 리덕스 프로젝트 초기화..
      dispatch(initProjectStorage());
      dispatch(getProjectList(query, code_status_id));
    } else if (value === '계약-전체') {
      if (selectedBt[2] === 'bt0') return;
      const filter = [{ price: { $ne: 0 } }];
      setSelectedBt(['bt1', selectedBt[1], 'bt0']);
      setFilter1(filter);
      setSumFilter([...filter2, ...filter]);
      // setQsFilter(filter);
      // 리덕스 프로젝트 초기화..
      dispatch(initProjectStorage());
      dispatch(getProjectList(query, code_status_id));
    } else if (value === '계약') {
      if (selectedBt[2] === 'bt1') return;
      const filter = [{ price: { $ne: 0 } }, { contracted: { $eq: true } }];
      setSelectedBt(['bt1', selectedBt[1], 'bt1']);
      setFilter1(filter);
      setSumFilter([...filter2, ...filter]);
      // setQsFilter(filter);
      // 리덕스 프로젝트 초기화..
      dispatch(initProjectStorage());
      dispatch(getProjectList(query, code_status_id));
    } else if (value === '예정') {
      if (selectedBt[2] === 'bt2') return;
      const filter = [{ price: { $ne: 0 } }, { contracted: { $eq: false } }];
      setSelectedBt(['bt1', selectedBt[1], 'bt2']);
      setFilter1(filter);
      setSumFilter([...filter2, ...filter]);
      // setQsFilter(filter);
      // 리덕스 프로젝트 초기화..
      dispatch(initProjectStorage());
      dispatch(getProjectList(query, code_status_id));
    } else if (value === '사업-전체') {
      if (selectedBt[1] === 'bt0') return;
      // const filter = [{}];
      setSelectedBt([selectedBt[0], 'bt0', selectedBt[2]]);
      setFilter2([{}]);
      setSumFilter([...filter1]);
      // setQsFilter(filter);
      // 리덕스 프로젝트 초기화..
      dispatch(initProjectStorage());
      dispatch(getProjectList(query, code_status_id));
    } else if (value === '디자인') {
      if (selectedBt[1] === 'bt1') return;
      const filter = [{ scode_team: { id: { $eq: 1 } } }];
      setSelectedBt([selectedBt[0], 'bt1', selectedBt[2]]);
      setFilter2(filter);
      setSumFilter([...filter1, ...filter]);
      // setQsFilter(filter);
      // 리덕스 프로젝트 초기화..
      dispatch(initProjectStorage());
      dispatch(getProjectList(query, code_status_id));
    } else if (value === '영상') {
      if (selectedBt[1] === 'bt2') return;
      const filter = [{ scode_team: { id: { $eq: 5 } } }];
      setSelectedBt([selectedBt[0], 'bt2', selectedBt[2]]);
      setFilter2(filter);
      setSumFilter([...filter1, ...filter]);
      // setQsFilter(filter);
      // 리덕스 프로젝트 초기화..
      dispatch(initProjectStorage());
      dispatch(getProjectList(query, code_status_id));
    } else if (value === 'ICT') {
      if (selectedBt[1] === 'bt3') return;
      const filter = [{ scode_team: { id: { $eq: 2 } } }];
      setSelectedBt([selectedBt[0], 'bt3', selectedBt[2]]);
      setFilter2(filter);
      setSumFilter([...filter1, ...filter]);
      // setQsFilter(filter);
      // 리덕스 프로젝트 초기화..
      dispatch(initProjectStorage());
      dispatch(getProjectList(query, code_status_id));
    } else if (value === 'R&D') {
      if (selectedBt[1] === 'bt4') return;
      const filter = [{ scode_team: { id: { $eq: 6 } } }];
      setSelectedBt([selectedBt[0], 'bt4', selectedBt[2]]);
      setFilter2(filter);
      setSumFilter([...filter1, ...filter]);
      // setQsFilter(filter);
      // 리덕스 프로젝트 초기화..
      dispatch(initProjectStorage());
      dispatch(getProjectList(query, code_status_id));
    } else {
      message.success('기능 구현 예정...', 3);
    }
  };

  console.log('>>>>>>>>>>>>qs_filter>>>>>>>>>>>', sumFilter);

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
    console.log('********resultArray********', resultArray);
    const newArray = resultArray.map((list) => {
      const work_week = moment(list.attributes.working_day).format('YY-wo');
      const work_time = list.attributes.working_time;

      // const team = list.attributes.code_pj_team.data.id;
      const team = list.attributes.code_pj_team.data.attributes.abbr;
      // console.log('****week****', work_week);
      //{ 22-01-3rd:{1:32, 2:20, 3:10, 4:2}, 22-01-4rd:{1:32, 2:20, 3:10, 4:2}, }

      if (Object.keys(returnData).includes(work_week)) {
        // console.log('======= return Data =======', returnData[work_week]);
        // console.log('======= return Data =======', returnData[work_week][team]);
        if (returnData[work_week][team]['time'] >= 1) {
          // team 에 해당하는 키 있을때
          console.log(
            '11&&&&&',
            returnData[work_week][team]['time'] + work_time,
          );
          returnData[work_week] = {
            ...returnData[work_week],
            [team]: {
              time: returnData[work_week][team]['time'] + work_time,
              mp: 99,
            },
          };
        } else {
          // team 에 해당하는 키 없을때
          console.log('22&&&&&', work_time);
          returnData[work_week] = {
            ...returnData[work_week],
            [team]: { time: work_time, mp: 99 },
          };
        }
      } else {
        returnData[work_week] = { [team]: { time: work_time, mp: 99 } };
      }
    });
    // 주차별 투입가능 이원 추가 적용
    // { 22-01-3rd:{1:32, 2:20, 3:10, 4:2}, 22-01-4rd:{1:32, 2:20, 3:10, 4:2}, }->
    // { 22-01-3rd:{'DE':{time: 32, mp:3}, 'VE':{time:20, mp:3}, 'RD':{time:10, mp:2}}
    setInputRate(returnData);
    console.log('********return Data********', returnData);
  };

  const countFormOnclick = (code_status_id) => {
    console.log('count Form OnClick - ', code_status_id);
    // store 저장 안된 데이터만 api 호출하게 변경
    // 저장되어 있을경우 project.mode 값만 변경
    if (code_status_id in getState) {
      dispatch(changeProjectStatus(code_status_id));
    } else {
      const query = qs_projectList(code_status_id, sumFilter);
      // dispatch(getProject(query));
      dispatch(getProjectList(query, code_status_id));
    }
  };

  const progressButtonOnclick = (value) => {
    const code_status_id = 2;
    dispatch(changeProjectProgress(value));
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
    if (subMenu === 'menu4') {
      const date = startEndDay(
        moment(e.date[0]).format('YYYY-MM'),
        moment(e.date[1]).format('YYYY-MM'),
      );
      const startDate = date[0];
      const endDate = date[1];
      calInputRate(startDate, endDate);
    } else if (subMenu === 'menu2') {
      const start = moment(e.date[0]).format('YYYY-MM-DD');
      const end = moment(e.date[1]).format('YYYY-MM-DD');
      const query = qs_workList(start, end);
      dispatch(getWork(query));
      // const params = `works?workingDay_gte=${start}&workingDay_lte=${end}`;
      // dispatch(getProjectWorkList(params));

      setStart(start);
      setEnd(end);
    } else if (subMenu === 'menu1') {
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
        subMenu={subMenu}
        subSearchOnSubmit={subSearchOnSubmit}
        buttonState={buttonState}
      />
      {subMenu === 'menu1' ? (
        <>
          {/* <ProjectCountForm count={count} countFormOnclick={countFormOnclick} /> */}
          {/* <Divider /> */}
          <ProjectCountForm2
            count={count}
            backlog={backlog}
            progressCount={progressCount}
            countFormOnclick={countFormOnclick}
            progressButtonOnclick={progressButtonOnclick}
            qs_filter={qs_filter}
            selectedBt={selectedBt}
          />
        </>
      ) : (
        ''
      )}
      {subMenu === 'menu2' ? (
        <SubWorkStatistics
          worktime={worktime}
          subWorkStatisticsOnSubmit={subWorkStatisticsOnSubmit}
          start={start}
          end={end}
        />
      ) : (
        ''
      )}
      {subMenu === 'menu3' ? <ProjectAdvancedSearchForm /> : ''}
      {subMenu === 'menu4' ? <ProjectInputRate inputRate={inputRate} /> : ''}
    </>
  );
};

export default ProjectSubContainer;
