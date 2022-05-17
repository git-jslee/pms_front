import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Button } from 'antd';
import Unity, { UnityContext } from 'react-unity-webgl';

const SubMenuBlock = styled.div`
  display: inline;
  .search {
    margin-left: 20px;
    margin-right: 60px;
    display: inline;
  }
  .inline {
    margin-left: 10px;
    display: inline-block;
  }
  .inline > form {
    margin-left: 10px;
    display: inline;
  }
`;

const WebGlBlock = styled.div`
  /* #unity-canvas-1 {
    height: '100px';
    justify-content: 'center';
    align-self: 'center';
  } */
`;

const unityContext = new UnityContext({
  loaderUrl: 'webglBuild/crea/build.loader.js',
  dataUrl: 'webglBuild/crea/build.data',
  frameworkUrl: 'webglBuild/crea/build.framework.js',
  codeUrl: 'webglBuild/crea/build.wasm',
});

const unityContext_urp = new UnityContext({
  loaderUrl: 'webglBuild/urp/build.loader.js',
  dataUrl: 'webglBuild/urp/build.data',
  frameworkUrl: 'webglBuild/urp/build.framework.js',
  codeUrl: 'webglBuild/urp/build.wasm',
});

const WebGlComponent = () => {
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    return () => {
      console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<');
      unityContext.removeAllEventListeners();
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>');
    };
  }, []);

  const test1 = () => {
    setIsLoaded(true);
  };

  const test2 = () => {
    setIsLoaded(false);
  };

  const handleOnClickFullscreen = () => {
    unityContext.setFullscreen(true);
  };

  return (
    <>
      <SubMenuBlock>
        <Button onClick={test1}>CREA</Button>
        <Button onClick={test2}>URP</Button>
        <Button onClick={handleOnClickFullscreen}>Fullscreen</Button>
      </SubMenuBlock>
      <WebGlBlock>
        {isLoaded ? (
          <Unity
            style={{
              width: '960px',
              height: '600px',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            unityContext={unityContext}
          />
        ) : (
          <Unity
            style={{
              width: '960px',
              height: '600px',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            unityContext={unityContext_urp}
          />
        )}
      </WebGlBlock>
    </>
  );
};

export default WebGlComponent;
