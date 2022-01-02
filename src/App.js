import 'antd/dist/antd.css';
import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';

//page import
import SiteHeader from './components/SiteHeader';
import MainPage from './pages/MainPage';
import ProjectPage from './pages/ProjectPage';
import CustomerPage from './pages/CustomerPage';
import WorkPage from './pages/WorkPage';
import AntdPage from './pages/Antd';
import ProjectViewPage from './pages/ProjectViewPage';
import ProjectView from './pages/ProjectView';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AddPorjectPage from './pages/AddPorjectPage';

function App() {
  const { user } = useSelector(({ auth }) => ({ user: auth.auth }));
  // if (!user) {return <LoginPage /> }

  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/project" element={<ProjectPage />} />
        <Route path="/project/:id" element={<ProjectViewPage />} />
        <Route path="/addproject/" element={<AddPorjectPage />} />
        <Route path="/customer" element={<CustomerPage />} />
        <Route path="/work" element={<WorkPage />} />
        <Route path="/antd" element={<AntdPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
}

export default App;
