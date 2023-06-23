import { useFormik } from "formik";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { useState } from "react";
import { Link } from "react-router-dom";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";

function RegisterForm() {
  const registerURL = "http://localhost:3001/api/users/signup";
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { getLoggedIn } = useContext(UserContext);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      console.log(values);
      try {
        await axios.post(registerURL, values);
        getLoggedIn();
      } catch (error) {
        setError(error.response.data.error);
      }
    },
  });
  return (
    <div className="loginPage">
      <h3>Registration</h3>
      <form onSubmit={formik.handleSubmit} className="loginForm">
        <input
          type="text"
          className="loginInput"
          placeholder="Vardas"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        <input
          type="email"
          className="loginInput"
          placeholder="El. paštas"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        <span style={{ position: "relative" }}>
          <input
            type={showPassword ? "text" : "password"}
            className="loginInput"
            placeholder="Slaptažodis"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          <span
            onClick={togglePasswordVisibility}
            style={{
              cursor: "pointer",
              position: "absolute",
              right: "40px",
              top: "26px",
            }}
            className="password-icon"
          >
            {showPassword ? <RiEyeOffFill /> : <RiEyeFill />}
          </span>
        </span>
        <button type="submit" className="gradient-class">
          Register
        </button>
        <Link to="/" className="backLink">
          Back
        </Link>
      </form>
      <div className="error">{error}</div>
    </div>
  );
}

export default RegisterForm;
