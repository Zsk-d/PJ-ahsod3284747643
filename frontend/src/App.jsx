import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminReg from './pages/AdminReg';

function App () {
  return (
    <div>
      <div>
        <Router>
          <div className="App">
            <Routes>
              <Route path='/' element={<Home />}></Route>
              <Route path='/admin-login' element={<AdminLogin />}></Route>
              <Route path='/admin-reg' element={<AdminReg />}></Route>
            </Routes>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
