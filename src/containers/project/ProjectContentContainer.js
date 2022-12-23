import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { message } from 'antd';
// module
import * as api from '../../lib/api/api';
import { tbl_update, tbl_insert } from '../../modules/common/tbl_crud';
import calInputRate from '../../modules/project/calInputRate';
import pjtQsFilter from '../../modules/project/pjtQsFilter';
import { qs_projectCount } from '../../lib/api/query';
import { qs_projectList } from '../../lib/api/queryProject';
import {
  getProjectList,
  changeProjectStatus,
  changeProjectProgress,
  initProjectStorage,
  updateBacklog,
} from '../../modules/project';

//component
import ProjectInputRateChart from '../../components/project/ProjectInputrateChart';
import ProjectStatusForm from '../../components/project/ProjectStatusForm';
import ProjectListTable from '../../components/project/ProjectListTable';
import ProjectEditForm from '../../components/project/ProjectEditForm';
import ProjectDetailContainer from './ProjectDetailContainer';
//임시
import PjtStatusContainer from './PjtStatusContainer';
import { changeSubMenu } from '../../modules/common';
import calRiskLevel from '../../modules/project/calRiskLevel';

const ProjectContentContainer = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector(({ auth }) => ({
    auth: auth.auth,
  }));
  const { submenu } = useSelector(({ common }) => ({
    submenu: common.submenu,
  }));

  //
  // <-- 프로젝트 현황
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
  const { project_status } = useSelector(({ project }) => ({
    project_status:
      project.status.id === null ? { id: 2, progress: null } : project.status,
  }));

  const { lists, getState, backlog } = useSelector(({ project }) => ({
    // lists: project.data ? project.data[2] : null,
    lists: project.data ? project.data[project_status.id] : null,
    getState: project.getdata,
    backlog: project.backlog,
  }));

  const { error, loading } = useSelector(({ project, loading }) => ({
    // lists: project.list,
    // pjtlists: project.data !== null ? project.data[project_status.id] : null,
    error: project.error,
    loading: loading['project/GET_PROJECTLIST'],
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
    const getFilter = pjtQsFilter(
      selectedBt,
      filterContract,
      filterTeam,
      value,
    );
    if (getFilter === undefined) return;
    if (getFilter.newFilterContract === null)
      setFilterTeam(getFilter.newFilterTeam);
    if (getFilter.newFilterTeam === null) {
      setFilterContract(getFilter.newFilterContract);
    }
    setSelectedBt(getFilter.newBtn);
    setPjtFilter(getFilter.newPjtFilter);
    const query = qs_projectList(code_status_id, getFilter.newPjtFilter);
    // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>query>>>>>', query);
    dispatch(initProjectStorage());
    dispatch(getProjectList(query, code_status_id));
  };
  //   else {
  //     if (getFilter.newFilterContract === null) {
  //       console.log('>>>>>getFilter-team>>>>>', getFilter);
  //       setSelectedBt(getFilter.newBtn);
  //       setFilterTeam(getFilter.newFilterTeam);
  //       setPjtFilter(getFilter.newPjtFilter);
  //     } else if (getFilter.newFilterTeam === null) {
  //       console.log('>>>>>getFilter-contract>>>>>', getFilter);
  //       setSelectedBt(getFilter.newBtn);
  //       setFilterContract(getFilter.newFilterContract);
  //       setPjtFilter(getFilter.newPjtFilter);
  //     }
  //     // setQsFilter(filter);
  //     // 리덕스 프로젝트 초기화..
  //     console.log(
  //       '>>>>>PJTFILTER, code_status_id>>>>>',
  //       pjtFilter,
  //       code_status_id,
  //     );
  //     console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>query>>>>>', query);
  //     dispatch(initProjectStorage());
  //     dispatch(getProjectList(query, code_status_id));
  //   }
  // };

  const countFormOnclick = (code_status_id) => {
    console.log('count Form OnClick - ', code_status_id);
    // store 저장 안된 데이터만 api 호출하게 변경
    // 저장되어 있을경우 project.mode 값만 변경
    if (code_status_id in getState) {
      dispatch(changeProjectStatus(code_status_id));
    } else {
      const query = qs_projectList(code_status_id, pjtFilter);
      // dispatch(getProject(query));
      dispatch(getProjectList(query, code_status_id));
    }
  };

  const progressButtonOnclick = (value) => {
    const code_status_id = 2;
    dispatch(changeProjectProgress(value));
  };

  // 프로젝트 현황 -->

  // <-- 프로젝트 투입률 차트
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
    return () => {
      setPjtid({ pid: null, arrno: null });
      dispatch(changeSubMenu('status'));
    };
  }, []);
  // 프로젝트 투입률 차트 -->

  // <-- 프로젝트 리스트
  const [visibleIssue, setVisibleIssue] = useState(false);
  const [record, setRecord] = useState();
  const [codestatus, setCodestatus] = useState();
  const [visible, setVisible] = useState(false);
  const [pjtid, setPjtid] = useState({ pid: null, arrno: null });

  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    const baseprice = 500000; //기준금액
    let backlog = 0;
    if (lists) {
      const tableList = lists.map((list, index) => {
        // const _progress = list.project_progress;
        // if (project_status.progress === 10 && _progress >= 0.2) return;
        const elapsed = moment().diff(moment(list.startdate), 'days');
        const elapsed_last = moment().diff(
          moment(list.attributes.last_workupdate),
          'days',
        );
        // const _totalworktime = totalWorkTime.filter((v) => v.id === list.id)[0];
        // console.log('**worktime**', index, _totalworktime);
        const remaining_day =
          Math.round((list.total_plan - list.total_work) * 10) / 10;
        backlog += remaining_day > 0 ? remaining_day : 0;
        // const _base_day =
        //   list.attributes.price !== 0
        //     ? (list.attributes.price / baseprice).toFixed(0)
        //     : 0;
        // const _over_day =
        //   _base_day === 0
        //     ? '-'
        //     : _base_day - list.total_plan >= 0
        //     ? '-'
        //     : (list.total_plan - _base_day).toFixed(0);
        // issue 기능 추가 22.9.25
        const issue_cnt = list.attributes.pjt_issues.data.length;
        const issue = issue_cnt !== 0 ? list.attributes.pjt_issues.data : '';

        // risk 기능 추가 22.10.30
        const risk_cnt = calRiskLevel({ issue, list });
        const risk_cnt_total = risk_cnt.issue + risk_cnt.plan + risk_cnt.progress;
        console.log('6666666666666666666>>>>>>>>issue>>>>>>>', risk_cnt);

        //
        const array = {
          key: list.id,
          id: list.id,
          arr_no: index,
          contracted:
            list.attributes.contracted === null ||
            list.attributes.contracted === false
              ? 'No'
              : 'Yes',
          customer: list.attributes.customer.data.attributes.name,
          name: list.attributes.name,
          service: list.attributes.code_service.data.attributes.name,
          team:
            list.attributes.scode_team.data === null
              ? ''
              : list.attributes.scode_team.data.attributes.name,
          code_status: list.attributes.code_status.data.attributes.name,
          plan_startdate: moment(list.attributes.plan_startdate).format(
            'YY-MM-DD',
          ),
          plan_enddate: moment(list.attributes.plan_enddate).format('YY-MM-DD'),
          startdate: `${moment(list.startdate).format('YY-MM-DD')}`,
          // startdate: list.startdate,
          enddate: list.attributes.enddate,
          price: list.attributes.price.toLocaleString('ko-KR'),
          lastUpdate: moment(list.attributes.last_workupdate).format(
            'YY-MM-DD',
          ),
          project_progress: list.project_progress,
          progressRate: list.progressRate,
          elapsed: elapsed,
          elapsed_last: elapsed_last,
          // total_plan: list.total_plan.toFixed(0),
          total_plan: list.total_plan ? list.total_plan.toFixed(0) : '-',
          total_work: list.total_work,
          // base_day: _base_day === 0 ? '-' : _base_day,
          // over_day: _over_day,
          remaining_day: remaining_day > 0 ? remaining_day : 0,
          // totalday:
          //   _totalworktime !== undefined
          //     ? Math.round(_totalworktime.worktime / 8)
          //     : '',
          // action: 'View',
          issue_cnt: issue_cnt === 0 ? '' : issue_cnt,
          issue: issue,
          risk: risk_cnt_total,
        };
        return array;
      });
      // 수주잔량
      if (project_status.id === 2) {
        dispatch(updateBacklog(Math.round(backlog)));
      }
      if (!project_status.progress) {
        tableList.sort((a, b) => b.risk - a.risk);
        setTableData(tableList);
      } else if (project_status.id === 2 && project_status.progress) {
        const filterlist = tableList.filter((v) => {
          // console.log('**progressRate**', v);
          // console.log('**project_status.progress**', project_status.progress);
          return v.progressRate === project_status.progress;
        });
        // console.log('>>>>>>>>>>>>>>>>filterlist', filterlist);
        filterlist.sort((a, b) => b.risk - a.risk);
        setTableData(filterlist);
      }
    }
  }, [lists, project_status]);

  // 이슈 보기 & 수정 2022.09.26
  const handleIssue = async (record) => {
    console.log('*** handle Issue ***', record);
    setVisibleIssue(true);
  };

  // view 버튼 클릭시
  const onClickDetail = (pid, arrno) => {
    setPjtid({ pid: pid, arrno: arrno });
    dispatch(changeSubMenu('detailview'));
  };

  // 프로젝트 리스트 -->

  // <-- 프로젝트 수정
  const [editFormMode, setEditFormMode] = useState('pjt-update');
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [checkbox, setCheckbox] = useState({});

  const handleEdit = async (record) => {
    //
    console.log('****record****', record);
    try {
      const request = await api.getQueryString(
        'api/code-statuses',
        'populate=%2A',
      );
      console.log('****code-statuses****', request.data.data);
      setCodestatus(request.data.data);
      setRecord(record);
      setVisible(true);
    } catch (error) {
      console.error(error);
    }
  };

  const onSubmit = async (value) => {
    // console.log('>>>>>>', value);
    if (editFormMode === 'pjt') {
      try {
        setBtnDisabled(true);
        const update_data = {};
        for (let k in checkbox) {
          const v = checkbox[k];
          if (v === true && typeof value[k] === 'object') {
            update_data[k] = moment(value[k]).format('YYYY-MM-DD').toString();
          } else if (v === true && typeof value[k] !== 'object') {
            update_data[k] = value[k];
          }
        }
        console.log('1.>>>>>>>', update_data);
        if (typeof update_data.code_status === 'string') {
          return message.error(`입력 오류 - 서비스 상태`, 3);
        }
        const request = await tbl_update('api/projects', value.id, update_data);
        // console.log('-----------', request);
        message.success(`update - ${request.statusText}`, 3);
        const status_filter = (key) => {
          const test = codestatus.filter((f) => f.id === key);
          return test[0].attributes.name;
        };
        // prject_change table insert
        console.log('record-----------', record);
        let count = 0;
        for (let k in update_data) {
          let changevalue;
          if (k === 'code_status') {
            changevalue = `${record[k]} -> ${status_filter(update_data[k])}`;
          } else {
            const newvalue =
              update_data[k] !== undefined ? update_data[k].toString() : '';
            changevalue = `${record[k]} -> ${newvalue}`;
          }

          const insert_data = {
            project: value.id,
            type: k,
            change: changevalue,
            users_permissions_user: auth.user.id,
          };
          // console.log('-----------', insert_data);
          const insert = await tbl_insert('api/project-changes', insert_data);
          count++;
          // console.log('-----insert------', insert);
        }
        message.success(`${count}건 처리 완료`, 3);
      } catch (error) {
        console.error(error);
        message.error(`관리자에게 문의 바랍니다.`, 3);
      } finally {
        setCheckbox({});
        setVisible(false);
        setBtnDisabled(false);
      }
    } else if (editFormMode === 'issue') {
      console.log('>>>>pjt id>>', record.id);
      //
      setBtnDisabled(true);
      const insert_data = {
        ...value,
        project: record.id,
        name: value.issue_name,
        issue_date: moment(value.issue_date).format('YYYY-MM-DD').toString(),
      };
      console.log('>>>>insert data>>', insert_data);
      const request = await tbl_insert('api/pjt-issues', insert_data);
      message.success(`add issue - ${request.statusText}`, 3);
      console.log('-----------', request);

      // change log 추가
      const issue_changelog_data = {
        project: record.id,
        type: 'issue',
        change: `issue 추가`,
        users_permissions_user: auth.user.id,
      };
      const insert = await tbl_insert(
        'api/project-changes',
        issue_changelog_data,
      );
      message.success(`change log - ${insert.statusText}`, 3);

      //
      setVisible(false);
      setBtnDisabled(false);
    }
    //
  };

  const onClose = (status) => {
    //
    console.log('----onClose----');
    if (status) {
      setRecord();
      setCheckbox({});
      setVisible(false);
    } else {
      alert('프로젝트 update 중...');
    }
  };

  const handleEditFormMode = (v) => {
    // edit form 언마운트시 'pjt' 리턴
    setEditFormMode(v);
  };

  // 수정 form 에서 체크 박스 변경시
  const handleCheck = (e) => {
    const name = e.target['data-id'];
    setCheckbox({ ...checkbox, [name]: e.target.checked });
  };

  // 프로젝트 수정 -->

  return (
    <>
      {submenu === 'status' ? (
        <>
          <ProjectStatusForm
            count={count}
            backlog={backlog}
            progressCount={progressCount}
            countFormOnclick={countFormOnclick}
            progressButtonOnclick={progressButtonOnclick}
            qs_filter={qs_filter}
            selectedBt={selectedBt}
          />
          <ProjectListTable
            tableData={tableData}
            loading={loading}
            handleEdit={handleEdit}
            // handleSearch1={handleSearch1}
            handleIssue={handleIssue}
            onClickDetail={onClickDetail}
          />
        </>
      ) : (
        ''
      )}
      {submenu === 'detailview' ? (
        <ProjectDetailContainer pid_arrno={pjtid} />
      ) : (
        ''
      )}
      {submenu === 'inputrate' ? (
        <ProjectInputRateChart
          inputRate={inputRate.inputRate}
          teamHistory={inputRate.teamHistory}
        />
      ) : (
        ''
      )}
      {visible ? (
        <ProjectEditForm
          visible={visible}
          btnDisabled={btnDisabled}
          record={record}
          code_status={codestatus}
          onClose={onClose}
          onSubmit={onSubmit}
          handleCheck={handleCheck}
          checkbox={checkbox}
          editFormMode={editFormMode}
          handleEditFormMode={handleEditFormMode}
        />
      ) : (
        ''
      )}
      {/* {visibleIssue ? <ProjectDrFormIssue visible={visibleIssue} /> : ''} */}
    </>
  );
};

export default ProjectContentContainer;
