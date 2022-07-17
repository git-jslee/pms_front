import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillHome, AiFillSetting } from 'react-icons/ai';
import { FaChartPie, FaEdit, FaBuilding } from 'react-icons/fa';
import { BsBarChartLineFill } from 'react-icons/bs';
import { IoPersonSharp } from 'react-icons/io5';

const Navigation = () => {
  return (
    <>
      <Link to="/">
        <i>
          <AiFillHome />
        </i>
        <span>H o m e</span>
      </Link>
      <Link to="/sales">
        <i>
          <FaChartPie />
        </i>
        <span>매 출 현 황</span>
      </Link>
      <Link to="/project">
        <i>
          <BsBarChartLineFill />
        </i>
        <span>프 로 젝 트</span>
      </Link>
      <Link to="/maintenance">
        <i>
          <AiFillSetting />
        </i>
        <span>유 지 보 수</span>
      </Link>
      <Link to="/work">
        <i>
          <FaEdit />
        </i>
        <span>작 업</span>
      </Link>
      <Link to="/customer">
        <i>
          <IoPersonSharp />
        </i>
        <span>고 객</span>
      </Link>
      {/* <Link to="/login">로그인</Link> */}
      <Link to="/">|-TEST--</Link>
      <Link to="/scrape">
        <i>
          <FaBuilding />
        </i>
        <span>지 원 사 업</span>
      </Link>
      <Link to="/webgl">
        <span>W E B 3 D</span>
      </Link>
      <Link to="/powerbi">
        <span>P o w e r B I</span>
      </Link>
    </>
  );
};

export default Navigation;
