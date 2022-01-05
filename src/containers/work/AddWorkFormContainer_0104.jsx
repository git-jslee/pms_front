import React, { useState, useEffect } from 'react';
import AddWorkForm from '../../components/work/AddWorkForm';
import { apiCustomerList, apiCustomer_ProjectList } from '../../lib/api/api';
import projectlist from '../../modules/projectList';

const AddWorkFormContainer = () => {
  const [customers, setCustomers] = useState('');
  const [projectList, setProjectList] = useState('');
  // 컴포넌트 렌더링시 고객 정보 가져오기..redux 사용안함
  useEffect(() => {
    apiCustomerList()
      .then((result) => {
        setCustomers(result.data);
        setProjectList('');
      })
      .catch((error) => {
        console.error('에러발생', error);
      });
  }, []);

  // Form 에서 고객 선택시
  const customerOnChange = (id) => {
    console.log('2.고객 선택', id);
    //고객에 해당되는 진행중 프로젝트 데이터 가져오기
    apiCustomer_ProjectList(id)
      .then((result) => {
        console.log('>>프로젝트리스트>>', result.data);
        setProjectList(result.data);
        // setWorkInitValues({ project: '테스트' });
      })
      .catch((error) => {
        console.error('에러발생', error);
      });
  };

  return (
    <div>
      <h1>AddWorkFormContainer</h1>
      {customers ? (
        <AddWorkForm
          customers={customers}
          projectList={projectList}
          customerOnChange={customerOnChange}
        />
      ) : (
        <h1>로딩중</h1>
      )}
    </div>
  );
};

export default AddWorkFormContainer;
