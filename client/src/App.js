import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Loader from './pages/Home/Loader';
import { useCallback, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, ReloadData, SetPortfolioData, ShowLoading } from './redux/rootSlice';
import Admin from './pages/Admin';
import Login from './pages/Admin/Login';
import Eye from './pages/Home/Eye';
function App() {
  const {loading,portfolioData,reloadData}=useSelector((state)=>state.root)
  const dispatch=useDispatch()
  const getportfolioData = useCallback(async () => {
    try{
      dispatch(ShowLoading())
      const response=await axios.get(`${process.env.REACT_APP_BACKEND}/portfolio/get-portfolio-data`)
      dispatch(SetPortfolioData(response.data))
      dispatch(ReloadData(false))
      dispatch(HideLoading())
    }
    catch(err){
      dispatch(HideLoading())    
    }
  }, [dispatch])
  useEffect(() => {
    if(!portfolioData){
    getportfolioData() } 
  },[portfolioData, getportfolioData])

  useEffect(() => {
    if(reloadData){
      getportfolioData()
    }
  },[reloadData, getportfolioData])

  return (
   <BrowserRouter>
   {loading && <Loader/>}
   <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/admin' element={<Admin/>} />
    <Route path='/admin-login' element={<Login/>} />
    <Route path='/eyes' element={<Eye/>} />

   </Routes>
   </BrowserRouter>
  )
}

export default App;
