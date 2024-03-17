import { Form, message } from 'antd'
import useSelection from 'antd/lib/table/hooks/useSelection'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HideLoading, ShowLoading } from '../../redux/rootSlice'
import axios from 'axios'

function AdminContact() {
    const dispatch=useDispatch()
    const {portfolioData}=useSelector((state)=>state.root)
    const onFinish = async(values) => {
       try{
        dispatch(ShowLoading())
        const response=await axios.post(`${process.env.REACT_APP_BACKEND}/portfolio/update-contact`,{...values,_id:portfolioData.contact._id})
        dispatch(HideLoading())
        if(response.data.success){
            message.success(response.data.message)
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
    <div>
        <Form onFinish={onFinish} layout="vertical" initialValues={portfolioData.contact}>
           
            <Form.Item name="name" label="Name">
                <input placeholder='Name'/>
            </Form.Item>
            <Form.Item name="gender" label="Gender">
                <input placeholder='gender'/>
            </Form.Item>
            <Form.Item name="age" label="Age">
                <input placeholder='Age'/>
            </Form.Item>
             <Form.Item name="email" label="Email">
                <input placeholder='Email'></input>
            </Form.Item>
            <Form.Item name="mobile" label="Mobile">
                <input placeholder='Mobile'></input>
            </Form.Item>
            <Form.Item name="address" label="Address">
                <input placeholder='Address'></input>
            </Form.Item>
            <div className="flex justify-center">
                <button className='px-5 py-2 bg-[#3380ac] text-white' type='submit' >SAVE</button>
            </div>
        </Form>
    </div>
  )
}

export default AdminContact