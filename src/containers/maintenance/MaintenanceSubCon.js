import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MaintenanceSubMenu from '../../components/maintenance/MaintenanceSubMenu';
import AddMainDrawerContainer from './AddMainDrawerContainer';
import { getMaintenanceList } from '../../modules/apiGetList';

const MaintenanceSubCon = () => {
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const query = 'populate=%2A';
    dispatch(getMaintenanceList(query));
  }, [dispatch]);

  const onClickSub = (arg) => {
    //
    console.log('Onclick - ', arg);
    setVisible(true);
  };

  return (
    <>
      {visible ? (
        <AddMainDrawerContainer visible={visible} setVisible={setVisible} />
      ) : (
        <></>
      )}
      <MaintenanceSubMenu onClickSub={onClickSub} />
    </>
  );
};

export default MaintenanceSubCon;
