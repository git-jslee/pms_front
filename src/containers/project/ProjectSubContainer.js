import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as api from '../../lib/api/api';
import moment from 'moment';
import { setTitle } from '../../modules/common';
import { getProject, getProjectWorkList } from '../../modules/project';
import ProjectSubMenu from '../../components/project/ProjectSubMenu';
import ProjectAdvancedSearchForm from '../../components/project/ProjectAdvancedSearchForm';
import ProjectCountForm from '../../components/project/ProjectCountForm';
import calWorkTime from '../../modules/project/calWorkTime';
import SubWorkStatistics from '../../components/project/SubWorkStatistics';

const ProjectSubContainer = () => {
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
  const [subMenu, setSubMenu] = useState('menu2');
  const subMenuSelect = (menu) => {
    // console.log('subMenuSelect 버튼 클릭', menu);
    setSubMenu(menu);
  };

  //카운터(전체, 진행중, 완료, ..)
  const [count, setCount] = useState([]);
  useEffect(() => {
    api
      .projectCount()
      .then((result) => {
        setCount(result);
        console.log('projectCount', result);
      })
      .catch((error) => {
        console.log('projectCount 실패..', error);
      });
  }, []);

  // 작업통계 정보 가져오기
  // const start = useRef(moment().subtract(7, 'days').format('YYYY-MM-DD'));
  const [start, setStart] = useState(
    moment().subtract(7, 'days').format('YYYY-MM-DD'),
  );
  const [end, setEnd] = useState(moment().format('YYYY-MM-DD'));
  useEffect(() => {
    const params = `works?workingDay_gte=${start}&workingDay_lte=${end}`;
    dispatch(getProjectWorkList(params));
  }, [start, end]);

  const subWorkStatisticsOnSubmit = (e) => {
    console.log('subWorkStatisticsOnSubmit', e);
    const start = moment(e.date[0]).format('YYYY-MM-DD');
    const end = moment(e.date[1]).format('YYYY-MM-DD');
    // const params = `works?workingDay_gte=${start}&workingDay_lte=${end}`;
    // dispatch(getProjectWorkList(params));
    setStart(start);
    setEnd(end);
  };

  console.log('start', start);

  // 프로젝트ID 별 카운트
  // [{id:100, name:스케치미디어 홈페이지, worktime:10},{id:101, name:화영 홈페이지, worktime:10}]
  const [worktime, setWorktime] = useState([]);
  useEffect(() => {
    if (!wlist) return;
    const result = calWorkTime(wlist);
    // console.log('--calworktime--', result);
    setWorktime(result);
  }, [wlist]);

  const subMenuForm = () => {
    if (subMenu === 'menu1') {
      return <ProjectCountForm count={count} />;
    } else if (subMenu === 'menu2') {
      return (
        <SubWorkStatistics
          worktime={worktime}
          subWorkStatisticsOnSubmit={subWorkStatisticsOnSubmit}
          start={start}
          end={end}
        />
      );
    } else if (subMenu === 'menu3') {
      return <ProjectAdvancedSearchForm />;
    } else {
      <h1>...</h1>;
    }
  };

  const reload = () => {
    console.log('reload 버튼 클릭');
    const params = 'projects?code_status.id=2';
    dispatch(getProject(params));
    //작업통계 초기화
    const start = moment().subtract(7, 'days').format('YYYY-MM-DD');
    const end = moment().format('YYYY-MM-DD');
    setStart(start);
    setEnd(end);
  };

  return (
    <>
      <ProjectSubMenu subMenuSelect={subMenuSelect} reload={reload} />
      <hr />
      {subMenuForm()}
    </>
  );
};

export default ProjectSubContainer;
