import React, { useState, useEffect } from 'react';
import moment from 'moment';
import 'moment-timezone';
import { useDispatch, useSelector } from 'react-redux';
import * as api from '../../lib/api/api';
import { tbl_insert, tbl_update } from '../../modules/common/tbl_crud';
import AddMainDrawerForm from '../../components/maintenance/AddMainDrawerForm';
import { getCustomerlist } from '../../modules/customerList';

const AddMainDrawerContainer = ({ visible, setVisible }) => {
  const dispatch = useDispatch();
  const { customer } = useSelector(({ customerList }) => ({
    customer: customerList.data,
  }));
  const [item, setItem] = useState();
  const [team, setTeam] = useState();

  useEffect(() => {
    // 고객정보 reduxt 가져오기
    if (!customer) {
      dispatch(getCustomerlist());
    }

    // 유지보수 item 정보 가져오기
    const query = 'filters[maintenance][$eq]=true';
    api
      .getListQuery('api/scode-items', query)
      .then((result) => {
        console.log('result', result.data.data);
        setItem(result.data.data);
      })
      .catch((error) => console.log('error', error));

    // 사업부 정보 가져오기
    api
      .getList('api/scode-teams?populate=%2A')
      .then((result) => {
        console.log('tesm-result', result.data.data);
        setTeam(result.data.data);
      })
      .catch((error) => console.log('error', error));
  }, []);
  const onClose = () => {
    // console.log('onClose 실행');
    setVisible(false);
  };

  // onSubmit
  const onSubmit = async (value) => {
    const create_data = {
      ...value,
      contracted:
        value.contracted === undefined || value.contracted === false
          ? false
          : true,
    };
    console.log('create_data', create_data);
    const result = await tbl_insert('api/maintenances', create_data);
    console.log('1. maintenances', result.data);
  };

  return (
    <>
      <AddMainDrawerForm
        onSubmit={onSubmit}
        visible={visible}
        onClose={onClose}
        customer={customer}
        item={item}
        team={team}
        //
      />
    </>
  );
};

export default AddMainDrawerContainer;
