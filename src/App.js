import 'antd/dist/antd.css';
import './App.css';
import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PrivateRoute from './components/common/PrivateRoute';
import PublicRoute from './components/common/PublicRoute';

//page import
import SiteHeader from './components/SiteHeader';
import MainPage from './pages/MainPage';
import ProjectPage from './pages/ProjectPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import ProjectViewPage from './pages/ProjectViewPage';
//수정중 --
import CustomerPage from './pages/CustomerPage';
import WorkPage from './pages/WorkPage';
import AntdPage from './pages/Antd';
import ProjectView from './pages/ProjectView';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AddPorjectPage from './pages/AddPorjectPage';
import AddCustomerPage from './pages/AddCustomerPage';
import WorkFormPage from './pages/WorkFormPage';
import AddWorkFormPage from './pages/AddWorkFormPage';
import SalesPage from './pages/SalesPage';
import AddSalesPage from './pages/AddSalesPage';
import SalesViewPage from './pages/SalesViewPage';
import MaintenancePage from './pages/MaintenancePage';
import WebglPage from './pages/WebglPage';
import ScrapePage from './pages/ScrapePage';
import ErrorPage from './pages/ErrorPage';

function App() {
  // const { user } = useSelector(({ auth }) => ({ user: auth.auth }));
  // if (!user) {
  //   return <LoginPage />;
  // }

  return (
    <>
      <Routes>
        {/* <Route path="/" element={<MainPage />} /> */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<ProjectPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/project" element={<ProjectPage />} />
          <Route path="project/:id" element={<ProjectDetailPage />} />
          <Route path="/projects/:id" element={<ProjectViewPage />} />

          <Route path="/addproject/" element={<AddPorjectPage />} />
          <Route path="/customer" element={<CustomerPage />} />
          <Route path="/addcustomer" element={<AddCustomerPage />} />
          <Route path="/work" element={<WorkFormPage />} />
          <Route path="/addwork" element={<AddWorkFormPage />} />
          <Route path="/sales" element={<SalesPage />} />
          <Route path="/sales/:id" element={<SalesViewPage />} />
          <Route path="/addsales" element={<AddSalesPage />} />
          <Route path="/maintenance" element={<MaintenancePage />} />
          <Route path="/webgl" element={<WebglPage />} />
          <Route path="/scrape" element={<ScrapePage />} />
          <Route path="/*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
