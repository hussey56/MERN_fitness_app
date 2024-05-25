import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';

function App() {
  return (
   <>
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Login/>}/>
    <Route path={'/signup'} element={<Signup/>}/>
   </Routes>
   </BrowserRouter>
   </>
  ); 
}

export default App;
