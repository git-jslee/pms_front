import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import SiteHeader from '../components/SiteHeader';
import FormTemplate from '../components/common/FormTemplate';
import MaintenanceListForm from '../components/maintenance/MaintenanceListForm';
import MaintenanceSubCon from '../containers/maintenance/MaintenanceSubCon';

const MaintenancePage = () => {
  return (
    <>
      <HeaderContainer title="유지보수" />
      <SiteHeader />
      <FormTemplate>
        <MaintenanceSubCon />
        <MaintenanceListForm />
      </FormTemplate>
    </>
  );
};

export default MaintenancePage;
