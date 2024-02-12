import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import Axios from "axios";
import "./index.css";
// using yup for user validation
const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
});

function Login() {
  const navigate = useNavigate();
  const [isUser, setNouser] = useState(false);
  const [isValid, setPassOruserError] = useState(false);
  // initial values to update based on the user information
  const initialValues = {
    email: "",
    password: "",
  };
  // handling the login functionality
  const onSubmit = async (values, { setSubmitting }) => {
    // sending the data to the server and checking the rensponse form the server
    try {
      const response = await Axios.post(
        "http://localhost:3001/auth/login",
        values
      );
      const result = response.data;

      if (result.message === "User not found") {
        setNouser(true);
      } else if (result.message === "username or password is incorrect") {
        setPassOruserError(true);
      } else {
        // storing the jwt token and the userId in the local storage for later retrieval
        localStorage.setItem("token", result.token);
        localStorage.setItem("userId", result.userId);
        console.log("Login successful");
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
    }
  };
  // useFormik for getting the user information from the user
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="login-form-cont">
        <h1 className="login">Login</h1>
        <label>UserName</label>

        <input
          type="email"
          name="email"
          placeholder="Enter username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />

        {formik.touched.email && formik.errors.email && (
          <div style={{ color: "red" }}>{formik.errors.email}</div>
        )}

        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password && (
          <div style={{ color: "red" }}>{formik.errors.password}</div>
        )}
        <div className="d-flex justify-content-between align-items-center mobile-v-show">
          <p className="sn-su-cl">
            No account ? Click here to <Link to="/register">Register</Link>
          </p>
          <p>
            <a href="#">forgot password?</a>
          </p>
        </div>
        {isUser && (
          <p style={{ color: "red" }}>No user found please register</p>
        )}
        {isValid && (
          <p style={{ color: "red" }}>Username or Password is Incorrect</p>
        )}
        <button type="submit" disabled={formik.isSubmitting}>
          Log In
        </button>
      </form>
    </div>
  );
}

export default Login;
