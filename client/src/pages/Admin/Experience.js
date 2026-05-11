import { Checkbox, Form, Modal, message } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, ReloadData, ShowLoading } from '../../redux/rootSlice';
import axios from 'axios';
import {
  encodePeriod,
  formatPeriod,
  sortExperienceByDate,
  toFormInitialValues,
} from '../../utils/experienceDates';

function Experience() {
  const dispatch = useDispatch();
  const { portfolioData } = useSelector((state) => state.root);
  const experience = sortExperienceByDate(portfolioData?.experience || []);
  const [showAddEditModel, setShowAddEditModel] = React.useState(false);
  const [selectedItemForEdit, setSelectedItemForEdit] = React.useState(null);

  const onFinish = async values => {
    try {
      if (!values.startDate) {
        message.error('Start date is required');
        return;
      }
      if (!values.isPresent && !values.endDate) {
        message.error('End date is required unless Present is checked');
        return;
      }
      if (!values.isPresent && values.endDate < values.startDate) {
        message.error('End date must be after start date');
        return;
      }

      dispatch(ShowLoading());
      const payload = {
        title: values.title,
        company: values.company,
        description: values.description,
        period: encodePeriod(values.startDate, values.endDate, values.isPresent),
      };

      let response;
      if (selectedItemForEdit) {
        response = await axios.post(`${process.env.REACT_APP_BACKEND}/portfolio/update-experience`, {
          ...payload,
          _id: selectedItemForEdit._id,
        });
      } else {
        response = await axios.post(`${process.env.REACT_APP_BACKEND}/portfolio/add-experience`, payload);
      }

      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
        setShowAddEditModel(false);
        setSelectedItemForEdit(null);
        dispatch(ReloadData(true));
      } else {
        message.error(response.data.message);
      }
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const onDelete = async item => {
    try {
      dispatch(ShowLoading());
      const response = await axios.post(`${process.env.REACT_APP_BACKEND}/portfolio/delete-experience`, {
        _id: item._id,
      });
      dispatch(HideLoading());
      if (response.data.success) {
        message.success(response.data.message);
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
        <button
          className="bg-primary text-white m-2 px-4 py-2 rounded"
          onClick={() => {
            setSelectedItemForEdit(null);
            setShowAddEditModel(true);
          }}
        >
          Add Experience
        </button>
      </div>

      <div className="grid grid-cols-4 gap-5 sm:grid-cols-1">
        {experience.map(item => (
          <div key={item._id} className="shadow border p-5 border-gray-400">
            <h1 className="text-secondary font-bold text-xl">{formatPeriod(item.period)}</h1>
            <h1>{item.company}</h1>
            <h1>{item.title}</h1>
            <h1>{item.description}</h1>
            <div className="flex button-container justify-around">
              <button
                className="bg-primary text-white px-5 py-2"
                onClick={() => {
                  setSelectedItemForEdit(item);
                  setShowAddEditModel(true);
                }}
              >
                Edit
              </button>
              <button className="bg-[#f23d3d] text-white px-5 py-2" onClick={() => onDelete(item)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showAddEditModel && (
        <Modal
          open={showAddEditModel}
          footer={null}
          title={selectedItemForEdit ? 'Edit Experience' : 'Add Experience'}
          onCancel={() => {
            setShowAddEditModel(false);
            setSelectedItemForEdit(null);
          }}
        >
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={toFormInitialValues(selectedItemForEdit)}
          >
            <Form.Item name="startDate" label="Start Date" rules={[{ required: true }]}>
              <input type="month" />
            </Form.Item>

            <Form.Item name="isPresent" valuePropName="checked">
              <Checkbox>Present</Checkbox>
            </Form.Item>

            <Form.Item shouldUpdate noStyle>
              {({ getFieldValue }) =>
                !getFieldValue('isPresent') ? (
                  <Form.Item name="endDate" label="End Date" rules={[{ required: true }]}>
                    <input type="month" />
                  </Form.Item>
                ) : null
              }
            </Form.Item>

            <Form.Item name="company" label="Company" rules={[{ required: true }]}>
              <input type="text" placeholder="Company" />
            </Form.Item>
            <Form.Item name="title" label="Title" rules={[{ required: true }]}>
              <input type="text" placeholder="Title" />
            </Form.Item>
            <Form.Item name="description" label="Description" rules={[{ required: true }]}>
              <textarea placeholder="Description" rows={6} />
            </Form.Item>
            <div className="flex gap-10 justify-end">
              <button
                type="button"
                className="bg-[#f44545] text-white px-5 py-2"
                onClick={() => {
                  setShowAddEditModel(false);
                  setSelectedItemForEdit(null);
                }}
              >
                Cancel
              </button>
              <button className="bg-primary text-white px-5 py-2">
                {selectedItemForEdit ? 'Update' : 'Add'}
              </button>
            </div>
          </Form>
        </Modal>
      )}
    </>
  );
}

export default Experience;
