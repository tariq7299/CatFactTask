import axios from 'axios';
import React, { useState } from 'react';
import { useAuth } from '../../hooks/AuthProvider';
import './CreatFactsForm.scss'
import MyButton from '../../components/common/MyButton/MyButton';

const CreateFactsForm = ({setNewFactAdded}) => {

    const { getToken } = useAuth() 

    const token = getToken()

    console.log("token", token)
    
  const [formData, setFormData] = useState({
    newCatFact: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('Form submitted with data:', formData);

    try {
        
        const response = await axios.post("http://localhost:3000/api/facts/create", formData, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      
        if (response.status === 200 || response.status === 201) {
          alert("catfact added successfully!");
        } else {
          throw new Error("Something went wrong");
        }
      } catch (error) {
        console.error(error);
        alert("Something bad happened");
    }

    setFormData({
      newCatFact: '',
    });
    setNewFactAdded(true)



  };

  return (

    <form className='add-fact-form' onSubmit={handleSubmit}>
      <div className='add-fact-form-elements-container'>
        <label htmlFor="inputField">Enter your cat fact</label>
        <input
          type="text"
          id="inputField"
          name="newCatFact"
          value={formData.newCatFact}
          onChange={handleInputChange}
        />
      <MyButton text="Add Fact" buttonColor="secondary-color" textColor="primary-font-color"></MyButton>
      </div>
    </form>

  );
};

export default CreateFactsForm;