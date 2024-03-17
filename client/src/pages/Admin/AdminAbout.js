import { Form, message } from 'antd'
import useSelection from 'antd/lib/table/hooks/useSelection'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { HideLoading, ShowLoading } from '../../redux/rootSlice'
import axios from 'axios'

function AdminIntro() {
    const dispatch=useDispatch()
    const {portfolioData}=useSelector((state)=>state.root)
    const onFinish = async(values) => {
       try{
        const tempSkills=values.skills.split(",")
        values.skills=tempSkills
        dispatch(ShowLoading())
        const response=await axios.post(`${process.env.REACT_APP_BACKEND}/portfolio/update-about`,{...values,_id:portfolioData.about._id})
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
        <Form onFinish={onFinish} layout="vertical" initialValues={{...portfolioData.about,skills:portfolioData.about.skills.join(",")}}>
            <Form.Item name="lottieUrl" label="Lottie Url">
                <input placeholder='Lottie Url'/>
            </Form.Item>
             <Form.Item name="description1" label="Description1">
                <textarea placeholder='Description1' cols="30" rows="10"></textarea>
            </Form.Item>
            <Form.Item name="description2" label="Description2">
                <textarea placeholder='Description2' cols="30" rows="10"></textarea>
            </Form.Item>
            <Form.Item name="skills" label="Skills">
                <input placeholder='Skills'/>
            </Form.Item>
            <div className="flex justify-center">
                <button className='px-5 py-2 bg-[#3380ac] text-white' type='submit' >SAVE</button>
            </div>
        </Form>
    </div>
  )
}

export default AdminIntro