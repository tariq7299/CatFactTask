import axios from 'axios';
import React, { useState, useMemo } from 'react';
import { useAuth } from '../../hooks/AuthProvider';
import './CreatFactsForm.scss';
import CatButton from '../common/CatButton/CatButton';
import CatAlert from '../common/CatAlert/CatAlert';
import { useAlert } from '../../hooks/AlertProvider';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

// TASK #4 : Manage app state using Context API and CRUD operations
// Use CRUD operatins
// Implement Responsive design
const CreateFactsForm = ({ newFactAdded, setNewFactAdded }) => {
  // This will get the token from Cookies and here im using Context API
  const { getToken } = useAuth();

  // Cache it for better performance
  const token = useMemo(() => {
    return getToken();
  }, [getToken]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // This is my notificitions and alerts, and here iam using Context API to provide alerts for my whole app
  const { alerts, addAlert } = useAlert();

  // This from React ROuter and it is used to change routes/pages
  const navigate = useNavigate();

  // TASK #4 : Manage app state using Context API and CRUD operations
// Use CRUD operatins
  const handleSubmittingNewFact = async (data) => {

    try {
      const response = await axios.post(
        'http://localhost:3000/api/facts/create',
        data,
        {
          // Iam sending my token in a header, for validation
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // This means that the fact got added successfully
      if (response.status === 200 || response.status === 201) {
        addAlert('Cat Fact Added 👍', 'success');
        reset();
        setNewFactAdded(!newFactAdded);
      } else {
        throw new Error();
      }
    } catch (error) {
      // THis would mean that the user is not logged in !!, so i will direct him to login page and show an alert also
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
    <>
    {/* This is my alerts and notificion ! doesn't matter where i would put this div as it with fixed position property */}
     <div className="alerts-wrapper">
        {alerts.map((alert, index) => (
          <div key={alert.id} className="alerts-container">
            <CatAlert index={index} alertId={alert.id} />
          </div>
        ))}
      </div>

    <form className="add-fact-form" onSubmit={handleSubmit(handleSubmittingNewFact)}>
      
      
      <div className="add-fact-form-elements-container">
      {errors?.newCatFact && <span className="inputs-erros-message ">{errors.newCatFact.message}</span>}

        <textarea
          type="text"
          id="newCatFact"
          name="newCatFact"
          placeholder="cats like marshmallow..."
          {...register('newCatFact', { required: "You can't provide an empty cat fact !" })}
          
        />
        {/* Show any unexcpectd */}
      
        <CatButton text="Add Fact"></CatButton>
      </div>
      
    </form>
    </>
   
  );
};
export default CreateFactsForm;
