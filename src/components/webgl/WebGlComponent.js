import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Button } from 'antd';
import Unity, { UnityContext } from 'react-unity-webgl';
import { setWebglName } from '../../modules/common';

const Base = styled.div`
  width: 100%;
`;

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

const unityStyle = {
  width: '960px',
  height: '600px',
  justifyContent: 'center',
  alignItems: 'center',
};

const WebGlComponent = () => {
  const [webglName, setWebglName] = useState();

  const unityContext_crea = new UnityContext({
    loaderUrl: 'webglBuild/crea/build.loader.js',
    dataUrl: 'webglBuild/crea/build.data',
    frameworkUrl: 'webglBuild/crea/build.framework.js',
    codeUrl: 'webglBuild/crea/build.wasm',
  });

  const unityContext_crea2 = new UnityContext({
    loaderUrl: 'webglBuild/crea2/build.loader.js',
    dataUrl: 'webglBuild/crea2/build.data',
    frameworkUrl: 'webglBuild/crea2/build.framework.js',
    codeUrl: 'webglBuild/crea2/build.wasm',
  });

  const unityContext_urp = new UnityContext({
    loaderUrl: 'webglBuild/urp/build.loader.js',
    dataUrl: 'webglBuild/urp/build.data',
    frameworkUrl: 'webglBuild/urp/build.framework.js',
    codeUrl: 'webglBuild/urp/build.wasm',
  });

  useEffect(() => {
    const webgl = sessionStorage.getItem('webgl');
    setWebglName(webgl);
    return async () => {
      // await unityQuit();

      // 페이지 이동시 reload 해야만 오류 발생 안함
      window.location.reload();
    };
  }, []);

  const test1 = () => {
    sessionStorage.setItem('webgl', 'crea');
    window.location.reload();
    // setWebglName('crea');
  };

  const test2 = async () => {
    sessionStorage.setItem('webgl', 'crea2');
    // await unityQuit();
    window.location.reload();
    // setWebglName('urp');
  };

  const test3 = async () => {
    sessionStorage.setItem('webgl', 'urp');
    // await unityQuit();
    window.location.reload();
    // setWebglName('urp');
  };
  function unityQuit() {
    unityContext_crea.send('InputController', 'OnApplicationQuit');
  }

  const handleOnClickFullscreen = () => {
    unityContext_crea.setFullscreen(true);
  };

  console.log('>>webglname', webglName);

  return (
    <Base>
      <SubMenuBlock>
        <Button onClick={test1}>CREA</Button>
        <Button onClick={test2}>CREA2</Button>
        <Button onClick={test3}>URP</Button>
        <Button onClick={handleOnClickFullscreen}>Fullscreen</Button>
        <Button onClick={unityQuit}>QUIT</Button>
      </SubMenuBlock>
      <WebGlBlock>
        <h2>crea webgl..</h2>
        {webglName === 'crea' ? (
          <Unity style={unityStyle} unityContext={unityContext_crea} />
        ) : (
          ''
        )}
        {webglName === 'crea2' ? (
          <Unity style={unityStyle} unityContext={unityContext_crea2} />
        ) : (
          ''
        )}
        {webglName === 'urp' ? (
          <Unity style={unityStyle} unityContext={unityContext_urp} />
        ) : (
          ''
        )}
      </WebGlBlock>
    </Base>
  );
};

export default WebGlComponent;
