import { useState } from 'react';
import { useAuth } from '../../hooks/AuthProvider';
import './Login.scss';
import ResponsiveCat from '../../components/ResponsiveCat/ResponsiveCat';
import MyButton from '../../components/common/MyButton/MyButton';
import MyAlert from '../../components/common/MyAlert/MyAlert';
import { useAlert } from '../../hooks/AlertProvider';
import { useForm } from 'react-hook-form';

//  TASK #4 : Manage app state using Context API and CRUD operations
//                     Use CRUD operatins
//                     Implement Responsive design
export default function Login() {
  const { alerts, addAlert } = useAlert();
  const auth = useAuth();
  const { register, handleSubmit, errors } = useForm();


  const onSubmit = (data) => {

    console.log(data);
    auth.logIn(data);
  };

  return (

    <div className="parent-container">
    <div className="header-container">
      <h1>Wellcome to my <br></br><span>Cat Facts</span> <br></br>WebSite </h1>
      <ResponsiveCat></ResponsiveCat>
    </div>

    {alerts.map((alert, index) => (
        <MyAlert key={alert.id} index={index} alertId={alert.id} />
      ))}
      
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form_control">
        <label htmlFor="user-username">Username</label>
        <input
          type="text"
          id="user-username"
          name="username"
          placeholder="catman99..."
          {...register('username', { required: 'Username is required' })}
          autoComplete="current-username"
        />
        {errors?.username && addAlert("errors.username.message", 'danger')}
        
      </div>
      <div className="form_control">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="1122 (maybe)"
          {...register('password', { required: 'Password is required' })}
          autoComplete="current-password"
        />
        {errors?.password && addAlert("errors.password.message", 'danger')}
      </div>
      <div className="get-started-button-wrapper">
      <MyButton
          className="get-started-button"
          text="Lets Goo!"
          buttonColor="secondary-color"
          textColor="primary-font-color"
        ></MyButton>
      </div>
    </form>
    </div>
  );
}