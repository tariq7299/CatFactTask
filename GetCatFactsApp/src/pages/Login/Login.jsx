import { useState } from "react";
import { useAuth } from "../../hooks/AuthProvider";
import "./Login.scss";
import ResponsiveCat from "../../components/ResponsiveCat/ResponsiveCat";


export default function Login() {
    

      const [input, setInput] = useState({
        username: "",
        password: "",
      });
      
      const auth = useAuth();

      const handleSubmitEvent = (e) => {
        e.preventDefault();
        if (input.username !== "" && input.password !== "") {
          auth.loginAction(input);
          return;
        }
        alert("please provide a valid input");
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
        <h1>Wellcome to my Cat Facts WebSite </h1>
        <ResponsiveCat></ResponsiveCat>
        </div>
        <form onSubmit={handleSubmitEvent}>
          <div className="form_control">
            <label htmlFor="user-username">Username:</label>
            <input
              type="text"
              id="user-username"
              name="username"
              placeholder="Enter your username"
              aria-describedby="user-username"
              aria-invalid="false"
              autoComplete="current-username"
              onChange={handleInput}
            />
            <div id="user-username" className="sr-only">
              Please enter a valid username. It must contain at least 6 characters.
            </div>
          </div>
          <div className="form_control">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              aria-describedby="user-password"
              aria-invalid="false"
              autoComplete="current-password"
              onChange={handleInput}
            />
            <div id="user-password" className="sr-only">
              your password should be more than 6 character
            </div>
          </div>
          <button className="btn-submit">Submit</button>
        </form>
        </div>
      );
    };