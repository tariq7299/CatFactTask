import axios from 'axios';
import React, { useState } from 'react';
import { useAuth } from '../../hooks/AuthProvider';
import './CreatFactsForm.scss'
import MyButton from '../common/MyButton/MyButton';
import MyAlert from '../common/MyAlert/MyAlert';
import { useAlert } from '../../hooks/AlertProvider';

const CreateFactsForm = ({setNewFactAdded}) => {

    const { getToken } = useAuth() 
    const token = getToken()
    const { alerts, addAlert } = useAlert();

    
  const [formData, setFormData] = useState({
    newCatFact: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitingNewFact = async (e) => {
    e.preventDefault();


    try {

      if (formData.newCatFact === "") {
        addAlert("Cat fact can't be empty !", 'danger');
        return;
      }

        
        const response = await axios.post("http://localhost:3000/api/facts/create", formData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      
        if (response.status === 200 || response.status === 201) {
          addAlert('Your Cat fact was added successfully !!', 'success');
    
        } else {
          throw new Error();
        }
      } catch (error) {
        console.error(error);
        addAlert("Something bad happened ! Please contact support !", 'danger');
    }

    setFormData({
      newCatFact: '',
    });
    setNewFactAdded(true)

  };

  return (

    <form className='add-fact-form' onSubmit={handleSubmitingNewFact}>
 
 {alerts.map((alert, index) => (
  <div className='alerts-container'><MyAlert key={alert.id} index={index} alertId={alert.id} /></div>
        
      ))}
      <div className='add-fact-form-elements-container'>
        <label htmlFor="inputField">Enter your cat fact</label>
        <input
          type="text"
          id="inputField"
          name="newCatFact"
          placeholder='cats like marshmallow...'
          value={formData.newCatFact}
          onChange={handleInputChange}
        />
      <MyButton text="Add Fact" buttonColor="secondary-color" textColor="primary-font-color"></MyButton>
      </div>
    </form>

  );
};

export default CreateFactsForm;