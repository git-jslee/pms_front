import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import SiteHeader from '../components/SiteHeader';
import FormTemplate from '../components/common/FormTemplate';
import SalesDetailContainer from '../containers/sales/SalesDetailContainer';
import SalesCodebookContainer from '../containers/common/SalesCodebookContainer';

const SalesViewPage = () => {
  return (
    <>
      <HeaderContainer />
      <SiteHeader />
      {/* salescodebook 은 update 시에만 필요.. */}
      <SalesCodebookContainer />
      <h1>sales detail page</h1>
      <FormTemplate>
        <SalesDetailContainer />
      </FormTemplate>
    </>
  );
};

export default SalesViewPage;
