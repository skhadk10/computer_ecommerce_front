import React, { useState, useEffect } from "react";
import { auth, googleAuthProvider } from "../../firebase.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button } from "antd";
import { GoogleOutlined, MailOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createOrUpdateUser } from "../../functions/auth/auth.js";

const Login = () => {
  const [email, setEmail] = useState("rickeykhd@gmail.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // if user is logged in then it wont allow to back to login
    if (user && user.token) {
      navigate("/");
    }
  }, [user,navigate]);

  const roleBasedRedirect = (res) => {
    console.log(res.data.role,"helllll>>>>>>>>>")
    if (res.data.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/user/history");
    }
  };

  
  const handlesubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(email, password);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      console.log(result, "result");
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      console.log("hello token result", idTokenResult.token);

      await createOrUpdateUser(idTokenResult.token).then((res) => {
        dispatch({
          type: "LOGGED_IN_USER",
          payload: {
            name: res.data.name,
            email: user.email,
            token: idTokenResult.token,
            role: res.data.role,
            _id: res.data._id,
          },
        });
        roleBasedRedirect(res);
      });

      // navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
        await createOrUpdateUser(idTokenResult.token).then((res) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name,
              email: user.email,
              token: idTokenResult.token,
              role: res.data.role,
              _id: res.data._id,
            },
          });
          console.log(res,"success")
          roleBasedRedirect(res);
        });
        // navigate("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
      });
  };
  const loginForm = () => {
    return (
      <form>
        <div className="form-group">
          <input
            type="text"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your Email"
            autoFocus
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your Password"
          />
        </div>
        <br />
        <Button
          onClick={handlesubmit}
          type="primary"
          block
          shape="round"
          icon={<MailOutlined />}
          size="large"
          disabled={!email || password.length < 6}
          className="mb-3"
        >
          Login with Email/Password
        </Button>
      </form>
    );
  };
  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {loading ? (
            <h4 className="text-danger">loading... </h4>
          ) : (
            <h4>Login</h4>
          )}
          {loginForm()}
          <Button
            onClick={googleLogin}
            type="primary"
            danger
            block
            shape="round"
            icon={<GoogleOutlined />}
            size="large"
            className="mb-3"
          >
            Login with Google
          </Button>
          <Link to="/forgot/password" className="float-right text-danger">
            Forget Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
