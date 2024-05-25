import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Signup from './Pages/Signup/Signup';
import Home from './Pages/Home/Home';
import { useSelector } from "react-redux";
import useAutoLogin from "./Hooks/useAutoLogin";
import Loader from './Components/Loader/Loader'
function App() {
  const isAuth = useSelector((state)=>state.user.auth);
  const loading = useAutoLogin();

  return (
    loading ? <Loader text={'...'}/> :
   <>
   <BrowserRouter>
   <Routes>
    <Route path='/' exact element={isAuth?<Home/>:<Login/>}/>
    <Route path={'/signup'} exact element={isAuth?<Home/>:<Signup/>}/>
   </Routes>
   </BrowserRouter>
   </>);
  
}

export default App;
