import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ListView from './pages/ListView/ListView';
import ListDetailView from './pages/ListDetailView/ListDetailView';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <ToastContainer/>
      <BrowserRouter>
        <Routes >
          <Route path="/app/login" element={<Login/>} />
          <Route path="/app/register" element={<Register/>} />
          <Route path="/app/list" element={<ListView/>} />
          <Route path="/app/listdetails" element={<ListDetailView/>} />
          <Route path="*" element={<Navigate replace to="/app/login" />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
