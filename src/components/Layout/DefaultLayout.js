import React from 'react';
import styled from 'styled-components';
//
import HeaderContainer from '../../containers/common/HeaderContainer';
import Navigation from './Navigation';
import paletteJY from '../../lib/styles/palette_JY';
import palette from '../../lib/styles/palette';

const Base = styled.div``;
const ContainerBlock = styled.div`
  display: flex;
  width: 1800px;
  margin: 0 auto;
  justify-content: space-between;
`;
const NavigationBlock = styled.div`
  width: 166px;
  flex-shrink: 0;
  box-shadow: 5px 5px 10px rgba(181 191 198 / 46%),
    -5px -9px 8px rgba(255 255 255 / 52%);
  border-radius: 10px;
  padding-top: 20px;
  height: 77vh;
  position: sticky;
  top: 183px;
  left: 0;
  a {
    display: block;
    border-radius: 4px;
    width: 131px;
    height: 36px;
    margin: 0 auto 20px;
    color: ${paletteJY.gray[2]};
    font-size: medium;
    padding: 10px 12px;
    &:hover {
      box-shadow: inset 3px 3px 2px rgba(181 191 198 / 46%),
        inset -3px -3px 2px rgba(255 255 255 / 52%);
    }
    i {
    }
    span {
      display: inline-block;
      text-align: justify;
      width: 79px;
      line-height: 2px;
      margin-left: 12px;
      &::after {
        content: '';
        display: inline-block;
        width: 100%;
      }
    }
  }
`;
const ContentsBlock = styled.div`
  /* background: ${palette.gray[2]}; */
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  justify-content: top;
  align-items: center;
  width: 1614px;
  border-radius: 2px;
`;

const FooterBlock = styled.footer``;

const DefaultLayout = (props) => {
  return (
    <Base>
      <HeaderContainer title={props.title} />
      <ContainerBlock>
        <NavigationBlock>
          <Navigation />
        </NavigationBlock>
        <ContentsBlock>{props.children}</ContentsBlock>
      </ContainerBlock>
      <FooterBlock>{/* footer 추가 */}</FooterBlock>
    </Base>
  );
};

export default DefaultLayout;
