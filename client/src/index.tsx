import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CompanyDashboard from './Pages/CompanyPage/CompanyDashboard';
// import CompanyForm from './Pages/CompanyPage/CompanyForm';
import NewCompanyForm from './Pages/CompanyPage/NewCompanyForm';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path='company' element={<CompanyDashboard />} />
          {/* <Route path='create' element={<CompanyForm />} /> */}
          <Route path='create' element={<NewCompanyForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
