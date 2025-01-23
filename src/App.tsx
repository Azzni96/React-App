import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router';
import Home from '../views/Home';
import Profile from '../views/Profile';
import Upload from '../views/Upload';
import Layout from './components/Layout';
import Single from '../views/Single';

const App = () => {
  return (
    <>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout/>}>
        <Route path='/' element={<Home />}/>
        <Route path='/profile' element={<Profile />} />
        <Route path='/upload' element={<Upload />} />
        <Route path='/single' element={<Single />} />
        </Route>
      </Routes>
      </BrowserRouter>

    </>
  );
};
export default App;
