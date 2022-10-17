import React, { useState, useEffect } from 'react';

import ProjectInputRate from '../../components/project/ProjectInputRate';
import calInputRate from '../../modules/project/calInputRate';

const PjtInputrateContainer = () => {
  // const [qsFilter, setQsFilter] = useState([{}]);
  // const [filter1, setFilter1] = useState([{ price: { $ne: 0 } }]);
  // const [filter2, setFilter2] = useState([{}]);
  // const [sumFilter, setSumFilter] = useState([{ price: { $ne: 0 } }]);

  // const { lists, getState, backlog } = useSelector(({ project }) => ({
  //   lists: project.data ? project.data[2] : null,
  //   getState: project.getdata,
  //   backlog: project.backlog,
  // }));

  const [inputRate, setInputRate] = useState({
    inputRate: '',
    teamHistory: '',
  });

  const promise_inputRate = async () => {
    const test = await calInputRate();
    setInputRate(test);
  };

  useEffect(() => {
    promise_inputRate();
  }, []);
  console.log('>>>>>inputrate test>>>>>', inputRate);

  //카운터(전체, 진행중, 완료, ..)
  //request(`/api/articles?${query}`);
  // const [count, setCount] = useState([]);
  // const [teamCh, setTeamCh] = useState();

  // useEffect(() => {
  //   const query = [];
  //   for (let i = 1; i <= 6; i++) {
  //     query.push(qs_projectCount(i, sumFilter));
  //   }
  //   console.log('**query**', query);
  //   api
  //     .getCountProject('api/projects', query)
  //     .then((result) => {
  //       console.log('getQueryResult', result);
  //       const projectCount = result.map((v, index) => {
  //         return {
  //           id: index + 1,
  //           count: v.data.meta.pagination.total,
  //         };
  //       });
  //       setCount(projectCount);
  //     })
  //     .catch((error) => {
  //       console.log('error', error);
  //     });
  // }, [sumFilter]);

  // 프로젝트 리스트 가져오기
  // useEffect(() => {
  //   // const params = 'projects?code_status.id=2';
  //   // 1-시작전, 2-진행중, 3-보류, 4-완료, 5-대기, 6-검수
  //   const code_status_id = 2;
  //   const query = qs_projectList(code_status_id, sumFilter);
  //   ////
  //   // dispatch(getProject(query));
  //   dispatch(getProjectList(query, code_status_id));
  //   // calTotalWorkTime();
  // }, [sumFilter]);

  // 작업통계 정보 가져오기
  // const start = useRef(moment().subtract(7, 'days').format('YYYY-MM-DD'));
  // const [start, setStart] = useState(
  //   moment().subtract(7, 'days').format('YYYY-MM-DD'),
  // );
  // const [end, setEnd] = useState(moment().format('YYYY-MM-DD'));
  // useEffect(() => {
  //   const query = qs_workList(start, end);
  //   dispatch(getWork(query));
  //   // const params = `works?workingDay_gte=${start}&workingDay_lte=${end}`;
  //   // dispatch(getProjectWorkList(params));
  // }, [start, end]);

  return (
    <>
      {/* <ProjectInputRate inputRate={inputRate} teamHistory={teamCh} /> */}
      <ProjectInputRate
        inputRate={inputRate.inputRate}
        teamHistory={inputRate.teamHistory}
      />
    </>
  );
};

export default PjtInputrateContainer;
