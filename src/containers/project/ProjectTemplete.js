import React, { useState } from 'react';
import styled from 'styled-components';
import ProjectAddContainer from './ProjectAddContainer';
import ProjectContentContainer from './ProjectContentContainer';
import ProjectSubContainer from './ProjectSubContainer';

const Base = styled.div`
  width: 100%;
`;

const ProjectTemplete = () => {
  const [mode, setMode] = useState('view');
  console.log('>>>>', mode);

  return (
    <Base>
      <ProjectSubContainer setMode={setMode} />
      {mode === 'add' ? (
        <ProjectAddContainer mode={mode} setMode={setMode} />
      ) : (
        ''
      )}
      {/* <hr /> */}
      <ProjectContentContainer />
    </Base>
  );
};

export default ProjectTemplete;
