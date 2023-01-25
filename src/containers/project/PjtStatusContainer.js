import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as api from '../../lib/api/api';
import moment from 'moment';
import {
  getProjectList,
  changeProjectStatus,
  changeProjectProgress,
  initProjectStorage,
} from '../../modules/project';

import ProjectCountForm2 from '../../components/project/ProjectCountForm2';
import { qs_projectCount } from '../../lib/api/query';
import { qs_projectList } from '../../lib/api/queryProject';
import { message } from 'antd';
import pjtQsFilter from '../../modules/project/pjtQsFilter';

const PjtStatusContainer = ({ setMode }) => {
  const dispatch = useDispatch();
  // const [qsFilter, setQsFilter] = useState([{}]);
  const [filterContract, setFilterContract] = useState([{ price: { $ne: 0 } }]);
  const [filterTeam, setFilterTeam] = useState([{}]);
  const [pjtFilter, setPjtFilter] = useState([{ price: { $ne: 0 } }]);

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

  //카운터(전체, 진행중, 완료, ..)
  //request(`/api/articles?${query}`);
  const [count, setCount] = useState([]);

  useEffect(() => {
    const query = [];
    for (let i = 1; i <= 6; i++) {
      query.push(qs_projectCount(i, pjtFilter));
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
  }, [pjtFilter]);

  // qs filter 설정
  const [selectedBt, setSelectedBt] = useState(['bt1', 'bt0', 'bt0']);
  const qs_filter = (value) => {
    const code_status_id = 2;
    const query = qs_projectList(code_status_id, pjtFilter);
    const getFilter = pjtQsFilter(
      selectedBt,
      filterContract,
      filterTeam,
      value,
    );
    if (getFilter === undefined) return;
    else {
      if (getFilter.newFilterContract === null) {
        console.log('>>>>>getFilter-team>>>>>', getFilter);
        setSelectedBt(getFilter.newBtn);
        setFilterTeam(getFilter.newFilterTeam);
        setPjtFilter(getFilter.newPjtFilter);
      } else if (getFilter.newFilterTeam === null) {
        console.log('>>>>>getFilter-conract>>>>>', getFilter);
        setSelectedBt(getFilter.newBtn);
        setFilterContract(getFilter.newFilterContract);
        setPjtFilter(getFilter.newPjtFilter);
      }
      // setQsFilter(filter);
      // 리덕스 프로젝트 초기화..
      // dispatch(initProjectStorage());
      // dispatch(getProjectList(query, code_status_id));
    }
  };
  const qs_filter_222 = (value) => {
    const code_status_id = 2;
    const query = qs_projectList(code_status_id, pjtFilter);
    if (value === '매출-전체') {
      if (selectedBt[0] === 'bt0') return;
      setSelectedBt(['bt0', selectedBt[1], selectedBt[2]]);
      setFilterContract([{}]);
      setPjtFilter([...filterTeam]);
      // setQsFilter([{}]);
      // 리덕스 프로젝트 초기화..
      // dispatch(initProjectStorage());
      // dispatch(getProjectList(query, code_status_id));
    } else if (value === '매출') {
      if (selectedBt[0] === 'bt1') return;
      const filter = [{ price: { $ne: 0 } }];
      setSelectedBt(['bt1', selectedBt[1], 'bt0']);
      setFilterContract(filter);
      setPjtFilter([...filterTeam, ...filter]);
      // setQsFilter(filter);
      // 리덕스 프로젝트 초기화..
      // dispatch(initProjectStorage());
      // dispatch(getProjectList(query, code_status_id));
    } else if (value === '비매출') {
      if (selectedBt[0] === 'bt2') return;
      const filter = [{ price: { $eq: 0 } }];
      setSelectedBt(['bt2', selectedBt[1], 'bt0']);
      setFilterContract(filter);
      setPjtFilter([...filterTeam, ...filter]);
      // setQsFilter(filter);
      // 리덕스 프로젝트 초기화..
      // dispatch(initProjectStorage());
      // dispatch(getProjectList(query, code_status_id));
    } else if (value === '계약-전체') {
      if (selectedBt[2] === 'bt0') return;
      const filter = [{ price: { $ne: 0 } }];
      setSelectedBt(['bt1', selectedBt[1], 'bt0']);
      setFilterContract(filter);
      setPjtFilter([...filterTeam, ...filter]);
      // setQsFilter(filter);
      // 리덕스 프로젝트 초기화..
      // dispatch(initProjectStorage());
      // dispatch(getProjectList(query, code_status_id));
    } else if (value === '계약') {
      if (selectedBt[2] === 'bt1') return;
      const filter = [{ price: { $ne: 0 } }, { contracted: { $eq: true } }];
      setSelectedBt(['bt1', selectedBt[1], 'bt1']);
      setFilterContract(filter);
      setPjtFilter([...filterTeam, ...filter]);
      // setQsFilter(filter);
      // 리덕스 프로젝트 초기화..
      // dispatch(initProjectStorage());
      // dispatch(getProjectList(query, code_status_id));
    } else if (value === '예정') {
      if (selectedBt[2] === 'bt2') return;
      const filter = [{ price: { $ne: 0 } }, { contracted: { $eq: false } }];
      setSelectedBt(['bt1', selectedBt[1], 'bt2']);
      setFilterContract(filter);
      setPjtFilter([...filterTeam, ...filter]);
      // setQsFilter(filter);
      // 리덕스 프로젝트 초기화..
      // dispatch(initProjectStorage());
      // dispatch(getProjectList(query, code_status_id));
    } else if (value === '사업-전체') {
      if (selectedBt[1] === 'bt0') return;
      // const filter = [{}];
      setSelectedBt([selectedBt[0], 'bt0', selectedBt[2]]);
      setFilterTeam([{}]);
      setPjtFilter([...filterContract]);
      // setQsFilter(filter);
      // 리덕스 프로젝트 초기화..
      // dispatch(initProjectStorage());
      // dispatch(getProjectList(query, code_status_id));
    } else if (value === '디자인') {
      if (selectedBt[1] === 'bt1') return;
      const filter = [{ scode_team: { id: { $eq: 1 } } }];
      setSelectedBt([selectedBt[0], 'bt1', selectedBt[2]]);
      setFilterTeam(filter);
      setPjtFilter([...filterContract, ...filter]);
      // setQsFilter(filter);
      // 리덕스 프로젝트 초기화..
      // dispatch(initProjectStorage());
      // dispatch(getProjectList(query, code_status_id));
    } else if (value === '영상') {
      if (selectedBt[1] === 'bt2') return;
      const filter = [{ scode_team: { id: { $eq: 5 } } }];
      setSelectedBt([selectedBt[0], 'bt2', selectedBt[2]]);
      setFilterTeam(filter);
      setPjtFilter([...filterContract, ...filter]);
      // setQsFilter(filter);
      // 리덕스 프로젝트 초기화..
      // dispatch(initProjectStorage());
      // dispatch(getProjectList(query, code_status_id));
    } else if (value === 'ICT') {
      if (selectedBt[1] === 'bt3') return;
      const filter = [{ scode_team: { id: { $eq: 2 } } }];
      setSelectedBt([selectedBt[0], 'bt3', selectedBt[2]]);
      setFilterTeam(filter);
      setPjtFilter([...filterContract, ...filter]);
      // setQsFilter(filter);
      // 리덕스 프로젝트 초기화..
      // dispatch(initProjectStorage());
      // dispatch(getProjectList(query, code_status_id));
    } else if (value === 'R&D') {
      if (selectedBt[1] === 'bt4') return;
      const filter = [{ scode_team: { id: { $eq: 6 } } }];
      setSelectedBt([selectedBt[0], 'bt4', selectedBt[2]]);
      setFilterTeam(filter);
      setPjtFilter([...filterContract, ...filter]);
      // setQsFilter(filter);
      // 리덕스 프로젝트 초기화..
      // dispatch(initProjectStorage());
      // dispatch(getProjectList(query, code_status_id));
    } else {
      message.success('기능 구현 예정...', 3);
    }
    //
    // setQsFilter(filter);
    // 리덕스 프로젝트 초기화..
    dispatch(initProjectStorage());
    dispatch(getProjectList(query, code_status_id));
  };

  const countFormOnclick = (code_status_id) => {
    console.log('count Form OnClick - ', code_status_id);
    // store 저장 안된 데이터만 api 호출하게 변경
    // 저장되어 있을경우 project.mode 값만 변경
    if (code_status_id in getState) {
      dispatch(changeProjectStatus({id:code_status_id, progress: null}));
    } else {
      const query = qs_projectList(code_status_id, pjtFilter);
      // dispatch(getProject(query));
      dispatch(getProjectList(query, code_status_id));
    }
  };

  const progressButtonOnclick = (value) => {
    const code_status_id = 2;
    dispatch(changeProjectStatus({id:2, progress: value}));
  };

  return (
    <>
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
  );
};

export default PjtStatusContainer;
