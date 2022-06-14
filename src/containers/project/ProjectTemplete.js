import React, { useState } from 'react';
import ProjectAddContainer from './ProjectAddContainer';
import ProjectContentContainer from './ProjectContentContainer';
import ProjectSubContainer from './ProjectSubContainer';

const ProjectTemplete = () => {
  const [mode, setMode] = useState('view');
  console.log('>>>>', mode);

  return (
    <>
      <ProjectSubContainer setMode={setMode} />
      {mode === 'add' ? (
        <ProjectAddContainer mode={mode} setMode={setMode} />
      ) : (
        ''
      )}

      <hr />
      <ProjectContentContainer />
    </>
  );
};

export default ProjectTemplete;
