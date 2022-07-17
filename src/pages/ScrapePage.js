import React from 'react';
//
import DefaultLayout from '../components/Layout/DefaultLayout';
//
import HeaderContainer from '../containers/common/HeaderContainer';
import SiteHeader from '../components/SiteHeader';
import FormTemplate from '../components/common/FormTemplate';
import ScrapeListContainer from '../containers/scrape/ScrapeListContainer';

const ScrapePage = () => {
  return (
    <>
      {/* <HeaderContainer title="지원사업 관리" />
      <SiteHeader />
      <FormTemplate>
        <ScrapeListContainer />
      </FormTemplate> */}
      <DefaultLayout>
        <ScrapeListContainer />
      </DefaultLayout>
    </>
  );
};

export default ScrapePage;
