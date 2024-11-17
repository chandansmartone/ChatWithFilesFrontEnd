import { useState } from 'react';
import LoginForm from './pages/Login';
import Home from './pages/Home';
import PrivateRoutes from './Utils/PrivateRoutes';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [username, setUserName] = useState('username');

  return (
    <>
      <Router>
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Home username={username} />} />
          </Route>
          <Route path="/login" element={<LoginForm setUserName={setUserName} />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      </Router>
    </>
  );
}

export default App;
