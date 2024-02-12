import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import Axios from "axios";
import "./index.css";

// we use yup for validating the user actions
const YupValidations = yup.object().shape({
  name: yup.string().required("Name is required"),
  number: yup.string().required("Mobile numberis required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password is too short - should be 8 chars minimum.")
    .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
});

function Registration() {
  const navigate = useNavigate();
  const [name, setName] = useState();
  const [number, setNumber] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isUser, setUserError] = useState(false);
  // to send the data to the server
  const postData = {
    name,
    number,
    email,
    password,
  };
  // initial values of the input fields
  const initialValues = {
    name: "",
    number: "",
    email: "",
    password: "",
  };
  // handling the user information and setting that data to the state based on the action name
  const handleFormChange = (event, props) => {
    const { name, value } = event.target;
    props.handleChange(event);
    if (name === "name") {
      setName(value);
    } else if (name === "number") {
      setNumber(value);
    } else if (name === "email") {
      setEmail(value);
    } else if (name === "password") {
      setPassword(value);
    }
  };
  // handling the submit of the user data
  const handleSubmit = async (e) => {
    // console.log(postData);
    // sending the data to the server using post method
    try {
      const response = await Axios.post(
        "http://localhost:3001/auth/register",
        postData
      );
      const result = await response.data;
      // checking the response if it is ok
      if (result.message === "User saved successfully") {
        navigate("/login");
      }
      // if the user already exits setting the state to true
      if (result.message === "User already exists!") {
        setUserError(true);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="form-main-container">
      <h1 className="heading">Registration Form</h1>
      {/* using the formik for handling the errors and onblur,onchange actions */}
      <Formik
        initialValues={initialValues}
        validationSchema={YupValidations}
        onSubmit={handleSubmit}
      >
        {(props) => (
          <Form
            onSubmit={props.handleSubmit}
            className="d-flex flex-column justify-content-center form-conteiner"
          >
            <label className="form-label">User Name</label>
            <Field
              className="field"
              label="Username"
              name="name"
              type="text"
              placeholder="Enter Name"
              varieant="outlined"
              margin="dense"
              onChange={(e) => handleFormChange(e, props)}
              onBlur={props.handleBlur}
              value={props.values.name}
            />
            <ErrorMessage
              name="name"
              render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
            />
            <label className="form-label">Mobile number</label>
            <Field
              className="field"
              label="Number"
              name="number"
              type="tel"
              placeholder="Enter Mobile Number"
              varieant="outlined"
              margin="dense"
              onChange={(e) => handleFormChange(e, props)}
              onBlur={props.handleBlur}
              value={props.values.number}
            />
            <ErrorMessage
              name="number"
              render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
            />
            <label className="form-label">Email</label>
            <Field
              className="field"
              label="Email"
              name="email"
              type="email"
              placeholder="Enter Email"
              varieant="outlined"
              margin="dense"
              onChange={(e) => handleFormChange(e, props)}
              onBlur={props.handleBlur}
              value={props.values.email}
            />
            <ErrorMessage
              name="email"
              render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
            />
            <label className="form-label">Password</label>
            <Field
              className="field"
              label="Password"
              name="password"
              type="password"
              placeholder="Enter Password"
              varieant="outlined"
              margin="dense"
              onChange={(e) => handleFormChange(e, props)}
              onBlur={props.handleBlur}
              value={props.values.password}
            />
            <ErrorMessage
              name="password"
              render={(msg) => <div style={{ color: "red" }}>{msg}</div>}
            />
            {/* if user has already loged in then when he clicks on login then he will navigate to the login page */}
            <p className="to-login-anc">
              Click here to <Link to="/login">Login</Link>
              ,if you already have an account
            </p>
            {/* is isUser is true the message will be displayed */}
            {isUser && (
              <p style={{ color: "red" }}>User already exists please login</p>
            )}
            <button type="submit" className="signupbtn">
              Register
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Registration;
