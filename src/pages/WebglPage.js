import React from 'react';
import HeaderContainer from '../containers/common/HeaderContainer';
import SiteHeader from '../components/SiteHeader';
import FormTemplate from '../components/common/FormTemplate';
import WebGlComponent from '../components/webgl/WebGlComponent';
import DefaultLayout from '../components/Layout/DefaultLayout';

const WebglPage = () => {
  return (
    <>
      {/* <HeaderContainer title="WebGL 페이지" />
      <SiteHeader />
      <FormTemplate>
        <WebGlComponent />
      </FormTemplate> */}
      <DefaultLayout>
        <WebGlComponent />
      </DefaultLayout>
    </>
  );
};

export default WebglPage;
