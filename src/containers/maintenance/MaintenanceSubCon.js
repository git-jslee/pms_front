import React, { useState } from 'react';
import MaintenanceSubMenu from '../../components/maintenance/MaintenanceSubMenu';
import AddMainDrawerContainer from './AddMainDrawerContainer';

const MaintenanceSubCon = () => {
  const [visible, setVisible] = useState(false);

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
