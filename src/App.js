import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/layouts/Layout';
import MyAssessments from './components/pages/MyAssessments';
import MySchedule from './components/pages/MySchedule';
import MyModules from './components/pages/MyModules';
import Students from './components/pages/Students';
import PageNotFound from './components/pages/404';

import './App.scss';

function App() {
  // Properties ----------------------------------

  // Hooks ---------------------------------------

  // Context -------------------------------------

  // Methods -------------------------------------
  
  // View ----------------------------------------
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route exact path='/' element={<MyModules />}/>
          <Route path='/myassessments' element={<MyAssessments />}/>
          <Route path='/myschedule' element={<MySchedule />}/>
          <Route path='/students' element={<Students />}/>
          <Route path='*' element={<PageNotFound />}/>
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;