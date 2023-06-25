import React, { useState } from "react";
import { auth } from "../../firebase.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Register = () => {
  const [email, setEmail] = useState("");

  const handlesubmit = async (e) => {
    e.preventDefault();
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };
    await auth.sendSignInLinkToEmail(email, config);
    toast.success(
      `Email is sent to ${email}. CLick the Link to complete your registration`
    );
     // save user email in local storage
     window.localStorage.setItem("emailForRegistration", email);
     // clear state
     setEmail("");
  };
  const RegisterForm = () => {
    return (
      <form onSubmit={handlesubmit}>
        <input
          type="text"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your Email"
          autoFocus
        />
        <br/>
        <button type="submit" className="btn btn-raised">
          Register
        </button>
      </form>
    );
  };
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          {RegisterForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
