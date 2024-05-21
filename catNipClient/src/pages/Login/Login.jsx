import { useState } from 'react';
import { useAuth } from '../../hooks/AuthProvider';
import './Login.scss';
import ResponsiveCat from '../../components/ResponsiveCat/ResponsiveCat';
import CatButton from '../../components/common/CatButton/CatButton';
import { useForm } from 'react-hook-form';

//  TASK #4 : Manage app state using Context API and CRUD operations
//                     Use CRUD operatins
//                     Implement Responsive design
export default function Login() {
  const auth = useAuth();
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    auth.logIn(data);
  };

  return (
    <div className="parent-container">
      <div className="header-container">
        <h1>
          Welcome to the<br></br>
          <span>Catnip Club</span>
        </h1>
        <ResponsiveCat></ResponsiveCat>
      </div>
     
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="form_control">
          <label htmlFor="user-username">Whisker-worthy Username</label>
          <input
            type="text"
            id="user-username"
            name="username"
            placeholder="catman99..."
            {...register('username', { required: 'Username is required' })}
            autoComplete="current-username"
          />
          {errors?.username && (
            <span className="inputs-erros-message ">
              {errors.username.message}
            </span>
          )}
        </div>
        <div className="form_control">
          <label htmlFor="password">Pawsitive Passcode🔒</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="1122 (maybe)"
            {...register('password', { required: 'Password is required' })}
            autoComplete="current-password"
          />
          {errors?.password && (
            <span className="inputs-erros-message ">
              {errors.password.message}
            </span>
          )}
        </div>
        <div className="get-started-button-wrapper">
          <div className="cat-button get-started-button">
            <div className=" get-started-button">
              <CatButton
                className="cat-button get-started-button"
                text="Lets Goo❕"
              ></CatButton>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
