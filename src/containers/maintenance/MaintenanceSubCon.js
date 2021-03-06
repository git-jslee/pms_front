import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import MaintenanceSubMenu from '../../components/maintenance/MaintenanceSubMenu';
import AddMainDrawerContainer from './AddMainDrawerContainer';
import { getMaintenanceList } from '../../modules/apiGetList';
import { qs_maintenanceAll } from '../../lib/api/query';

const Base = styled.div`
  width: 100%;
`;

const MaintenanceSubCon = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // const query = 'populate=%2A';
    const query = qs_maintenanceAll();
    dispatch(getMaintenanceList(query));
  }, [dispatch]);

  const onClickSub = (arg) => {
    //
    console.log('Onclick - ', arg);
    setVisible(true);
  };

  return (
    <Base>
      {visible ? (
        <AddMainDrawerContainer visible={visible} setVisible={setVisible} />
      ) : (
        <></>
      )}
      <MaintenanceSubMenu onClickSub={onClickSub} />
    </Base>
  );
};

export default MaintenanceSubCon;
