import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import WorkDrawerForm from '../../components/work/WorkDrawerForm';
import * as api from '../../lib/api/api';
import moment from 'moment-timezone';
import { tbl_update } from '../../modules/common/tbl_crud';
import { qs_projectByTasks } from '../../lib/api/query';

const WorkDrawerContainer = ({
  visible,
  setVisible,
  drawerOnClose,
  initialValues,
}) => {
  const [editmode, setEditmode] = useState(false);
  const [progress, setProgress] = useState([]);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [tasks, setTasks] = useState([]);

  const { userId } = useSelector(({ auth }) => ({
    userId: auth.auth.user.id,
  }));

  const editOnclick = async (type, pid) => {
    //
    if (editmode) {
      setEditmode(false);
    } else if (!editmode && type === '프로젝트') {
      const query = qs_projectByTasks(pid);
      const req_code = await api.getQueryString('api/code-progresses', '');
      const req_tasks = await api.getQueryString(`api/projects/${pid}`, query);
      const new_tasks = req_tasks.data.data.attributes.project_tasks.data;
      //   console.log('**code progress**', new_tasks);
      setProgress(req_code.data.data);
      setTasks(new_tasks);
      setEditmode(true);
    } else if (!editmode && type === '유지보수') {
      //
    }
    console.log('editmode', editmode);
  };

  // 작업 수정 - onSubmit
  const editworkOnSubmit = async (e) => {
    setBtnDisabled(true);
    if (e.type === '프로젝트') {
      console.log('***프로젝트 작업수정***', e);
      const update_data = {
        working_day: moment(e.working_day).format('YYYY-MM-DD').toString(),
        working_time: e.working_time,
        code_progress: e.code_progress,
        // project_task: e.task,
        description: e.description,
      };
      const request = await tbl_update('api/works', e.id, update_data);
      console.log('***프로젝트 작업수정 결과 ***', request);
    } else if (e.type === '유지보수') {
      //
      console.log('***유지보수 작업수정***', e);
    }
    setVisible(false);
    setBtnDisabled(false);
  };

  // 작업 삭제
  const deleteOnclick = async (type, wid) => {
    //
    if (type === '프로젝트') {
      console.log('**프로젝트 work 삭제**', type, wid);
      const delete_date = {
        deleted: true,
      };
      const request = await tbl_update('api/works', wid, delete_date);
      console.log('>>>>>>>>삭제', request);
      setVisible(false);
    } else if (type === '유지보수') {
      console.log('**유지보수 work 삭제**', type, wid);
    }
  };

  return (
    <>
      <WorkDrawerForm
        visible={visible}
        userId={userId}
        drawerOnClose={drawerOnClose}
        initialValues={initialValues}
        editmode={editmode}
        editOnclick={editOnclick}
        editworkOnSubmit={editworkOnSubmit}
        deleteOnclick={deleteOnclick}
        progress={progress}
        tasks={tasks}
        btnDisabled={btnDisabled}
      />
    </>
  );
};

export default WorkDrawerContainer;
