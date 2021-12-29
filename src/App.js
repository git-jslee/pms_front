import 'antd/dist/antd.css';
import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';


//page import
import SiteHeader from './components/SiteHeader';
import Home from './pages/Home';
import ProjectPage from './pages/ProjectPage';
import CustomerPage from './pages/CustomerPage';
import WorkPage from './pages/WorkPage';
import AntdPage from './pages/Antd';
import ProjectView from './pages/ProjectView';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HeaderContainer from './containers/common/HeaderContainer';


function App() {
  const { user } = useSelector(({ auth }) => ({ user: auth.auth}));
  // if (!user) {return <LoginPage /> }

  return (
    <>
      <HeaderContainer />
      <SiteHeader />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/project' element={<ProjectPage />} />
        <Route path='/project/:id' element={<ProjectView />} />
        <Route path='/customer' element={<CustomerPage />} />
        <Route path='/work' element={<WorkPage />} />
        <Route path='/antd' element={<AntdPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
    </>
  );
}

export default App;
