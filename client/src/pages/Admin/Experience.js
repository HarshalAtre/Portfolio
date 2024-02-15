import { Form, Modal, message } from 'antd'
import FormItem from 'antd/es/form/FormItem'
import { Model } from 'mongoose'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HideLoading, ReloadData, ShowLoading } from '../../redux/rootSlice'
import axios from 'axios'

function Experience() {
  const dispatch=useDispatch()
  const {portfolioData}=useSelector((state)=>state.root)
  const {experience}=portfolioData
  const [showAddEditModel,setShowAddEditModel]=React.useState(false)
  const [selectedItemForEdit,setSelectedItemForEdit]=React.useState(null)
  const onFinish = async(values) => {
    try{
     dispatch(ShowLoading())
     const response=await axios.post('http://localhost:5000/portfolio/add-experience',values)
     dispatch(HideLoading())
     if(response.data.success){
         message.success(response.data.message)
         setShowAddEditModel(false)
         dispatch(HideLoading())
         dispatch(ReloadData(true))
     }
     else{
         message.error(response.data.message)
     }
    }
    catch(error){
     dispatch(HideLoading())
        message.error(error.message)
    }
 }
  


  return (
    <>
    <div className="flex justify-end">
      <button className='bg-primary text-white px-4 py-2 rounded' onClick={()=>setShowAddEditModel(true)}>Add Experience</button>
    </div>
    <div className="grid grid-cols-4 gap-5">
      {experience.map((experience)=>(
       <div className="shadow border p-5 border-gray-400">
       <h1 className='text-secondary font-bold text-xl'>{experience.period}</h1>
       <h1 >{experience.company}</h1>
       <h1 >{experience.title}</h1>
       <h1 >{experience.description}</h1>
        <div className="flex button-container justify-around">
         <button className='bg-primary text-white px-5 py-2 '>Edit</button>
         <button className='bg-[#f23d3d] text-white px-5 py-2 '>Delete</button>

        </div>
       </div>
      ))
    }
        <Modal visible={showAddEditModel} footer={null}
             title={selectedItemForEdit ? "Edit Experience":"Add Experience"}
             onCancel={()=>{setShowAddEditModel(false)}}>
          <Form layout='vertical' onFinish={onFinish}>
            <FormItem name="period" label="Period">
              <input type="text" placeholder='Period' />
            </FormItem>
            <FormItem name="company" label="Company">
              <input type="text" placeholder='Company' />
            </FormItem>
            <FormItem name="title" label="Title">
              <input type="text" placeholder='Title' />
            </FormItem>
            <FormItem name="description" label="Description">
              <input type="text" placeholder='Description' />
            </FormItem>
            <div className="flex gap-10 justify-end">
            <button className='bg-[#f44545] text-white px-5 py-2 ' onClick={()=>{setShowAddEditModel(false)}}>Cancel</button>
              <button className='bg-primary text-white px-5 py-2 '>{selectedItemForEdit?"Update":"Add"}</button>
            </div>
          </Form>
        </Modal>
    </div>
    </>
  )
}

export default Experience