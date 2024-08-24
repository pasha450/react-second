import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { BrowserRouter, Route, Routes} from 'react-router-dom';
import ViewSubmission from './pages/ViewSubmission';
import Reset from './pages/Reset';
import Activity from './components/Activity';
import PasswordSet from './pages/PasswordSet';

export default function App() {
  return (
   <BrowserRouter>
     <Routes>
        <Route path="/" element ={<Login/>}></Route>
       <Route path ='/register' element = {<Register/>}></Route>
       <Route path ='/login'  element ={<Login/>}></Route>
       <Route path ='/profile' element={<Profile/>}></Route>
       <Route path ='/viewSubmission' element ={<ViewSubmission/>}></Route>
       <Route path ='/reset' element ={<Reset/>}></Route>
       <Route path ='/activity' element ={<Activity/>}></Route>
       <Route path ='/reset-password/:token' element={<PasswordSet/>}></Route>
     </Routes>
   </BrowserRouter>
  );
}


