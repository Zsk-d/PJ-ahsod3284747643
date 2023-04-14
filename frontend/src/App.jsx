import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom'

import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminReg from './pages/AdminReg';
import AdminMain from './pages/AdminMain';
import QuizMain from './pages/QuizMain';

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
              <Route path='/admin-main' element={<AdminMain />}></Route>
              <Route path='/quiz-main' element={<QuizMain />}></Route>
            </Routes>
          </div>
        </Router>
      </div>
    </div>
  );
}

export default App;
