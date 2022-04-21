import React from 'react';
import InfoMainDrawerForm from '../../components/maintenance/InfoMainDrawerForm';

const InfoMainDrawerContainer = ({ infoVisible, onCloseDrawer }) => {
  return (
    <>
      <InfoMainDrawerForm
        infoVisible={infoVisible}
        onCloseDrawer={onCloseDrawer}
      />
    </>
  );
};

export default InfoMainDrawerContainer;
