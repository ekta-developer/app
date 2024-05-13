import React,{useState} from "react";
import { Button, Input, Label } from "reactstrap";
import { useNavigate } from "react-router-dom";
import imgLogin from "../images/login.jpg";
import { useForm } from "react-hook-form";
import "../Login.css";

const style = { color: "#e85347", fontSize: "15px", fontStyle: "italic" };

const Login = () => {
  const navigate = useNavigate();
  const [passwordShown, setPasswordShown] = useState(false);

const togglePasswordVisibility = () => {
  setPasswordShown(!passwordShown);
};

// Update the type of input field dynamically based on `passwordShown` state
const inputType = passwordShown ? 'text' : 'password';
const iconClass = passwordShown ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash';

  const {
    register,
    handleSubmit,
    setValue,
    trigger,
    watch,
    formState: { errors },
  } = useForm();

  const handleEmailChange = (e) => {
    setValue("email", e.target.value);
    trigger("email");
  };

  const handlePassChange = (e) => {
    setValue("password", e.target.value);
    trigger("password");
  };

  const onSubmit = (data) => {
    if (data.email === "admin@gmail.com" && data.password === "@6Abcd") {
      console.log(data);
      navigate("/dashboard");
    } else {
      alert("Email = admin@gmail.com , Password=@6Abcd");
    }
  };

  const open = () => {
    navigate("/register");
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-content">
          <div className="container">
            <div className="login-logo-section">
              <a href="admin-dashboard.html">
                <img src={imgLogin} alt="Dreamguy's Technologies" />
              </a>
            </div>

            <div className="login-form-container">
              <div className="login-form-wrapper">
                <h3 className="login-title">Login</h3>
                <p className="login-subtitle">Access to our dashboard</p>

                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="form-block mb-4">
                    <div className="form-group">
                      <Label htmlFor="default-1" className="form-label">
                        <h5>Email-ID:</h5>
                      </Label>
                      <div className="form-input-wrap">
                        <input
                          type="text"
                          id="email"
                          {...register("email", {
                            required: true,
                            pattern:
                              /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                          })}
                          className="form-input"
                          value={watch("email")}
                          onChange={handleEmailChange}
                        />
                        {errors.email && errors.email.type === "required" && (
                          <span style={style} className="error-message">
                            Email field is required
                          </span>
                        )}
                        {errors.email && errors.email.type === "pattern" && (
                          <span className="error-message" style={style}>
                            Invalid input. Format: (xyz@gmail.com)
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="form-block mb-4">
                    <div className="row align-items-center">
                      <div className="col">
                        <Label htmlFor="col-form-label" className="form-label">
                          <h5>Password</h5>
                        </Label>
                      </div>
                      <div className="col-auto">
                        <a className="text-muted" href="forgot-password.html">
                          Forgot password?
                        </a>
                      </div>
                    </div>
                    <div className="position-relative">
                      <input
                        type={inputType}
                        id="password"
                        {...register("password", {
                          required: true,
                          pattern:
                            /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~\-]).*(?=.*[A-Z]).*(?=.*[a-z]).*(?=.*\d).{6}$/,
                          minLength: 6,
                          maxLength: 8,
                        })}
                        className="form-input"
                        value={watch("password")}
                        onChange={handlePassChange}
                      />
                      <span
                        className={iconClass}
                        id="toggle-password"
                        onClick={togglePasswordVisibility}
                      ></span>

                      {errors.password &&
                        errors.password.type === "minLength" && (
                          <span className="error-message" style={style}>
                            Invalid input. Min-6 digits are allowed
                          </span>
                        )}
                      {errors.password &&
                        errors.password.type === "maxLength" && (
                          <span className="error-message" style={style}>
                            Invalid input. Max-8 digits are allowed
                          </span>
                        )}
                      {errors.password &&
                        errors.password.type === "required" && (
                          <span className="error-message" style={style}>
                            Password field is required.
                          </span>
                        )}
                      {errors.password &&
                        errors.password.type === "pattern" && (
                          <span className="error-message" style={style}>
                            Include digits, lowercase, uppercase, and special
                            character
                          </span>
                        )}
                    </div>
                  </div>

                  <div className="form-block mb-4 text-center">
                    <button className="btn btn-primary login-button">
                      Login
                    </button>
                  </div>
                  <div className="login-footer">
                    <p>
                      Don't have an account yet?{" "}
                      <Button onClick={open}>Register</Button>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
