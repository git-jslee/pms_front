import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import WorkSubForm from '../../components/work/WorkSubForm';
import { apiUserList } from '../../lib/api/api';
import { set_worker, set_team, set_type } from '../../modules/work';
import {
  qs_team_worker_list,
  qs_teamByUserid,
} from '../../lib/api/queryCommon';
import * as api from '../../lib/api/api';

const Base = styled.div`
  width: 100%;
`;

const WorkSubContainer = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector(({ auth }) => ({
    auth: auth.auth,
  }));
  const { selectedType, selectedUser, selectedTeam } = useSelector(
    ({ work }) => ({
      selectedType: work.selectedType,
      selectedUser: work.selectedUser,
      selectedTeam: work.selectedTeam,
    }),
  );
  const [userList, setUserList] = useState('');
  const [teamUserList, setTeamUserList] = useState();
  //로그인 안했을때 오류 발생 개선 필요
  const [workerId, setWorkerId] = useState(auth.user.id);

  // 인증 정보 가져오기

  // 컴포넌트 렌더링 시 사업부 & 작업자 리스트 정보 가져옴
  useEffect(() => {
    initData();
  }, []);

  // 컴포넌트 렌더링 시 작업자 팀정보 가져오기
  // 로그인 팀 & 작업자 정보 Redux 저장
  // useEffect(() => {
  //   api
  //     .getQueryString(`api/users/${auth.user.id}`, qs_teamByUserid())
  //     .then((result) => {
  //       console.log('>>>>>>>team..>>>>>>', result.data);
  //       dispatch(
  //         set_team({
  //           selectedUser: workerId,
  //           selectedTeam: result.data.code_pj_team.id,
  //         }),
  //       );
  //       // setSelectedTeam(result.data.data);
  //       // 작업자 리스트 업데이트
  //     })
  //     .catch((error) => {
  //       console.error('에러발생', error);
  //     });
  // }, []);

  const initData = async () => {
    // 사업부 & 작업자 리스트
    const req_teamlist = await api.getQueryString(
      'api/code-pj-teams',
      qs_team_worker_list(),
    );
    const teamlist = req_teamlist.data.data;
    const user_team = usersByTeam(teamlist, auth.user.id);
    console.log('444444444444444444444444', user_team);

    //set & dispatch
    dispatch(
      set_team({
        selectedUser: workerId,
        selectedTeam: user_team.team === null ? 1 : user_team.team.id,
      }),
    );
    setTeamUserList(teamlist);
    setUserList(user_team.users.data);
  };

  const usersByTeam = (teamlist, wid) => {
    if (teamlist === undefined) return;
    let team = null;
    const map_list = teamlist.map((v1) => {
      const filter = v1.attributes.users.data.map((v2) => {
        if (team !== null) return;
        if (v2.id === wid) {
          team = v1;
        }
      });
    });

    // 사업부 작업자 리스트
    // 비작업자 예외처리
    const users =
      team === null
        ? teamlist.filter((f1) => f1.id === 1)
        : teamlist.filter((f1) => f1.id === team.id);

    return { team: team, users: users[0].attributes.users };
  };

  const userOnChange = (id) => {
    // setWorkerId(id);
    dispatch(set_worker({ selectedUser: id }));
  };

  const teamOnChange = (id) => {
    const users = teamUserList.filter((f1) => f1.id === id);
    setUserList(users[0].attributes.users.data);
    dispatch(
      set_team({
        selectedUser: null,
        selectedTeam: id,
      }),
    );
  };

  const typeOnChange = (type) => {
    dispatch(
      set_type({
        selectedType: type.target.value,
      }),
    );
  };

  return (
    <Base>
      {teamUserList && userList ? (
        <WorkSubForm
          userList={userList}
          selectedType={selectedType}
          teamUserList={teamUserList}
          selectedUser={selectedUser}
          selectedTeam={selectedTeam}
          // userList={userList}
          typeOnChange={typeOnChange}
          userOnChange={userOnChange}
          teamOnChange={teamOnChange}
        />
      ) : (
        <div>작업자 정보 가져오는 중...</div>
      )}
    </Base>
  );
};

export default WorkSubContainer;
