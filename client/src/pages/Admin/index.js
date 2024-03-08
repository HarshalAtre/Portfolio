import React from 'react'
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
    const {portfolioData}=useSelector((state)=>state.root)
  return (
   <>
   <Header/>
     <div className='m-5'>
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