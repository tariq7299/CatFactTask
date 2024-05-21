import { usersCatApiInstance } from '../../helper/axiosInstances';
import React, { useState, useMemo } from 'react';
import { useAuth } from '../../hooks/AuthProvider';
import './CreatFactsForm.scss';
import CatButton from '../common/CatButton/CatButton';
import CatAlert from '../common/CatAlert/CatAlert';
import { useAlert } from '../../hooks/AlertProvider';
import { Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import errorHandler from '../../helper/helperFunctions';

// Importing usersFacts context
import { useUsersFacts } from '../../hooks/UsersFactsProvider';

// TASK #4 : Manage app state using Context API and CRUD operations
// Use CRUD operatins
// Implement Responsive design
const CreateFactsForm = () => {

  const { setUsersCatFacts } = useUsersFacts();


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // This is my notificitions and alerts, and here iam using Context API to provide alerts for my whole app
  const { alerts, addAlert } = useAlert();

  const navigate = useNavigate();


  // TASK #4 : Manage app state using Context API and CRUD operations
  // Use CRUD operatins
  const handleSubmittingNewFact = async (data) => {
    
    try {

      const response = await usersCatApiInstance.post('/facts/create', data);



      // This means that the fact got added successfully
      if (response.status === 200 || response.status === 201) {
        // Update the users cat facts state to be reflected on screen
        const newFact = response.data.newFact;
        setUsersCatFacts(prev => [...prev, newFact]);

        addAlert('Cat Fact Added 👍', 'success');
        reset();
      } else {
        throw new Error();
      }
    } catch (error) {
      errorHandler(error, addAlert, navigate)
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

      <form
        className="add-fact-form"
        onSubmit={handleSubmit(handleSubmittingNewFact)}
      >
        <div className="add-fact-form-elements-container">
          {errors?.newCatFact && (
            <span className="inputs-erros-message ">
              {errors.newCatFact.message}
            </span>
          )}

          <textarea
            type="text"
            id="newCatFact"
            name="newCatFact"
            placeholder="cats like marshmallow..."
            {...register('newCatFact', {
              required: "You can't provide an empty cat fact !",
            })}
          />
          {/* Show any unexcpectd */}

          <CatButton text="Add Fact"></CatButton>
        </div>
      </form>
    </>
  );
};
export default CreateFactsForm;
