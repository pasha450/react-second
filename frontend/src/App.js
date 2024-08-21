import './App.css';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import { BrowserRouter, Route, Routes} from 'react-router-dom';

export default function App() {
  return (
   <BrowserRouter>
     <Routes>
       <Route path ='/register' element = {<Register/>}></Route>
       <Route path ='/login'  element ={<Login/>}></Route>
       <Route path ='/profile' element={<Profile/>}></Route>
       
     </Routes>
   </BrowserRouter>
  );
}


