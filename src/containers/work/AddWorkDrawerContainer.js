import React, { useState, useEffect } from 'react';
import moment from 'moment';
import styled from 'styled-components';
// import 'moment-timezone';
import { useDispatch, useSelector } from 'react-redux';
import * as api from '../../lib/api/api';
import { tbl_insert, tbl_update } from '../../modules/common/tbl_crud';
import AddWorkDrawerForm from '../../components/work/AddWorkDrawerForm';
import { set_worker } from '../../modules/work';
import {
  qs_projectList,
  qs_projectByCid,
  qs_customerByUsed,
  qs_maintenanceByCid,
} from '../../lib/api/query';
import customerSortDuplicate from '../../modules/common/customerSortDuplicate';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const ButtonBlock = styled.div`
  //
`;

const AddWorkDrawerContainer = () => {
  const dispatch = useDispatch();
  // 중복Submit 방지
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [addMode, setAddMode] = useState('project');
  const [customerId, setCustomerId] = useState(null);
  const [dropdownLists, setDropdownLists] = useState({
    customers: null,
  });
  //
  const [resetfields, setResetfields] = useState(false);
  const { auth } = useSelector(({ auth }) => ({
    auth: auth.auth,
  }));

  // drowser
  const onClickAddWork = () => {
    // form.resetFields();
    setVisible(true);
    // setResetfields(false);
  };
  const onClose = () => {
    // form.resetFields();
    setVisible(false);
    setResetfields(true);
    setAddMode('project');
    setCustomerId(null);
    setBtnDisabled(false);
    // setDropdownLists({ ...dropdownLists, cId: null });
  };

  // **** 작업등록 - 프로젝트 ****
  // 1. 진행중 프로젝트 고객정보 가져오기
  useEffect(() => {
    const code_status_id = 2;
    const query = qs_projectList(code_status_id);
    const request = customerSortDuplicate('api/projects', query)
      .then((result) => {
        // setCustomers(result);
        setDropdownLists({ ...dropdownLists, customers: result });
        // setProjectList('');
      })
      .catch((e) => {
        console.error(e);
      });

    // 컴포턴트 빠져나갈시..뒷정리 하기
    return () => {
      // console.log('cleanup');
      //   dispatch(set_init());
    };
  }, []);

  // 2. 고객 선택시
  const customerOnChange = async (id) => {
    console.log('***editmode ***', addMode);
    if (addMode === 'project') {
      const query = qs_projectByCid(id);
      api
        .getListQuery('api/projects', query)
        .then((result) => {
          setDropdownLists({
            ...dropdownLists,
            items1: result.data.data,
            items2: null,
            items3: null,
          });
        })
        .catch((error) => {
          console.error('에러발생', error);
        });
    } else if (addMode === 'maintenance') {
      const query = qs_maintenanceByCid(id);
      const request = await api.getQueryString('api/maintenances', query);
      setDropdownLists({
        ...dropdownLists,
        items1: request.data.data,
        items2: null,
        items3: null,
      });
    }
    setCustomerId(id);
    setResetfields(true);
  };

  // 3. 프로젝트 선택시
  const projectOnChange = async (id) => {
    if (addMode === 'project') {
      const query = `filters[project][id][$eq]%20=${id}&populate=%2A`;
      // 프로젝트 task 정보 가져오기
      api
        .getListQuery('api/project-tasks', query)
        .then((result) => {
          console.log('***tasks***', result.data.data);
          const sort = result.data.data.sort((a, b) => {
            return (
              a.attributes.code_task.data.attributes.sort -
              b.attributes.code_task.data.attributes.sort
            );
          });
          // console.log('***tasks-sort***', sort);
          setDropdownLists({ ...dropdownLists, items2: sort });
        })
        .catch((error) => {
          console.error('에러발생', error);
        });
    } else if (addMode === 'maintenance') {
      const query = 'populate=%2A';
      const request = await api.getQueryString('api/code-ma-supports', query);
      setDropdownLists({ ...dropdownLists, suLists: request.data.data });
    }
  };

  // 4. task 선택 시..
  const taskOnChange = (id) => {
    if (addMode === 'project') {
      // console.log('4.Task 선택', id);
      // 진행상태 데이터 가져오기
      api
        .getList('api/code-progresses')
        .then((result) => {
          // setProgress(result.data.data);
          setDropdownLists({ ...dropdownLists, items3: result.data.data });
        })
        .catch((error) => {
          console.error('에러발생', error);
        });
    }
  };

  // 5. onSubmit
  const onSubmit = async (values) => {
    if (addMode === 'project') {
      setBtnDisabled(true);
      const work_data = {
        customer: values.customer,
        project: values.project,
        project_task: values.project_task,
        working_day: moment(values.workingDay).format('YYYY-MM-DD').toString(),
        working_time: parseInt(values.workingTime),
        code_progress: values.code_progress,
        users_permissions_user: auth.user.id,
        description: values.description,
      };
      const pjt_data = {
        last_workupdate: moment(values.workingDay),
      };
      // 프로젝트 작업등로 시간 업데이트
      const pjtUpdate = await tbl_update(
        'api/projects',
        values.project,
        pjt_data,
      );
      console.log('1.project update 결과', pjtUpdate);

      // 작업등록
      const work_insert = await tbl_insert('api/works', work_data);
      console.log('2. 작업 등록 data', work_data);
      console.log('2. 작업 등록 성공', work_insert);
      setVisible(false);
      setBtnDisabled(false);
      setResetfields(true);
      // 아래 개선필요..화면깜빡임
      dispatch(set_worker({ userInfoId: 0 }));
      dispatch(set_worker({ userInfoId: auth.user.id }));
    } else if (addMode === 'maintenance') {
      console.log('***onsubimt - 유지보수***', values);
      setBtnDisabled(true);
      const insert_data = {
        customer: values.customer,
        maintenance: values.maintenance,
        title: values.title,
        code_ma_support: values.code_ma_support,
        working_day: moment(values.workingDay).format('YYYY-MM-DD').toString(),
        working_time: parseInt(values.workingTime),
        users_permissions_user: auth.user.id,
        description: values.description,
      };

      const insert = await tbl_insert('api/maintenance-works', insert_data);
      console.log('1. 유지보수 작업 등록 성공', insert);
      setVisible(false);
      setBtnDisabled(false);
      setResetfields(true);
    }
  };

  const onClickAddMode = async (value) => {
    setAddMode(value.target.value);
    setCustomerId(null);
    setResetfields(true);
    if (value.target.value === 'project') {
      const code_status_id = 2;
      const query = qs_projectList(code_status_id);
      const request = await customerSortDuplicate('api/projects', query);
      setDropdownLists({
        customers: request,
      });
    } else if (value.target.value === 'maintenance') {
      //
      const arg = {
        used: {
          $eq: true,
        },
      };
      const query = qs_customerByUsed(arg);
      const request = await customerSortDuplicate('api/maintenances', query);
      setDropdownLists({
        customers: request,
      });
    }
  };

  return (
    <>
      <ButtonBlock>
        <Button onClick={onClickAddWork} icon={<PlusOutlined />}>
          작업등록
        </Button>
      </ButtonBlock>
      <AddWorkDrawerForm
        // onClickAddWork={onClickAddWork}
        addMode={addMode}
        btnDisabled={btnDisabled}
        customerId={customerId}
        onSubmit={onSubmit}
        onClose={onClose}
        onClickAddMode={onClickAddMode}
        visible={visible}
        resetfields={resetfields}
        setResetfields={setResetfields}
        dropdownLists={dropdownLists}
        customerOnChange={customerOnChange}
        projectOnChange={projectOnChange}
        taskOnChange={taskOnChange}
      />
    </>
  );
};

export default AddWorkDrawerContainer;
