import React, { useEffect } from 'react'
import Header from '../../components/Header'
import {Tabs} from "antd"
import AdminIntro from './AdminIntro';
import AdminAbout from './AdminAbout';
import { useSelector } from 'react-redux';
import Experience from './Experience';
import AdminProject from './AdminProject';
import AdminCourses from './AdminCourses';
import AdminContact from './AdminContact';
const {TabPane} = Tabs;

function Admin() {
  const logout=()=>{
    localStorage.removeItem("token")
    window.location.href="/admin-login"
  }
    const {portfolioData}=useSelector((state)=>state.root)
    useEffect(() => {
    if(!localStorage.getItem("token")){
      window.location.href="/admin-login"
    }
    }, [])
    
  return (
   <>
   <Header/>
     <div className='m-5'>
      <div className='flex justify-between'>
        <h1 className='text-2xl font-semibold'>Portfolio Admin</h1>
<button className=' text-white px-5 py-2 bg-secondary cursor-pointer' onClick={logout}>Logout</button>
      </div>
    {portfolioData&& (<Tabs defaultActiveKey="1">
    <Tabs.TabPane tab="Intro" key="1">
      <AdminIntro/>
    </Tabs.TabPane>
    <Tabs.TabPane tab="About" key="2">
      <AdminAbout/>
    </Tabs.TabPane>
    <Tabs.TabPane tab="Experience" key="3">
      <Experience/>
    </Tabs.TabPane>
    <Tabs.TabPane tab="Projects" key="4">
      <AdminProject/>
    </Tabs.TabPane>
    <Tabs.TabPane tab="Courses" key="5">
      <AdminCourses/>
    </Tabs.TabPane><Tabs.TabPane tab="Contact" key="6">
      <AdminContact/>
    </Tabs.TabPane>

  </Tabs>) }
     </div>
   </>
  )
}

export default Admin