import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Loader from './pages/Home/Loader';
import { useEffect, useState } from 'react';
import { get } from 'mongoose';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, ReloadData, SetPortfolioData, ShowLoading } from './redux/rootSlice';
import Admin from './pages/Admin';
import Login from './pages/Admin/Login';
function App() {
  const {loading,portfolioData,reloadData}=useSelector((state)=>state.root)
  const dispatch=useDispatch()
  const getportfolioData = async () => {
    try{
      dispatch(ShowLoading())
      const response=await axios.get("http://localhost:5000/portfolio/get-portfolio-data")
      dispatch(SetPortfolioData(response.data))
      dispatch(ReloadData(false))
      dispatch(HideLoading())
    }
    catch(err){
      dispatch(HideLoading())    
    }
  }
  useEffect(() => {
    if(!portfolioData){
    getportfolioData() } 
  },[portfolioData])

  useEffect(() => {
    if(reloadData){
      getportfolioData()
    }
  },[reloadData])

  return (
   <BrowserRouter>
   {loading && <Loader/>}
   <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/admin' element={<Admin/>} />
    <Route path='/admin-login' element={<Login/>} />

   </Routes>
   </BrowserRouter>
  )
}

export default App;
