import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as api from '../../lib/api/api';
import moment from 'moment';
import { setTitle } from '../../modules/common';
import { getProject, getWork, getProjectWorkList } from '../../modules/project';
import ProjectSubButton from '../../components/project/ProjectSubButton';
import ProjectAdvancedSearchForm from '../../components/project/ProjectAdvancedSearchForm';
import ProjectCountForm from '../../components/project/ProjectCountForm';
import calWorkTime from '../../modules/project/calWorkTime';
import SubWorkStatistics from '../../components/project/SubWorkStatistics';
import ProjectInputRate from '../../components/project/ProjectInputRate';
import {
  qs_projectCount,
  qs_projectList,
  qs_workList,
  qs_workingTime,
} from '../../lib/api/query';
import startEndDay from '../../modules/common/startEndDay';

const ProjectSubContainer = ({ setMode }) => {
  const dispatch = useDispatch();
  const { wlist } = useSelector(({ project }) => ({
    wlist: project.wlist,
  }));

  // title 업데이트
  useEffect(() => {
    dispatch(setTitle('프로젝트 관리'));
    return () => {
      dispatch(setTitle(null));
    };
  }, [dispatch]);

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
    for (let i = 1; i <= 5; i++) {
      query.push(qs_projectCount(i));
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
  useEffect(() => {
    if (!wlist) return;
    const result = calWorkTime(wlist);
    // console.log('--calworktime--', result);
    setWorktime(result);
  }, [wlist]);

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

      const team = list.attributes.code_pj_team.data.id;
      // console.log('****week****', work_week);
      //{ 22-01-3rd:{1:32, 2:20, 3:10, 4:2}, 22-01-4rd:{1:32, 2:20, 3:10, 4:2}, }

      if (Object.keys(returnData).includes(work_week)) {
        // console.log('======= return Data =======', returnData[work_week]);
        // console.log('======= return Data =======', returnData[work_week][team]);
        if (returnData[work_week][team] >= 1) {
          // team 에 해당하는 키 있을때
          returnData[work_week] = {
            ...returnData[work_week],
            [team]: returnData[work_week][team] + work_time,
          };
        } else {
          // team 에 해당하는 키 없을때
          returnData[work_week] = {
            ...returnData[work_week],
            [team]: work_time,
          };
        }
      } else {
        returnData[work_week] = { [team]: work_time };
      }
    });
    setInputRate(returnData);
    console.log('********return Data********', returnData);
  };

  const countFormOnclick = (code_status_id) => {
    console.log('count Form OnClick - ', code_status_id);
    const query = qs_projectList(code_status_id);
    dispatch(getProject(query));
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
    }
  };

  return (
    <>
      <ProjectSubButton
        handleOnClick={handleOnClick}
        reload={reload}
        subMenu={subMenu}
        subSearchOnSubmit={subSearchOnSubmit}
      />
      {subMenu === 'menu1' ? (
        <ProjectCountForm count={count} countFormOnclick={countFormOnclick} />
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
