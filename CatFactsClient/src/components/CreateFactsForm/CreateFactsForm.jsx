import axios from 'axios';
import React, { useState, useMemo } from 'react';
import { useAuth } from '../../hooks/AuthProvider';
import './CreatFactsForm.scss';
import MyButton from '../common/MyButton/MyButton';
import MyAlert from '../common/MyAlert/MyAlert';
import { useAlert } from '../../hooks/AlertProvider';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

// TASK #4 : Manage app state using Context API and CRUD operations
// Use CRUD operatins
// Implement Responsive design
const CreateFactsForm = ({ newFactAdded, setNewFactAdded }) => {
  const { getToken } = useAuth();

  const token = useMemo(() => {
    return getToken();
  }, [getToken]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { alerts, addAlert } = useAlert();

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        'http://localhost:3000/api/facts/create',
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        // Handle success (e.g., show a success message)
        addAlert('Cat Fact Added 👍', 'success');
        reset();
        setNewFactAdded(!newFactAdded);
      } else {
        throw new Error();
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // Redirect to login page or handle unauthorized access
        addAlert('Unathorized access please log in first !!', 'danger');
        navigate('/login');
      } else {
        // Handle other errors (e.g., show an error message)
        console.error('Something bad happened! Please contact support.');
        addAlert('Something bad happened ! Please contact support !', 'danger');
      }
    }
  };
  return (
    <form className="add-fact-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="alerts-wrapper">
        {alerts.map((alert, index) => (
          <div key={alert.id} className="alerts-container">
            <MyAlert index={index} alertId={alert.id} />
          </div>
        ))}
      </div>

      <div className="add-fact-form-elements-container">
        {/* <label htmlFor="inputField">Enter your cat fact</label> */}
        <textarea
          type="text"
          id="inputField"
          name="newCatFact"
          placeholder="cats like marshmallow..."
          {...register('newCatFact', { required: true })}
        />
        {errors?.newCatFact && addAlert('errors.newCatFact.message', 'danger')}
        <MyButton text="Add Fact"></MyButton>
      </div>
    </form>
  );
};
export default CreateFactsForm;
