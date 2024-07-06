import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/layouts/Layout.jsx';
import Module from './components/pages/Module.jsx';
import MyModules from './components/pages/MyModules.jsx';
import User from './components/pages/User.jsx';
import Users from './components/pages/Users.jsx';
import PageNotFound from './components/pages/404.jsx';

import './App.scss';

function App() {
  // Properties ----------------------------------

  // Hooks ---------------------------------------

  // Context -------------------------------------

  // Methods -------------------------------------
  
  // View ----------------------------------------
  return (
    <BrowserRouter basename='/mylearninglms'>
      <Layout>
        <Routes>
          <Route exact path='/' element={<MyModules />}/>
          <Route path='/modules/:id' element={<Module />}/>
          <Route path='/users/:id' element={<User />}/>
          <Route path='/users' element={<Users />}/>
          <Route path='*' element={<PageNotFound />}/>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;