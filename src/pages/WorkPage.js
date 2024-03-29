import React from 'react';
import DefaultLayout from '../components/Layout/DefaultLayout';
import CodeBookContainer from '../containers/common/CodebookContainer';
import AddWorkDrawerContainer from '../containers/work/AddWorkDrawerContainer';
import WorkSubContainer from '../containers/work/WorkSubContainer';
import WorkListContainer from '../containers/work/WorkListContainer';

const WorkPage = () => {
  return (
    <DefaultLayout>
      <CodeBookContainer />
      <AddWorkDrawerContainer />
      <hr />
      <WorkSubContainer />
      <hr />
      <WorkListContainer />
      <hr />
    </DefaultLayout>
  );
};

export default WorkPage;
