import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    // if user is logged in then it wont allow to back to login
    if (user && user.token) {
      navigate("/");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    console.log(e);
    e.preventDefault();
    setLoading(true);
    const config = {
      url: process.env.REACT_APP_FORGET_PASSWORD_REDIRECT_URL,
      handleCodeInApp: true,
    };
    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        setEmail("");

        toast.success("Check your email for password reset link reset");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
        console.log(err, "isisdncvnvjn v");
        setLoading(false);
      });
  };
  return (
    <div className="container col-md-6 offset-md-3 p-5">
      {loading ? <h4>Loading..</h4> : <h4>Forget Password</h4>}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={"Your Email"}
          autoFocus
        />
        <br />
        <button className="btn btn-raised" disabled={!email}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgetPassword;
