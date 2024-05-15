import { useState } from 'react';
import { useAuth } from '../../hooks/AuthProvider';
import './Login.scss';
import ResponsiveCat from '../../components/ResponsiveCat/ResponsiveCat';
import MyButton from '../../components/common/MyButton/MyButton';
import MyAlert from '../../components/common/MyAlert/MyAlert';
import { useAlert } from '../../hooks/AlertProvider';

//  TASK #4 : Manage app state using Context API and CRUD operations
//                     Use CRUD operatins
//                     Implement Responsive design
export default function Login() {
  const { alerts, addAlert } = useAlert();

  const [input, setInput] = useState({
    username: '',
    password: '',
  });

  const auth = useAuth();

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    if (input.username !== '' && input.password !== '') {
      auth.logIn(input);
      return;
    }
    addAlert("Username/Password can't be empty 🤓", 'danger');
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      <form className="login-form" onSubmit={handleSubmitEvent}>
        <div className="form_control">
          <label htmlFor="user-username">Username</label>
          <input
            type="text"
            id="user-username"
            name="username"
            placeholder="catman99..."
            aria-describedby="user-username"
            aria-invalid="false"
            autoComplete="current-username"
            onChange={handleInput}
          />
        </div>
        <div className="form_control">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="1122 (maybe)"
            aria-describedby="user-password"
            aria-invalid="false"
            autoComplete="current-password"
            onChange={handleInput}
          />
        </div>
        <div className="get-started-button-wrapper"></div>
        <MyButton
          className="get-started-button"
          text="Lets Goo!"
          buttonColor="secondary-color"
          textColor="primary-font-color"
        ></MyButton>
      </form>
    </div>
  );
}
