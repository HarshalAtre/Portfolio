import { Form, Modal, message, Input } from 'antd';
import FormItem from 'antd/es/form/FormItem';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, ReloadData, ShowLoading } from '../../redux/rootSlice';
import axios from 'axios';

function AdminCourses() {
    const dispatch = useDispatch();
    const { portfolioData } = useSelector(state => state.root);
    const { courses } = portfolioData;
    const [showAddEditModel, setShowAddEditModel] = useState(false);
    const [selectedItemForEdit, setSelectedItemForEdit] = useState(null);
    const [form]=Form.useForm();
    const onFinish = async (values) => {
        try {
            const tempTech=values?.technologies?.split(',');
            values.technologies=tempTech;
            dispatch(ShowLoading());
            let response;
            if (selectedItemForEdit) {
                response = await axios.post(`${process.env.REACT_APP_BACKEND}/portfolio/update-course`, { ...values, _id: selectedItemForEdit._id });
            } else {
                response = await axios.post(`${process.env.REACT_APP_BACKEND}/portfolio/add-course`, values);
            }
            dispatch(HideLoading());
            if (response.data.success) {
                message.success(response.data.message);
                setShowAddEditModel(false);
                setSelectedItemForEdit(null);
                dispatch(ReloadData(true));
                form.resetFields()
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    const onDelete = async (item) => {
        try {
            dispatch(ShowLoading());
            const response = await axios.post(`${process.env.REACT_APP_BACKEND}/portfolio/delete-course`, { _id: item._id });
            dispatch(HideLoading());
            if (response.data.success) {
                message.success(response.data.message);
                dispatch(HideLoading());
                dispatch(ReloadData(true));
            } else {
                message.error(response.data.message);
            }
        } catch (error) {
            dispatch(HideLoading());
            message.error(error.message);
        }
    };

    return (
        <>
            <div className="flex justify-end">
                <button className='bg-primary text-white m-2 px-4 py-2 rounded' onClick={() => setShowAddEditModel(true)}>Add Course</button>
            </div>
            <div className="grid grid-cols-4 gap-5 sm:grid-cols-1">
            {courses.map((course) => (
    <div key={course._id} className="shadow border p-5 border-gray-400">
        <h1 className='text-secondary font-bold text-xl'>{course.title}</h1>
        <img src={course.images} alt="" />
        <h1>{course.title}</h1>
        <h1>{course.description}</h1>
        <div className="flex button-container justify-around">
            <button className='bg-primary text-white px-5 py-2' onClick={() => { setSelectedItemForEdit(course); setShowAddEditModel(true); }}>Edit</button>
            <button className='bg-[#f23d3d] text-white px-5 py-2' onClick={() => onDelete(course)}>Delete</button>
        </div>
    </div>
))}

            </div>

            {(selectedItemForEdit || !selectedItemForEdit) && (
                <Modal visible={showAddEditModel} footer={null} title={selectedItemForEdit ? "Edit Experience" : "Add Experience"} onCancel={() => { setShowAddEditModel(false); setSelectedItemForEdit(null) }}>
                    <Form form={form} layout='vertical' onFinish={onFinish} initialValues={selectedItemForEdit}>
                        <FormItem name="title" label="title">
                            <Input placeholder='Title' />
                        </FormItem>
                        <FormItem name="images" label="image">
                            <Input placeholder='Image' />
                        </FormItem>
                        <FormItem name="description" label="description">
                            <Input.TextArea placeholder='Description' />
                        </FormItem>
                        <FormItem name="link" label="Link">
                            <Input placeholder='Link'/>
                        </FormItem>
                        <FormItem name="technologies" label="Technologies">
                            <Input placeholder='Technologies' />
                        </FormItem>
                        <div className="flex gap-10 justify-end">
                            <button className='bg-[#f44545] text-white px-5 py-2' onClick={() => { setShowAddEditModel(false);setSelectedItemForEdit(null) }}>Cancel</button>
                            <button className='bg-primary text-white px-5 py-2'>{selectedItemForEdit ? "Update" : "Add"}</button>
                        </div>
                    </Form>
                </Modal>
            )}
        </>
    );
}

export default AdminCourses;
