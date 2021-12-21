import 'antd/dist/antd.css';
import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';

//page import
import SiteHeader from './components/SiteHeader';
import Home from './pages/Home';
import ProjectPage from './pages/ProjectPage';
import CustomerPage from './pages/CustomerPage';
import WorkPage from './pages/WorkPage';
import AntdPage from './pages/Antd';
import Login from './pages/login';


function App() {
  return (
    <div>
      <SiteHeader />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/project' element={<ProjectPage />} />
        <Route path='/customer' element={<CustomerPage />} />
        <Route path='/work' element={<WorkPage />} />
        <Route path='/antd' element={<AntdPage />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
