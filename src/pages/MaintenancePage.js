import React from 'react';
import DefaultLayout from '../components/Layout/DefaultLayout';
//
import HeaderContainer from '../containers/common/HeaderContainer';
import SiteHeader from '../components/SiteHeader';
import FormTemplate from '../components/common/FormTemplate';
import MaintenanceListCon from '../containers/maintenance/MaintenanceListCon';
import MaintenanceSubCon from '../containers/maintenance/MaintenanceSubCon';

const MaintenancePage = () => {
  return (
    <>
      {/* <HeaderContainer title="유지보수" />
      <SiteHeader />
      <FormTemplate>
        <MaintenanceSubCon />
        <MaintenanceListCon />
      </FormTemplate> */}
      <DefaultLayout>
        <MaintenanceSubCon />
        <MaintenanceListCon />
      </DefaultLayout>
    </>
  );
};

export default MaintenancePage;
